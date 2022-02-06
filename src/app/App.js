import React from "react";
import NavBar from "./components/ui/navBar";
import Users from "./layouts/users";
import { Switch, Route, Redirect } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualityProvider } from "./hooks/useQuality";

function App() {
    return (
        <>
            <NavBar />
            <Switch>
                <ProfessionProvider>
                    <QualityProvider>
                        <Route
                            path="/users/:userId?/:edit?"
                            component={Users}
                        />
                        <Route path="/login/:type?" component={Login} />
                    </QualityProvider>
                </ProfessionProvider>

                <Route path="/" exact component={Main} />
                <Redirect to="/" />
            </Switch>
            <ToastContainer />
        </>
    );
}
export default App;
