const user = require('./User')
const article = require('./Article')

module.exports = (router) => {
  user(router)
  article(router)
}
