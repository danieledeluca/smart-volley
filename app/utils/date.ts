import { CalendarDate, GregorianCalendar } from '@internationalized/date';

export function stringToCalendarDate(value: string | undefined) {
    if (!value) {
        return undefined;
    }

    const [year, month, day] = value.split('-').map(Number);

    if (!year || !month || !day) {
        return undefined;
    }

    return new CalendarDate(new GregorianCalendar(), year, month, day);
}

export function calendarDateToString(date: CalendarDate | undefined) {
    if (!date) {
        return undefined;
    }

    const mm = String(date.month).padStart(2, '0');
    const dd = String(date.day).padStart(2, '0');

    return `${date.year}-${mm}-${dd}`;
}
