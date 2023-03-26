const prices = require("./price.mongo");

async function savePrice(cryptoCurrency, priceInCryptoCurrency) {
  try {
    const price = await prices.create({
      cryptoCurrency,
      priceInCryptoCurrency,
    });
    return price;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  savePrice,
};
