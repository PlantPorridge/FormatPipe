import { Pipe, PipeTransform } from '@angular/core';
import { LOCALE_ID, Inject } from '@angular/core';
import { Formats, DateFormat } from "../formats/formats";
import { IFormat } from '../interfaces/format.interface';

@Pipe({
  name: 'format'
})
export class FormatPipe implements PipeTransform {

  constructor(@Inject(LOCALE_ID) private locale: string) { }

  transform(value: any, format: any): string {
    if (typeof (format) != "string") {
      console.error("Supplied format was not of type string. Formatting aborted.");
      return value;
    }

    try {
      //If length is 1 then must be numeric format with no precsion specifier
      if (format.length == 1) {
        //num
        value = this.numericTransform(value, format);
      }
      //If it is all text then we must be working with a date format
      else if (!this.hasNumber(format)) {
        //date
        value = this.dateTransform(value, format);
      }
      //If it of lenght 2 or 3 the it much be numeric format with precision specifier 0-20
      else if (format.length == 2 || format.length == 3) {
        //num
        value = this.numericTransform(value, format);
      }
      else {
        console.error("Supplied format was not recognised. Formatting aborted.");
        return value;
      }
    }
    catch (exeception) {
      console.error("Formatting failed. Formatting aborted. " + exeception);
      return value;
    }

    return value;
  }

  private hasNumber(myString) {
    return /\d/.test(myString);
  }

  private numericTransform(value: string | number, format: string): string {
    let formatSpecifier = format[0];
    let precisionSpecifier = format.length == 1 ? null : Math.min(20, +format.slice(1)).toString();
    let formattedValue = value.toString();
    var formatter: IFormat = Formats.getFormatter(formatSpecifier);
    return formatter.Transform(value, precisionSpecifier, this.locale);
  }

  private dateTransform(value: string | number, format: string): string {
    return DateFormat.Transform(value, format, this.locale);
  }


}
