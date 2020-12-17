import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from '../shared/dashboard.service';

@Component({
  selector: 'app-find-cash-filter',
  templateUrl: './find-cash-filter.component.html',
  styleUrls: ['./find-cash-filter.component.css']
})
export class FindCashFilterComponent implements OnInit {

  formSearch: FormGroup;
  month: Array<any> = [];
  cashs: Array<any> = [];
  pageNumber: number = 1;
  tObject: string = ``;
  sumAmount: number = 0;

  constructor(
    private fb: FormBuilder,
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getMonth();
  }

  initForm() {
    this.formSearch = this.fb.group({
      object: ['53', Validators.required],
      month: ['', Validators.required],
      search: ['', Validators.required],
      page: [this.pageNumber, Validators.required]
    })
  }

  getMonth() {
    this.dashboardService.cashDonateMonth(53).subscribe(response => {
      this.month = response.rows;
      this.formSearch.patchValue({ month: this.month[0]['groupsdate'] });
      this.getData();
    })
  }

  getData() {
    this.dashboardService.cashFilter(this.formSearch.value).subscribe(response => {
      this.cashs = response.rows;
      this.tObject = response.rows[0]['objective_name'];
      this.sumAmount = +this.cashs.reduce((amount: any, cash: any) => amount + parseFloat(cash.amount), 0);
    });
  }

  onReload() {
    this.formSearch.patchValue({ month: this.month[0]['groupsdate'] });
    this.getData();
  }

  onSubmit() {
    this.getData();
  }

}
