
import { useState } from 'react';
import { Form, Input, TextArea, Button, Image, Message, Header, Icon, Loader } from "semantic-ui-react";
import axios from 'axios';
import baseUrl from '../utils/baseUrl';

function CreateProduct() {
  const InitialState = {
    name: '',
    price: '',
    media: '',
    description: ''
  };
  const [product, setProduct] = React.useState(InitialState);
  const [mediaPreview, setMediaPreview] = React.useState('');
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  function handleChange(event) {
    //console.log(event);
    const { name, value, files } = event.target;
    if (name === "media") {
      setProduct(prevState => ({ ...prevState, media: files[0] }));
      setMediaPreview(window.URL.createObjectURL(files[0]));
    } else {
      setProduct( (prevState) => ({...prevState, [name]: value }));
    }
     //written [name] instead of name. So it take name as variable. else it will consider 'name' as a string. 
    // console.log(product);
  }

  async function handleImageUpload() {
    const data = new FormData();
    data.append('file', product.media)
    data.append('upload_preset', 'ReactHousehold')
    data.append('cloud_name', 'purvi')
    const response = await axios.post(process.env.CLOUDINARY_URL, data)
    const mediaUrl = response.data.url
    return mediaUrl;
   }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true)
    const mediaUrl = await handleImageUpload()
    console.log({ mediaUrl });
    const url = `${baseUrl}/api/product`
    const { name, price, description } = product
    const payload = { name, price, description, mediaUrl };
    const response = await axios.post(url, payload);
    setLoading(false);
    setProduct(InitialState);//This will clearout data upon submit.
    setSuccess(true);
  }
  return (
    <>
      <Header as="h2" block>
        <Icon name="add" color="orange"/>
        Create New Product
      </Header>
      <Form loading={loading} success={success} onSubmit={handleSubmit}>
        <Message
          success
          icon="check"
          header="Success"
          content="Your order has ben posted successfully!!"
        />
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            name="name"
            label="Name"
            placeholder="Name"
            type="text"
            value={product.name}
            onChange={handleChange}
          />

          <Form.Field
            control={Input}
            name="price"
            label="Price"
            placeholder="Price"
            min="0.00"
            step="0.01"
            type="number"
            value={product.price}
            onChange={handleChange}
          />

          <Form.Field
            control={Input}
            name="media"
            label="Media"
            content="Select an image"
            type="file"
            accept="image/*"
            onChange={handleChange}
          />
        </Form.Group>
        <Image
          src={mediaPreview} rounded centered size="small"
        />
          <Form.Field
            control={TextArea}
            name="description"
            label="Description"
            placeholder="description"
            type="text"
            value={product.description}
            onChange={handleChange}
        />
        
          <Form.Field
            control={Button}
            disabled={loading}
            name="submit"
            label="Submit"
            icon="pencil alternate"
            type="submit"
            content="Submit"
            color="blue"
          />
      </Form>
    </>
  );
}

export default CreateProduct;
