const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs")
const fsPromises = require("fs").promises
const path = require("path")

const logEvents = async (msg, fileName) => {
  const date = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
  const logsLines = `${date}\t${uuid()}\t${msg}\n`


  // Checking if log dir exist.
  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"))
    } else {
      await fsPromises.appendFile(path.join(__dirname, "..", "logs", fileName), logsLines)
    }
  } catch (error) {
    console.log(error);
  }
}


const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, "requestsLog.log");
  console.log(`${req.method}\t${req.url}`)
  next()
}

module.exports = { logEvents, logger }
