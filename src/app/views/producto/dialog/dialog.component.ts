import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductoService } from 'src/app/_service/producto.service';
import { DialogData } from '../../../_interface/dialog-data';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  form: FormGroup;

  constructor(private dialogRef: MatDialogRef<DialogComponent>, private service: ProductoService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
    this.form = new FormGroup(
      {
        "idProducto" : new FormControl(0),
        "nombre" : new FormControl(''),
        "marca" : new FormControl(''),
      }
    );
    this.poblarFormulario(this.data.id);
  }

  guardar(formulario: FormGroup){
    if (formulario.valid) {
      if (formulario.value.id == 0) {
        this.service.registrarProducto(formulario.value).subscribe(data => alert("Producto creado"));
      } else {
        //console.log(formulario.value);
        this.service.editarProducto(formulario.value).subscribe(data => alert("Datos actualizados"));
      }

      this.dialogRef.close();
    }
  }

  poblarFormulario(id: number){
    if (id!=0) {
      this.service.buscarPorId(id).subscribe(datos=>{

          this.form = new FormGroup(
            {
              "idProducto" : new FormControl(datos.idProducto),
              "nombre" : new FormControl(datos.nombre),
              "marca" : new FormControl(datos.marca),
            }
          );
      });
    }
  }
}
