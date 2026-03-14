<script setup lang="ts">
import type { InputDateProps } from '@nuxt/ui';

import { CalendarDate, GregorianCalendar } from '@internationalized/date';

const { inputProps } = defineProps<{
    inputProps: InputDateProps;
}>();

const model = defineModel<FormFieldModelType>();

const { emitFormBlur } = useFormField({ name: inputProps.name });

const currentDate = new Date();
const maxDate = new CalendarDate(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());

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

const calendarModel = computed({
    get: () => stringToCalendarDate(model.value?.toString()),
    set: (value: CalendarDate | undefined) => {
        model.value = calendarDateToString(value);

        emitFormBlur();
    },
});
</script>

<template>
    <UInputDate
        v-model="calendarModel"
        v-bind="inputProps"
        :maxValue="maxDate"
        class="w-full"
        :ui="{ trailing: 'pr-1' }"
    >
        <template #trailing>
            <UPopover>
                <UButton
                    color="neutral"
                    variant="link"
                    size="sm"
                    icon="i-lucide-calendar"
                />

                <template #content>
                    <UCalendar
                        v-model="calendarModel"
                        class="p-2"
                        :maxValue="maxDate"
                    />
                </template>
            </UPopover>
        </template>
    </UInputDate>
</template>
