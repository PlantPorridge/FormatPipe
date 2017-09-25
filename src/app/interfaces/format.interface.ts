export interface IFormat {
    Transform(value: string | number, precisionSpecifier:number, locale:string): string;
}
