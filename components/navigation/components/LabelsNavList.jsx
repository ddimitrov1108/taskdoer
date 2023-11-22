"use client";
import { useState } from "react";
import { DisclouseContainer } from "../../ui";
import { HiOutlinePlus } from "react-icons/hi2";
import { NavLink } from ".";
import { LabelModal } from "../../modals";

const LabelsNavList = ({ data = [], onSideBarClose = () => {} }) => {
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
      <LabelModal
        open={open}
        setOpen={setOpen}
        afterFormSubmit={afterFormSubmitHandler}
      />

      <DisclouseContainer
        title="Labels"
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
        {data.map(({ id, name }) => (
          <NavLink
            key={id}
            href={`/me/labels/${id}`}
            name={name}
            onClick={onSideBarClose}
            appendIcon={<div className="font-[500] text-primary-main">@</div>}
            className="hover:bg-slate-50"
          />
        ))}
      </DisclouseContainer>
    </>
  );
};
export default LabelsNavList;
