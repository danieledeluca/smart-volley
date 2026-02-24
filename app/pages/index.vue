<script setup lang="ts">
import type { PageCardProps } from '@nuxt/ui';

const cards: PageCardProps[] = [
    {
        title: $t('page.home.card.personal_data.title'),
        description: $t('page.home.card.personal_data.description'),
        icon: 'i-lucide-users',
        to: '/athletes',
        variant: 'subtle',
    },
    {
        title: $t('page.home.card.payments.title'),
        description: $t('page.home.card.payments.description'),
        icon: 'i-lucide-credit-card',
        to: '/payments',
        variant: 'subtle',
    },
    {
        title: $t('page.home.card.certificates.title'),
        description: $t('page.home.card.certificates.description'),
        icon: 'i-lucide-file',
        to: '/certificates',
        variant: 'subtle',
    },
    {
        title: $t('page.home.card.contacts.title'),
        description: $t('page.home.card.contacts.description'),
        icon: 'i-lucide-notebook',
        to: '/contacts',
        variant: 'subtle',
    },
];
</script>

<template>
    <UPageHero
        :headline="$t('page.home.hero.head_line')"
        :title="$t('page.home.hero.title')"
        :description="$t('page.home.hero.description')"
    />

    <UPageGrid class="lg:grid-cols-4">
        <UPageCard v-for="(card, index) in cards" :key="index" v-bind="card" />
    </UPageGrid>
</template>
