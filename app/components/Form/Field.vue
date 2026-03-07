<script setup lang="ts" generic="T extends Record<string, FormFieldModelType>">
const { field } = defineProps<{
    field: FormField<T>;
}>();

const slots = defineSlots();

const model = defineModel<T[keyof T]>();
</script>

<template>
    <div class="flex items-end gap-2">
        <UFormField
            :name="field.name"
            :label="field.label"
            class="flex-1"
            :required="field.required"
        >
            <template v-if="field.renderAs.startsWith('input')">
                <UInput
                    v-if="field.renderAs === 'input'"
                    v-model="model"
                    :placeholder="field.placeholder"
                    class="w-full"
                />
                <FormFieldDate v-else-if="field.renderAs === 'input-date'" v-model="model" :fieldName="field.name" />
            </template>
            <template v-else-if="field.renderAs.startsWith('select')">
                <USelect
                    v-if="field.renderAs === 'select'"
                    v-model="model"
                    :placeholder="field.placeholder"
                    :loading="field.loading"
                    :items="field.items"
                    :disabled="field.items?.length === 0"
                    class="w-full"
                />
                <USelectMenu
                    v-if="field.renderAs === 'select-menu'"
                    v-model="model"
                    :placeholder="field.placeholder"
                    :loading="field.loading"
                    :items="field.items"
                    :disabled="field.items?.length === 0"
                    class="w-full"
                    valueKey="value"
                    :searchInput="{
                        placeholder: 'Cerca...',
                    }"
                >
                    <template #empty>
                        Nessun risultato trovato
                    </template>
                </USelectMenu>
            </template>
            <template v-if="!!slots[`${field.name}-hint`]" #hint>
                <slot :name="`${field.name}-hint`" />
            </template>
        </UFormField>
        <UButton
            v-if="field.renderAs.startsWith('select') && model"
            icon="i-lucide-x"
            variant="outline"
            color="error"
            @click.stop="model = undefined"
        />
    </div>
</template>
