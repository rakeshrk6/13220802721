const { default: axios } = require("axios")

async function fetchProducts(
  token,
  company,
  category,
  top,
  minPrice,
  maxPrice
) {
  minPrice = minPrice ? minPrice : 1
  maxPrice = maxPrice ? maxPrice : 100000000
  const url = `http://20.244.56.144/test/companies/${company}/categories/${category}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`
  try {
    const res = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    console.log("res", res)
    return res.data
  } catch (e) {
    console.log(`Error fetching data from ${company}:`, e)
  }
}

module.exports = { fetchProducts }
