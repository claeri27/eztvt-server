const db = require('../models')
const { Op } = require('Sequelize')

module.exports = {
  Query: {
    User: async (parents, args, context, info) => {
      return db.User.findByPk(args.id)
    },
    Show: async (parents, args, context, info) => {
      const key = Object.keys(args)[0]
      if (key === 'name') {
        return db.Show.findOne({ where: { name: args.name } })
      } else {
        return db.Show.findByPk(args.id)
      }
    },
    Shows: async (parents, args, context, info) => {
      const keys = Object.keys(args)
      if (keys.length === 1) {
        switch (keys[0]) {
          case 'network':
            return db.Show.findAll({
              where: { network: args.network },
            })
          case 'status':
            return db.Show.findAll({
              where: { status: args.status },
            })
          case 'country':
            return db.Show.findAll({
              where: { country: args.country },
            })
        }
      } else if (keys.length === 2) {
        console.log('KEY0: ', keys[0], 'KEY1: ', keys[1])
        if (keys[0] === 'network') {
          switch (keys[1]) {
            case 'status':
              return db.Show.findAll({
                where: {
                  [Op.and]: [
                    { network: args.network },
                    { status: args.status },
                  ],
                },
              })
            case 'country':
              return db.Show.findAll({
                where: {
                  [Op.and]: [
                    { network: args.network },
                    { country: args.country },
                  ],
                },
              })
          }
        } else if (keys[0] === 'status') {
          return db.Show.findAll({
            where: {
              [Op.and]: [{ status: args.status }, { country: args.country }],
            },
          })
        }
      } else {
        return db.Show.findAll({
          where: {
            [Op.and]: [
              { network: args.network },
              { status: args.status },
              { country: args.country },
            ],
          },
        })
      }
    },
  },
  Mutation: {
    createUser: async (_, { params }, context) => {
      const user = await db.User.create(params)
      return user.dataValues
    },
  },
}
