import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Persona } from '../_model/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private url: string = `${environment.HOST}/persona`;
  constructor(private http: HttpClient) { }

  listarPersonas(){
    return this.http.get<Persona[]>(this.url);
  }

  registrarPersona(data: Persona){
    return this.http.post<Persona>(this.url, data);
  }

  buscarPorId(id: number){
    return this.http.get<Persona>(`${this.url}/${id}`);
  }

  editarPersona(data: Persona){
    //return data;
    return this.http.put<Persona>(this.url, data);
  }

  EliminarPorId(id: number){
    return this.http.delete<Persona>(`${this.url}/${id}`);
  }
}
