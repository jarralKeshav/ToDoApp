import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@material-tailwind/react";
import Navbar from "../navbar/Navbar.jsx";
import {TodosAdd} from "./TodosAdd.jsx";

export function TodosCard() {
    const urlFetch = "http://localhost:8080/api/v1/todos";
    const [dataArray, setDataArray] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(urlFetch);
                setDataArray(response.data.map(todo => ({ ...todo, isDone: false }))); // Add `isDone` to each todo
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    // useEffect(() => {
    //     if (onNewTodo) {
    //         setDataArray((prevTodos) => [...prevTodos, { ...onNewTodo, isDone: false }]); // Add new todos with `isDone` set to false
    //     }
    // }, [onNewTodo]);

    const handleDelete = async (todo_id) => {
        const urlDelete = `http://localhost:8080/api/v1/todos/${todo_id}/delete`;

        try {
            await axios.delete(urlDelete);
            setDataArray((prevData) => prevData.filter((todo) => todo.id !== todo_id));
            console.log("Todo is deleted");
        } catch (error) {
            console.error("Error deleting data:", error);
        }
    };

    const handleDoneClick = (todo_id) => {
        setDataArray((prevData) =>
            prevData.map((todo) =>
                todo.id === todo_id ? { ...todo, isDone: !todo.isDone } : todo
            )
        );
    };

    const handleAddTodo = (newTodo)=>{
        setDataArray((prevData) =>[...prevData, {...newTodo,isDone: false}]);
    }

    return (

        <>
            <Navbar/>
            <TodosAdd  onAddTodo={handleAddTodo}/>
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 text-sm">
                {dataArray.length > 0 ? (
                    dataArray.map((data, index) => (
                        <div
                            key={index}
                            className={`m-2 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transition-opacity duration-500 ${
                                data.isDone ? "opacity-50" : "opacity-100"
                            }`}
                        >
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {data.title}
                            </h5>

                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                {data.description}
                            </p>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">

                                Created At: {data.createdAt}
                            </p>
                            <div className="flex space-x-2">
                                <Button
                                    onClick={() => handleDelete(data.id)}
                                    className={
                                        "inline-flex items-center px-3 py-2 text-sm font-medium text-center" +
                                        " text-white bg-red-700 hover:bg-red-900 focus:ring-2 focus:outline-none" +
                                        " focus:ring-blue-900 "
                                    }
                                >
                                    Delete
                                </Button>

                                <Button
                                    onClick={() => handleDoneClick(data.id)}
                                    className={
                                        "inline-flex items-center px-3 py-2 text-sm font-medium text-center" +
                                        " text-white bg-blue-700 hover:bg-blue-900 focus:ring-2 focus:outline-none" +
                                        " focus:ring-red-900 "
                                    }
                                >
                                    {data.isDone ? "Undone" : "Done"}
                                </Button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center p-6 bg-gray-100 rounded-lg dark:bg-gray-700">
                        <p className="text-xl font-semibold text-gray-500 dark:text-gray-300">No todo</p>
                    </div>
                )}
            </div>
        </>
    );
}
