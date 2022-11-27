import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedBrand } from "../store/slices/shoesSlice";
import { Card } from "react-bootstrap";

const BrandBar = () => {
  const dispatch = useDispatch();
  const shoes = useSelector((state) => state.shoes);

  return (
    <div className="d-flex gap-2 flex-wrap">
      {shoes.brands.map((brand) => (
        <Card
          style={{ cursor: "pointer" }}
          onClick={() => dispatch(setSelectedBrand(brand))}
          key={brand.id}
          className="p-2"
          border={brand.id === shoes.selectedBrand.id ? "danger" : "light"}
        >
          {brand.name}
        </Card>
      ))}
    </div>
  );
};

export default BrandBar;
