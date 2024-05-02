module.exports = {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        container: {
            center: true,
            padding: "1rem",
        },
        extend: {
            colors: {
                primary: "#5a00e6",
                secondary: "#2f54e9",
                tertiary: "#31e890",
                pink: "#e64980",
                black: "#000000",
                "gray-light": "#F9F9F9",
                success: "#52C41A",
                danger: "#FF4D4F",
                warning: "#FAAD14",
            },
        },
    },
    plugins: [],
    corePlugins: {
        preflight: false,
    },
};
