"use client";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import { IconButton, Logo, SideBar } from "../ui";
import { NavigationList, UserDropdownMenu } from "./components";
import { useSideBarState } from "../hooks";

const HeaderBarNavigation = ({ user, data }) => {
  const { open, toggleOpen } = useSideBarState();

  return (
    <header className="bg-black-main shadow-lg shadow-black-dark flex items-center justify-between marker:z-50 fixed top-0 w-full py-3 px-6 lg:hidden">
      <Logo />

      <SideBar
        open={open}
        onClose={toggleOpen}
        className="z-40 bg-black-main px-0"
        headerClassName="pt-6 px-6"
        bodyClassName="w-full grid gap-4 p-6 bg-inherit"
      >
        <UserDropdownMenu user={user} />
        <NavigationList data={data} onSideBarClose={() => toggleOpen()} />
      </SideBar>

      <IconButton onClick={toggleOpen}>
        <HiOutlineBars3BottomRight className="text-2xl" />
      </IconButton>
    </header>
  );
};
export default HeaderBarNavigation;
