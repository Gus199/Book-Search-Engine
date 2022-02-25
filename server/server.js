const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');

const app = express();
const PORT = process.PORT || 3001;
const server = new ApolloServer({typeDefs, resolvers})

async function startApolloServer(typeDefs, resolvers){
  // const server = new ApolloServer({typeDefs, resolvers})
  // const app = express();
  await server.start();
  server.applyMiddleware({app});
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      // console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
  // server.applyMiddleware({app});
  
  // app.listen(PORT, () => {
  // console.log(`Server is listening on port ${PORT}${server.graphqlPath}`);
// })
// startApolloServer(typeDefs, resolvers);
}

// startApolloServer(typeDefs, resolvers);

// server.applyMiddleware({ app });
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

startApolloServer(typeDefs, resolvers);

// db.once('open', () => {
//   app.listen(PORT, () => {
//     console.log(`API server running on port ${PORT}!`);
//     // console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
//   });
// });
