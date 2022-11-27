import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ADMIN_ROUTE, HOME_ROUTE, LOGIN_ROUTE } from "../utils/consts";
import { setIsAuth, setUser } from "../store/slices/userSlice";
import { IoIosCart } from "react-icons/io";

const NavBar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    dispatch(setUser({}));
    dispatch(setIsAuth(false));
    navigate(LOGIN_ROUTE);
  };
  console.log(user);

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Link
          className="text-white text-decoration-none"
          style={{
            fontWeight: 600,
            fontSize: "20px",
          }}
          to={HOME_ROUTE}
        >
          Shoes-shop
        </Link>
        {user.isAuth ? (
          <Nav className="ml-auto text-white gap-4 align-items-center">
            {user.user.role === "ADMIN" ? (
              <Button
                variant="outline-light"
                onClick={() => navigate(ADMIN_ROUTE)}
              >
                Админ панель
              </Button>
            ) : (
              <IoIosCart size="25px" style={{ cursor: "pointer" }} />
            )}
            <Button variant="outline-light" onClick={logOut}>
              Выйти
            </Button>
          </Nav>
        ) : (
          <Nav className="ml-auto text-white gap-4">
            <Button
              variant="outline-light"
              onClick={() => {
                navigate(LOGIN_ROUTE);
              }}
            >
              Авторизация
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;
