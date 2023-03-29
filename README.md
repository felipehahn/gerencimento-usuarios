# gerencimento-usuarios
<p>Sistema básico para CRUD de usuários, com controle de acesso para usuário Administrador e usuário comum.</p>
<p>Front - Angular e TypeScript.</p>
<p>Back end(API) - Java com Spring Boot, Spring Security e JPA.</p>
<br/>
<h2>RODAR API</h2>
<br/>
  <p>JAVA JDK => Versão 17. </p>
  <p>Utilizei a IDE Eclipse => Versão 2023-03. </p>
<p>Adicionar o Spring Tools na IDE => Help > Eclipse Marketplace > Pesquisar por Spring Tools 4 e instalar.</p>
<p>Após clonar o projeto, adicionar no Eclipse a pasta referente ao projeto da API, que tem o nome de "gerenusers-api" => File > Import > General > File System > Selecionar o diretório do projeto > Selecionar todos os arquivos do projeto e importar.</p>
<p>Depois de importar o projeto, basta acessar o pacote "com.gerenusers", clicar com o botão direito sobre a classe dentro do pacote > Run As > Spring Boot App. Antes de rodar, é necessário configurar o banco de dados.</p>
<br/>
<h2>BANCO DE DADOS</h2>
<br/>
<p>POSTGRES => Versão 15.</p>
<p>Instalar o banco de dados Postgres em sua máquina, no projeto o usuário e senha do banco estão definidos respectivamente como "postgres" e "123456". Mas caso o banco estiver configurado com outras credenciais, basta alterar essas informações no arquivo application.properties, que fica dentro do projeto no caminho => src/main/resources/application.properties.</p>
<p>Com o banco de dados configurado, basta rodar a API.</p>
<p>Será necessário importar no banco um usuário admin já configurado, sendo o e-mail de login "admin@gmail.com" e senha "1234". Esse arquivo se encontra na raiz do projeto com o nome de "banco.csv". Para importar, é preciso ter o Pg Admin instalado. Após isso, acessar o banco de dados do servidor no PgAdmin > Schemas > Tables > Selecionar a tabela usuario > Tools > Import/Export Data > Selecionar o arquivo csv de importação e utilizar a opção Import e Encoding BIG5. Dessa forma já tera um  usuário cadastrado no banco para realizar todas as operações CRUD do sistema.</p>
<br/>
<h2>RODAR FRONT</h2>
<br/>
<p>Ter instalado o Node JS (Utilizei a versão 16.14.1). </p>
<p>ANGULAR => Versão 15.2. </p>
<p>Com o projeto clonado, basta abrir no vsCode a pasta "front" do projeto.</p>
<p>Abrir o terminal e escrever o comando npm i. </p>
<p>Após a instalação dos arquivos, basta acessar a pasta package.json e rodar o script start.</p>
