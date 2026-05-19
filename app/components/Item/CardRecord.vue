<script setup lang="ts">
import { useClipboard } from '@vueuse/core';

const { label, value, showCopyButton, showPhoneNumberButtons, showEmailButton } = defineProps<{
    label: string;
    value?: string;
    showCopyButton?: boolean;
    showPhoneNumberButtons?: boolean;
    showEmailButton?: boolean;
}>();

const slots = defineSlots();

const { copy, copied } = useClipboard();
const toast = useToast();

const actionsRef = useTemplateRef('actionsRef');

const PhoneNumberButtons = getPhoneNumberButtonsNode(value || null);
const EmailButton = getEmailButtonNode(value || null);
</script>

<template>
    <div class="border-b border-b-accented pb-2">
        <div class="mb-1 truncate text-sm text-muted">
            {{ label }}
        </div>
        <div v-if="value || !!slots.default" class="relative flex">
            <slot>
                <div
                    class="truncate"
                    :style="{ 'max-width': `calc(100% - (var(--spacing) * 2) - ${actionsRef?.clientWidth || 0}px)` }"
                >
                    {{ value }}
                </div>
            </slot>
            <div v-if="value" ref="actionsRef" class="absolute top-1/2 right-0 flex -translate-y-1/2 gap-2">
                <UButton
                    v-if="showCopyButton"
                    variant="ghost"
                    :icon="copied ? 'i-lucide-copy-check' : 'i-lucide-copy'"
                    @click="async () => {
                        await copy(value);

                        toast.add({
                            id: value,
                            title: $t('toast.copy', { name: label }),
                            color: 'success',
                            icon: 'i-lucide-circle-check',
                        });
                    }"
                />
                <PhoneNumberButtons v-if="showPhoneNumberButtons" />
                <EmailButton v-if="showEmailButton" />
            </div>
        </div>
    </div>
</template>
