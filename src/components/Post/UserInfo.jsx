import { LuDot } from "react-icons/lu";
import moment from "moment";
import { MdEdit } from "react-icons/md";

const UserInfo = ({ tweet }) => {
  console.log(tweet);
  // firebase deki timeStamp değerini tarihe çevirdik
  const date = tweet.createdAt?.toDate();

  // tweet atılma tarihinden itibaren geçen zamanı hesaplama;
  const time_ago = moment(date).fromNow();

  return (
    <div className="flex gap-3 items-center whitespace-nowrap">
      <p className="font-bold">{tweet?.user?.name}</p>
      <p className="text-gray-400">
        @{tweet?.user?.name?.toLowerCase().split(" ").join("_")}
      </p>
      <p className="text-gray-400 flex items-center">
        <LuDot className="text-[20px]" />
        {time_ago}
      </p>
      {tweet.isEdited && (
        <p className="text-gray-400 text-xs">
          <span className="max-md:hidden">*düznlendi</span>
          <MdEdit className="md:hidden" />
        </p>
      )}
    </div>
  );
};

export default UserInfo;
