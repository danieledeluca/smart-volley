<script setup lang="ts">
import { InsertSeason } from '~~/lib/db/schema';

const { showSubmitButton = false } = defineProps<{
    showSubmitButton?: boolean;
}>();

const seasonsStore = useSeasonsStore();
const { isAddingSeason, addingSeasonErrors, seasonAddState, seasonAddFields } = storeToRefs(seasonsStore);

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
            :loading="isAddingSeason"
            :class="{ hidden: !showSubmitButton }"
            block
        />
    </UForm>
</template>
