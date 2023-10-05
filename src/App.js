import Header from "./components/Header";
import Card from "./components/card";
import Detail from "./components/Detail";
import {Route, Routes} from 'react-router-dom'
import AddMovie from "./components/AddMovie";
import { createContext, useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";

const Appstate = createContext()

function App() {
  const [login,  setLogin] =  useState(false)
  const [username, setUsername] = useState("")

  return (

    <Appstate.Provider value={{login, username, setLogin, setUsername}} >
    <div className="App relative">
      <Header />
        <Routes>
          <Route path="/" element={<Card />} />
          <Route path="/addmovie" element={<AddMovie />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

        </Routes>
    </div>
    </Appstate.Provider>
  );
}

export default App;
export {Appstate}