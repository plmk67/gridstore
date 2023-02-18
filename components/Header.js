import React from "react";
import Link from "next/link";
import { useAppContext } from "../context/AppContext";

const Header = () => {
  const { cartQuantity } = useAppContext();
  return (
    <div className="flex justify-between px-8 py-2 w-full">
      <Link href="/">
        <div className="text-xl font-medium hover:opacity-75">GRIDS</div>
      </Link>

      <Link href="/cart">
        <div className="hover:opacity-75">
          Cart {Number(cartQuantity) > 0 ? "(" + cartQuantity + ")" : ""}
        </div>
      </Link>
    </div>
  );
};

export default Header;
