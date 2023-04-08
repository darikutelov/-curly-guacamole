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

async function findExistingPriceId(cryptoCurrency, priceInCryptoCurrency) {
  const foundPrices = await prices.find({
    cryptoCurrency,
    priceInCryptoCurrency,
  });

  if (foundPrices.length > 0) {
    return foundPrices[0]._id;
  }
}

module.exports = {
  savePrice,
  findExistingPriceId,
};
