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
        error: "Error",
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
        useSSL: "Use SSL"
    },

    action: {
        submit: "Submit",
        resetPassword: "Reset password",
        createSecret: "Add New Secret",
        save: "Save",
        delete: "Delete",
    },

    alert: {
        loginFailed: {
            heading: "Login failed",
            description: "User with specified credentials was not found"
        }
    },

    placeholder: {
        appLoading: "Please wait a little bit",

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
    },

    error: {
      resource_not_found: "Requested resource not found",
    },

    notification: {
        secretCreated: "Secret has been created",
        secretUpdated: "Secret has been updated",
        secretDeleted: "Secret has been deleted",
    }
}
