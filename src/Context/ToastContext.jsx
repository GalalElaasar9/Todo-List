import { createContext, useState } from "react";

export let ToastContext = createContext()

export default function ToastContextProvider({children}) {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

    function showHideToast(message){
      setOpen(true)
      setMessage(message)
      setTimeout(()=>{
        setOpen(false);
      },2000)
    }
  return (
    <ToastContext.Provider value={{ open , setOpen , showHideToast , message }}>
      {children}
    </ToastContext.Provider>
  )
}

