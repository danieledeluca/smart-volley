<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui';
import type { FetchError } from 'ofetch';

const { enrollmentId, buttonProps } = defineProps<{
    enrollmentId: number;
    buttonProps?: Omit<ButtonProps, 'variant' | 'label' | 'icon' | 'loadingAuto'>;
}>();

const toast = useToast();

async function handleClick() {
    try {
        const { url } = await $fetch(`/api/enrollments/${enrollmentId.toString()}/certificate`);

        window.open(url, '_blank');
    } catch (err) {
        const error = err as FetchError;

        toast.add({
            description: error.statusMessage || DEFAULT_SERVER_ERROR_MESSAGE,
            color: 'error',
            icon: 'i-lucide-circle-x',
        });
    }
}
</script>

<template>
    <UButton
        v-bind="buttonProps"
        variant="soft"
        :label="$t('form.button.download')"
        icon="i-lucide-download"
        :loadingAuto="true"
        @click="handleClick"
    />
</template>
