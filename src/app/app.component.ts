import { Component, OnInit, ViewChild } from '@angular/core';
import { ColorPickerComponent, ColorPickerEventArgs, OpenEventArgs } from '@syncfusion/ej2-angular-inputs';
import { L10n, defaultCulture, setCulture, loadCldr } from '@syncfusion/ej2-base';

L10n.load({
  'es-ES': {
    'colorpicker': {
      'Apply': 'Aceptar',
      'Cancel': 'Cancelar',
      'ModeSwitcher': 'Modo'
    }
  }
});

setCulture('es-ES');

declare let require: Function;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  public colorSeries: string = '#0db1e7';
  
  @ViewChild('colorpicker', { static: true }) public colorPicker: ColorPickerComponent;

  constructor() {
    loadCldr(
      require('../../node_modules/cldr-data/supplemental/numberingSystems.json'),
      require('../../node_modules/cldr-data/main/es/ca-gregorian.json'),
      require('../../node_modules/cldr-data/main/es/currencies.json'),
      require('../../node_modules/cldr-data/main/es/numbers.json'),
      require('../../node_modules/cldr-data/main/es/timeZoneNames.json')
    );
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

  public createIndexes(count: number): Array<number> {
    let indexes = [];
    for (let i = 0; i < count; i++) {
      indexes.push(i);
    }
    return indexes;
  }

}
