import { BrowserRouter, Routes, Route } from "react-router-dom";

import RegistrationForm from "./RegistrationForm";
import LoginForm from "./LoginForm";

export default function App() {

    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<RegistrationForm />}
                />

                <Route
                    path="/login"
                    element={<LoginForm />}
                />

            </Routes>

        </BrowserRouter>
    );
}




//import React from "react";
//import RegistrationForm from "./RegistrationForm";

//function App() {
//    return <RegistrationForm />;
//}

//export default App;
