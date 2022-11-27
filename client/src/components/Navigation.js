import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes";
import { useSelector } from "react-redux";

const Navigation = () => {
  const user = useSelector((state) => state.user);

  return (
    <Routes>
      {user.isAuth &&
        authRoutes.map(({ path, Component }) => {
          return <Route key={path} path={path} element={<Component />} exact />;
        })}
      {publicRoutes.map(({ path, Component }) => {
        return <Route key={path} path={path} element={<Component />} exact />;
      })}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default Navigation;
