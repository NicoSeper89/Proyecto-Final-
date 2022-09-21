import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import dotenv from "dotenv";
import { Provider } from "react-redux";
import { ChakraProvider } from '@chakra-ui/react';
import store from "./redux/store/index";
import { BrowserRouter } from "react-router-dom";
import {Auth0Provider} from "@auth0/auth0-react"
dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001";
const domain = process.env.REACT_APP_AUTH0_DOMAIN 
const clienId = process.env.REACT_APP_AUTH0_CLIENT_ID

ReactDOM.render(
  <Auth0Provider domain={domain} clientId={clienId} redirectUri={window.location.origin}>
  <ChakraProvider>
    <Provider store={store}>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </Provider>
  </ChakraProvider>
  </Auth0Provider>
  ,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
