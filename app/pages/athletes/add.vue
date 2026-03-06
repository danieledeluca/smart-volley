<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';
import type { AthleteUncheckedCreateInput } from '~~/prisma/generated/prisma/models';
import type { FetchError } from 'ofetch';

import z from 'zod';

const toast = useToast();
const enrollmentsStore = useEnrollmentsStore();
const { parents, parentsPending } = storeToRefs(enrollmentsStore);

const formRef = useTemplateRef('form');

const schema: z.ZodType<AthleteUncheckedCreateInput> = z.object({
    name: z.string('Name is required').nonempty('Name is required').transform((name) => name.toUpperCase()),
    birthday: z.coerce.date('Birthday is required').max(new Date(), 'Birthday must be in the past'),
    birthplace: z.string('Birthplace is required').nonempty('Birthplace is required'),
    tax_code: z.string('Tax Code is required')
        .regex(/^[A-Z]{6}\d{2}[A-EHLMPR-T](\d{2})[A-Z]\d{3}[A-Z]$/, 'Invalid Fiscal Code format'),
    city: z.string('City is required').nonempty('City is required'),
    address: z.string('Address is required').nonempty('Address is required'),
    phone_number: z.string('Phone number is required').nonempty('Phone number is required'),
    email: z.string().optional(),
    parent_id: z.number().optional(),
});

type AthleteForm = z.infer<typeof schema>;

const state = reactive<Partial<AthleteForm>>({
    name: undefined,
    birthday: undefined,
    birthplace: undefined,
    tax_code: undefined,
    city: undefined,
    address: undefined,
    phone_number: undefined,
    email: undefined,
    parent_id: undefined,
});

const isLoading = ref(false);

async function onSubmit(event: FormSubmitEvent<AthleteForm>) {
    isLoading.value = true;

    try {
        await $fetch('/api/athletes/add', {
            method: 'POST',
            body: event.data,
        });

        enrollmentsStore.refreshAthletes();

        toast.add({
            title: 'Athlete added successfully',
            color: 'success',
            icon: 'i-lucide-circle-check',

        });
    } catch (err) {
        const error = err as FetchError;

        toast.add({
            title: error.message,
            color: 'error',
            icon: 'i-lucide-circle-x',
        });
    } finally {
        isLoading.value = false;
    }
}

const formFields = computed<FormField<AthleteForm>[]>(() => {
    return [
        {
            renderAs: 'input',
            label: 'Nome e cognome',
            name: 'name',
            placeholder: 'Enter your name',
            required: true,
        },
        {
            renderAs: 'input-date',
            label: 'Birthday',
            name: 'birthday',
            required: true,
        },
        {
            renderAs: 'input',
            label: 'Birthplace',
            name: 'birthplace',
            placeholder: 'Enter your birthplace',
            required: true,
        },
        {
            renderAs: 'input',
            label: 'Tax code',
            name: 'tax_code',
            placeholder: 'Enter your tax code',
            required: true,
        },
        {
            renderAs: 'input',
            label: 'City',
            name: 'city',
            placeholder: 'Enter your city',
            required: true,
        },
        {
            renderAs: 'input',
            label: 'Address',
            name: 'address',
            placeholder: 'Enter your address',
            required: true,
        },
        {
            renderAs: 'input',
            label: 'Phone number',
            type: 'tel',
            name: 'phone_number',
            placeholder: 'Enter your phone number',
            required: true,
        },
        {
            renderAs: 'input',
            label: 'Email',
            type: 'email',
            name: 'email',
            placeholder: 'Enter your email',
        },
        {
            renderAs: 'select-menu',
            label: 'Parent',
            name: 'parent_id',
            items: parents.value,
            loading: parentsPending.value,
            placeholder: 'Select your parent',
        },
    ];
});
</script>

<template>
    <UPageHeader title="New athletes" />
    <UCard class="lg:max-w-lg" variant="subtle">
        <UForm
            ref="form"
            :schema
            :state
            class="grid gap-4"
            @submit="onSubmit"
        >
            <FormField
                v-for="(field, index) in formFields"
                :key="index"
                v-model="state[field.name] as FormFieldModelType"
                :field
            />
            <UButton
                type="submit"
                label="Submit"
                :loading="isLoading"
                class="hidden"
                block
            />
        </UForm>
        <template #footer>
            <UButton
                type="button"
                label="Submit"
                :loading="isLoading"
                block
                @click="formRef?.submit()"
            />
        </template>
    </UCard>
</template>
