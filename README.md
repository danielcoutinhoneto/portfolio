# Portfólio — Daniel Coutinho Neto

Site profissional voltado a oportunidades de desenvolvimento .NET, com foco em
back-end, aplicações web corporativas e integração de sistemas.

## Tecnologias do site

- Next.js com App Router
- React
- CSS responsivo sem bibliotecas visuais
- Exportação estática
- GitHub Actions e GitHub Pages

## Executar localmente

Pré-requisito: Node.js 20.9 ou superior.

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Validar e gerar a versão estática

```bash
npm run check
npm run build
npm run security:check
```

O conteúdo publicado é gerado na pasta `out`.

## Segurança

O site é totalmente estático e não possui autenticação, banco de dados,
formulário com backend, cookies, analytics ou integração com a API do GitHub.
Por isso, o conteúdo publicado não recebe credenciais e não tem permissão para
acessar ou modificar a conta do proprietário.

Controles automatizados:

- dependências instaladas de forma reprodutível e auditadas pelo npm;
- busca por tokens, chaves privadas e arquivos sensíveis;
- Content Security Policy e política de referência no HTML;
- GitHub Actions fixadas por SHA imutável;
- permissões mínimas e separadas entre build e deploy;
- CodeQL, Dependabot e validações agendadas;
- publicação somente do diretório estático `out`.

## Publicação no GitHub Pages

O workflow `.github/workflows/deploy-pages.yml` publica automaticamente a branch
`main`. No GitHub, abra **Settings > Pages** e selecione **GitHub Actions** como
fonte de publicação.

O `basePath` é calculado automaticamente durante o workflow, permitindo publicar
tanto em um repositório comum quanto em um repositório `usuario.github.io`.

## Atualização de conteúdo

Os dados profissionais e projetos ficam em `app/page.jsx`. Estilos e identidade
visual ficam em `app/globals.css`.

## Documentação técnica

O manual completo de execução, arquitetura e manutenção está em:

- `docs/documenteacao-site.md`
- `docs/documenteacao-site.pdf`

Toda alteração do site deve atualizar o Markdown e regenerar o PDF:

```bash
npm run docs:pdf
```

Consulte a seção de segurança do manual antes de adicionar formulários,
serviços externos, domínios personalizados ou arquivos de ambiente.
