import {
  Pet,
  UserPetArgs,
  Direction,
  PetAnimation,
  UserPet,
  PetLevel,
} from './'
import { allPets } from './pets_dataset'

const animationDefaults = {
  width: 75,
  height: 64,
  speed: 0,
  offset: 0,
}

// Generic evolution transition
const transition: PetAnimation = {
  ...animationDefaults,
  gif: 'dust2.gif',
  offset: -80,
  width: 280,
  height: 100,
}

const getEgg = (name: string): PetLevel => ({
  defaultState: 'idle',
  animations: {
    idle: {
      ...animationDefaults,
      gif: `${name}/rank0.gif`,
    },
    transition: {
      ...animationDefaults,
      gif: 'dust1.gif',
      offset: 6,
      width: 100,
      height: 100,
    },
  },
})

const getPetContent = (name: string, nbFrame: number) => {

  const egg = getEgg(name)
  const res = [egg]
  for (let i = 1; i < nbFrame; i += 1) {
    res.push({
      defaultState: 'walking',
      animations: {
        transition,
        walking: {
          ...animationDefaults,
          width: Math.min(75 + i * 3, 135),
          height: Math.min(64 + i * 3, 125),
          gif: `${name}/rank${i}.gif`,
          speed: 3,
        },
      },
    } as PetLevel)
  }

  const mapedPets = new Map(res.map((pet, index) => [
    index <= 1 ? index : index * 3 - 2,
    pet
  ]))
  return mapedPets
}

export const petTypes = new Map<string, Pet>(
  allPets.map((pet) => [
    pet.name,
    {
      levels: getPetContent(pet.name, pet.nbGif)
    }
  ])
)

export const randomPetType = (): string =>
  Array.from(petTypes.keys())[
  Math.floor(Math.random() * petTypes.size)
  ] as string

export const getPetAnimations = ({
  userPet,
}: {
  userPet: UserPet
}): {
  animation: PetAnimation
  transition: PetAnimation | undefined
} => {
  const petTypeFound = petTypes.get(userPet.type)
  if (!petTypeFound) {
    throw new Error(`Pet type not found: ${userPet.type}`)
  }
  const levelFound = petTypeFound.levels.get(userPet.level > 1 ? userPet.rank * 3 - 2 : userPet.level)
  if (!levelFound) {
    throw new Error(
      `Pet level not found for pet type ${userPet.type}: ${userPet.rank}`
    )
  }

  levelFound.animations.transition.gif = (userPet.level - 1 )% 3 ? 'dust1.gif' : 'dust2.gif'

  if (!(userPet.state in levelFound.animations)) {
    throw new Error(
      `Animation not found for pet type ${userPet.type}, level ${userPet.rank}: ${userPet.state}`
    )
  }
  const transition =
    'transition' in levelFound.animations
      ? levelFound.animations.transition
      : undefined

  return {
    animation: levelFound.animations[userPet.state],
    transition,
  }
}

export const generatePet = ({ name, type }: UserPetArgs): UserPet => ({
  leftPosition: 0,
  speed: 0,
  direction: Direction.right,
  level: 0,
  xp: 0,
  rank: 0,
  // All level 0 characters require this state
  state: 'idle',
  isTransitionIn: true,
  name,
  type,
})

export const getLevel = ({
  petType,
  rank,
}: {
  petType: string
  rank: number | null
}) => {
  if (!rank) {
    return undefined
  }
  
  const petTypeFound = petTypes.get(petType)
  if (!petTypeFound) {
    return undefined
  }
  console.log(rank)
  const levelFound = petTypeFound.levels.get(rank === 1 ? 1: rank *3 -2)
  if (!levelFound) {
    return undefined
  }

  return levelFound
}


export const getNextLevelCap = (actualLevel: number) => {
  return 10//Math.pow(Math.log(actualLevel * 3 + 1), 1.5) * 100
}

export const mutateLevel = ({ userPet }: { userPet: UserPet }) => {
  const nextLevelFound = getLevel({
    petType: userPet.type,
    rank:  userPet.level >= 1  && (userPet.level + 1) % 3 ? null :userPet.rank + 1,
  })
  if (userPet.xp >= getNextLevelCap(userPet.level)) {
    userPet.level += 1
    userPet.xp = 0
    userPet.isTransitionIn = true
    const petData = allPets.find((pet) => pet.name === userPet.type)
    userPet.rank = petData?.loop && userPet.rank +1 >= petData.nbGif ? 0 : userPet.rank

    if (!nextLevelFound) return
    userPet.rank = userPet.rank + 1
    userPet.state = nextLevelFound.defaultState
    userPet.speed = nextLevelFound.animations[nextLevelFound.defaultState]?.speed || 0
  }
}
