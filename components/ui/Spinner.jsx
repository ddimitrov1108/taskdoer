import { AiOutlineLoading3Quarters } from "react-icons/ai";
import clsx from "clsx";

export default function Spinner({ className, ...restProps }) {
  return (
    <AiOutlineLoading3Quarters
      className={clsx("text-xl animate-spin", className)}
      {...restProps}
    />
  );
}
