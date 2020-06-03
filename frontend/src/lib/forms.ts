import {assoc, curry, map, update} from "ramda"
import {TFunction} from "i18next";
import React from "react";
import {Intent} from "@blueprintjs/core";

export function changeHandlers<T>(obj: T | undefined, updateFunc: (newObj: T) => any) {

    const textInputChange = curry(
        (field: keyof T, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            updateFunc(assoc(field as string, e.target.value, obj))
        }
    );

    const numberInputChange = curry(
        (field: keyof T, e: React.ChangeEvent<HTMLInputElement>) => {
            let value: number | undefined = parseFloat(e.target.value.trim());

            if (isNaN(value)) value = undefined;

            updateFunc(assoc(field as string, value, obj))
        }
    );

    const booleanInputChange = curry(
        (field: keyof T, e: React.ChangeEvent<HTMLInputElement>) => {
            updateFunc(assoc(field as string, e.target.checked, obj))
        }
    );

    const modelChange = curry(
        <M extends { id: string }>(field: keyof T, model: M) => {
            updateFunc(assoc(field as string, model.id, obj))
        }
    );


    const valueChange = curry(
        <M extends any>(field: keyof T, value: M) => {
            updateFunc(assoc(field as string, value, obj))
        }
    );

    const arrayItemChange = curry(
        <V>(field: keyof T, index: number, value: V) => {
            let newArray: any[];

            if (!obj) {
                newArray = [value,]
            } else {
                const oldArray = obj[field] as any as any[];
                newArray = update(index, value, oldArray)
            }

            updateFunc(assoc(field as string, newArray, obj))
        }
    );

    return {
        textInputChange,
        numberInputChange,
        booleanInputChange,
        modelChange,
        valueChange,
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
