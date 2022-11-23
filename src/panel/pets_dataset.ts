import { PetLevel } from "./types"

export type petData = {
    loop?: boolean
    name: string,
    nbGif: number,
}

const Marvin = {
    name: "Marvin",
    nbGif: 4,
} as petData

const petitPatrons = {
    name :  "lesPetitsPatron",
    nbGif: 6,
} as petData

const tiPhoenix = {
    name: "tiPhoenix",
    nbGif: 5,
    loop: true
} as petData

export const allPets = [
    Marvin,
    petitPatrons,
    tiPhoenix
]