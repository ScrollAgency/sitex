const JamTextInputMeta = {
    name: "JamTextInput",
    section: "Scroll Jam",
    displayName: "Jam Text input",
    description: "Text input used in Job Around Me project",
    thumbnailUrl: "https://static1.plasmic.app/insertables/input.svg",
    props: {
        type: {
            type: "choice",
            options: ["default", "leading text", "textarea", "password", "phone"],
            defaultValue: "default",
            description: "Type of the input field",
        },
        label: {
            type: "string",
            description: "Label for the input field",
        },
        placeholder: {
            type: "string",
            defaultValue: "placeholder",
            description: "Placeholder text for the input field",
        },
        hint: {
            type: "string",
            description: "Hint text displayed below the input field",
        },
        prefixedtext: {
            type: "string",
            description: "Text prefixed before user input",
        },
        destructive: {
            type: "boolean",
            defaultValue: false,
            description: "Applies error styling when true",
        },
        disabled: {
            type: "boolean",
            defaultValue: false,
            description: "Disables the input field when true",
        },
        iconUrl: {
            type: "string",
            description: "URL of the icon displayed inside the input field",
        },
        className: {
            type: "string",
            description: "Additional CSS classes for customization",
        },
        text: {
            type: "string",
            defaultValue: "",
            description: "Default text value of the input field",
        },
        onTextChange: {
            type: "function",
            description: "Callback function triggered when text changes",
        },
    },
    importPath: "./components/forms/JamTextInput/JamTextInput",
};

export default JamTextInputMeta;
