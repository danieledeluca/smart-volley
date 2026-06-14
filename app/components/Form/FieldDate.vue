<script setup lang="ts">
import type { CalendarProps, InputDateProps } from '@nuxt/ui';

const { inputProps } = defineProps<{
    inputProps?: InputDateProps;
    calendarProps?: CalendarProps;
}>();

const model = defineModel<string>();

const { emitFormBlur } = useFormField();

const dateModel = computed({
    get: () => stringToCalendarDate(model.value),
    set: (value) => {
        model.value = calendarDateToString(value);

        emitFormBlur();
    },
});
</script>

<template>
    <UInputDate v-model="dateModel" v-bind="inputProps" class="w-full">
        <template #trailing>
            <UPopover>
                <UButton color="neutral" variant="link" icon="i-lucide-calendar" />

                <template #content>
                    <UCalendar v-model="dateModel" v-bind="calendarProps" class="p-2" />
                </template>
            </UPopover>
        </template>
    </UInputDate>
</template>
