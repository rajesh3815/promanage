import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/signuppage/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import Task from "./pages/task/Task";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/task/:id" element={<Task />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
