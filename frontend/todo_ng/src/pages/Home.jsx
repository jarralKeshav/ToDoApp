import Navbar from "../components/navbar/Navbar.jsx";

const Home = () => {
    return (<div>
            <Navbar/>

            <div
                className={"flex justify-center items-center min-h-screen bg-gray-900"}>
                This is Homepage
            </div>
        </div>);
};

export default Home;