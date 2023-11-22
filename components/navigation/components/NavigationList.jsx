"use client";
import { navigationListLinks } from "../../constants";
import { NavLink, ProjectsNavList, LabelsNavList } from ".";

const NavigationList = ({ data, onSideBarClose = () => {} }) => {
  return (
    <>
      <div>
        {navigationListLinks.uniqueTaskLinks.map(({ id, name, icon, href }) => (
          <NavLink
            key={id}
            href={`/me/${href}`}
            name={name}
            onClick={onSideBarClose}
            appendIcon={<div className="text-xl text-primary-main">{icon}</div>}
            className="hover:bg-slate-50 hover:text-primary-main font-[500]"
          />
        ))}
      </div>

      <ProjectsNavList data={data?.projects} onSideBarClose={onSideBarClose} />
      <LabelsNavList data={data?.labels} onSideBarClose={onSideBarClose} />
    </>
  );
};

export default NavigationList;
