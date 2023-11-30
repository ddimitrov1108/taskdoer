"use client";
import { HiOutlineArrowRightOnRectangle, HiOutlineUser } from "react-icons/hi2"
import { Dropdown, DropdownListItem } from "../../ui"
import { navigationListLinks } from "../../constants"
import { signOut } from "next-auth/react";

const UserDropdownMenu = ({ user }) => {
  return (
    <Dropdown
      btnClassName="transition-all w-full p-2 rounded-lg flex items-center gap-3 hover:bg-black-light/10"
      btn={
        <>
          <div className="text-2xl text-primary-main p-2 flex items-center bg-primary-light/10 rounded-full">
            <HiOutlineUser />
          </div>
          <div className="px-2 w-full grid text-left overflow-hidden">
            <span className="font-medium text-white truncate ...">{user?.name}</span>
            <span className="text-sm text-main max-w-full truncate ...">
              {user?.email}
            </span>
          </div>
        </>
      }
      menuItemsClassName="border border-black-light/40 bg-black-main p-2"
      chevronClassName="pr-0.5"
      chevronDown
    >
      {navigationListLinks.userDropdown.map((link) => (
        <DropdownListItem
          key={link.id}
          as="link"
          item={link}
          className="text-light hover:text-white hover:bg-black-light/10"
          iconClassName="text-primary-main"
        />
      ))}

      <DropdownListItem
        as="button"
        onClick={() => signOut()}
        className="text-error-main hover:text-error-main hover:bg-black-light/10"
        item={{
          name: "Sign Out",
          icon: <HiOutlineArrowRightOnRectangle />,
        }}
      />
    </Dropdown>
  )
}
export default UserDropdownMenu