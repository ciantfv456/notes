const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema')
const cors = require('cors');


const app = express();

app.use(cors());

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: schema
}));

app.listen(4000, () => {
    console.log('listening for requests on port 4000')
});

