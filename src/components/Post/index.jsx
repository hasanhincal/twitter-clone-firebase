import Button from "./Button";
import Content from "./Content";
import UserInfo from "./UserInfo";
import Dropdown from "./Dropdown";

const Post = ({ tweet }) => {
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
          <Dropdown tweet={tweet} />
        </div>

        <Content tweet={tweet} />

        <Button tweet={tweet} />
      </div>
    </div>
  );
};

export default Post;
