import { useRef, useState } from "react";

const useForm = () => {
  const [form, setForm] = useState({
    loading: false,
    error: "",
    disabled: false,
  });

  return [form, setForm];
}
export default useForm