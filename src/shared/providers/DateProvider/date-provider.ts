export abstract class DateProvider {
  abstract compareInHours(start_date: Date, end_date: Date): number;
  abstract convertToUTC(date: Date): string;
  abstract dateNow(): Date;
  abstract dateNowFormatted(): string;
  abstract dateFormatedToLL(date: Date): string;
  abstract compareInDays(start_date: Date, end_date: Date): number;
  abstract formatDate(date: Date): string;
  abstract addSeconds(seconds: number): Date;
  abstract addMinutes(minutes: number): Date;
  abstract addDays(days: number): Date;
  abstract addHours(hours: number): Date;
  abstract compareIfBefore(start_date: Date, end_date: Date): boolean;
}
