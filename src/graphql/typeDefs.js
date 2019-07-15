const gql = require('graphql-tag')
const path = require('path')
const fs = require('fs')

const typeDefs = fs
  .readFileSync(path.resolve(__dirname, 'typeDefs.graphql'))
  .toString()

module.exports = gql(typeDefs)
