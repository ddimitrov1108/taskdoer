"use client";
import { SnackbarProvider } from "notistack";

const NotistackProvider = ({ children }) => {
  return (
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={2000}
      anchorOrigin={{ horizontal: "right", vertical: "top" }}
      preventDuplicate
      dense
    >
      {children}
    </SnackbarProvider>
  );
};
export default NotistackProvider;
