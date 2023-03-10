import useFetch from "./useFetch";

async function useBeneficiary() {
  return new Promise(async (resolve) => {
    let response = await useFetch("/api/product/all", "GET");
    resolve(response.message.data);
  });
}

export default useBeneficiary;
