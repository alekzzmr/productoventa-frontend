import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Producto } from '../_model/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private url: string = `${environment.HOST}/producto`;
  constructor(private http: HttpClient){}
  listarProducto(){
    return this.http.get<Producto[]>(this.url);
  }

  registrarProducto(data: Producto){
    return this.http.post<Producto>(this.url, data);
  }

  buscarPorId(id: number){
    return this.http.get<Producto>(`${this.url}/${id}`);
  }

  editarProducto(data: Producto){
    return this.http.put<Producto>(this.url, data);
  }

  EliminarPorId(id: number){
    return this.http.delete<Producto>(`${this.url}/${id}`);
  }
}
