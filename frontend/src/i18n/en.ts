export default {
    menu: {
        events: "Events",
        secrets: "Secrets",
    },

    heading: {
        login: "Login",
        secrets: "Secrets",
        secretEdit: "Edit Secret",
        secretCreate: "Add New Secret",
        events: "Events",
        eventEdit: "Edit Event",
        eventCreate: "Add New Event",
        error: "Error",
        channel: "Channel #{{number}}"
    },

    field: {
        email: "Email",
        password: "Password",
        rememberMe: "Remember me",
        kind: "Kind",
        name: "Name",
        botSecret: "Bot Secret Key",
        chatId: "Chat ID",
        host: "Host",
        port: "Port",
        username: "Username",
        useTLS: "Use TLS",
        useSSL: "Use SSL",
        key: "Reference Key",
        isActive: "Is Active",
        template: "Template",
        secret: "Secret",
        description: "Description",
        channels: "Channels",
        mailFrom: "Mail From Address",
        mailTo: "Mail To Address",
    },

    action: {
        submit: "Submit",
        resetPassword: "Reset password",
        createSecret: "Add New Secret",
        createEvent: "Add New Event",
        save: "Save",
        delete: "Delete",
        addChannel: "Add Channel",
    },

    alert: {
        loginFailed: {
            heading: "Login failed",
            description: "User with specified credentials was not found"
        }
    },

    placeholder: {
        appLoading: "Please wait a little bit",
        selectSecret: "Select Secret",

        noSecrets: {
            title: "No secrets",
        },

        noEvents: {
            title: "No events",
        }
    },

    validation: {
        "not_a_string": "This field is required",
        "required": "This field is required",
        "invalid_choice": "Please select one of options",
        "not_a_number": "Please enter a number",
        "invalid_port_number": "Invalid port number",
        "no_channels_provided": "Please add at least one channel",
        "not_valid_key": "Invalid value, only latin letter in lower case, digits and underscore are allowed",
    },

    error: {
      resource_not_found: "Requested resource not found",
    },

    notification: {
        testCallMade: "Test call has been made",

        eventCreated: "Event has been created",
        eventUpdated: "Event has been updated",
        eventDeleted: "Event has been deleted",

        secretCreated: "Secret has been created",
        secretUpdated: "Secret has been updated",
        secretDeleted: "Secret has been deleted",
    }
}
