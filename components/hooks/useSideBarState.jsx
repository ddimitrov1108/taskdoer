import { useEffect, useState } from "react";

const useSideBarState = (initialState = false) => {
  const [open, setOpen] = useState(initialState);
  const toggleOpen = () => setOpen(!open);

  useEffect(() => {
    if (window.innerWidth < 1280)
      document.body.style.overflow = open ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return { open, setOpen, toggleOpen };
};
export default useSideBarState;
