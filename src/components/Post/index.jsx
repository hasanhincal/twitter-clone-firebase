import Button from "./Button";
import Content from "./Content";
import UserInfo from "./UserInfo";
import Dropdown from "./Dropdown";
import { useState } from "react";
import { auth } from "../../firebase";

const Post = ({ tweet }) => {
  // edit mode
  const [isEditMode, setIsEditMode] = useState(false);
  return (
    <div className="flex gap-3 py-6 px-3 border-b border-b-zinc-600 ">
      <img
        className="rounded-full h-12 w-12"
        src={tweet?.user?.picture}
        alt={tweet.user.name}
      />
      <div className="w-full">
        <div className="flex justify-between">
          <UserInfo tweet={tweet} />
          {/* tweet'i oturumu açık olan kullanıcı attıysa  göster yetkili olan silmesi için */}
          {tweet.user.id === auth.currentUser.uid && (
            <Dropdown tweet={tweet} setIsEditMode={setIsEditMode} />
          )}
        </div>

        {isEditMode && (
          <Content
            tweet={tweet}
            isEditMode={isEditMode}
            close={() => {
              setIsEditMode(false);
            }}
          />
        )}
        <div className="my-4">
          {tweet.textContent && !isEditMode && <p>{tweet.textContent}</p>}
          {tweet.imageContent && !isEditMode && (
            <img
              className="my-3 rounded-lg w-full max-h-[400] object-cover"
              src={tweet.imageContent}
            />
          )}
        </div>

        <Button tweet={tweet} />
      </div>
    </div>
  );
};

export default Post;
