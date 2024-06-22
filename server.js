const express = require("express")
const path = require("path")
const cors = require("cors")
const corsConfig = require("./config/corsConfig.js")
const cookieParser = require("cookie-parser")
const { logger } = require("./middleware/logger")
const errorlogger = require("./middleware/errorLogger.js")

const PORT = process.env.PORT || 3001
const HOST = process.env.HOST || "localhost"

const app = express()

app.use(logger)
app.use(cors(corsConfig))
app.use(express.json())


app.use(cookieParser())

app.use("/", express.static(path.join(__dirname, "/public")))
app.use("/", require("./routes/root"))


// Not found Handler.
app.all("*", (req, res) => {
  res.status(404)

  if (req.accepts("html")) {
    res.sendfile(path.join(__dirname, "views", "notfound.html"))
  } else if (req.accepts("json")) {
    res.json({
      msg: "Requested Route not found."
    })
  } else {
    res.type("txt").send("404 Not found.")
  }
})

// Error Middleware handler.
app.use(errorlogger)

app.listen(PORT, HOST, () => {
  console.log(`Server is running on port ${PORT}`)
})
