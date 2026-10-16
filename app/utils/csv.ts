export async function downloadCsv(enrollmentIds?: number[]) {
    if (!enrollmentIds || enrollmentIds.length === 0) {
        return;
    }

    const response = await $fetch<Blob>('/api/enrollments/csv', {
        responseType: 'blob',
        query: {
            ids: enrollmentIds.join(','),
        },
    });

    const url = URL.createObjectURL(response);
    const link = document.createElement('a');

    link.href = url;
    link.download = enrollmentIds.length > 1 ? 'iscrizioni.csv' : `iscrizione-${enrollmentIds[0]}.csv`;

    document.body.appendChild(link);

    link.click();
    link.remove();

    URL.revokeObjectURL(url);
}
