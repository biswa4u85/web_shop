import { useState } from 'react';
import apis from "./apis";

export function useFetchByLoad(params: any) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const fetch = async () => {
        try {
            setLoading(true);
            const response: any = await apis.getDataApi(params.url, params.query ? JSON.parse(params.query) : {});
            if (response) {
                setData(response);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };
    return { fetch, data, loading };
}