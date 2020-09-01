import { Component, OnInit, ViewChild } from '@angular/core';
import { PersonaService } from '../../_service/persona.service';
import { Persona } from 'src/app/_model/persona';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateComponent } from './create/create.component';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  displayedColumns = ['idPersona', 'apellidos', 'nombres', 'acciones'];
  persona: Persona[];

  dataSource: MatTableDataSource<Persona>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private service: PersonaService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.poblarTabla();
  }

  openCreateDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width= "500px";
    dialogConfig.data= { "titulo": "Nueva Persona", "id": 0};

    const dialogref = this.dialog.open(CreateComponent, dialogConfig);
    dialogref.afterClosed().subscribe(result => {
      this.poblarTabla();
    });
  }

  openModDialog(id: number){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width= "500px";
    dialogConfig.data= { "titulo": "Editar Persona", "id": id};
    const dialogref = this.dialog.open(CreateComponent, dialogConfig);

    dialogref.afterClosed().subscribe(result => {
      this.poblarTabla();
    });
  }

  delPersona(id: number){
    this.service.EliminarPorId(id).subscribe(data => {
      alert("Persona Eliminada");
      this.poblarTabla();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  poblarTabla(){
    this.service.listarPersonas().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
}
