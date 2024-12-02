import { useCallback, useEffect, useState } from "react";

export const infoOT = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const urlApi = "{URL}";
  const user = "user";
  const pass = "@user";
  const base64Credentials = btoa(`${user}:${pass}`);

  const headers = new Headers();
  headers.append("Authorization", `Basic ${base64Credentials}`);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(urlApi, { headers, method: "GET" });
      const { resp } = await res.json();
      setData(resp);
    } catch (error) {
      setError(error.message);
      setData([]); // Puedes establecer un valor predeterminado en caso de error
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchData();
    const fetchDataInterval = setInterval(() => {
      fetchData();
    }, 600000);
    return () => clearInterval(fetchDataInterval);
  }, []);
  return { data, loading, error };
};
export const infoOTDPF = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const urlApi = "{URL}";
  const user = "analyze";
  const pass = "@analyze";
  const base64Credentials = btoa(`${user}:${pass}`);

  const headers = new Headers();
  headers.append("Authorization", `Basic ${base64Credentials}`);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(urlApi, { headers, method: "GET" });
      const { resp } = await res.json();
      setData(resp);
    } catch (error) {
      setError(error.message);
      setData([]); // Puedes establecer un valor predeterminado en caso de error
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchData();
    const fetchDataInterval = setInterval(() => {
      fetchData();
    }, 600000);
    return () => clearInterval(fetchDataInterval);
  }, []);
  return { data, loading, error };
};
export const infoOTGarantia = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const urlApi = "{URL}";
  const user = "analyze";
  const pass = "@analyze";
  const base64Credentials = btoa(`${user}:${pass}`);

  const headers = new Headers();
  headers.append("Authorization", `Basic ${base64Credentials}`);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(urlApi, { headers, method: "GET" });
      const { resp } = await res.json();
      setData(resp);
    } catch (error) {
      setError(error.message);
      setData([]); // Puedes establecer un valor predeterminado en caso de error
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchData();
    const fetchDataInterval = setInterval(() => {
      fetchData();
    }, 600000);
    return () => clearInterval(fetchDataInterval);
  }, []);
  return { data, loading, error };
};
export const infoOTTurbo = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const urlApi = "{URL}";
  const user = "analyze";
  const pass = "@analyze";
  const base64Credentials = btoa(`${user}:${pass}`);

  const headers = new Headers();
  headers.append("Authorization", `Basic ${base64Credentials}`);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(urlApi, { headers, method: "GET" });
      const { resp } = await res.json();
      setData(resp);
    } catch (error) {
      setError(error.message);
      setData([]); // Puedes establecer un valor predeterminado en caso de error
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchData();
    const fetchDataInterval = setInterval(() => {
      fetchData();
    }, 600000);
    return () => clearInterval(fetchDataInterval);
  }, []);
  return { data, loading, error };
};
export const infoOTVehicular = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const urlApi = "{URL}";
  const user = "analyze";
  const pass = "@analyze";
  const base64Credentials = btoa(`${user}:${pass}`);

  const headers = new Headers();
  headers.append("Authorization", `Basic ${base64Credentials}`);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(urlApi, { headers, method: "GET" });
      const { resp } = await res.json();
      setData(resp);
    } catch (error) {
      setError(error.message);
      setData([]); // Puedes establecer un valor predeterminado en caso de error
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchData();
    const fetchDataInterval = setInterval(() => {
      fetchData();
    }, 600000);
    return () => clearInterval(fetchDataInterval);
  }, []);
  return { data, loading, error };
};
