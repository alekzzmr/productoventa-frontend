import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PersonaService } from 'src/app/_service/persona.service';
import { DialogData } from '../../../_interface/dialog-data';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {


  form: FormGroup;
  feedback: any;
  email = new FormControl('', [Validators.required]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  constructor(private dialogRef: MatDialogRef<CreateComponent>, private service: PersonaService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
    this.form = new FormGroup(
      {
        "idPersona" : new FormControl(0),
        "apellidos" : new FormControl(''),
        "nombres" : new FormControl(''),
      }
    );
    this.poblarFormulario(this.data.id);
  }

  guardar( formulario: FormControl){
    if (formulario.valid) {
      if (formulario.value.id == 0) {
        this.service.registrarPersona(formulario.value).subscribe(data => alert("Persona creada"));
      } else {
        //console.log(formulario.value);
        this.service.editarPersona(formulario.value).subscribe(data => alert("Datos actualizados"));
      }

      this.dialogRef.close();
    }
  }
  poblarFormulario(id){
    if (id!=0) {
      this.service.buscarPorId(id).subscribe(datos=>{

          this.form = new FormGroup(
            {
              "idPersona" : new FormControl(datos.idPersona),
              "apellidos" : new FormControl(datos.apellidos),
              "nombres" : new FormControl(datos.nombres),
            }
          );
      });
    }
  }
}
