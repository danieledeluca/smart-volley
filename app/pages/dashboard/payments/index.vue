<script setup lang="ts">
useSeoMeta({
    title: $t('page.payments.title'),
});
</script>

<template>
    <EnrollmentDashboard
        :title="$t('page.payments.title')"
        :tableColumns="['id', 'athlete', 'firstPayment', 'secondPayment', 'thirdPayment']"
    />
</template>
