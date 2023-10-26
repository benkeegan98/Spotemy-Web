import React, { useState, useEffect } from 'react';

export const useDesktopBreakpoints = () => {
    const [isDesktop, setIsDesktop] = useState<boolean>(typeof window !== "undefined" && window.innerWidth >= 1015);

    const handleWindowSizeChange = () => {
        if (typeof window !== "undefined") {
            setIsDesktop(window.innerWidth >= 1015)
        }
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    return isDesktop;

}