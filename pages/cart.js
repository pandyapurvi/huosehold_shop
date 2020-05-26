import { Segment } from 'semantic-ui-react';
import CartItemList from "../components/Cart/CartItemList";
import CartSummary from "../components/Cart/CartSummary";
import axios from 'axios';
import baseUrl from "../utils/baseUrl";
import { parseCookies } from "nookies";
function Cart({ products }) {
  console.log(products)
  return (
    <>
      <Segment>
        <CartItemList />
        <CartSummary />
      </Segment>
      
    </>)
    ;
}

Cart.getInitialProps = async ctx => {
  const { token } = parseCookies(ctx)
  if (!token) {
    return { prodcuts: [] }
  }
  const url = `${baseUrl}/api/cart`
  const payload = { header: { Authorization: token } }
  const response = await axios.get(url, payload)
  console.log(response.data)
  return { products: response.data }
}

export default Cart;
