"use client";
import { useState } from "react";
import { DisclouseContainer } from "../../ui";
import { HiOutlinePlus } from "react-icons/hi2";
import { NavLink } from ".";
import { ProjectModal } from "../../modals";

const ProjectsNavList = ({ data = [], onSideBarClose = () => {} }) => {
  const [open, setOpen] = useState(false);

  const onClickHandler = (e) => {
    e.preventDefault();
    setOpen(true);
    onSideBarClose();
  };

  const afterFormSubmitHandler = () => {
    setOpen(false);
  };

  return (
    <>
      <ProjectModal
        open={open}
        setOpen={setOpen}
        afterFormSubmit={afterFormSubmitHandler}
      />

      <DisclouseContainer
        title="Projects"
        appendToTitle={
          <button
            className="text-xl text-slate-400 hover:text-primary-main"
            onClick={onClickHandler}
          >
            <HiOutlinePlus />
          </button>
        }
        btnClassName="p-2 rounded-lg justify-between"
        panelClassName="px-2 styled-overflow max-h-[260px] overflow-auto"
        open
      >
        {data.map(({ id, name, color }) => (
          <NavLink
            key={id}
            href={`/me/projects/${id}`}
            name={name}
            onClick={onSideBarClose}
            appendIcon={
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: color }}
              ></div>
            }
            className="hover:bg-slate-50"
          />
        ))}
      </DisclouseContainer>
    </>
  );
};
export default ProjectsNavList;
