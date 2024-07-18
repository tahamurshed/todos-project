import { createContext,useContext,useReducer } from "react";

import { TodosReducer } from "../Reducers/TodosReducer";
 let TodoContext = createContext([]);
export function TodoProvider({children}) {
  const[todosState,dispatch]=useReducer(TodosReducer,[])
  //   let todosIntial = [
  //       {
  //         id: uuidv4(),
  //         title: " المهام الاولى",
  //         desctription: "هذه هي المهمة الاولى",
  //         isCompleted: false,
  //       },
  //       {
  //         id: uuidv4(),
  //         title: "المهام الثانية",
  //         desctription: "هذه هي المهمة الثانية",
  //         isCompleted: false,
  //       },
  //     ];
  // const [todosState, setTodosState] = useState(todosIntial);

  return (
    <TodoContext.Provider value={{ todosState, dispatch }}>
     {children}
    </TodoContext.Provider>
  );
}
export const useTodos=()=>{
    return useContext(TodoContext)
}
