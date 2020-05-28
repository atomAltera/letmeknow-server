import React, {useState} from "react"
import {SmallColumn} from "../components/layout";
import {LoginForm} from "./loginPage/LoginForm";
import {login} from "../lib/api-client";
import {Login_CreateErrors, Login_CreateForm, loginSchema} from "../lib/models/login";


export const LoginPage: React.FC = () => {
    const [loginForm, setLoginForm] = useState<Partial<Login_CreateForm>>({})
    const [loginErrors, setLoginErrors] = useState<Login_CreateErrors>()
    const [loginLoading, setLoginLoading] = useState(false)
    const [loginFailed, setLoginFailed] = useState(false)

    const handleSubmit = async () => {
        setLoginFailed(false);
        setLoginErrors(undefined);

        const report = loginSchema(loginForm);
        if (!report.ok) {
            setLoginErrors(report.error);
            return;
        }

        setLoginLoading(true);

        try {
            await login(report.output)

            window.location.reload();
        } catch (e) {
            setLoginLoading(false);
            setLoginFailed(true);
        }
    }

    return (
        <SmallColumn>
            <LoginForm
                loading={loginLoading}
                failed={loginFailed}

                values={loginForm}
                errors={loginErrors}

                onChange={setLoginForm}
                onSubmit={handleSubmit}
            />
        </SmallColumn>
    )
}

export default LoginPage;
