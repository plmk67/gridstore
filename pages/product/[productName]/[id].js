import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import { useHttpClient } from "../../../components/http-hook";
import { CircularProgress, useToast } from "@chakra-ui/react";

const Product = (query) => {
  const { sendRequest, isLoading, setIsLoading } = useHttpClient();
  const [product, setProduct] = useState({});
  let id = query.query.id;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        let res = await sendRequest(`http://localhost:4000/api/products/${id}`);
        setProduct(res.product);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProduct();
  }, []);

  const { description, image } = product;

  return (
    <div className="bg-[#F5F5F5]">
      <Header />
      {isLoading ? (
        <div className="flex flex-row justify-center items-center h-full ">
          <CircularProgress isIndeterminate />
        </div>
      ) : (
        <div className="flex flex-col-reverse md:flex-row px-4 pt-12">
          <div className="flex flex-row  w-full md:w-1/2">
            <div className="w-2/5 pl-4 ">specs</div>
            <div className="w-3/5">
              <div className="w-4/5 font-light text-xs leading-5">
                {description}
              </div>
            </div>
          </div>
          <div className="flex-row pb-8 w-full md:w-1/2 md:pr-4 ">
            <img className="w-full" src={image} alt="test image" />
          </div>
        </div>
      )}
    </div>
  );
};

Product.getInitialProps = ({ query }) => {
  return { query };
};

export default Product;
