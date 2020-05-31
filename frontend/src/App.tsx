import React, {Suspense} from 'react';
import {BrowserRouter, Route, Router, Switch} from "react-router-dom"
import {useCurrentUser} from "./lib/api-hooks";
import {PageLoadingSpinner} from "./components/spinners";
import {Main, SidebarLayout} from "./components/layout";
import {MainSidebar} from "./components/MainSidebar";
import {NotFoundErrorView} from "./components/error-views"

const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const SecretsPage = React.lazy(() => import("./pages/SecretsPage"));
const SecretCreatePage = React.lazy(() => import("./pages/SecretCreatePage"));
const SecretEditPage = React.lazy(() => import("./pages/SecretEditPage"));
const EventsPage = React.lazy(() => import("./pages/EventsPage"));

function App() {
    const {
        loading: userLoading,
        result: currentUser,
    } = useCurrentUser({def: undefined});

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

                            <Route path={'/secrets'} exact><SecretsPage/></Route>
                            <Route path={'/secrets/new'} exact><SecretCreatePage/></Route>
                            <Route path={'/secrets/:secretId'} exact><SecretEditPage/></Route>

                            <Route path={'/events'} exact><EventsPage/></Route>

                            <Route path={'/events'} exact><EventsPage/></Route>

                            {/* 404 page */}
                            <Route><NotFoundErrorView/></Route>
                        </Switch>
                    </Suspense>

                </Main>
            </SidebarLayout>

        </BrowserRouter>
    );
}

export default App;
