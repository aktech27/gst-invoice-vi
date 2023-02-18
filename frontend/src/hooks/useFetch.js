const useFetch = (URL, METHOD, DATA, HEADER) => {
  return new Promise(async (resolve) => {
    const response = await fetch(URL, {
      method: METHOD,
      headers: {
        "Content-Type": "application/json",
        ...HEADER,
      },
      body: JSON.stringify(DATA),
    });
    const message = await response.json();
    resolve({ ok: response.ok, message });
  });
};

export default useFetch;
