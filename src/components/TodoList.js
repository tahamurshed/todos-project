import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
//import uuid
import { v4 as uuidv4 } from "uuid";
// import components
import Todo from "./Todo";
//import states
import { useState, useContext, useEffect, useMemo, useReducer } from "react";
import { TodoContext } from "../contexts/TodosContext";
import { SnackBarContext, useToast } from "../contexts/SnakeBarContext.js";
import { useTodos } from "../contexts/TodosContext";
import { TodosReducer } from "../Reducers/TodosReducer.js";
export default function TodoList() {
  const { todosState2, setTodosState } = useTodos();
  const {todosState, dispatch} = useTodos();
  const [showConfirmAlert, setShowConfirmAlert] = useState(false);
  const [displayCompletedTodos, setDisplayCompletedTodos] = useState("all");
  const [title, setTitle] = useState("");
  const { openedHideSnack } = useToast();
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [dialogTodo, setDialogTodo] = useState({});
  const [newUpdatesInput, setNewUpdatesInput] = useState({
    newTitle: dialogTodo.title,
    newDescription: dialogTodo.desctription,
  });
  const [showDelteDialog, setshowDelteDialog] = useState(false);
  //Add section //
  function handelAddClick() {
    dispatch({ type: "add", payload: title });
    setTitle("");
    openedHideSnack("تمت الاضافة بنجاح");
  }
  //==end Add section== //
  //update section //
  function handelClosetEditDialog() {
    setShowEditDialog(false);
  }
  function handleOpenEditDialog(todo) {
    setShowEditDialog(true);
    setDialogTodo(todo);
    setNewUpdatesInput({
      ...newUpdatesInput,
      newTitle: todo.title,
      newDescription: todo.desctription,
    });
  }

  function handelSaveEditing() {
    dispatch({
      type: "update",
      payload: {
        newTitle: newUpdatesInput.newTitle,
        newDescription: newUpdatesInput.newDescription,
        id: dialogTodo.id,
      },
    });
    handelClosetEditDialog();
    openedHideSnack("تم التعديل بنجاح");
  }
  //==end update section==//

  //Delete section//

  //handler functions//
  function handleClose() {
    setshowDelteDialog(false);
  }
  function handelOpenDeleteDialog(todo) {
    setshowDelteDialog(true);
    setDialogTodo(todo);
  }
  function handelRemoveTodoConfirm() {
    dispatch({ type: "delete", payload: { id: dialogTodo.id } });
    handleClose();
    openedHideSnack("تم الحذف بنجاح");
  }
  //==end Delete section==//

  //use effect will treat with the side effect like local storage or API or any this that must deal from
  //any side effect
  //side effect: when we used any props or states from other components and we try updated or edited
  //useEffect hook is decleared in the global of component and its called when the component rendering
  //it has two parameters the first params is function the second params is array
  // the function  will call when the array or dependancies is editd and when the array is not updated will save the last value
  //the null array is mean the useEffect will called the function when the browser rendering
  useEffect(() => {
    dispatch({ type: "get" });
  }, []);
  //here is problem in performance that's mean every time the component render will re-computing the completed or noncompleted todos
  //imagin we have many of todos will used some times so we use the hook called useMemo
  //this hook has two params the first params is the function and the second params is array and have dependancies
  //the function will called when the depanedcies are updated and it is  must return value that's mean use return before the statements in the function

  let todosBeRender = todosState;

  const completedTodos = useMemo(() => {
    return (
      todosState ??
      todosState.filter((t) => {
        return t.isCompleted;
      })
    );
  }, [todosState]);

  const nonCompletedTodos = useMemo(() => {
    return todosState.filter((t) => {
      return !t.isCompleted;
    });
  }, [todosState]);

  if (displayCompletedTodos == "completed") todosBeRender = completedTodos;
  else if (displayCompletedTodos == "non-completed")
    todosBeRender = nonCompletedTodos;
  else todosBeRender = todosState;

  let todosJsx = todosBeRender.map((t) => {
    return (
      <Todo
        key={t.id}
        handelOpen={handleOpenEditDialog}
        todo={t}
        openDelete={handelOpenDeleteDialog}
      />
    );
  });
  function handleCompltedChange(e) {
    setDisplayCompletedTodos(e.target.value);
  }
  return (
    <>
      <Container maxWidth="sm">
        <Card
          sx={{ minWidth: 275 }}
          style={{ maxHeight: "80vh", overflow: "scroll" }}
        >
          <CardContent>
            <Typography
              variant="h2"
              gutterBottom
              style={{ textAlign: "center", fontWeight: "bold" }}
            >
              مهامي
            </Typography>
            <Divider />
            <ToggleButtonGroup
              value={displayCompletedTodos}
              exclusive
              onChange={handleCompltedChange}
              aria-label="text alignment"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "10px",
                direction: "ltr",
              }}
              color="primary"
            >
              <ToggleButton value="completed" aria-label="centered">
                منجزة
              </ToggleButton>
              <ToggleButton value="non-completed" aria-label="right aligned">
                غير منجزة
              </ToggleButton>
              <ToggleButton value="all" aria-label="left aligned">
                الكل
              </ToggleButton>
            </ToggleButtonGroup>

            {todosJsx}
            <Box sx={{ flexGrow: 1, marginTop: 2 }}>
              <Grid container spacing={2}>
                <Grid
                  xs={8}
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <TextField
                    label="إضافة مهمة"
                    id="outlined-start-adornment"
                    sx={{ width: "100%" }}
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />{" "}
                </Grid>
                <Grid xs={4}>
                  <Button
                    variant="contained"
                    style={{ width: "100%", height: "100%" }}
                    onClick={handelAddClick}
                    disabled={title == 0}
                  >
                    إضافة
                  </Button>
                </Grid>
              </Grid>
            </Box>
            <p style={{ direction: "ltr" }}>
              TAMR:
              <a href="mailto:taha.m.qasem@gmail.com">taha.m.qasem@gmail.com</a>
            </p>
          </CardContent>
        </Card>
      </Container>
      {/* Update dialog */}
      <Dialog
        open={showEditDialog}
        style={{ direction: "rtl" }}
        onClose={handelClosetEditDialog}
      >
        <DialogTitle>تعديل المهمة</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="tit"
            name="title"
            label="العنوان"
            type="text"
            fullWidth
            variant="standard"
            value={newUpdatesInput.newTitle}
            onChange={(e) => {
              setNewUpdatesInput({
                ...newUpdatesInput,
                newTitle: e.target.value,
              });
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="desc"
            name="description"
            label="وصف المهمة"
            type="text"
            fullWidth
            variant="standard"
            value={newUpdatesInput.newDescription}
            onChange={(e) => {
              setNewUpdatesInput({
                ...newUpdatesInput,
                newDescription: e.target.value,
              });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handelClosetEditDialog}>إلغاء</Button>
          <Button type="submit" onClick={handelSaveEditing}>
            تعديل
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog
        style={{ direction: "rtl" }}
        open={showDelteDialog}
        onClose={handleClose}
      >
        <DialogTitle id="alert-dialog-title">
          هل انت متاكد من حذف المهمة
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            سوف يتم حذف المهمة نهائيا
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>إغلاق</Button>
          <Button autoFocus onClick={handelRemoveTodoConfirm}>
            موافق
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
