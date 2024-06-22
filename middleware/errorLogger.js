const { logEvents } = require("./logger")


const errorlogger = (err, req, res, next) => {
  logEvents(`${err.name}\t${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, "error.log")
  console.log(err.stack)
  const status = res.statusCode ? res.statusCode : 500 //server error
  res.status(status)
  res.json({
    msg: err.message
  })
  next()
}

module.exports = errorlogger
