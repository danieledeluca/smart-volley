<script setup lang="ts">
definePageMeta({
    middleware: 'auth',
});

useSeoMeta({
    title: $t('auth.sing_in.title'),
});

const authStore = useAuthStore();
const { alerts } = storeToRefs(authStore);
</script>

<template>
    <UPageCard class="mx-auto w-full max-w-md" variant="subtle">
        <UAuthForm
            :schema="loginSchema"
            :title="$t('auth.sing_in.title')"
            icon="i-lucide-log-in"
            :fields="authStore.loginFields"
            :loadingAuto="true"
            :submit="{
                label: $t('auth.sing_in.title'),
            }"
            @submit="authStore.login"
        >
            <template #description>
                {{ $t('auth.sing_in.description') }}
                <ULink to="/account/register" class="font-medium text-primary">
                    {{ $t('auth.sign_up.title') }}
                </ULink>
            </template>
            <template #password-hint>
                <ULink to="/account/forgot-password" class="font-medium text-primary" tabindex="-1">
                    {{ $t('auth.sing_in.password_hint') }}
                </ULink>
            </template>
            <template #validation>
                <UAlert v-for="(alert, index) in alerts" :key="index" v-bind="alert" />
            </template>
        </UAuthForm>
    </UPageCard>
</template>
