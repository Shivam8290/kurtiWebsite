import React from "react";

const Order = ({ token }) => {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Orders</h1>
      <p className="text-gray-600">
        Admin token is ready for protected order requests.
      </p>
      <input type="hidden" value={token} readOnly />
    </div>
  );
};

export default Order;
