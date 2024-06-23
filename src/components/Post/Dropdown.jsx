import React, { useRef, useState } from "react";
import { BsTrashFill } from "react-icons/bs";
import { db } from "../../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { MdEdit } from "react-icons/md";
import Modal from "../Modal";

const Dropdown = ({ tweet, setIsEditMode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const inputRef = useRef();

  // dropdown kapatma işlemi
  const close = () => {
    inputRef.current.checked = false;
  };

  // güncelleme
  const handleEdit = () => {
    setIsModalOpen(true);
    //dropdown kapat
    close();
  };

  // silme
  const handleDelete = () => {
    const answer = confirm("Twwet'i silmek istediğinize eminmisiniz?");

    if (answer) {
      // silmek istenilen doc'un referansını alma;
      const ref = doc(db, "tweets", tweet.id);
      // doc silme;
      deleteDoc(ref)
        .then(() => toast.error("Tweet Silindi."))
        .catch((err) => toast.error("Tweet silinirken bir hata oluştu!"));

      //dropdown kapat
      close();
    }
  };
  return (
    <>
      <label className="popup">
        <input ref={inputRef} type="checkbox" />

        <div className="burger">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <nav className="popup-window">
          <legend>Hareketler</legend>

          <ul>
            <li className="hover:bg-green-500 transition duration-500">
              <button onClick={handleEdit}>
                <MdEdit />
                <span>Düzenle</span>
              </button>
            </li>

            <hr />

            <li className="hover:bg-red-500  transition duration-500">
              <button onClick={handleDelete}>
                <BsTrashFill />
                <span>Sil</span>
              </button>
            </li>
          </ul>
        </nav>
      </label>
      {isModalOpen && (
        <Modal tweet={tweet} close={() => setIsModalOpen(false)} />
      )}
    </>
  );
};
export default Dropdown;
