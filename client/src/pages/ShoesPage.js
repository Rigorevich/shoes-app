import React from "react";
import star from "../assets/star.svg";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { fetchOneShoes } from "../http/shoesAPI";

const ShoesPage = () => {
  const [shoes, setShoes] = React.useState({ info: [] });
  const { id } = useParams();
  React.useEffect(() => {
    fetchOneShoes(id).then((data) => setShoes(data));
  }, []);

  console.log(shoes);

  return (
    <Container className="mt-3">
      <Row className="d-flex align-items-center justify-content-around">
        <Col md={8}>
          <h2 className="mt-5">{shoes.name}</h2>
          <Image src={"http://localhost:7000/" + shoes.img} width={500} />
        </Col>
        <Col md={4}>
          <Card
            className="d-flex flex-column align-items-center justify-content-around"
            style={{
              width: 300,
              height: 300,
              fontSize: 32,
              border: "5px solid lightgray",
            }}
          >
            <h3>Цена: {shoes.price} руб.</h3>
            <Button variant={"outline-success"}>Добавить в корзину</Button>
          </Card>
        </Col>
      </Row>
      <Row className="d-flex flex-column m-3 pb-4">
        <h3>Характеристики</h3>
        {shoes.info.map((info, index) => (
          <Row
            key={info.id}
            style={{
              background: index % 2 === 0 ? "lightgray" : "transparent",
              padding: 5,
            }}
          >
            {info.title}: {info.description}
          </Row>
        ))}
      </Row>
    </Container>
  );
};

export default ShoesPage;
