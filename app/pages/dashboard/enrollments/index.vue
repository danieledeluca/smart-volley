<script setup lang="ts">
useSeoMeta({
    title: $t('page.enrollments.title'),
});
</script>

<template>
    <EnrollmentDashboard
        :title="$t('page.enrollments.title')"
        :tableColumns="['id', 'athlete', 'season', 'activity', 'course']"
    />
</template>
