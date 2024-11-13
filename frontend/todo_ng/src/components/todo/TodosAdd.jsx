import { useState } from "react";
import axios from "axios";

export function TodosAdd({onAddTodo}) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        try {
            const response = await axios.post("http://localhost:8080/api/v1/todos/add", {
                title,
                description,
            });
            console.log("Todo added successfully:", response.data);

            // Call the onAddTodo function passed as a prop to update the parent component's state
            if (onAddTodo) {
                onAddTodo(response.data); // Pass the newly added todo data

            }

            // Clear the input fields
            setTitle("");
            setDescription("");
            // window.location.reload();
        } catch (error) {
            console.error("Error adding data:", error.message);
            // Optionally show an error message to the user here
        }
    };

    return (
        <div className="container mx-auto p-4">
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-8 dark:bg-gray-800">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">Create a New Todo</h2>

                {/* Title Input */}
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Enter the title"
                        required
                    />
                </div>

                {/* Description Input */}
                <div className="mb-6">
                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Enter the description"
                        rows="4"
                        required
                    ></textarea>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
                >
                    Add Todo
                </button>
            </form>
        </div>
    );
}
