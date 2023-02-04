import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { from, of, switchMap, take, tap } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  filterList: any = [];
  expandCloseFilter: boolean = false
  empolyeeForm: FormGroup = new FormGroup({
  });
  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.queryParamsChageHandler();
  }

   filter() {
    let filtervalues: any = {};
    console.log( Object.keys(this.empolyeeForm.value))

    Object.keys(this.empolyeeForm.value).forEach((key: string) => {
      filtervalues[key] = this.empolyeeForm.value[key] || null;
    });



    from(
      this.router.navigate([], {
        queryParams: filtervalues,
        queryParamsHandling: 'merge',
      })
    )
      .pipe(take(1))
      .subscribe();

    // this.api.sendFilter.emit(this.empolyeeForm.value)
  }

  public reset() {
    this.empolyeeForm.reset({});

    let filtervalues: any = {};

    Object.keys(this.empolyeeForm.value).forEach((key: string) => {
      filtervalues[key] = null;

    });
    console.log(filtervalues)
    from(
      this.router.navigate([], {
        queryParams: filtervalues,
        queryParamsHandling: 'merge',
      })
    )
      .pipe(take(1))
      .subscribe();
  }

  queryParamsChageHandler() {
    this.activatedRoute.queryParamMap
      .pipe(
        switchMap((params: any) => {
          return this.api.getFilterData().pipe(
            tap((res) => {
              this.filterList = res;
              this.filterList.forEach((element: any) => {
                this.empolyeeForm.addControl(element.name, new FormControl(params?.params[element.name]||null));
              });
            })
          );
        })
      )
      .subscribe();
  }
}
