/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/panel/dom.ts":
/*!**************************!*\
  !*** ./src/panel/dom.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DOM = void 0;
class DOM {
    constructor({ movementContainerSelector, petImageSelector, transitionContainerSelector, transitionSelector, }) {
        this.getHTMLElement = (elementName) => {
            const htmlElement = document.getElementById(elementName);
            if (!htmlElement) {
                throw new Error(`Unable to locate element in DOM: ${elementName}`);
            }
            return htmlElement;
        };
        this._petImageSelector = petImageSelector;
        this._movementContainerSelector = movementContainerSelector;
        this._transitionContainerSelector = transitionContainerSelector;
        this._transitionSelector = transitionSelector;
    }
    getMovementSelector() {
        if (!this._movementContainerElement) {
            this._movementContainerElement = this.getHTMLElement(this._movementContainerSelector);
        }
        return this._movementContainerElement;
    }
    getPetImageSelector() {
        if (!this._petImageElement) {
            this._petImageElement = this.getHTMLElement(this._petImageSelector);
        }
        return this._petImageElement;
    }
    getTransitionSelector() {
        if (!this._transitionContainerElement) {
            this._transitionContainerElement = this.getHTMLElement(this._transitionContainerSelector);
        }
        return this._transitionContainerElement;
    }
    getTransitionImageSelector() {
        if (!this._transitionImageElement) {
            this._transitionImageElement = this.getHTMLElement(this._transitionSelector);
        }
        return this._transitionImageElement;
    }
}
exports.DOM = DOM;


/***/ }),

/***/ "./src/panel/index.ts":
/*!****************************!*\
  !*** ./src/panel/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DOM = exports.transforms = exports.setState = exports.state = exports.initializeState = exports.Direction = exports.randomPetType = exports.mutateLevel = exports.generatePet = exports.getPetAnimations = exports.petTypes = void 0;
const pets_1 = __webpack_require__(/*! ./pets */ "./src/panel/pets.ts");
Object.defineProperty(exports, "petTypes", ({ enumerable: true, get: function () { return pets_1.petTypes; } }));
Object.defineProperty(exports, "getPetAnimations", ({ enumerable: true, get: function () { return pets_1.getPetAnimations; } }));
Object.defineProperty(exports, "generatePet", ({ enumerable: true, get: function () { return pets_1.generatePet; } }));
Object.defineProperty(exports, "mutateLevel", ({ enumerable: true, get: function () { return pets_1.mutateLevel; } }));
Object.defineProperty(exports, "randomPetType", ({ enumerable: true, get: function () { return pets_1.randomPetType; } }));
const transforms_1 = __webpack_require__(/*! ./transforms */ "./src/panel/transforms.ts");
Object.defineProperty(exports, "transforms", ({ enumerable: true, get: function () { return transforms_1.transforms; } }));
const types_1 = __webpack_require__(/*! ./types */ "./src/panel/types.ts");
Object.defineProperty(exports, "Direction", ({ enumerable: true, get: function () { return types_1.Direction; } }));
const dom_1 = __webpack_require__(/*! ./dom */ "./src/panel/dom.ts");
Object.defineProperty(exports, "DOM", ({ enumerable: true, get: function () { return dom_1.DOM; } }));
const state_1 = __webpack_require__(/*! ./state */ "./src/panel/state.ts");
Object.defineProperty(exports, "state", ({ enumerable: true, get: function () { return state_1.state; } }));
Object.defineProperty(exports, "initializeState", ({ enumerable: true, get: function () { return state_1.initializeState; } }));
Object.defineProperty(exports, "setState", ({ enumerable: true, get: function () { return state_1.setState; } }));


/***/ }),

/***/ "./src/panel/main.ts":
/*!***************************!*\
  !*** ./src/panel/main.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.app = exports.addPetToPanel = void 0;
const _1 = __webpack_require__(/*! ./ */ "./src/panel/index.ts");
const state_1 = __webpack_require__(/*! ./state */ "./src/panel/state.ts");
const defaultState = {
    userPet: (0, _1.generatePet)({ name: 'unknown', type: 'unknown' }),
    basePetUri: '',
    file: [""]
};
(0, state_1.initializeState)(defaultState);
const dom = new _1.DOM({
    movementContainerSelector: 'movement-container',
    petImageSelector: 'pet',
    transitionContainerSelector: 'transition-container',
    transitionSelector: 'transition',
});
const TICK_INTERVAL_MS = 100;
const tick = ({ userPet }) => {
    const { leftPosition, direction } = _1.transforms[userPet.state].nextFrame({
        containerWidth: window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth,
        leftPosition: userPet.leftPosition,
        direction: userPet.direction,
        speed: userPet.speed,
        offset: (0, _1.getPetAnimations)({ userPet }).animation.offset || 0,
    });
    userPet.leftPosition = leftPosition;
    userPet.direction = direction;
    // Apply transformation
    const movementContainer = dom.getMovementSelector();
    movementContainer.style.marginLeft = `${userPet.leftPosition}px`;
    const petImageElement = dom.getPetImageSelector();
    petImageElement.style.transform = `scaleX(${userPet.direction})`;
    if (userPet.isTransitionIn) {
        const { transition: animation } = (0, _1.getPetAnimations)({
            userPet,
        });
        if (animation) {
            const transitionContainer = dom.getTransitionSelector();
            transitionContainer.style.marginLeft = `${userPet.leftPosition}px`;
            setImage({
                container: dom.getTransitionSelector(),
                selector: dom.getTransitionImageSelector(),
                animation,
            });
            _1.state.userPet.isTransitionIn = false;
        }
    }
};
const setImage = ({ container, selector, animation, }) => {
    var _a;
    const { basePetUri } = _1.state;
    selector.src = `${basePetUri}/${animation.gif}`;
    selector.width = animation.width;
    selector.style.minWidth = `${animation.width}px`;
    selector.height = animation.height;
    container.style.left = `${(_a = animation.offset) !== null && _a !== void 0 ? _a : 0}px`;
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const startAnimation = () => {
    const { userPet } = _1.state;
    if (_1.state.intervalId) {
        clearInterval(_1.state.intervalId);
    }
    const intervalId = setInterval(() => {
        tick({ userPet });
    }, TICK_INTERVAL_MS);
    (0, _1.setState)('intervalId', intervalId);
};
const addPetToPanel = ({ userPet }) => __awaiter(void 0, void 0, void 0, function* () {
    (0, _1.setState)('userPet', userPet);
    startAnimation();
    // Give the transition a chance to play
    yield sleep(TICK_INTERVAL_MS * 2);
    const { animation } = (0, _1.getPetAnimations)({
        userPet,
    });
    setImage({
        selector: dom.getPetImageSelector(),
        animation,
        container: dom.getMovementSelector(),
    });
});
exports.addPetToPanel = addPetToPanel;
const app = ({ userPet, basePetUri, }) => {
    (0, _1.setState)('basePetUri', basePetUri);
    if (userPet) {
        (0, exports.addPetToPanel)({ userPet });
    }
    // Handle messages sent from the extension to the webview
    window.addEventListener('message', (event) => {
        const { command, data } = event.data; // The data that the extension sent
        switch (command) {
            case 'spawn-pet':
                (0, exports.addPetToPanel)({ userPet: data.userPet });
                break;
            case 'update-pet':
                (0, exports.addPetToPanel)({
                    userPet: Object.assign(Object.assign({}, data.userPet), { leftPosition: _1.state.userPet.leftPosition, direction: _1.state.userPet.direction }),
                });
                break;
        }
    });
};
exports.app = app;


/***/ }),

/***/ "./src/panel/pets.ts":
/*!***************************!*\
  !*** ./src/panel/pets.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mutateLevel = exports.getNextLevelCap = exports.getLevel = exports.generatePet = exports.getPetAnimations = exports.randomPetType = exports.petTypes = void 0;
const _1 = __webpack_require__(/*! ./ */ "./src/panel/index.ts");
const pets_dataset_1 = __webpack_require__(/*! ./pets_dataset */ "./src/panel/pets_dataset.ts");
const animationDefaults = {
    width: 75,
    height: 64,
    speed: 0,
    offset: 0,
};
// Generic evolution transition
const transition = Object.assign(Object.assign({}, animationDefaults), { gif: 'dust2.gif', offset: -80, width: 280, height: 100 });
const getEgg = (name) => ({
    defaultState: 'idle',
    animations: {
        idle: Object.assign(Object.assign({}, animationDefaults), { gif: `${name}/rank0.gif` }),
        transition: Object.assign(Object.assign({}, animationDefaults), { gif: 'dust1.gif', offset: 6, width: 100, height: 100 }),
    },
});
const getPetContent = (name, nbFrame) => {
    const egg = getEgg(name);
    const res = [egg];
    for (let i = 1; i < nbFrame; i += 1) {
        res.push({
            defaultState: 'walking',
            animations: {
                transition,
                walking: Object.assign(Object.assign({}, animationDefaults), { width: Math.min(75 + i * 3, 135), height: Math.min(64 + i * 3, 125), gif: `${name}/rank${i}.gif`, speed: 3 }),
            },
        });
    }
    const mapedPets = new Map(res.map((pet, index) => [
        index <= 1 ? index : index * 3,
        pet
    ]));
    return mapedPets;
};
exports.petTypes = new Map(pets_dataset_1.allPets.map((pet) => [
    pet.name,
    {
        levels: getPetContent(pet.name, pet.nbGif)
    }
]));
const randomPetType = () => Array.from(exports.petTypes.keys())[Math.floor(Math.random() * exports.petTypes.size)];
exports.randomPetType = randomPetType;
const getPetAnimations = ({ userPet, }) => {
    const petTypeFound = exports.petTypes.get(userPet.type);
    if (!petTypeFound) {
        throw new Error(`Pet type not found: ${userPet.type}`);
    }
    const levelFound = petTypeFound.levels.get(userPet.level) || petTypeFound.levels.get(userPet.rank);
    if (!levelFound) {
        throw new Error(`Pet level not found for pet type ${userPet.type}: ${userPet.level}`);
    }
    levelFound.animations.transition.gif = petTypeFound.levels.get(userPet.level) ? 'dust2.gif' : 'dust1.gif';
    if (!(userPet.state in levelFound.animations)) {
        throw new Error(`Animation not found for pet type ${userPet.type}, level ${userPet.level}: ${userPet.state}`);
    }
    const transition = 'transition' in levelFound.animations
        ? levelFound.animations.transition
        : undefined;
    return {
        animation: levelFound.animations[userPet.state],
        transition,
    };
};
exports.getPetAnimations = getPetAnimations;
const generatePet = ({ name, type }) => ({
    leftPosition: 0,
    speed: 0,
    direction: _1.Direction.right,
    level: 0,
    xp: 0,
    rank: 0,
    // All level 0 characters require this state
    state: 'idle',
    isTransitionIn: true,
    name,
    type,
});
exports.generatePet = generatePet;
const getLevel = ({ petType, level, }) => {
    const petTypeFound = exports.petTypes.get(petType);
    if (!petTypeFound) {
        return undefined;
    }
    const levelFound = petTypeFound.levels.get(level);
    if (!levelFound) {
        return undefined;
    }
    return levelFound;
};
exports.getLevel = getLevel;
const getNextLevelCap = (actualLevel) => {
    return Math.pow(Math.log(actualLevel * 3 + 1), 1.5) * 100;
};
exports.getNextLevelCap = getNextLevelCap;
const mutateLevel = ({ userPet }) => {
    var _a;
    const nextLevelFound = (0, exports.getLevel)({
        petType: userPet.type,
        level: userPet.level + 1,
    });
    if (userPet.xp >= (0, exports.getNextLevelCap)(userPet.level)) {
        userPet.level += 1;
        userPet.xp = 0;
        userPet.isTransitionIn = true;
        if (!nextLevelFound)
            return;
        userPet.rank = userPet.level;
        userPet.state = nextLevelFound.defaultState;
        userPet.speed = ((_a = nextLevelFound.animations[nextLevelFound.defaultState]) === null || _a === void 0 ? void 0 : _a.speed) || 0;
    }
};
exports.mutateLevel = mutateLevel;


/***/ }),

/***/ "./src/panel/pets_dataset.ts":
/*!***********************************!*\
  !*** ./src/panel/pets_dataset.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.allPets = void 0;
const Marvin = {
    name: "Marvin",
    nbGif: 4,
};
const petitPatrons = {
    name: "lesPetitsPatron",
    nbGif: 6,
};
exports.allPets = [
    Marvin,
    petitPatrons
];


/***/ }),

/***/ "./src/panel/state.ts":
/*!****************************!*\
  !*** ./src/panel/state.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setState = exports.initializeState = exports.state = void 0;
const initializeState = (initialState) => (exports.state = initialState);
exports.initializeState = initializeState;
const setState = (key, value) => (exports.state = Object.assign(Object.assign({}, exports.state), { [key]: value }));
exports.setState = setState;


/***/ }),

/***/ "./src/panel/transforms.ts":
/*!*********************************!*\
  !*** ./src/panel/transforms.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.transforms = void 0;
const _1 = __webpack_require__(/*! ./ */ "./src/panel/index.ts");
exports.transforms = {
    idle: {
        nextFrame: ({ direction, offset }) => ({
            direction,
            leftPosition: offset,
        }),
    },
    walking: {
        nextFrame: ({ containerWidth, leftPosition: oldLeftPosition, direction: oldDirection, speed, }) => {
            const direction = oldLeftPosition >= containerWidth - speed - 150
                ? _1.Direction.left
                : oldLeftPosition <= 0 + speed
                    ? _1.Direction.right
                    : oldDirection;
            const leftPosition = direction === _1.Direction.right
                ? oldLeftPosition + speed
                : oldLeftPosition - speed;
            return {
                direction,
                leftPosition,
            };
        },
    },
};


/***/ }),

/***/ "./src/panel/types.ts":
/*!****************************!*\
  !*** ./src/panel/types.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Direction = void 0;
var Direction;
(function (Direction) {
    Direction[Direction["right"] = 1] = "right";
    Direction[Direction["left"] = -1] = "left";
})(Direction = exports.Direction || (exports.Direction = {}));


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/panel/main.ts");
/******/ 	self.codachiApp = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SUFDbkIsMkNBQVM7SUFDVCwwQ0FBUztBQUNYLENBQUMsRUFIVyxTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQUdwQjs7Ozs7OztVQ3RERDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1VFdEJBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY29kYWNoaUFwcC8uL3NyYy9wYW5lbC9kb20udHMiLCJ3ZWJwYWNrOi8vY29kYWNoaUFwcC8uL3NyYy9wYW5lbC9pbmRleC50cyIsIndlYnBhY2s6Ly9jb2RhY2hpQXBwLy4vc3JjL3BhbmVsL21haW4udHMiLCJ3ZWJwYWNrOi8vY29kYWNoaUFwcC8uL3NyYy9wYW5lbC9wZXRzLnRzIiwid2VicGFjazovL2NvZGFjaGlBcHAvLi9zcmMvcGFuZWwvcGV0c19kYXRhc2V0LnRzIiwid2VicGFjazovL2NvZGFjaGlBcHAvLi9zcmMvcGFuZWwvc3RhdGUudHMiLCJ3ZWJwYWNrOi8vY29kYWNoaUFwcC8uL3NyYy9wYW5lbC90cmFuc2Zvcm1zLnRzIiwid2VicGFjazovL2NvZGFjaGlBcHAvLi9zcmMvcGFuZWwvdHlwZXMudHMiLCJ3ZWJwYWNrOi8vY29kYWNoaUFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jb2RhY2hpQXBwL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vY29kYWNoaUFwcC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vY29kYWNoaUFwcC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIERPTSB7XG4gIHByaXZhdGUgX3BldEltYWdlU2VsZWN0b3I6IHN0cmluZ1xuICBwcml2YXRlIF9tb3ZlbWVudENvbnRhaW5lclNlbGVjdG9yOiBzdHJpbmdcbiAgcHJpdmF0ZSBfdHJhbnNpdGlvbkNvbnRhaW5lclNlbGVjdG9yOiBzdHJpbmdcbiAgcHJpdmF0ZSBfdHJhbnNpdGlvblNlbGVjdG9yOiBzdHJpbmdcblxuICBwcml2YXRlIF9tb3ZlbWVudENvbnRhaW5lckVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgdW5kZWZpbmVkXG4gIHByaXZhdGUgX3BldEltYWdlRWxlbWVudDogSFRNTEltYWdlRWxlbWVudCB8IHVuZGVmaW5lZFxuICBwcml2YXRlIF90cmFuc2l0aW9uQ29udGFpbmVyRWxlbWVudDogSFRNTEVsZW1lbnQgfCB1bmRlZmluZWRcbiAgcHJpdmF0ZSBfdHJhbnNpdGlvbkltYWdlRWxlbWVudDogSFRNTEltYWdlRWxlbWVudCB8IHVuZGVmaW5lZFxuXG4gIGNvbnN0cnVjdG9yKHtcbiAgICBtb3ZlbWVudENvbnRhaW5lclNlbGVjdG9yLFxuICAgIHBldEltYWdlU2VsZWN0b3IsXG4gICAgdHJhbnNpdGlvbkNvbnRhaW5lclNlbGVjdG9yLFxuICAgIHRyYW5zaXRpb25TZWxlY3RvcixcbiAgfToge1xuICAgIHBldEltYWdlU2VsZWN0b3I6IHN0cmluZ1xuICAgIG1vdmVtZW50Q29udGFpbmVyU2VsZWN0b3I6IHN0cmluZ1xuICAgIHRyYW5zaXRpb25Db250YWluZXJTZWxlY3Rvcjogc3RyaW5nXG4gICAgdHJhbnNpdGlvblNlbGVjdG9yOiBzdHJpbmdcbiAgfSkge1xuICAgIHRoaXMuX3BldEltYWdlU2VsZWN0b3IgPSBwZXRJbWFnZVNlbGVjdG9yXG4gICAgdGhpcy5fbW92ZW1lbnRDb250YWluZXJTZWxlY3RvciA9IG1vdmVtZW50Q29udGFpbmVyU2VsZWN0b3JcbiAgICB0aGlzLl90cmFuc2l0aW9uQ29udGFpbmVyU2VsZWN0b3IgPSB0cmFuc2l0aW9uQ29udGFpbmVyU2VsZWN0b3JcbiAgICB0aGlzLl90cmFuc2l0aW9uU2VsZWN0b3IgPSB0cmFuc2l0aW9uU2VsZWN0b3JcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRIVE1MRWxlbWVudCA9IDxUPihlbGVtZW50TmFtZTogc3RyaW5nKTogVCA9PiB7XG4gICAgY29uc3QgaHRtbEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50TmFtZSkgYXMgdW5rbm93blxuICAgIGlmICghaHRtbEVsZW1lbnQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVW5hYmxlIHRvIGxvY2F0ZSBlbGVtZW50IGluIERPTTogJHtlbGVtZW50TmFtZX1gKVxuICAgIH1cblxuICAgIHJldHVybiBodG1sRWxlbWVudCBhcyBUXG4gIH1cblxuICBnZXRNb3ZlbWVudFNlbGVjdG9yKCk6IEhUTUxFbGVtZW50IHtcbiAgICBpZiAoIXRoaXMuX21vdmVtZW50Q29udGFpbmVyRWxlbWVudCkge1xuICAgICAgdGhpcy5fbW92ZW1lbnRDb250YWluZXJFbGVtZW50ID0gdGhpcy5nZXRIVE1MRWxlbWVudDxIVE1MRWxlbWVudD4oXG4gICAgICAgIHRoaXMuX21vdmVtZW50Q29udGFpbmVyU2VsZWN0b3JcbiAgICAgIClcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX21vdmVtZW50Q29udGFpbmVyRWxlbWVudFxuICB9XG5cbiAgZ2V0UGV0SW1hZ2VTZWxlY3RvcigpOiBIVE1MSW1hZ2VFbGVtZW50IHtcbiAgICBpZiAoIXRoaXMuX3BldEltYWdlRWxlbWVudCkge1xuICAgICAgdGhpcy5fcGV0SW1hZ2VFbGVtZW50ID0gdGhpcy5nZXRIVE1MRWxlbWVudDxIVE1MSW1hZ2VFbGVtZW50PihcbiAgICAgICAgdGhpcy5fcGV0SW1hZ2VTZWxlY3RvclxuICAgICAgKVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fcGV0SW1hZ2VFbGVtZW50XG4gIH1cblxuICBnZXRUcmFuc2l0aW9uU2VsZWN0b3IoKTogSFRNTEVsZW1lbnQge1xuICAgIGlmICghdGhpcy5fdHJhbnNpdGlvbkNvbnRhaW5lckVsZW1lbnQpIHtcbiAgICAgIHRoaXMuX3RyYW5zaXRpb25Db250YWluZXJFbGVtZW50ID0gdGhpcy5nZXRIVE1MRWxlbWVudDxIVE1MRWxlbWVudD4oXG4gICAgICAgIHRoaXMuX3RyYW5zaXRpb25Db250YWluZXJTZWxlY3RvclxuICAgICAgKVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fdHJhbnNpdGlvbkNvbnRhaW5lckVsZW1lbnRcbiAgfVxuXG4gIGdldFRyYW5zaXRpb25JbWFnZVNlbGVjdG9yKCk6IEhUTUxJbWFnZUVsZW1lbnQge1xuICAgIGlmICghdGhpcy5fdHJhbnNpdGlvbkltYWdlRWxlbWVudCkge1xuICAgICAgdGhpcy5fdHJhbnNpdGlvbkltYWdlRWxlbWVudCA9IHRoaXMuZ2V0SFRNTEVsZW1lbnQ8SFRNTEltYWdlRWxlbWVudD4oXG4gICAgICAgIHRoaXMuX3RyYW5zaXRpb25TZWxlY3RvclxuICAgICAgKVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fdHJhbnNpdGlvbkltYWdlRWxlbWVudFxuICB9XG59XG4iLCJpbXBvcnQge1xuICBwZXRUeXBlcyxcbiAgZ2V0UGV0QW5pbWF0aW9ucyxcbiAgZ2VuZXJhdGVQZXQsXG4gIG11dGF0ZUxldmVsLFxuICByYW5kb21QZXRUeXBlLFxufSBmcm9tICcuL3BldHMnXG5pbXBvcnQgeyB0cmFuc2Zvcm1zIH0gZnJvbSAnLi90cmFuc2Zvcm1zJ1xuaW1wb3J0IHtcbiAgUGV0LFxuICBQZXRTdGF0ZSxcbiAgVXNlclBldEJhc2VQcm9wcyxcbiAgVXNlclBldEFyZ3MsXG4gIFVzZXJQZXQsXG4gIERpcmVjdGlvbixcbiAgTmV4dEZyYW1lT3B0cyxcbiAgTmV4dEZyYW1lRm4sXG4gIE5leHRGcmFtZUZuUmV0dXJuLFxuICBUcmFuc2Zvcm1zLFxuICBQZXRBbmltYXRpb24sXG4gIFBldExldmVsLFxuICBTdGF0ZSxcbn0gZnJvbSAnLi90eXBlcydcbmltcG9ydCB7IERPTSB9IGZyb20gJy4vZG9tJ1xuaW1wb3J0IHsgc3RhdGUsIGluaXRpYWxpemVTdGF0ZSwgc2V0U3RhdGUgfSBmcm9tICcuL3N0YXRlJ1xuXG5leHBvcnQge1xuICBwZXRUeXBlcyxcbiAgZ2V0UGV0QW5pbWF0aW9ucyxcbiAgZ2VuZXJhdGVQZXQsXG4gIG11dGF0ZUxldmVsLFxuICByYW5kb21QZXRUeXBlLFxuICBQZXQsXG4gIFBldFN0YXRlLFxuICBVc2VyUGV0QmFzZVByb3BzLFxuICBVc2VyUGV0QXJncyxcbiAgVXNlclBldCxcbiAgRGlyZWN0aW9uLFxuICBOZXh0RnJhbWVPcHRzLFxuICBOZXh0RnJhbWVGbixcbiAgTmV4dEZyYW1lRm5SZXR1cm4sXG4gIFRyYW5zZm9ybXMsXG4gIFBldEFuaW1hdGlvbixcbiAgUGV0TGV2ZWwsXG4gIFN0YXRlLFxuICBpbml0aWFsaXplU3RhdGUsXG4gIHN0YXRlLFxuICBzZXRTdGF0ZSxcbiAgdHJhbnNmb3JtcyxcbiAgRE9NLFxufVxuIiwiaW1wb3J0ICogYXMgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHtcbiAgVXNlclBldCxcbiAgc2V0U3RhdGUsXG4gIGdldFBldEFuaW1hdGlvbnMsXG4gIGdlbmVyYXRlUGV0LFxuICB0cmFuc2Zvcm1zLFxuICBET00sXG4gIHN0YXRlLFxuICBQZXRBbmltYXRpb24sXG59IGZyb20gJy4vJ1xuaW1wb3J0IHsgaW5pdGlhbGl6ZVN0YXRlIH0gZnJvbSAnLi9zdGF0ZSdcblxuY29uc3QgZGVmYXVsdFN0YXRlID17XG4gIHVzZXJQZXQ6IGdlbmVyYXRlUGV0KHsgbmFtZTogJ3Vua25vd24nLCB0eXBlOiAndW5rbm93bicgfSksXG4gIGJhc2VQZXRVcmk6ICcnLFxuICBmaWxlOiBbXCJcIl1cbn1cblxuaW5pdGlhbGl6ZVN0YXRlKGRlZmF1bHRTdGF0ZSlcblxuY29uc3QgZG9tID0gbmV3IERPTSh7XG4gIG1vdmVtZW50Q29udGFpbmVyU2VsZWN0b3I6ICdtb3ZlbWVudC1jb250YWluZXInLFxuICBwZXRJbWFnZVNlbGVjdG9yOiAncGV0JyxcbiAgdHJhbnNpdGlvbkNvbnRhaW5lclNlbGVjdG9yOiAndHJhbnNpdGlvbi1jb250YWluZXInLFxuICB0cmFuc2l0aW9uU2VsZWN0b3I6ICd0cmFuc2l0aW9uJyxcbn0pXG5cbmNvbnN0IFRJQ0tfSU5URVJWQUxfTVMgPSAxMDBcblxuY29uc3QgdGljayA9ICh7IHVzZXJQZXQgfTogeyB1c2VyUGV0OiBVc2VyUGV0IH0pID0+IHtcbiAgY29uc3QgeyBsZWZ0UG9zaXRpb24sIGRpcmVjdGlvbiB9ID0gdHJhbnNmb3Jtc1t1c2VyUGV0LnN0YXRlXS5uZXh0RnJhbWUoe1xuICAgIGNvbnRhaW5lcldpZHRoOlxuICAgICAgd2luZG93LmlubmVyV2lkdGggfHxcbiAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCB8fFxuICAgICAgZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCxcbiAgICBsZWZ0UG9zaXRpb246IHVzZXJQZXQubGVmdFBvc2l0aW9uLFxuICAgIGRpcmVjdGlvbjogdXNlclBldC5kaXJlY3Rpb24sXG4gICAgc3BlZWQ6IHVzZXJQZXQuc3BlZWQsXG4gICAgb2Zmc2V0OiBnZXRQZXRBbmltYXRpb25zKHsgdXNlclBldCB9KS5hbmltYXRpb24ub2Zmc2V0IHx8IDAsXG4gIH0pXG5cbiAgdXNlclBldC5sZWZ0UG9zaXRpb24gPSBsZWZ0UG9zaXRpb25cbiAgdXNlclBldC5kaXJlY3Rpb24gPSBkaXJlY3Rpb25cblxuICAvLyBBcHBseSB0cmFuc2Zvcm1hdGlvblxuICBjb25zdCBtb3ZlbWVudENvbnRhaW5lciA9IGRvbS5nZXRNb3ZlbWVudFNlbGVjdG9yKClcbiAgbW92ZW1lbnRDb250YWluZXIuc3R5bGUubWFyZ2luTGVmdCA9IGAke3VzZXJQZXQubGVmdFBvc2l0aW9ufXB4YFxuXG4gIGNvbnN0IHBldEltYWdlRWxlbWVudCA9IGRvbS5nZXRQZXRJbWFnZVNlbGVjdG9yKClcbiAgcGV0SW1hZ2VFbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IGBzY2FsZVgoJHt1c2VyUGV0LmRpcmVjdGlvbn0pYFxuXG4gIGlmICh1c2VyUGV0LmlzVHJhbnNpdGlvbkluKSB7XG4gICAgY29uc3QgeyB0cmFuc2l0aW9uOiBhbmltYXRpb24gfSA9IGdldFBldEFuaW1hdGlvbnMoe1xuICAgICAgdXNlclBldCxcbiAgICB9KVxuXG4gICAgaWYgKGFuaW1hdGlvbikge1xuICAgICAgY29uc3QgdHJhbnNpdGlvbkNvbnRhaW5lciA9IGRvbS5nZXRUcmFuc2l0aW9uU2VsZWN0b3IoKVxuICAgICAgdHJhbnNpdGlvbkNvbnRhaW5lci5zdHlsZS5tYXJnaW5MZWZ0ID0gYCR7dXNlclBldC5sZWZ0UG9zaXRpb259cHhgXG5cbiAgICAgIHNldEltYWdlKHtcbiAgICAgICAgY29udGFpbmVyOiBkb20uZ2V0VHJhbnNpdGlvblNlbGVjdG9yKCksXG4gICAgICAgIHNlbGVjdG9yOiBkb20uZ2V0VHJhbnNpdGlvbkltYWdlU2VsZWN0b3IoKSxcbiAgICAgICAgYW5pbWF0aW9uLFxuICAgICAgfSlcbiAgICAgIHN0YXRlLnVzZXJQZXQuaXNUcmFuc2l0aW9uSW4gPSBmYWxzZVxuICAgIH1cbiAgfVxufVxuXG5jb25zdCBzZXRJbWFnZSA9ICh7XG4gIGNvbnRhaW5lcixcbiAgc2VsZWN0b3IsXG4gIGFuaW1hdGlvbixcbn06IHtcbiAgY29udGFpbmVyOiBIVE1MRWxlbWVudFxuICBzZWxlY3RvcjogSFRNTEltYWdlRWxlbWVudFxuICBhbmltYXRpb246IFBldEFuaW1hdGlvblxufSkgPT4ge1xuICBjb25zdCB7IGJhc2VQZXRVcmkgfSA9IHN0YXRlXG5cbiAgc2VsZWN0b3Iuc3JjID0gYCR7YmFzZVBldFVyaX0vJHthbmltYXRpb24uZ2lmfWBcbiAgc2VsZWN0b3Iud2lkdGggPSBhbmltYXRpb24ud2lkdGhcbiAgc2VsZWN0b3Iuc3R5bGUubWluV2lkdGggPSBgJHthbmltYXRpb24ud2lkdGh9cHhgXG4gIHNlbGVjdG9yLmhlaWdodCA9IGFuaW1hdGlvbi5oZWlnaHRcblxuICBjb250YWluZXIuc3R5bGUubGVmdCA9IGAke2FuaW1hdGlvbi5vZmZzZXQgPz8gMH1weGBcbn1cblxuY29uc3Qgc2xlZXAgPSAobXM6IG51bWJlcikgPT4gbmV3IFByb21pc2UoKHIpID0+IHNldFRpbWVvdXQociwgbXMpKVxuXG5jb25zdCBzdGFydEFuaW1hdGlvbiA9ICgpID0+IHtcbiAgY29uc3QgeyB1c2VyUGV0IH0gPSBzdGF0ZVxuICBpZiAoc3RhdGUuaW50ZXJ2YWxJZCkge1xuICAgIGNsZWFySW50ZXJ2YWwoc3RhdGUuaW50ZXJ2YWxJZClcbiAgfVxuICBjb25zdCBpbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgIHRpY2soeyB1c2VyUGV0IH0pXG4gIH0sIFRJQ0tfSU5URVJWQUxfTVMpXG4gIHNldFN0YXRlKCdpbnRlcnZhbElkJywgaW50ZXJ2YWxJZClcbn1cblxuZXhwb3J0IGNvbnN0IGFkZFBldFRvUGFuZWwgPSBhc3luYyAoeyB1c2VyUGV0IH06IHsgdXNlclBldDogVXNlclBldCB9KSA9PiB7XG4gIHNldFN0YXRlKCd1c2VyUGV0JywgdXNlclBldClcbiAgc3RhcnRBbmltYXRpb24oKVxuXG4gIC8vIEdpdmUgdGhlIHRyYW5zaXRpb24gYSBjaGFuY2UgdG8gcGxheVxuICBhd2FpdCBzbGVlcChUSUNLX0lOVEVSVkFMX01TICogMilcblxuICBjb25zdCB7IGFuaW1hdGlvbiB9ID0gZ2V0UGV0QW5pbWF0aW9ucyh7XG4gICAgdXNlclBldCxcbiAgfSlcblxuICBzZXRJbWFnZSh7XG4gICAgc2VsZWN0b3I6IGRvbS5nZXRQZXRJbWFnZVNlbGVjdG9yKCksXG4gICAgYW5pbWF0aW9uLFxuICAgIGNvbnRhaW5lcjogZG9tLmdldE1vdmVtZW50U2VsZWN0b3IoKSxcbiAgfSlcbn1cblxuZXhwb3J0IGNvbnN0IGFwcCA9ICh7XG4gIHVzZXJQZXQsXG4gIGJhc2VQZXRVcmksXG59OiB7XG4gIHVzZXJQZXQ6IFVzZXJQZXRcbiAgYmFzZVBldFVyaTogc3RyaW5nXG59KSA9PiB7XG4gIHNldFN0YXRlKCdiYXNlUGV0VXJpJywgYmFzZVBldFVyaSlcblxuICBpZiAodXNlclBldCkge1xuICAgIGFkZFBldFRvUGFuZWwoeyB1c2VyUGV0IH0pXG4gIH1cbiAgLy8gSGFuZGxlIG1lc3NhZ2VzIHNlbnQgZnJvbSB0aGUgZXh0ZW5zaW9uIHRvIHRoZSB3ZWJ2aWV3XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgKGV2ZW50KTogdm9pZCA9PiB7XG4gICAgY29uc3QgeyBjb21tYW5kLCBkYXRhIH0gPSBldmVudC5kYXRhIC8vIFRoZSBkYXRhIHRoYXQgdGhlIGV4dGVuc2lvbiBzZW50XG4gICAgc3dpdGNoIChjb21tYW5kKSB7XG4gICAgICBjYXNlICdzcGF3bi1wZXQnOlxuICAgICAgICBhZGRQZXRUb1BhbmVsKHsgdXNlclBldDogZGF0YS51c2VyUGV0IH0pXG4gICAgICAgIGJyZWFrXG5cbiAgICAgIGNhc2UgJ3VwZGF0ZS1wZXQnOlxuICAgICAgICBhZGRQZXRUb1BhbmVsKHtcbiAgICAgICAgICB1c2VyUGV0OiB7XG4gICAgICAgICAgICAuLi5kYXRhLnVzZXJQZXQsXG4gICAgICAgICAgICBsZWZ0UG9zaXRpb246IHN0YXRlLnVzZXJQZXQubGVmdFBvc2l0aW9uLFxuICAgICAgICAgICAgZGlyZWN0aW9uOiBzdGF0ZS51c2VyUGV0LmRpcmVjdGlvbixcbiAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgICAgICBicmVha1xuICAgIH1cbiAgfSlcbn1cbiIsImltcG9ydCB7XG4gIFBldCxcbiAgVXNlclBldEFyZ3MsXG4gIERpcmVjdGlvbixcbiAgUGV0QW5pbWF0aW9uLFxuICBVc2VyUGV0LFxuICBQZXRMZXZlbCxcbn0gZnJvbSAnLi8nXG5pbXBvcnQgeyBhbGxQZXRzIH0gZnJvbSAnLi9wZXRzX2RhdGFzZXQnXG5cbmNvbnN0IGFuaW1hdGlvbkRlZmF1bHRzID0ge1xuICB3aWR0aDogNzUsXG4gIGhlaWdodDogNjQsXG4gIHNwZWVkOiAwLFxuICBvZmZzZXQ6IDAsXG59XG5cbi8vIEdlbmVyaWMgZXZvbHV0aW9uIHRyYW5zaXRpb25cbmNvbnN0IHRyYW5zaXRpb246IFBldEFuaW1hdGlvbiA9IHtcbiAgLi4uYW5pbWF0aW9uRGVmYXVsdHMsXG4gIGdpZjogJ2R1c3QyLmdpZicsXG4gIG9mZnNldDogLTgwLFxuICB3aWR0aDogMjgwLFxuICBoZWlnaHQ6IDEwMCxcbn1cblxuY29uc3QgZ2V0RWdnID0gKG5hbWU6IHN0cmluZyk6IFBldExldmVsID0+ICh7XG4gIGRlZmF1bHRTdGF0ZTogJ2lkbGUnLFxuICBhbmltYXRpb25zOiB7XG4gICAgaWRsZToge1xuICAgICAgLi4uYW5pbWF0aW9uRGVmYXVsdHMsXG4gICAgICBnaWY6IGAke25hbWV9L3JhbmswLmdpZmAsXG4gICAgfSxcbiAgICB0cmFuc2l0aW9uOiB7XG4gICAgICAuLi5hbmltYXRpb25EZWZhdWx0cyxcbiAgICAgIGdpZjogJ2R1c3QxLmdpZicsXG4gICAgICBvZmZzZXQ6IDYsXG4gICAgICB3aWR0aDogMTAwLFxuICAgICAgaGVpZ2h0OiAxMDAsXG4gICAgfSxcbiAgfSxcbn0pXG5cbmNvbnN0IGdldFBldENvbnRlbnQgPSAobmFtZTogc3RyaW5nLCBuYkZyYW1lOiBudW1iZXIpID0+IHtcblxuICBjb25zdCBlZ2cgPSBnZXRFZ2cobmFtZSlcbiAgY29uc3QgcmVzID0gW2VnZ11cbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBuYkZyYW1lOyBpICs9IDEpIHtcbiAgICByZXMucHVzaCh7XG4gICAgICBkZWZhdWx0U3RhdGU6ICd3YWxraW5nJyxcbiAgICAgIGFuaW1hdGlvbnM6IHtcbiAgICAgICAgdHJhbnNpdGlvbixcbiAgICAgICAgd2Fsa2luZzoge1xuICAgICAgICAgIC4uLmFuaW1hdGlvbkRlZmF1bHRzLFxuICAgICAgICAgIHdpZHRoOiBNYXRoLm1pbig3NSArIGkgKiAzLCAxMzUpLFxuICAgICAgICAgIGhlaWdodDogTWF0aC5taW4oNjQgKyBpICozLCAxMjUpLFxuICAgICAgICAgIGdpZjogYCR7bmFtZX0vcmFuayR7aX0uZ2lmYCxcbiAgICAgICAgICBzcGVlZDogMyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSBhcyBQZXRMZXZlbClcbiAgfVxuXG4gIGNvbnN0IG1hcGVkUGV0cyA9IG5ldyBNYXAocmVzLm1hcCgocGV0LCBpbmRleCkgPT4gW1xuICAgIGluZGV4IDw9IDEgPyBpbmRleCA6IGluZGV4ICogMyxcbiAgICBwZXRcbiAgXSkpXG4gIHJldHVybiBtYXBlZFBldHNcbn1cblxuZXhwb3J0IGNvbnN0IHBldFR5cGVzID0gbmV3IE1hcDxzdHJpbmcsIFBldD4oXG4gIGFsbFBldHMubWFwKChwZXQpID0+IFtcbiAgICBwZXQubmFtZSxcbiAgICB7XG4gICAgICBsZXZlbHM6IGdldFBldENvbnRlbnQocGV0Lm5hbWUsIHBldC5uYkdpZilcbiAgICB9XG4gIF0pXG4pXG5cbmV4cG9ydCBjb25zdCByYW5kb21QZXRUeXBlID0gKCk6IHN0cmluZyA9PlxuICBBcnJheS5mcm9tKHBldFR5cGVzLmtleXMoKSlbXG4gIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBldFR5cGVzLnNpemUpXG4gIF0gYXMgc3RyaW5nXG5cbmV4cG9ydCBjb25zdCBnZXRQZXRBbmltYXRpb25zID0gKHtcbiAgdXNlclBldCxcbn06IHtcbiAgdXNlclBldDogVXNlclBldFxufSk6IHtcbiAgYW5pbWF0aW9uOiBQZXRBbmltYXRpb25cbiAgdHJhbnNpdGlvbjogUGV0QW5pbWF0aW9uIHwgdW5kZWZpbmVkXG59ID0+IHtcbiAgY29uc3QgcGV0VHlwZUZvdW5kID0gcGV0VHlwZXMuZ2V0KHVzZXJQZXQudHlwZSlcbiAgaWYgKCFwZXRUeXBlRm91bmQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFBldCB0eXBlIG5vdCBmb3VuZDogJHt1c2VyUGV0LnR5cGV9YClcbiAgfVxuXG4gIGNvbnN0IGxldmVsRm91bmQgPSBwZXRUeXBlRm91bmQubGV2ZWxzLmdldCh1c2VyUGV0LmxldmVsKSB8fCBwZXRUeXBlRm91bmQubGV2ZWxzLmdldCh1c2VyUGV0LnJhbmspXG4gIGlmICghbGV2ZWxGb3VuZCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBQZXQgbGV2ZWwgbm90IGZvdW5kIGZvciBwZXQgdHlwZSAke3VzZXJQZXQudHlwZX06ICR7dXNlclBldC5sZXZlbH1gXG4gICAgKVxuICB9XG4gIGxldmVsRm91bmQuYW5pbWF0aW9ucy50cmFuc2l0aW9uLmdpZiA9IHBldFR5cGVGb3VuZC5sZXZlbHMuZ2V0KHVzZXJQZXQubGV2ZWwpID8gJ2R1c3QyLmdpZicgOiAnZHVzdDEuZ2lmJ1xuXG4gIGlmICghKHVzZXJQZXQuc3RhdGUgaW4gbGV2ZWxGb3VuZC5hbmltYXRpb25zKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBBbmltYXRpb24gbm90IGZvdW5kIGZvciBwZXQgdHlwZSAke3VzZXJQZXQudHlwZX0sIGxldmVsICR7dXNlclBldC5sZXZlbH06ICR7dXNlclBldC5zdGF0ZX1gXG4gICAgKVxuICB9XG4gIGNvbnN0IHRyYW5zaXRpb24gPVxuICAgICd0cmFuc2l0aW9uJyBpbiBsZXZlbEZvdW5kLmFuaW1hdGlvbnNcbiAgICAgID8gbGV2ZWxGb3VuZC5hbmltYXRpb25zLnRyYW5zaXRpb25cbiAgICAgIDogdW5kZWZpbmVkXG5cbiAgcmV0dXJuIHtcbiAgICBhbmltYXRpb246IGxldmVsRm91bmQuYW5pbWF0aW9uc1t1c2VyUGV0LnN0YXRlXSxcbiAgICB0cmFuc2l0aW9uLFxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBnZW5lcmF0ZVBldCA9ICh7IG5hbWUsIHR5cGUgfTogVXNlclBldEFyZ3MpOiBVc2VyUGV0ID0+ICh7XG4gIGxlZnRQb3NpdGlvbjogMCxcbiAgc3BlZWQ6IDAsXG4gIGRpcmVjdGlvbjogRGlyZWN0aW9uLnJpZ2h0LFxuICBsZXZlbDogMCxcbiAgeHA6IDAsXG4gIHJhbms6IDAsXG4gIC8vIEFsbCBsZXZlbCAwIGNoYXJhY3RlcnMgcmVxdWlyZSB0aGlzIHN0YXRlXG4gIHN0YXRlOiAnaWRsZScsXG4gIGlzVHJhbnNpdGlvbkluOiB0cnVlLFxuICBuYW1lLFxuICB0eXBlLFxufSlcblxuZXhwb3J0IGNvbnN0IGdldExldmVsID0gKHtcbiAgcGV0VHlwZSxcbiAgbGV2ZWwsXG59OiB7XG4gIHBldFR5cGU6IHN0cmluZ1xuICBsZXZlbDogbnVtYmVyXG59KSA9PiB7XG4gIGNvbnN0IHBldFR5cGVGb3VuZCA9IHBldFR5cGVzLmdldChwZXRUeXBlKVxuICBpZiAoIXBldFR5cGVGb3VuZCkge1xuICAgIHJldHVybiB1bmRlZmluZWRcbiAgfVxuXG4gIGNvbnN0IGxldmVsRm91bmQgPSBwZXRUeXBlRm91bmQubGV2ZWxzLmdldChsZXZlbClcbiAgaWYgKCFsZXZlbEZvdW5kKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZFxuICB9XG5cbiAgcmV0dXJuIGxldmVsRm91bmRcbn1cblxuXG5leHBvcnQgY29uc3QgZ2V0TmV4dExldmVsQ2FwID0gKGFjdHVhbExldmVsOiBudW1iZXIpID0+IHtcbiAgcmV0dXJuIE1hdGgucG93KE1hdGgubG9nKGFjdHVhbExldmVsICogMyArIDEpLCAxLjUpICogMTAwXG59XG5cbmV4cG9ydCBjb25zdCBtdXRhdGVMZXZlbCA9ICh7IHVzZXJQZXQgfTogeyB1c2VyUGV0OiBVc2VyUGV0IH0pID0+IHtcbiAgY29uc3QgbmV4dExldmVsRm91bmQgPSBnZXRMZXZlbCh7XG4gICAgcGV0VHlwZTogdXNlclBldC50eXBlLFxuICAgIGxldmVsOiB1c2VyUGV0LmxldmVsICsgMSxcbiAgfSlcbiAgaWYgKHVzZXJQZXQueHAgPj0gZ2V0TmV4dExldmVsQ2FwKHVzZXJQZXQubGV2ZWwpKSB7XG4gICAgdXNlclBldC5sZXZlbCArPSAxXG4gICAgdXNlclBldC54cCA9IDBcbiAgICB1c2VyUGV0LmlzVHJhbnNpdGlvbkluID0gdHJ1ZVxuXG4gICAgaWYgKCFuZXh0TGV2ZWxGb3VuZCkgcmV0dXJuXG4gICAgdXNlclBldC5yYW5rID0gdXNlclBldC5sZXZlbFxuICAgIHVzZXJQZXQuc3RhdGUgPSBuZXh0TGV2ZWxGb3VuZC5kZWZhdWx0U3RhdGVcbiAgICB1c2VyUGV0LnNwZWVkID0gbmV4dExldmVsRm91bmQuYW5pbWF0aW9uc1tuZXh0TGV2ZWxGb3VuZC5kZWZhdWx0U3RhdGVdPy5zcGVlZCB8fCAwXG4gIH1cbn1cbiIsImltcG9ydCB7IFBldExldmVsIH0gZnJvbSBcIi4vdHlwZXNcIlxuXG5leHBvcnQgdHlwZSBwZXREYXRhID0ge1xuICAgIG5hbWU6IHN0cmluZyxcbiAgICBuYkdpZjogbnVtYmVyLFxufVxuXG5jb25zdCBNYXJ2aW4gPSB7XG4gICAgbmFtZTogXCJNYXJ2aW5cIixcbiAgICBuYkdpZjogNCxcbn1cblxuY29uc3QgcGV0aXRQYXRyb25zID0ge1xuICAgIG5hbWUgOiAgXCJsZXNQZXRpdHNQYXRyb25cIixcbiAgICBuYkdpZjogNixcbn1cblxuZXhwb3J0IGNvbnN0IGFsbFBldHMgPSBbXG4gICAgTWFydmluLFxuICAgIHBldGl0UGF0cm9uc1xuXSIsImltcG9ydCB7IFN0YXRlIH0gZnJvbSAnLi8nXG5cbmV4cG9ydCBsZXQgc3RhdGU6IFN0YXRlXG5cbmV4cG9ydCBjb25zdCBpbml0aWFsaXplU3RhdGUgPSAoaW5pdGlhbFN0YXRlOiBTdGF0ZSkgPT4gKHN0YXRlID0gaW5pdGlhbFN0YXRlKVxuXG5leHBvcnQgY29uc3Qgc2V0U3RhdGUgPSA8SyBleHRlbmRzIGtleW9mIFN0YXRlPihrZXk6IEssIHZhbHVlOiBTdGF0ZVtLXSkgPT5cbiAgKHN0YXRlID0ge1xuICAgIC4uLnN0YXRlLFxuICAgIFtrZXldOiB2YWx1ZSxcbiAgfSlcbiIsImltcG9ydCB7IFRyYW5zZm9ybXMsIE5leHRGcmFtZU9wdHMsIERpcmVjdGlvbiB9IGZyb20gJy4vJ1xuXG5leHBvcnQgY29uc3QgdHJhbnNmb3JtczogVHJhbnNmb3JtcyA9IHtcbiAgaWRsZToge1xuICAgIG5leHRGcmFtZTogKHsgZGlyZWN0aW9uLCBvZmZzZXQgfTogTmV4dEZyYW1lT3B0cykgPT4gKHtcbiAgICAgIGRpcmVjdGlvbixcbiAgICAgIGxlZnRQb3NpdGlvbjogb2Zmc2V0LFxuICAgIH0pLFxuICB9LFxuICB3YWxraW5nOiB7XG4gICAgbmV4dEZyYW1lOiAoe1xuICAgICAgY29udGFpbmVyV2lkdGgsXG4gICAgICBsZWZ0UG9zaXRpb246IG9sZExlZnRQb3NpdGlvbixcbiAgICAgIGRpcmVjdGlvbjogb2xkRGlyZWN0aW9uLFxuICAgICAgc3BlZWQsXG4gICAgfTogLy8gb2Zmc2V0LFxuICAgIE5leHRGcmFtZU9wdHMpID0+IHtcbiAgICAgIGNvbnN0IGRpcmVjdGlvbiA9XG4gICAgICAgIG9sZExlZnRQb3NpdGlvbiA+PSBjb250YWluZXJXaWR0aCAtIHNwZWVkIC0gMTUwXG4gICAgICAgICAgPyBEaXJlY3Rpb24ubGVmdFxuICAgICAgICAgIDogb2xkTGVmdFBvc2l0aW9uIDw9IDAgKyBzcGVlZFxuICAgICAgICAgID8gRGlyZWN0aW9uLnJpZ2h0XG4gICAgICAgICAgOiBvbGREaXJlY3Rpb25cblxuICAgICAgY29uc3QgbGVmdFBvc2l0aW9uID1cbiAgICAgICAgZGlyZWN0aW9uID09PSBEaXJlY3Rpb24ucmlnaHRcbiAgICAgICAgICA/IG9sZExlZnRQb3NpdGlvbiArIHNwZWVkXG4gICAgICAgICAgOiBvbGRMZWZ0UG9zaXRpb24gLSBzcGVlZFxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBkaXJlY3Rpb24sXG4gICAgICAgIGxlZnRQb3NpdGlvbixcbiAgICAgIH1cbiAgICB9LFxuICB9LFxufVxuIiwiaW1wb3J0IHsgYWxsUGV0cywgcGV0RGF0YSB9IGZyb20gXCIuL3BldHNfZGF0YXNldFwiXG5cbmV4cG9ydCB0eXBlIFN0YXRlID0ge1xuICBmaWxlOiBzdHJpbmdbXVxuICB1c2VyUGV0OiBVc2VyUGV0XG4gIGJhc2VQZXRVcmk6IHN0cmluZ1xuICBpbnRlcnZhbElkPzogTm9kZUpTLlRpbWVvdXQgfCB1bmRlZmluZWRcbn1cblxuZXhwb3J0IHR5cGUgR2lmcyA9IHsgW25hbWU6IHN0cmluZ106IHN0cmluZyB9XG5cbmV4cG9ydCB0eXBlIFBldFN0YXRlID0gJ3dhbGtpbmcnIHwgJ2lkbGUnIHwgJ3RyYW5zaXRpb24nXG5cbmV4cG9ydCB0eXBlIFBldEFuaW1hdGlvbiA9IHtcbiAgZ2lmOiBzdHJpbmdcbiAgd2lkdGg6IG51bWJlclxuICBoZWlnaHQ6IG51bWJlclxuICBvZmZzZXQ/OiBudW1iZXJcbiAgc3BlZWQ/OiBudW1iZXJcbiAgZHVyYXRpb24/OiBudW1iZXJcbn1cblxuZXhwb3J0IHR5cGUgUGV0TGV2ZWwgPSB7XG4gIGRlZmF1bHRTdGF0ZTogUGV0U3RhdGVcbiAgYW5pbWF0aW9uczoge1xuICAgIFtuYW1lOiBzdHJpbmddOiBQZXRBbmltYXRpb25cbiAgfVxufVxuXG5leHBvcnQgdHlwZSBQZXQgPSB7XG4gIGxldmVsczogTWFwPG51bWJlciwgUGV0TGV2ZWw+XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVXNlclBldEJhc2VQcm9wcyB7XG4gIGxlZnRQb3NpdGlvbjogbnVtYmVyXG4gIHNwZWVkOiBudW1iZXJcbiAgZGlyZWN0aW9uOiBudW1iZXJcbiAgbGV2ZWw6IG51bWJlclxuICB4cDogbnVtYmVyXG4gIHJhbms6IG51bWJlclxuICBzdGF0ZTogUGV0U3RhdGVcbiAgaXNUcmFuc2l0aW9uSW46IGJvb2xlYW5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBVc2VyUGV0QXJncyB7XG4gIG5hbWU6IHN0cmluZ1xuICB0eXBlOiBzdHJpbmdcbn1cblxuZXhwb3J0IHR5cGUgVXNlclBldCA9IFVzZXJQZXRCYXNlUHJvcHMgJiBVc2VyUGV0QXJnc1xuXG5leHBvcnQgZW51bSBEaXJlY3Rpb24ge1xuICByaWdodCA9IDEsXG4gIGxlZnQgPSAtMSxcbn1cblxuZXhwb3J0IHR5cGUgTmV4dEZyYW1lT3B0cyA9IHtcbiAgY29udGFpbmVyV2lkdGg6IG51bWJlclxuICBsZWZ0UG9zaXRpb246IG51bWJlclxuICBkaXJlY3Rpb246IG51bWJlclxuICBzcGVlZDogbnVtYmVyXG4gIG9mZnNldDogbnVtYmVyXG59XG5cbmV4cG9ydCB0eXBlIE5leHRGcmFtZUZuUmV0dXJuID0ge1xuICBsZWZ0UG9zaXRpb246IG51bWJlclxuICBkaXJlY3Rpb246IG51bWJlclxuICBuZXdQZXRTdGF0ZT86IFBldFN0YXRlXG59XG5cbmV4cG9ydCB0eXBlIE5leHRGcmFtZUZuID0gKG9wdHM6IE5leHRGcmFtZU9wdHMpID0+IE5leHRGcmFtZUZuUmV0dXJuXG5cbmV4cG9ydCB0eXBlIFRyYW5zZm9ybXMgPSB7XG4gIFt0cmFuc2Zvcm06IHN0cmluZ106IHtcbiAgICBuZXh0RnJhbWU6IE5leHRGcmFtZUZuXG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9wYW5lbC9tYWluLnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9