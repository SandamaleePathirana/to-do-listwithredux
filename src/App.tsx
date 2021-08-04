// React App
import { useState } from "react";
// Material-UI Imports
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
// Other Imports
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import { addTodo, removeTodo, setTodoStatus } from "./redux/todoSlice";


function App() {
  //React Hooks
  const [todoDescription, setTodoDescription] = useState<string>("");
  const [deadline, setdeadline] = useState<number>(0);

  //React Redux Hooks
  const todoList = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();

  //Rendering
  return (
    <Container maxWidth="xs">
      <Typography style={{ textAlign: "center" }} variant="h3">
        TO DO LIST
      </Typography>
      <TextField
        variant="outlined"
        label="To Do Item"
        fullWidth
        onChange={(e) => setTodoDescription(e.target.value)}
        value={todoDescription}
      />
      <TextField
        variant="outlined"
        label="Deadline"
        fullWidth
        onChange={(e) => setdeadline(Number(e.target.value))}
        value={deadline}
      />
      <Button 
        variant="contained"
        color="primary"
        fullWidth
        onClick={() => {
          dispatch(addTodo(todoDescription));
          setTodoDescription("");
          dispatch(addTodo(deadline));
          setdeadline("");
        }}
      >
        Add task
      </Button>
      <List>
        {todoList.map((todo) => (
          <ListItem key={todo.id}>
            <ListItemText
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.description}
            </ListItemText>
            <ListItemText
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.deadline}
            </ListItemText>
            <ListItemSecondaryAction>
              <IconButton
                onClick={() => {
                  dispatch(removeTodo(todo.id));
                }}
              >
                <DeleteIcon />
              </IconButton>
              <Checkbox
                edge="end"
                value={todo.completed}
                onChange={() => {
                  dispatch(
                    setTodoStatus({ completed: !todo.completed, id: todo.id })
                  );
                }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default App;
