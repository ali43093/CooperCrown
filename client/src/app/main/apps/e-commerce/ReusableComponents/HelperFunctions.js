import { Zoom } from 'react-toastify';

export const sortAlphabetically = (array, attribute) => {
    if (array?.length > 0) {
        array.sort((a, b) => {
            const nameA = a[attribute]?.toUpperCase();
            const nameB = b[attribute]?.toUpperCase();

            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
    }
    return array
}


export const getNextCustomerId = (previousCustomerId) => {
    // Extract the character part and numeric part from the previousCustomerId
    const characterPart = previousCustomerId.slice(0, 2);
    const numericPart = parseInt(previousCustomerId.slice(2));

    let nextCharacterPart = characterPart;
    let nextNumericPart = numericPart + 1;

    // Check if the numeric part exceeds '999'
    if (nextNumericPart > 999) {
        // Increment the character part
        const lastCharacter = characterPart.charAt(1);
        if (lastCharacter === 'Z') {
            // Handle the case where 'Z' is reached
            nextCharacterPart = String.fromCharCode(characterPart.charCodeAt(0) + 1) + 'A';
        } else {
            nextCharacterPart = characterPart.charAt(0) + String.fromCharCode(lastCharacter.charCodeAt(0) + 1);
        }

        // Reset the numeric part to '001'
        nextNumericPart = 1;
    }

    // Pad the numeric part with leading zeros if needed
    const paddedNumericPart = nextNumericPart.toString().padStart(3, '0');

    // Concatenate the character and numeric parts to form the next customerId
    const nextCustomerId = nextCharacterPart + paddedNumericPart;

    return nextCustomerId;
}

export const toastAttributes = {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    transition: Zoom
}

export const customValuesArrayGenerator = (end, start, decrement, addBlankValue) => {
    const dataArray = [];

    for (let value = start; value >= end; value -= decrement) {
        const label = value > 0 ? `+${value.toFixed(2)}` : value.toFixed(2);
        if (addBlankValue && value === 0) dataArray.push({ label: '', value: 'blank' })
        dataArray.push({ label, value });
    }

    return dataArray

}

export const visualAquityDropDownValues = ['20 / 15', '20 / 20', '20 / 25', '20 / 30', '20 / 40', '20 / 50', '20 / 60', '20 / 70', '20 / 80', '20 / 100',
    '20 / 120', '20 / 150', '20 / 200', '20 / 300', '20 / 350', '20 / 400', '20 / > 400']
export const slitLampAngleValues = ['< 1', 1, 2, 3, 4]
export const algoliaDefaultRanking = ['typo', 'geo', 'words', 'filters', 'proximity', 'attribute', 'exact', 'custom']

export const addTwoDecimalPlaces = (value) => {
    if (!value) return value
    let changedNumber = Number(value);
    return !isNaN(changedNumber) ? changedNumber > 0 ? `+${changedNumber.toFixed(2)}` : changedNumber.toFixed(2) : value;
}
