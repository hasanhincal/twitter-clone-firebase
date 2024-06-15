import Nav from "./Nav";
import Main from "./Main";
import Aside from "./Aside";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
const Feed = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user_data) => {
      setUser(user_data);

      // companentWillUnMount tetiklendiğinde yani kullanıcı sayfadan ayrıldığında daha iyi performans elde etmek için aboneliği sonlandırıyoruz.
      return () => unsub();
    });
  }, []);

  return (
    <div className="bg-black ">
      <div className="feed h-screen bg-black overflow-hidden text-white max-w-[922px] m-auto">
        <Nav user={user} />
        <Main user={user} />
        <Aside />
      </div>
    </div>
  );
};

export default Feed;
