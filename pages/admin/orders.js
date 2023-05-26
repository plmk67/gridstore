import AdminHeader from "../../components/AdminHeader";
import Sidebar from "../../components/Sidebar";

export default function Order() {
  //server-side rendering
  //table
  //sort
  //CRUD action

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <h1>Order</h1>
      </div>
    </div>
  );
}
