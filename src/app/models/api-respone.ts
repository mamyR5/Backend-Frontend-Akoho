// src/app/models/api-response.ts
export interface ApiData<T> {
    count: number;
    list: T[];
}

export interface ApiResponse<T> {
    status: 'success' | 'error';
    data: ApiData<T>;
    error: {
        code: string;
        message: string;
    } | null;
}