import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import {TodosCard} from "./components/todo/TodosCard.jsx";
import Login from "./pages/authentication/Login.jsx";
import About from "./pages/About.jsx";

function App() {
    // const [newTodo, setNewTodo] = useState(null); // State to track new todo

    return (
      <>




        {/*<Navbar/>*/}
        {/*<div className="flex flex-col justify-center items-center">*/}


                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/todo" element={<TodosCard/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/about" element={<About/>} />
                    {/* Other routes */}
                </Routes>


        {/*</div>*/}


      </>
  )
}

export default App
