# Welcome to the contributing guide

Confira abaixo algumas dicas de convenções e boas práticas a serem consideradas ao contribuir com o projeto.

## Source-control branching model

Após [votação realizada no Discord](https://discord.com/channels/1144422985294418001/1145747355929432214/1145879680298254376), o grupo escolheu trabalhar seguindo o modelo de controle de versão "Trunk-based development", o mesmo modelo [adotado pelo Google](https://trunkbaseddevelopment.com/#:~:text=Google%20does%20Trunk%2DBased%20Development).

### Trunk-Based Development

O Trunk-based development funciona, em palavras simples, da seguinte forma:

1. O dev cria uma branch pra ele trabalhar, a partir da branch `main`

2. O dev faz commits na branch criada no Passo 1

3. Qdo terminar, o dev abre uma **Pull Request** da branch que ele criou no Passo 1 para branch `main`

4. [OPCIONAL] Após a abertura da PR no Passo 3 o GitHub Actions executa os testes unitários (se houver) e faz a análise estática do código que o dev criou, usando o [SonarCloud](https://www.sonarsource.com/products/sonarcloud/) _(print screen abaixo)_. Se houver problemas no código, como bugs ou falhas de segurança por exemplo, o GitHub Actions impede a aprovação da PR aberta no Passo 3 até que o dev faça as devidas correções
<img width="686" alt="image" src="https://github.com/Grupo-G03-4SOAT-FIAP/RMS-backend-fase01/assets/5115895/d5ccc9f0-ccb1-4606-9cb8-4872a43b4ecb">

5. Qdo a PR for aprovada pelo(s) demais membro(s) do grupo, o código que o dev fez na branch criada no Passo 1 vai para a branch `main`

6. [OPCIONAL] Se houver um pipeline de CI/CD configurado, após o merge com a `main` o código na `main` será compilado pelo GitHub Actions, uma imagem de container será gerada e um deploy será realizado em produção, no Kubernetes ou no [ECS da AWS](https://aws.amazon.com/ecs/)

#### Dúvidas sobre o Trunk-based development

<details><summary>Estou trabalhando em uma feature muito grande que vai levar vários dias para ser finalizada. Como lidar com esse cenário na Trunk-based development?</summary>
<p>
Resposta: De acordo com a Trunk-based development você pode utilizar Feature Flags para manter desativada novas funcionalidades incompletas que ainda estão em desenvolvimento, até que elas estejam prontas para serem habilitadas em produção.<br>
Fonte: https://www.atlassian.com/continuous-delivery/continuous-integration/trunk-based-development#:~:text=Feature%20flags%20nicely%20complement%20trunk%2Dbased%20development%20by%20enabling%20developers%20to%20wrap%20new%20changes%20in%20an%20inactive%20code%20path%20and%20activate%20it%20at%20a%20later%20time.
</p>
</details>

Para mais informações sobre o Trunk-based development visite https://cursos.alura.com.br/extra/alura-mais/git-flow-versus-trunk-based-development-c1401

# Boas Práticas

## Boas práticas para nomes de branches

Ao criar novas branches, procure seguir o seguinte padrão:

`category/reference/title-in-trello`

> 🛈 **category** pode ser _feature_, _bugfix_, _hotfix_ ou _test_.

> 🛈 **reference** deve conter o número do card no Trello. Vide exemplo abaixo.
> 
> <img width="199" alt="image" src="https://github.com/Grupo-G03-4SOAT-FIAP/RMS-backend-fase01/assets/5115895/23ffd5c2-3a42-4f2f-82f7-35ef24e3347f">
>
> Use _no-ref_ para atividades que não possuem card no Trello. Por exemplo `feature/no-ref/atualizar-dependencias`.

> 🛈 **title-in-trello** deve ser uma descrição curta da tarefa, sem espaços, separado por hífens, por exemplo "cadastro-cliente", "listar-pedidos" ou "criar-produto" de acordo com o título do card no Trello.

Exemplo completo: `feature/16/context-map`

Para mais informações sobre boas práticas para nomes de branches visite o artigo [Git Branch Naming Convention](https://dev.to/varbsan/a-simplified-convention-for-naming-branches-and-commits-in-git-il4) no dev.to

## Boas práticas para mensagens de commits

### Conventional Commits

Procure seguir a especificação **Conventional Commits** disponível em https://www.conventionalcommits.org/pt-br/v1.0.0/

Ao fazer commits, procure seguir o seguinte padrão:

`type(scope): Description goes here`

> 🛈 **type** pode ser _feat_, _fix_, _build_, _chore_, _ci_, _docs_, _style_, _refactor_, _perf_ ou _test_.\
> Para consultar o significado de cada type visite https://blog.rocketseat.com.br/como-fazer-um-commit-conventional-commits/#tipos

> 🛈 **scope** (OPCIONAL) deve conter o número do card no Trello. Vide exemplo abaixo.
> 
> <img width="199" alt="image" src="https://github.com/Grupo-G03-4SOAT-FIAP/RMS-backend-fase01/assets/5115895/23ffd5c2-3a42-4f2f-82f7-35ef24e3347f">
>
> Caso a atividade não possua card no Trello, basta omitir o `(scope)`. Por exemplo `docs: Cria o Context Map`.

> 🛈 **Description** deve conter uma descrição curta do que foi feito no commit, pode conter espaços, por exemplo "Cadastro do cliente", "Cria o Domain Story digitalizado" ou "Corrige o cadastro de produtos".

Exemplo completo: `feature(6): Cadastro do cliente`

#### Atenção!

⚠️ As mensagens de commit devem seguir preferencialmente a famosa [Regra dos 50/72](https://dev.to/noelworden/improving-your-commit-message-with-the-50-72-rule-3g79#:~:text=50%20is%20the%20maximum%20number%20of%20characters%20of%20the%20commit%20title%2C%20and%2072%20is%20the%20maximum%20character%20length%20of%20the%20commit%20body) ou seja: A parte da _description_ deve conter no **máximo 50 caracteres** e a mensagem de commit completa incluindo o _type_ e o _scope_ deve conter no **máximo 72 caracteres**.\
⚠️ Os verbos devem estar [sempre no Modo Imperativo](https://stackoverflow.com/a/3580764)! Por exemplo, usar a palavra "**Cria**" ao invés de "Criar", "Criando" ou "Criado".

Para mais informações sobre conventional commits, visite:\
https://blog.rocketseat.com.br/como-fazer-um-commit-conventional-commits/
<br>
https://www.conventionalcommits.org/

## Commits Atômicos

Procure fazer [commits atômicos](https://dev.to/samuelfaure/how-atomic-git-commits-dramatically-increased-my-productivity-and-will-increase-yours-too-4a84), ou seja, _"O menor possível, mas completo"_.

> Algumas das vantagens dos commits atômicos são:
> 1. Facilidade para fazer `revert` no futuro caso por algum motivo seja necessário;
> 2. O histórico do Git fica mais limpo;
> 3. As Pull Requests ficam mais fáceis de revisar;
> 4. Divide um trabalho grande em passos menores.

Para mais informações sobre commits atômicos visite o artigo [How atomic Git commits dramatically increased my productivity - and will increase yours too](https://dev.to/samuelfaure/how-atomic-git-commits-dramatically-increased-my-productivity-and-will-increase-yours-too-4a84#why-should-you-write-atomic-git-commits) no dev.to

#### Dica

Você pode usar o comando `squash` do Git para unificar um ou mais commits em um único commit. Para mais informações, visite https://www.git-tower.com/learn/git/faq/git-squash