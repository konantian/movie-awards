import axios from "axios";
import {Button, Form, Input, message} from 'antd';
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';

import {fetchUserSuccess} from '../redux/actions';
import {LOGIN_API} from "../utils/api";

const LoginForm = ({formRef, toggle}) => {

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
            localStorage.setItem("token", res.data.token);
            navigate('/search');
        }).catch((err) => {
             message.error("Your username may not exist or your password is not correct.");
        })
    };

    return (
        <div className="authContainer">
            <span className="promptText">Welcome to movie search!</span>
            <Form onFinish={onFinish} ref={formRef}>
                <Form.Item
                    name="username"
                    rules={[{required: true,message: 'Please input your username!'}]}
                >
                    <Input className="inputField" size="large" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username"/>
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{required: true,message: 'Please input your password!'}]}
                >
                    <Input.Password className="inputField" size="large" prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password"/>
                </Form.Item>
                <div className="authButtonContainer">
                    <Form.Item >
                        <Button className="authButton"  type="primary" shape="round" size="large" htmlType="submit">Log In</Button>
                    </Form.Item>
                    <Form.Item >
                        <Button className="authButton" onClick={() => toggle(false)} type="primary" shape="round" size="large" >Sign Up</Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};

export default LoginForm;
