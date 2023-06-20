import React from "react";
import DBHeader from "./DBHeader";
import { Route, Routes } from "react-router-dom";
import DBHome from "./DBHome";
import DBUsers from "./DBUsers";
import DBNewItem from "./DBNewItem";
import DBItems from "./DBItems";
import DBOrder from "./DBOrder";

const DBRightSection = () => {
  return (
    <div className="flex flex-col flex-1 h-full px-12 py-12">
      <DBHeader />
      <div className="flex flex-col flex-1 overflow-y-scroll scrollbar-none">
        <Routes>
          <Route path="/home" element={<DBHome />} />
          <Route path="/order" element={<DBOrder />} />
          <Route path="/items" element={<DBItems />} />
          <Route path="/newitem" element={<DBNewItem />} />
          <Route path="/users" element={<DBUsers />} />
        </Routes>
      </div>
    </div>
  );
};

export default DBRightSection;
