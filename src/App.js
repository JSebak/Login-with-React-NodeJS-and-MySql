import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import LoginComponent from "./Components/Login/loginComponent";
import RegisterCompnent from "./Components/Register/RegisterComponent";
import Profile from "./Components/Profile/ProfileComponent";
import { UserContext } from "./Context/userContext";
import NotFound from "./Components/NotFound/NotFound";

function App() {
  const [user, setUser] = useState({});


  useEffect(() => {
    const logged = window.localStorage.getItem("loggedUser");
    if(logged)
    {
      var loggedUser=JSON.parse(logged);
      if (typeof loggedUser === 'string')setUser(JSON.parse(loggedUser));
      else{
        setUser(loggedUser);
      }
    }
  }, [])

  const handleLogin = (logguser) => {
    setUser(logguser);
    window.localStorage.setItem("loggedUser", JSON.stringify(logguser));
  };
  const handleLogout= (user) =>{
    setUser({});
    window.localStorage.removeItem("loggedUser");
  }
  return (
    <UserContext.Provider value={user}>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={<Profile handleLogin={handleLogin} handleLogout={handleLogout}/>}
          ></Route>
          <Route path="/login" element={<LoginComponent handleLogin={handleLogin}/>}></Route>
          <Route path="/register" element={<RegisterCompnent />}></Route>
          {/* <Route path="/profile" element={<Profile handleLogout={handleLogout}/>}></Route> */}
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
