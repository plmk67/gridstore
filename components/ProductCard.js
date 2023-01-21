import React from "react";
import Link from "next/link";

const ProductCard = (product, key) => {
  const {
    SKU,
    description,
    id,
    image,
    price,
    product_name,
    published,
    quantity,
    slug,
  } = product.product;

  return (
    <Link href={`/product/${slug}`}>
      <div key={key}>
        <img src={image} alt={slug} className="object-fill w-full" />
        <div className="flex flex-row justify-between pt-2 font-light">
          <div>
            <p>{product_name}</p>
          </div>
          <div>${price}</div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
