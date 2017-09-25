import { PercentPipe, DatePipe, CurrencyPipe, DecimalPipe } from "@angular/common";
import { LOCALE_ID } from '@angular/core';
import { IFormat } from "../interfaces/format.interface";

export const CurrencyFormat: IFormat = class {
    static Transform(value: string | number, precisionSpecifier: number, locale: string): string {
        let currencyPipe = new CurrencyPipe(locale);
        //TODO: Locale to Currency code?
        //Default: get code from locale
        //But also allow code as input.
        return currencyPipe.transform(value, 'GBP', true, '1.' + precisionSpecifier + '-' + precisionSpecifier)
    }
}

export const DecimalFormat: IFormat = class {
    static Transform(value: string | number, precisionSpecifier: number, locale: string): string {
        if (!Number.isInteger(+value)) {
            console.warn("Value " + value + " is not of integral type. The Decimal format specifier (d) only supports integral types.")
            return value.toString();
        }

        let isNegative = +value < 0;
        let positiveDecimalValue = Math.abs(+value);
        var lengthToAdd = Math.max(0, precisionSpecifier - positiveDecimalValue.toString().length);
        return (isNegative ? '-' : '') + '0'.repeat(lengthToAdd) + positiveDecimalValue.toString();
    }
}

export const ExponentialFormat: IFormat = class {
    static Transform(value: string | number, precisionSpecifier: number, locale: string): string {
        return (+value).toExponential(precisionSpecifier).toLowerCase();
    }
}

export const ExponentialFormatUpper: IFormat = class {
    static Transform(value: string | number, precisionSpecifier: number, locale: string): string {
        return ExponentialFormat.Transform(value, precisionSpecifier, locale).toUpperCase();
    }
}

export const FixedPointFormat: IFormat = class {
    static Transform(value: string | number, precisionSpecifier: number, locale: string): string {
        return (+value).toFixed(precisionSpecifier);
    }
}

export const GeneralFormat: IFormat = class {
    static Transform(value: string | number, precisionSpecifier: number, locale: string): string {
        let exponentFormatValue = ExponentialFormat.Transform(value, precisionSpecifier, locale);
        let exponentValue = +exponentFormatValue.substr(exponentFormatValue.indexOf('E'));
        if (exponentValue > -5 && exponentValue < precisionSpecifier) {
            return (+(+value).toPrecision(precisionSpecifier)).toString();
        }
        else {
            return exponentFormatValue.toString();
        }
    }
}

export const GeneralFormatUpper: IFormat = class {
    static Transform(value: string | number, precisionSpecifier: number, locale: string): string {
        return GeneralFormat.Transform(value, precisionSpecifier, locale).toUpperCase();
    }
}

export const NumericFormat: IFormat = class {
    static Transform(value: string | number, precisionSpecifier: number, locale: string): string {
        let decimalPipe = new DecimalPipe(locale);
        return decimalPipe.transform(value, '1.' + precisionSpecifier + '-' + precisionSpecifier)
    }
}

export const PercentFormat: IFormat = class {
    static Transform(value: string | number, precisionSpecifier: number, locale: string): string {
        let percentPipe = new PercentPipe(locale);
        return percentPipe.transform(value, '1.' + precisionSpecifier + '-' + precisionSpecifier)
    }
}

export const RoundTripFormat: IFormat = class {
    static Transform(value: string | number, precisionSpecifier: number, locale: string): string {
        /* If it is already a number, then it is valid. If not, coalesce by converting to a number and back to string */
        if (typeof (value) == "number") {
            return value.toString();
        }
        return Number(value).toString();
    }
}

export const HexadecimalFormat: IFormat = class {
    static Transform(value: string | number, precisionSpecifier: number, locale: string): string {
        if (!Number.isInteger(+value)) {
            console.warn("Value " + value + " is not of integral type. The Hex format specifier (x|X) only supports integral types.")
            return value.toString();
        }

        let formattedValue = (+value < 0 ? (0xFFFFFFFF + +value + 1) : +value).toString(16);

        let lengthToAdd = Math.max(0, precisionSpecifier - formattedValue.toString().length);
        formattedValue = '0'.repeat(lengthToAdd) + formattedValue;

        return formattedValue;
    }
}

export const HexadecimalFormatUpper: IFormat = class {
    static Transform(value: string | number, precisionSpecifier: number, locale: string): string {
        return HexadecimalFormat.Transform(value, precisionSpecifier, locale);
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
