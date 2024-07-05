const axios = require("axios")

async function generateToken() {
  const data = {
    companyName: "Afformed-RK",
    clientID: "2af471cf-673d-442d-ba04-1deb61ad3c42",
    clientSecret: "qtPtCYuNqeTxduHm",
    ownerName: "Rakesh",
    ownerEmail: "krakesh7788@gmail.com",
    rollNo: "13220802721",
  }
  const authUrl = "http://20.244.56.144/test/auth"
  const res = await axios.post(authUrl, data)
  return res.data.access_token
}

module.exports = { generateToken }
