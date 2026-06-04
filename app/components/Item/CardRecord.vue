<script setup lang="ts">
const { label, value } = defineProps<{
    label: string;
    value?: string;
}>();

const slots = defineSlots<{
    default: () => VNode[];
    actions: () => VNode[];
}>();

const actionsRef = useTemplateRef('actionsRef');
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
            <div
                v-if="value && !!slots.actions"
                ref="actionsRef"
                class="absolute top-1/2 right-0 flex -translate-y-1/2 gap-2"
            >
                <slot name="actions" />
            </div>
        </div>
    </div>
</template>
