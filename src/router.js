import {BrowserRouter, Route, Routes} from "react-router-dom";

import {MainPage, SearchPage} from "./routes";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/search/" element={<SearchPage />} />
            </Routes>
      </BrowserRouter>
    )
}