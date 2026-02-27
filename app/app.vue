<script setup lang="ts">
useHead({
    titleTemplate: (titleChunk) => {
        return titleChunk ? `${titleChunk} | Smart Volley` : 'Smart Volley';
    },
});
</script>

<template>
    <UApp>
        <AppHeader />
        <UMain class="py-8">
            <UContainer>
                <NuxtPage />
            </UContainer>
        </UMain>
        <AppFooter />
    </UApp>
</template>
