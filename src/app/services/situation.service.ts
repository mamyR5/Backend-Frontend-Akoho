import { inject, Injectable } from '@angular/core';
import { host } from '../../config';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/api-respone';
import { SituationLot } from '../pages/situation/situation';



@Injectable({
    providedIn: 'root',
})

export class SituationService {
    private apiUrl = host;
    private http = inject(HttpClient);

    constructor() { }

    fetchData(dateFiltre : string) {
        return this.http.post<ApiResponse<SituationLot>>(`${this.apiUrl}/lot/situation`,
            { 
                DateFiltre : dateFiltre
            },
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );
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
