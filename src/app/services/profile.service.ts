import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getRandomUser(){
    return this.http.get<any>("https://randomuser.me/api/")
   }

}
