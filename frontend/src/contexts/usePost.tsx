import { useState } from 'react';
import apis from "./apis";

export function usePost() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const create = async (url: any, body: any) => {
        try {
            setLoading(true);
            const response: any = await apis.addDataApi(url, body);
            if (!response?.error) {
                setData(response);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };
    return { create, data, loading };
}