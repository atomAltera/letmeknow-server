import React from "react"
import {useTranslation} from "react-i18next";
import {Button, Callout, FormGroup, H2, InputGroup, Switch} from "@blueprintjs/core";
import styled from "styled-components";
import {changeHandlers, intentFromError, translateErrors} from "../../lib/forms";
import {LoginFormErrors, LoginFormInput} from "../../lib/validations";

const Form = styled.form`
  padding: 1em 0;
`

const Heading = styled(H2)`
  margin: 1em 0;
`

export const Alert = styled(Callout)`
  margin: 1em 0;
`

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

interface Props {
    loading?: boolean;
    failed?: boolean;

    form: LoginFormInput;
    errors: LoginFormErrors;

    onChange: (form: LoginFormInput) => void;
    onSubmit: () => void;
}

export const LoginForm: React.FC<Props> = (props) => {
    const [t] = useTranslation();

    const errors = translateErrors(props.errors, t);

    const {
        textChange,
        booleanChange
    } = changeHandlers(props.form, props.onChange);

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        props.onSubmit();
    }

    return (
        <Form onSubmit={handleSubmit} >
            <Heading>{t('heading.login')}</Heading>

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
                    value={props.form.email ?? ""}
                    onChange={textChange("email")}
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
                    value={props.form.password ?? ""}
                    onChange={textChange("password")}
                    intent={intentFromError(errors, "password")}
                    autoComplete="current-password"
                    large
                />
            </FormGroup>

            <FormGroup>
                <Switch
                    label={t('field.rememberMe')}
                    disabled={props.loading}
                    checked={!!props.form.remember}
                    onChange={booleanChange("remember")}
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
