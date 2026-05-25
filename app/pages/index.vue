<script setup lang="ts">
import type { PageFeatureProps } from '@nuxt/ui';

const authStore = useAuthStore();
const { user, canView } = storeToRefs(authStore);

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
    >
        <template #links>
            <AuthButton
                v-if="!user"
                :buttonProps="{
                    variant: 'soft',
                    color: 'neutral',
                    size: 'xl',
                }"
            />
            <UButton
                v-else-if="canView"
                label="Dashboard"
                to="/dashboard"
                icon="i-lucide-layout-dashboard"
                size="xl"
            />
        </template>
    </UPageHero>

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
        <NuxtImg src="authentication.svg" class="w-full" />
    </UPageSection>
</template>
