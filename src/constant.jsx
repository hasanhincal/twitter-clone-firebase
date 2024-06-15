import { BiHomeCircle } from "react-icons/bi";
import {
  AiOutlineBell,
  AiOutlineMail,
  AiOutlineUser,
  AiOutlineCheckCircle,
} from "react-icons/ai";
import { CiViewList } from "react-icons/ci";
import { BsBookmark } from "react-icons/bs";
import { PiDotsThreeCircle } from "react-icons/pi";

export const navSections = [
  {
    title: "Anasayfa",
    icon: <BiHomeCircle />,
  },
  {
    title: "Bildirimler",
    icon: <AiOutlineBell />,
  },
  {
    title: "Mesajlar",
    icon: <AiOutlineMail />,
  },

  {
    title: "Listeler",
    icon: <CiViewList />,
  },
  {
    title: "Yer İşaretleri",
    icon: <BsBookmark />,
  },
  {
    title: "Onaylanmış",
    icon: <AiOutlineCheckCircle />,
  },
  {
    title: "Profil",
    icon: <AiOutlineUser />,
  },
  {
    title: "Daha Fazla",
    icon: <PiDotsThreeCircle />,
  },
];
