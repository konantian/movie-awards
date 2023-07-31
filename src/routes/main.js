import {message} from "antd";
import {useEffect, useRef, useState} from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

import {LoginForm, SignUpForm} from "../components";

export default function MainPage() {

    const formRef = useRef(null);
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const [isLogIn, setIsLogIn] = useState(true);

    useEffect(() => {
        if(user) {
            message.success(`Welcome Back ${user.username}!`);
            navigate("/search");
        }
    },[user])

    return (
        <div className="main" >
            {isLogIn ? <LoginForm formRef={formRef} toggle={setIsLogIn} /> : <SignUpForm toggle={setIsLogIn} />}
        </div>
    )
}