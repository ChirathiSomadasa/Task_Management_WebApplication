import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AddTask from "./pages/AddTask";
import AllTask from "./pages/AllTask";
import EditTask from "./pages/EditTask";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home /> }/>
        <Route path="/tasks/new" element={<AddTask /> }/>
        <Route path="/tasks" element={<AllTask /> }/>
         <Route path="/tasks/edit/:id" element={<EditTask />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;