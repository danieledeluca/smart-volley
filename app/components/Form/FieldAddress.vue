<script setup lang="ts">
import type { InputProps } from '@nuxt/ui';

const { inputProps, autocompleteOptions } = defineProps<{
    inputProps?: Omit<InputProps, 'modelValue' | 'defaultValue'>;
    autocompleteOptions?: google.maps.places.AutocompleteOptions;
}>();

const model = defineModel<ParsedAddress>();

const { emitFormBlur } = useFormField();
const inputRef = useTemplateRef('inputRef');
const { parsedAddress, hasValidSelection } = useAutocomplete(inputRef, autocompleteOptions);

function handleBlur() {
    if (!hasValidSelection.value && inputRef.value?.inputRef) {
        inputRef.value.inputRef.value = '';

        emitFormBlur();
    }
}

watch(parsedAddress, (newParsedAddress) => {
    model.value = newParsedAddress;

    emitFormBlur();
});
</script>

<template>
    <UInput
        ref="inputRef"
        :modelValue="model?.formattedAddress"
        v-bind="inputProps"
        class="w-full"
        role="presentation"
        @blur="handleBlur"
    />
</template>
