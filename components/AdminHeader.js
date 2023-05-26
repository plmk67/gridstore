import React from "react";
import Link from "next/link";

const AdminHeader = () => {
  return (
    <div className="flex justify-between pb- w-full">
      <Link href="/">
        <div className="text-xl font-medium hover:opacity-75">GRIDS</div>
      </Link>

      <div className="flex text-xl font-semi flex-row justify-end w-1/2">
        <Link href="/admin/order" className="pr-10">
          <div className="hover:underline transition hover:delay-75">Order</div>
        </Link>
        <Link href="/admin/inventory">
          <div className="hover:underline transition hover:delay-75">
            Inventory
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminHeader;
