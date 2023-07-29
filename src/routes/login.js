import axios from 'axios';

import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {Button, Form, Input, message} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";

import { fetchUserSuccess } from "../redux/actions";
import { LOGIN_API } from '../utils/api';

export default function LoginPage() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinish = values => {
        const config = {headers : {"Content-Type": "multipart/form-data"}};

        let form_data = new FormData();
        form_data.append('username',values.username);
        form_data.append('password',values.password);

        axios.post(LOGIN_API, form_data, config).then((res) => {
            message.success("Welcome to our movie search system.")
            dispatch(fetchUserSuccess(res.data.user));
            navigate('/search');
        }).catch((err) => {
             message.error("Your username may not exist or your password is not correct.");
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
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{required: true,message: 'Please input your password!',}]}
                    >
                        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} />
                    </Form.Item>
                    <div className="loginButtons">
                        <Form.Item >
                            <Button className="authButton"  type="primary" shape="round" size="large" htmlType="submit">Log In</Button>
                        </Form.Item>
                        <Form.Item >
                            <Button className="authButton" onClick={() => navigate("/signup/")} type="primary" shape="round" size="large" >Sign Up</Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        </div>
    )
}