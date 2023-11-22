"use client";
import { NavigationList, UserDropdownMenu } from "./components";

const SideBarNavigation = ({ user, data }) => {
  return (
    <div className="bg-white z-50 hidden lg:block w-96 duration-300 fixed h-screen overflow-auto p-6 styled-overflow">
      <div className="w-full grid gap-4 bg-inherit">
        <UserDropdownMenu user={user} />
        <NavigationList data={data}/>
      </div>
    </div>
  );
};

export default SideBarNavigation;