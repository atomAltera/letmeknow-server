import React from "react"
import {useTranslation} from "react-i18next";
import {append, assoc, remove} from "ramda";
import {Button, ControlGroup, FormGroup, H3, InputGroup, Switch, TextArea} from "@blueprintjs/core";
import styled from "styled-components";
import {changeHandlers, intentFromError, translateErrors} from "../../lib/forms";
import {Channel_Errors, Channel_Form, Event_Errors, Event_Form} from "../../lib/models/event";
import {ChannelSubForm} from "./ChannelSubForm";
import {Secret} from "../../lib/models/secret";

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

    secretsList: Secret[];

    values: Partial<Event_Form>;
    errors: Event_Errors;

    onChange: (form: Partial<Event_Form>) => void;
    onSubmit: () => void;
    onDelete?: () => void;
}

export const EventForm: React.FC<Props> = (props) => {
    const [t] = useTranslation();

    const errors = translateErrors(props.errors, t);

    const {
        textChange,
        booleanChange,
        arrayItemChange,
    } = changeHandlers(props.values, props.onChange);

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        props.onSubmit();
    }

    const addNewChannel = () => {
        const newChannel: Partial<Channel_Form> = {
            secretId: undefined,
            template: "",
            isActive: true
        }

        const newChannels = append(newChannel, props.values.channels ?? []);

        props.onChange(assoc("channels", newChannels, props.values));
    }

    const deleteChannel = (index: number) => {
        const newChannels = remove(index, 1, props.values.channels ?? []);

        props.onChange(assoc("channels", newChannels, props.values));
    }

    const handleGenerateKeyClick = () => {
        const name = props.values.name || "";

        const a = name.trim()
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9_-]+/g, '')

        const b = Math.round(
                Date.now() *
                JSON.stringify(props.values).length *
                Math.random() * 91921232861
            ) % 34246711271


        const key =  (a.length > 0) ? `${a}-${b}` : String(b * 718579);

        props.onChange(assoc('key', key, props.values))
    }

    return (
        <Form onSubmit={handleSubmit}>

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


            <FormGroup
                intent={intentFromError(errors, "key")}
                helperText={errors?.key}
                label={t('field.key')}
            >

                <ControlGroup fill>
                    <InputGroup
                        name="key"
                        type="text"
                        placeholder={t('field.key')}
                        leftIcon="key"
                        disabled={props.loading}
                        value={props.values.key ?? ""}
                        onChange={textChange("key")}
                        intent={intentFromError(errors, "key")}
                        autoComplete="off"
                        large
                    />

                    <Button
                        icon="more"
                        onClick={handleGenerateKeyClick}
                    />

                </ControlGroup>
            </FormGroup>


            <FormGroup
                intent={intentFromError(errors, "description")}
                helperText={errors?.description}
                label={t('field.description')}
            >
                <TextArea
                    name="description"
                    placeholder={t('field.description')}
                    disabled={props.loading}
                    value={props.values.description ?? ""}
                    onChange={textChange("description")}
                    intent={intentFromError(errors, "description")}
                    autoComplete="off"
                    rows={5}
                    fill
                    large
                />
            </FormGroup>

            <FormGroup>
                <Switch
                    label={t('field.isActive')}
                    disabled={props.loading}
                    checked={!!props.values.isActive}
                    onChange={booleanChange("isActive")}
                    large
                />
            </FormGroup>

            <FormGroup
                intent={intentFromError(errors, "channels")}
                helperText={typeof errors?.channels === "string" ? errors.channels : undefined}
            >
                <H3>{t('field.channels')}</H3>

                {(props.values.channels ?? []).map((channelForm, i) => {
                    let errors: Channel_Errors = undefined;

                    if (typeof props.errors?.channels === "object") {
                        errors = props.errors?.channels[i]
                    }

                    return (
                        <ChannelSubForm
                            key={i}
                            secretsList={props.secretsList}
                            values={channelForm}
                            errors={errors}
                            onChange={arrayItemChange("channels", i)}
                            onDelete={() => deleteChannel(i)}
                        />
                    )
                })}

                <Button
                    onClick={addNewChannel}
                    intent="primary"
                    icon="plus"
                >{t('action.addChannel')}</Button>

            </FormGroup>


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
