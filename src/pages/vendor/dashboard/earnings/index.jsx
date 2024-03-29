// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import VendorDashboardNavbar from "../../../../components/ui/Vendor/VendorDashboardNavbar";
import VendorTopBar from "../../../../components/ui/Vendor/VendorTopBar";
import { fetchVendorEarnings } from "../../../../redux/slices/vendorSlice";

function VendorDashboardEarningsPage() {
  const { token, isLoading, vendor, earnings, expectedEarnings } = useSelector(
    (store) => store.vendor
  );
  const dispatch = useDispatch();

  // Mobile navbar handler
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(fetchVendorEarnings({ vendorId: vendor?._id, token }));
    }
  }, [token]);

  return (
    <div className="">
      <ToastContainer />
      {/* Navbar here */}
      <VendorDashboardNavbar
        link="earnings"
        isNavbarOpen={isNavbarOpen}
        setIsNavbarOpen={setIsNavbarOpen}
      />

      {/* Main content goes here */}
      <div className="w-full min-h-screen lg:pl-[6%] bg-white text-shuttlelaneBlack">
        <div className="px-7 py-5 relative">
          {/* Top bar */}
          <VendorTopBar
            isNavbarOpen={isNavbarOpen}
            setIsNavbarOpen={setIsNavbarOpen}
          />

          {/* Main content */}
          <div className="mt-24 pt-2">
            <div className="w-full">
              <div className="w-full flex flex-row text-center justify-center">
                <div>
                  <ToastContainer />
                  <div className="">
                    <h2 className="font-bold text-2xl text-shuttlelaneBlack text-center">
                      Earnings
                    </h2>
                  </div>

                  <p className="text-sm mt-3">
                    <span className="font-semibold">Total Earnings:</span> ₦
                    {Intl.NumberFormat("en-US", {}).format(earnings)}
                  </p>
                  <p className="text-sm text-shuttlelanePurple">
                    <span className="font-semibold">Expected Earnings:</span> ₦
                    {Intl.NumberFormat("en-US", {}).format(expectedEarnings)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendorDashboardEarningsPage;
