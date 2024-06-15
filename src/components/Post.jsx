import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { BiMessageRounded } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRetweet } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { LuDot } from "react-icons/lu";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { FcLike } from "react-icons/fc";
import { auth, db } from "../firebase";
import moment from "moment";
import { toast } from "react-toastify";

const Post = ({ tweet }) => {
  const [isLiked, setIsLike] = useState(false);

  // firebase deki timeStamp değerini tarihe çevirdik
  const date = tweet.createdAt?.toDate();

  // tweet atılma tarihinden itibaren geçen zamanı hesaplama;
  const time_ago = moment(date).fromNow();

  // kullanıcının tweet'i beğenip beğenmediğini kontrol etme;
  useEffect(() => {
    const found = tweet?.likes.find(
      (userId) => userId === auth.currentUser.uid
    );
    setIsLike(found);
  }, [tweet]);

  // like atma :tweet güncelleme;
  // kullanıcı like atmışsa kaldırırr
  // yoksa ekler
  const toggleLike = () => {
    // güncellenecek tweet'in referansını alma;
    const tweetRef = doc(db, "tweets", tweet.id);

    updateDoc(tweetRef, {
      // aktif kullanıcıyı tweet'in likes dizisine ekleme;
      likes: isLiked
        ? arrayRemove(auth.currentUser.uid)
        : arrayUnion(auth.currentUser.uid),
    });
  };

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
    <div className="flex gap-3 p-3 border-b border-b-zinc-700 ">
      <img
        className="rounded-full h-14"
        src={tweet?.user?.picture}
        alt="user picture"
      />
      <div className="w-full pe-2">
        {/* kullanıcı bilgisi */}
        <div className="flex justify-between whitespace-nowrap">
          <div className="flex items-center gap-3">
            <p className="font-bold">{tweet?.user?.name}</p>
            <p className="text-gray-400">@{tweet?.user?.name?.toLowerCase()}</p>
            <p className="text-gray-400 flex items-center">
              <LuDot className="text-[20px]" />
              {time_ago}
            </p>
          </div>
          {/* tweet'i oturumu açık olan kullanıcı attıysa ... göster yetkili olan silmesi için */}
          {tweet?.user?.id === auth?.currentUser?.uid && (
            <div className="hover:bg-zinc-500 transition duration-[400ms] p-2 rounded-full cursor-pointer text-lg">
              <BsThreeDots onClick={handleDelete} />
            </div>
          )}
        </div>
        {/* tweet içeriği */}
        <div className="my-3">
          <p>{tweet?.textContent}</p>
          {tweet?.imageContent && (
            <img className="rounded-lg h-52  mt-3" src={tweet?.imageContent} />
          )}
        </div>
        {/* butonlar alanı */}
        <div className="flex justify-between items-center">
          <div className="hover:bg-zinc-500 transition duration-[400ms] p-2 rounded-full cursor-pointer text-lg">
            <BiMessageRounded />
          </div>
          <div
            onClick={toggleLike}
            className="flex gap-1 items-center cursor-pointer"
          >
            <p className=" hover:bg-zinc-500 transition duration-[400ms] p-2 rounded-full text-lg">
              {isLiked ? <FcLike /> : <AiOutlineHeart />}
            </p>
            <span className="text-[11px] mt-1">
              {tweet?.likes.length > 0 && tweet?.likes.length}
            </span>
          </div>
          <div className="hover:bg-zinc-500 transition duration-[400ms] p-2 rounded-full cursor-pointer text-lg">
            <FaRetweet />
          </div>
          <div className="hover:bg-zinc-500 transition duration-[400ms] p-2 rounded-full cursor-pointer text-lg">
            <FiShare2 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
