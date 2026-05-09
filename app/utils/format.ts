export function formatDate(date: string) {
    const formatter = new Intl.DateTimeFormat('it-IT', {
        dateStyle: 'long',
    });

    return formatter.format(new Date(date));
}

export function formatPrice(price: string) {
    const formatter = new Intl.NumberFormat('it-IT', {
        style: 'currency',
        currency: 'EUR',
    });

    return formatter.format(Number(price));
}

export function formatPhoneNumber(phoneNumber: string) {
    return phoneNumber.replace(/\D/g, '');
}
