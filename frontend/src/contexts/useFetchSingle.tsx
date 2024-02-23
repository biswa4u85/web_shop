import { useState, useEffect } from 'react';
import apis from "./apis";

export function useFetchSingle(params: any) {
    const [data, setData] = useState<any>({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const response: any = await apis.getDataApi(params.url, params.query);
            if (!response?.error) {
                setData(response?.data ? response?.data[0] : {});
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    return { data, loading };
}