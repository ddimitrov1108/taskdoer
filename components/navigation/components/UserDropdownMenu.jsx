"use client";
import { HiOutlineArrowRightOnRectangle, HiOutlineUser } from "react-icons/hi2"
import { Dropdown, DropdownListItem } from "../../ui"
import { navigationListLinks } from "../../constants"
import { signOut } from "next-auth/react";

const UserDropdownMenu = ({ user }) => {
  return (
    <Dropdown
      btnClassName="w-full p-2 hover:bg-slate-50 rounded-lg flex items-center gap-3"
      btn={
        <>
          <div className="text-2xl text-primary-main p-2 flex items-center bg-primary-light/10 rounded-full">
            <HiOutlineUser />
          </div>
          <div className="px-2 w-full grid text-left overflow-hidden">
            <span className="font-[500] truncate ...">{user?.name}</span>
            <span className="text-sm text-slate-500 max-w-full truncate ...">
              {user?.email}
            </span>
          </div>
        </>
      }
      menuItemsClassName="p-2"
      chevronClassName="pr-0.5"
      chevronDown
    >
      {navigationListLinks.userDropdown.map((link) => (
        <DropdownListItem
          key={link.id}
          as="link"
          item={link}
          className="hover:text-primary-main"
          iconClassName="text-primary-main"
        />
      ))}

      <DropdownListItem
        as="button"
        onClick={() => signOut()}
        className="text-error-main hover:text-error-main hover:bg-slate-50"
        item={{
          name: "Sign Out",
          icon: <HiOutlineArrowRightOnRectangle />,
        }}
      />
    </Dropdown>
  )
}
export default UserDropdownMenu