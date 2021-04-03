/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
const isAuthenticated = async (req, res, next) => {
  if (req.session.userId) {
    return next()
  }
  const err = new Error('Not logged in or logged out yet')
  err.statusCode = 400
  next(err)
}
module.exports = { isAuthenticated }
