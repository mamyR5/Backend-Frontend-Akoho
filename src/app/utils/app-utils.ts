// src/app/utils/api.utils.ts

import { ApiData, ApiResponse } from '../models/api-respone';

export function extractData<T>(response: ApiResponse<T>): ApiData<T> {
    if (response.status === 'error') {
        throw new Error(response.error?.message ?? 'Erreur inconnue');
    }
    
    return response.data;
}