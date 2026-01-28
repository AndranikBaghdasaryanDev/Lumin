import type {ApiError} from "../../../../backend-team/src/types/api-responses/api"

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: ApiError;
}