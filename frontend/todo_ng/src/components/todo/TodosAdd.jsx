import { useState } from "react";
import fetchPostDataWithAuth from "../../client.js"; // Assuming this is the path to your fetch function
import { useNavigate } from "react-router-dom";

export function TodosAdd() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: ''
    });

    const [errors, setErrors] = useState({
        title: '',
        description: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let isValid = true;
        const newErrors = { title: '', description: '' };

        // Validation checks
        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
            isValid = false;
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
            isValid = false;
        }

        setErrors(newErrors);

        if (isValid) {
            const payload = {
                title: formData.title,
                description: formData.description
            };

            try {
                const response = await fetchPostDataWithAuth('/todos/add', payload);
                console.log('Todo added:', response.data);

                // Optionally navigate after submission or show a success message
                navigate('/');  // Redirect to the home page after submitting
            } catch (error) {
                console.error('Error submitting todo:', error.message);
            }
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
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Enter the title"
                        required
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-2">{errors.title}</p>}
                </div>

                {/* Description Input */}
                <div className="mb-6">
                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Enter the description"
                        rows="4"
                        required
                    ></textarea>
                    {errors.description && <p className="text-red-500 text-sm mt-2">{errors.description}</p>}
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
