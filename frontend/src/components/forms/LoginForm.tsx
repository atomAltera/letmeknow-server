import React from "react"
import {useTranslation} from "react-i18next";
import {Button, Callout, FormGroup, InputGroup, Switch} from "@blueprintjs/core";
import styled from "styled-components";
import {changeHandlers, intentFromError, translateErrors} from "../../lib/forms";
import {Login_Errors, Login_Form} from "../../lib/models/login";

const Form = styled.form`
  padding: 1em 0;
`

export const Alert = styled(Callout)`
  margin: 1em 0;
`

const Actions = styled.div`
  margin-top: 3em;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

interface Props {
    loading?: boolean;
    failed?: boolean;

    values: Partial<Login_Form>;
    errors: Login_Errors;

    onChange: (form: Partial<Login_Form>) => void;
    onSubmit: () => void;
}

export const LoginForm: React.FC<Props> = (props) => {
    const [t] = useTranslation();

    const errors = translateErrors(props.errors, t);

    const {
        textInputChange,
        booleanInputChange
    } = changeHandlers(props.values, props.onChange);

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        props.onSubmit();
    }

    return (
        <Form onSubmit={handleSubmit}>
            {props.failed && (
                <Alert
                    title={t('alert.loginFailed.heading')}
                    intent="danger"
                >
                    <p>{t('alert.loginFailed.description')}</p>
                </Alert>
            )}

            <FormGroup
                intent={intentFromError(errors, "email")}
                helperText={errors?.email}
            >
                <InputGroup
                    name="email"
                    type="email"
                    placeholder={t('field.email')}
                    leftIcon="envelope"
                    disabled={props.loading}
                    value={props.values.email ?? ""}
                    onChange={textInputChange("email")}
                    intent={intentFromError(errors, "email")}
                    autoComplete="email"
                    large
                />
            </FormGroup>

            <FormGroup
                intent={intentFromError(errors, "password")}
                helperText={errors?.password}
            >
                <InputGroup
                    name="password"
                    type="password"
                    placeholder={t('field.password')}
                    leftIcon="lock"
                    disabled={props.loading}
                    value={props.values.password ?? ""}
                    onChange={textInputChange("password")}
                    intent={intentFromError(errors, "password")}
                    autoComplete="current-password"
                    large
                />
            </FormGroup>

            <FormGroup>
                <Switch
                    label={t('field.rememberMe')}
                    disabled={props.loading}
                    checked={!!props.values.remember}
                    onChange={booleanInputChange("remember")}
                    large
                />
            </FormGroup>

            <Actions>
                <Button
                    intent="primary"
                    text={t('action.submit')}
                    loading={props.loading}
                    type="submit"
                    large
                />

                <a href="#">
                    {t('action.resetPassword')}
                </a>

            </Actions>

        </Form>
    )
}
