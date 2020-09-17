import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Venta } from 'src/app/_model/venta';
import { VentaService } from 'src/app/_service/venta.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { VentaInterface } from '../../_interface/venta';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class VentaComponent implements OnInit {

  displayedColumns = ['idVenta', 'persona', 'importe', 'fecha'];
  venta: Venta[];
  dataSource : MatTableDataSource<Venta>;
  columnsToDisplay = ['name', 'weight', 'symbol', 'position'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  expandedElement: VentaInterface | null;

  constructor(private service: VentaService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.poblarTabla();
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
