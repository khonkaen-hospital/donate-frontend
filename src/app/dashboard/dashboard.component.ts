import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from '../shared/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  formSearch: FormGroup;
  pageNumber = 1;
  category = 3;

  searchText = 'ชื่อ/สกุล/รายละเอียด วัถตุประสงค์';
  totalpage = 0;
  current_page = 1;
  last_page = 1;
  total_amount = 0;
  total_donate = 0.00;

  categorys: Array<any> = [
    {
      category_id: 1,
      category_name: 'บริจาคเงิน'
    },
    {
      category_id: 3,
      category_name: 'บริจาคสังหาริมทรัพย์(สิ่งของ)'
    }
  ];
  cashData: Array<any> = [];
  chattelData: Array<any> = [];

  constructor(
    private fb: FormBuilder,
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.initForm();
    // this.loadChattelData('1');
  }

  initForm() {
    this.formSearch = this.fb.group({
      search: [''],
      category: ['', Validators.required],
      page: [this.pageNumber, Validators.required]
    })
  }

  onChangeCategory(event: any) {
    this.category = event.target.value;
    // if (this.category == 1) {
    //   this.loadCashData('1');
    //   this.searchText = `ชื่อ-สกุล`;
    // } else if (this.category == 3) {
    //   this.loadChattelData('1');
    //   this.searchText = `ชื่อ/สกุล/รายละเอียด`;
    // } else {
    //   this.searchText = `ชื่อ/สกุล/รายละเอียด`;
    //   this.totalpage = 0;
    // }
  }

  loadCashData(page: any) {
    this.formSearch.patchValue({ page: page });
    this.dashboardService.cashData(this.formSearch.value).subscribe(response => {
      this.cashData = response.rows;
      this.totalpage = parseInt(response.totalpage);
      this.current_page = parseInt(response.page);
      this.pageNumber = response.page;
      this.total_donate = response.all;
      this.total_amount = response.totalamount
    })
  }

  loadChattelData(page: any) {
    this.formSearch.patchValue({ page: page });
    this.dashboardService.chattelData(this.formSearch.value).subscribe(response => {
      this.chattelData = response.rows;
      this.totalpage = parseInt(response.totalpage);
      this.current_page = parseInt(response.page);
      this.pageNumber = response.page;
      this.total_donate = response.all;
      this.total_amount = response.totalamount
    });
  }

  onReload() {
    // this.formSearch.patchValue({ search: '' })
    // this.onSubmit();
    this.formSearch.reset();
    this.formSearch.patchValue({ category: '' });
    this.cashData = [];
    this.chattelData = [];
    this.totalpage = 1;

  }

  onSubmit() {
    this.formSearch.patchValue({ page: 1 })
    if (this.formSearch.valid) {
      let category = this.formSearch.get('category').value;
      if (category == 1) {
        this.dashboardService.cashData(this.formSearch.value).subscribe(response => {
          this.cashData = response.rows;
          this.totalpage = parseInt(response.totalpage);
          this.current_page = parseInt(response.page);
          this.pageNumber = response.page;
          this.total_donate = response.all;
          this.total_amount = response.totalamount
        })
      } else if (category == 3) {
        this.dashboardService.chattelData(this.formSearch.value).subscribe(response => {
          this.chattelData = response.rows;
          this.totalpage = parseInt(response.totalpage);
          this.current_page = parseInt(response.page);
          this.pageNumber = response.page;
          this.total_donate = response.all;
          this.total_amount = response.totalamount
        })
      }
    } else {
      console.log(this.formSearch);
    }
  }

  pageChanged(page: number) {
    if ((page <= this.totalpage) && (page >= 1)) {
      if (this.category == 1) {
        this.loadCashData(page);
      } else if (this.category == 3) {
        this.loadChattelData(page);
      }
    }
  }

  pageInput() {
    let page = this.pageNumber;
    if (page <= this.totalpage && page >= 1) {
      if (this.category == 1) {
        this.loadCashData(page);
      } else if (this.category == 3) {
        this.loadChattelData(page);
      }
    } else {
      this.pageNumber = this.current_page;
    }
  }

}
