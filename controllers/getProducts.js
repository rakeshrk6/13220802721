const { fetchProducts } = require("../utils/fetchProducts")
const { generateToken } = require("../utils/generateToken")
const axios = require("axios")
const { v4: uuidv4 } = require("uuid")

const companies = ["AMZ", "FLP", "SNP", "MYN", "AZO"]

async function getProducts(req, res) {
  const token = await generateToken()
  const { categoryname } = req.params
  const { top, minPrice, maxPrice, key, order, page } = req.query
  const limit = top ? parseInt(top) : 10
  const offset = page ? (parseInt(page) - 1) * limit : 0

  try {
    let products = []
    for (const company of companies) {
      const companyProducts = await fetchProducts(
        token,
        company,
        categoryname,
        limit,
        minPrice,
        maxPrice
      )
      products = products.concat(companyProducts)
    }
    // console.log("prod", products)
    products = getProductsId(products)
    const sortedProducts = getTopNProducts(products, key, order)
    const pageProducts = sortedProducts.slice(offset, offset + limit)

    res.json(pageProducts)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}

async function getProductById(req, res) {
  const { categoryname, productId } = req.params
  const { top, minPrice, maxPrice, key, order, page } = req.query
  const limit = top ? parseInt(top) : 10
  const token = await generateToken()

  try {
    for (const company of companies) {
      const products = await fetchProducts(
        token,
        company,
        categoryname,
        limit,
        minPrice,
        maxPrice
      )
      const product = products.find((p) => p.id === productId)
      if (product) {
        return res.json(product)
      }
    }
    res.status(404).json({ error: "No data not found" })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}

const getProductsId = (products) => {
  return products.map((product) => ({
    ...product,
    id: uuidv4(),
  }))
}

const getTopNProducts = (products, key, order) => {
  if (key) {
    products.sort((a, b) => {
      if (order === "asc") {
        return a[key] - b[key]
      } else {
        return b[key] - a[key]
      }
    })
  }
  return products
}

module.exports = { getProductById, getProducts }
