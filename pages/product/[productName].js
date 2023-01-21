import React from "react";

const Product = ({ query }) => {
  console.log(query);
  return <div>{query.productName}</div>;
};

//good for SEO
Product.getInitialProps = ({ query }) => {
  return { query };
};

export default Product;
