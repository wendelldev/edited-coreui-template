import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from '../../../environments/environment';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-table-sr-pagination',
  templateUrl: './table-sr-pagination.component.html',
  styleUrls: ['./table-sr-pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableSrPaginationComponent implements OnInit {

  @Input() displayedColumns: [];
  @Input() pageSize: number = 5;
  @Input() loadUrl: string = environment.apiUrl + '/users';

  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  formGroup: FormGroup;
  isLoading: boolean = false;
  totalRows = 0;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {}) sort: MatSort;

  constructor(
    private fb: FormBuilder,
    private commonService: CommonService
  ) {    
    this.formGroup = this.fb.group({
      filter: [null]
    })

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.loadData()
  }

  onNavigate(productCode: string) {
    console.log(productCode)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadData() {
    this.isLoading = true;
    return this.commonService.getPaginatedData(this.loadUrl, {
      page: this.currentPage,
      limit: this.pageSize
    }).subscribe(
      (response: any) => {
        let dataSource = new MatTableDataSource(response)
        this.dataSource = dataSource
        this.paginator.pageIndex = this.currentPage;
        this.dataSource.sort = this.sort;

        // atribui o tamanho do paginador para o tamanho da listagem que o back retorna
        this.paginator.length = response.length;

        this.isLoading = false;
      },
      error => {
        console.log(error);
        this.isLoading = false;
      }
    )
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadData();
  }

}
