const DotEnv = require('dotenv')
console.log('process.env.NODE_ENV' , process.env.NODE_ENV);

const parsedEnv = DotEnv.config({ path : `.env.${process.env.NODE_ENV}` }).parsed
module.exports = function () {
  for (let key in parsedEnv) {
    if (typeof parsedEnv[key] === 'string') {
      parsedEnv[key] = parsedEnv[key]
    }
  }
  return parsedEnv
}
