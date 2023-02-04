import {
  AfterViewInit,
  Component,
  OnInit,
  Optional,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import { IEmployeeVm } from '../../utils/interfaces/employee.interface';
// import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit, AfterViewInit {
  date : any
  displayedColumns: string[] = [
    'employeeName',
    'releaseDate',
    'experience',
    'salary',
    'department',
  ];

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute,
  //  public datePipe: DatePipe
  ) {}
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    // this.api.getEmpolyeeList().subscribe((res:any)=>{
      //   this.dataSource.data = res
    //   this.clonedData = res
    //   console.log(this.dataSource.data)
    // })
    // this.api.sendFilter.subscribe(res=> {
    //   let filterData : any = res
    //   console.log(filterData)
   
    


      this.queryParamsChageHandler();
    //   }
    // )
  }

  queryParamsChageHandler() {
    this.activatedRoute.queryParamMap
      .pipe(
        switchMap((params: any) => {
          if ( params?.params?.releaseDate) {
            this.date = params?.params?.releaseDate
            this.date = new Date( this.date).toISOString().replace('T22:00:00.000Z' , '')
            console.log(this.date)   
          }
          // console.log(params);
          return this.api.getEmpolyeeList().pipe(
            tap((res: IEmployeeVm[]) => {
              console.log(res)
              
              this.dataSource.data = Object.keys(params?.params).length
                ? res.filter((elemment: IEmployeeVm) =>
                    elemment?.department?.includes(
                      params?.params['department']
                    ) ||
                    elemment.releaseDate.includes(this.date)
                     ||
                    (params?.params['experience'] as []) ? (params?.params['experience'] as [])?.some(
                          (el: string) => el === elemment?.experience): null ||
                        elemment?.salary == params?.params['salary']
                        ||
                        elemment?.department?.includes(
                          params?.params['department']
                        )
                  )
                : res;
            })
          );
        })
      )
      .subscribe();
  }
}
