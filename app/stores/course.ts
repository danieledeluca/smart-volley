import type { SelectItem } from '@nuxt/ui';

export const useCoursesStore = defineStore('courses', () => {
    const { data: courses, pending: coursesPending } = useLazyFetch('/api/course', {
        headers: useRequestHeaders(['cookie']),
        transform: (courses) => {
            return courses.map<SelectItem>((course) => {
                return {
                    label: course.name,
                    value: course.id,
                };
            });
        },
    });

    return {
        courses,
        coursesPending,
    };
});
