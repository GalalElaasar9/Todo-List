import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";

import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useContext, useState } from "react";
import { TodosContext } from "../../Context/TodosContext";
import toast from "react-hot-toast";

export default function Todo({ todo }) {
  let { todos, setTodos } = useContext(TodosContext);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState({
    title: todo.title, // Input هياخد القيم بتاعة المنتج الي انت عايز تعدلة علشان يعرضهالنا فى ال title هنا خلينا ال
    details: todo.details, // Input هياخد القيم بتاعة المنتج الي انت عايز تعدلة علشان يعرضهالنا فى ال details هنا خلينا ال
  });

  function handleCheckClick() {
    const updatedTodos = todos.map((t) => {
        if (t.id === todo.id) {
          if (t.isCompleted === true) {
            t.isCompleted = false;
          } else {
            t.isCompleted = true;
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
    setShowDeleteDialog(true);
  };
  const handleDeleteDialogClose = () => {
    setShowDeleteDialog(false);
  };

  // Function handleDelete
  function handleDeleteConfirm() {
    const TodosAfterDelete = todos.filter((t) => t.id !== todo.id);
    setTodos(TodosAfterDelete);
    // علشان لما أعمل ريفريش يتعرض أخر حذف delete بعد ال todos هنا بحفظ ال
    localStorage.setItem("todos",JSON.stringify(TodosAfterDelete))

    toast.success("تم حذف المهمة بنجاح",{
      duration:2000,
      position:"top-right"
    })
  }

  // ================== End Functions Delete Dialog ==================

  // ================== Start Functions Update Dialog ==================
  const handleUpdateClick = () => {
    setShowUpdateDialog(true);
  };
  const handleUpdateDialogClose = () => {
    setShowUpdateDialog(false);
  };

  // Function handleDelete
  function handleUpdateConfirm() {
    const todosAfterEdit = todos.map((t)=>{
      if(t.id === todo.id){
        return {...t , title: updatedTodo.title , details:updatedTodo.details}
      }else{
        return t;
      }
    })
    toast.success("تم تعديل المهمة بنجاح",{
      duration:2000,
      position:"top-right"
    })
    setTodos(todosAfterEdit);
    setShowUpdateDialog(false);
    // علشان لما أعمل ريفريش يتعرض أخر تعديل update بعد ال todos هنا بحفظ ال
    localStorage.setItem("todos",JSON.stringify(todosAfterEdit))
  }

  // ================== End Functions Update Dialog ==================

  return (
    <>
      {/* DELETE DIALOG */}
      <Dialog
        open={showDeleteDialog}
        onClose={handleDeleteDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          هل أنت متأكد من حذف هذة المهمة ؟
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لا يمكن التراجع عن الحذف فى حال إختيار زر (حذف)
          </DialogContentText>
        </DialogContent>
        <DialogActions className="!justify-start">
          <Button
            onClick={handleDeleteConfirm}
            className="!text-[#b23c17]"
            autoFocus
          >
            نعم قم بالحذف
          </Button>
          <Button onClick={handleDeleteDialogClose} className="!text-[#b23c17]">
            إغلاق
          </Button>
        </DialogActions>
      </Dialog>
      {/* DELETE DIALOG */}

      {/* UPDATE DIALOG */}
      <Dialog
        open={showUpdateDialog}
        onClose={handleUpdateDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">تعديل المهمة</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="عنوان المهمة"
            fullWidth
            variant="standard"
            value={updatedTodo.title}
            onChange={(e) => {
              setUpdatedTodo({ ...updatedTodo, title: e.target.value });
            }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="التفاصيل"
            fullWidth
            variant="standard"
            value={updatedTodo.details}
            onChange={(e) => {
              setUpdatedTodo({ ...updatedTodo, details: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions className="!justify-start">
          <Button
            onClick={handleUpdateConfirm}
            className="!text-[#b23c17]"
            autoFocus
          >
            تحديث
          </Button>
          <Button onClick={handleUpdateDialogClose} className="!text-[#b23c17]">
            إغلاق
          </Button>
        </DialogActions>
      </Dialog>
      {/* END UPDATE DIALOG */}
      <Card sx={{ minWidth: 275 }} className="mb-3">
        <CardContent className="bg-blue-500 hover:py-7 hover:shadow-lg ease-in-out duration-300">
          <Grid container spacing={2} direction={"row-reverse"}>
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
