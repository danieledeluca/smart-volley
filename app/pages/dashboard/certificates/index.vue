<script setup lang="ts">
useSeoMeta({
    title: $t('page.certificates.title'),
});
</script>

<template>
    <EnrollmentDashboard
        :title="$t('page.certificates.title')"
        :tableColumns="['id', 'athlete', 'certificateExpirationDate', 'certificateFile']"
    />
</template>
