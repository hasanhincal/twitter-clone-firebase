import React from "react";
import { navSections } from "../../constant";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import dfPhoto from "../../../public/twitter-df-picture.png";
import { BiSolidDoorOpen } from "react-icons/bi";

const Nav = ({ user }) => {
  return (
    <nav className="flex flex-col justify-between items-end px-2 py-4">
      {/* navigasyon linkleri */}
      <div className="flex flex-col align-items-center">
        <img
          className="w-14 mb-4 mx-1"
          src="twitter-x-logo.png"
          alt="twitter-logo"
        />

        {navSections.map((i, key) => (
          <div
            key={key}
            className="flex items-center gap-3 text-2xl md:text-xl cursor-pointer p-3 rounded-lg hover:bg-[#505050b7] transition max-md:justify-center"
          >
            {i.icon}
            <span className="whitespace-nowrap max-md:hidden">{i.title}</span>
          </div>
        ))}
      </div>
      {/* kullanıcı bilgileri */}
      <div className="flex w-36 max-md:w-auto ">
        {!user ? (
          <div className="flex flex-col gap-5">
            <img
              className="rounded-full w-12 h-12 animate-bounce"
              src={dfPhoto}
              alt=""
            />
          </div>
        ) : (
          <div className="flex flex-col md:items-start gap-5">
            <img
              className="rounded-full max-w-[45px]"
              src={user.photoURL ? user.photoURL : dfPhoto}
              alt={user?.displayName}
            />

            <p className="max-md:hidden">{user?.displayName}</p>

            <button
              onClick={() => signOut(auth)}
              className="bg-zinc-700 hover:bg-zinc-900 items-center  rounded flex justify-center gap-2 py-1 px-2  text-xl md:text-[15px] transition   whitespace-nowrap"
            >
              <BiSolidDoorOpen />
              <span className="max-md:hidden">Çıkış Yap</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
