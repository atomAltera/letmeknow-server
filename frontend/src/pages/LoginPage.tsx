import React, {useState} from "react"
import {useTranslation} from "react-i18next";
import {SmallColumn} from "../components/layout";
import {LoginForm} from "../components/forms/LoginForm";
import {login} from "../lib/api-client";
import {Login_Errors, Login_Form, loginSchema} from "../lib/models/login";
import {Heading} from "../components/Heading";


export const LoginPage: React.FC = () => {
    const [t] = useTranslation();

    const [loginForm, setLoginForm] = useState<Partial<Login_Form>>({})
    const [loginErrors, setLoginErrors] = useState<Login_Errors>()
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
            <Heading>{t('heading.login')}</Heading>

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
