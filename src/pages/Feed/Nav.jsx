import React from "react";
import { navSections } from "../../constant";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import dfPhoto from "../../../public/twitter-df-picture.png";

const Nav = ({ user }) => {
  return (
    <nav className="flex flex-col justify-between">
      {/* navigasyon linkleri */}
      <div className="icon-wrapper">
        <img
          className="w-12 m-auto my-2"
          src="twitter-x-logo.png"
          alt="twitter-logo"
        />

        {navSections.map((i, key) => (
          <div
            key={key}
            className="nav-icon flex items-center gap-3 text-lg cursor-pointer p-3 hover:bg-gray-900 transition"
          >
            {i.icon} <span className="nav-title">{i.title}</span>
          </div>
        ))}
      </div>
      {/* kullanıcı bilgileri */}
      <div className="flex flex-col gap-2 ">
        <div className="flex flex-wrap items-center gap-2 p-2 ">
          <img
            className=" rounded-full w-14 profil-inner"
            src={
              auth?.currentUser?.photoURL ? auth.currentUser.photoURL : dfPhoto
            }
            alt="user-photo"
          />

          <div className="flex flex-col gap-2 profil-inner">
            <span>{auth?.currentUser?.displayName}</span>
            <span>@{auth?.currentUser?.displayName?.toLowerCase()}</span>
          </div>
        </div>
        <button
          onClick={() => signOut(auth)}
          className="hover:bg-gray-900 mx-2 mb-4 px-3 py-2 rounded-lg transition w-32  whitespace-nowrap"
        >
          Çıkış Yap
        </button>
      </div>
    </nav>
  );
};

export default Nav;
