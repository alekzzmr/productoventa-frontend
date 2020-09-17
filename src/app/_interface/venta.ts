import { Persona } from '../_model/persona';
import { DetalleVenta } from '../_model/detalle-venta';

export interface VentaInterface{
  idVenta: number;
  fecha: Date;
  persona: Persona;
  importe: number;
  detalleVenta: DetalleVenta;
}
