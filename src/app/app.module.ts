import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { environment } from './../environments/environment.prod';
// import { environment } from './../environments/environment'; // localhost
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ThaiDateAbbrPipe } from './pipe/thai-date-abbr.pipe';
import { DonateObjectivePipe } from './pipe/donate-objective.pipe';
import { FindCashFilterComponent } from './find-cash-filter/find-cash-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    DashboardComponent,
    ThaiDateAbbrPipe,
    DonateObjectivePipe,
    FindCashFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: 'API_URL', useValue: environment.apiUrl },
    // { provide: LOCALE_ID, useValue: 'th-TH' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
