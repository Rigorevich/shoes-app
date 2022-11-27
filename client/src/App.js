import React from "react";
import Navigation from "./components/Navigation";
import NavBar from "./components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { check } from "./http/userAPI";
import { setIsAuth, setUser } from "./store/slices/userSlice";
import { Spinner } from "react-bootstrap";

function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      check()
        .then((data) => {
          dispatch(setUser(true));
          dispatch(setIsAuth(true));
        })
        .finally(() => setLoading(false));
    }, 1000);
  }, []);

  if (loading) {
    return <Spinner animation="border" />;
  }

  return (
    <>
      <NavBar />
      <Navigation />
    </>
  );
}

export default App;
