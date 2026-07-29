import { access, readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const errors = [];
const excludedDirectories = new Set([
  ".git",
  ".next",
  "node_modules",
  "out"
]);
const textExtensions = new Set([
  ".css",
  ".html",
  ".js",
  ".jsx",
  ".json",
  ".md",
  ".mjs",
  ".svg",
  ".txt",
  ".yml",
  ".yaml"
]);
const forbiddenFileNames = new Set([".env"]);
const forbiddenExtensions = new Set([".key", ".pem", ".pfx", ".p12"]);

const secretPatterns = [
  {
    name: "token do GitHub",
    pattern: /\b(?:gh[pousr]_[A-Za-z0-9]{20,255}|github_pat_[A-Za-z0-9_]{20,255})\b/g
  },
  {
    name: "chave de acesso AWS",
    pattern: /\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/g
  },
  {
    name: "chave privada",
    pattern: new RegExp(
      "-----BEGIN " + "(?:RSA |EC |OPENSSH )?PRIVATE KEY-----",
      "g"
    )
  },
  {
    name: "segredo do Stripe",
    pattern: /\bsk_(?:live|test)_[A-Za-z0-9]{16,}\b/g
  },
  {
    name: "token do Slack",
    pattern: /\bxox[baprs]-[A-Za-z0-9-]{10,}\b/g
  }
];

async function exists(relativePath) {
  try {
    await access(path.join(root, relativePath));
    return true;
  } catch {
    return false;
  }
}

async function collectFiles(directory = root) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.isDirectory() && excludedDirectories.has(entry.name)) {
      continue;
    }

    const absolutePath = path.join(directory, entry.name);
    const relativePath = path.relative(root, absolutePath).replaceAll("\\", "/");

    if (entry.isDirectory()) {
      files.push(...(await collectFiles(absolutePath)));
      continue;
    }

    const extension = path.extname(entry.name).toLowerCase();
    if (
      forbiddenFileNames.has(entry.name) ||
      entry.name.startsWith(".env.") ||
      forbiddenExtensions.has(extension)
    ) {
      errors.push(`Arquivo sensível não permitido: ${relativePath}`);
    }

    if (textExtensions.has(extension) || entry.name === ".gitignore") {
      files.push({ absolutePath, relativePath });
    }
  }

  return files;
}

function scanForSecrets(content, relativePath) {
  for (const { name, pattern } of secretPatterns) {
    pattern.lastIndex = 0;
    if (pattern.test(content)) {
      errors.push(`${name} encontrado em ${relativePath}`);
    }
  }
}

const sourceFiles = await collectFiles();

for (const file of sourceFiles) {
  const fileStat = await stat(file.absolutePath);
  if (fileStat.size > 2_000_000) {
    errors.push(`Arquivo de texto acima de 2 MB não revisado: ${file.relativePath}`);
    continue;
  }

  const content = await readFile(file.absolutePath, "utf8");
  scanForSecrets(content, file.relativePath);
}

for (const workflowFile of [
  ".github/workflows/deploy-pages.yml",
  ".github/workflows/security.yml"
]) {
  const workflow = await readFile(path.join(root, workflowFile), "utf8");
  const actionReferences = [...workflow.matchAll(/uses:\s*[^@\s]+@([^\s#]+)/g)];

  for (const reference of actionReferences) {
    if (!/^[a-f0-9]{40}$/.test(reference[1])) {
      errors.push(
        `Action sem SHA imutável de 40 caracteres em ${workflowFile}: ${reference[0]}`
      );
    }
  }

  if (!workflow.includes("permissions: {}")) {
    errors.push(`Permissões padrão não estão bloqueadas em ${workflowFile}.`);
  }
}

const deployWorkflow = await readFile(
  path.join(root, ".github/workflows/deploy-pages.yml"),
  "utf8"
);

for (const requiredControl of [
  "contents: read",
  "pages: read",
  "pages: write",
  "id-token: write",
  "npm ci --ignore-scripts",
  "npm audit --omit=dev --audit-level=high",
  "npm run security:check"
]) {
  if (!deployWorkflow.includes(requiredControl)) {
    errors.push(`Controle ausente no workflow de publicação: ${requiredControl}`);
  }
}

if (!(await exists("out/index.html"))) {
  errors.push("Artefato out/index.html ausente. Execute npm.cmd run build.");
} else {
  const outputHtml = await readFile(path.join(root, "out/index.html"), "utf8");
  scanForSecrets(outputHtml, "out/index.html");

  for (const requiredSecurityMeta of [
    "Content-Security-Policy",
    "strict-origin-when-cross-origin",
    "object-src &#x27;none&#x27;",
    "upgrade-insecure-requests"
  ]) {
    if (!outputHtml.includes(requiredSecurityMeta)) {
      errors.push(`Proteção ausente no HTML gerado: ${requiredSecurityMeta}`);
    }
  }

  if (/<(?:script|img|link)\b[^>]*(?:src|href)=["']http:\/\//i.test(outputHtml)) {
    errors.push("Recurso ativo inseguro usando HTTP encontrado no HTML gerado.");
  }

  if (/<form\b/i.test(outputHtml) || /type=["']password["']/i.test(outputHtml)) {
    errors.push("Formulário ou campo de senha inesperado no artefato estático.");
  }

  if (/api\.github\.com|github_pat_|ghp_/i.test(outputHtml)) {
    errors.push("Integração ou credencial do GitHub inesperada no artefato estático.");
  }
}

if (errors.length > 0) {
  console.error("Falha na verificação de segurança:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(
  `Segurança validada: ${sourceFiles.length} arquivos verificados, Actions fixadas por SHA e artefato estático sem credenciais.`
);
