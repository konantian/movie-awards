import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/reset.css';
import reportWebVitals from './reportWebVitals';
import makeStore from './redux/store';
import Router from './router';
import { Provider} from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';

const object = makeStore();

const rootElement = document.getElementById("root");
ReactDOM.render(
    <Provider store={object.store}>
        <PersistGate loading={null} persistor={object.persistor}>
            <Router />
        </PersistGate>
    </Provider>,
    rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
