//what is the main idea of the useReducer hook?
//the main idea is the component is resonsable of to appear the ui to the user not in the logic of the code
//why we need to use useReduser hook?
//for to make our program maintainable , easy to test and more readable
//when we should use this hook?
//when theres multi states depends on the one state 
import { v4 as uuidv4 } from "uuid";
export function TodosReducer(currentTodos,action){
    switch(action.type){
        case "add":{
                let todo = {
                  id: uuidv4(),
                  title: action.payload,
                  desctiption: "",
                  isCompleted: false,
                }
                const newTodos = [...currentTodos, todo];
                
                localStorage.setItem("todos", JSON.stringify(newTodos));
                return newTodos
              }
              
              case "update":{
                let newUpdateList = currentTodos.map((t) => {
                    if (t.id == action.payload.id) {
                      return {
                        ...t,
                        title: action.payload.newTitle,
                        desctription: action.payload.newDescription,
                      };
                    } else {
                      return t;
                    }
                  });
                  
                  localStorage.setItem("todos", JSON.stringify(newUpdateList));
                  return newUpdateList

              }
              case "delete":{
                let todosFiltering = currentTodos.filter((t) => {
                    return t.id != action.payload.id;
                  });
                  
                  localStorage.setItem("todos", JSON.stringify(todosFiltering));
                  return todosFiltering

              }
              case "get":{
                let todosFromLocalStorage = JSON.parse(localStorage.getItem("todos")) ?? [];
               return todosFromLocalStorage
              }
              case "toggle-complete":{
                let todosAfterChecked = currentTodos.map((t) => {
                  if (t.id == action.payload.id) {
                    return { ...t, isCompleted: !t.isCompleted };
                  } else return t;
                });
              
                localStorage.setItem(
                  "todos",
                  JSON.stringify(todosAfterChecked)
                );
                return todosAfterChecked
              }
              default:{
                throw Error ("not Found")
              }
        }

    }
