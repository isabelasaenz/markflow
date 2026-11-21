# MarkFlow – Editor de Markdown

[Acesse o MarkFlow](https://markflow-pink.vercel.app/)

## Integrantes

- Isabela Saenz Cardoso
- Victor Felipe da Cruz Oliveira

## Sobre o sistema

O MarkFlow é um editor de Markdown que permite escrever, visualizar o preview em tempo real e exportar o documento para PDF diretamente no navegador.

Funcionalidades:

- Edição de Markdown com preview instantâneo.
- Contagem de palavras, caracteres e estimativa de tempo de leitura.
- Exportação para PDF sem servidor (`Ctrl+Shift+E`).
- Persistência automática do conteúdo no `localStorage`.
- Alternância entre tema claro e escuro.
- Botão de novo documento com confirmação inline.
- Título da aba do navegador sincronizado com o `# heading` do documento.
- Notificações de erro via toast.
- Interface responsiva para mobile.

## Tecnologias

- React + Vite + TypeScript
- @uiw/react-md-editor
- markdown-pdfjs
- Vitest + React Testing Library
- Playwright
- GitHub Actions
- Vercel

## Execução dos testes

```bash
npm install
npm run test:coverage
npx playwright install
npx playwright test
npm run dev
```

## Uso de IA

O GitHub Copilot foi utilizado principalmente para:

- Sugerir a estrutura inicial de componentes React, devido a falta de familiaridade com desenvolvimento de sistemas web.
- Auxiliar na escrita dos testes de unidade e e2e.
- Revisar a configuração do GitHub Actions e do Vitest.

Todo o código foi revisado e adaptado pela equipe.
