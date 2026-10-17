export function preventClose(event: Event) {
    const target = event.target as HTMLElement;

    // Inside Google Place Autocomplete
    if (target.closest('.pac-container')) {
        event.preventDefault();
    }
}
