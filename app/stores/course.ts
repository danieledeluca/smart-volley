import type { SelectItem } from '@nuxt/ui';

export const useCoursesStore = defineStore('courses', () => {
    const courseAddInitialState: Partial<CourseAddSchema> = {
        name: undefined,
    };

    const { data: courses, pending: coursesPending, refresh: refreshCourses } = useLazyFetch('/api/courses', {
        headers: useRequestHeaders(['cookie']),
    });

    const coursesItems = computed(() => {
        return courses.value?.map<SelectItem>((course) => {
            return {
                label: course.name,
                value: course.id,
            };
        });
    });

    const {
        showAddForm: showCourseAddForm,
        isAdding: isAddingCourse,
        state: courseAddState,
        add: addCourse,
    } = useAddForm(
        courseAddInitialState,
        refreshCourses,
        '/api/activities/add',
        'Activity added successfully',
    );

    const courseAddFields = computed<FormField<CourseAddSchema>[]>(() => {
        return [
            {
                renderAs: 'input',
                label: $t('form.field.course_name.label'),
                name: 'name',
                placeholder: $t('form.field.course_name.placeholder'),
                required: true,
                variant: 'subtle',
            },
        ];
    });

    return {
        courses,
        coursesItems,
        coursesPending,
        addCourse,
        showCourseAddForm,
        isAddingCourse,
        courseAddState,
        courseAddFields,
    };
});
