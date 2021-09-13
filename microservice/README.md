### icarus Api

------------

#### Especificações

- Nodejs 14.17.0
- Docker 20.10.7
- Docker compose 1.29.2
- NestJs 8.0.1
- Typescript 4.3.5
- TypeORM 0.2.34
- Jest 27.0.6

------------

#### Instalação

##### Sem docker(local)

Clonar o projeto, navegar até a pasta **app** e executar: ```npm install```. após o comando concluir, basta
executar `npm run start:dev` o projeto iniciará na porta **3000**. O comando `npm run start:dev` inicia o projeto em **
hot reload** então não há necessidade de parar e executar o projeto a cada alteração no projeto.

##### Com docker

Clonar o projeto, na **raiz do projeto** rodar `docker-compose -f docker-compose.develop.yml up`. Um container
chamado **api-icarus-node-dev** iniciará na porta especificada no arquivo **.env** na raiz do projeto. O
comando `docker-compose -f docker-compose.develop.yml up` também inicia o projeto em **hot reload** não havendo
necessidade de matar o container e criar novamente.

###### mas nem tudo são rosas

- se caso precise instalar uma dependencia(npm) será necessário recriar o container. pois o proprio container é
  responsavel por instalar a dependencia, ou seja, execute o seu npm install ou registre a sua dependencia no
  package.json, após isso execute o container novamente, ele instalará a dependencia novamente.
- há problemas em que quando se inicia o projeto no container, e por algum motivo, seja executado localmente(sem o
  docker), a dependencia **bcrypt** dá pau (alguma coisa relacionada ao linux). Para resolver basta remover a mesma e
  instalar novamente.

------------

#### Estrutura do Projeto

[imagem ps1 aqui]

- **.gitlab:** pasta com coisas relacionadas ao gitlab(modelos de issues, imagens do readme entre outras...)
- **app:** Pasta que contém todo o **projeto**
- **icarus-generator:** projeto do gerador customizado do icarus(explicarei isso logo abaixo)
- **.dockerignore:** arquivo docker responsável por especificar o que não sera copiado para dentro da imagem ao fazer o
  build da imagem docker.
- .**env:** arquivo de configuração do container(porta entre outros)
- .gitignore: não precisa especificar.
- **docker-compose.develop.yml:** arquivo de configuração do docker compose responsavel por iniciar o container de **
  desenvolvimento**
- **docker-compose.prod.yml:** arquivo de configuração do docker compose responsavel por iniciar o container de **
  produção**
- docker-compose.yml: arquivo de configuração **geral** do docker compose.

Como explicado acima, todo o projeto se encontra dentro da pasta **app**. O projeto usa **clean architecture** com
padrões de repositorio(repository pattern), serviço(service pattern), IOC(inversion of control) e outros. Segue a
imagem:

- **node_modules**: dependencias do npm
- **src**: pasta de código da aplicação(trabalharemos a maior parte do tempo aqui)
    - **applications**: pasta onde o dominio(regra de negócio) fica.
        - **applications.module.ts**: arquivo de registros de cada **dominio** na framework.
    - **core**: pasta do nucleo da aplicação
    - **infrastructure**: pasta de "detalhes de implementação"(orm, guarda de rotas, integrações...) do projeto.
        - **database**: pasta relacionada ao banco de dados bem como seu ORM
            - **contracts**: contratos(interfaces) que cada repositório deve implementar
                - **repository**: contratos de repositórios
                - **transactions**: contrato da transaction(em pausa)
                - **index.ts**: registro do IOC dos repositórios.
            - **typeorm**: pasta relacionada ao orm.
                - **connection**: pasta que contém o gerenciador de conexão customizado do orm
                - **core**: pasta que contem classes reusáveis para os repositórios e entidades
                - **entities**: pasta que contem as entidades e os repositorios de cada tabela do banco
                - **migrations**: pasta que contem as migrations do banco
- **test**: pasta de test e2e padrão do nest
- **.eslintrc.js**: não é usado(formatador de código)
- **.prettierrc**: não é usado (formatador de codigo)
- **icarus-generator-x.x.x.tgz**: dependencia do gerador customizado do icarus
- **nest-cli.json**: arquivo de configuração do nest framework
- **ormconfig.js**: arquido de conexão, configuração do de BD do typeORM
- **ormconfig_example.js**: arquivo de exemplo para o arquivo **ormconfig.js**(basta renomear)
- **package.json**: arquivo de configração do npm
- **package-lock.json**: arquivo de configração do npm
- **README.md**: este arquivo de manual
- **start-develop.sh**: arquivo shell que possui os comandos para instalação e configuração no ato da build do container
  de **desenvolvimento**
- **start-prod.sh**: arquivo shell que possui os comandos para instalação e configuração no ato da build do container
  de **produção**
- **tsconfig.build.json**: arquivo de configuração do typescript no ato da build
- **tsconfig.json**: arquivo geral de configuração do typescript .

------------

#### Início do desenvolvimento

*Aqui é onde a brincadeira começa...*
Antes de descer a lenha vamos colocar o projeto para rodar.
- há dois arquivos que precisam ser implementados, um **.env** e um **ormconfig.js**
- renomeie o arquivo **.env_example** para **.env** e coloque toda a configuração do projeto/container lá(pergunte ao seu coleguinha do lado)
- faça a mesma coisa com o arquivo **ormconfig_example.js**. para as credenciais do banco, peça ao seu coleguinha do lado também.

Toda a regra de *domínio*(considere dominio como somente a regra de negocio, sem banco ou 'detalhes de implementação')
fica em **app/src/applications** onde a regra de negocio da funcionalidade fica agrupada por pastas(gosto de chamar de
módulo de negócio), ex: regra de negocio do *login* fica dentro de uma pasta chamada *login*. ex:

![](.gitlab/images/ps3.png)

Conforme na imagem, temos dois exemplos, um de *auth* e o outro de *administration* onde auth é um *módulo simples* e
administration é um módulo *composto*.


Como a imagem mostra, cada módulo possui quatro pastas que são:

- **controller**: pasta onde fica o controller, o mesmo é responsável por toda a configuração HTTP(roteamento, validação
  de parametros, body e etc...)
- **service**: pasta onde fica o arquivo de serviço, o mesmo é responsável por toda a **logica de negócio** comunicação
  com repository e etc...
- **dto**: pasta onde fica os arquivos DTO(Data Transfer Object), os mesmos são responsáveis por ditar a regra de
  validação junto com o controller.

##### Criar um modulo de negócio

Seria muito repetitivo e chato criar toda esta estrutura no braço, pensando nos meus coleguinhas foi que desenvolvi um
gerador customizado para a estrutura, que se chama **icarus-generator**. Para usar esta belezura tecnológica basta rodar
o comando `npm run generator:endpoint`, o gerador solicitará o nome do módulo(dash-case) e a pasta de destino, caso seja
somente um modulo simples, basta passar uma barra(/) no caminho. Para registrar o novo módulo, basta importar a classe
módulo(xxx.module.ts) no arquivo de modulo onde a o modulo de negocio se encontra(applications.module caso seja um
modulo simples, ou xyz.module caso a plasta de destino do modulo recem criado seja a xyz)

##### Configurar e registrar os endpoints no banco de dados

Por padrão, todo endpoint é autenticado, mas em alguns casos precisamos que um determinado endpoint não passe pela
validação de credenciais(quando se esta desenvolvendo tambem) para que seja possivel deixar o endpoint aberto foi criado
uma annotation chamada `@PublicRoute()` basta usar esta annotation em cima da anotation de rota e a mesma deixara de ser
verificada pelos guardas de rota.

Após o desenvolvimento e estiver tudo certinho, é hora de registrar as rotas no banco de dados, pois é a partir daí que
os guardas buscam todas as permissoes de rota por usuário. Para realizar o registro no banco de dados basta parar a
aplicação e rodar o comando `npm run save-routes-db`, ele inicia a aplicação, registra a rota e para a aplicação
novamente, após isso basta iniciar a aplicação normalmente e pronto, as rotas foram registradas.

##### Criar a tabela, registrar e adicionar ao módulo de negócio

Até agora vimos como gerar um módulo de negócios, agora veremos como persistir o fruto deste processamento no banco de
dados, para isto precisamos criar a(s) tabela(s) referentes ao módulo de negócio.

No TypeORM para cada **tabela** existirá um **repositório**, sendo um arquivo somente para a definição da tabela(
.entity) e outro somente para consultas(.repository). segue exemplo:

![](.gitlab/images/ps4.png)

Para gerar este tipo de estrutura, há um comando no icarus `npm run generate:entity`, o gerador solicitará o nome da tabela, e após a resposta será gerado ambos os arquivos mostrados na imagem dentro da pasta **infrastructure/database/typeorm/entities**, além do arquivo de contrato(interface) do repository para o registro do IOC dentro da pasta **infrastructure/contracts/repository**
Por padrão o repository já vai com os metodos de CRUD padrão(list,get,save,delete) assim como o contrato já vai com as assinaturas desses metodos.
Caso seja necessário uma consulta customizada, a mesma deve ser escrita no arquivo de repository, pois é responsabilidade do mesmo gerenciar toda a comunicação com a entity. Não esqueça de registrar a função no contrato(interface) do repositório.

Para registrar a entity/repository para ser usado no nosso módulo de negócio, basta adicionar no arquivo **infrastructure/contracts/repository/index.ts** o modelo do código:
```javascript
export const UsersRepositoryProvider: Provider = {
    provide: 'IUsersRepository', //nome da interface
    useClass: UsersRepository //nome da classe
}
```
Este código diz ao container de IOC que toda injeção de dependencia com o valor da chave *provide* corresponde a classe declarada no *useClass*.

Após o registro, podemos fazer a injeção de dependencia do repository no service do nosso módulo de negócio, segue exemplo:
```javascript
 constructor(
        @Inject('IUsersRepository') private repo: IusersRepository
 ){}
```
Registrar também no module do módulo de negócio o provider, exemplo:
```javascript
providers: [UserRepositoryProvider],
```

#### Migrar models para o banco de dados
Até agora, geramos os models no projeto, nenhuma tabela relacionada a eles foi gerada no banco, para isso existe o comando
`npm run migration:generate --name=[NOME DA MIGRATION]` que gera um arquivo de migração.
toda alteração nas entities relacionada as tabelas precisará gerar uma migração, pois assim teremos como
controlar as alterações de estrutura do banco.
Para executar a migração é necessário parar a execução do container e iniciá-lo novamente, o comando de execução de migração
executará assim que o container for iniciado.

###### Alguns pontos a considerar
- para gerar as migrations localmente(sem a necessidade de acessar o container), no arquivo **ormconfig.js**
deverá conter uma conexão chamada **default** pois esta conexão é levada em consideração para gerar a migração.
- caso não queira ter uma conexão **default** voce pode acessar o container e gerar o a migração com o mesmo comando especificado acima
    - exemplo:
     - execute: `docker exec -it [nome do container] /bin/sh`;
     - após o comando execute: `npm run migration:generate --name=[nome da migração]`
    
Porquê isso acontece?

Por conta de que o nome da conexão é especificado na variável de ambiente do container docker, por conta disso devemos
acessar o container e gerar a migração por ele, ou devemos ter uma conexão 'default'
para o comando do typeorm gerar a migration.

Após todos estes passos, sua aplicação estará funcionando a comunicação com o banco.

#### Testes
Para testar a nossa regra, usamos testes e2e e mock de repository, é muito importante a escrita de testes(apesar de ser um saco) pois assim conseguimos ter uma qualidade maior nas entregas e integrações.
Por Padrão, o **icarus-generator** gera um arquivo de testes padrão, podendo ser totalmente customizado dependendo da sua regra a ser implementada.
Para rodar os testes basta executar o comando `npm run test:module --module=[modulo-a-ser-testado]`ele testará o modulo isoladamente(ganho de desempenho).

#### E os exemplos?
Qualquer dúvida, basta olhar o módulo de **auth** pois ele já se encontra 100% funcional, ou o módulo de **administration** pois é um módulo mais 'completo'.

#### e a documentação dos endpoints?
O gerador gera uma documentação padrão totalmente customizavel, para acessar a documentação basta acessar: **http://localhost:[port]/docs** o modelo de documentação é o extraordinario swagger(leia com deboche).

isto é tudo.
abraços.


