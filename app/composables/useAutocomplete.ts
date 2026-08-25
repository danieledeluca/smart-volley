import { importLibrary } from '@googlemaps/js-api-loader';

export function useAutocomplete(
    inputElement: Ref<{ inputRef: HTMLInputElement | null } | null>,
    autocompleteOptions?: google.maps.places.AutocompleteOptions,
) {
    const parsedAddress = ref<ParsedAddress>();
    const hasValidSelection = ref(false);
    let autocomplete: google.maps.places.Autocomplete | undefined;

    function parseAddressComponents(place: google.maps.places.PlaceResult) {
        const parsedAddress: ParsedAddress = {
            street: undefined,
            postalCode: undefined,
            city: undefined,
            province: undefined,
            region: undefined,
            country: '',
            formattedAddress: place.formatted_address || '',
            placeId: place.place_id || '',
        };

        let street = '';
        let streetNumber = '';
        let subPremise = '';
        let locality = '';
        let city = '';

        place.address_components?.forEach((component) => {
            switch (component.types[0]) {
                case 'route':
                    street = component.long_name;
                    break;

                case 'street_number':
                    streetNumber = component.long_name;
                    break;

                case 'subpremise':
                    subPremise = component.long_name;
                    break;

                case 'postal_code':
                    parsedAddress.postalCode = component.long_name;
                    break;

                case 'locality':
                    locality = component.long_name;
                    break;

                case 'administrative_area_level_3':
                    city = component.long_name;
                    break;

                case 'administrative_area_level_2':
                    parsedAddress.province = component.short_name;
                    break;

                case 'administrative_area_level_1':
                    parsedAddress.region = component.long_name;
                    break;

                case 'country':
                    parsedAddress.country = component.long_name;
                    break;

                default:
                    break;
            }
        });

        streetNumber = [streetNumber, subPremise].filter(String).join('/');
        parsedAddress.street = [street, streetNumber].filter(String).join(', ') || undefined;
        parsedAddress.city = locality || city || undefined;

        return parsedAddress;
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            const autocompleteResults = document.querySelectorAll('.pac-container');
            const isVisible = autocompleteResults.entries()
                .some(([, result]) => getComputedStyle(result).display === 'block');

            if (isVisible) {
                event.preventDefault();
            }
        }
    }

    function handleInput() {
        parsedAddress.value = undefined;
        hasValidSelection.value = false;
    }

    onMounted(async () => {
        if (!inputElement.value?.inputRef) {
            return;
        }

        const { Autocomplete } = await importLibrary('places');
        autocomplete = new Autocomplete(inputElement.value.inputRef, autocompleteOptions);

        inputElement.value.inputRef.addEventListener('keydown', handleKeydown);
        inputElement.value.inputRef.addEventListener('input', handleInput);

        autocomplete.addListener('place_changed', () => {
            const place = autocomplete?.getPlace();

            if (!place?.place_id) {
                parsedAddress.value = undefined;
                hasValidSelection.value = false;

                return;
            }

            parsedAddress.value = parseAddressComponents(place);
            hasValidSelection.value = true;
        });
    });

    onUnmounted(() => {
        inputElement.value?.inputRef?.removeEventListener('keydown', handleKeydown);
        inputElement.value?.inputRef?.removeEventListener('input', handleInput);

        if (autocomplete) {
            google.maps.event.clearInstanceListeners(autocomplete);
        }
    });

    return {
        parsedAddress,
        hasValidSelection,
    };
}
