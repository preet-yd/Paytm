import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import React from 'react'

function SignIn() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();
    
    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign up"} />
                <SubHeading label={"Enter your infromation to access your account"} />
                <InputBox onChange={e=> {setUsername(e.target.value)}} placeholder="preet@gmail.com" label={"Email"} />
                <InputBox onChange={e=> {setPassword(e.target.value)}} placeholder="123456" label={"Password"} />
                <div className="pt-4">
                    <Button onClick={
                        async()=> {
                            const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                                username,
                                password
                            })
                            localStorage.setItem("token" , response.data.token)
                            navigate("/dashboard")
                        }
                    } label={"Sign In"} />
                </div>
                <BottomWarning label={"Dont't have an account?"} buttonText={"Sign Up"} to={"/"} />
            </div>
        </div>
    </div>

}

export default SignIn