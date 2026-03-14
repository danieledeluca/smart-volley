import type { FormSubmitEvent } from '@nuxt/ui';
import type { NitroFetchRequest } from 'nitropack';
import type { FetchError } from 'ofetch';

export function useAddForm<T extends Record<string, unknown>>(
    initialState: Partial<T>,
    refresh: () => Promise<void>,
    endPoint: NitroFetchRequest,
    successMessage: string,
) {
    const toast = useToast();

    const showAddForm = ref(false);
    const isAdding = ref(false);

    const state = reactive({ ...initialState });

    const closeAddForm = () => {
        // Hide form
        showAddForm.value = false;

        // Reset form
        Object.assign(state, initialState);

        // Refresh
        refresh();
    };

    const add = async (event: FormSubmitEvent<T>) => {
        isAdding.value = true;

        try {
            await $fetch(endPoint, {
                method: 'POST',
                body: event.data,
            });

            closeAddForm();

            toast.add({
                title: successMessage,
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
            isAdding.value = false;
        }
    };

    return {
        showAddForm,
        isAdding,
        state,
        add,
    };
}
