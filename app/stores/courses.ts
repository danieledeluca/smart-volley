import type { SelectMenuItem } from '@nuxt/ui';

export const useCoursesStore = defineStore('courses', () => {
    const {
        data: courses,
        pending: coursesPending,
        error: coursesError,
        refresh: refreshCourses,
    } = useLazyFetch('/api/courses');

    const coursesItems = computed(() => {
        return courses.value?.map<SelectMenuItem>((course) => {
            let label = course.code;

            if (course.name) {
                label += ` - ${course.name}`;
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
