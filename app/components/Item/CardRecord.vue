<script setup lang="ts">
import { useClipboard } from '@vueuse/core';

const { label, value, showCopyButton = false, showPhoneNumberButtons = false, showEmailButton = false } = defineProps<{
    label: string;
    value: string;
    showCopyButton?: boolean;
    showPhoneNumberButtons?: boolean;
    showEmailButton?: boolean;
}>();

const { copy, copied } = useClipboard();
const toast = useToast();

const actionsRef = useTemplateRef('actions');
</script>

<template>
    <div class="border-b border-b-accented pb-2">
        <div class="mb-1 truncate text-sm text-muted">
            {{ label }}
        </div>
        <div class="relative flex">
            <div
                class="truncate"
                :style="{ 'max-width': `calc(100% - (var(--spacing) * 2) - ${actionsRef?.clientWidth || 0}px)` }"
            >
                {{ value }}
            </div>
            <div ref="actions" class="absolute top-1/2 right-0 flex -translate-y-1/2 gap-2">
                <UButton
                    v-if="showCopyButton"
                    variant="ghost"
                    :icon="copied ? 'i-lucide-clipboard-check' : 'i-lucide-clipboard'"
                    @click="async () => {
                        await copy(value);
                        toast.add({
                            title: $t('toast.clipboard', { name: label }),
                            color: 'success',
                            icon: 'i-lucide-circle-check',
                        });
                    }"
                />
                <template v-if="showPhoneNumberButtons">
                    <UButton
                        variant="ghost"
                        trailingIcon="i-lucide-phone"
                        :to="`tel:${formatPhoneNumber(value)}`"
                    />
                    <UButton
                        variant="ghost"
                        trailingIcon="i-ic-baseline-whatsapp"
                        :to="`https://api.whatsapp.com/send?phone=${formatPhoneNumber(value)}`"
                        target="_blank"
                    />
                </template>
                <UButton
                    v-if="showEmailButton"
                    variant="ghost"
                    trailingIcon="i-lucide-mail"
                    :to="`mailto:${value}`"
                />
                <slot />
            </div>
        </div>
    </div>
</template>
