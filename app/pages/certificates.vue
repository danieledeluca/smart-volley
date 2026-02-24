<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';
import type { Row, TableMeta } from '@tanstack/vue-table';

useSeoMeta({
    title: $t('page.certificates.title'),
});

const isLoading = ref(false);
const isLoaded = ref(false);
const tableData = ref<AthleteCertificate[]>([]);

const tableColumns = getTableColumns<AthleteCertificate>([
    'name',
    'certificateExpirationDate',
    'certificateDownloadUrl',
]);

const tableMeta: TableMeta<AthleteCertificate> = {
    class: {
        tr: (row: Row<AthleteCertificate>) => {
            return getCertificateDateStatus(row.original.certificateExpirationDate?.toString());
        },
    },
};

async function onSubmit(event: FormSubmitEvent<AthleteFiltersSchema>) {
    try {
        isLoading.value = true;
        isLoaded.value = false;

        const athletesCertificates = await $fetch<AthleteCertificate[]>('/api/certificates', {
            query: {
                season: event.data.season,
                activity: event.data.activity,
            },
        });

        tableData.value = athletesCertificates;
    } finally {
        isLoading.value = false;
        isLoaded.value = true;
    }
}
</script>

<template>
    <AthleteFilters
        :title="$t('page.certificates.title')"
        :isLoading
        icon="i-lucide-file"
        @submit="onSubmit"
    />
    <AthleteTable
        :isLoading
        :isLoaded
        :tableData
        :tableColumns
        :tableMeta
    />
</template>
