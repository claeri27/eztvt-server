require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const chalk = require('chalk')
const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

const PORT = process.env.PORT || 3001
const ENV = process.env.ENV

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.get('/healthcheck', (req, res) =>
  res.status(200).json({ status: 'healthy' }),
)

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.applyMiddleware({ app })

app
  .listen(PORT, () => {
    console.log(chalk.green.bold(`App has opened on port ${PORT}`))
  })
  .setTimeout(500000)
