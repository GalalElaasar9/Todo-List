import { createContext, useState } from "react";
import {v4 as uuidv4} from 'uuid';

export let TodosContext = createContext()

// const initialTodos = [
//   {
//     id:uuidv4(),
//     title: "قراءة كتاب",
//     details: "صلى على الحبيب",
//     isCompleted : false
//   },
//     {
//     id:uuidv4(),
//     title: "قراءة كتاب",
//     details: "صلى على أشرف المرسلين",
//     isCompleted : false
//   },
//     {
//     id:uuidv4(),
//     title: "قراءة كتاب",
//     details: "صلى على الحبيب",
//     isCompleted : false
//   }
// ]

export default function TodoContextProvider({children}) {
  const [todos , setTodos] = useState([]);
  return (
    <TodosContext.Provider value={{ todos , setTodos }}>
      {children}
    </TodosContext.Provider>
  )
}
