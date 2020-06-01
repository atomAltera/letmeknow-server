import React from "react"
import {useTranslation} from "react-i18next";
import {Button, FormGroup, InputGroup, Radio, RadioGroup, Switch} from "@blueprintjs/core";
import styled from "styled-components";
import {changeHandlers, intentFromError, translateErrors} from "../../lib/forms";
import {Secret_Errors, Secret_Form} from "../../lib/models/secret";

const Form = styled.form`
  padding: 1em 0;
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

    values: Partial<Secret_Form>;
    errors: Secret_Errors;

    onChange: (form: Partial<Secret_Form>) => void;
    onSubmit: () => void;
    onDelete?: () => void;
}

export const SecretForm: React.FC<Props> = (props) => {
    const [t] = useTranslation();

    const errors = translateErrors(props.errors, t);

    const {
        textChange,
        numberChange,
        booleanChange
    } = changeHandlers(props.values, props.onChange);

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        props.onSubmit();
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup
                intent={intentFromError(errors, "kind")}
                helperText={errors?.kind}
            >
                <RadioGroup
                    label={t('field.kind')}
                    selectedValue={props.values.kind}
                    disabled={props.loading}
                    onChange={textChange('kind') as any}
                >
                    <Radio label="Telegram" value="telegram"/>
                    <Radio label="Email" value="email"/>
                </RadioGroup>
            </FormGroup>

            <FormGroup
                intent={intentFromError(errors, "name")}
                helperText={errors?.name}
                label={t('field.name')}
            >
                <InputGroup
                    name="name"
                    type="text"
                    placeholder={t('field.name')}
                    leftIcon="id-number"
                    disabled={props.loading}
                    value={props.values.name ?? ""}
                    onChange={textChange("name")}
                    intent={intentFromError(errors, "name")}
                    autoComplete="off"
                    large
                />
            </FormGroup>

            {props.values.kind === "telegram" && (
                <>
                    <FormGroup
                        intent={intentFromError(errors, "botSecret")}
                        helperText={errors?.botSecret}
                        label={t('field.botSecret')}
                    >
                        <InputGroup
                            name="botSecret"
                            type="text"
                            placeholder={t('field.botSecret')}
                            leftIcon="key"
                            disabled={props.loading}
                            value={props.values.botSecret ?? ""}
                            onChange={textChange("botSecret")}
                            intent={intentFromError(errors, "botSecret")}
                            autoComplete="off"
                            large
                        />
                    </FormGroup>


                    <FormGroup
                        intent={intentFromError(errors, "chatId")}
                        helperText={errors?.chatId}
                        label={t('field.chatId')}
                    >
                        <InputGroup
                            name="chatId"
                            type="text"
                            placeholder={t('field.chatId')}
                            leftIcon="chat"
                            disabled={props.loading}
                            value={props.values.chatId ?? ""}
                            onChange={textChange("chatId")}
                            intent={intentFromError(errors, "chatId")}
                            autoComplete="off"
                            large
                        />
                    </FormGroup>
                </>
            )}

            {props.values.kind === "email" && (
                <>
                    <FormGroup
                        intent={intentFromError(errors, "host")}
                        helperText={errors?.host}
                        label={t('field.host')}
                    >
                        <InputGroup
                            name="host"
                            type="text"
                            placeholder={t('field.host')}
                            leftIcon="ip-address"
                            disabled={props.loading}
                            value={props.values.host ?? ""}
                            onChange={textChange("host")}
                            intent={intentFromError(errors, "host")}
                            autoComplete="off"
                            large
                        />
                    </FormGroup>

                    <FormGroup
                        intent={intentFromError(errors, "port")}
                        helperText={errors?.port}
                        label={t('field.port')}
                    >
                        <InputGroup
                            name="port"
                            type="number"
                            placeholder={t('field.port')}
                            leftIcon="console"
                            disabled={props.loading}
                            value={String(props.values.port ?? "")}
                            onChange={numberChange("port")}
                            intent={intentFromError(errors, "port")}
                            autoComplete="off"
                            large
                        />
                    </FormGroup>

                    <FormGroup
                        intent={intentFromError(errors, "username")}
                        helperText={errors?.username}
                        label={t('field.username')}
                    >
                        <InputGroup
                            name="username"
                            type="text"
                            placeholder={t('field.username')}
                            leftIcon="user"
                            disabled={props.loading}
                            value={props.values.username ?? ""}
                            onChange={textChange("username")}
                            intent={intentFromError(errors, "username")}
                            autoComplete="off"
                            large
                        />
                    </FormGroup>

                    <FormGroup
                        intent={intentFromError(errors, "password")}
                        helperText={errors?.password}
                        label={t('field.password')}
                    >
                        <InputGroup
                            name="password"
                            type="text"
                            placeholder={t('field.password')}
                            leftIcon="lock"
                            disabled={props.loading}
                            value={props.values.password ?? ""}
                            onChange={textChange("password")}
                            intent={intentFromError(errors, "password")}
                            autoComplete="off"
                            large
                        />
                    </FormGroup>

                    <FormGroup>
                        <Switch
                            label={t('field.useTLS')}
                            disabled={props.loading}
                            checked={!!props.values.useTLS}
                            onChange={booleanChange("useTLS")}
                            large
                        />

                        <Switch
                            label={t('field.useSSL')}
                            disabled={props.loading}
                            checked={!!props.values.useSSL}
                            onChange={booleanChange("useSSL")}
                            large
                        />
                    </FormGroup>
                </>
            )}


            <Actions>
                <Button
                    intent="primary"
                    text={t('action.save')}
                    icon="floppy-disk"
                    loading={props.loading}
                    type="submit"
                    large
                />

                {props.onDelete && (
                    <Button
                        intent="danger"
                        text={t('action.delete')}
                        icon="trash"
                        disabled={props.loading}
                        onClick={props.onDelete}
                        outlined
                        large
                    />
                )}

            </Actions>

        </Form>
    )
}
