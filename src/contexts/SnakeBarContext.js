import { createContext, useContext, useState } from "react";
import MySnakeBar from "../components/MySnakeBar";
let SnackBarContext = createContext({});

export function ToastProvider({ children }) {
  function openedHideSnack(message) {
    setOpenSnake(true);
    setMessage(message);
    setTimeout(() => {
      setOpenSnake(false);
    }, 2000);
  }
  const [message, setMessage] = useState("");
  const [openSnack, setOpenSnake] = useState(false);
  return (
    <SnackBarContext.Provider value={{ openedHideSnack }}>
      {children}
      <MySnakeBar open={openSnack} message={message} />
    </SnackBarContext.Provider>
  );
}

export const useToast=()=>{
    return useContext(SnackBarContext)
}