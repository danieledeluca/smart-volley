export function formatDate(date: string | null) {
    const formatter = new Intl.DateTimeFormat('it-IT');

    return date ? formatter.format(new Date(date)) : EMPTY_VALUE;
}

export function formatPrice(price: string | null) {
    const formatter = new Intl.NumberFormat('it-IT', {
        style: 'currency',
        currency: 'EUR',
    });

    return price ? formatter.format(Number(price)) : EMPTY_VALUE;
}
