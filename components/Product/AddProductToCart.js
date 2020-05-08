import { Item, Label, Input } from "semantic-ui-react";
import AddToCartButton from "./AddToCartButton";

function AddProductToCart({ product }) {
  console.log(product.name);
  console.log(product.mediaUrl);
  return (
    <>
    <Item.Group>
      <Item>
        <Item.Image
          src={product.mediaUrl}
          size="medium"
        />
        <Item.Content>
          <Item.Header>{product.name}</Item.Header>
          <Item.Description>
            <p>${product.price}</p>
            <Label>SKU: {product.sku}</Label>
          </Item.Description>
        <Item.Extra>
          <AddToCartButton productId={product._id} />
        </Item.Extra>
        </Item.Content>
      </Item>
    </Item.Group>   
    </>
  );
}

export default AddProductToCart;
