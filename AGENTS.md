# Regras de manutenção do portfólio

- Toda alteração funcional, visual, estrutural, de conteúdo, dependência,
  configuração, build ou publicação do site deve atualizar
  `docs/documenteacao-site.md`.
- Depois de atualizar o Markdown, execute `npm.cmd run docs:pdf` para regenerar
  `docs/documenteacao-site.pdf`.
- O Markdown é a fonte da documentação. O PDF nunca deve ser alterado
  manualmente.
- Antes de concluir uma alteração, execute `npm.cmd run check` e
  `npm.cmd run build`, seguido de `npm.cmd run security:check`.
- Antes de publicar, execute também
  `npm.cmd audit --omit=dev --audit-level=high` e revise os workflows.
- Não crie commit, push ou deploy sem autorização explícita do proprietário.
