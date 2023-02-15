import React from "react";
import ProductCard from "./ProductCard";

//todo: generate FeaturedCollection to show on bottom of ProductPage and Cart

//Get StaticProps not working as a component.

// export const getStaticProps = async () => {
//   const res = await fetch("http://localhost:4000/api/products/");
//   const data = await res.json();

//   return {
//     props: { products: data },
//   };
// };

const FeaturedCollection = () => {
  return (
    // <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 px-8">
    //   {products.products.map((product, index) => {
    //     return <ProductCard product={product} index={index} />;
    //   })}
    // </div>
    <h1>Featured Collection will be here</h1>
  );
};

export default FeaturedCollection;
