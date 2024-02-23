import { useState } from 'react';
import apis from "./apis";

export function useDelete() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const remove = async (url: any, body: any) => {
        try {
            setLoading(true);
            const response: any = await apis.deleteDataApi(url, body);
            if (response) {
                setData(response);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };
    return { remove, data, loading };
}