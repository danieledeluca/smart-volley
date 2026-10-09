export const useUsersStore = defineStore('users', () => {
    const {
        data: users,
        pending: usersPending,
        error: usersError,
        refresh: refreshUsers,
    } = useLazyFetch('/api/users');

    return {
        users,
        usersPending,
        usersError,
        refreshUsers,
    };
});
