import React from "react";

import {BrowserRouter, Route, Routes} from "react-router-dom";

import LoginPage from "./routes/login";
import SignUpPage from "./routes/signup";
import SearchPage from "./routes/search";

export default function Router() {
    return (
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/signup/" element={<SignUpPage />} />
              <Route path="/search/" element={<SearchPage />} />
          </Routes>
      </BrowserRouter>
    )
}