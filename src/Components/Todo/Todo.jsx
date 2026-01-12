import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {
  Stack,
} from "@mui/material";

import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useContext } from "react";
import { TodosContext } from "../../Context/TodosContext";
import { ToastContext } from "../../Context/ToastContext";

export default function Todo({ todo , showDelete , showUpdate }) {
  let { todos, setTodos } = useContext(TodosContext);
  let { showHideToast } = useContext(ToastContext);

  function handleCheckClick() {
    const updatedTodos = todos.map((t) => {
        if (t.id === todo.id) {
          if (t.isCompleted === true) {
            t.isCompleted = false;
            showHideToast("تم حذف المهمة من المهام المنجزة")
          } else {
            t.isCompleted = true;
            showHideToast("تم إضافة المهمة إلى المهام المنجزة")
          }
          // الكود المختصر
          // t.isCompleted = !t.isCompleted
        }
        return t;
      })
    setTodos(updatedTodos);
    
    localStorage.setItem("todos",JSON.stringify(updatedTodos))
  }

  // ================== Start Functions Delete Dialog ==================
  const handleDeleteClick = () => {
    showDelete(todo); // => delete Btn علشان الدايلوج يظهر لما أضغط على ال TodoList من ال prop جاية عن طريق
  };

  // ================== End Functions Delete Dialog ==================

  // ================== Start Functions Update Dialog ==================
  const handleUpdateClick = () => {
    showUpdate(todo)
  };

  // ================== End Functions Update Dialog ==================

  return (
    <>
      <Card sx={{ minWidth: 275 }} className="mb-3">
        <CardContent className="bg-blue-500 hover:py-7 hover:shadow-lg ease-in-out duration-300">
            <Grid container spacing={2} direction={"row-reverse"} className="todos">
              <Grid size={8}>
                <Typography
                  variant="h5"
                  className={`text-white text-bold text-right ${todo.isCompleted ? 'line-through' : ''}`}
                >
                  {todo.title}
                </Typography>
                <Typography variant="h6" className={`text-white text-right ${todo.isCompleted ? 'line-through' : ''}`}>
                  {todo.details}
                </Typography>
              </Grid>
              
              {/* ACTIONS BUTTONS */}
              <Grid size={4} className="flex justify-center items-center">
                <Stack direction={"row"} spacing={3}>
                  <IconButton
                    onClick={handleDeleteClick}
                    aria-label="delete"
                    className="iconButton !bg-white !border-[3px] !border-solid !border-[#b23c17]"
                  >
                    <DeleteIcon className="text-[#b23c17]" />
                  </IconButton>
                  {/* Update Button */}
                  <IconButton
                    onClick={handleUpdateClick}
                    aria-label="edit"
                    className="iconButton text-[#1769aa] !bg-white !border-[3px] !border-solid !border-[#1769aa]"
                  >
                    <EditIcon className="text-[#1769aa]" />
                  </IconButton>
                  {/* Update Button */}
                  {/* Check Icon Button */}
                  <IconButton
                    onClick={() => handleCheckClick()}
                    aria-label="check"
                    className={`iconButton text-[#8bc34a] ${
                      todo.isCompleted ? "!bg-[#8bc34a]" : "!bg-white"
                    } !border-[3px] !border-solid !border-[#8bc34a]`}
                  >
                    <CheckIcon
                      className={`${
                        todo.isCompleted ? "text-white" : "text-[#8bc34a]"
                      }`}
                    />
                  </IconButton>
                  {/* Check Icon Button */}
                </Stack>
              </Grid>
              {/* ACTIONS BUTTONS */}
            </Grid>
        </CardContent>
      </Card>
    </>
  );
}
