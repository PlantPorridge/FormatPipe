import { DateFormat, CurrencyFormat, DecimalFormat, ExponentialFormat, ExponentialFormatUpper, FixedPointFormat, GeneralFormat, NumericFormat, GeneralFormatUpper, PercentFormat, RoundTripFormat, HexadecimalFormat, HexadecimalFormatUpper } from "./formats";
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

describe('DateFormat', () => {
    it('transforms to short date', () => {
        expect(DateFormat.Transform('2000-10-1', 'shortDate', 'en-US')).toEqual('10/1/00');
        expect(DateFormat.Transform('2000-10-1', 'M/d/yy', 'en-US')).toEqual('10/1/00');
    });
});

describe('CurrencyFormat', () => {
    registerLocaleData(localeFr); 

    it('defaults to 2 dp', () => {
        expect(CurrencyFormat.Transform('123.456', null, 'en-US')).toEqual('$123.46');
    });

    it('transforms common values', () => {
        expect(CurrencyFormat.Transform('123.456', '0', 'en-US')).toEqual('$123');
        expect(CurrencyFormat.Transform('123.456', '3', 'en-US')).toEqual('$123.456');
        expect(CurrencyFormat.Transform('123.456', '5', 'en-US')).toEqual('$123.45600');
    });

    it('transforms negative values', () => {
        expect(CurrencyFormat.Transform('-123.456', '0', 'en-US')).toEqual('-$123');
        expect(CurrencyFormat.Transform('-123.456', '3', 'en-US')).toEqual('-$123.456');
        expect(CurrencyFormat.Transform('-123.456', '5', 'en-US')).toEqual('-$123.45600');
    });

    it('transforms rounds values', () => {
        expect(CurrencyFormat.Transform('123.456', '1', 'en-US')).toEqual('$123.5');
        expect(CurrencyFormat.Transform('123.456', '2', 'en-US')).toEqual('$123.46');
        expect(CurrencyFormat.Transform('123.5', '0', 'en-US')).toEqual('$124');
    });

    it('displays currency symbol base on locale', () => {
        expect(CurrencyFormat.Transform('123', '0', 'en-GB')).toEqual('£123');
        expect(CurrencyFormat.Transform('123', '0', 'en-AD')).toEqual('€123');
        expect(CurrencyFormat.Transform('123', '0', 'en-AU')).toEqual('A$123');
    });

    it('respects locale', () => {
        expect(CurrencyFormat.Transform('123400', '3', 'fr-FR')).toEqual('123 400,000 €');
    });
});

describe('DecimalFormat', () => {
    it('defaults to input size', () => {
        expect(DecimalFormat.Transform('12345', null, 'en-US')).toEqual('12345');
    });

    it('alters nothing if non-integral', () => {
        expect(DecimalFormat.Transform('123.45', null, 'en-US')).toEqual('123.45');
        expect(DecimalFormat.Transform('123.45', '10', 'en-US')).toEqual('123.45');
    });

    it('transforms common values', () => {
        expect(DecimalFormat.Transform('123456', '0', 'en-US')).toEqual('123456');
        expect(DecimalFormat.Transform('123456', '3', 'en-US')).toEqual('123456');
        expect(DecimalFormat.Transform('123456', '5', 'en-US')).toEqual('123456');
        expect(DecimalFormat.Transform('123456', '10', 'en-US')).toEqual('0000123456');
        expect(DecimalFormat.Transform('', '10', 'en-US')).toEqual('0000000000');
    });

    it('transforms negative values', () => {
        expect(DecimalFormat.Transform('-123456', '0', 'en-US')).toEqual('-123456');
        expect(DecimalFormat.Transform('-123456', '3', 'en-US')).toEqual('-123456');
        expect(DecimalFormat.Transform('-123456', '5', 'en-US')).toEqual('-123456');
        expect(DecimalFormat.Transform('-123456', '10', 'en-US')).toEqual('-0000123456');
    });
});

describe('ExponentialFormat', () => {
    registerLocaleData(localeFr);    

    it('defaults 6 dp', () => {
        expect(ExponentialFormat.Transform('12345', null, 'en-US')).toEqual('1.234500e+4');
    });

    it('transforms common values', () => {
        expect(ExponentialFormat.Transform('123456', '0', 'en-US')).toEqual('1e+5');
        expect(ExponentialFormat.Transform('123456', '5', 'en-US')).toEqual('1.23456e+5');
        expect(ExponentialFormat.Transform('123456', '10', 'en-US')).toEqual('1.2345600000e+5');
        expect(ExponentialFormat.Transform('', '10', 'en-US')).toEqual('0.0000000000e+0');

        expect(ExponentialFormat.Transform('0.00001', '0', 'en-US')).toEqual('1e-5');
        expect(ExponentialFormat.Transform('0.01234', '3', 'en-US')).toEqual('1.234e-2');
    });

    it('transforms negative values', () => {
        expect(ExponentialFormat.Transform('-123456', '0', 'en-US')).toEqual('-1e+5');
        expect(ExponentialFormat.Transform('-123400', '3', 'en-US')).toEqual('-1.234e+5');
        expect(ExponentialFormat.Transform('-0.00001', '0', 'en-US')).toEqual('-1e-5');
    });

    it('rounds values', () => {
        expect(ExponentialFormat.Transform('123456', '3', 'en-US')).toEqual('1.235e+5');
        expect(ExponentialFormat.Transform('123456', '4', 'en-US')).toEqual('1.2346e+5');
    });

    it('respects locale', () => {
        expect(ExponentialFormat.Transform('-123400', '3', 'fr-FR')).toEqual('-1,234e+5');
    });
});

describe('ExponentialFormatUpper', () => {
    it('defaults 6 dp', () => {
        expect(ExponentialFormatUpper.Transform('12345', null, 'en-US')).toEqual('1.234500E+4');
    });

    it('transforms common values', () => {
        expect(ExponentialFormatUpper.Transform('123456', '0', 'en-US')).toEqual('1E+5');
        expect(ExponentialFormatUpper.Transform('123456', '5', 'en-US')).toEqual('1.23456E+5');
        expect(ExponentialFormatUpper.Transform('123456', '10', 'en-US')).toEqual('1.2345600000E+5');
        expect(ExponentialFormatUpper.Transform('', '10', 'en-US')).toEqual('0.0000000000E+0');

        expect(ExponentialFormatUpper.Transform('0.00001', '0', 'en-US')).toEqual('1E-5');
        expect(ExponentialFormatUpper.Transform('0.01234', '3', 'en-US')).toEqual('1.234E-2');
    });

    it('transforms negative values', () => {
        expect(ExponentialFormatUpper.Transform('-123456', '0', 'en-US')).toEqual('-1E+5');
        expect(ExponentialFormatUpper.Transform('-123400', '3', 'en-US')).toEqual('-1.234E+5');
        expect(ExponentialFormatUpper.Transform('-0.00001', '0', 'en-US')).toEqual('-1E-5');
    });


});

describe('FixedPointFormat', () => {
    registerLocaleData(localeFr);
    
    it('defaults to 2 dp', () => {
        expect(FixedPointFormat.Transform('12345', null, 'en-US')).toEqual('12345.00');
    });

    it('transforms common values', () => {
        expect(FixedPointFormat.Transform('123456', '0', 'en-US')).toEqual('123456');
        expect(FixedPointFormat.Transform('123456', '3', 'en-US')).toEqual('123456.000');
        expect(FixedPointFormat.Transform('123456', '5', 'en-US')).toEqual('123456.00000');
        expect(FixedPointFormat.Transform('123456', '10', 'en-US')).toEqual('123456.0000000000');
        expect(FixedPointFormat.Transform('', '10', 'en-US')).toEqual('0.0000000000');
        expect(FixedPointFormat.Transform('123.456', '0', 'en-US')).toEqual('123');
        expect(FixedPointFormat.Transform('123.456', '3', 'en-US')).toEqual('123.456');
        expect(FixedPointFormat.Transform('123.456', '5', 'en-US')).toEqual('123.45600');
    });

    it('transforms negative values', () => {
        expect(FixedPointFormat.Transform('-123456', '0', 'en-US')).toEqual('-123456');
        expect(FixedPointFormat.Transform('-123.456', '5', 'en-US')).toEqual('-123.45600');
    });

    it('rounds values', () => {
        expect(FixedPointFormat.Transform('123.456', '1', 'en-US')).toEqual('123.5');
        expect(FixedPointFormat.Transform('123.456', '2', 'en-US')).toEqual('123.46');
    });

    it('respects locale', () => {
        expect(FixedPointFormat.Transform('123.456', '3', 'fr-FR')).toEqual('123,456');
        expect(FixedPointFormat.Transform('123456.789', '3', 'fr-FR')).toEqual('123456,789');        
    });
});

describe('GeneralFormat', () => {
    registerLocaleData(localeFr);
    
    it('defaults to constant precision', () => {
        expect(GeneralFormat.Transform('12345', null, 'en-US')).toEqual('12345');
        expect(GeneralFormat.Transform('12345.6789', null, 'en-US')).toEqual('12345.6789');
        expect(GeneralFormat.Transform('.0000023', null, 'en-US')).toEqual('2.3e-6');
        expect(GeneralFormat.Transform('.0023', null, 'en-US')).toEqual('0.0023');
    });

    it('transforms common values', () => {
        expect(GeneralFormat.Transform('12345.6789', '7', 'en-US')).toEqual('12345.68');
        expect(GeneralFormat.Transform('1234', '2', 'en-US')).toEqual('1.2e+3');
    });

    it('transforms negative values', () => {
        expect(GeneralFormat.Transform('-12345.6789', '7', 'en-US')).toEqual('-12345.68');
        expect(GeneralFormat.Transform('-1234', '2', 'en-US')).toEqual('-1.2e+3');
    });

    it('rounds values', () => {
        expect(GeneralFormat.Transform('3.14159265', '5', 'en-US')).toEqual('3.1416');
    });

    it('respects locale', () => {
        expect(GeneralFormat.Transform('12345.6789', null, 'fr-FR')).toEqual('12345,6789');
    });
});

describe('GeneralFormatUpper', () => {
    it('shows exponent as uppercase', () => {
        expect(GeneralFormatUpper.Transform('.0000023', null, 'en-US')).toEqual('2.3E-6');
        expect(GeneralFormatUpper.Transform('1234', '2', 'en-US')).toEqual('1.2E+3');
        expect(GeneralFormatUpper.Transform('-1234', '2', 'en-US')).toEqual('-1.2E+3');       
    });
});

describe('NumericFormat', () => {
    registerLocaleData(localeFr);
    it('defaults to 2 dp', () => {
        expect(NumericFormat.Transform('12345', null, 'en-US')).toEqual('12,345.00');
        expect(NumericFormat.Transform('12345.6789', null, 'en-US')).toEqual('12,345.68');
    });

    it('transforms common values', () => {
        expect(NumericFormat.Transform('123456', '0', 'en-US')).toEqual('123,456');
        expect(NumericFormat.Transform('123456', '3', 'en-US')).toEqual('123,456.000');
        expect(NumericFormat.Transform('123456', '5', 'en-US')).toEqual('123,456.00000');
    });

    it('transforms negative values', () => {
        expect(NumericFormat.Transform('-123456', '0', 'en-US')).toEqual('-123,456');
        expect(NumericFormat.Transform('-123456', '3', 'en-US')).toEqual('-123,456.000');
        expect(NumericFormat.Transform('-123456', '5', 'en-US')).toEqual('-123,456.00000');
    });

    it('respects locale', () => {
        expect(NumericFormat.Transform('12345.6789', null, 'fr-FR')).toEqual('12 345,68');
    });
});

describe('PercentFormat', () => {
    registerLocaleData(localeFr);
    it('defaults to 2 dp', () => {
        expect(PercentFormat.Transform('12345', null, 'en-US')).toEqual('1,234,500.00%');
        expect(PercentFormat.Transform('12345.6789', null, 'en-US')).toEqual('1,234,567.89%');
    });

    it('transforms common values', () => {
        expect(PercentFormat.Transform('123456', '0', 'en-US')).toEqual('12,345,600%');
        expect(PercentFormat.Transform('123456', '3', 'en-US')).toEqual('12,345,600.000%');
        expect(PercentFormat.Transform('123456', '5', 'en-US')).toEqual('12,345,600.00000%');
    });

    it('transforms negative values', () => {
        expect(PercentFormat.Transform('-123456', '0', 'en-US')).toEqual('-12,345,600%');
        expect(PercentFormat.Transform('-123456', '3', 'en-US')).toEqual('-12,345,600.000%');
        expect(PercentFormat.Transform('-123456', '5', 'en-US')).toEqual('-12,345,600.00000%');
    });

    it('respects locale', () => {
        expect(PercentFormat.Transform('12345', null, 'fr-FR')).toEqual('1 234 500,00 %');
    });
});

describe('RoundTripFormat', () => {
    it('leaves valid numbers as is', () => {
        expect(RoundTripFormat.Transform(12345, null, 'en-US')).toEqual('12345');
        expect(RoundTripFormat.Transform('12345', null, 'en-US')).toEqual('12345');
    });

    it('transforms an input which is maintained on a second transform', () => {
        expect(RoundTripFormat.Transform('123456789123456789123456789', null, 'en-US')).toEqual('1.2345678912345679e+26');
        expect(RoundTripFormat.Transform('1.2345678912345679e+26', null, 'en-US')).toEqual('1.2345678912345679e+26');   
    });
});

describe('HexadecimalFormat', () => {
    it('prefixes no zeros as default', () => {
        expect(HexadecimalFormat.Transform('0x2045e', null, 'en-US')).toEqual('2045e');
        expect(HexadecimalFormat.Transform('123456789', null, 'en-US')).toEqual('75bcd15');
    });

    it('prefixes zeros according to the PS', () => {
        expect(HexadecimalFormat.Transform('0x2045e', '2', 'en-US')).toEqual('2045e');
        expect(HexadecimalFormat.Transform('0x2045e', '8', 'en-US')).toEqual('0002045e');
        
        expect(HexadecimalFormat.Transform('123456789', '2', 'en-US')).toEqual('75bcd15');
        expect(HexadecimalFormat.Transform('123456789', '8', 'en-US')).toEqual('075bcd15');        
    });
});

describe('HexadecimalFormatUpper', () => {
    it('prefixes no zeros as default', () => {
        expect(HexadecimalFormatUpper.Transform('0x2045e', null, 'en-US')).toEqual('2045E');
        expect(HexadecimalFormatUpper.Transform('123456789', null, 'en-US')).toEqual('75BCD15');
    });

    it('prefixes zeros according to the PS', () => {
        expect(HexadecimalFormatUpper.Transform('0x2045e', '2', 'en-US')).toEqual('2045E');
        expect(HexadecimalFormatUpper.Transform('0x2045e', '8', 'en-US')).toEqual('0002045E');
        
        expect(HexadecimalFormatUpper.Transform('123456789', '2', 'en-US')).toEqual('75BCD15');
        expect(HexadecimalFormatUpper.Transform('123456789', '8', 'en-US')).toEqual('075BCD15');        
    });
});