import {
  PetType,
  Pet,
  UserPetArgs,
  Direction,
  PetAnimation,
  UserPet,
  PetLevel,
} from './'

export const petNames = [
  'boo',
  'nacho',
  'gary',
  'fudge',
  'neko',
  'pip',
  'bibo',
  'fifi',
  'jax',
  'bobba',
  'gidget',
  'mina',
  'crumb',
  'zimbo',
  'dusty',
  'brock',
  'otis',
  'marvin',
  'smokey',
  'barry',
  'tony',
  'dusty',
  'mochi',
]

const animationDefaults = {
  width: 75,
  height: 64,
  speed: 0,
  offset: 0,
}

const egg2: PetLevel = {
  defaultState: 'idle',
  animations: {
    idle: {
      ...animationDefaults,
      gif: 'pet1/rank0.gif',
    },
    transition: {
      ...animationDefaults,
      gif: 'dust1.gif',
      offset: 6,
      width: 100,
      height: 100,
    },
  },
}

const egg: PetLevel = {
  defaultState: 'idle',
  animations: {
    idle: {
      ...animationDefaults,
      gif: 'egg1.gif',
    },
    transition: {
      ...animationDefaults,
      gif: 'dust1.gif',
      offset: 6,
      width: 100,
      height: 100,
    },
  },
}

// Generic evolution transition
const transition: PetAnimation = {
  ...animationDefaults,
  gif: 'dust2.gif',
  offset: -80,
  width: 280,
  height: 100,
}

const getPet = () => {

  const petframe = Array.from("123456")

  const res = new Map(petframe.map((file, index) => !index ? [0, egg2] : [
    index * 3,
    {
      defaultState: 'walking',
      animations: {
        transition,
        walking: {
          ...animationDefaults,
          gif: `pet1/rank${index}.gif`,
          speed: 3,
        },
      },
    } as PetLevel,
  ]))
  console.log(res, petframe)
  return res
}

export const petTypes = new Map<string, Pet>([
  [
    'monster3',
    {
      levels: getPet()
    },
  ]
])

export const randomPetType = (): PetType =>
  Array.from(petTypes.keys())[
  Math.floor(Math.random() * petTypes.size)
  ] as PetType

export const randomPetName = (): string => {
  const name = petNames[Math.floor(Math.random() * petNames.length)]
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
}

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

  const levelFound = petTypeFound.levels.get(userPet.level) || petTypeFound.levels.get(userPet.rank)
  if (!levelFound) {
    throw new Error(
      `Pet level not found for pet type ${userPet.type}: ${userPet.level}`
    )
  }
  levelFound.animations.transition.gif = petTypeFound.levels.get(userPet.level) ? 'dust2.gif' : 'dust1.gif'

  if (!(userPet.state in levelFound.animations)) {
    throw new Error(
      `Animation not found for pet type ${userPet.type}, level ${userPet.level}: ${userPet.state}`
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
  level,
}: {
  petType: PetType
  level: number
}) => {
  const petTypeFound = petTypes.get(petType)
  if (!petTypeFound) {
    return undefined
  }

  const levelFound = petTypeFound.levels.get(level)
  if (!levelFound) {
    return undefined
  }

  return levelFound
}


export const getNextLevelCap = (actualLevel: number) => {
  return Math.pow(Math.log(actualLevel * 3 + 1), 1.5) * 100
}

export const mutateLevel = ({ userPet }: { userPet: UserPet }) => {
  const nextLevelFound = getLevel({
    petType: userPet.type,
    level: userPet.level + 1,
  })
  if (userPet.xp >= getNextLevelCap(userPet.level)) {
    userPet.level += 1
    userPet.xp = 0
    userPet.isTransitionIn = true

    if (!nextLevelFound) return
    userPet.rank = userPet.level
    userPet.state = nextLevelFound.defaultState
    userPet.speed = nextLevelFound.animations[nextLevelFound.defaultState]?.speed || 0
  }
}
