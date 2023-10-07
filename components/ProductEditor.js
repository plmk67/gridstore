import { Formik, Field, Form, useFormik } from "formik";
import * as Yup from "yup";

export default function ProductEditor({ selectedProduct }) {
  const {
    product_name,
    SKU,
    cost,
    description,
    id,
    image,
    price,
    published,
    quantity,
    slug,
  } = selectedProduct;

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      onSubmit: (values) => {
        const { product_name, image, SKU, published, price, id } = values;

        let editProduct = {
          product: {
            product_name,
            image,
            SKU,
            published,
            price,
            id,
          },
        };

        //update Product Route API
      },
    });
  console.log(selectedProduct);

  return (
    <div>
      <h1>Product Editor</h1>
      <h2>Product Name {product_name}</h2>
    </div>
  );
}
