import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Alert, Divider, Grid, TextField } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Todo from '../Todo/Todo';

// uniqe id for each Products وهى مكتبة تقوم بعمل uuid خاص بمكتبة 
import { useContext, useEffect, useMemo, useState } from 'react';
import { TodosContext } from '../../Context/TodosContext';
import {v4 as uuidv4} from 'uuid';

import { Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from "@mui/material";
import { ToastContext } from '../../Context/ToastContext';
import MySnackbar from '../MySnackbar/MySnackbar';

export default function TodoList() {
  let { todos , setTodos } = useContext(TodosContext);
  let { showHideToast , message } = useContext(ToastContext);

  const [titleInput , setTitleInput] = useState('');
  const [detailsInput , setDetailsInput] = useState('');
  const [displayTodosType , setDisplayTodosType] = useState('all');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [dialogTodo, setDialogTodo] = useState(null);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);

  // Filteration Arrays
  /*
    * useMemo()
      - useMemo => useEffect يٌعاد رندرتها مرة أخرى وتعمتد على شرط معين للتغيير زيها زي ال  completedTodos او تغيير فى اى حاجة تانية ال render  علشان م مع كل  completedVariable يقوم بحفظ آخر قيمة انت طلعتها لل hook عبارة عن 
      - للكود الموجود بداخلها return علشان كدا لازم نعمل object ممكن تكون رقم أو مصفوفة أو  useMemo القيمة الي بترجع ال
  */
  const completedTodos = useMemo(()=>{
    return todos.filter((t)=>{
      // console.log("Calling Completed Todos");
      return t.isCompleted
    })
  },[todos])

  // Filteration Arrays
  const notCompletedTodos = useMemo(()=>{
    return todos.filter((t)=>{
        console.log("Calling not-Completed Todos");
        return !t.isCompleted
      })
  },[todos])

  // todosToBeRenderd => وبعد كدا هتتغير على حسب إختيارك todos علشان نتحكم من خلالة أى الي هيتعرض على الصفحة بناءً على أختيار الزر فى الحالة الطبيعية هتكون بتساوي
  let todosToBeRenderd = todos;


  if(displayTodosType === "completed"){
    console.log("Calling Completed Todos");
    todosToBeRenderd = completedTodos
  }else if(displayTodosType === "non-completed"){
    todosToBeRenderd = notCompletedTodos
  }else{
    todosToBeRenderd = todos;
  }

  useEffect(()=>{
    const storageTodos = JSON.parse(localStorage.getItem("todos"));
    // console.log(storageTodos);
    setTodos(storageTodos || [])
  },[])

  function changeDisplayedType(e) {
    console.log(e.target.value);
    setDisplayTodosType(e.target.value);
  }

  // Input اول ما أضغط على الزر بيضيف منتج جديد ويفضى ال
  function handleAddClick(){
    // جديدة Todo هنا أول ما يضغط على زر الإضافة هيضيف
    const newTodo = {
      id:uuidv4(),
      title: titleInput,
      details: detailsInput,
      isCompleted : false
    }

    // الجديدة todo وضيف عليها ال todos هنا لازم نقولة أحتفظ بالقيم القديمة الى موجودة بالفعل فى ال
    const updatedTodos = [...todos , newTodo]
    setTodos(updatedTodos);

    // الجديدة todo السابقة وال array ال localStorage هنا هيتضاف فى ال
    localStorage.setItem("todos",JSON.stringify(updatedTodos));
    // newTodo بعد إضافة ال input هنا بنفرغ ال
    setTitleInput('')
    setDetailsInput('')

    showHideToast("تم إضافة المهمة بنجاح")
  }

  const rtlTextField = {
    direction: "rtl",

    "& input": {
      textAlign: "right",
    },

    /* إطار الـ outlined نفسه */
    "& .MuiOutlinedInput-root": {
      direction: "rtl",
    },

    /* تحريك الـ notch ناحية اليمين */
    "& .MuiOutlinedInput-notchedOutline": {
      textAlign: "right",
    },

    /* التحكم في الـ legend (الجزء اللي بيختفي) */
    "& .MuiOutlinedInput-notchedOutline legend": {
      textAlign: "right",
      marginRight: "14px",
      marginLeft: "unset",
      transformOrigin: "right",
    },

    /* اللابل */
    "& .MuiInputLabel-root": {
      right: 28,
      left: "auto",
      transformOrigin: "top right",
    },

    "& .MuiInputLabel-root.MuiInputLabel-shrink": {
      transform: "translate(0, -9px) scale(0.75)",
    }
  }

  // ================== Start Functions Delete Dialog ==================
  function openDeleteDialog(todo) {
    // todo => prop دى وراحت عن طريق fun الى هى شايلة ال showDelete عن طريق ال todo لأنة راجع على هيئة أوبجيكت صفحة ال todo بتاع ال id عملتله باص علشان يجيب ال param عبارة عن 
    setDialogTodo(todo) // state علشان نقدر تغيرها بعد كدا لأنها أصبحت setDialogTodo بالكامل لل todo هنا باصينا قيمة ال
    // alert(todo.id)
    setShowDeleteDialog(true)
  }

  const handleDeleteDialogClose = () => {
    setShowDeleteDialog(false);
  };

  // Function handleDeleteConfirm
  function handleDeleteConfirm() {
    // console.log(dialogTodo);
    const TodosAfterDelete = todos.filter((t) => t.id !== dialogTodo.id);
    setTodos(TodosAfterDelete);
    // علشان لما أعمل ريفريش يتعرض أخر حذف delete بعد ال todos هنا بحفظ ال
    localStorage.setItem("todos",JSON.stringify(TodosAfterDelete))

    setShowDeleteDialog(false)
    showHideToast("تم حذف المهمة بنجاح")
    
  }

  // ================== End Functions Delete Dialog ==================

    // ================== Start Functions Update Dialog ==================
  const openUpdateDialog = (todo) => {
    setDialogTodo(todo)
    setShowUpdateDialog(true)
  };
  const handleUpdateDialogClose = () => {
    setShowUpdateDialog(false);
  };

  // Function handleUpdateConfirm
  function handleUpdateConfirm() {
    const todosAfterEdit = todos.map((t)=>{
      if(t.id === dialogTodo.id){
        return {...t , title: dialogTodo.title , details:dialogTodo.details}
      }else{
        return t;
      }
    })
    setTodos(todosAfterEdit);
    setShowUpdateDialog(false);
    showHideToast("تم تحديث المهمة بنجاح")

    // علشان لما أعمل ريفريش يتعرض أخر تعديل update بعد ال todos هنا بحفظ ال
    localStorage.setItem("todos",JSON.stringify(todosAfterEdit))
  }

  // ================== End Functions Update Dialog ==================

  const todosJsx = todosToBeRenderd.map((t)=>{
    return <Todo key={t.id} todo={t} showDelete={openDeleteDialog} showUpdate={openUpdateDialog}/>
  })

  return (
    <>
      <MySnackbar message={message}/>
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
            value={dialogTodo?.title}
            onChange={(e) => {
              setDialogTodo({ ...dialogTodo, title: e.target.value });
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
            value={dialogTodo?.details}
            onChange={(e) => {
              setDialogTodo({ ...dialogTodo, details: e.target.value });
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
      <Container maxWidth="md">
        {todos.length === 0 ? <Card sx={{ minWidth: 275 , maxHeight:"650px" , height:"100%" , overflow:"auto"  }}>
          <CardContent>
            <Typography variant='h2' className='title text-center !mb-4' style={{ fontWeight:"400" }}>
              مهامى اليومية 
            </Typography>
            <Divider/>
            {/* Filter Buttons */}
            <ToggleButtonGroup
              exclusive          
              value={displayTodosType}  
              aria-label="text alignment"
              className="!flex !justify-center items-center ltr my-5"
              onChange={changeDisplayedType}
              color='primary'
            >
              <ToggleButton value="non-completed">
                غير المنجز
              </ToggleButton>
              <ToggleButton value="completed">
                المنجز
              </ToggleButton>
              <ToggleButton value="all">
                الكل 
              </ToggleButton>
            </ToggleButtonGroup>
            {/* Filter Buttons */}
            {/* Alert No assignments */}
              <Alert severity="error" className='mb-3 justify-center flex-row-reverse gap-2'>لا يوجد مهام مضافة حتى الآن</Alert>
            {/* Alert No assignments */}
            {/* Start Input + Add Button */}
            <div className="inputsFeilds">
              <Grid container spacing={2} direction={'row-reverse'} >
                <Grid size={4}>
                  <TextField value={titleInput} onChange={(e)=>(setTitleInput(e.target.value))} id="outlined-basic" label="عنوان المهمه" variant="outlined" className='w-[100%]' sx={rtlTextField} />
                </Grid>
                <Grid size={4}>
                  <TextField value={detailsInput} onChange={(e)=>(setDetailsInput(e.target.value))} id="outlined-basic" label="تفاصيل المهمه" variant="outlined" className='w-[100%]' sx={rtlTextField} />
                </Grid>
                <Grid size={4}>
                  <Button onClick={()=>{handleAddClick()}} variant="contained" sx={{ width:"100%" , height:"100%" }} className={`${titleInput.length === 0 ? 'opacity-30 pointer-events-none' : 'opacity-100'} ${detailsInput.length === 0 ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>إضافة</Button>
                </Grid>
              </Grid>
            </div>
            {/* End Input + Add Button */}
          </CardContent>
        </Card> : <Card sx={{ minWidth: 275 , maxHeight:"650px" , height:"100%" , overflow:"auto"  }}>
          <CardContent>
            <Typography variant='h2' className='text-center !mb-4' style={{ fontWeight:"400" }}>
              مهامى اليومية
            </Typography>
            <Divider/>
            {/* Filter Buttons */}
            <ToggleButtonGroup
              exclusive          
              value={displayTodosType}  
              aria-label="text alignment"
              className="justify-center items-center ltr my-5"
              onChange={changeDisplayedType}
              color='primary'
            >
              <ToggleButton value="non-completed">
                غير المنجز
              </ToggleButton>
              <ToggleButton value="completed">
                المنجز
              </ToggleButton>
              <ToggleButton value="all">
                الكل 
              </ToggleButton>
            </ToggleButtonGroup>
            {/* Filter Buttons */}
            {/* Start All Todos */}
              {displayTodosType === "completed" && completedTodos.length === 0 ? <Alert severity="info" className='mb-3 justify-center flex-row-reverse gap-2'>لا يوجد مهام منجزة حتى الآن</Alert> : todosJsx}
            {/* End All Todos */}
            {/* Start Input + Add Button */}
            <div className="inputsFeilds">
              <Grid container spacing={2} direction={'row-reverse'} >
                <Grid size={4}>
                  <TextField value={titleInput} onChange={(e)=>(setTitleInput(e.target.value))} id="outlined-basic" label="عنوان المهمه" variant="outlined" className='w-[100%]' sx={rtlTextField}/>
                </Grid>
                <Grid size={4}>
                  <TextField value={detailsInput} onChange={(e)=>(setDetailsInput(e.target.value))} id="outlined-basic" label="تفاصيل المهمه" variant="outlined" className='w-[100%]' sx={rtlTextField}/>
                </Grid>
                <Grid size={4}>
                  <Button onClick={()=>{handleAddClick()}} variant="contained" sx={{ width:"100%" , height:"100%" }} className={`${titleInput.length === 0 ? 'opacity-30 pointer-events-none' : 'opacity-100'} ${detailsInput.length === 0 ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>إضافة</Button>
                </Grid>
              </Grid>
            </div>
            {/* End Input + Add Button */}
          </CardContent>
          {/* <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions> */}
        </Card>}
        
        {/* لو تم الضغط على زر منجز ومكنش فى مهام منجزة alert ظهور */}
            
      </Container>
    </>
  );
}