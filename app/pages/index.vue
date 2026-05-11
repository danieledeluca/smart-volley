<script setup lang="ts">
import type { PageCardProps, PageFeatureProps } from '@nuxt/ui';

const authStore = useAuthStore();
const { user, canView } = storeToRefs(authStore);

const cards: PageCardProps[] = [
    {
        title: $t('page.home.card.athletes.title'),
        description: $t('page.home.card.athletes.description'),
        icon: 'i-lucide-users',
        to: canView.value ? '/athletes' : undefined,
        variant: 'subtle',
    },
    {
        title: $t('page.home.card.enrollments.title'),
        description: $t('page.home.card.enrollments.description'),
        icon: 'i-lucide-list',
        to: canView.value ? '/enrollments' : undefined,
        variant: 'subtle',
    },
    {
        title: $t('page.home.card.payments.title'),
        description: $t('page.home.card.payments.description'),
        icon: 'i-lucide-credit-card',
        to: canView.value ? '/payments' : undefined,
        variant: 'subtle',
    },
    {
        title: $t('page.home.card.certificates.title'),
        description: $t('page.home.card.certificates.description'),
        icon: 'i-lucide-briefcase-medical',
        to: canView.value ? '/certificates' : undefined,
        variant: 'subtle',
    },
];

const features: PageFeatureProps[] = [
    {
        title: $t('page.home.feature.manager.title'),
        description: $t('page.home.feature.manager.description'),
        icon: 'i-lucide-shield-check',
    },
    {
        title: $t('page.home.feature.viewer.title'),
        description: $t('page.home.feature.viewer.description'),
        icon: 'i-lucide-eye',
    },
];
</script>

<template>
    <UPageHero
        :headline="$t('page.home.hero.head_line')"
        :title="$t('page.home.hero.title')"
        :description="$t('page.home.hero.description')"
    />

    <USeparator icon="i-lucide-volleyball" />

    <UPageSection
        :headline="$t('page.home.section.headline')"
        :title="$t('page.home.section.title')"
        :features
        orientation="horizontal"
    >
        <template #description>
            <div v-html="$t('page.home.section.description')" />
        </template>
        <template v-if="!user" #links>
            <AuthButton variant="solid" color="primary" size="xl" />
        </template>
        <NuxtImg src="authentication.svg" class="w-full" />
    </UPageSection>

    <UPageGrid class="p-4 sm:p-6 lg:grid-cols-4 lg:p-8">
        <div v-for="(card, index) in cards" :key="index" class="relative">
            <UTooltip v-if="!user" :text="$t('page.home.card.tooltip')" :delayDuration="200">
                <UButton
                    color="neutral"
                    variant="subtle"
                    size="sm"
                    icon="i-lucide-lock"
                    class="absolute top-0 right-0 z-10 translate-x-1/2 -translate-y-1/2 rounded-full"
                />
            </UTooltip>
            <UPageCard v-bind="card" />
        </div>
    </UPageGrid>
</template>
