<img src="https://github.com/Grupo-G03-4SOAT-FIAP/Health-Med-api/raw/main/docs/img/H-and-M-logo.png" alt="Health&Med" title="Health&Med" align="right" height="60" />

# Health&Med
## API do Backend

[![Deploy to Amazon EKS](https://github.com/Grupo-G03-4SOAT-FIAP/Health-Med-api/actions/workflows/deploy.yml/badge.svg)](https://github.com/Grupo-G03-4SOAT-FIAP/Health-Med-api/actions/workflows/deploy.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Grupo-G03-4SOAT-FIAP_Health-Med-api&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Grupo-G03-4SOAT-FIAP_Health-Med-api)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=Grupo-G03-4SOAT-FIAP_Health-Med-api&metric=coverage)](https://sonarcloud.io/summary/new_code?id=Grupo-G03-4SOAT-FIAP_Health-Med-api)

Projeto desenvolvido durante o Hackatown da [Pós Tech em Software Architecture da FIAP](https://postech.fiap.com.br/curso/software-architecture/).

▶️[Clique aqui para assistir à apresentação no YouTube!](https://www.youtube.com/@BOPEtechFIAP)

### O PROBLEMA

*A Health&Med, uma startup inovadora no setor de saúde, está desenvolvendo um novo sistema que irá revolucionar a Telemedicina no país. Atualmente, a startup oferece a possibilidade de agendamento de consultas e realização de consultas online (Telemedicina) por meio de sistemas terceiros como Google Agenda e Google Meetings.*

*Recentemente, a empresa recebeu um aporte e decidiu investir no desenvolvimento de um sistema proprietário, visando proporcionar um serviço de maior qualidade, segurança dos dados dos pacientes e redução de custos. O objetivo é criar um sistema robusto, escalável e seguro que permita o gerenciamento eficiente desses agendamentos e consultas.*

*Além de conter as funcionalidades de agendamento e realização de consultas online, o sistema terá o diferencial de uma nova funcionalidade: o Prontuário Eletrônico. O Prontuário Eletrônico permitirá o armazenamento e compartilhamento de documentos, exames, cartão de vacinas, e outros registros médicos entre as partes envolvidas, garantindo maior assertividade nos 
diagnósticos. Para viabilizar o desenvolvimento de um sistema que esteja em conformidade com as melhores práticas de qualidade e arquitetura de software, a Health&Med contratou os alunos do curso (SOAT) para fazer a análise do projeto e a arquitetura do software.*

*— Fonte: [FIAP](https://www.fiap.com.br/)*

#### Stack

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Kubernetes](https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white)
![Terraform](https://img.shields.io/badge/terraform-%235835CC.svg?style=for-the-badge&logo=terraform&logoColor=white)

## Executar a aplicação

1. Baixe e instale o Node.js em https://nodejs.org/en/download
2. Instale o CLI do NestJS através do comando `npm i -g @nestjs/cli`
3. Navegue até a pasta raiz do projeto usando o Terminal;
4. Faça uma cópia do arquivo `.env.template` com o nome `.env` e preencha as variáveis de ambiente dentro dele;
5. Execute o comando `npm install` para instalar os pacotes npm;
6. Execute o comando `docker-compose up -d db` para iniciar o container do banco de dados;
7. Execute o comando `docker-compose up -d localstack` para iniciar o localstack;
8. Use o comando `npm run start` para iniciar a aplicação.
9. Acesse o Swagger em http://localhost:3000/swagger/

<details>

<summary>Como executar a aplicação usando o Docker Compose?</summary>

## Executar a aplicação usando o Docker Compose

1. Clone este repositório;
2. Navegue até a pasta raiz do projeto usando o Terminal;
3. Faça uma cópia do arquivo `.env.template` com o nome `.env` e preencha as variáveis de ambiente dentro dele;
4. Execute o comando `docker-compose up -d --build --force-recreate`
5. Acesse o Swagger em http://localhost:3000/swagger/

</details>

<details>

<summary>Como executar a aplicação usando o Kubernetes do Docker Desktop?</summary>

## Executar a aplicação usando o Kubernetes do Docker Desktop

1. Clone este repositório;
2. Navegue até a pasta raiz do projeto usando o Terminal;
3. Use o comando `docker build -t health-med-api:latest .` para gerar a imagem de container da aplicação;
4. Use o comando `kubectl apply -f k8s/development/postgres/namespace.yaml -f k8s/development/postgres/pvc-pv.yaml -f k8s/development/postgres/config.yaml -f k8s/development/postgres/secrets.yaml -f k8s/development/postgres/deployment.yaml -f k8s/development/postgres/service.yaml` para fazer deploy do banco de dados;
5. Use o comando `kubectl apply -f k8s/development/api/namespace.yaml -f k8s/development/api/config.yaml -f k8s/development/api/secrets.yaml -f k8s/development/api/deployment.yaml -f k8s/development/api/service.yaml -f k8s/development/api/hpa.yaml` para fazer deploy da aplicação;
6. Acesse o Swagger em http://localhost:3000/swagger/

> Para remover a aplicação do Kubernetes, use o comando `kubectl delete namespace rms`

#### Sobre os Secrets do Kubernetes

Em seu ambiente de desenvolvimento, por questão de segurança, abra os arquivos `/k8s/development/postgres/secrets.yaml` e `/k8s/development/api/secrets.yaml` na pasta `/k8s/development` e preencha os valores sensíveis manualmente.

> No ambiente de produção os Secrets do Kubernetes são gerenciados pelo AWS Secrets Manager.

Para mais informações visite a página [Boas práticas para secrets do Kubernetes](https://kubernetes.io/docs/concepts/security/secrets-good-practices/#avoid-sharing-secret-manifests).

</details>

<details>

<summary>Como testar o agendamento com Google Meet?</summary>

## Instruções para testar o agendamento de consultas com o Google Meet

Para testar o agendamento de consultas com o Google Meet siga o passo a passo disponível no [Guia de início rápido do Node.js](https://developers.google.com/meet/api/guides/quickstart/nodejs) no portal Google for Developers.

### Criar projeto no Console do Google Cloud

1. Crie um projeto chamado `Health-Med` no [Console do Google Cloud](https://console.cloud.google.com/projectcreate);
2. No Console do Google Cloud, acesse [APIs e Serviços](https://console.cloud.google.com/apis/dashboard) e clique no botão **+ Ativar APIs e serviços**;
3. Procure pela Google Meet REST API na lista e clique em ATIVAR;
4. No menu do lado esquerdo da tela, clique em Credenciais;
5. Clique no botão **+ Criar credenciais** e escolha a opção "ID do cliente OAuth";
6. CLique no botão CONFIGURAR TELA DE CONSENTIMENTO e escolha opção "Externo" e clique em CRIAR;
7. Na tela "Informações do app" preencha os dados do aplicativo como nome do app, e-mail para suporte, logotipo do app, dados de contato do desenvolvedor, etc. Clique no botão SALVAR E CONTINUAR;
8. Na guia "Escopos" clique no botão ADICIONAR OU REMOVER ESCOPOS e selecione a opção `https://www.googleapis.com/auth/meetings.space.created` na lista. Clique no botão SALVAR E CONTINUAR;
9. Na guia "Usuários de teste" clique no botão **+ ADD USERS** e adicione o seu endereço de e-mail pessoal do @gmail.com. Depois clique no botão SALVAR E CONTINUAR;
10. Clique no botão VOLTAR PARA O PAINEL.

### Obter um ID do cliente OAuth 2.0

1. No menu do lado esquerdo da tela, clique em Credenciais;
2. Clique no botão **+ Criar credenciais** e escolha a opção "ID do cliente OAuth";
3. Em "Tipo de aplicativo" selecione "App para computador" e clique no botão CRIAR.
4. Anote o `ID do cliente` e a `Chave secreta do cliente` e clique no botão BAIXAR O JSON;

### Autenticação com a Conta pessoal do Google

1. Visite a página [Guia de início rápido do Node.js](https://developers.google.com/meet/api/guides/quickstart/nodejs);
2. Execute [código de amostra](https://developers.google.com/meet/api/guides/quickstart/nodejs?hl=pt-br) na sua máquina local;
> Copie o arquivo JSON que você baixou anteriormente na mesma pasta onde se encontra o arquivo `index.js`. Renomeie o arquivo JSON para `credentials.json`
3. Execute o [código de amostra](https://developers.google.com/meet/api/guides/quickstart/nodejs?hl=pt-br) usando o comando `node .`
4. Ao executar o [código de amostra](https://developers.google.com/meet/api/guides/quickstart/nodejs?hl=pt-br) será solicitado que você faça login com a sua Conta do Google pessoal;
5. Logo após, será gerado um arquivo chamado `token.json` no mesmo diretório onde se encontra o arquivo `index.js`

> O [código de amostra](https://developers.google.com/meet/api/guides/quickstart/nodejs?hl=pt-br) também está disponível no GitHub em https://github.com/googleworkspace/node-samples/blob/main/meet/quickstart/index.js

> Também é possível fazer autenticação usando Contas de Serviço ao invés de IDs do cliente OAuth 2.0, porém é necessário possuir uma conta Business (paga) do Google Workspaces com CNPJ para configurar o [domain-wide delegation](https://support.google.com/a/answer/162106?hl=en) conforme instruções disponíveis [aqui](https://medium.com/iceapple-tech-talks/integration-with-google-calendar-api-using-service-account-1471e6e102c8).

### Informe as credenciais na aplicação

1. Abra o arquivo `token.json` e copie todo o seu conteúdo;
2. Abra o arquivo `.env` e cole o conteúdo do arquivo token.json na variável de ambiente `GOOGLE_AUTHORIZED_USER_CREDS`, entre aspas simples `' '`
3. Execute a aplição.

> O token obtido no arquivo token.json vence depois de algum tempo, sendo necessário gerar outro token novamente usando o [código de amostra](https://developers.google.com/meet/api/guides/quickstart/nodejs?hl=pt-br) conforme as instruções disponíveis acima.

</details>

## Banco de Dados

Entendemos que o modelo relacional é o que mais se adequa ao nosso problema de negócio, contexto atual e requisitos na API da Health&Med. Leia mais sobre as motivações para adoção do modelo relacional no [Architectural Decision Record (ADR)](https://github.com/Grupo-G03-4SOAT-FIAP/Health-Med-api/wiki/Decis%C3%A3o-de-Arquitetura-para-Banco-de-Dados-da-Health&Med).

<details>

<summary>Quais são os parâmetros da conexão e credenciais para acesso ao banco de dados PostgreSQL?</summary>

<br>

Você pode conectar-se a instância de banco de dados PostgreSQL usando o [pgAdmin](https://www.pgadmin.org/download/), o terminal através do [psql](https://www.postgresql.org/download/), ou qualquer outra IDE ou ferramenta compatível.

> Host: localhost\
> Porta: 5432 (padrão)\
> Usuário: pguser\
> Senha: pgpwd\
> DB name: health_med

</details>

## Documentação

### Arquitetura de Aplicação

Architectural Pattern: [Modular Monolith](https://www.milanjovanovic.tech/blog/what-is-a-modular-monolith) + [Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/)

![arquitetura-de-aplicacao](https://github.com/user-attachments/assets/48c77bcc-2db1-4827-83a4-fa81a9c59c78)

<details>

<summary>Por que optamos por um Modular Monolith?</summary>

## Modular Monolith

> "Você não deve iniciar um novo projeto com microsserviços, mesmo se tiver certeza de que seu aplicativo será grande o suficiente para valer a pena." — [Martin Fowler](https://martinfowler.com/bliki/MonolithFirst.html#:~:text=you%20shouldn%27t%20start%20a%20new%20project%20with%20microservices%2C%20even%20if%20you%27re%20sure%20your%20application%20will%20be%20big%20enough%20to%20make%20it%20worthwhile.)

*No contexto da Health&Med, neste primeiro momento onde a startup está dando início ao desenvolvendo de um novo mínimo produto viável, entendemos que partir diretamente para uma arquitetura de microsserviços não seria o ideal. Ao optar por um monolito modular temos o melhor dos dois mundos: A simplicidade e facilidade de gerenciamento de um monolito aliada a modularidade, flexibilidade e baixo acoplamento dos microsserviços. Ao optar por um monolito modular a aplicação é dividida internamente em módulos desacoplados que podem ser facilmente decompostos em microsserviços no futuro, quando a empresa crescer e a equipe aumentar de tamanho.*

</details>

### Arquitetura Cloud

Cloud provider: AWS

![arquitetura-cloud drawio](https://github.com/user-attachments/assets/786abbc1-c27d-4419-a2f8-df2de9c98f34)
*Clique na imagem para ampliar.*

> Uma versão em alta definição do diagrama está disponível na pasta `\docs\arquitetura-cloud`

## Como contribuir

Para contribuir com o projeto consulte o guia em [CONTRIBUTING.md](CONTRIBUTING.md)

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Métricas de código

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Grupo-G03-4SOAT-FIAP_Health-Med-api&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Grupo-G03-4SOAT-FIAP_Health-Med-api)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=Grupo-G03-4SOAT-FIAP_Health-Med-api&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=Grupo-G03-4SOAT-FIAP_Health-Med-api)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=Grupo-G03-4SOAT-FIAP_Health-Med-api&metric=coverage)](https://sonarcloud.io/summary/new_code?id=Grupo-G03-4SOAT-FIAP_Health-Med-api)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=Grupo-G03-4SOAT-FIAP_Health-Med-api&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=Grupo-G03-4SOAT-FIAP_Health-Med-api)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=Grupo-G03-4SOAT-FIAP_Health-Med-api&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=Grupo-G03-4SOAT-FIAP_Health-Med-api)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=Grupo-G03-4SOAT-FIAP_Health-Med-api&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=Grupo-G03-4SOAT-FIAP_Health-Med-api)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=Grupo-G03-4SOAT-FIAP_Health-Med-api&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=Grupo-G03-4SOAT-FIAP_Health-Med-api)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=Grupo-G03-4SOAT-FIAP_Health-Med-api&metric=bugs)](https://sonarcloud.io/summary/new_code?id=Grupo-G03-4SOAT-FIAP_Health-Med-api)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=Grupo-G03-4SOAT-FIAP_Health-Med-api&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=Grupo-G03-4SOAT-FIAP_Health-Med-api)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=Grupo-G03-4SOAT-FIAP_Health-Med-api&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=Grupo-G03-4SOAT-FIAP_Health-Med-api)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=Grupo-G03-4SOAT-FIAP_Health-Med-api&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=Grupo-G03-4SOAT-FIAP_Health-Med-api)

## Projetos relacionados

Lambda function da Teleconsulta\
https://github.com/Grupo-G03-4SOAT-FIAP/Health-Med-teleconsulta

Infrastructure as code (IaC) com Terraform\
https://github.com/Grupo-G03-4SOAT-FIAP/Health-Med-iac

## OWASP ZAP

#### Reports OWASP ZAP API Scan
Os reports de "antes" e "depois" encontram-se na pasta `/docs/zap-scanning-report`\
[Clique aqui para acessar](https://github.com/Grupo-G03-4SOAT-FIAP/Health-Med-api/tree/main/docs/zap-scanning-report)↗️

<details>

<summary>Como escanear a API usando o OWASP ZAP?</summary>

### ZAP - API Scan

Para escanear todos os endpoints da API em busca de vulnerabilidades siga o passo a passo abaixo.

1. Execute a aplicação usando o Docker Compose;
2. Execute o comando abaixo:
```bash
docker run --name zap --network host -v $(pwd):/zap/wrk/:rw -t zaproxy/zap-stable zap-api-scan.py -t http://localhost:3000/swagger-json -f openapi -r report.html
```

> Substitua os parenteses em `$(pwd)` por chaves `${pwd}` no Windows.

O report em formato HTML será gerado no diretório atual.

[Clique aqui](https://www.zaproxy.org/docs/docker/api-scan/) para obter mais informações sobre o API Scan do ZAP.

</details>

## Relatório de Impacto à Proteção de Dados Pessoais (RIPD)

O Relatório de Impacto à Proteção de Dados Pessoais (RIPD) está disponível na pasta `/docs/RIPD`\
[Clique aqui para acessar](https://github.com/Grupo-G03-4SOAT-FIAP/Health-Med-api/tree/main/docs/RIPD)↗️

## Requisitos

*Node.js v20.12.0 (LTS), Docker Desktop 24.0.6 e Kubernetes v1.28*

[![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-white.svg)](https://sonarcloud.io/summary/new_code?id=Grupo-G03-4SOAT-FIAP_Health-Med-api)
