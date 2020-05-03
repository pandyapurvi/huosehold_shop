import React from 'react';
import axios from 'axios';


function Home({ products }) {
  //console.log(products);
  // React.useEffect(() => {
  //   getProducts()
  // }, []) //Second argument is dependany

  // async function getProducts() {
  //   const url = "http://localhost:3000/api/products";
  //   const response = await axios.get(url);
  //   console.log(response.data);
  // }

  return <>home</>;
}

Home.getInitialProps = async () => {
  //Fetch data on server
  const url = "http://localhost:3000/api/products";
  const response = await axios.get(url);
  //return an object
  return { products: response.data }
  //pass data props and it can merge with the existing props
};

export default Home;
