import { inject, Injectable } from '@angular/core';
import { host } from '../../config';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/api-respone';
import { Incubation } from '../pages/incubation/incubation-list/incubation-list';



@Injectable({
    providedIn: 'root',
})

export class IncubationService {
    private apiUrl = host;
    private http = inject(HttpClient);

    constructor() { }

    fetchData() {
        return this.http.get<ApiResponse<Incubation>>(`${this.apiUrl}/incubation`);
    }

    create(data: any) {
        return this.http.post(`${this.apiUrl}/incubation`, JSON.stringify(data), {
            headers: {
                "Content-Type": "application/json"
            },
        });
    }

    /*fetchDataAvecRemise(){
        return this.http.get<Object>(`${this.apiUrl}/stats/remise-generale`);
    }

    fetchSp(id_sp:number){
        return this.http.get<Object>(`${this.apiUrl}/stats/remise-generale/${id_sp}`);
    }*/

    /*idPresenceActInRemise(id_presence:number) {
        return this.http.get<boolean>(`${this.apiUrl}/stats/remise/${id_presence}`);
    }*/



}
