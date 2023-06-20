import React from "react";
import { DataTable } from "../components";
import { HiCurrencyRupee } from "react-icons/hi2";
import { useSelector } from "react-redux";

const DBItems = () => {
  const products = useSelector((state) => state.products);
  return (
    <div className="flex items-center w-full gap-6 pt-6 justify-self-center">
      <DataTable
        columns={[
          {
            title: "image",
            field: "imageURL",
            render: (rowData) => (
              <img
                src={rowData.imageURL}
                className="object-contain w-32 h-16 rounded-md"
              />
            ),
          },
          {
            title: "Name",
            field: "product_name",
          },
          {
            title: "Category",
            field: "product_category",
          },
          {
            title: "Price",
            field: "product_Price",
            render: (rowData) => (
              <p className="text=2xl font-semibold text-textColor ">
                <HiCurrencyRupee className="text=red=400" />
                {parseFloat(rowData.product_Price).toFixed(2)}
              </p>
            ),
          },
        ]}
        data={products}
      />
    </div>
  );
};

export default DBItems;
