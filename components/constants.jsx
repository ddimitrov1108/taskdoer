import {
  HiOutlineSun,
  HiOutlineStar,
  HiOutlineCog6Tooth,
} from "react-icons/hi2";
import { v4 as uuidv4 } from "uuid";

export const navigationListLinks = {
  userDropdown: [
    {
      id: uuidv4(),
      name: "Settings",
      icon: <HiOutlineCog6Tooth />,
      href: "/account/settings",
    },
  ],
  uniqueTaskLinks: [
    { id: uuidv4(), name: "My Day", icon: <HiOutlineSun />, href: "/todo" },
    {
      id: uuidv4(),
      name: "Important",
      icon: <HiOutlineStar />,
      href: "/todo/important",
    },
    // {
    //   id: uuidv4(),
    //   name: "Planned",
    //   icon: <HiOutlineCalendarDays />,
    //   href: "/planned",
    // },
  ],
};

export const defaultColors = [
  "#b8255f",
  "#db4035",
  "#ff9933",
  "#fad000",
  "#afb83b",
  "#7ecc49",
  "#299438",
  "#6accbc",
  "#158fad",
  "#14aaf5",
  "#96c3eb",
  "#4073ff",
  "#884dff",
  "#af38eb",
  "#eb96eb",
  "#e05194",
  "#ff8d85",
  "#808080",
  "#b8b8b8",
  "#ccac93",
];
