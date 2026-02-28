<script setup lang="ts">
definePageMeta({
    middleware: 'auth',
});

useSeoMeta({
    title: $t('auth.sign_up.default'),
});

const authStore = useAuthStore();
const { alerts } = storeToRefs(authStore);
</script>

<template>
    <UPageCard class="mx-auto w-full max-w-md" variant="subtle">
        <UAuthForm
            :schema="registerSchema"
            :title="$t('auth.sign_up.default')"
            icon="i-lucide-user-plus"
            :fields="authStore.registerFields"
            :loadingAuto="true"
            :submit="{
                label: $t('auth.sign_up.submit'),
            }"
            @submit="authStore.register"
        >
            <template #description>
                {{ $t('auth.sign_up.description') }}
                <ULink to="/account/login" class="font-medium text-primary">
                    {{ $t('auth.sing_in.default') }}
                </ULink>
            </template>
            <template #password-help>
                {{ $t('form.password.error', { min: PASSWORD_MIN_LENGTH.toString() }) }}
            </template>
            <template #validation>
                <UAlert v-for="(alert, index) in alerts" :key="index" v-bind="alert" />
            </template>
        </UAuthForm>
    </UPageCard>
</template>
