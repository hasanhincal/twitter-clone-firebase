import { AiOutlineHeart } from "react-icons/ai";
import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa6";
import { IoBookmarkOutline } from "react-icons/io5";
import { FcLike } from "react-icons/fc";
import { RiShare2Line } from "react-icons/ri";
import { auth, db } from "../../firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

const Button = ({ tweet }) => {
  // oturumu acık olan kullanıcının tweet'i beğenip beğenmediğini kontrol etme;
  const isLiked = tweet?.likes?.includes(auth.currentUser.uid);

  // like atma :tweet güncelleme;
  // kullanıcı like atmışsa kaldırırr
  // yoksa ekler
  const toggleLike = async () => {
    // güncellenecek tweet'in referansını alma;
    const tweetRef = doc(db, "tweets", tweet.id);
    //referansı alınan tweet doc güncelle
    await updateDoc(tweetRef, {
      // aktif kullanıcıyı tweet'in likes dizisine ekleme;
      likes: isLiked
        ? arrayRemove(auth.currentUser.uid)
        : arrayUnion(auth.currentUser.uid),
    });
  };
  return (
    <div className="flex justify-between items-center text-gray-400">
      <div className="hover:bg-[#1ea1de37] hover:text-[#60cdff] transition duration-[400ms] p-3 rounded-full cursor-pointer text-xl">
        <BiMessageRounded />
      </div>
      <div className="hover:bg-[#55c85737] hover:text-[#2aff3c] transition duration-[400ms] p-3 rounded-full cursor-pointer text-xl">
        <FaRetweet />
      </div>
      <div
        onClick={toggleLike}
        className="flex gap-1 items-center cursor-pointer hover:text-[#ff2a91]"
      >
        <p className="hover:bg-[#b84da148] transition duration-[400ms] p-3 rounded-full text-xl">
          {isLiked ? <FcLike /> : <AiOutlineHeart />}
        </p>
        <span className="text-[14px] mt-1 ">
          {tweet?.likes.length > 0 && tweet?.likes.length}
        </span>
      </div>
      <div className="hover:bg-[#1ea1de37] hover:text-[#3bb0e7] transition duration-[400ms] p-3 rounded-full cursor-pointer text-xl">
        <IoBookmarkOutline />
      </div>
      <div className="hover:bg-[#1ea1de37] hover:text-[#3bb0e7] transition duration-[400ms] p-3 rounded-full cursor-pointer text-xl">
        <RiShare2Line />
      </div>
    </div>
  );
};

export default Button;
