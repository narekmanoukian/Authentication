import React from 'react';
import {BrowserRouter} from "react-router-dom"
import { observer } from 'mobx-react-lite';
import Auth from "./Pages/Auth"


const App = observer(() => {
  
  return(
    <BrowserRouter>
        <Auth />
       
    </BrowserRouter>
  )
  })
export default App;