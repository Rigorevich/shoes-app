import React from "react";
import Modal from "react-bootstrap/Modal";
import { Form, Button, Dropdown, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setBrands,
  setSelectedBrand,
  setSelectedType,
  setShoes,
  setTypes,
} from "../../store/slices/shoesSlice";
import {
  createShoes,
  fetchBrands,
  fetchShoes,
  fetchTypes,
} from "../../http/shoesAPI";

const CreateShoes = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const shoes = useSelector((state) => state.shoes);

  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState();
  const [sizes, setSizes] = React.useState("");
  const [file, setFile] = React.useState(null);
  const [info, setInfo] = React.useState([]);

  React.useEffect(() => {
    fetchTypes().then((data) => dispatch(setTypes(data)));
    fetchBrands().then((data) => dispatch(setBrands(data)));
  }, []);

  const addInfo = () => {
    setInfo([...info, { title: "", description: "", number: Date.now() }]);
  };

  const changeInfo = (key, value, number) => {
    setInfo(
      info.map((i) => (i.number === number ? { ...i, [key]: value } : i))
    );
    console.log(info);
  };

  const addShoes = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", `${price}`);
    formData.append("sizes", sizes);
    formData.append("img", file);
    formData.append("brandId", shoes.selectedBrand.id);
    formData.append("typeId", shoes.selectedType.id);
    formData.append("info", JSON.stringify(info));
    createShoes(formData).then((data) => onHide());
  };

  const removeInfo = (number) => {
    setInfo(info.filter((i) => i.number !== number));
  };

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить обувь
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown>
            <Dropdown.Toggle>
              {shoes.selectedType.name || "Выберите тип"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {shoes.types.map((type) => (
                <Dropdown.Item
                  onClick={() => dispatch(setSelectedType(type))}
                  key={type.id}
                >
                  {type.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="mt-2">
            <Dropdown.Toggle>
              {shoes.selectedBrand.name || "Выберите бренд"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {shoes.brands.map((brand) => (
                <Dropdown.Item
                  onClick={() => dispatch(setSelectedBrand(brand))}
                  key={brand.id}
                >
                  {brand.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-3"
            placeholder="Введите название обуви"
          />
          <Form.Control
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="mt-3"
            placeholder="Введите цену обуви"
            type="number"
          />
          <Form.Control
            value={sizes}
            onChange={(e) => setSizes(e.target.value)}
            className="mt-3"
            placeholder="Введите размеры обуви через запятую..."
          />
          <Form.Control className="mt-3" type="file" onChange={selectFile} />
          <Button className="mt-3" onClick={addInfo} variant="outline-success">
            Добавить новое свойство
          </Button>
          {info.map((i) => (
            <Row className="mt-2" key={i.number}>
              <Col md={4}>
                <Form.Control
                  value={i.title}
                  onChange={(e) =>
                    changeInfo("title", e.target.value, i.number)
                  }
                  placeholder="Введите название свойства"
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  value={i.description}
                  onChange={(e) =>
                    changeInfo("description", e.target.value, i.number)
                  }
                  placeholder="Введите описание свойства"
                />
              </Col>
              <Col md={4}>
                <Button
                  onClick={() => removeInfo(i.number)}
                  variant={"outline-danger"}
                >
                  Удалить
                </Button>
              </Col>
            </Row>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="outline-success" onClick={addShoes}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateShoes;
