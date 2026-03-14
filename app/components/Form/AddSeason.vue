<script setup lang="ts">
const seasonsStore = useSeasonsStore();
const { isAddingSeason, seasonAddState, seasonAddFields } = storeToRefs(seasonsStore);

const formRef = useTemplateRef('form');

defineExpose({
    submit: () => formRef.value?.submit(),
});
</script>

<template>
    <UForm
        ref="form"
        :schema="seasonAddSchema"
        :state="seasonAddState"
        class="grid gap-4"
        @submit="seasonsStore.addSeason"
    >
        <FormField
            v-for="(field, index) in seasonAddFields"
            :key="index"
            v-model="(seasonAddState[field.name] as FormFieldModelType)"
            :field
        />
        <UButton
            type="submit"
            :label="$t('form.button.add')"
            class="hidden"
            :loading="isAddingSeason"
            block
        />
    </UForm>
</template>
