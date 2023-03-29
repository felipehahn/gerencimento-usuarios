# gerencimento-usuarios
Sistema básico para CRUD de usuários, com controle de acesso para usuário Administrador e usuário comum.<br/>
Front - Angular e TypeScript.<br/>
Back end(API) - Java com Spring Boot, Spring Security e JPA.
<br/>
<br />
##RODAR API##
<br/>
JAVA JDK => Versão 17. <br/>
Utilizei a IDE Eclipse, versão 2023-03. 
<br/>
Adicionar o Spring Tools na IDE => Help > Eclipse Marketplace > Pesquisar por Spring Tools 4 e instalar.
<br />
Após clonar o projeto, adicionar no Eclipse a pasta referente ao projeto da API, que tem o nome de "gerenusers-api" => File > Import > General > File System > <br/>Selecionar o diretório do projeto > Selecionar todos os arquivos do projeto e importar.
<br/>
Depois de importar o projeto, basta acessar o pacote "com.gerenusers", clicar com o botão direito sobre a classe dentro do pacote > Run As > Spring Boot App. Antes <br/> de rodar, é necessário configurar o banco de dados.
<br/>
<br/>
##BANCO DE DADOS##
<br/>
Versão POSTGRES - 15<br/>
Instalar o banco de dados Postgres em sua máquina, no projeto o usuário e senha do banco estão definidos respectivamente como "postgres" e "123456". Mas caso o banco <br/> estiver configurado com outras credenciais, basta alterar essas informações no arquivo application.properties, que fica dentro do projeto no caminho <br/> src/main/resources/application.properties.
<br/>
Com o banco de dados configurado, basta rodar a API.<br/>
Será necessário importar no banco um usuário admin já configurado, sendo o e-mail de login "admin@gmail.com" e senha "1234". Esse arquivo se encontra na raiz do < br/>projeto com o nome de "banco.csv". Para importar, é preciso ter o Pg Admin instalado. Após isso, acessar o banco de dados do servidor no PgAdmin > Schemas > Tables > <br/> Selecionar a tabela usuario > Tools > Import/Export Data > Selecionar o arquivo csv de importação e utilizar a opção Import e Encoding BIG5. Dessa forma já <br/>tera um  usuário cadastrado no banco para realizar todas as operações CRUD do sistema.
<br />
<br />
##RODAR FRONT##
<br/>
Ter instalado o Node JS (Utilizei a versão 16.14.1). <br/>
ANGULAR => Versão 15.2. <br/>
Com o projeto clonado, basta abrir no vsCode a pasta "front" do projeto.<br/>
Abrir o terminal e escrever o comando npm i. <br/>
Após a instalação dos arquivos, basta acessar a pasta package.json e rodar o script start.
