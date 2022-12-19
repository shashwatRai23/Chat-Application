import React, { useState } from "react";
import Sidebar from "./Components/Sidebar/Sidebar";
import Chat from "./Components/Chat/Chat";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import "./App.css";
import { useStateValue } from "./StateProvider";

const App = () => {
  const [{user}, dispatch]= useStateValue();
  // const [user, setUser] = useState(null);
  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app_container">
          <Router>
            <Sidebar />
            <Routes>
              <Route exact path="/rooms/:roomId" element={<Chat />} />
            </Routes>
          </Router>
        </div>
      )}
    </div>
  );
};

export default App;
