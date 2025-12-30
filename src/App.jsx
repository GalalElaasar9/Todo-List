import TodoList from "./Components/TodoList/TodoList";
import "./App.css";
import { ThemeProvider } from "@mui/material";
import theme from "./Components/theme";
import TodoContextProvider from "./Context/TodosContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <TodoContextProvider>
      <ThemeProvider theme={theme}>
        <Toaster/>
        <div className="App flex justify-center items-center h-[100vh] ltr bg-[#191b1f]">
          <TodoList />
        </div>
      </ThemeProvider>
    </TodoContextProvider>
  );
}

export default App;
