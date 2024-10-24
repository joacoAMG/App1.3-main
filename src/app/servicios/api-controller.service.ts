import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiControllerService {
  apiURL = "http://localhost:3000/"
  constructor(private http:HttpClient) { }


  obtenerUsuarios():Observable<any>{
    return this.http.get(this.apiURL+"usuarios"); 
   }
 
   insertarUsuarios(data:any):Observable<any>{
     return this.http.post(this.apiURL+"usuarios/",data);
   }
 
   borrarUsuario(id:any):Observable<any>{
     return this.http.delete(this.apiURL+"usuarios/"+id)
   }
 
   modificarUsuario(id:any,data:any):Observable<any>{
     return this.http.put(this.apiURL+"usuarios/"+id,data)
   }
}
