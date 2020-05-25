import React, {useState} from "react"
import {SmallColumns} from "../components/columns";
import {LoginForm} from "./loginPage/LoginForm";
import {LoginFormErrors, LoginFormInput, loginFormSchema} from "../lib/validations";
import {postLogin} from "../lib/api-client";


export const LoginPage: React.FC = () => {
    const [loginForm, setLoginForm] = useState<LoginFormInput>({})
    const [loginErrors, setLoginErrors] = useState<LoginFormErrors>()
    const [loginLoading, setLoginLoading] = useState(false)
    const [loginFailed, setLoginFailed] = useState(false)

    const handleSubmit = async () => {
        setLoginFailed(false);
        setLoginErrors(undefined);

        const report = loginFormSchema(loginForm);
        if (!report.ok) {
            setLoginErrors(report.error);
            return;
        }

        setLoginLoading(true);

        const {email, password, remember} = report.output;

        try {
            await postLogin(email, password, remember)

            window.location.reload();
        } catch (e) {
            setLoginLoading(false);
            setLoginFailed(true);
        }
    }

    return (
        <SmallColumns>
            <LoginForm
                loading={loginLoading}
                failed={loginFailed}

                form={loginForm}
                errors={loginErrors}

                onChange={setLoginForm}
                onSubmit={handleSubmit}
            />
        </SmallColumns>
    )
}


