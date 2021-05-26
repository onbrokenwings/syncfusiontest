import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'sparkline-chart',
  templateUrl: './sparkline-chart.component.html'
})
export class SparklineChartComponent implements OnInit, AfterViewInit {

  @Input()
  public colorSeries: string;

  @Input()
  public name: string;

  public primaryXAxis: Object = {
    valueType: 'DateTime',
    labelFormat: 'yy-MMM',
    intervalType: 'Months',
    majorGridLines: { width: 0 },
    visible: false
  };

  public primaryYAxis: Object = {
    labelFormat: '{value} %',
    rangePadding: 'None',
    minimum: 50,
    maximum: 90,
    interval: 20,
    lineStyle: { width: 0 },
    majorGridLines: { width: 1 },
    visible: false
  };

  public legendSettings: Object = {
    visible: false,
    position: 'Top'
  }

  public marker: Object = {
    visible: false,
    height: 1,
    width: 1
  };

  private count: number = 0;
  starting: number = 60;
  year: number = 1970;
  public dataA01: Object[] = [];
  interval: any;

  @ViewChild('chart', { static: true }) public chart: ChartComponent;

  constructor() { 
    this.dataA01 = this.getCompleteData();
    this.getLiveData();
  }
  
  ngAfterViewInit(): void {
    console.log(`Chart ID is [${this.name}]`);
  }

  ngOnInit() { 
  }
  
  getLiveData() {
    this.interval = setInterval(() => {
      let data = { x: new Date(this.year, (this.count + 1), this.count), y: this.getRandData() };
      this.dataA01.push(data);
      this.dataA01.shift();
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
