import { useState, useEffect } from 'react';
import apis from "./apis";

export function useFetch(params: any) {
    const [data, setData] = useState<any>({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const response: any = await apis.getDataApi(params.url, params.query ? JSON.parse(params.query) : {});
            if (!response?.error) {
                setData(response);
            }
            setLoading(false);
        };
        fetchData();
    }, [params.query]);

    return { data, loading };
}