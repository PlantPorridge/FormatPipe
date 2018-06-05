export interface IFormat {
    Transform(value: string | number, precisionSpecifier:string, locale:string): string;
}
