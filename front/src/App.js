import React from 'react';
import {BrowserRouter} from "react-router-dom"
import { observer } from 'mobx-react-lite';
import Auth from "./Pages/Auth"
import { useEffect, useState } from "react";

const App = observer(() => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:5000/auth/login", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  
  return(
    <BrowserRouter>
        <Auth />
       
    </BrowserRouter>
  )
  })
export default App;