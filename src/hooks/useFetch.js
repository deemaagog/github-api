/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const BASE_URL = "https://api.github.com/users/";

export default (url) => {
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const reposResponse = await axios(
                `${BASE_URL}${url}`
            );
            setData(reposResponse.data);
            setError(null);
        } catch (err) {
            setError(err);
        } finally {
            window.setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    }, [url]);

    useEffect(() => {
        if (url) {
            fetchData();
        }
    }, [url, fetchData]);

    return { error, data, loading };
}
