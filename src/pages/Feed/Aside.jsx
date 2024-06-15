import React from "react";

const Aside = () => {
  return <div className="max-xl:hidden"></div>;
};

// React.memo(): bileşenin aldığı problar değişmediği müddetce bileşenin tekrardan render olmasının önüne geçer.

// bir üst bileşen olan "feed" bileşeninde user statetinin değişmesi feed bileşeninin tekrardan render olmasına
// ardından aside bileşeninin ise gereksiz yere render olmasına sebep oluyordu react.memo ile bunun önüne geçtik.

export default React.memo(Aside);
