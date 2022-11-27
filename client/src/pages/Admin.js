import React from "react";
import { Button, Container } from "react-bootstrap";
import CreateType from "../components/modals/CreateType";
import CreateBrand from "../components/modals/CreateBrand";
import CreateShoes from "../components/modals/CreateShoes";

const Admin = () => {
  const [typeVisible, setTypeVisible] = React.useState(false);
  const [brandVisible, setBrandVisible] = React.useState(false);
  const [shoesVisible, setShoesVisible] = React.useState(false);

  return (
    <Container className="d-flex flex-column ">
      <Button
        variant="outline-primary"
        className="mt-4 p-2"
        onClick={() => setTypeVisible(true)}
      >
        Добавить тип
      </Button>
      <Button
        variant="outline-primary"
        className="mt-4 p-2"
        onClick={() => setBrandVisible(true)}
      >
        Добавить бренд
      </Button>
      <Button
        variant="outline-primary"
        className="mt-4 p-2"
        onClick={() => setShoesVisible(true)}
      >
        Добавить обувь
      </Button>
      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
      <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
      <CreateShoes show={shoesVisible} onHide={() => setShoesVisible(false)} />
    </Container>
  );
};

export default Admin;
