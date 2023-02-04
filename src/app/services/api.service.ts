import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IEmployeeVm } from '../utils/interfaces/employee.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private employees = 'assets/employee.json';
  sendFilter : EventEmitter<any> = new EventEmitter()
  constructor(private http : HttpClient) { }
  getEmpolyeeList():Observable<IEmployeeVm[]> {
    return this.http.get<IEmployeeVm[]>(this.employees)
  }
  getFilterData(){
    return this.http.get("assets/filter.json")


  }
}
