import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { db } from "../../firebase";
import upLoad from "../../utils/upLoad";
import { toast } from "react-toastify";
import Loader from "../Loader";

const Modal = ({ tweet, close }) => {
  const [isLoading, setIsLoading] = useState(false);

  // form gönderilince
  const handleSubmit = async (e) => {
    e.preventDefault();

    // inputlardaki verilere eriş
    const text = e.target[0].value;
    const file = e.target[1].files[0];
    setIsLoading(true);
    // güncellenecek olan doc referansını al
    const tweetRef = doc(db, "tweets", tweet.id);
    try {
      // eğer dosya seçilmedi ise sadece yazıyı güncelle
      if (!file || !file?.type.startsWith("image")) {
        await updateDoc(tweetRef, {
          textContent: text,
          isEdited: true,
        });

        toast.success("Tweet bilgileri güncellendi");
        return close();
      }

      // dosya seçildi ise hem yazı hem fotoyu güncelle
      // seçilen fotoyu storage'a yükle
      const newUrl = await upLoad(file);

      // belgenin hem yazı hem foto değerini güncelle
      await updateDoc(tweetRef, {
        textContent: text,
        imageContent: newUrl,
        isEdited: true,
      });

      // başarılı ise bildirim gönder
      toast.success("Tweet bilgileri güncellendi");
    } catch (error) {
      // başarısız ise
      console.log(error);
      toast.error("Bir hata oluştu");
    }
    setIsLoading(false);
    close();
  };
  return (
    <div className="fixed inset-0 w-full h-full grid place-items-center bg-gray-600 bg-opacity-30">
      <div className="bg-black rounded-md py-10 px-8 w-full max-w-[600px] flex flex-col min-h-[60vh] max-h-[80vh] shadow-lg shadow-white">
        <div className="flex justify-between">
          <h1 className="text-xl font-bold">Tweet'i Düzenle</h1>

          <button onClick={close}>
            <IoMdClose
              className="text-3xl
            transition hover:text-gray-500"
            />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex-1 flex flex-col justify-between mt-10"
        >
          <div className="flex flex-col">
            <label className="mb-4">İçeriği Değiştir</label>
            <input
              defaultValue={tweet.textContent}
              className="border rounded-md p-1 text-black"
              type="text"
            />
            <label className="mt-10 mb-4">Fotoğraf Ekle/Değiştir</label>
            <input
              className="outline-none border rounded-md p-1 "
              type="file"
              name="file"
            />
          </div>
          <div className="flex justify-end gap-5">
            <button
              onClick={close}
              className="bg-gray-500 rounded-full py-2 px-4 hover:bg-gray-600"
              type="button"
            >
              Vazgeç
            </button>
            <button
              disabled={isLoading}
              className="bg-blue-500 rounded-full py-2 px-4 hover:bg-blue-600 min-w-[80px] flex justify-center items-center"
              type="submit"
            >
              {isLoading ? <Loader /> : "Kaydet"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
