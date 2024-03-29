import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import React from 'react'

function SignUp() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [error, setError] = React.useState("");
    const navigate = useNavigate();

    const handleSignUp = async () => {
        if (firstName === "") {
            setError("firstName is Required");
            return;
        }
        if (lastName === "") {
            setError("lastName is Required");
            return;
        }
        if (!username.endsWith("@gmail.com")) {
            setError("Email should end with @gmail.com");
            return;
        }
        if (password.length < 6) {
            setError("Password should be at least 6 characters long");
            return;
        }

        const response = await axios.post("https://paytm-2wwo.onrender.com/api/v1/user/signup", {
            username,
            password,
            firstName,
            lastName
        });

        localStorage.setItem("token", response.data.token);
        navigate("/");
    };

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign up"} />
                <SubHeading label={"Enter your information to create an account"} />
                <InputBox onChange={e => {setFirstName(e.target.value)}} placeholder="John" label={"First Name"} />
                <InputBox onChange={e => {setLastName(e.target.value)}} placeholder="Doe" label={"Last Name"} />
                <InputBox onChange={e => {setUsername(e.target.value)}} placeholder="preet@gmail.com" label={"Email"} />
                <InputBox onChange={e => {setPassword(e.target.value)}} placeholder="123456" label={"Password"} />
                {error && <div className="mt-1 text-sm text-red-500 whitespace-nowrap text-error">{error}</div>}
                <div className="pt-4">
                    <Button onClick={handleSignUp} label={"Sign up"} />
                </div>
                <BottomWarning label={"Already have an account?"} buttonText={"Sign In"} to={"/signin"} />
            </div>
        </div>
    </div>;
}

export default SignUp;
