const MAX_DEX_ID = 493;

export const getRandomPokemon: (notThisOne?: number) => number = (
    notThisOne
) => {

    const pokedexNumber =  Math.floor(Math.random() * MAX_DEX_ID) +1;

    if (pokedexNumber !== notThisOne) return pokedexNumber;
    return getRandomPokemon(notThisOne);
};

export const getOptionsForVote = () => {
    const firstID = getRandomPokemon();
    const secondId = getRandomPokemon(firstID);

    return [firstID, secondId];
}