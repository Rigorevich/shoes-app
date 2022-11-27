import React from "react";
import { ListGroup } from "react-bootstrap";
import { setSelectedType } from "../store/slices/shoesSlice";
import { useDispatch, useSelector } from "react-redux";

const TypeBar = () => {
  const dispatch = useDispatch();
  const shoes = useSelector((state) => state.shoes);

  return (
    <ListGroup as="ul">
      {shoes.types.map((type) => (
        <ListGroup.Item
          style={{ cursor: "pointer" }}
          onClick={() => dispatch(setSelectedType(type))}
          active={type.id === shoes.selectedType.id}
          key={type.id}
        >
          {type.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default TypeBar;
