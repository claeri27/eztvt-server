const axios = require('axios')

const getShows = async () => {
  let showList = []
  for (let page = 1; page <= 5; page++) {
    const { data } = await axios(
      `https://www.episodate.com/api/most-popular?page=${page}`,
    )
    const tvShows = data.tv_shows
    showList = showList.concat(
      tvShows.map(
        ({
          id: databaseId,
          name,
          start_date: startDate,
          end_date: endDate,
          country,
          network,
          image_thumbnail_path: imageThumbnailPath,
          status,
        }) => {
          return {
            databaseId,
            name,
            startDate,
            endDate,
            country,
            network,
            status,
            imageThumbnailPath,
            createdAt: new Date(),
            updatedAt: new Date(),
          }
        },
      ),
    )
    console.log('PAGE: ', page)
  }
  return showList
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Shows', await getShows(), {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Shows', null, {})
  },
}
