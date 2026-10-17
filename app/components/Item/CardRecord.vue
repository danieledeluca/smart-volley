<script setup lang="ts">
const { label, value } = defineProps<{
    label: string;
    value?: string | null;
}>();

const slots = defineSlots<{
    default?: (props?: object) => VNode[];
    actions?: (props?: object) => VNode[];
}>();

const actionsRef = useTemplateRef('actionsRef');
</script>

<template>
    <div class="border-b border-b-accented pb-2">
        <div class="mb-1 truncate text-sm text-muted">
            {{ label }}
        </div>
        <div class="relative flex">
            <slot>
                <div
                    class="truncate"
                    :class="!!slots.actions ? 'max-w-[calc(100%-(var(--spacing)*2)-var(--action-width))]' : undefined"
                    :style="{ '--action-width': !!slots.actions ? `${actionsRef?.clientWidth || 0}px` : undefined }"
                >
                    {{ value ?? EMPTY_VALUE }}
                </div>
            </slot>
            <div ref="actionsRef" class="absolute top-1/2 right-0 flex -translate-y-1/2 gap-2">
                <slot name="actions" />
            </div>
        </div>
    </div>
</template>
