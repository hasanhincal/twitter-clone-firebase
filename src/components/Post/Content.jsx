import { doc, updateDoc } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { BiSolidSave } from "react-icons/bi";
import { ImCancelCircle } from "react-icons/im";
import { db } from "../../firebase";
import { IoMdReturnLeft } from "react-icons/io";
import { BsTrashFill } from "react-icons/bs";

const Content = ({ tweet, close, isEditMode }) => {
  // resmi silme durumu;
  const [isDelete, setIsDelete] = useState(false);
  // input referansını alma;
  const inputRef = useRef();

  // kaydetme;
  const handleSave = async () => {
    const newText = inputRef.current.value;
    // documet referansını alma;
    const tweetRef = doc(db, "tweets", tweet.id);
    // document güncelleme;
    if (isDelete) {
      await updateDoc(tweetRef, {
        textContent: newText,
        imageContent: null,
        isEdited: true,
      });
    } else {
      await updateDoc(tweetRef, {
        textContent: newText,
        isEdited: true,
      });
    }
    // editmode'u kapat
    close();
  };
  return (
    <>
      <div>
        <div>
          <input
            type="text"
            defaultValue={tweet?.textContent}
            ref={inputRef}
            className="rounded border-none outline-none p-1 px-2 text-white bg-transparent "
          />
          <button
            onClick={handleSave}
            className="text-green-400 mx-5 p-2 rounded-full shadow hover:shadow-green-400 transition"
          >
            <BiSolidSave />
          </button>
          <button
            onClick={close}
            className="text-red-400 mx-5 p-2 rounded-full shadow hover:shadow-red-400 transition"
          >
            <ImCancelCircle />
          </button>
          {tweet.imageContent && (
            <div className="relative">
              <img
                className={`${
                  isDelete ? "blur" : ""
                } my-2 rounded-lg w-full object-cover max-h-[400px]`}
                src={tweet?.imageContent}
                alt=""
              />
              <button
                onClick={() => {
                  setIsDelete(!isDelete);
                }}
                className="absolute top-0 right-0 text-red-600 text-xl bg-white p-2 rounded-full transition hover:scale-90"
              >
                {isDelete ? <IoMdReturnLeft /> : <BsTrashFill />}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Content;
