import type { TableColumn } from '@nuxt/ui';
import type { PaginationState, SortDirection, SortingState } from '@tanstack/vue-table';
import type { MaybeRefOrGetter } from 'vue';

import { refDebounced } from '@vueuse/core';
import { toValue } from 'vue';
import z from 'zod';

const DEFAULT_SORT_FIELD = 'id';
const DEFAULT_SORT_ORDER: SortDirection = 'desc';

export function useTableStates<T>(
    tableData: MaybeRefOrGetter<T[] | undefined>,
    tableColumns?: TableColumn<T>[],
    sortField?: keyof T,
    sortOrder?: SortDirection,
    enableSorting = true,
) {
    const { getQuery, getQueryValue, setQueryValues } = useQuery();

    // Global filter
    const globalFilter = ref(getQueryValue('filter'));
    const globalFilterDebounced = refDebounced(globalFilter, 300);

    // Pagination
    const pagination = ref<PaginationState>({
        pageIndex: 0,
        pageSize: 5,
    });

    const currentPage = computed(() => {
        const data = toValue(tableData);

        return {
            start: data && data.length > 0
                ? pagination.value.pageIndex * pagination.value.pageSize + 1
                : 0,
            end: Math.min(
                pagination.value.pageIndex * pagination.value.pageSize + pagination.value.pageSize,
                data?.length || 0,
            ),
        };
    });

    // Sorting
    const sorting = ref<SortingState>([]);

    if (enableSorting) {
        const initialSort = {
            id: sortField?.toString() || DEFAULT_SORT_FIELD,
            desc: (sortOrder || DEFAULT_SORT_ORDER) === 'desc',
        };
        const SortQuerySchema = z.object({
            'sort:field': z.string()
                .refine((sortFieldQuery) => tableColumns?.some((column) => column.id === sortFieldQuery))
                .optional(),
            'sort:order': z.enum<SortDirection[]>(['asc', 'desc']).optional(),
        });
        const sortQueryResult = SortQuerySchema.safeParse(getQuery());

        if (sortQueryResult.success) {
            const sortFieldQuery = sortQueryResult.data['sort:field'];
            const sortOrderQuery = sortQueryResult.data['sort:order'];

            if (sortFieldQuery !== undefined || sortOrderQuery !== undefined) {
                initialSort.id = sortFieldQuery ?? DEFAULT_SORT_FIELD;
                initialSort.desc = sortOrderQuery === undefined
                    ? DEFAULT_SORT_ORDER === 'desc'
                    : sortOrderQuery === 'desc';
            }
        }

        if (tableColumns?.some((column) => column.id === initialSort.id)) {
            sorting.value = [initialSort];

            watch(sorting, ([sort]) => {
                if (!sort) {
                    setQueryValues({
                        'sort:field': undefined,
                        'sort:order': undefined,
                    });

                    return;
                }

                const sortDirection: SortDirection = sort.desc ? 'desc' : 'asc';
                const queryValues: TableSorting = {
                    'sort:field': sort.id === DEFAULT_SORT_FIELD
                        ? undefined
                        : sort.id,
                    'sort:order': sortDirection === DEFAULT_SORT_ORDER
                        ? undefined
                        : sortDirection,
                };

                setQueryValues(queryValues);
            }, {
                deep: true,
                immediate: true,
            });
        }
    }

    return {
        globalFilter,
        globalFilterDebounced,
        pagination,
        currentPage,
        sorting,
    };
}
