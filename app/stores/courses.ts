import type { SelectMenuItem } from '@nuxt/ui';

export const useCoursesStore = defineStore('courses', () => {
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
            let label = course.name;

            if (course.description) {
                label += ` (${course.description})`;
            }

            return {
                label,
                description: course.activity.name,
                value: course.id,
            };
        });
    });

    return {
        courses,
        coursesItems,
        coursesPending,
        coursesError,
        refreshCourses,
    };
});
