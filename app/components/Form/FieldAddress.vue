<script setup lang="ts">
import type { InputProps } from '@nuxt/ui';

const { inputProps, autocompleteOptions } = defineProps<{
    inputProps?: Omit<InputProps, 'modelValue' | 'defaultValue'>;
    autocompleteOptions?: google.maps.places.AutocompleteOptions;
}>();

const model = defineModel<ParsedAddress>();

const { emitFormBlur } = useFormField();
const inputRef = useTemplateRef('inputRef');

useAutocomplete(inputRef, (address) => {
    model.value = address;

    emitFormBlur();
}, autocompleteOptions);

function handleBlur() {
    if (inputRef.value?.inputRef) {
        inputRef.value.inputRef.value = model.value?.formattedAddress || '';
    }
}
</script>

<template>
    <UInput
        ref="inputRef"
        :modelValue="model?.formattedAddress"
        v-bind="inputProps"
        class="w-full"
        @blur="handleBlur"
    />
</template>
