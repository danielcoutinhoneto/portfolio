import {
  existsSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { spawnSync } from "node:child_process";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDirectory, "..");
const markdownPath = join(projectRoot, "docs", "documenteacao-site.md");
const pdfPath = join(projectRoot, "docs", "documenteacao-site.pdf");

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderInline(value) {
  const codeSegments = [];
  let result = value.replace(/`([^`]+)`/g, (_, code) => {
    const token = `%%CODE_${codeSegments.length}%%`;
    codeSegments.push(`<code>${escapeHtml(code)}</code>`);
    return token;
  });

  result = escapeHtml(result)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  codeSegments.forEach((segment, index) => {
    result = result.replace(`%%CODE_${index}%%`, segment);
  });

  return result;
}

function renderTable(lines, startIndex) {
  const rows = [];
  let index = startIndex;

  while (index < lines.length && lines[index].trim().startsWith("|")) {
    rows.push(
      lines[index]
        .trim()
        .slice(1, -1)
        .split("|")
        .map((cell) => cell.trim())
    );
    index += 1;
  }

  const header = rows[0];
  const body = rows.slice(2);
  const html = [
    "<table>",
    "<thead><tr>",
    ...header.map((cell) => `<th>${renderInline(cell)}</th>`),
    "</tr></thead>",
    "<tbody>",
    ...body.map(
      (row) =>
        `<tr>${row
          .map((cell) => `<td>${renderInline(cell)}</td>`)
          .join("")}</tr>`
    ),
    "</tbody>",
    "</table>"
  ].join("");

  return { html, nextIndex: index };
}

function markdownToHtml(markdown) {
  const lines = markdown.replaceAll("\r\n", "\n").split("\n");
  const output = [];
  let index = 0;
  let paragraph = [];
  let listType = null;
  let codeBlock = null;

  function flushParagraph() {
    if (paragraph.length > 0) {
      output.push(`<p>${renderInline(paragraph.join(" "))}</p>`);
      paragraph = [];
    }
  }

  function closeList() {
    if (listType) {
      output.push(`</${listType}>`);
      listType = null;
    }
  }

  while (index < lines.length) {
    const rawLine = lines[index];
    const line = rawLine.trimEnd();

    if (line.startsWith("```")) {
      flushParagraph();
      closeList();
      if (codeBlock === null) {
        codeBlock = [];
      } else {
        output.push(
          `<pre><code>${escapeHtml(codeBlock.join("\n"))}</code></pre>`
        );
        codeBlock = null;
      }
      index += 1;
      continue;
    }

    if (codeBlock !== null) {
      codeBlock.push(rawLine);
      index += 1;
      continue;
    }

    if (line.trim() === "") {
      flushParagraph();
      closeList();
      index += 1;
      continue;
    }

    if (
      line.trim().startsWith("|") &&
      index + 1 < lines.length &&
      /^\s*\|?[\s:|-]+\|?\s*$/.test(lines[index + 1])
    ) {
      flushParagraph();
      closeList();
      const table = renderTable(lines, index);
      output.push(table.html);
      index = table.nextIndex;
      continue;
    }

    const heading = /^(#{1,6})\s+(.+)$/.exec(line);
    if (heading) {
      flushParagraph();
      closeList();
      const level = heading[1].length;
      output.push(`<h${level}>${renderInline(heading[2])}</h${level}>`);
      index += 1;
      continue;
    }

    if (/^\s*---+\s*$/.test(line)) {
      flushParagraph();
      closeList();
      output.push("<hr>");
      index += 1;
      continue;
    }

    const quote = /^\s*>\s?(.*)$/.exec(line);
    if (quote) {
      flushParagraph();
      closeList();
      output.push(`<blockquote>${renderInline(quote[1])}</blockquote>`);
      index += 1;
      continue;
    }

    const unordered = /^\s*-\s+(.+)$/.exec(line);
    const ordered = /^\s*\d+\.\s+(.+)$/.exec(line);
    const nextListType = unordered ? "ul" : ordered ? "ol" : null;

    if (nextListType) {
      flushParagraph();
      if (listType !== nextListType) {
        closeList();
        output.push(`<${nextListType}>`);
        listType = nextListType;
      }

      const item = (unordered ?? ordered)[1]
        .replace(/^\[ \]\s*/, "☐ ")
        .replace(/^\[x\]\s*/i, "☑ ");
      output.push(`<li>${renderInline(item)}</li>`);
      index += 1;
      continue;
    }

    closeList();
    paragraph.push(line.trim());
    index += 1;
  }

  flushParagraph();
  closeList();

  return output.join("\n");
}

function findBrowser() {
  const candidates = [
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe"
  ];

  return candidates.find((candidate) => existsSync(candidate));
}

const markdown = readFileSync(markdownPath, "utf8");
const generatedAt = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "long",
  timeStyle: "short",
  timeZone: "America/Sao_Paulo"
}).format(new Date());
const body = markdownToHtml(markdown);
const html = `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <title>Documentação do portfólio — Daniel Coutinho Neto</title>
  <style>
    @page {
      size: A4;
      margin: 17mm 15mm 18mm;
    }

    * { box-sizing: border-box; }

    html {
      color: #172033;
      font-family: "Segoe UI", Arial, sans-serif;
      font-size: 10pt;
      line-height: 1.55;
    }

    body { margin: 0; }

    h1, h2, h3, h4 {
      break-after: avoid-page;
      color: #111827;
      line-height: 1.18;
    }

    h1 {
      margin: 0 0 18px;
      padding: 0 0 16px;
      border-bottom: 3px solid #7565e8;
      font-size: 26pt;
      letter-spacing: -0.5px;
    }

    h2 {
      margin: 27px 0 11px;
      padding-bottom: 6px;
      border-bottom: 1px solid #d9dfeb;
      font-size: 17pt;
    }

    h3 {
      margin: 20px 0 8px;
      color: #5144b9;
      font-size: 12.5pt;
    }

    h4 { margin: 16px 0 7px; font-size: 11pt; }

    p { margin: 7px 0 10px; }

    ul, ol {
      margin: 7px 0 12px;
      padding-left: 22px;
    }

    li { margin: 3px 0; }

    blockquote {
      margin: 14px 0;
      padding: 12px 16px;
      border-left: 4px solid #7565e8;
      background: #f2f0ff;
      color: #342b7d;
      font-size: 11pt;
      font-weight: 600;
    }

    code {
      padding: 1px 4px;
      border: 1px solid #dce2ec;
      border-radius: 4px;
      background: #f4f6f9;
      color: #4338a5;
      font-family: Consolas, "Cascadia Code", monospace;
      font-size: 8.7pt;
    }

    pre {
      break-inside: avoid-page;
      margin: 10px 0 14px;
      padding: 12px 14px;
      border-radius: 7px;
      background: #111827;
      color: #eef2ff;
      line-height: 1.45;
      white-space: pre-wrap;
    }

    pre code {
      padding: 0;
      border: 0;
      background: transparent;
      color: inherit;
    }

    table {
      width: 100%;
      margin: 11px 0 17px;
      border-collapse: collapse;
      font-size: 8.8pt;
    }

    tr { break-inside: avoid-page; }

    th, td {
      padding: 7px 8px;
      border: 1px solid #d8deea;
      text-align: left;
      vertical-align: top;
    }

    th {
      background: #eceafd;
      color: #312783;
      font-weight: 700;
    }

    tr:nth-child(even) td { background: #f8f9fb; }

    a { color: #5144b9; text-decoration: none; }

    hr {
      margin: 24px 0 14px;
      border: 0;
      border-top: 1px solid #d9dfeb;
    }

    .document-meta {
      margin: -8px 0 22px;
      color: #657086;
      font-size: 8.5pt;
    }

    .document-meta strong { color: #4338a5; }
  </style>
</head>
<body>
  <div class="document-meta">
    <strong>Documento técnico versionado</strong> · Gerado em ${escapeHtml(generatedAt)}
  </div>
  ${body}
</body>
</html>`;

const browser = findBrowser();
if (!browser) {
  throw new Error(
    "Microsoft Edge ou Google Chrome não foi encontrado para gerar o PDF."
  );
}

const temporaryDirectory = mkdtempSync(join(tmpdir(), "portfolio-docs-"));
const temporaryHtml = join(temporaryDirectory, "documentacao-site.html");
writeFileSync(temporaryHtml, html, "utf8");

try {
  const result = spawnSync(
    browser,
    [
      "--headless=new",
      "--disable-gpu",
      "--disable-software-rasterizer",
      "--no-pdf-header-footer",
      `--user-data-dir=${join(temporaryDirectory, "browser-profile")}`,
      `--print-to-pdf=${pdfPath}`,
      pathToFileURL(temporaryHtml).href
    ],
    {
      cwd: projectRoot,
      encoding: "utf8",
      windowsHide: true,
      timeout: 60_000
    }
  );

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0 || !existsSync(pdfPath)) {
    throw new Error(
      `Falha ao gerar PDF. Código: ${result.status}. ${result.stderr ?? ""}`
    );
  }

  console.log(`PDF atualizado: ${pdfPath}`);
} finally {
  rmSync(temporaryDirectory, { recursive: true, force: true });
}
