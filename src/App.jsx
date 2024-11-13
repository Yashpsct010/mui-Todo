import { Add, Delete, Edit, EventAvailable, Update } from "@mui/icons-material";
import { Typography } from "@mui/joy";
import {
  Alert,
  Button,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Snackbar,
  TextField,
  Tooltip,
} from "@mui/material";
import { useRef, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [toggle, setToggle] = useState({ show: false, id: null });
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [checked, setChecked] = useState({});
  const inputRef = useRef(null);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask]);
      setNewTask("");
      setSnackbarMessage("Task Added");
    }
    inputRef.current.focus();
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((task, i) => i !== index));
    setSnackbarMessage("Task Deleted");
  };

  const editTask = (index) => {
    setToggle({ show: true, id: index });
    inputRef.current.focus();
    setNewTask(tasks[index]);
  };

  const updateTask = () => {
    tasks[toggle.id] = newTask;
    setTasks([...tasks]);
    setToggle({ show: false });
    setNewTask("");
    setSnackbarMessage("Task Updated");
  };

  return (
    <>
      <Paper
        elevation={10}
        className="todo"
        sx={{
          width: "100%",
          maxWidth: 540,
          bgcolor: "#F2F2F2",
          color: "#000",
          padding: "1rem",
          margin: "15vh auto",
          fontFamily: "Dancing Script",
          borderRadius: "1rem",
        }}
      >
        <Typography level="h1" textAlign="center" sx={{ fontFamily: "Dancing Script" }}>
          🍋 Todo App
        </Typography>
        <Paper
          elevation={0}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#f2f2f2",
            marginTop: "1rem",
            marginBottom: "1rem",
          }}
        >
          <TextField
            disableTypography
            fullWidth
            sx={{ fontFamily: "Dancing Script", paddingRight: "1rem" }}
            label="New Todo"
            variant="filled"
            color="error"
            ref={inputRef}
            value={newTask}
            onKeyDown={(e) =>
              e.key === "Enter" && toggle.show ? updateTask() : e.key === "Enter" && addTask()
            }
            onChange={(e) => setNewTask(e.target.value)}
          />
          {toggle.show ? (
            <Tooltip title="Update Task">
              <Button variant="contained" sx={{
                padding: "1rem", backgroundColor: "#FFD60A", borderRadius: "1rem", "&:hover": {
                  backgroundColor: "#FFD60A",
                }
              }} onClick={updateTask}>
                <Update />
              </Button>
            </Tooltip>
          ) : (
            <Tooltip title="Add Task">
              <Button variant="contained" sx={{
                padding: "1rem", backgroundColor: "#FFD60A", borderRadius: "1rem",
                "&:hover": {
                  backgroundColor: "#FFD60A",
                }
              }} onClick={addTask}>
                <Add />
              </Button>
            </Tooltip>
          )}
        </Paper>

        <List sx={{ width: "100%", bgcolor: "#F2F2F2", fontFamily: "Dancing Script" }}>
          {tasks.map((task, index) => (
            <>
              <ListItem
                key={index}
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#FFD60A",
                  fontFamily: "Dancing Script",
                  fontWeight: "800",
                  borderRadius: "1rem",
                  marginBottom: "1rem",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <ListItemAvatar sx={{ display: "flex", alignItems: "center" }}>
                  {/* <EventAvailable /> */}
                  <Checkbox checked={checked[index]} onChange={(e) => setChecked({ ...checked, [index]: e.target.checked })} />
                </ListItemAvatar>
                <ListItemText disableTypography primary={task} sx={{ fontFamily: "Dancing Script", fontWeight: "800", fontSize: "1.5rem", display: "flex", alignItems: "center",textDecoration: checked[index] ? "line-through" : "none" }} />
                <IconButton color="error" onClick={() => deleteTask(index)}>
                  <Tooltip title="Delete Task">
                    <Delete />
                  </Tooltip>
                </IconButton>
                <IconButton color="success" onClick={() => editTask(index)}>
                  <Tooltip title="Edit Task">
                    <Edit />
                  </Tooltip>
                </IconButton>
              </ListItem>
            </>
          ))}
        </List>
      </Paper>

      <Snackbar
        open={snackbarMessage !== ""}
        message={snackbarMessage}
        autoHideDuration={3000}
        onClose={() => setSnackbarMessage("")}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      ><Alert severity={snackbarMessage === "Task Added" ? "success" : snackbarMessage === "Task Deleted" ? "error" : "warning"}>{snackbarMessage}</Alert></Snackbar>
    </>
  );
}

export default App;