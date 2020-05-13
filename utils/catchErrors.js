function catchErrors(error, displayError) {
  let errorMsg;
  if (error.response) {
    /*the request was made and the server responsed with 
    status code that is not in the range of 2xx*/
    errorMsg = error.response.data;
    console.log("Error Response", errorMsg)

    //for Cloudinary image uploads
    if (error.response.data.error) {
      errorMsg = error.response.data.error.message
    }
  } else if (error.request) {
  /*the error was made but no response was received*/
    errorMsg = error.request;
    console.log("Erroe Request", errorMsg)
  } else {
  /*Something else happened in making the request that triggerred an error*/
    errorMsg = error.message;
    console.log("Erroe message", erroeMsg)
  }
  displayError(errorMsg);
}
export default catchErrors