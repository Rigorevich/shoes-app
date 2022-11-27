import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "react-bootstrap";
import { setPage } from "../store/slices/shoesSlice";

const Pages = () => {
  const shoes = useSelector((state) => state.shoes);
  const dispatch = useDispatch();
  const pageCount = Math.ceil(shoes.totalCount / shoes.limit);
  const pages = [];

  for (let i = 1; i <= pageCount; i++) pages.push(i);

  return (
    <Pagination style={{ position: "absolute", bottom: "50px" }}>
      {pages.map((page) => (
        <Pagination.Item
          key={page}
          active={shoes.page === page}
          onClick={() => dispatch(setPage(page))}
        >
          {page}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};

export default Pages;
