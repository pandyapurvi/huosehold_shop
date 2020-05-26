import axios from "axios";
import ProductAttributes from "../components/Product/ProductAttributes";
import AddProductToCart from "../components/Product/AddProductToCart";
import baseUrl from "../utils/baseUrl";


function Product({ product, user }) {
  //console.log(product);
  return (
    <>
      <AddProductToCart product={product} />
      <ProductAttributes user={user} product={product} /> 
    </>
  );
}
Product.getInitialProps = async ({ query }) => {
  const url = `${baseUrl}/api/product?_id=${query._id}`;
  const response = await axios.get(url);

  return { product: response.data }
}

export default Product;
