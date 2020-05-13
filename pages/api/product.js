import Product from "../../models/Product";
import connectDb from "../../utils/connectDb";

connectDb();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res);
      break;
    
    case "POST":
      await handlePostRequest(req, res);
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
  res.status(204).json({});
}

async function handlePostRequest(req, res) {
  try {
    const { name, price, mediaUrl, description } = req.body;
      if (!name || !price || !mediaUrl || !description) {
      return res.status(422).send("Product missing one or more field")
  }
  const product = await new Product({
    name,
    price,
    mediaUrl,
    description
  }).save()
  res.status(201).json(product);
  } catch (error) {
    res.status(500).send("Error")
  }
  
}

// export default async (req, res) => {
//   const { _id } = req.query;
//   const product = await Product.findOne({ _id });
//   res.status(200).json(product);
// }