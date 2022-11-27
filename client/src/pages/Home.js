import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import ShoesList from "../components/ShoesList";
import { useDispatch, useSelector } from "react-redux";
import { fetchBrands, fetchShoes, fetchTypes } from "../http/shoesAPI";
import {
  setBrands,
  setShoes,
  setTotalCount,
  setTypes,
} from "../store/slices/shoesSlice";
import Pages from "../components/Pages";

const Home = () => {
  const shoes = useSelector((state) => state.shoes);
  const dispatch = useDispatch();

  React.useEffect(() => {
    fetchTypes().then((data) => dispatch(setTypes(data)));
    fetchBrands().then((data) => dispatch(setBrands(data)));
    fetchShoes(0, 0, 1, 3).then((data) => {
      dispatch(setShoes(data.rows));
      dispatch(setTotalCount(data.count));
    });
  }, []);

  React.useEffect(() => {
    fetchShoes(
      shoes.selectedType.id,
      shoes.selectedBrand.id,
      shoes.page,
      3
    ).then((data) => {
      dispatch(setShoes(data.rows));
      dispatch(setTotalCount(data.count));
    });
  }, [shoes.page, shoes.selectedType, shoes.selectedBrand]);

  return (
    <Container>
      <Row className="mt-5">
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9}>
          <BrandBar />
          <ShoesList />
          <Pages />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
