import { Component, ViewChild } from '@angular/core';
import { ChartComponent } from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  public primaryXAxis: Object = {
    valueType: 'DateTime',
    labelFormat: 'yy-MMM',
    intervalType: 'Months',
    majorGridLines: { width: 0 }
  };

  public primaryYAxis: Object = {
    labelFormat: '{value} %',
    rangePadding: 'None',
    minimum: 50,
    maximum: 90,
    interval: 20,
    lineStyle: { width: 1 },
    majorGridLines: { width: 1 }
  };

  public marker: Object = {
    visible: true,
    height: 5,
    width: 5
  };

  private count : number = 0;
  starting: number = 60;
  year: number = 1970;
  public dataA01: Object[] = [];
  interval : any;
  @ViewChild('chart') public chart: ChartComponent;

  constructor() {
    this.dataA01 = this.getCompleteData();
    this.getLiveData();
  }
  
  getLiveData() {
    this.interval = setInterval(() => {
      let data = { x: new Date(this.year, (this.count + 1), this.count), y: this.getRandData() };
      this.dataA01.push(data);
      this.dataA01.shift();
      console.log(`Generating data ... [${this.count}]: `, data);
      this.count++;
      this.chart.refresh();
    }, 1000)
  }

  public getCompleteData(): any {
    let serie: Object[] = [];
    while (this.count < 50) {
      serie.push({ x: new Date(this.year, (this.count + 1), this.count), y: this.getRandData() });
      this.count++;
    }
    return serie;
  }

  private getRandData() {
    let range = this.starting;
    let rand = Math.floor(Math.random() * 20) + 1;
    if (rand > .5) {
      range += rand;
    } else {
      range -= rand;
    }
    return range;
  }

}
