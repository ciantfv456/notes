# use PowerShell instead of sh:
set shell := ["powershell.exe", "-c"]

@setup:
  cd graphql\server; npm install;
  cd messaging-board; npm install;

@graphql:
	node graphql\server\app;

@backend:
  cd messaging-board; npm start

@build-image context tag:
  docker build $context -t $tag
  docker push $tag

@build tag:
  just build-image messaging-board messaging-board/backend:$tag;
  just build-image graphql/server messaging-board/graphql:$tag;

@deploy release:
  helm install $release deploy/