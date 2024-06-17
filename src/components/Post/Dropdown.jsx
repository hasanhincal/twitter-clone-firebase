import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { auth, db } from "../../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

const Dropdown = ({ tweet }) => {
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
      {/* tweet'i oturumu açık olan kullanıcı attıysa ... göster yetkili olan silmesi için */}

      {tweet?.user?.id === auth?.currentUser?.uid && (
        <div className="hover:bg-zinc-500 transition duration-[400ms] p-2 rounded-full cursor-pointer text-lg">
          <BsThreeDotsVertical onClick={handleDelete} />
        </div>
      )}
    </>
  );
};
export default Dropdown;
