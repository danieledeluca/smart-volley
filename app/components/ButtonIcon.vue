<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui';

const { name, color = 'neutral' } = defineProps <{
    name: string;
    color?: ButtonProps['color'];
}>();
</script>

<template>
    <div
        class="inline-flex items-center rounded-md p-1.5"
        :class="{
            'bg-success/10 text-success': color === 'success' || color === 'primary',
            'bg-error/10 text-error': color === 'error',
            'bg-warning/10 text-warning': color === 'warning',
            'bg-info/10 text-info': color === 'info' || color === 'secondary',
            'bg-elevated': color === 'neutral',
        }"
    >
        <UIcon :name class="size-5 shrink-0" />
    </div>
</template>
