<script setup lang="ts">
definePageMeta({
    middleware: 'auth',
});

useSeoMeta({
    title: $t('auth.forgot_password.meta_title'),
});

const authStore = useAuthStore();
const { alerts } = storeToRefs(authStore);
</script>

<template>
    <UPageCard class="mx-auto w-full max-w-md" variant="subtle">
        <UAuthForm
            :schema="forgotPasswordSchema"
            :title="$t('auth.forgot_password.title')"
            :description="$t('auth.forgot_password.description')"
            icon="i-lucide-key-round"
            :fields="authStore.forgotPasswordFields"
            :loadingAuto="true"
            :submit="{
                label: $t('auth.forgot_password.submit'),
            }"
            @submit="authStore.forgotPassword"
        >
            <template #validation>
                <UAlert v-for="(alert, index) in alerts" :key="index" v-bind="alert" />
            </template>
        </UAuthForm>
    </UPageCard>
</template>
