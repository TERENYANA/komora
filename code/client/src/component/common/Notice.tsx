import { useEffect, useState } from "react";

const Notice = () => {
    const [notice, setNotice] = useState<string | null>(null);  // Better type definition
    
    useEffect(() => {
        const message = window.sessionStorage.getItem("notice");
        if (message) {  // Only set and remove if message exists
            setNotice(message as string);
            window.sessionStorage.removeItem("notice");  // Fixed typo "notie" -> "notice"
        }
    }, []);  // Added empty dependency array since this should only run once on mount

    return notice ?
        <p>{notice}</p> : null;
};

export default Notice;