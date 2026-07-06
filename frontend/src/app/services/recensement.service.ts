import { inject, Injectable } from '@angular/core';
import { host } from '../../config';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/api-respone';
import { RecensementAtody } from '../pages/recensement/recensement-list/recensement-list';



@Injectable({
    providedIn: 'root',
})

export class RecensementService {
    private apiUrl = host;
    private http = inject(HttpClient);

    constructor() { }

    fetchData() {
        return this.http.get<ApiResponse<RecensementAtody>>(`${this.apiUrl}/recensementAtody`);
    }

    create(data: any) {
        return this.http.post(`${this.apiUrl}/recensementAtody`, JSON.stringify(data), {
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
