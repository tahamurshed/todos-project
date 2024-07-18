import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
//import icons
import CheckIcon from "@mui/icons-material/Check";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
//import css
import "../App.css";
//import context and states
import { useContext, useState } from "react";
import { TodoContext, useTodos } from "../contexts/TodosContext";
// import { TodoInfoContext } from "../contexts/TodoInfoContext";

import { SnackBarContext, useToast } from "../contexts/SnakeBarContext.js";
//import components

// import EditTodo from "./EditTodo.js";
// import { EditTodoContext } from "../contexts/EditTodoContext.js";

export default function Todo({ todo, handelOpen, openDelete }) {
  //use contexts
  // const todo = useContext(TodoInfoContext);
  // const { setShowConfirmAlert } =
  //   useContext(DeleteStateContext);
  const { dispatch } = useTodos();
  const [showEditDialog, setShowEditDialog] = useState(false);
  const { openedHideSnack } = useToast();
  //handeler functions

  return (
    <Container maxWidth="sm">
      <Card
        sx={{ minWidth: 275 }}
        style={{ backgroundColor: "#3636ab", marginTop: "10px" }}
        className="todo-card"
      >
        <CardContent>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid xs={8}>
                <Typography
                  variant="h4"
                  color="text.secondary"
                  style={{ color: "white" }}
                >
                  {todo.title}
                </Typography>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  style={{ color: "white" }}
                >
                  {todo.desctription}
                </Typography>
              </Grid>
              <Grid
                xs={4}
                display="flex"
                justifyContent="space-around"
                alignItems="center"
              >
                {/* complete button */}
                <IconButton
                  className="icon-btn"
                  style={{
                    color: todo.isCompleted ? "white" : "green",
                    border: "2px solid green",
                    backgroundColor: todo.isCompleted ? "green" : "white",
                  }}
                  onClick={() => {
                    dispatch({type:"toggle-complete",payload:todo})
                    {
                      todo.isCompleted
                        ? openedHideSnack("تم الإضافة الى الغير منجزة")
                        : openedHideSnack("تم الإضافة الى منجزة");
                    }
                  }}
                >
                  <CheckIcon />
                </IconButton>
                {/*== end complete button== */}
                {/* update button */}
                <IconButton
                  className="icon-btn"
                  style={{
                    color: "blue",
                    border: "2px solid blue",
                    backgroundColor: "white",
                  }}
                  onClick={() => {
                    handelOpen(todo);
                  }}
                >
                  <ModeEditOutlineIcon />
                </IconButton>
                {/* == end update button ==*/}
                {/* delete button */}
                <IconButton
                  className="icon-btn"
                  style={{
                    color: "red",
                    border: "2px solid red",
                    backgroundColor: "white",
                  }}
                  onClick={() => {
                    openDelete(todo);
                  }}
                >
                  <DeleteOutlinedIcon />
                </IconButton>
                {/*== end delete button== */}
              </Grid>
            </Grid>
          </Box>
          {/* <DeleteTodo /> */}
          {/* <EditTodoContext.Provider
            value={{ showEditDialog, setShowEditDialog }}
          >
            <EditTodo />
          </EditTodoContext.Provider> */}
        </CardContent>
      </Card>
    </Container>
  );
}
