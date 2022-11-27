import { $host, $authHost } from "./index";

export const createType = async (type) => {
  const { data } = await $authHost.post("api/type", type);
  return data;
};

export const fetchTypes = async () => {
  const { data } = await $host.get("api/type");
  return data;
};

export const createBrand = async (brand) => {
  const { data } = await $authHost.post("api/brand", brand);
  return data;
};

export const fetchBrands = async () => {
  const { data } = await $host.get("api/brand");
  return data;
};

export const createShoes = async (shoes) => {
  const { data } = await $authHost.post("api/shoes", shoes);
  return data;
};

export const fetchShoes = async (typeId, brandId, page, limit = 5) => {
  const { data } = await $host.get("api/shoes", {
    params: {
      typeId,
      brandId,
      page,
      limit,
    },
  });
  return data;
};

export const fetchOneShoes = async (id) => {
  const { data } = await $host.get("api/shoes/" + id);
  return data;
};
