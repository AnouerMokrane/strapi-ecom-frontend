import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IUser } from "@/types";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

const getJWT = () => {
  return localStorage.getItem("jwt");
};

apiClient.interceptors.request.use(
  (config) => {
    if (
      config.url?.includes("/products") ||
      config.url?.includes("/categories") ||
      config.url?.includes("/sizes") ||
      config.url?.includes("/colors")
    ) {
      config.headers.Authorization = `Bearer ${API_TOKEN}`;
    } else {
      const jwt = getJWT();
      if (jwt) {
        config.headers.Authorization = `Bearer ${jwt}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default apiClient;

export const fetchData = async (endpoint: string) => {
  try {
    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error) {
    console.error("Error fetcing data: ", error);
    throw error;
  }
};

const fetchProducts = async (query: string = "/products?populate=*") => {
  return fetchData(query);
};

const fetchProduct = async (slug: string) => {
  return fetchData(`/products?populate=*&filters[title][$eq]=${slug}`);
};

export const useGetData = (key: string, endpoint: string) => {
  return useQuery({
    queryKey: [key],
    queryFn: () => fetchData(endpoint),
  });
};
export const useGetCategories = () => useGetData("categories", "/categories");
export const useGetColors = () => useGetData("colors", "/colors");
export const useGetSizes = () => useGetData("sizes", "/sizes");

export const useGetProducts = (filter: string) => {
  return useQuery({
    queryKey: ["products", filter],
    queryFn: () => fetchProducts(filter),
    enabled: !!filter,
  });
};

export const useGetProduct = (slug: string) => {
  return useQuery({
    queryKey: ["products", slug],
    queryFn: () => fetchProduct(slug),
  });
};

const signup = async (data: IUser) => {
  try {
    const response = await apiClient.post("/auth/local/register", data);
    const { jwt, userData } = response.data;
    localStorage.setItem("jwt", jwt);
    return { jwt, userData };
  } catch (error) {
    console.log(error);
  }
};

export const useSignup = () => {
  return useMutation({
    mutationKey: ["signup"],
    mutationFn: signup,
  });
};

const login = async (data: { identifier: string; password: string }) => {
  try {
    const response = await apiClient.post("/auth/local", data);
    return response.data;
  } catch (error) {
    throw new Error(
      "Login failed. Please check your credentials and try again."
    );
  }
};

export const useLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: login,
  });
};

const getWishlist = async (email: string) => {
  try {
    const response = await apiClient.get(
      `/wishlists?populate[product][populate]=images&filters[email]=${email}`
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const useGetWhishlist = (email: string) => {
  return useQuery({
    queryKey: ["wishlist"],
    queryFn: () => getWishlist(email),
    enabled: !!email,
  });
};

export const addToWishlist = async (payload: {
  data: {
    username: string | undefined;
    email: string | undefined;
    product: number;
  };
}) => {
  try {
    const response = await apiClient.post("/wishlists", payload);
    return response.status;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const useAddWishlist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addToWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });
};

export const removeWishlist = async (id: number) => {
  return apiClient.delete(`wishlists/${id}`);
};

export const useDeleteWishlist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });
};
