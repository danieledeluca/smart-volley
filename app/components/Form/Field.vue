<script setup lang="ts" generic="T">
const { field } = defineProps<{
    field: FilterField<T>;
}>();

const model = defineModel<string | number>();
</script>

<template>
    <div class="flex items-end gap-2">
        <UFormField
            :name="field.name"
            :label="field.label"
            class="flex-1"
            :required="field.required"
        >
            <UInput
                v-if="field.type === 'input'"
                v-bind="field"
                v-model="model"
                class="w-full"
            />
            <USelect
                v-if="field.type === 'select'"
                v-bind="field"
                v-model="model"
                class="w-full"
                valueKey="id"
            />
        </UFormField>
        <UButton
            v-if="field.type === 'select' && model"
            icon="i-lucide-x"
            variant="outline"
            color="error"
            @click.stop="model = undefined"
        />
    </div>
</template>
