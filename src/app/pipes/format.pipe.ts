import { Pipe, PipeTransform } from '@angular/core';
import { LOCALE_ID, Inject } from '@angular/core';
import { Formats, DateFormat } from "../formats/formats";
import { IFormat } from "../interfaces/format.interface";

@Pipe({
  name: 'format'
})
export class FormatPipe implements PipeTransform {

  constructor( @Inject(LOCALE_ID) private locale: string) { }

  transform(value: any, format: any, currency?: string): string {
    if (typeof (format) != "string") {
      console.warn("Supplied format was not of type string. Formatting aborted.");
      return value;
    }

    if (format.length == 1) {
      //num
      value = this.numericTransform(value, format);
    }
    else if (!this.hasNumber(format)) {
      //date
      value = this.dateTransform(value, format);
    }
    else if (format.length == 2 || format.length == 3) {
      //num
      value = this.numericTransform(value, format);
    }
    else {
      //err
    }

    return value;
  }

  hasNumber(myString) {
    return /\d/.test(myString);
  }

  numericTransform(value: string | number, format: string): string {
    let formatSpecifier = format[0];
    let precisionSpecifier = Math.min(20, +format.slice(1)).toString();
    let formattedValue = value.toString();
    var formatter: IFormat = Formats.getFormatter(formatSpecifier);
    return formatter.Transform(value, precisionSpecifier, this.locale);
  }

  dateTransform(value: string | number, format: string): string {
    return DateFormat.Transform(value, format, this.locale);
  }


}
