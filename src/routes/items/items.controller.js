const { saveItem, getAllItems } = require("../../models/items/items.model");

async function httpGetAllNftItems(req, res) {
  const items = await getAllItems();
  // const formatedItems = items.map((item) => {
  //   return {
  //     id: item.id,
  //     tokenName: item.tokenName,
  //     description: item.description,
  //     imageUrl: item.imageUrl,
  //     likes: item.likes,
  //     creator: item.creator,
  //     category: item.category.name,
  //     nftCollection: item.nftCollection.name,
  //     contractAddress: item.contractAddress,
  //     price: {
  //       cryptoCurrency: item.price.cryptoCurrency,
  //       priceInCryptoCurrency: item.price.priceInCryptoCurrency,
  //     },
  //     quantity: item.quantity,
  //     auctionExpiryDate: item.auctionExpiryDate,
  //     bids: item.bids,
  //   };
  // });

  return res.status(200).json(await getAllItems());
}

async function httpSaveNftItem(req, res) {
  const { nftItem } = req.body;
  return res.status(200).json(await saveItem(nftItem));
}

module.exports = {
  httpSaveNftItem,
  httpGetAllNftItems,
};
