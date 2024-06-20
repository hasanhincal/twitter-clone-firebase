import React, { useRef } from "react";
import { BsThreeDotsVertical, BsTrashFill } from "react-icons/bs";
import { auth, db } from "../../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { FcEditImage } from "react-icons/fc";
import { MdEdit } from "react-icons/md";

const Dropdown = ({ tweet, setIsEditMode }) => {
  const checkBox = useRef();
  console.log(checkBox);
  const handleDelete = () => {
    const answer = confirm("Twwet'i silmek istediğinize eminmisiniz?");

    if (answer) {
      // silmek istenilen doc'un referansını alma;
      const ref = doc(db, "tweets", tweet.id);
      // doc silme;
      deleteDoc(ref)
        .then(() => toast.error("Tweet Silindi."))
        .catch((err) => toast.error("Tweet silinirken bir hata oluştu!"));
    }
  };
  return (
    <>
      <label className="popup">
        <input ref={checkBox} type="checkbox" />

        <div className="burger" tabIndex="0">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <nav className="popup-window">
          <legend>İşlemler</legend>

          <ul>
            <li className="hover:bg-green-500 transition duration-500">
              <button
                onClick={() => {
                  checkBox.current.checked = false;
                  // editmodu aktif yap;
                  setIsEditMode(true);
                }}
              >
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
    </>
  );
};
export default Dropdown;
