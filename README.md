# MeetApp

App agregador de eventos para desenvolvedores


## Inicialização

### Backend

**docker run --name databaseChallenge -e POSTGRES_PASSWORD=suasenha -p 5432:5432 -d postgres** para criar banco de dados postgres

**yarn sequelize db:migrate** para migrar tabelas para o postgres

**docker run --name redismeet -p 6379:6379 -d -t redis:alpine** para criar banco de dados redis

**docker start databaseChallenge** para iniciar banco postgres

**docker start redismeet** para iniciar banco redis

Criar arquivo **.env** de acordo com o arquivo **.env.example**

**yarn** para instalar as dependências

**yarn dev** para rodar o projeto

**yarn queue** para rodar a fila

### Frontend

**yarn** para instalar as dependências

**yarn start** para rodar o projeto

### Mobile

#### Android

**yarn** para instalar as dependências

**yarn android** para instalar app no dispositivo

**yarn start** para executar app

#### IOS

**yarn** para instalar as dependências

**pod install** na pasta ios para instalar as dependências

**react-native run-ios** para instalar app no dispositivo

**yarn start** para executar app


