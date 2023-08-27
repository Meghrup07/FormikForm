import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import UserInfo from "./components/UserInfo";
import UserList from "./components/UserList";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={UserList} />
          <Route path="/userInfo/:id" Component={UserInfo} />
          <Route path="/add" Component={AddUser} />
           <Route path='/edit/:id' Component={EditUser} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
