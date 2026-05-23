<script setup lang="ts">
import { InsertSeason } from '~~/lib/db/schema';

const seasonsStore = useSeasonsStore();
const { isLoading, addingSeasonErrors, seasonAddState, seasonAddFields } = storeToRefs(seasonsStore);

const formRef = useTemplateRef('formRef');

watch(addingSeasonErrors, (newErrors) => {
    formRef.value?.setErrors(newErrors);
});

defineExpose({
    submit: () => formRef.value?.submit(),
});
</script>

<template>
    <UForm
        ref="formRef"
        :schema="InsertSeason"
        :state="seasonAddState"
        class="grid gap-8"
        @submit="seasonsStore.addSeason"
    >
        <FormField
            v-for="(field, index) in seasonAddFields"
            :key="index"
            v-model="seasonAddState[field.formFieldProps.name]"
            :field
        />
        <UButton
            type="submit"
            :label="$t('form.button.add')"
            :loading="isLoading"
            class="hidden"
            block
        />
    </UForm>
</template>
