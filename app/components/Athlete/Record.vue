<script setup lang="ts">
import { useClipboard } from '@vueuse/core';

const { label, value, showCopyButton = false } = defineProps<{
    label: string;
    value: string;
    showCopyButton?: boolean;
}>();

const { copy } = useClipboard();
const toast = useToast();
</script>

<template>
    <div class="flex items-center gap-2">
        <div class="truncate">
            <span>{{ label }}:</span> <strong>{{ value }}</strong>
        </div>
        <UButton
            v-if="showCopyButton"
            color="primary"
            variant="ghost"
            trailingIcon="i-lucide-copy"
            class="cursor-pointer"
            @click="async () => {
                await copy(value || '');
                toast.add({
                    title: `${label} copied to clipboard`,
                    color: 'success',
                    icon: 'i-lucide-circle-check',
                });
            }"
        />
        <slot />
    </div>
</template>
