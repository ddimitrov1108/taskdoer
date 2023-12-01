"use client";
import { useState } from "react";
import { DisclouseContainer } from "../../ui";
import { HiPlus } from "react-icons/hi2";
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
            className="text-xl text-main hover:text-primary-main"
            onClick={onClickHandler}
          >
            <HiPlus />
          </button>
        }
        btnClassName="p-2 rounded-lg justify-between"
        panelClassName="px-2 styled-overflow max-h-[260px] overflow-auto grid gap-1"
        open
      >
        {data.map(({ id, name, color }) => (
          <NavLink
            key={id}
            href={`/todo/projects/${id}`}
            name={name}
            onClick={onSideBarClose}
            appendIcon={
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: color }}
              ></div>
            }
            className=""
          />
        ))}
      </DisclouseContainer>
    </>
  );
};
export default ProjectsNavList;
