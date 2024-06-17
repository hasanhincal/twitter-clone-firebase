import React from "react";

const Content = ({ tweet }) => {
  return (
    <div className="my-3">
      <p>{tweet?.textContent}</p>
      {tweet?.imageContent && (
        <img className="rounded-lg h-52  mt-3" src={tweet?.imageContent} />
      )}
    </div>
  );
};

export default Content;
