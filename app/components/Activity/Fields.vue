<script setup lang="ts">
import type { InsertActivity } from '~~/lib/db/schema';

const { formAction } = defineProps<{
    formAction: FormAction;
}>();

const state = defineModel<Partial<InsertActivity>>('state', {
    required: true,
});

const authStore = useAuthStore();
const { formFields } = useForm('activity', formAction);

const { isAdmin } = storeToRefs(authStore);

function showField(fieldName: keyof InsertActivity) {
    if (fieldName === 'key') {
        return isAdmin.value;
    }

    return true;
}
</script>

<template>
    <div class="space-y-4">
        <template v-for="(field, index) in formFields" :key="index">
            <FormField v-if="showField(field.formFieldProps.name)" v-model="state[field.formFieldProps.name]" :field />
        </template>
    </div>
</template>
