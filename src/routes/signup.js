import axios from "axios";

import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Form, Input, Button, message } from 'antd';
import {USERS_API} from "../utils/api";

export default function SignUpPage() {

    const navigate = useNavigate();

    const onFinish = values => {
        const config = {headers : {"Content-Type": "multipart/form-data"}};

        let form_data = new FormData();
        form_data.append('username',values.username);
        form_data.append('password',values.password);
        form_data.append('first_name',values.first_name || "");
        form_data.append('last_name',values.last_name || "");

        axios.post(USERS_API, form_data, config).then((res) => {
                message.success("You have successfully registered your account.")
                navigate("/");
            }).catch((err) => {
                message.error("Username already exists, please choose another one.");
        })
    };

    return (
        <div className="main" >
            <div className="authContainer">
                <Form onFinish={onFinish}>
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{required: true,message: 'Please input your username!',}]}
                    >
                        <Input placeholder="Enter your username"/>
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{required: true,message: 'Please input your password!',}]}
                    >
                        <Input.Password placeholder="Enter your password"/>
                    </Form.Item>
                    <Form.Item
                        label="First Name"
                        name="first_name"
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Last Name"
                        name="last_name"
                    >
                        <Input/>
                    </Form.Item>
                    <div className="loginButtons">
                        <Form.Item >
                            <Button className="authnButton" onClick={() => navigate("/")} type="primary" shape="round" size="large" >Log in</Button>
                        </Form.Item>
                        <Form.Item >
                            <Button className="authButton" type="primary" shape="round" size="large" htmlType="submit">Sign Up</Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        </div>
    )
}