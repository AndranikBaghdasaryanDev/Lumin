import type { CategoriesResponse } from "../../../types/course";
import { Axios } from "../axios";

export const categoryService = {
    getCategories: async (): Promise<CategoriesResponse> => {
        const response = await Axios.get("/api/categories");
        return response.data;
    }
}
