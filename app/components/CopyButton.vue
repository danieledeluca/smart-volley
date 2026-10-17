<script setup lang="ts">
import { useClipboard } from '@vueuse/core';

const { label, value } = defineProps<{
    label: string;
    value: string;
}>();

const toast = useToast();
const { copy, copied } = useClipboard();

async function handleClick() {
    await copy(value);

    toast.add({
        id: value,
        title: $t('toast.copy', { name: label }),
        color: 'success',
        icon: 'i-lucide-circle-check',
    });
}
</script>

<template>
    <UButton
        variant="ghost"
        :icon="copied ? 'i-lucide-copy-check' : 'i-lucide-copy'"
        @click="handleClick"
    />
</template>
