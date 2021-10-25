const DotEnv = require('dotenv')
const parsedEnv = DotEnv.config({ path : `.env.${process.env.NODE_ENV}` }).parsed
console.log(parsedEnv);

module.exports = function () {
  for (let key in parsedEnv) {
    if (typeof parsedEnv[key] === 'string') {
      parsedEnv[key] = parsedEnv[key]
    }
  }
  return parsedEnv
}
