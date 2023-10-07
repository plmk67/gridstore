import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="flex flex-col min-[880px]:flex-row max-[880px]:mt-8 justify-between px-8 py-8 w-full bg-zinc-100 ">
      <div className="flex flex-row  w-full justify-between ">
        <div className="text-xs w-1/2">
          <div>(Store Hours)</div>
          <div className="pt-4">
            <div className="pt-2">Tues to Sat — 11am to 5pm</div>
            <div className="pt-2">Sun & Mon — Closed</div>
            <div className="pt-2">Closed on all holidays</div>
          </div>
        </div>

        <div className="text-xs w-1/2">
          <div>(Info)</div>
          <div className="pt-4">
            <div className="pt-2">Objects</div>
            <div className="pt-2">Information</div>
          </div>
        </div>
      </div>

      <div className="flex flex-row w-full max-[880px]:pt-8 justify-between">
        <div className="text-xs w-1/2">
          <div>(OBJECTS FOR EVERYDAY LIFE)</div>
          <div className="pt-4">
            <div className="pt-2 w-4/5 leading-relaxed">
              Design books and stationery and home goods store in Montreal,
              Canada
            </div>
          </div>
        </div>

        <div className="text-xs w-1/2 ">
          <div>(Acknowledge)</div>
          <div className="pt-4">
            <div className="pt-2 leading-relaxed">
              I/We would like to begin by acknowledging that Gridstore is
              located on unceded Indigenous lands. The Kanien’kehá:ka Nation is
              recognized as the custodians of the lands and waters on which we
              gather today. Tiohtià:ke/Montréal is historically known as a
              gathering place for many First Nations. We respect the continued
              connections with the past, present and future in our ongoing
              relationships with Indigenous and other peoples within the
              Montreal community
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
