import React from "react";
import { auth, db, storage } from "../firebase";
import dfPhoto from "../../public/twitter-df-picture.png";
import { BsCardImage } from "react-icons/bs";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";

const TweetForm = () => {
  // kolleksiyonun referansını alma;
  const tweetsCol = collection(db, "tweets");

  // resmi storage'a yükler ve url'ini dödürür
  const uploadImage = async (image) => {
    // gönderilen dosyayı kontrol et!
    if (!image) {
      return null;
    }

    // resmin storage 'daki yerini ayarla;
    const storageRef = ref(storage, `${new Date().getTime()}${image?.name}`);

    // resmi ayarladığımız konuma yükle;
    const url = await uploadBytes(storageRef, image)
      // yükleme bittiğinde resmi url'ini al;
      .then(
        (res) =>
          getDownloadURL(res.ref).catch(() =>
            toast.error("Resmi yüklerken hata oluştu!")
          )
        // fonksiyonun çağrıldığı yere url'ini gönderme;
      );

    return url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const textContent = e.target[0].value;
    const imageContent = e.target[1].files[0];

    // resmi storage'a yükleyip url'ni alma;
    const url = await uploadImage(imageContent);

    if (!textContent) {
      toast.info("Tweet içeriği ekleyin!");
      return;
    }

    // tweeti kolleksiyona ekler;
    await addDoc(tweetsCol, {
      textContent,
      imageContent: url,
      createdAt: serverTimestamp(),
      user: {
        id: auth?.currentUser?.uid,
        name: auth?.currentUser?.displayName,
        picture: auth?.currentUser?.photoURL
          ? auth.currentUser.photoURL
          : dfPhoto,
      },
      likes: [],
    });
    // inputları sıfırlama
    e.target[0].value = "";
    e.target[1].value = null;
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 p-4 border-b border-b-zinc-800"
    >
      <img
        className="rounded-full h-12"
        src={auth?.currentUser?.photoURL ? auth.currentUser.photoURL : dfPhoto}
        alt="user-photo"
      />
      <div className="w-full">
        <input
          type="text"
          placeholder="Neler Oluyor?"
          className="w-full bg-transparent outline-none placeholder:text-lg text-gray-400 my-2"
        />
        <div className="flex justify-between">
          <div className="cursor-pointer hover:bg-zinc-500 transition duration-[400ms] p-2 rounded-full">
            <label className="cursor-pointer" htmlFor="inp-file">
              <BsCardImage />
            </label>
            <input className="hidden" type="file" name="" id="inp-file" />
          </div>
          <button className="bg-blue-600 hover:bg-blue-500 rounded-full px-4 transition">
            Tweetle
          </button>
        </div>
      </div>
    </form>
  );
};

export default TweetForm;
