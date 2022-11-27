import React from "react";
import { Card, Container, Form, Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";
import { login, registration } from "../http/userAPI";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuth, setUser } from "../store/slices/userSlice";

const Auth = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isLogin = pathname === LOGIN_ROUTE;

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const click = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password);
      }
      dispatch(setUser(data));
      dispatch(setIsAuth(true));
      navigate(HOME_ROUTE);
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Введите email..."
          />
          <Form.Control
            className="mt-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите пароль..."
            type="password"
          />
          <div className="d-flex justify-content-between align-items-center mt-3">
            {isLogin ? (
              <div>
                Нет аккаунта?{" "}
                <Link to={REGISTRATION_ROUTE}>Зарегистрируйтесь!</Link>
              </div>
            ) : (
              <div>
                Есть аккаунт? <Link to={LOGIN_ROUTE}>Войдите!</Link>
              </div>
            )}
            <Button variant="outline-success" className="w-25" onClick={click}>
              {isLogin ? "Войти" : "Регистрация"}
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default Auth;
