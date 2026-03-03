<script setup lang="ts" generic="T extends z.ZodType">
import type { FormSubmitEvent, InferInput } from '@nuxt/ui';
import type z from 'zod';

type FormData = InferInput<T>;

const { isLoading, schema, fields } = defineProps<{
    isLoading: boolean;
    schema: T;
    fields: FilterField<FormData>[];
}>();

const emit = defineEmits<{
    submit: [event: FormSubmitEvent<FormData>];
}>();

const state = defineModel<Partial<FormData>>('state', {
    required: true,
});

const formRef = useTemplateRef('form');
</script>

<template>
    <UCard variant="subtle">
        <UForm
            ref="form"
            :schema="schema"
            :state="state"
            class="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4"
            @submit="emit('submit', $event)"
        >
            <!-- @vue-ignore -->
            <FormField
                v-for="(field, index) in fields"
                :key="index"
                v-model="state[field.name]"
                :field
            />
            <UButton
                type="submit"
                :loading="isLoading"
                class="hidden"
                :label="$t('form.search.submit')"
            />
        </UForm>
        <template #footer>
            <UButton
                type="button"
                :loading="isLoading"
                icon="i-lucide-search"
                block
                :label="$t('form.search.submit')"
                @click="formRef?.submit()"
            />
        </template>
    </UCard>
</template>
