import React from "react"
import {useTranslation} from "react-i18next";
import {Button, FormGroup, MenuItem, Switch} from "@blueprintjs/core";
import {ItemRenderer, Select} from "@blueprintjs/select";
import styled from "styled-components";
import MonacoEditor from 'react-monaco-editor';
import {changeHandlers, intentFromError, translateErrors} from "../../lib/forms";
import {Channel_Errors, Channel_Form} from "../../lib/models/event";
import {Box} from "../Box";
import {Secret} from "../../lib/models/secret";

const SecretSelect = Select.ofType<Secret>();

interface Props {
    loading?: boolean;

    secretsList: Secret[];

    values: Partial<Channel_Form>;
    errors: Channel_Errors;

    onChange: (form: Partial<Channel_Form>) => void;
    onDelete: () => void;
}

const Footer = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
`

const renderSecret: ItemRenderer<Secret> = (secret, {modifiers, handleClick}) => {
    return (
        <MenuItem
            active={modifiers.active}
            key={secret.id}
            label={secret.kind}
            onClick={handleClick}
            text={secret.name}
        />
    )
}

export const ChannelSubForm: React.FC<Props> = (props) => {
    const [t] = useTranslation();

    const errors = translateErrors(props.errors, t);

    const {
        booleanInputChange,
        modelChange,
        valueChange,
    } = changeHandlers(props.values, props.onChange);

    return (
        <Box>

            <FormGroup
                intent={intentFromError(errors, "secretId")}
                helperText={errors?.secretId}
            >
                <SecretSelect
                    items={props.secretsList}
                    disabled={props.loading}
                    onItemSelect={modelChange("secretId")}
                    itemRenderer={renderSecret}
                    popoverProps={{minimal: true}}
                    filterable={false}
                >
                    <Button
                        rightIcon="double-caret-vertical"
                    >
                        {props.secretsList.find(s => s.id === props.values.secretId)?.name || t('placeholder.selectSecret')}
                    </Button>
                </SecretSelect>

            </FormGroup>

            <FormGroup
                intent={intentFromError(errors, "template")}
                helperText={errors?.template}
            >
                {/*<TextArea*/}
                {/*    name="template"*/}
                {/*    placeholder={t('field.template')}*/}
                {/*    disabled={props.loading}*/}
                {/*    value={props.values.template ?? ""}*/}
                {/*    onChange={textInputChange("template")}*/}
                {/*    intent={intentFromError(errors, "template")}*/}
                {/*    autoComplete="off"*/}
                {/*    rows={5}*/}
                {/*    fill*/}
                {/*    large*/}
                {/*/>*/}

                <MonacoEditor
                    height={200}
                    language="handlebars"
                    theme="vs-light"
                    value={props.values.template ?? ""}
                    options={{
                        minimap: {enabled: false},
                    }}
                    onChange={valueChange("template")}
                />
            </FormGroup>


            <Footer>
                <FormGroup>
                    <Switch
                        label={t('field.isActive')}
                        disabled={props.loading}
                        checked={!!props.values.isActive}
                        onChange={booleanInputChange("isActive")}
                        large
                    />
                </FormGroup>


                <Button
                    intent="danger"
                    icon="trash"
                    outlined
                    onClick={props.onDelete}
                >{t('action.delete')}</Button>
            </Footer>
        </Box>
    )
}
