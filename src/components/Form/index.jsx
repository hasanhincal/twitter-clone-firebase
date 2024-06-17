import { BsCardImage } from "react-icons/bs";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import dfPhoto from "../../../public/twitter-df-picture.png";
import { toast } from "react-toastify";
import { auth, db, storage } from "../../firebase";
import upLoad from "../../utils/upLoad";
import { useState } from "react";
import Loader from "../Loader";

const TweetForm = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);

  // tweet gönder;
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1- inputlardaki verilere eriş
    const text = e.target[0].value;
    const file = e.target[1].files[0];

    // 2- yazı ve resim içeriği yoka fonksiyonu durdur ve uyarı ver!
    if (!text && !file) {
      return toast.warning("Tweet içeriği ekleyin!", {
        position: "bottom-right",
      });
    }

    setIsLoading(true);

    try {
      // 3- Dosyayı storage'a yükle;
      const url = await upLoad(file);

      // 4-kolleksiyonun referansını alma;
      const tweetsCol = collection(db, "tweets");

      // 5- tweeti kolleksiyona kaydet;
      await addDoc(tweetsCol, {
        textContent: text,
        imageContent: url,
        createdAt: serverTimestamp(),
        likes: [],
        isEdited: false,
        user: {
          id: auth?.currentUser?.uid,
          name: auth?.currentUser.displayName,
          picture: auth?.currentUser?.photoURL
            ? auth?.currentUser?.photoURL
            : dfPhoto,
        },
      });
    } catch (err) {
      console.log(err);
      toast.error("Bir hata oluştu!!!");
    }

    setIsLoading(false);

    // 6- inputları sıfırla
    e.target.reset();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 p-4 border-b border-b-zinc-600"
    >
      <img
        className="rounded-full h-[35px] md:h-[45px]"
        src={user?.photoURL ? user.photoURL : dfPhoto}
        alt={user?.displayName}
      />
      <div className="w-full">
        <input
          type="text"
          placeholder="Neler Oluyor?"
          className="w-full bg-transparent outline-none placeholder:text-lg text-gray-400 my-2"
        />
        <div className="flex justify-between items-center">
          <label
            className="cursor-pointer hover:bg-gray-800 transition p-4 rounded-full"
            htmlFor="inp-file"
          >
            <BsCardImage />
          </label>
          <input className="hidden" type="file" name="" id="inp-file" />

          <button className="bg-blue-600 hover:bg-blue-800 rounded-full px-4 py-2 transition flex justify-between items-center min-w-[85px] min-h-[40px] ">
            {isLoading ? <Loader /> : "Tweetle"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default TweetForm;
