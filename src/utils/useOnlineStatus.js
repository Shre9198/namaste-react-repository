import { useState, useEffect } from "react";

const useOnlineStatus = () => {
    const [onlineStatus, setOnlineStatus] = useState(navigator.onLine);

    // check if online
    useEffect(() => {
        const handleOffline = () => {
            setOnlineStatus(false);
        };

        const handleOnline = () => {
            setOnlineStatus(true);
        };

        window.addEventListener("offline", handleOffline);
        window.addEventListener("online", handleOnline);

        // Cleanup event listeners
        return () => {
            window.removeEventListener("offline", handleOffline);
            window.removeEventListener("online", handleOnline);
        };
    }, []);

    return onlineStatus;
};
export default useOnlineStatus;