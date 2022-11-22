import { PetLevel } from "./types"

export type petData = {
    name: string,
    nbGif: number,
}

const Marvin = {
    name: "Marvin",
    nbGif: 4,
}

const petitPatrons = {
    name :  "lesPetitsPatron",
    nbGif: 6,
}

export const allPets = [
    Marvin,
    petitPatrons
]