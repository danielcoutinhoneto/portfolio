import { readFile, stat } from "node:fs/promises";

const requiredTextFiles = [
  "app/page.jsx",
  "app/layout.jsx",
  "app/globals.css",
  "public/favicon.svg",
  "public/og-card.svg",
  ".github/CODEOWNERS",
  ".github/dependabot.yml",
  ".github/workflows/deploy-pages.yml",
  ".github/workflows/security.yml",
  "docs/documenteacao-site.md",
  "AGENTS.md",
  "package.json",
  "scripts/security-check.mjs"
];
const documentationPdf = "docs/documenteacao-site.pdf";

const contents = new Map();

for (const file of requiredTextFiles) {
  contents.set(file, await readFile(file, "utf8"));
}

const page = contents.get("app/page.jsx");
const layout = contents.get("app/layout.jsx");
const documentation = contents.get("docs/documenteacao-site.md");
const packageJson = JSON.parse(contents.get("package.json"));
const allContent = [...contents.values()].join("\n");
const errors = [];

for (const forbidden of ["Lorem ipsum", "TODO", 'href="#"']) {
  if (allContent.includes(forbidden)) {
    errors.push(`Conteúdo provisório encontrado: ${forbidden}`);
  }
}

for (const expected of [
  "Daniel Coutinho Neto",
  "Desenvolvedor .NET",
  "ASP.NET Core",
  "SQL Server",
  "SisAgeLi",
  "SisExaminou"
]) {
  if (!allContent.includes(expected)) {
    errors.push(`Conteúdo obrigatório ausente: ${expected}`);
  }
}

const ids = new Set(
  [...page.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1])
);
const anchorTargets = new Set(
  [...page.matchAll(/href="#([^"]+)"/g)].map((match) => match[1])
);

for (const target of anchorTargets) {
  if (!ids.has(target)) {
    errors.push(`Âncora interna sem destino: #${target}`);
  }
}

if (!layout.includes('lang="pt-BR"')) {
  errors.push("Idioma principal do documento não está definido como pt-BR.");
}

if (!page.includes('type="application/ld+json"')) {
  errors.push("Dados estruturados de pessoa não foram encontrados.");
}

for (const [name, version] of Object.entries(packageJson.dependencies)) {
  if (!documentation.includes(version)) {
    errors.push(
      `A versão ${version} da dependência ${name} não aparece na documentação.`
    );
  }
}

const pdf = await readFile(documentationPdf);
if (pdf.subarray(0, 5).toString("ascii") !== "%PDF-") {
  errors.push("O arquivo de documentação PDF não possui um cabeçalho PDF válido.");
}

const [markdownStat, pdfStat] = await Promise.all([
  stat("docs/documenteacao-site.md"),
  stat(documentationPdf)
]);

if (pdfStat.mtimeMs < markdownStat.mtimeMs) {
  errors.push(
    "O PDF da documentação é anterior ao Markdown. Execute npm.cmd run docs:pdf."
  );
}

if (errors.length > 0) {
  console.error("Falha na validação do portfólio:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(
  `Portfólio validado: ${requiredTextFiles.length + 1} arquivos essenciais, ${anchorTargets.size} âncoras internas e documentação sincronizada.`
);
