import Product from "../../models/Product";
// import { Query } from "mongoose";

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res);
      break;
    
    case "DELETE":
      await handleDeleteRequest(req, res);
      break;
    default:
      res.status(405).send(`this ${req.method} not found`)
  }
}

async function handleGetRequest (req, res) {
  const { _id } = req.query;
  const product = await Product.findOne({ _id });
  res.status(200).json(product);
}

async function handleDeleteRequest(req, res) {
  const { _id } = req.query;
  await Product.findOneAndDelete({ _id });
  res.statu(204).json({});
}

// export default async (req, res) => {
//   const { _id } = req.query;
//   const product = await Product.findOne({ _id });
//   res.status(200).json(product);
// }