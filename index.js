import express from 'express';
import {graphqlHTTP} from "express-graphql";
import {schema} from "./src/data/schema";

const app = express();
const PORT = 8888;

// serving static files
app.use(express.static('public'));

app.get('/', (req, res) =>
    res.send(`GraphQL is running on port ${PORT}`)
);
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(PORT, () =>
    console.log(`Your server is running on localhost: ${PORT}/graphql`)
);