import React from 'react';
import axios from 'axios';
import ProductList from "../components/Index/ProductList";
import baseUrl from "../utils/baseUrl";

function Home({ products }) {
  // console.log(products);
  return <ProductList products={products} />  
}

Home.getInitialProps = async () => {
  //Fetch data on server
  const url = `${baseUrl}/api/products`;
  const response = await axios.get(url);
  //return an object
  return { products: response.data }
  //pass data props and it can merge with the existing props
};
export default Home;


