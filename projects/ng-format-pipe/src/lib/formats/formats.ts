import { PercentPipe, DatePipe, CurrencyPipe, DecimalPipe, getLocaleNumberSymbol, NumberSymbol } from "@angular/common";
import { LOCALE_ID } from '@angular/core';
import { IFormat } from "../interfaces/format.interface";
import { LocaleToCurrency } from "../currency/currency.map";

export const DateFormat: IFormat = class {
    static Transform(value: string | number, format: string, locale: string): string {
        let datePipe = new DatePipe(locale);
        return datePipe.transform(value, format, null, locale);
    }
}

export const CurrencyFormat: IFormat = class {
    private static defaultPrecisionSpecifier = '2';
    static Transform(value: string | number, precisionSpecifier: string, locale: string): string {
        precisionSpecifier = precisionSpecifier || this.defaultPrecisionSpecifier;
        let currencyPipe = new CurrencyPipe(locale);
        let currencyCode = LocaleToCurrency(locale);
        return currencyPipe.transform(value, currencyCode, 'symbol', '1.' + precisionSpecifier + '-' + precisionSpecifier)
    }
}

export const DecimalFormat: IFormat = class {
    static Transform(value: string | number, precisionSpecifier: string, locale: string): string {
        if (!Number.isInteger(+value)) {
            console.warn("Value " + value + " is not of integral type. The Decimal format specifier (d) only supports integral types.")
            return value.toString();
        }

        precisionSpecifier = precisionSpecifier || value.toString().length.toString();

        let isNegative = +value < 0;
        let positiveDecimalValue = Math.abs(+value);
        var lengthToAdd = Math.max(0, +precisionSpecifier - positiveDecimalValue.toString().length);
        return (isNegative ? '-' : '') + '0'.repeat(lengthToAdd) + positiveDecimalValue.toString();
    }
}

export const ExponentialFormat: IFormat = class {
    private static defaultPrecisionSpecifier = '6';
    static Transform(value: string | number, precisionSpecifier: string, locale: string): string {
        precisionSpecifier = precisionSpecifier || this.defaultPrecisionSpecifier;
        let exponentValue = (+value).toExponential(+precisionSpecifier).toLowerCase();
        return exponentValue.replace('.', getLocaleNumberSymbol(locale, NumberSymbol.Decimal));
    }
}

export const ExponentialFormatUpper: IFormat = class {
    static Transform(value: string | number, precisionSpecifier: string, locale: string): string {
        return ExponentialFormat.Transform(value, precisionSpecifier, locale).toUpperCase();
    }
}

export const FixedPointFormat: IFormat = class {
    private static defaultPrecisionSpecifier = '2';
    static Transform(value: string | number, precisionSpecifier: string, locale: string): string {
        precisionSpecifier = precisionSpecifier || this.defaultPrecisionSpecifier;
        let fixedPointValue = (+value).toFixed(+precisionSpecifier);

        return fixedPointValue.replace('.', getLocaleNumberSymbol(locale, NumberSymbol.Decimal));
    }
}



export const GeneralFormat: IFormat = class {
    // private static defaultPrecisionSpecifier = '0'; //NOt sure for this one.
    static Transform(value: string | number, precisionSpecifier: string, locale: string): string {

        //If decimal then use fixed point with precision preserved. Not sure why it has to be >=1 but it is how .net works.
        if (precisionSpecifier == null && (+value >= 1)) {
            let defaultPS = decimalPlaces(value).toString();
            return FixedPointFormat.Transform(value, defaultPS, locale);
        }

        //Ingore leading 0's to determine PS required to maintain full precision when generating the Exponent.
        let numberOfFigures = numOfDigits(value, true) - 1;

        //If the PS is null then we maintain full precision
        let exponentPS = Math.max(0, precisionSpecifier == null ? numberOfFigures : +precisionSpecifier - 1).toString();
        let exponentFormatValue = ExponentialFormat.Transform(value, exponentPS, locale);
        let exponentValue = +exponentFormatValue.substr(exponentFormatValue.indexOf('e') + 1);

        if (exponentValue > -5 && exponentValue < +precisionSpecifier) {
            let numOfDecimals = decimalPlaces(value);
            let numOfInteger = numOfDigits(value) - numOfDecimals;
            let sigFigPS = Math.min(+precisionSpecifier - numOfInteger, numOfDecimals).toString();
            //Fixed format PS refers to decimal only. So need to calculate a new PS for this.
            //If the PS in null, then we maintain full precision.
            return FixedPointFormat.Transform(value, precisionSpecifier == null ? numOfDecimals.toString() : sigFigPS, locale);
        }
        else {
            return exponentFormatValue.toString();
        }
    }


}

export const GeneralFormatUpper: IFormat = class {
    static Transform(value: string | number, precisionSpecifier: string, locale: string): string {
        return GeneralFormat.Transform(value, precisionSpecifier, locale).toUpperCase();
    }
}

export const NumericFormat: IFormat = class {
    private static defaultPrecisionSpecifier = '2';
    static Transform(value: string | number, precisionSpecifier: string, locale: string): string {
        precisionSpecifier = precisionSpecifier || this.defaultPrecisionSpecifier;

        let decimalPipe = new DecimalPipe(locale);
        return decimalPipe.transform(value, '1.' + precisionSpecifier + '-' + precisionSpecifier)
    }
}

export const PercentFormat: IFormat = class {
    private static defaultPrecisionSpecifier = '2';
    static Transform(value: string | number, precisionSpecifier: string, locale: string): string {
        precisionSpecifier = precisionSpecifier || this.defaultPrecisionSpecifier;

        let percentPipe = new PercentPipe(locale);
        return percentPipe.transform(value, '1.' + precisionSpecifier + '-' + precisionSpecifier)
    }
}

export const RoundTripFormat: IFormat = class {
    static Transform(value: string | number, precisionSpecifier: string, locale: string): string {
        /* If it is already a number, then it is valid. If not, coalesce by converting to a number and back to string */
        if (typeof (value) == "number") {
            return value.toString();
        }
        return Number(value).toString();
    }
}

export const HexadecimalFormat: IFormat = class {
    static Transform(value: string | number, precisionSpecifier: string, locale: string): string {
        if (!Number.isInteger(+value)) {
            console.warn("Value " + value + " is not of integral type. The Hex format specifier (x|X) only supports integral types.")
            return value.toString();
        }

        let formattedValue = (+value < 0 ? (0xFFFFFFFF + +value + 1) : +value).toString(16);

        let lengthToAdd = Math.max(0, +precisionSpecifier - formattedValue.toString().length);
        formattedValue = '0'.repeat(lengthToAdd) + formattedValue;

        return formattedValue;
    }
}

export const HexadecimalFormatUpper: IFormat = class {
    static Transform(value: string | number, precisionSpecifier: string, locale: string): string {
        return HexadecimalFormat.Transform(value, precisionSpecifier, locale).toUpperCase();
    }
}

export class Formats {
    static getFormatter(formatSpecifier: string): IFormat {

        switch (formatSpecifier) {
            case 'n':
            case 'N':
                return NumericFormat;
            case 'p':
            case 'P':
                return PercentFormat;
            case 'c':
            case 'C':
                return CurrencyFormat;
            case 'g':
                return GeneralFormat;
            case 'G':
                return GeneralFormatUpper;
            case 'f':
            case 'F':
                return FixedPointFormat;
            case 'e':
                return ExponentialFormat;
            case 'E':
                return ExponentialFormatUpper;
            case 'd':
            case 'D':
                return DecimalFormat;
            case 'r':
            case 'R':
                return RoundTripFormat;
            case 'x':
                return HexadecimalFormat;
            case 'X':
                return HexadecimalFormatUpper;
            default:
                console.warn("No format found corresponding to the format specifier: " + formatSpecifier);
                return null;
        }
    }
}

function decimalPlaces(num): number {
    var match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
    if (!match) { return 0; }

    return Math.max(
        0,
        // Number of digits right of decimal point.
        (match[1] ? match[1].length : 0)
        // Adjust for scientific notation.
        - (match[2] ? +match[2] : 0));
}

let digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
function numOfDigits(num: string | number, ignoreLeadingZeros?: boolean): number {
    num = num.toString();
    let numOfDigits = 0;

    for (var i = 0; i < num.length; i++) {
        if (digits.includes(num[i])) {
            if (num[i] == '0' && ignoreLeadingZeros) continue;
            else ignoreLeadingZeros = false;

            numOfDigits++;
        }
    }

    return numOfDigits;
}