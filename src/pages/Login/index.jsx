import React, { useState } from "react";
import GoogleButton from "./GoogleButton";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ResetButton from "../../components/ResetButton";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  // form gönderildiğinde;
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      // kaydolma modunda ise: hesap oluştur
      createUserWithEmailAndPassword(auth, email, pass)
        .then(() => {
          toast.success("Hesabınız Oluşturuldu");
          navigate("/feed");
        })
        .catch((err) => toast.error("Bir sorun oluştu! >> " + err.code));
    } else {
      // giriş yapma modunda ise: hesaba giriş yap
      signInWithEmailAndPassword(auth, email, pass)
        .then(() => {
          toast.success("Giriş başarılı");
          navigate("/feed");
        })
        .catch((err) => {
          // eğer giriş bilgileri yanliş bilgisi geldiyse:
          if (err.code === "auth/invalid-credential") {
            // state'i true 'ya çek
            setIsError(true);
          }
          toast.error("Giriş başarısız: " + err.code);
        });
    }
  };

  return (
    <div className="h-dvh  bg-[#242424] text-white grid place-items-center">
      <div className="bg-black flex flex-col gap-8 py-16 px-32 rounded-lg">
        <div className="flex justify-center">
          <img
            className="h-[60px]"
            src="twitter-x-logo.png"
            alt="x shaped logo black and white"
          />
        </div>
        <h1 className="text-lg font-bold text-center">Twitter'a Giriş Yap</h1>

        <GoogleButton />

        <form onSubmit={handleSubmit} className="flex flex-col">
          <label>Email</label>
          <input
            required
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            className="text-black rounded mt-1 p-2 outline-none shadow-lg focus:shadow-[gray]"
          />
          <label className="mt-5">Şifre</label>
          <input
            required
            type="password"
            onChange={(e) => setPass(e.target.value)}
            className="text-black rounded mt-1 p-2 outline-none shadow-lg focus:shadow-[gray]"
          />
          <button className="bg-white text-black mt-10 rounded-full p-1 font-bold hover:bg-gray-300 transition">
            {isSignUp ? "Kayıt Ol" : "Giriş Yap"}
          </button>
        </form>
        <p className="flex justify-start">
          <span className="text-gray-500 me-2">
            {isSignUp ? "Hesabınız varsa" : "Hesabınız yoksa"}
          </span>
          <span
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-blue-500 hover:text-blue-600 transition cursor-pointer"
          >
            {isSignUp ? "Giriş yapın" : "Kayıt Olun"}
          </span>
        </p>
        {isError && <ResetButton email={email} />}
      </div>
    </div>
  );
};

export default Login;
