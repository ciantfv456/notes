# dependencies-resolver

detective, install and simplify dependencies without package.json，exclude node built-in modules automatically

## install

```
npm install dependencies-resolver ## yarn add dependencies-resolver
```

## usage

```
import requireResolver from "dependencies-resolver"
await requireResolver('PATH')
```

## params

Search dependencies and install

@param path — search path

@param attach — attach dependencies

@param npmClient — package install client

@param excludeOption — options excluded from package.json

@param extend — filter suffix of searching files

@param {boolean} silent silent info

@return — <dependencies,version> installed
