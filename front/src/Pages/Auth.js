import React, {useContext, useState} from "react";
import {Container, Form, Card, Button} from "react-bootstrap"
import {NavLink, useLocation} from "react-router-dom"
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../Routs"
import { Context } from '../index'
import {login, registration} from "../http/userAPI"
import { observer } from "mobx-react-lite";

const Auth = observer(() => {
    const location = useLocation()
    const IsLogin = location.pathname === LOGIN_ROUTE
   
    const {user} = useContext(Context)
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(email, password);
            }
            user.setUser(data)
            user.setIsAuth(true)
            
        } catch (e) {
            alert(e.response.data.message)
        }

    }
    return(
            <div>
                <h2>{IsLogin ? "SignIn" : "SignUp"}</h2>
                
                <Form>
                     <Form.Control 
                        placeholder="Write your Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}  />
                    <Form.Control 
                        placeholder="Write your Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"  />
                 
                    

                        
                   
                {IsLogin ?
                <div>
                    Not have account? <NavLink to = {REGISTRATION_ROUTE}>SignUp</NavLink>
                </div>
                :
                <div>
                    Already hawe account? <NavLink to = {LOGIN_ROUTE}>SignIn</NavLink>
                </div>
                }
                {IsLogin ?
                    <Button onClick={click}>
                            SignIn
                    </Button>
                    :
                    <Button onClick={click}>
                           SignUp
                    </Button>
                }
                </Form>
            </div>
       )})
export default Auth;