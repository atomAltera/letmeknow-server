import React, {Suspense} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom"
import {useCurrentUser} from "./lib/api-hooks";
import {PageLoadingSpinner} from "./components/spinners";
import {Main, SidebarLayout} from "./components/layout";
import {MainSidebar} from "./components/MainSidebar";

const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const SecretsPage = React.lazy(() => import("./pages/SecretsPage"));
const EventsPage = React.lazy(() => import("./pages/EventsPage"));

function App() {
    const {
        loading: userLoading,
        result: currentUser,
    } = useCurrentUser(0, undefined);

    if (userLoading) {
        return <PageLoadingSpinner/>;
    }

    if (!currentUser) {
        return (
            <Suspense fallback={PageLoadingSpinner}>
                <LoginPage/>
            </Suspense>
        )
    }

    return (

        <BrowserRouter>

            <SidebarLayout>
                <MainSidebar/>

                <Main>

                    <Suspense fallback={PageLoadingSpinner}>
                        <Switch>
                            <Route path={'/'} exact><EventsPage/></Route>
                            <Route path={'/events'} exact><EventsPage/></Route>
                            <Route path={'/secrets'} exact><SecretsPage/></Route>
                        </Switch>
                    </Suspense>

                </Main>
            </SidebarLayout>

        </BrowserRouter>
    );
}

export default App;
