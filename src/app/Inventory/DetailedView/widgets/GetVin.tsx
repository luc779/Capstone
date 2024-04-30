'use client'

import { useEffect, useState } from "react";

export default function GetVin() {
    const [content, setContent] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = () => {
            if (typeof window !== 'undefined') {
                const item = localStorage.getItem('DetailedView');
                setContent(item)
                console.log(item)
            }
        };
    
        fetchData();
      }, []);

    return {
        content
    }
}
