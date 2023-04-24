# Messaging Board
A React web application that communicates with firebase through a GraphQL server.

## Development
To start developing to the application, run:
```bash
git clone https://github.com/ciantfv456/notes.git
cd notes
```

To run the GraphQL server, run:
```bash
just graphql
```
and go to http://localhost:3000/graphql

To run the react backend server, run:
```bash
just backend
```
and go to http://localhost:3000/

To deploy, run:
```bash
just deploy $REALEASE_NAME
```