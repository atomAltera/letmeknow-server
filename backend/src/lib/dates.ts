/**
 * Takes date and number of seconds and returns new date in past
 * @param date
 * @param seconds
 */
export const secondsAgo = (date: Date, seconds: number): Date => {
    return new Date(date.getTime() - (seconds * 1000));
}
