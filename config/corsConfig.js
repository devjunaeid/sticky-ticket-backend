const allowed = require("./allowedOrigin")

const corsConfig = {
  origin: (origin, callback) => {
    if (allowed.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error("Origin not allowed!"))
    }
  },
  credentials: true,
  optionSuccessStatus: 200,
}


module.exports = corsConfig
