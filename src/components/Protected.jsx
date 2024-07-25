import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

// parent Rout'un elementi
const Protected = () => {
  const [isAuth, setIsAuth] = useState();

  useEffect(() => {
    // kullanıcının oturumunu izler ve otorumda bir değişiklik olduğunda fonksiyonu tetikler.
    onAuthStateChanged(auth, (user) => {
      setIsAuth(user ? true : false);
    });
  }, []);

  // eğer kullanıcının yetkisi yoksa "Login" sayfasına yönlendir.
  if (isAuth === false) {
    return <Navigate to={"/"} replace />;
  }

  // eğer yetkisi var ise alt route'daki elementi göster.
  return <Outlet />;
};

export default Protected;
