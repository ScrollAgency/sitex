const ButtonAppleMeta = {
    name: "ButtonApple",
    section: "Scroll Jam",
    displayName: "Button Apple",
    description: "Apple Button used in Job Around Me project",
    thumbnailUrl: "https://static1.plasmic.app/insertables/button.svg",
    props: {
        label: {
            type: "string",
            defaultValue: "Sign in with Apple",
            description: "Text displayed inside the button",
        },
        icon: {
            type: "choice",
            options: ["start", "end", "only", "none"],
            defaultValue: "none",
            description: "Position of the icon in the button",
        },
        destructive: {
            type: "boolean",
            defaultValue: false,
            description: "Whether the button is styled as a destructive action",
        },
        hierarchy: {
            type: "choice",
            options: ["primary", "secondary"],
            defaultValue: "primary",
            description: "The visual hierarchy of the button",
        },
        size: {
            type: "choice",
            options: ["small", "large"],
            defaultValue: "large",
            description: "Size of the button",
        },
        state: {
            type: "choice",
            options: ["default", "hover", "focused", "disabled"],
            defaultValue: "default",
            description: "The current state of the button",
        },
        iconImage: {
            type: "string",
            defaultValue: "/apple-icon.svg",
            description: "Path to the icon image used in the button",
        },
        className: {
            type: "string",
            description: "Additional CSS classes for custom styling",
        },
        onClick: {
            type: "eventHandler",
            description: "Function triggered when the button is clicked",
        },
    },
    importPath: "./components/forms/ButtonApple/ButtonApple",
};

export default ButtonAppleMeta;
