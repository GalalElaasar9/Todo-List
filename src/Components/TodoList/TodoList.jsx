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
import { useContext, useEffect, useState } from 'react';
import { TodosContext } from '../../Context/TodosContext';
import {v4 as uuidv4} from 'uuid';
import toast from 'react-hot-toast';
// import { FaFilePen } from "react-icons";


export default function TodoList() {
  let {todos , setTodos} = useContext(TodosContext);

  const [titleInput , setTitleInput] = useState('');
  const [detailsInput , setDetailsInput] = useState('');

  const [displayTodosType , setDisplayTodosType] = useState('all');
  // Filteration Arrays
  const completedTodos = todos.filter((t)=>{
    return t.isCompleted
  })

  // Filteration Arrays
  const notCompletedTodos = todos.filter((t)=>{
    return !t.isCompleted
  })

  // todosToBeRenderd => وبعد كدا هتتغير على حسب إختيارك todos علشان نتحكم من خلالة أى الي هيتعرض على الصفحة بناءً على أختيار الزر فى الحالة الطبيعية هتكون بتساوي
  let todosToBeRenderd = todos;

  if(displayTodosType === "completed"){
    todosToBeRenderd = completedTodos
  }else if(displayTodosType === "non-completed"){
    todosToBeRenderd = notCompletedTodos
  }else{
    todosToBeRenderd = todos;
  }

  const todosJsx = todosToBeRenderd.map((t)=>{
    return <Todo key={t.id} todo={t}/>
  })


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
    toast.success("تم إضافة المهمة بنجاح",{
      duration:2000,
      position:"top-right"
    })
    // newTodo بعد إضافة ال input هنا بنفرغ ال
    setTitleInput('')
    setDetailsInput('')
  }
  
  const rtl = {
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
    },
  
  }

  return (
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
          <Grid container spacing={2} direction={'row-reverse'} className="inputsFeilds">
            <Grid size={4}>
              <TextField value={titleInput} onChange={(e)=>(setTitleInput(e.target.value))} id="outlined-basic" label="عنوان المهمه" variant="outlined" className='w-[100%]'   
  sx={rtl}
/>
            </Grid>
            <Grid size={4}>
              <TextField value={detailsInput} onChange={(e)=>(setDetailsInput(e.target.value))} id="outlined-basic" label="تفاصيل المهمه" variant="outlined" className='w-[100%]'/>
            </Grid>
            <Grid size={4}>
              <Button onClick={()=>{handleAddClick()}} variant="contained" sx={{ width:"100%" , height:"100%" }} className={`${titleInput.length === 0 ? 'opacity-30 pointer-events-none' : 'opacity-100'} ${detailsInput.length === 0 ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>إضافة</Button>
            </Grid>
          </Grid>
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
            {displayTodosType === "completed" && completedTodos.length === 0 ? <Alert severity="info" className='mb-3 justify-center flex-row-reverse gap-2'>لا يوجد مهام مضافة حتى الآن</Alert> : todosJsx}
          {/* End All Todos */}
          {/* Start Input + Add Button */}
          <div className="inputsFeilds">

          <Grid container spacing={2} direction={'row-reverse'} >
            <Grid size={4}>
              <TextField value={titleInput} onChange={(e)=>(setTitleInput(e.target.value))} id="outlined-basic" label="عنوان المهمه" variant="outlined" className='w-[100%]'/>
            </Grid>
            <Grid size={4}>
              <TextField value={detailsInput} onChange={(e)=>(setDetailsInput(e.target.value))} id="outlined-basic" label="تفاصيل المهمه" variant="outlined" className='w-[100%]'/>
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
  );
}