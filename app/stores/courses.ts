import type { SelectMenuItem } from '@nuxt/ui';

export const useCoursesStore = defineStore('courses', () => {
    const {
        data: courses,
        pending: coursesPending,
        error: coursesError,
        refresh: refreshCourses,
    } = useLazyFetch('/api/courses');

    const coursesItems = computed(() => {
        return courses.value
            ?.toSorted((courseA, courseB) => {
                return courseA.code.localeCompare(courseB.code);
            })
            ?.map<SelectMenuItem>((course) => {
                return {
                    label: `${course.code} - ${course.name}`,
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
