import { useRef, useState, useEffect } from 'react';

/** Custom hook for managing "flash" messages.
 *
 * This adds an item in state, `active`, which can be controlled by the
 * component as desired. The component would typically `setActive(true)`
 * to start displaying the message, and after `timeInMsec`, active would
 * go back to false, which would typically stop showing the message.
 *
 */ 

export default function useTimedMessage(timeInMsec = 3000) {
    const [active, setActive] = useState(false);

    const messageShownRef = useRef(false);

    useEffect(
        function showSavedMessage() {
            if(active && !messageShownRef.current) {
                messageShownRef.current = true;
                setTimeout(function removeMessage() {
                    setActive(false);
                    messageShownRef.current = false;
                }, timeInMsec);
            }
        }, [active, timeInMsec]
    );

    return [active, setActive];
}
