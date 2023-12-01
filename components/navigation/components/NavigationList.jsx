"use client";
import { navigationListLinks } from "../../constants";
import { NavLink, ProjectsNavList, LabelsNavList } from ".";

const NavigationList = ({ data, onSideBarClose = () => {} }) => {
  return (
    <>
      <div className="grid gap-1">
        {navigationListLinks.uniqueTaskLinks.map(({ id, name, icon, href }) => (
          <NavLink
            key={id}
            href={href}
            name={name}
            onClick={onSideBarClose}
            appendIcon={<div className="text-xl text-primary-main">{icon}</div>}
            className="font-medium"
          />
        ))}
      </div>

      <ProjectsNavList data={data?.projects} onSideBarClose={onSideBarClose} />
      <LabelsNavList data={data?.labels} onSideBarClose={onSideBarClose} />
    </>
  );
};

export default NavigationList;
