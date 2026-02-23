<script setup lang="ts">
import { useClipboard } from '@vueuse/core';

const { label, value, showCopyButton = false } = defineProps<{
    label: string;
    value: string;
    showCopyButton?: boolean;
}>();

const { copy } = useClipboard();
const toast = useToast();

const actions = ref<HTMLElement | null>(null);
</script>

<template>
    <div class="grid gap-x-2 @2xl:grid-cols-3">
        <div class="truncate text-muted">
            {{ label }}
        </div>
        <div class="relative flex gap-2 @2xl:col-span-2">
            <strong
                class="truncate"
                :style="{ 'max-width': `calc(100% - (var(--spacing) * 2) - ${actions?.clientWidth || 0}px)` }"
            >
                {{ value }}
            </strong>
            <div ref="actions" class="absolute top-1/2 right-0 flex -translate-y-1/2 gap-2">
                <UButton
                    v-if="showCopyButton"
                    color="primary"
                    variant="ghost"
                    trailingIcon="i-lucide-clipboard"
                    class="cursor-pointer"
                    @click="async () => {
                        await copy(value || '');
                        toast.add({
                            title: $t('toast.clipboard', { name: label }),
                            color: 'success',
                            icon: 'i-lucide-circle-check',
                        });
                    }"
                />
                <slot />
            </div>
        </div>
    </div>
</template>
