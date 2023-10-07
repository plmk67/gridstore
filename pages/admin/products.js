import Sidebar from "../../components/Sidebar";
import { Table, Row, Col, Tooltip, User, Text, Image } from "@nextui-org/react";
import { StyledBadge } from "../../components/table/StyledBadge";
import { IconButton } from "../../components/table/IconButton";
import { EyeIcon } from "../../components/table/EyeIcon";
import { EditIcon } from "../../components/table/EditIcon";
import { DeleteIcon } from "../../components/table/DeleteIcon";
import ProductEditor from "../../components/ProductEditor";

import React, { useState } from "react";

import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Box,
} from "@chakra-ui/react";

export default function Products({ products }) {
  const [editType, setEditType] = useState("");
  const [selectedProduct, setProduct] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = (type, productId) => {
    let selectedProd = products.filter((obj) => {
      return obj.id === productId;
    });
    setProduct(selectedProd[0]);
    setEditType(type);
    onOpen();
  };

  const columns = [
    { name: "PRODUCT NAME", uid: "product_name" },
    { name: "IMAGE", uid: "image" },
    { name: "SKU", uid: "SKU" },

    { name: "STATUS", uid: "published" },
    { name: "PRICE", uid: "price" },

    { name: "ACTIONS", uid: "id" },
  ];

  const renderCell = (product, columnKey) => {
    const cellValue = product[columnKey];

    //the switch cases manages the type of cell

    switch (columnKey) {
      case "product_name":
        return (
          <>
            <Col>
              <Row>
                <Text size="xl">{cellValue}</Text>
              </Row>
            </Col>
          </>
        );
      case "image":
        return <User squared src={product.image} css={{ p: 0 }}></User>;

      case "published":
        return (
          <StyledBadge type={cellValue === true ? "true" : "false"}>
            {cellValue === true ? "PUBLISHED" : "NOT PUBLISHED"}
          </StyledBadge>
        );
      case "price":
        return (
          <Col>
            <Row>
              <Text b size="xl" css={{ tt: "capitalize" }}>
                ${cellValue.toFixed(2)} CAD
              </Text>
            </Row>
          </Col>
        );

      case "id":
        return (
          <Row justify="center" align="center">
            <Col css={{ d: "flex" }}>
              <Tooltip content="Details">
                <IconButton onClick={() => handleClick("View", cellValue)}>
                  <EyeIcon size={20} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip content="Edit Product">
                <IconButton onClick={() => handleClick("Edit", cellValue)}>
                  <EditIcon size={20} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip
                content="Delete Product"
                color="error"
                onClick={() => console.log("Delete Product")}
              >
                <IconButton>
                  <DeleteIcon size={20} fill="#FF0080" />
                </IconButton>
              </Tooltip>
            </Col>
          </Row>
        );
      default:
        return cellValue;
    }
  };

  function testFunction() {
    console.log("test");
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-full">
        <div className="ml-4 mt-4">
          <h1 className="font-bold text-2xl">Products</h1>
        </div>

        <div className="m-4">
          <Table
            aria-label="table of product details"
            css={{
              height: "auto",
              minWidth: "100%",
            }}
            selectionMode="none"
            lined
            headerLined
          >
            <Table.Header columns={columns}>
              {(column) => (
                <Table.Column
                  key={column.uid}
                  hideHeader={column.uid === "actions"}
                  align={column.uid === "actions" ? "center" : "start"}
                >
                  {column.name}
                </Table.Column>
              )}
            </Table.Header>
            <Table.Body items={products}>
              {(product) => (
                <Table.Row>
                  {(columnKey) => (
                    <Table.Cell>{renderCell(product, columnKey)}</Table.Cell>
                  )}
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>
      </div>
      <Drawer onClose={onClose} isOpen={isOpen} size={"xl"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader className="ml-4">{editType} Product</DrawerHeader>
          <DrawerBody className="mx-4">
            <div>
              <ProductEditor selectedProduct={selectedProduct} />
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch(`http://localhost:4000/api/products/`);

  // `https://gridstore-backend.herokuapp.com/api/products/`
  const data = await res.json();

  return {
    props: { products: data.products },
  };
};

{
  /* <div>
<div className="font-bold">Product Name</div>
<div>{selectedProduct.product_name}</div>
</div>

<div className="mt-4">
<img
  className="w-40"
  src={selectedProduct.image}
  alt={selectedProduct.slug}
/>
</div>

<div className="mt-4">
<div className="font-bold">Price</div>
<div>${selectedProduct?.price?.toFixed(2)} CAD</div>
</div>

<div className="mt-4">
<div className="font-bold">Slug</div>
<p>{selectedProduct.slug}</p>
</div>

<div className="mt-4">
<div className="font-bold">ID</div>
<p>{selectedProduct.id}</p>
</div>

<div className="mt-4">
<div className="font-bold">SKU</div>
<p>{selectedProduct.SKU}</p>
</div>

<div className="mt-4">
<div className="font-bold">Product Description</div>
<p>{selectedProduct.description}</p>
</div> */
}
