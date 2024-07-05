const express = require("express")
require("dotenv").config()

const { generateToken } = require("./utils/generateToken")
const { fetchProducts } = require("./utils/fetchProducts")
const { getProductById, getProducts } = require("./controllers/getProducts")

const app = express()
const PORT = 3000

// const fetchProductsData = async (
//   token,
//   company,
//   category,
//   top,
//   minPrice,
//   maxPrice
// ) => {
//   minPrice = minPrice ? minPrice : 1
//   maxPrice = maxPrice ? maxPrice : 100000000
//   const url = `http://20.244.56.144/test/companies/${company}/categories/${category}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`
//   try {
//     const res = await axios.get(url, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     })
//     console.log("res", res)
//     return res.data
//   } catch (e) {
//     console.log(`Error fetching data from ${company}:`, e)
//   }
// }

app.get("/categories/:categoryname/products", getProducts)

app.get("/categories/:categoryname/products/:productId", getProductById)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
