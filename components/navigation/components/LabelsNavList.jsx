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
            className="text-xl text-main hover:text-primary-main"
            onClick={onClickHandler}
          >
            <HiOutlinePlus />
          </button>
        }
        btnClassName="p-2 rounded-lg justify-between"
        panelClassName="px-2 styled-overflow max-h-[260px] overflow-auto grid gap-1"
        open
      >
        {data.map(({ id, name }) => (
          <NavLink
            key={id}
            href={`/todo/labels/${id}`}
            name={name}
            onClick={onSideBarClose}
            appendIcon={<div className="font-medium text-primary-main">@</div>}
          />
        ))}
      </DisclouseContainer>
    </>
  );
};
export default LabelsNavList;
