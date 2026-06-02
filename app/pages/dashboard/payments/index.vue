<script setup lang="ts">
useSeoMeta({
    title: $t('page.payments.title'),
});
</script>

<template>
    <EnrollmentDashboard
        :title="$t('page.payments.title')"
        :tableColumns="[
            'id',
            'athlete',
            'volleyAccount',
            'volleyBalance',
            'volleyBalanceSecondary',
            'firstInstallment',
            'secondInstallment',
            'thirdInstallment',
        ]"
    />
</template>
