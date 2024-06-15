import { signInWithPopup } from "firebase/auth";
import React from "react";
import { auth, provider } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const GoogleButton = () => {
  const navigate = useNavigate();
  // google hesabı ile oturum açma ;
  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        navigate("/feed");
        toast.success("Hesab ile giriş başarılı");
      })
      .catch(() => toast.error("Giriş başarısız mailinizi kontrol edin!"));
  };
  return (
    <button
      onClick={handleLogin}
      className="flex items-center gap-3 py-2 px-10 whitespace-nowrap rounded-full hover:bg-gray-300 transition bg-white text-black "
    >
      <img className="h-[20px]" src="google-logo.png" alt="google-logo" />
      Google ile Giriş Yap
    </button>
  );
};

export default GoogleButton;
