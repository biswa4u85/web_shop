import { useState } from 'react';
import apis from "./apis";

export function usePatch() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const edit = async (url: any, body: any) => {
        try {
            setLoading(true);
            const response: any = await apis.editDataApi(url, body);
            if (!response?.error) {
                setData(response);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };
    return { edit, data, loading };
}