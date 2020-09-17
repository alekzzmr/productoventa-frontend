import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Venta } from '../_model/venta';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class VentaService {

  private url: string = `${environment.HOST}/venta`;
  constructor(private http: HttpClient) { }

  listarProducto(){
    return this.http.get<Venta[]>(this.url);
  }
}
