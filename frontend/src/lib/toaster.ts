import {Toaster} from "@blueprintjs/core";


const toaster =  Toaster.create({position: "bottom",})

export function notifySuccess(message: string) {
    toaster.show({message, intent: "success"})
}

export function notifyWarning(message: string) {
    toaster.show({message, intent: "warning"})
}
