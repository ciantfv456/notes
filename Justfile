# use PowerShell instead of sh:
set shell := ["powershell.exe", "-c"]

@setup:
  cd graphql\server; npm install;
  cd messaging-board; npm install;

@graphql:
	node graphql\server\app;

@backend:
  cd messaging-board; npm start

@build context tag:
  docker build $context -t $tag
  docker push $tag

@deploy release:
  helm install $release deploy/