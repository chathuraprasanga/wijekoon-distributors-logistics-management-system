import { MantineTheme } from "@mantine/core";
import { notifications } from "@mantine/notifications";

export type TOS_NOTIFY_TYPE = "SUCCESS" | "ERROR" | "WARNING";

export const tosNotify = (title: string, message: string, type: TOS_NOTIFY_TYPE) => {
    let color = "gray";
    if (!message) {
        message = "Please contact system admin.";
    }
    
    switch (type) {
        case "ERROR":
            color = "red";
            break;
        case "SUCCESS":
            color = "green";
            break;
        case "WARNING":
            color = "orange";
            break;
    }

    notifications.show({
        title: title,
        message: message,
        autoClose: 5000,
        color: color
    });
};
