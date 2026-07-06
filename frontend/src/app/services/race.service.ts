import { inject, Injectable } from '@angular/core';
import { host } from '../../config';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/api-respone';
import {  } from '../pages/lot/lot-list/lot-list';

export interface Race{
    id:number,
    nom:string,
    puSakafo:number,
    prixVente:number,
    prixAtody:number,
    puAchat:number
}

@Injectable({
    providedIn: 'root',
})

export class RaceService {
    private apiUrl = host;
    private http = inject(HttpClient);

    constructor() { }

    fetchData() {
        return this.http.get<ApiResponse<Race>>(`${this.apiUrl}/race`);
    }

    create(data: any) {
        return this.http.post(`${this.apiUrl}/race`, JSON.stringify(data), {
            headers: {
                "Content-Type": "application/json"
            },
        });
    }

    

}
