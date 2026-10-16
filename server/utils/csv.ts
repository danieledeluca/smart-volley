import type { SelectEnrollmentsForExport } from '~~/lib/db/schema';

type CsvRow = Record<string, string | number | null | undefined>;

function escape(value: string | number | null | undefined) {
    let text = value === null || value === undefined ? '' : String(value);

    if (/^[=+\-@\t\r]/.test(text) && Number.isNaN(Number(text))) {
        text = `'${text}`;
    }

    return /[";\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

export function enrollmentCsv(enrollments: SelectEnrollmentsForExport[]) {
    return enrollments.reduce<CsvRow[]>((acc, enrollment) => {
        if (enrollment) {
            const { season, course, athlete } = enrollment;

            acc.push({
                id: enrollment.id,
                stagione: `${season.startYear}/${season.endYear}`,
                attivita: course.activity.name,
                corso: `${course.code} - ${course.name}`,
                atleta: athlete.name,
                codice_fiscale_atleta: athlete.fiscalCode,
                data_nascita: athlete.birthdate,
                luogo_nascita: athlete.birthplaceCity
                    || athlete.birthplaceProvince
                    || athlete.birthplaceRegion
                    || athlete.birthplaceCountry
                    || athlete.birthplaceFormattedAddress,
                citta: athlete.addressCity,
                indirizzo: athlete.addressStreet,
                genitore: athlete.parent?.name,
                codice_fiscale_genitore: athlete.parent?.fiscalCode,
                primo_pagamento: enrollment.firstPayment,
                primo_pagamento_data: enrollment.firstPaymentDate,
                primo_pagamento_tipo: enrollment.firstPaymentType,
                secondo_pagamento: enrollment.secondPayment,
                secondo_pagamento_data: enrollment.secondPaymentDate,
                secondo_pagamento_tipo: enrollment.secondPaymentType,
                terzo_pagamento: enrollment.thirdPayment,
                terzo_pagamento_data: enrollment.thirdPaymentDate,
                terzo_pagamento_tipo: enrollment.thirdPaymentType,
                scadenza_certificato: enrollment.certificateExpirationDate,
            });
        }

        return acc;
    }, []);
}

export function toCsv(rows: CsvRow[]) {
    if (rows.length === 0) {
        return '';
    }

    const headers = Object.keys(rows[0]!);

    const lines = [
        headers.map(escape).join(';'),
        ...rows.map((row) => headers.map((header) => escape(row[header])).join(';')),
    ];

    return `\uFEFF${lines.join('\r\n')}`;
}
