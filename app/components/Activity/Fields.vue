<script setup lang="ts">
import type { InsertActivity } from '~~/lib/db/schema';

import { ACTIVITY_ICON_PREFIX, DEFAULT_ACTIVITY_ICON } from '~~/lib/utils/constants';
import { isValidActivityIcon, normalizeActivityIcon } from '~~/lib/utils/icons';

const { formAction } = defineProps<{
    formAction: FormAction;
}>();

const state = defineModel<Partial<InsertActivity>>('state', {
    required: true,
});

const { formFields } = useForm('activity', formAction);

const normalizedIcon = computed(() => normalizeActivityIcon(state.value.icon || DEFAULT_ACTIVITY_ICON));
const isValidIcon = computed(() => isValidActivityIcon(state.value.icon));
</script>

<template>
    <div class="space-y-4">
        <FormField
            v-for="(field, index) in formFields"
            :key="index"
            v-model="state[field.formFieldProps.name]"
            :field
        >
            <template #icon-leading>
                <span class="text-sm text-muted">{{ ACTIVITY_ICON_PREFIX }}</span>
            </template>
            <template #icon-input-after>
                <ButtonIcon
                    :name="isValidIcon ? normalizedIcon : 'i-lucide-ban'"
                    :color="isValidIcon ? 'success' : 'error'"
                />
            </template>
            <template #icon-post>
                <div class="text-sm text-muted">
                    {{ $t('form.field.activity_icon.help') }}
                </div>
            </template>
        </FormField>
    </div>
</template>
