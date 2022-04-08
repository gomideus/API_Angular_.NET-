# API CONSTRUÍDA EM ANGULAR E .NET EM TREINAMENTO TOPDOWN SISTEMAS
- Cadastrar, listar, alterar e remover users (CRUD).
- Utilizado framework material.Angular.
- Implementado o conceito de Clean Code no projeto.
- Utilizado Ng-Mask para máscara de CPF.
- Contruído com base de dados InMemory para testes.
- Adicionada documentação Swagger no projeto (rota usuarios/swagger).
- Autenticação basic (conversão em base 64) apenas para testes.
<br><br><br>
# LOGIN (API)
- Rota de acesso: http://localhost:4200/ OU http://localhost:4200/login
- Tela de autenticação para acesso à API ( usuário padrão: admin, senha: admin ).
- Usuário e senha padrão estão definidos diretamente no back-end, mais especificamente no BasicAuthenticationHandler (para testes).
- Quando o login é efetuado os dados são salvos na memória do navegador ( localStorage.setItem() ).
- O interceptor realiza a leitura dos dados da memoria e converte para base 64 para incluir na header Aauthentication.
![Screenshot_6](https://user-images.githubusercontent.com/68978413/162539708-0402173c-1f51-469c-b596-e0bf4d7f3af4.png)
<br><br><br>
# SWAGGER (DOCUMENTAÇÃO DA API)
- Rota de acesso: https://localhost:5001/swagger/index.html
![Screenshot_7](https://user-images.githubusercontent.com/68978413/162541065-ecd401c4-04cb-4027-8d4a-af5fd417f4fe.png)
<br><br><br>
# READ (LISTAGEM DOS USUÁRIOS)
![Screenshot_1](https://user-images.githubusercontent.com/68978413/162020765-6088ce7a-c69f-47f2-ae70-278d86f57295.png)
<br><br><br>
# CREATE (ADICIONAR USUÁRIO)
![Screenshot_2](https://user-images.githubusercontent.com/68978413/162020901-16da8e93-4c0a-49a5-9734-9433044f26fa.png)
<br><br><br>
# UPDATE (ATUALIZAR DADOS DE USUÁRIO)
![Screenshot_3](https://user-images.githubusercontent.com/68978413/162020969-dafec894-a6eb-4681-89ca-a1fe60435e10.png)
<br><br><br>
# DELETE (APAGAR USUÁRIO)
![Screenshot_4](https://user-images.githubusercontent.com/68978413/162021048-e46fb872-4acf-4f96-83c2-4a6edc237047.png)
![Screenshot_5](https://user-images.githubusercontent.com/68978413/162021060-8e5fc09d-8fa7-4b69-abd8-a55d2cfe61eb.png)
