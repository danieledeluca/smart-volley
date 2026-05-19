import type { FormError, FormSubmitEvent, SelectMenuItem } from '@nuxt/ui';
import type { InsertCourse } from '~~/lib/db/schema';
import type { FetchError } from 'ofetch';

export const useCoursesStore = defineStore('courses', () => {
    const { $csrfFetch } = useNuxtApp();
    const toast = useToast();

    const isAddingCourse = ref(false);
    const addingCourseErrors = ref<FormError[]>([]);

    const courseAddInitialState: Partial<InsertCourse> = {
        name: undefined,
        description: undefined,
    };

    const courseAddState = reactive({ ...courseAddInitialState });

    const {
        data: courses,
        pending: coursesPending,
        error: coursesError,
        refresh: refreshCourses,
    } = useLazyFetch('/api/courses', {
        headers: useRequestHeaders(['cookie']),
    });

    const coursesItems = computed(() => {
        return courses.value?.map<SelectMenuItem>((course) => {
            return {
                label: course.name,
                description: course.description || '',
                value: course.id,
            };
        });
    });

    const clearCourseAddForm = () => {
        Object.assign(courseAddState, courseAddInitialState);

        refreshCourses();
    };

    const addCourse = async (event: FormSubmitEvent<InsertCourse>) => {
        try {
            isAddingCourse.value = true;

            await $csrfFetch('/api/courses', {
                method: 'POST',
                body: event.data,
            });

            clearCourseAddForm();

            toast.add({
                description: $t('form.add_course.success'),
                color: 'success',
                icon: 'i-lucide-circle-check',
            });
        } catch (err) {
            const error = err as FetchError;

            if (error.data?.data) {
                addingCourseErrors.value = error.data?.data;
            } else {
                toast.add({
                    description: error.statusMessage || DEFAULT_SERVER_ERROR_MESSAGE,
                    color: 'error',
                    icon: 'i-lucide-circle-x',
                });
            }
        } finally {
            isAddingCourse.value = false;
        }
    };

    const courseAddFields = computed<FormField<InsertCourse>[]>(() => {
        return [
            {
                renderAs: 'input',
                formFieldProps: {
                    label: $t('form.field.course_name.label'),
                    name: 'name',
                    required: true,
                },
                inputProps: {
                    placeholder: $t('form.field.course_name.placeholder'),
                },
            },
            {
                renderAs: 'input',
                formFieldProps: {
                    label: $t('form.field.course_description.label'),
                    name: 'description',
                },
                inputProps: {
                    placeholder: $t('form.field.course_description.placeholder'),
                },
            },
        ];
    });

    return {
        isAddingCourse,
        addingCourseErrors,
        courses,
        coursesItems,
        coursesPending,
        coursesError,
        courseAddState,
        courseAddFields,
        refreshCourses,
        addCourse,
    };
});
