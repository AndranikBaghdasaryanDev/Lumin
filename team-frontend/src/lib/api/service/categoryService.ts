import type { CategoriesResponse } from "../../../types/course";
import { Axios } from "../axios";

export const categoryService = {
    getCategories: async (): Promise<CategoriesResponse> => {
        console.log("Making request to /api/categories");
        const response = await Axios.get("/api/categories");
        console.log("Categories response:", response.data);
        return response.data;
    }
}
