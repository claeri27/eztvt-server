const db = require('../models')
const { Op } = require('Sequelize')

module.exports = {
  Query: {
    User: async (parents, args, context, info) => {
      return db.User.findByPk(args.id)
    },
    // Show: async (parents, args, context, info) => {
    //   return db.Show.findByPk(args.id)
    // },
  },
  Mutation: {
    createUser: async (_, { params }, context) => {
      const user = await db.User.create(params)
      return user.dataValues
    },
  },
}
