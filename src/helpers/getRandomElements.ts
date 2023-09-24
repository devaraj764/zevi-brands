function getRandomElementsFromArray(array: any[], numElements: number) {
    // Check if numElements is greater than the array length
    if (numElements > array.length) {
        console.error('Error: Number of elements requested is greater than the array length.');
        return [];
    }

    // Create a copy of the original array
    const arrayCopy = [...array];

    // Shuffle the array randomly
    for (let i = arrayCopy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
    }

    // Return the first numElements elements from the shuffled array
    return arrayCopy.slice(0, numElements);
}

export default getRandomElementsFromArray