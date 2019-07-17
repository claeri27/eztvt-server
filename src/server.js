require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const chalk = require('chalk')
const { ApolloServer } = require('apollo-server-express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const passport = require('passport')
const sign = payload => jwt.sign(payload, SECRET)
const SECRET = 'THIS IS THE TEST TOKEN'
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const models = require('./models/index')
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')
const PORT = process.env.PORT || 3001
const ENV = process.env.ENV

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET,
}

module.exports = passport.use(
  new JwtStrategy(opts, async (payload, done) => {
    try {
      const user = await models.User.findByPk(payload.id)
      return done(null, user)
    } catch (e) {
      return done(e, false)
    }
  }),
)

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.get('/healthcheck', (req, res) =>
  res.status(200).json({ status: 'healthy' }),
)

app.post('/register', async (req, res) => {
  try {
    console.log(req.body)
    const user = await models.User.create(req.body)
    const { id, username, email } = user.dataValues
    const token = sign({ id, username, email })
    res.json({ user, token })
  } catch (e) {
    console.log(e)
    res.status(500).json({ msg: e.message })
  }
})

app.post('/login', async (req, res) => {
  try {
    const user = await models.User.findOne({
      where: {
        username: req.body.username,
      },
    })
    if (!user) res.json({ msg: 'Username not found' })
    const isVerified = await bcrypt.compare(
      req.body.password,
      user.dataValues.password,
    )
    if (isVerified) {
      const { id, username } = user.dataValues
      const token = sign({ id, username })
      res.json({ user, token })
    } else {
      res.json({ msg: 'Invalid password' })
    }
  } catch (e) {
    console.log(e)
    res.status(500).json({ msg: e.message })
  }
})

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
