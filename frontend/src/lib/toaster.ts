import {Toaster} from "@blueprintjs/core";


const toaster =  Toaster.create({position: "top-right"})

export function notifySuccess(message: string) {
    toaster.show({message, intent: "success"})
}

export function notifyWarning(message: string) {
    toaster.show({message, intent: "warning"})
}

export function notifyError(message: string) {
    toaster.show({message, intent: "danger"})
}
