import { useState, useContext } from 'react';
import { MainContext } from "../contexts/mainProvider";
import apis from "./apis";

export function useFetchByLoad(params: any) {
    const { token } = useContext(MainContext)
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const fetch = async () => {
        try {
            setLoading(true);
            const response: any = await apis.getDataApi(params.url, params.query ? JSON.parse(params.query) : {}, token);
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