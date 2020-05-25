import React from 'react';
import {useCurrentUser} from "./lib/api-hooks";
import {PageLoadingSpinner} from "./components/spinners";
import {LoginPage} from "./pages/LoginPage";

function App() {
    const {
        loading: userLoading,
        result: currentUser,
        error: loginError
    } = useCurrentUser(0);

    if (userLoading) {
        return <PageLoadingSpinner/>;
    }

    return (
        <>
            <LoginPage/>
        </>
    );
}

export default App;
