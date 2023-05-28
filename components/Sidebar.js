import React from "react";
import Link from "next/link";
import {
  MdDashboard,
  MdInventory,
  MdArticle,
  MdPointOfSale,
} from "react-icons/md";

const Sidebar = () => {
  return (
    <div className="flex flex-col w-[200px]  bg-neutral-300 h-screen">
      <div className="ml-4 pt-4">
        <Link href="/">
          <div className="text-2xl font-medium hover:opacity-75">GRIDS</div>
        </Link>
      </div>

      <div className="flex flex-col font-light pt-6 ">
        <div className="flex flex-row items-center   hover:bg-neutral-400 transition h-10 ">
          <div className="ml-4 pr-2">
            <MdDashboard />
          </div>
          <Link href="/admin">Dashboard</Link>
        </div>

        <div className="flex flex-row items-center mt-2 hover:bg-neutral-400 transition h-10 ">
          <div className="ml-4 pr-2">
            <MdInventory />
          </div>
          <Link href="/admin/inventory">Inventory</Link>
        </div>

        <div className="flex flex-row items-center mt-2 hover:bg-neutral-400 transition h-10 ">
          <div className="ml-4 pr-2">
            <MdInventory />
          </div>
          <Link href="/admin/products">Products</Link>
        </div>

        <div className="flex flex-row items-center mt-2  hover:bg-neutral-400 transition h-10">
          <div className="ml-4  pr-2">
            <MdPointOfSale />
          </div>
          <Link href="/admin/orders">Orders</Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
