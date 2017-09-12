import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'format'
})
export class FormatPipe implements PipeTransform {

  transform(value: any, format: any): string {
    if (typeof (format) != "string") {
      console.warn("Supplied format was not of type string. Formatting aborted.");
      return value;
    }

    if (format.length == 2 || format.length == 3) {
      return this.numericTransform(value, format);
    }

    return value;
  }

  numericTransform(value: string | number, format: string): string {
    let formatSpecifier = format[0];
    let precisionSpecifier = Math.min(20, +format.slice(1));
    let formattedValue = value.toString();

    switch (formatSpecifier.toLowerCase()) {
      case 'g':
        let exponentFormatValue = this.numericTransform(value, 'e'+precisionSpecifier);
        let exponentValue = +exponentFormatValue.substr(exponentFormatValue.indexOf('E'));
        if(exponentValue > -5 && exponentValue < precisionSpecifier){
            formattedValue = (+(+value).toPrecision(precisionSpecifier)).toString();
            break;
        }
        formattedValue = formatSpecifier == 'g' ? exponentFormatValue.toString() : exponentFormatValue.toString().toUpperCase();        
        break;
      case 'f':
        formattedValue = (+value).toFixed(precisionSpecifier);
        break;
      case 'p':
        formattedValue = this.numericTransform(+value * 100, 'n' + precisionSpecifier) + '%;';
        break;
      case 'c':
        console.warn("C format not yet supported");
        break;
      case 'e':
        formattedValue = (+value).toExponential(precisionSpecifier);
        break;  
      case 'd':
        if (!Number.isInteger(+value)) {
          console.warn("Value " + value + " is not of integral type. The Decimal format specifier (d) only supports integral types.")
          break;
        }
        let isNegative = value < 0;
        let positiveDecimalValue = Math.abs(+value);
        var lengthToAdd = Math.max(0, precisionSpecifier - positiveDecimalValue.toString().length);
        formattedValue = (isNegative ? '-' : '') + '0'.repeat(lengthToAdd) + positiveDecimalValue.toString();
      case 'r':
        if (typeof (value) == "number") {
          formattedValue = value.toString();
          break;
        }
        formattedValue = Number(value).toString();
      case 'x':
        if (!Number.isInteger(+value)) {
          console.warn("Value " + value + " is not of integral type. The Hex format specifier (x|X) only supports integral types.")
          break;
        }

        formattedValue = (+value < 0 ? (0xFFFFFFFF + +value + 1) : +value).toString(16);

        lengthToAdd = Math.max(0, precisionSpecifier - formattedValue.toString().length);
        formattedValue = '0'.repeat(lengthToAdd) + formattedValue;

        if(formatSpecifier == 'X') formattedValue = formattedValue.toUpperCase();
        break;
      default:
        console.warn("No format found corresponding to the format specifier: " + formatSpecifier);
        break;
    }

    return formattedValue;

  }
}
