import React from "react";
import star from "../assets/star.svg";
import { Link, useNavigate } from "react-router-dom";
import { Card, Col, Image } from "react-bootstrap";
import { SHOES_ROUTE } from "../utils/consts";

const ShoesItem = ({ item }) => {
  const navigate = useNavigate();
  const sizes = item.sizes.split(",").map((num) => Number(num));
  return (
    <div>
      <Card
        onClick={() => navigate(`${SHOES_ROUTE}/${item.id}`)}
        className="mt-3"
        style={{
          width: 170,
          cursor: "pointer",
          padding: "5px 10px 5px 10px",
          boxShadow:
            "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
        }}
        border="light"
      >
        <Image
          width={150}
          height={150}
          style={{ borderRadius: "5px" }}
          src={"http://localhost:7000/" + item.img}
        />
        <div className="d-flex justify-content-between align-items-center mt-1">
          <div>{item.name}</div>
        </div>
        <div
          className="d-flex justify-content-between mt-2"
          style={{ fontSize: 14 }}
        >
          <div className="d-flex gap-1">
            {sizes.map((size) => {
              return <span key={size}>{size}</span>;
            })}
          </div>
          <span>{item.price} BYN</span>
        </div>
      </Card>
    </div>
  );
};

export default ShoesItem;
