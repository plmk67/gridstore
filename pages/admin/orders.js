import AdminHeader from "../../components/AdminHeader";
import Sidebar from "../../components/Sidebar";

export default function Order({ orderInfo }) {
  //server-side rendering
  //table
  //sort
  //CRUD action

  console.log(orderInfo);

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <h1>Order</h1>
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch(`http://localhost:4000/api/products/`);

  // `https://gridstore-backend.herokuapp.com/api/products/`
  const data = await res.json();

  return {
    props: { orderInfo: data },
  };
};
