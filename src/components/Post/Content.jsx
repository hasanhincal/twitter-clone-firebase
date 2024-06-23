import { doc, updateDoc } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { BiSolidSave } from "react-icons/bi";
import { ImCancelCircle } from "react-icons/im";

const Content = ({ tweet }) => {
  return (
    <>
      <div>
        <div>
          <input
            type="text"
            defaultValue={tweet?.textContent}
            ref={inputRef}
            className="rounded border-none outline-none p-1 px-2 text-white bg-transparent "
          />
          <button
            onClick={handleSave}
            className="text-green-400 mx-5 p-2 rounded-full shadow hover:shadow-green-400 transition"
          >
            <BiSolidSave />
          </button>
          <button
            onClick={close}
            className="text-red-400 mx-5 p-2 rounded-full shadow hover:shadow-red-400 transition"
          >
            <ImCancelCircle />
          </button>
          {tweet.imageContent && (
            <div className="relative">
              <img
                className="my-2 rounded-lg w-full object-cover max-h-[400px]"
                src={tweet?.imageContent}
                alt=""
              />
              <button className="absolute top-0 right-0 text-red-600 text-xl bg-white p-2 rounded-full transition hover:scale-90"></button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Content;
