# Testes E2E com Playwright - OrangeHRM

Este repositório contém testes automatizados de ponta a ponta (E2E) utilizando [Playwright](https://playwright.dev/) para a aplicação [OrangeHRM Demo](https://opensource-demo.orangehrmlive.com/). A suíte de testes cobre funcionalidades essenciais como login, navegação de menus, manipulação de funcionários (CRUD) e validações visuais em tabelas e formulários.

> ⚠️ **Aviso**: Este projeto é público apenas para fins de estudo e demonstração de técnicas que podem ser aplicadas em projetos maiores. A aplicação testada é uma plataforma open-source de demonstração.

---

## 📂 Estrutura do Projeto

```
📁 orangehrm-playwright-tests
├── 📁 pages                # Page Objects contendo mapeamentos e métodos reutilizáveis
├── 📁 tests                # Casos de teste organizados por funcionalidades
├── 📁 utils                # Utilitários e geradores de dados
├── 📁 playwright-report    # Relatórios HTML (ignorado pelo Git)
├── 📁 test-results         # Resultados brutos de testes (ignorado pelo Git)
├── .gitignore             # Arquivos/pastas ignoradas pelo Git
├── package.json           # Dependências e scripts do projeto
├── playwright.config.ts   # Configurações do Playwright
└── README.md              # Documentação do projeto
```

---

## 🚀 Como Executar

### Pré-requisitos:
- Node.js 18+
- npm

```bash
npm install              # Instala todas as dependências
npx playwright install   # Instala os browsers necessários
```

### Executar todos os testes:
```bash
npx playwright test
```

### Gerar e visualizar o relatório HTML:
```bash
npx playwright show-report
```

### Gerar relatório JUnit (XML):
```bash
npx playwright test --reporter=junit
```

---

## ✅ Funcionalidades Testadas

### 🔐 Login
- LOGIN-001 | Login com credenciais válidas

### 🧑‍💼 Gestão de Funcionários (PIM)
- EMP-001 | Adicionar funcionário
- EMP-002 | Editar informações de um funcionário
- EMP-003 | Excluir funcionário

### 🧪 Outras verificações
- Validação de mensagens de erro ao tentar excluir funcionários inexistentes
- Verificação da visibilidade e acessibilidade de elementos após ações de CRUD

---

## 💻 Integração com GitHub Actions

Este projeto está integrado com o **GitHub Actions** para executar testes automaticamente em pushs para `main`, em pull requests e de forma agendada a cada 6 horas:

```yaml
on:
  push:
    branches: [main]
  pull_request:
  schedule:
    - cron: '0 */6 * * *'
```

### 🎯 Relatórios
- `playwright-report/`: Geração de relatório HTML com detalhes de cada teste
- `test-results/`: Relatórios de execução em formato JUnit XML (para integração com pipelines CI/CD)

---

## 📦 Dependências Principais

- [Playwright](https://playwright.dev/)
- [@faker-js/faker](https://www.npmjs.com/package/@faker-js/faker)

---

## 📄 Licença

Este projeto está sob a licença [MIT](LICENSE).

---

📬 Em caso de dúvidas, sinta-se à vontade para abrir uma [issue](https://github.com/joab102011/orangehrm-playwright-tests/issues).

---

Feito com 💙 por [Joab Cruz](https://github.com/joab102011)
