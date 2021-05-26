import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { AccumulationChartAllModule, ChartAllModule, RangeNavigatorAllModule } from '@syncfusion/ej2-angular-charts';
import { ColorPickerModule } from '@syncfusion/ej2-angular-inputs';
import { SparklineChartComponent } from './sparkline-chart/sparkline-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    SparklineChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DateTimePickerModule,
    ChartAllModule,
    RangeNavigatorAllModule,
    AccumulationChartAllModule,
    ColorPickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
