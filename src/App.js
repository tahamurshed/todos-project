import "./App.css";
import TodoList from "./components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TodoContext, TodoProvider } from "./contexts/TodosContext";
import { useState } from "react";
import { ToastProvider } from "./contexts/SnakeBarContext";
const theme = createTheme({
  typography: {
    fontFamily: ["Alexandria"],
  },
  palette: {
    primary: {
      main: "#536dfe",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <div className="App">
          <TodoProvider>
            <TodoList />
          </TodoProvider>
        </div>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
