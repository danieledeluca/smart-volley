<script setup lang="ts">
import type { CalendarProps, InputDateProps } from '@nuxt/ui';

import { CalendarDate, GregorianCalendar } from '@internationalized/date';

const { inputProps } = defineProps<{
    inputProps?: InputDateProps;
    calendarProps?: CalendarProps;
}>();

const model = defineModel<string>();

const { emitFormBlur } = useFormField();

function stringToCalendarDate(value: string | undefined) {
    if (!value) {
        return undefined;
    }

    const [year, month, day] = value.split('-').map(Number);

    if (!year || !month || !day) {
        return undefined;
    }

    return new CalendarDate(new GregorianCalendar(), year, month, day);
}

function calendarDateToString(date: CalendarDate | undefined) {
    if (!date) {
        return undefined;
    }

    const mm = String(date.month).padStart(2, '0');
    const dd = String(date.day).padStart(2, '0');

    return `${date.year}-${mm}-${dd}`;
}

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
