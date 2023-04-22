# use PowerShell instead of sh:
set shell := ["powershell.exe", "-c"]

@setup:
  cd graphql\server; npm install;
  cd messaging-board; npm install;

@graphql:
	node graphql\server\app;

@web:
  cd messaging-board; npm start

@dev:
  docker-compose up

@deploy release:
  helm install $release deploy/