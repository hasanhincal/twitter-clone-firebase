import React, { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { FiShare2 } from "react-icons/fi";
import { auth, db } from "../../firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

const Button = ({ tweet }) => {
  const [isLiked, setIsLike] = useState(false);

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
  return (
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
  );
};

export default Button;
