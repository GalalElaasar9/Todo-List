import TodoList from "./Components/TodoList/TodoList";
import "./App.css";
import { ThemeProvider } from "@mui/material";
import theme from "./Components/theme";
import TodoContextProvider from "./Context/TodosContext";
import MySnackbar from "./Components/MySnackbar/MySnackbar";
import ToastContextProvider from "./Context/ToastContext";

function App() {
  return (
    <TodoContextProvider>
      <ToastContextProvider>
        <ThemeProvider theme={theme}>
          <div className="App flex justify-center items-center h-[100vh] ltr bg-[#191b1f]">
            <TodoList />
          </div>
        </ThemeProvider>
      </ToastContextProvider>
    </TodoContextProvider>
  );
}

export default App;
