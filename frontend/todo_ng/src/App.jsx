import {Route, Routes, useNavigate} from "react-router-dom";
import Home from "./pages/Home.jsx";
import {TodosCard} from "./components/todo/TodosCard.jsx";
import Login from "./pages/authentication/Login.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import {useEffect} from "react";

function App() {
    // const [newTodo, setNewTodo] = useState(null); // State to track new todo
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('token');
        if(!isLoggedIn) {
            navigate('/login');

        }
    },[])

    return (
      <>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/todo" element={<TodosCard/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/about" element={<About/>} />
                    <Route path="/contact" element={<Contact/>} />
                    {/* Other routes */}
                </Routes>


        {/*</div>*/}


      </>
  )
}

export default App
