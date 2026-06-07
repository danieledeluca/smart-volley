<script setup lang="ts">
import type { InputNumberProps } from '@nuxt/ui';

const { inputProps } = defineProps<{
    inputProps?: InputNumberProps;
}>();

const model = defineModel<string | number>();

const { emitFormBlur } = useFormField();

const numberModel = computed({
    get: () => model.value ? Number(model.value) : undefined,
    set: (value) => {
        model.value = value?.toString();

        emitFormBlur();
    },
});
</script>

<template>
    <UInputNumber v-model="numberModel" v-bind="inputProps" class="w-full" />
</template>
