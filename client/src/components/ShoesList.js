import React from "react";
import { useSelector } from "react-redux";
import { Row } from "react-bootstrap";
import ShoesItem from "./ShoesItem";

const ShoesList = () => {
  const { shoes } = useSelector((state) => state.shoes);
  return (
    <div className="d-flex gap-5 flex-wrap">
      {shoes.map((item) => (
        <ShoesItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ShoesList;
