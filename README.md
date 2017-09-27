# Format Pipe [![Build Status](https://travis-ci.org/PlantPorridge/FormatPipe.svg?branch=master)](https://travis-ci.org/PlantPorridge/FormatPipe) [![Coverage Status](https://coveralls.io/repos/github/PlantPorridge/FormatPipe/badge.svg?branch=master)](https://coveralls.io/github/PlantPorridge/FormatPipe?branch=master)

## Synopsis

This project provides a single Angular Pipe that takes any [Standard Numeric Format Strings](https://docs.microsoft.com/en-us/dotnet/standard/base-types/standard-numeric-format-strings) from .NET and formats the value accordingly. It also covers all DateTime formats listed [here](https://next.angular.io/api/common/DatePipe).

## Motivation

Working in a .NET enviroment we have access to handy formatting of currencies, decimals, exponents and more thanks to [Standard Numeric Format Strings](https://docs.microsoft.com/en-us/dotnet/standard/base-types/standard-numeric-format-strings). Angular also provides great out-the-box formatting tools in the form of Pipes but doesn't cover all the cases from .NET nor does it provide a single formatting Pipe- You currently need to use a different Pipe for Currency, Decimal or Percentage. 

The motivation behind this project stems from migrating a data-driven C#/.NET Application into Angular with a consistent backend. Values provided to Application were delivered in a standard numeric format along with the format string and the Application was tasked with displaying the value with the specified format. This Pipe has been created in order to have a single place to pump in the value and format and generate the formatted value with no additional code.

## Installation

```sh
npm install --save ng-format-pipe
```

```javascript
import { FormatPipe } from 'ng-format-pipe';

@NgModule({
  declarations: [
    AppComponent,
    FormatPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "en-GB" }
  ],
  bootstrap: [AppComponent]
})
```

## How To Use

```javascript
value | format[:standardNumericFormat]
```

**value** = The unformatted numeric value you wish to format   
**format** = The name of the pipe (this does not change)   
**standardNumericFormat** = The format you want to achieve (e.g. c2)   

Example results:

| value         | standardNumericFormat  | Result  |
| ------------- |:-------------| :-----     |
| 123.456       | C2            | $123.46    |
| 123456        | D10           | 0000123456 |
| 123456        | E0            | 1E+5       |

#### Locale

The Format Pipe will respect the locale set by you application.
If you are using a locale outside of the default 'en' please ensure you load in the extra locale data:

```javascript
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

//And then run this somewhere prior to using the Pipe.
registerLocaleData(localeFr); 
```

## Tests

Clone the repository then run:

```sh
npm install
ng test
```

## Contributors

- Any contribution is appreciated.
- Angular [Commit Message Format](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit) is preferred.

#### Submitting a Pull Request (PR)
1. Clone the project via:
  ```
  $ git clone https://github.com/PlantPorridge/FormatPipe.git
  ```
  
2. Make your changes in a new git branch:
  ```
  $ git checkout -b my-branch master
  ```
  
3. Add your changes, including appropriate test cases.

4. Push your branch to Github.

5. Create a PR to master.

## License

MIT