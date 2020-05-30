import {assoc, map} from "ramda"
import {TFunction} from "i18next";
import React from "react";
import {Intent} from "@blueprintjs/core";

export function changeHandlers<T>(obj: T | undefined, updateFunc: (newObj: T) => any) {
    const textChange = (field: keyof T) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            updateFunc(assoc(field as string, e.target.value, obj))
        }

    const numberChange = (field: keyof T) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const numberValue = parseFloat(e.target.value);
            updateFunc(assoc(field as string, numberValue, obj))
        }

    const booleanChange = (field: keyof T) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            updateFunc(assoc(field as string, e.target.checked, obj))
        }

    return {
        textChange,
        numberChange,
        booleanChange,
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
