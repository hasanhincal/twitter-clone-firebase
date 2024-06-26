import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../firebase";

const ResetButton = ({ email }) => {
  // şifre sıfırlama e-postası gönder;
  const handleReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() =>
        toast.info(
          "Şifre sıfırlama e-postası gönderildi.Mailinizi kontrol ediniz."
        )
      )
      .catch((err) => toast.error("Bir hata oluştu: " + err.code));
  };
  return (
    <button onClick={handleReset} className="text-red-500 m-auto">
      Şifrenizi mi unuttunuz?
    </button>
  );
};

export default ResetButton;
