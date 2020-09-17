import { Component, OnInit, ViewChild } from '@angular/core';
import { Producto } from 'src/app/_model/producto';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ProductoService } from 'src/app/_service/producto.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  displayedColumns = ['idProducto', 'nombres', 'marca', 'acciones'];
  producto: Producto[];

  dataSource: MatTableDataSource<Producto>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private service: ProductoService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.poblarTabla();
  }

  openCreateDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width= "500px";
    dialogConfig.data= { "titulo": "Nuevo Producto", "id": 0};

    const dialogref = this.dialog.open(DialogComponent, dialogConfig);
    dialogref.afterClosed().subscribe(result => {
      this.poblarTabla();
    });
  }

  openModDialog(id: number){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width= "500px";
    dialogConfig.data= { "titulo": "Editar Producto", "id": id};
    const dialogref = this.dialog.open(DialogComponent, dialogConfig);

    dialogref.afterClosed().subscribe(result => {
      this.poblarTabla();
    });
  }

  delProducto(id: number){
    this.service.EliminarPorId(id).subscribe(data => {
      alert("Producto eliminado");
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
    this.service.listarProducto().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
}
