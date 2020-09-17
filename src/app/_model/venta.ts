import { Persona } from './persona';
import { DetalleVenta } from './detalle-venta';

export class Venta {
  idVenta: number;
  fecha: Date;
  persona: Persona;
  importe: number;
  detalleVenta: DetalleVenta;
}
