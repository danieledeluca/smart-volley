<script setup lang="ts">
definePageMeta({
    middleware: 'auth',
});

useSeoMeta({
    title: $t('auth.reset_password.meta_title'),
});

const authStore = useAuthStore();
const { alerts } = storeToRefs(authStore);
</script>

<template>
    <UPageCard class="mx-auto w-full max-w-md" variant="subtle">
        <UAuthForm
            :schema="resetPasswordSchema"
            :title="$t('auth.reset_password.title')"
            :description="$t('auth.reset_password.description')"
            icon="i-lucide-lock-keyhole"
            :fields="authStore.resetPasswordFields"
            :loadingAuto="true"
            :submit="{
                label: $t('auth.reset_password.submit'),
            }"
            @submit="authStore.resetPassword"
        >
            <template #password-help>
                {{ $t('form.password.error', { min: PASSWORD_MIN_LENGTH.toString() }) }}
            </template>
            <template #validation>
                <UAlert v-for="(alert, index) in alerts" :key="index" v-bind="alert" />
            </template>
        </UAuthForm>
    </UPageCard>
</template>
