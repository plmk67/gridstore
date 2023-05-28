import Sidebar from "../../components/Sidebar";
import { Table, Row, Col, Tooltip, User, Text, Image } from "@nextui-org/react";
import { StyledBadge } from "../../components/table/StyledBadge";
import { IconButton } from "../../components/table/IconButton";
import { EyeIcon } from "../../components/table/EyeIcon";
import { EditIcon } from "../../components/table/EditIcon";
import { DeleteIcon } from "../../components/table/DeleteIcon";

export default function Products({ products }) {
  console.log(products);

  const columns = [
    { name: "PRODUCT NAME", uid: "product_name" },
    { name: "IMAGE", uid: "image" },
    { name: "SKU", uid: "SKU" },
    { name: "PRODUCT ID", uid: "id" },
    { name: "STATUS", uid: "published" },
    { name: "PRICE", uid: "price" },

    { name: "ACTIONS", uid: "actions" },
  ];

  const renderCell = (product, columnKey) => {
    const cellValue = product[columnKey];

    //the switch cases manages the type of cell

    switch (columnKey) {
      case "product_name":
        return (
          <Col>
            <Row>
              <Text size="xl">{cellValue}</Text>
            </Row>
          </Col>
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

      case "actions":
        return (
          <Row justify="center" align="center">
            <Col css={{ d: "flex" }}>
              <Tooltip content="Details">
                <IconButton onClick={() => console.log("View Product")}>
                  <EyeIcon size={20} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip content="Edit Product">
                <IconButton onClick={() => console.log("Edit Product")}>
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

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-full">
        <div className="ml-4 mt-4">
          <h1 className="font-bold text-2xl">Products</h1>
        </div>

        <div className="m-4">
          <Table
            aria-label="Example table with custom cells"
            css={{
              height: "auto",
              minWidth: "100%",
            }}
            selectionMode="none"
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
    </div>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch(`http://localhost:4000/api/products/`);
  const data = await res.json();

  return {
    props: { products: data.products },
  };
};
