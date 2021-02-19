import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from '@syncfusion/ej2-angular-charts';
import { ColorPickerComponent, ColorPickerEventArgs, OpenEventArgs } from '@syncfusion/ej2-angular-inputs';
import { L10n, defaultCulture, setCulture, loadCldr } from '@syncfusion/ej2-base';

setCulture('es-ES');

declare let require: Function;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  public colorSeries : string = '#0db1e7';

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

  private count: number = 0;
  starting: number = 60;
  year: number = 1970;
  public dataA01: Object[] = [];
  interval: any;
  @ViewChild('chart', { static: true }) public chart: ChartComponent;
  @ViewChild('colorpicker', { static: true }) public colorPicker: ColorPickerComponent;

  constructor() {
    loadCldr(
      require('../../node_modules/cldr-data/supplemental/numberingSystems.json'),
      require('../../node_modules/cldr-data/main/es/ca-gregorian.json'),
      require('../../node_modules/cldr-data/main/es/currencies.json'),
      require('../../node_modules/cldr-data/main/es/numbers.json'),
      require('../../node_modules/cldr-data/main/es/timeZoneNames.json')
    );
    L10n.load({
      'es-ES': {
          'colorpicker': {
              'Apply': 'Aceptar',
              'Cancel': 'Cancelar',
              'ModeSwitcher': 'Modo'
          }
      }
    });
    
    this.dataA01 = this.getCompleteData();
    this.getLiveData();
  }

  ngOnInit(): void {
    console.log(`App Culture is: [${defaultCulture}]`);
  }

  public change(args: ColorPickerEventArgs): void {
    this.colorSeries = args.currentValue.hex;
    console.log(`Color value is [${args.currentValue.hex}]`);
}

  public onOpen(args: OpenEventArgs): void {
    console.log(`Arguments onOpen: `, args);
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
