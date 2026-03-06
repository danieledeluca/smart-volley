<script setup lang="ts">
import { CalendarDate, GregorianCalendar } from '@internationalized/date';

const { fieldName } = defineProps<{
    fieldName: string;
}>();

const model = defineModel<FormFieldModelType>();

const { emitFormBlur } = useFormField({ name: fieldName });

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
    <UInputDate v-model="calendarModel" :maxValue="maxDate" class="w-full">
        <template #trailing>
            <UPopover>
                <UButton
                    color="neutral"
                    variant="link"
                    size="sm"
                    icon="i-lucide-calendar"
                    class="px-0"
                />

                <template #content>
                    <UCalendar v-model="calendarModel" class="p-2" :maxValue="maxDate" />
                </template>
            </UPopover>
        </template>
    </UInputDate>
</template>
