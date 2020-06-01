import {assoc, map, update} from "ramda"
import {TFunction} from "i18next";
import React from "react";
import {Intent} from "@blueprintjs/core";

export function changeHandlers<T>(obj: T | undefined, updateFunc: (newObj: T) => any) {
    const textChange = (field: keyof T) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            updateFunc(assoc(field as string, e.target.value, obj))
        }

    const numberChange = (field: keyof T) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            let value: number | undefined = parseFloat(e.target.value.trim());

            if (isNaN(value)) value = undefined;

            updateFunc(assoc(field as string, value, obj))
        }

    const booleanChange = (field: keyof T) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            updateFunc(assoc(field as string, e.target.checked, obj))
        }

    const modelChange = <M extends { id: string }>(field: keyof T) =>
        (model: M) => updateFunc(assoc(field as string, model.id, obj))


    const arrayItemChange = <V>(field: keyof T, index: number) =>
        (value: V) => {

            let newArray: any[];

            if (!obj) {
                newArray = [value,]
            } else {
                const oldArray = obj[field] as any as any[];
                newArray = update(index, value, oldArray)
            }

            updateFunc(assoc(field as string, newArray, obj))
        }

    return {
        textChange,
        numberChange,
        booleanChange,
        modelChange,
        arrayItemChange,
    }
}


export function translateErrors<T extends any>(errors: T, t: TFunction): T {
    if (typeof errors === "string") return t(`validation.${errors}`)

    if (errors === null || errors === undefined) return errors;

    if (typeof errors === "object") {
        return map(val => translateErrors(val, t), errors)
    }

    return errors;
}


export function intentFromError<T>(error: T | undefined, key: keyof T): Intent {
    if (error === undefined) return "none";

    return (error[key] === undefined) ? "none" : "danger";
}
