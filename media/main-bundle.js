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
        index <= 1 ? index : index * 3 - 2,
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
    const levelFound = petTypeFound.levels.get(userPet.level > 1 ? userPet.rank * 3 - 2 : userPet.level);
    if (!levelFound) {
        throw new Error(`Pet level not found for pet type ${userPet.type}: ${userPet.rank}`);
    }
    levelFound.animations.transition.gif = (userPet.level - 1) % 3 ? 'dust1.gif' : 'dust2.gif';
    if (!(userPet.state in levelFound.animations)) {
        throw new Error(`Animation not found for pet type ${userPet.type}, level ${userPet.rank}: ${userPet.state}`);
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
const getLevel = ({ petType, rank, }) => {
    if (!rank) {
        return undefined;
    }
    const petTypeFound = exports.petTypes.get(petType);
    if (!petTypeFound) {
        return undefined;
    }
    console.log(rank);
    const levelFound = petTypeFound.levels.get(rank === 1 ? 1 : rank * 3 - 2);
    if (!levelFound) {
        return undefined;
    }
    return levelFound;
};
exports.getLevel = getLevel;
const getNextLevelCap = (actualLevel) => {
    return 10; //Math.pow(Math.log(actualLevel * 3 + 1), 1.5) * 100
};
exports.getNextLevelCap = getNextLevelCap;
const mutateLevel = ({ userPet }) => {
    var _a;
    const nextLevelFound = (0, exports.getLevel)({
        petType: userPet.type,
        rank: userPet.level >= 1 && (userPet.level + 1) % 3 ? null : userPet.rank + 1,
    });
    if (userPet.xp >= (0, exports.getNextLevelCap)(userPet.level)) {
        userPet.level += 1;
        userPet.xp = 0;
        userPet.isTransitionIn = true;
        const petData = pets_dataset_1.allPets.find((pet) => pet.name === userPet.type);
        userPet.rank = (petData === null || petData === void 0 ? void 0 : petData.loop) && userPet.rank + 1 >= petData.nbGif ? 0 : userPet.rank;
        if (!nextLevelFound)
            return;
        userPet.rank = userPet.rank + 1;
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
const tiPhoenix = {
    name: "tiPhoenix",
    nbGif: 5,
    loop: true
};
exports.allPets = [
    Marvin,
    petitPatrons,
    tiPhoenix
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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TUFBTSxFQUFpQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3BELFNBQVM7WUFDVCxZQUFZLEVBQUUsTUFBTTtTQUNyQixDQUFDO0tBQ0g7SUFDRCxPQUFPLEVBQUU7UUFDUCxTQUFTLEVBQUUsQ0FBQyxFQUNWLGNBQWMsRUFDZCxZQUFZLEVBQUUsZUFBZSxFQUM3QixTQUFTLEVBQUUsWUFBWSxFQUN2QixLQUFLLEdBRU0sRUFBRSxFQUFFO1lBQ2YsTUFBTSxTQUFTLEdBQ2IsZUFBZSxJQUFJLGNBQWMsR0FBRyxLQUFLLEdBQUcsR0FBRztnQkFDN0MsQ0FBQyxDQUFDLFlBQVMsQ0FBQyxJQUFJO2dCQUNoQixDQUFDLENBQUMsZUFBZSxJQUFJLENBQUMsR0FBRyxLQUFLO29CQUM5QixDQUFDLENBQUMsWUFBUyxDQUFDLEtBQUs7b0JBQ2pCLENBQUMsQ0FBQyxZQUFZO1lBRWxCLE1BQU0sWUFBWSxHQUNoQixTQUFTLEtBQUssWUFBUyxDQUFDLEtBQUs7Z0JBQzNCLENBQUMsQ0FBQyxlQUFlLEdBQUcsS0FBSztnQkFDekIsQ0FBQyxDQUFDLGVBQWUsR0FBRyxLQUFLO1lBRTdCLE9BQU87Z0JBQ0wsU0FBUztnQkFDVCxZQUFZO2FBQ2I7UUFDSCxDQUFDO0tBQ0Y7Q0FDRjs7Ozs7Ozs7Ozs7Ozs7QUNnQkQsSUFBWSxTQUdYO0FBSEQsV0FBWSxTQUFTO0lBQ25CLDJDQUFTO0lBQ1QsMENBQVM7QUFDWCxDQUFDLEVBSFcsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFHcEI7Ozs7Ozs7VUN0REQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2NvZGFjaGlBcHAvLi9zcmMvcGFuZWwvZG9tLnRzIiwid2VicGFjazovL2NvZGFjaGlBcHAvLi9zcmMvcGFuZWwvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vY29kYWNoaUFwcC8uL3NyYy9wYW5lbC9tYWluLnRzIiwid2VicGFjazovL2NvZGFjaGlBcHAvLi9zcmMvcGFuZWwvcGV0cy50cyIsIndlYnBhY2s6Ly9jb2RhY2hpQXBwLy4vc3JjL3BhbmVsL3BldHNfZGF0YXNldC50cyIsIndlYnBhY2s6Ly9jb2RhY2hpQXBwLy4vc3JjL3BhbmVsL3N0YXRlLnRzIiwid2VicGFjazovL2NvZGFjaGlBcHAvLi9zcmMvcGFuZWwvdHJhbnNmb3Jtcy50cyIsIndlYnBhY2s6Ly9jb2RhY2hpQXBwLy4vc3JjL3BhbmVsL3R5cGVzLnRzIiwid2VicGFjazovL2NvZGFjaGlBcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY29kYWNoaUFwcC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2NvZGFjaGlBcHAvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2NvZGFjaGlBcHAvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBET00ge1xuICBwcml2YXRlIF9wZXRJbWFnZVNlbGVjdG9yOiBzdHJpbmdcbiAgcHJpdmF0ZSBfbW92ZW1lbnRDb250YWluZXJTZWxlY3Rvcjogc3RyaW5nXG4gIHByaXZhdGUgX3RyYW5zaXRpb25Db250YWluZXJTZWxlY3Rvcjogc3RyaW5nXG4gIHByaXZhdGUgX3RyYW5zaXRpb25TZWxlY3Rvcjogc3RyaW5nXG5cbiAgcHJpdmF0ZSBfbW92ZW1lbnRDb250YWluZXJFbGVtZW50OiBIVE1MRWxlbWVudCB8IHVuZGVmaW5lZFxuICBwcml2YXRlIF9wZXRJbWFnZUVsZW1lbnQ6IEhUTUxJbWFnZUVsZW1lbnQgfCB1bmRlZmluZWRcbiAgcHJpdmF0ZSBfdHJhbnNpdGlvbkNvbnRhaW5lckVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgdW5kZWZpbmVkXG4gIHByaXZhdGUgX3RyYW5zaXRpb25JbWFnZUVsZW1lbnQ6IEhUTUxJbWFnZUVsZW1lbnQgfCB1bmRlZmluZWRcblxuICBjb25zdHJ1Y3Rvcih7XG4gICAgbW92ZW1lbnRDb250YWluZXJTZWxlY3RvcixcbiAgICBwZXRJbWFnZVNlbGVjdG9yLFxuICAgIHRyYW5zaXRpb25Db250YWluZXJTZWxlY3RvcixcbiAgICB0cmFuc2l0aW9uU2VsZWN0b3IsXG4gIH06IHtcbiAgICBwZXRJbWFnZVNlbGVjdG9yOiBzdHJpbmdcbiAgICBtb3ZlbWVudENvbnRhaW5lclNlbGVjdG9yOiBzdHJpbmdcbiAgICB0cmFuc2l0aW9uQ29udGFpbmVyU2VsZWN0b3I6IHN0cmluZ1xuICAgIHRyYW5zaXRpb25TZWxlY3Rvcjogc3RyaW5nXG4gIH0pIHtcbiAgICB0aGlzLl9wZXRJbWFnZVNlbGVjdG9yID0gcGV0SW1hZ2VTZWxlY3RvclxuICAgIHRoaXMuX21vdmVtZW50Q29udGFpbmVyU2VsZWN0b3IgPSBtb3ZlbWVudENvbnRhaW5lclNlbGVjdG9yXG4gICAgdGhpcy5fdHJhbnNpdGlvbkNvbnRhaW5lclNlbGVjdG9yID0gdHJhbnNpdGlvbkNvbnRhaW5lclNlbGVjdG9yXG4gICAgdGhpcy5fdHJhbnNpdGlvblNlbGVjdG9yID0gdHJhbnNpdGlvblNlbGVjdG9yXG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0SFRNTEVsZW1lbnQgPSA8VD4oZWxlbWVudE5hbWU6IHN0cmluZyk6IFQgPT4ge1xuICAgIGNvbnN0IGh0bWxFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudE5hbWUpIGFzIHVua25vd25cbiAgICBpZiAoIWh0bWxFbGVtZW50KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuYWJsZSB0byBsb2NhdGUgZWxlbWVudCBpbiBET006ICR7ZWxlbWVudE5hbWV9YClcbiAgICB9XG5cbiAgICByZXR1cm4gaHRtbEVsZW1lbnQgYXMgVFxuICB9XG5cbiAgZ2V0TW92ZW1lbnRTZWxlY3RvcigpOiBIVE1MRWxlbWVudCB7XG4gICAgaWYgKCF0aGlzLl9tb3ZlbWVudENvbnRhaW5lckVsZW1lbnQpIHtcbiAgICAgIHRoaXMuX21vdmVtZW50Q29udGFpbmVyRWxlbWVudCA9IHRoaXMuZ2V0SFRNTEVsZW1lbnQ8SFRNTEVsZW1lbnQ+KFxuICAgICAgICB0aGlzLl9tb3ZlbWVudENvbnRhaW5lclNlbGVjdG9yXG4gICAgICApXG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9tb3ZlbWVudENvbnRhaW5lckVsZW1lbnRcbiAgfVxuXG4gIGdldFBldEltYWdlU2VsZWN0b3IoKTogSFRNTEltYWdlRWxlbWVudCB7XG4gICAgaWYgKCF0aGlzLl9wZXRJbWFnZUVsZW1lbnQpIHtcbiAgICAgIHRoaXMuX3BldEltYWdlRWxlbWVudCA9IHRoaXMuZ2V0SFRNTEVsZW1lbnQ8SFRNTEltYWdlRWxlbWVudD4oXG4gICAgICAgIHRoaXMuX3BldEltYWdlU2VsZWN0b3JcbiAgICAgIClcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3BldEltYWdlRWxlbWVudFxuICB9XG5cbiAgZ2V0VHJhbnNpdGlvblNlbGVjdG9yKCk6IEhUTUxFbGVtZW50IHtcbiAgICBpZiAoIXRoaXMuX3RyYW5zaXRpb25Db250YWluZXJFbGVtZW50KSB7XG4gICAgICB0aGlzLl90cmFuc2l0aW9uQ29udGFpbmVyRWxlbWVudCA9IHRoaXMuZ2V0SFRNTEVsZW1lbnQ8SFRNTEVsZW1lbnQ+KFxuICAgICAgICB0aGlzLl90cmFuc2l0aW9uQ29udGFpbmVyU2VsZWN0b3JcbiAgICAgIClcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3RyYW5zaXRpb25Db250YWluZXJFbGVtZW50XG4gIH1cblxuICBnZXRUcmFuc2l0aW9uSW1hZ2VTZWxlY3RvcigpOiBIVE1MSW1hZ2VFbGVtZW50IHtcbiAgICBpZiAoIXRoaXMuX3RyYW5zaXRpb25JbWFnZUVsZW1lbnQpIHtcbiAgICAgIHRoaXMuX3RyYW5zaXRpb25JbWFnZUVsZW1lbnQgPSB0aGlzLmdldEhUTUxFbGVtZW50PEhUTUxJbWFnZUVsZW1lbnQ+KFxuICAgICAgICB0aGlzLl90cmFuc2l0aW9uU2VsZWN0b3JcbiAgICAgIClcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3RyYW5zaXRpb25JbWFnZUVsZW1lbnRcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgcGV0VHlwZXMsXG4gIGdldFBldEFuaW1hdGlvbnMsXG4gIGdlbmVyYXRlUGV0LFxuICBtdXRhdGVMZXZlbCxcbiAgcmFuZG9tUGV0VHlwZSxcbn0gZnJvbSAnLi9wZXRzJ1xuaW1wb3J0IHsgdHJhbnNmb3JtcyB9IGZyb20gJy4vdHJhbnNmb3JtcydcbmltcG9ydCB7XG4gIFBldCxcbiAgUGV0U3RhdGUsXG4gIFVzZXJQZXRCYXNlUHJvcHMsXG4gIFVzZXJQZXRBcmdzLFxuICBVc2VyUGV0LFxuICBEaXJlY3Rpb24sXG4gIE5leHRGcmFtZU9wdHMsXG4gIE5leHRGcmFtZUZuLFxuICBOZXh0RnJhbWVGblJldHVybixcbiAgVHJhbnNmb3JtcyxcbiAgUGV0QW5pbWF0aW9uLFxuICBQZXRMZXZlbCxcbiAgU3RhdGUsXG59IGZyb20gJy4vdHlwZXMnXG5pbXBvcnQgeyBET00gfSBmcm9tICcuL2RvbSdcbmltcG9ydCB7IHN0YXRlLCBpbml0aWFsaXplU3RhdGUsIHNldFN0YXRlIH0gZnJvbSAnLi9zdGF0ZSdcblxuZXhwb3J0IHtcbiAgcGV0VHlwZXMsXG4gIGdldFBldEFuaW1hdGlvbnMsXG4gIGdlbmVyYXRlUGV0LFxuICBtdXRhdGVMZXZlbCxcbiAgcmFuZG9tUGV0VHlwZSxcbiAgUGV0LFxuICBQZXRTdGF0ZSxcbiAgVXNlclBldEJhc2VQcm9wcyxcbiAgVXNlclBldEFyZ3MsXG4gIFVzZXJQZXQsXG4gIERpcmVjdGlvbixcbiAgTmV4dEZyYW1lT3B0cyxcbiAgTmV4dEZyYW1lRm4sXG4gIE5leHRGcmFtZUZuUmV0dXJuLFxuICBUcmFuc2Zvcm1zLFxuICBQZXRBbmltYXRpb24sXG4gIFBldExldmVsLFxuICBTdGF0ZSxcbiAgaW5pdGlhbGl6ZVN0YXRlLFxuICBzdGF0ZSxcbiAgc2V0U3RhdGUsXG4gIHRyYW5zZm9ybXMsXG4gIERPTSxcbn1cbiIsImltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcbmltcG9ydCB7XG4gIFVzZXJQZXQsXG4gIHNldFN0YXRlLFxuICBnZXRQZXRBbmltYXRpb25zLFxuICBnZW5lcmF0ZVBldCxcbiAgdHJhbnNmb3JtcyxcbiAgRE9NLFxuICBzdGF0ZSxcbiAgUGV0QW5pbWF0aW9uLFxufSBmcm9tICcuLydcbmltcG9ydCB7IGluaXRpYWxpemVTdGF0ZSB9IGZyb20gJy4vc3RhdGUnXG5cbmNvbnN0IGRlZmF1bHRTdGF0ZSA9e1xuICB1c2VyUGV0OiBnZW5lcmF0ZVBldCh7IG5hbWU6ICd1bmtub3duJywgdHlwZTogJ3Vua25vd24nIH0pLFxuICBiYXNlUGV0VXJpOiAnJyxcbiAgZmlsZTogW1wiXCJdXG59XG5cbmluaXRpYWxpemVTdGF0ZShkZWZhdWx0U3RhdGUpXG5cbmNvbnN0IGRvbSA9IG5ldyBET00oe1xuICBtb3ZlbWVudENvbnRhaW5lclNlbGVjdG9yOiAnbW92ZW1lbnQtY29udGFpbmVyJyxcbiAgcGV0SW1hZ2VTZWxlY3RvcjogJ3BldCcsXG4gIHRyYW5zaXRpb25Db250YWluZXJTZWxlY3RvcjogJ3RyYW5zaXRpb24tY29udGFpbmVyJyxcbiAgdHJhbnNpdGlvblNlbGVjdG9yOiAndHJhbnNpdGlvbicsXG59KVxuXG5jb25zdCBUSUNLX0lOVEVSVkFMX01TID0gMTAwXG5cbmNvbnN0IHRpY2sgPSAoeyB1c2VyUGV0IH06IHsgdXNlclBldDogVXNlclBldCB9KSA9PiB7XG4gIGNvbnN0IHsgbGVmdFBvc2l0aW9uLCBkaXJlY3Rpb24gfSA9IHRyYW5zZm9ybXNbdXNlclBldC5zdGF0ZV0ubmV4dEZyYW1lKHtcbiAgICBjb250YWluZXJXaWR0aDpcbiAgICAgIHdpbmRvdy5pbm5lcldpZHRoIHx8XG4gICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggfHxcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGgsXG4gICAgbGVmdFBvc2l0aW9uOiB1c2VyUGV0LmxlZnRQb3NpdGlvbixcbiAgICBkaXJlY3Rpb246IHVzZXJQZXQuZGlyZWN0aW9uLFxuICAgIHNwZWVkOiB1c2VyUGV0LnNwZWVkLFxuICAgIG9mZnNldDogZ2V0UGV0QW5pbWF0aW9ucyh7IHVzZXJQZXQgfSkuYW5pbWF0aW9uLm9mZnNldCB8fCAwLFxuICB9KVxuXG4gIHVzZXJQZXQubGVmdFBvc2l0aW9uID0gbGVmdFBvc2l0aW9uXG4gIHVzZXJQZXQuZGlyZWN0aW9uID0gZGlyZWN0aW9uXG5cbiAgLy8gQXBwbHkgdHJhbnNmb3JtYXRpb25cbiAgY29uc3QgbW92ZW1lbnRDb250YWluZXIgPSBkb20uZ2V0TW92ZW1lbnRTZWxlY3RvcigpXG4gIG1vdmVtZW50Q29udGFpbmVyLnN0eWxlLm1hcmdpbkxlZnQgPSBgJHt1c2VyUGV0LmxlZnRQb3NpdGlvbn1weGBcblxuICBjb25zdCBwZXRJbWFnZUVsZW1lbnQgPSBkb20uZ2V0UGV0SW1hZ2VTZWxlY3RvcigpXG4gIHBldEltYWdlRWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBgc2NhbGVYKCR7dXNlclBldC5kaXJlY3Rpb259KWBcblxuICBpZiAodXNlclBldC5pc1RyYW5zaXRpb25Jbikge1xuICAgIGNvbnN0IHsgdHJhbnNpdGlvbjogYW5pbWF0aW9uIH0gPSBnZXRQZXRBbmltYXRpb25zKHtcbiAgICAgIHVzZXJQZXQsXG4gICAgfSlcblxuICAgIGlmIChhbmltYXRpb24pIHtcbiAgICAgIGNvbnN0IHRyYW5zaXRpb25Db250YWluZXIgPSBkb20uZ2V0VHJhbnNpdGlvblNlbGVjdG9yKClcbiAgICAgIHRyYW5zaXRpb25Db250YWluZXIuc3R5bGUubWFyZ2luTGVmdCA9IGAke3VzZXJQZXQubGVmdFBvc2l0aW9ufXB4YFxuXG4gICAgICBzZXRJbWFnZSh7XG4gICAgICAgIGNvbnRhaW5lcjogZG9tLmdldFRyYW5zaXRpb25TZWxlY3RvcigpLFxuICAgICAgICBzZWxlY3RvcjogZG9tLmdldFRyYW5zaXRpb25JbWFnZVNlbGVjdG9yKCksXG4gICAgICAgIGFuaW1hdGlvbixcbiAgICAgIH0pXG4gICAgICBzdGF0ZS51c2VyUGV0LmlzVHJhbnNpdGlvbkluID0gZmFsc2VcbiAgICB9XG4gIH1cbn1cblxuY29uc3Qgc2V0SW1hZ2UgPSAoe1xuICBjb250YWluZXIsXG4gIHNlbGVjdG9yLFxuICBhbmltYXRpb24sXG59OiB7XG4gIGNvbnRhaW5lcjogSFRNTEVsZW1lbnRcbiAgc2VsZWN0b3I6IEhUTUxJbWFnZUVsZW1lbnRcbiAgYW5pbWF0aW9uOiBQZXRBbmltYXRpb25cbn0pID0+IHtcbiAgY29uc3QgeyBiYXNlUGV0VXJpIH0gPSBzdGF0ZVxuXG4gIHNlbGVjdG9yLnNyYyA9IGAke2Jhc2VQZXRVcml9LyR7YW5pbWF0aW9uLmdpZn1gXG4gIHNlbGVjdG9yLndpZHRoID0gYW5pbWF0aW9uLndpZHRoXG4gIHNlbGVjdG9yLnN0eWxlLm1pbldpZHRoID0gYCR7YW5pbWF0aW9uLndpZHRofXB4YFxuICBzZWxlY3Rvci5oZWlnaHQgPSBhbmltYXRpb24uaGVpZ2h0XG5cbiAgY29udGFpbmVyLnN0eWxlLmxlZnQgPSBgJHthbmltYXRpb24ub2Zmc2V0ID8/IDB9cHhgXG59XG5cbmNvbnN0IHNsZWVwID0gKG1zOiBudW1iZXIpID0+IG5ldyBQcm9taXNlKChyKSA9PiBzZXRUaW1lb3V0KHIsIG1zKSlcblxuY29uc3Qgc3RhcnRBbmltYXRpb24gPSAoKSA9PiB7XG4gIGNvbnN0IHsgdXNlclBldCB9ID0gc3RhdGVcbiAgaWYgKHN0YXRlLmludGVydmFsSWQpIHtcbiAgICBjbGVhckludGVydmFsKHN0YXRlLmludGVydmFsSWQpXG4gIH1cbiAgY29uc3QgaW50ZXJ2YWxJZCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICB0aWNrKHsgdXNlclBldCB9KVxuICB9LCBUSUNLX0lOVEVSVkFMX01TKVxuICBzZXRTdGF0ZSgnaW50ZXJ2YWxJZCcsIGludGVydmFsSWQpXG59XG5cbmV4cG9ydCBjb25zdCBhZGRQZXRUb1BhbmVsID0gYXN5bmMgKHsgdXNlclBldCB9OiB7IHVzZXJQZXQ6IFVzZXJQZXQgfSkgPT4ge1xuICBzZXRTdGF0ZSgndXNlclBldCcsIHVzZXJQZXQpXG4gIHN0YXJ0QW5pbWF0aW9uKClcblxuICAvLyBHaXZlIHRoZSB0cmFuc2l0aW9uIGEgY2hhbmNlIHRvIHBsYXlcbiAgYXdhaXQgc2xlZXAoVElDS19JTlRFUlZBTF9NUyAqIDIpXG5cbiAgY29uc3QgeyBhbmltYXRpb24gfSA9IGdldFBldEFuaW1hdGlvbnMoe1xuICAgIHVzZXJQZXQsXG4gIH0pXG5cbiAgc2V0SW1hZ2Uoe1xuICAgIHNlbGVjdG9yOiBkb20uZ2V0UGV0SW1hZ2VTZWxlY3RvcigpLFxuICAgIGFuaW1hdGlvbixcbiAgICBjb250YWluZXI6IGRvbS5nZXRNb3ZlbWVudFNlbGVjdG9yKCksXG4gIH0pXG59XG5cbmV4cG9ydCBjb25zdCBhcHAgPSAoe1xuICB1c2VyUGV0LFxuICBiYXNlUGV0VXJpLFxufToge1xuICB1c2VyUGV0OiBVc2VyUGV0XG4gIGJhc2VQZXRVcmk6IHN0cmluZ1xufSkgPT4ge1xuICBzZXRTdGF0ZSgnYmFzZVBldFVyaScsIGJhc2VQZXRVcmkpXG5cbiAgaWYgKHVzZXJQZXQpIHtcbiAgICBhZGRQZXRUb1BhbmVsKHsgdXNlclBldCB9KVxuICB9XG4gIC8vIEhhbmRsZSBtZXNzYWdlcyBzZW50IGZyb20gdGhlIGV4dGVuc2lvbiB0byB0aGUgd2Vidmlld1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIChldmVudCk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IHsgY29tbWFuZCwgZGF0YSB9ID0gZXZlbnQuZGF0YSAvLyBUaGUgZGF0YSB0aGF0IHRoZSBleHRlbnNpb24gc2VudFxuICAgIHN3aXRjaCAoY29tbWFuZCkge1xuICAgICAgY2FzZSAnc3Bhd24tcGV0JzpcbiAgICAgICAgYWRkUGV0VG9QYW5lbCh7IHVzZXJQZXQ6IGRhdGEudXNlclBldCB9KVxuICAgICAgICBicmVha1xuXG4gICAgICBjYXNlICd1cGRhdGUtcGV0JzpcbiAgICAgICAgYWRkUGV0VG9QYW5lbCh7XG4gICAgICAgICAgdXNlclBldDoge1xuICAgICAgICAgICAgLi4uZGF0YS51c2VyUGV0LFxuICAgICAgICAgICAgbGVmdFBvc2l0aW9uOiBzdGF0ZS51c2VyUGV0LmxlZnRQb3NpdGlvbixcbiAgICAgICAgICAgIGRpcmVjdGlvbjogc3RhdGUudXNlclBldC5kaXJlY3Rpb24sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSlcbiAgICAgICAgYnJlYWtcbiAgICB9XG4gIH0pXG59XG4iLCJpbXBvcnQge1xuICBQZXQsXG4gIFVzZXJQZXRBcmdzLFxuICBEaXJlY3Rpb24sXG4gIFBldEFuaW1hdGlvbixcbiAgVXNlclBldCxcbiAgUGV0TGV2ZWwsXG59IGZyb20gJy4vJ1xuaW1wb3J0IHsgYWxsUGV0cyB9IGZyb20gJy4vcGV0c19kYXRhc2V0J1xuXG5jb25zdCBhbmltYXRpb25EZWZhdWx0cyA9IHtcbiAgd2lkdGg6IDc1LFxuICBoZWlnaHQ6IDY0LFxuICBzcGVlZDogMCxcbiAgb2Zmc2V0OiAwLFxufVxuXG4vLyBHZW5lcmljIGV2b2x1dGlvbiB0cmFuc2l0aW9uXG5jb25zdCB0cmFuc2l0aW9uOiBQZXRBbmltYXRpb24gPSB7XG4gIC4uLmFuaW1hdGlvbkRlZmF1bHRzLFxuICBnaWY6ICdkdXN0Mi5naWYnLFxuICBvZmZzZXQ6IC04MCxcbiAgd2lkdGg6IDI4MCxcbiAgaGVpZ2h0OiAxMDAsXG59XG5cbmNvbnN0IGdldEVnZyA9IChuYW1lOiBzdHJpbmcpOiBQZXRMZXZlbCA9PiAoe1xuICBkZWZhdWx0U3RhdGU6ICdpZGxlJyxcbiAgYW5pbWF0aW9uczoge1xuICAgIGlkbGU6IHtcbiAgICAgIC4uLmFuaW1hdGlvbkRlZmF1bHRzLFxuICAgICAgZ2lmOiBgJHtuYW1lfS9yYW5rMC5naWZgLFxuICAgIH0sXG4gICAgdHJhbnNpdGlvbjoge1xuICAgICAgLi4uYW5pbWF0aW9uRGVmYXVsdHMsXG4gICAgICBnaWY6ICdkdXN0MS5naWYnLFxuICAgICAgb2Zmc2V0OiA2LFxuICAgICAgd2lkdGg6IDEwMCxcbiAgICAgIGhlaWdodDogMTAwLFxuICAgIH0sXG4gIH0sXG59KVxuXG5jb25zdCBnZXRQZXRDb250ZW50ID0gKG5hbWU6IHN0cmluZywgbmJGcmFtZTogbnVtYmVyKSA9PiB7XG5cbiAgY29uc3QgZWdnID0gZ2V0RWdnKG5hbWUpXG4gIGNvbnN0IHJlcyA9IFtlZ2ddXG4gIGZvciAobGV0IGkgPSAxOyBpIDwgbmJGcmFtZTsgaSArPSAxKSB7XG4gICAgcmVzLnB1c2goe1xuICAgICAgZGVmYXVsdFN0YXRlOiAnd2Fsa2luZycsXG4gICAgICBhbmltYXRpb25zOiB7XG4gICAgICAgIHRyYW5zaXRpb24sXG4gICAgICAgIHdhbGtpbmc6IHtcbiAgICAgICAgICAuLi5hbmltYXRpb25EZWZhdWx0cyxcbiAgICAgICAgICB3aWR0aDogTWF0aC5taW4oNzUgKyBpICogMywgMTM1KSxcbiAgICAgICAgICBoZWlnaHQ6IE1hdGgubWluKDY0ICsgaSAqIDMsIDEyNSksXG4gICAgICAgICAgZ2lmOiBgJHtuYW1lfS9yYW5rJHtpfS5naWZgLFxuICAgICAgICAgIHNwZWVkOiAzLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9IGFzIFBldExldmVsKVxuICB9XG5cbiAgY29uc3QgbWFwZWRQZXRzID0gbmV3IE1hcChyZXMubWFwKChwZXQsIGluZGV4KSA9PiBbXG4gICAgaW5kZXggPD0gMSA/IGluZGV4IDogaW5kZXggKiAzIC0gMixcbiAgICBwZXRcbiAgXSkpXG4gIHJldHVybiBtYXBlZFBldHNcbn1cblxuZXhwb3J0IGNvbnN0IHBldFR5cGVzID0gbmV3IE1hcDxzdHJpbmcsIFBldD4oXG4gIGFsbFBldHMubWFwKChwZXQpID0+IFtcbiAgICBwZXQubmFtZSxcbiAgICB7XG4gICAgICBsZXZlbHM6IGdldFBldENvbnRlbnQocGV0Lm5hbWUsIHBldC5uYkdpZilcbiAgICB9XG4gIF0pXG4pXG5cbmV4cG9ydCBjb25zdCByYW5kb21QZXRUeXBlID0gKCk6IHN0cmluZyA9PlxuICBBcnJheS5mcm9tKHBldFR5cGVzLmtleXMoKSlbXG4gIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBldFR5cGVzLnNpemUpXG4gIF0gYXMgc3RyaW5nXG5cbmV4cG9ydCBjb25zdCBnZXRQZXRBbmltYXRpb25zID0gKHtcbiAgdXNlclBldCxcbn06IHtcbiAgdXNlclBldDogVXNlclBldFxufSk6IHtcbiAgYW5pbWF0aW9uOiBQZXRBbmltYXRpb25cbiAgdHJhbnNpdGlvbjogUGV0QW5pbWF0aW9uIHwgdW5kZWZpbmVkXG59ID0+IHtcbiAgY29uc3QgcGV0VHlwZUZvdW5kID0gcGV0VHlwZXMuZ2V0KHVzZXJQZXQudHlwZSlcbiAgaWYgKCFwZXRUeXBlRm91bmQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFBldCB0eXBlIG5vdCBmb3VuZDogJHt1c2VyUGV0LnR5cGV9YClcbiAgfVxuICBjb25zdCBsZXZlbEZvdW5kID0gcGV0VHlwZUZvdW5kLmxldmVscy5nZXQodXNlclBldC5sZXZlbCA+IDEgPyB1c2VyUGV0LnJhbmsgKiAzIC0gMiA6IHVzZXJQZXQubGV2ZWwpXG4gIGlmICghbGV2ZWxGb3VuZCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBQZXQgbGV2ZWwgbm90IGZvdW5kIGZvciBwZXQgdHlwZSAke3VzZXJQZXQudHlwZX06ICR7dXNlclBldC5yYW5rfWBcbiAgICApXG4gIH1cblxuICBsZXZlbEZvdW5kLmFuaW1hdGlvbnMudHJhbnNpdGlvbi5naWYgPSAodXNlclBldC5sZXZlbCAtIDEgKSUgMyA/ICdkdXN0MS5naWYnIDogJ2R1c3QyLmdpZidcblxuICBpZiAoISh1c2VyUGV0LnN0YXRlIGluIGxldmVsRm91bmQuYW5pbWF0aW9ucykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgQW5pbWF0aW9uIG5vdCBmb3VuZCBmb3IgcGV0IHR5cGUgJHt1c2VyUGV0LnR5cGV9LCBsZXZlbCAke3VzZXJQZXQucmFua306ICR7dXNlclBldC5zdGF0ZX1gXG4gICAgKVxuICB9XG4gIGNvbnN0IHRyYW5zaXRpb24gPVxuICAgICd0cmFuc2l0aW9uJyBpbiBsZXZlbEZvdW5kLmFuaW1hdGlvbnNcbiAgICAgID8gbGV2ZWxGb3VuZC5hbmltYXRpb25zLnRyYW5zaXRpb25cbiAgICAgIDogdW5kZWZpbmVkXG5cbiAgcmV0dXJuIHtcbiAgICBhbmltYXRpb246IGxldmVsRm91bmQuYW5pbWF0aW9uc1t1c2VyUGV0LnN0YXRlXSxcbiAgICB0cmFuc2l0aW9uLFxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBnZW5lcmF0ZVBldCA9ICh7IG5hbWUsIHR5cGUgfTogVXNlclBldEFyZ3MpOiBVc2VyUGV0ID0+ICh7XG4gIGxlZnRQb3NpdGlvbjogMCxcbiAgc3BlZWQ6IDAsXG4gIGRpcmVjdGlvbjogRGlyZWN0aW9uLnJpZ2h0LFxuICBsZXZlbDogMCxcbiAgeHA6IDAsXG4gIHJhbms6IDAsXG4gIC8vIEFsbCBsZXZlbCAwIGNoYXJhY3RlcnMgcmVxdWlyZSB0aGlzIHN0YXRlXG4gIHN0YXRlOiAnaWRsZScsXG4gIGlzVHJhbnNpdGlvbkluOiB0cnVlLFxuICBuYW1lLFxuICB0eXBlLFxufSlcblxuZXhwb3J0IGNvbnN0IGdldExldmVsID0gKHtcbiAgcGV0VHlwZSxcbiAgcmFuayxcbn06IHtcbiAgcGV0VHlwZTogc3RyaW5nXG4gIHJhbms6IG51bWJlciB8IG51bGxcbn0pID0+IHtcbiAgaWYgKCFyYW5rKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZFxuICB9XG4gIFxuICBjb25zdCBwZXRUeXBlRm91bmQgPSBwZXRUeXBlcy5nZXQocGV0VHlwZSlcbiAgaWYgKCFwZXRUeXBlRm91bmQpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkXG4gIH1cbiAgY29uc29sZS5sb2cocmFuaylcbiAgY29uc3QgbGV2ZWxGb3VuZCA9IHBldFR5cGVGb3VuZC5sZXZlbHMuZ2V0KHJhbmsgPT09IDEgPyAxOiByYW5rICozIC0yKVxuICBpZiAoIWxldmVsRm91bmQpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkXG4gIH1cblxuICByZXR1cm4gbGV2ZWxGb3VuZFxufVxuXG5cbmV4cG9ydCBjb25zdCBnZXROZXh0TGV2ZWxDYXAgPSAoYWN0dWFsTGV2ZWw6IG51bWJlcikgPT4ge1xuICByZXR1cm4gMTAvL01hdGgucG93KE1hdGgubG9nKGFjdHVhbExldmVsICogMyArIDEpLCAxLjUpICogMTAwXG59XG5cbmV4cG9ydCBjb25zdCBtdXRhdGVMZXZlbCA9ICh7IHVzZXJQZXQgfTogeyB1c2VyUGV0OiBVc2VyUGV0IH0pID0+IHtcbiAgY29uc3QgbmV4dExldmVsRm91bmQgPSBnZXRMZXZlbCh7XG4gICAgcGV0VHlwZTogdXNlclBldC50eXBlLFxuICAgIHJhbms6ICB1c2VyUGV0LmxldmVsID49IDEgICYmICh1c2VyUGV0LmxldmVsICsgMSkgJSAzID8gbnVsbCA6dXNlclBldC5yYW5rICsgMSxcbiAgfSlcbiAgaWYgKHVzZXJQZXQueHAgPj0gZ2V0TmV4dExldmVsQ2FwKHVzZXJQZXQubGV2ZWwpKSB7XG4gICAgdXNlclBldC5sZXZlbCArPSAxXG4gICAgdXNlclBldC54cCA9IDBcbiAgICB1c2VyUGV0LmlzVHJhbnNpdGlvbkluID0gdHJ1ZVxuICAgIGNvbnN0IHBldERhdGEgPSBhbGxQZXRzLmZpbmQoKHBldCkgPT4gcGV0Lm5hbWUgPT09IHVzZXJQZXQudHlwZSlcbiAgICB1c2VyUGV0LnJhbmsgPSBwZXREYXRhPy5sb29wICYmIHVzZXJQZXQucmFuayArMSA+PSBwZXREYXRhLm5iR2lmID8gMCA6IHVzZXJQZXQucmFua1xuXG4gICAgaWYgKCFuZXh0TGV2ZWxGb3VuZCkgcmV0dXJuXG4gICAgdXNlclBldC5yYW5rID0gdXNlclBldC5yYW5rICsgMVxuICAgIHVzZXJQZXQuc3RhdGUgPSBuZXh0TGV2ZWxGb3VuZC5kZWZhdWx0U3RhdGVcbiAgICB1c2VyUGV0LnNwZWVkID0gbmV4dExldmVsRm91bmQuYW5pbWF0aW9uc1tuZXh0TGV2ZWxGb3VuZC5kZWZhdWx0U3RhdGVdPy5zcGVlZCB8fCAwXG4gIH1cbn1cbiIsImltcG9ydCB7IFBldExldmVsIH0gZnJvbSBcIi4vdHlwZXNcIlxuXG5leHBvcnQgdHlwZSBwZXREYXRhID0ge1xuICAgIGxvb3A/OiBib29sZWFuXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIG5iR2lmOiBudW1iZXIsXG59XG5cbmNvbnN0IE1hcnZpbiA9IHtcbiAgICBuYW1lOiBcIk1hcnZpblwiLFxuICAgIG5iR2lmOiA0LFxufSBhcyBwZXREYXRhXG5cbmNvbnN0IHBldGl0UGF0cm9ucyA9IHtcbiAgICBuYW1lIDogIFwibGVzUGV0aXRzUGF0cm9uXCIsXG4gICAgbmJHaWY6IDYsXG59IGFzIHBldERhdGFcblxuY29uc3QgdGlQaG9lbml4ID0ge1xuICAgIG5hbWU6IFwidGlQaG9lbml4XCIsXG4gICAgbmJHaWY6IDUsXG4gICAgbG9vcDogdHJ1ZVxufSBhcyBwZXREYXRhXG5cbmV4cG9ydCBjb25zdCBhbGxQZXRzID0gW1xuICAgIE1hcnZpbixcbiAgICBwZXRpdFBhdHJvbnMsXG4gICAgdGlQaG9lbml4XG5dIiwiaW1wb3J0IHsgU3RhdGUgfSBmcm9tICcuLydcblxuZXhwb3J0IGxldCBzdGF0ZTogU3RhdGVcblxuZXhwb3J0IGNvbnN0IGluaXRpYWxpemVTdGF0ZSA9IChpbml0aWFsU3RhdGU6IFN0YXRlKSA9PiAoc3RhdGUgPSBpbml0aWFsU3RhdGUpXG5cbmV4cG9ydCBjb25zdCBzZXRTdGF0ZSA9IDxLIGV4dGVuZHMga2V5b2YgU3RhdGU+KGtleTogSywgdmFsdWU6IFN0YXRlW0tdKSA9PlxuICAoc3RhdGUgPSB7XG4gICAgLi4uc3RhdGUsXG4gICAgW2tleV06IHZhbHVlLFxuICB9KVxuIiwiaW1wb3J0IHsgVHJhbnNmb3JtcywgTmV4dEZyYW1lT3B0cywgRGlyZWN0aW9uIH0gZnJvbSAnLi8nXG5cbmV4cG9ydCBjb25zdCB0cmFuc2Zvcm1zOiBUcmFuc2Zvcm1zID0ge1xuICBpZGxlOiB7XG4gICAgbmV4dEZyYW1lOiAoeyBkaXJlY3Rpb24sIG9mZnNldCB9OiBOZXh0RnJhbWVPcHRzKSA9PiAoe1xuICAgICAgZGlyZWN0aW9uLFxuICAgICAgbGVmdFBvc2l0aW9uOiBvZmZzZXQsXG4gICAgfSksXG4gIH0sXG4gIHdhbGtpbmc6IHtcbiAgICBuZXh0RnJhbWU6ICh7XG4gICAgICBjb250YWluZXJXaWR0aCxcbiAgICAgIGxlZnRQb3NpdGlvbjogb2xkTGVmdFBvc2l0aW9uLFxuICAgICAgZGlyZWN0aW9uOiBvbGREaXJlY3Rpb24sXG4gICAgICBzcGVlZCxcbiAgICB9OiAvLyBvZmZzZXQsXG4gICAgTmV4dEZyYW1lT3B0cykgPT4ge1xuICAgICAgY29uc3QgZGlyZWN0aW9uID1cbiAgICAgICAgb2xkTGVmdFBvc2l0aW9uID49IGNvbnRhaW5lcldpZHRoIC0gc3BlZWQgLSAxNTBcbiAgICAgICAgICA/IERpcmVjdGlvbi5sZWZ0XG4gICAgICAgICAgOiBvbGRMZWZ0UG9zaXRpb24gPD0gMCArIHNwZWVkXG4gICAgICAgICAgPyBEaXJlY3Rpb24ucmlnaHRcbiAgICAgICAgICA6IG9sZERpcmVjdGlvblxuXG4gICAgICBjb25zdCBsZWZ0UG9zaXRpb24gPVxuICAgICAgICBkaXJlY3Rpb24gPT09IERpcmVjdGlvbi5yaWdodFxuICAgICAgICAgID8gb2xkTGVmdFBvc2l0aW9uICsgc3BlZWRcbiAgICAgICAgICA6IG9sZExlZnRQb3NpdGlvbiAtIHNwZWVkXG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGRpcmVjdGlvbixcbiAgICAgICAgbGVmdFBvc2l0aW9uLFxuICAgICAgfVxuICAgIH0sXG4gIH0sXG59XG4iLCJpbXBvcnQgeyBhbGxQZXRzLCBwZXREYXRhIH0gZnJvbSBcIi4vcGV0c19kYXRhc2V0XCJcblxuZXhwb3J0IHR5cGUgU3RhdGUgPSB7XG4gIGZpbGU6IHN0cmluZ1tdXG4gIHVzZXJQZXQ6IFVzZXJQZXRcbiAgYmFzZVBldFVyaTogc3RyaW5nXG4gIGludGVydmFsSWQ/OiBOb2RlSlMuVGltZW91dCB8IHVuZGVmaW5lZFxufVxuXG5leHBvcnQgdHlwZSBHaWZzID0geyBbbmFtZTogc3RyaW5nXTogc3RyaW5nIH1cblxuZXhwb3J0IHR5cGUgUGV0U3RhdGUgPSAnd2Fsa2luZycgfCAnaWRsZScgfCAndHJhbnNpdGlvbidcblxuZXhwb3J0IHR5cGUgUGV0QW5pbWF0aW9uID0ge1xuICBnaWY6IHN0cmluZ1xuICB3aWR0aDogbnVtYmVyXG4gIGhlaWdodDogbnVtYmVyXG4gIG9mZnNldD86IG51bWJlclxuICBzcGVlZD86IG51bWJlclxuICBkdXJhdGlvbj86IG51bWJlclxufVxuXG5leHBvcnQgdHlwZSBQZXRMZXZlbCA9IHtcbiAgZGVmYXVsdFN0YXRlOiBQZXRTdGF0ZVxuICBhbmltYXRpb25zOiB7XG4gICAgW25hbWU6IHN0cmluZ106IFBldEFuaW1hdGlvblxuICB9XG59XG5cbmV4cG9ydCB0eXBlIFBldCA9IHtcbiAgbGV2ZWxzOiBNYXA8bnVtYmVyLCBQZXRMZXZlbD5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBVc2VyUGV0QmFzZVByb3BzIHtcbiAgbGVmdFBvc2l0aW9uOiBudW1iZXJcbiAgc3BlZWQ6IG51bWJlclxuICBkaXJlY3Rpb246IG51bWJlclxuICBsZXZlbDogbnVtYmVyXG4gIHhwOiBudW1iZXJcbiAgcmFuazogbnVtYmVyXG4gIHN0YXRlOiBQZXRTdGF0ZVxuICBpc1RyYW5zaXRpb25JbjogYm9vbGVhblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFVzZXJQZXRBcmdzIHtcbiAgbmFtZTogc3RyaW5nXG4gIHR5cGU6IHN0cmluZ1xufVxuXG5leHBvcnQgdHlwZSBVc2VyUGV0ID0gVXNlclBldEJhc2VQcm9wcyAmIFVzZXJQZXRBcmdzXG5cbmV4cG9ydCBlbnVtIERpcmVjdGlvbiB7XG4gIHJpZ2h0ID0gMSxcbiAgbGVmdCA9IC0xLFxufVxuXG5leHBvcnQgdHlwZSBOZXh0RnJhbWVPcHRzID0ge1xuICBjb250YWluZXJXaWR0aDogbnVtYmVyXG4gIGxlZnRQb3NpdGlvbjogbnVtYmVyXG4gIGRpcmVjdGlvbjogbnVtYmVyXG4gIHNwZWVkOiBudW1iZXJcbiAgb2Zmc2V0OiBudW1iZXJcbn1cblxuZXhwb3J0IHR5cGUgTmV4dEZyYW1lRm5SZXR1cm4gPSB7XG4gIGxlZnRQb3NpdGlvbjogbnVtYmVyXG4gIGRpcmVjdGlvbjogbnVtYmVyXG4gIG5ld1BldFN0YXRlPzogUGV0U3RhdGVcbn1cblxuZXhwb3J0IHR5cGUgTmV4dEZyYW1lRm4gPSAob3B0czogTmV4dEZyYW1lT3B0cykgPT4gTmV4dEZyYW1lRm5SZXR1cm5cblxuZXhwb3J0IHR5cGUgVHJhbnNmb3JtcyA9IHtcbiAgW3RyYW5zZm9ybTogc3RyaW5nXToge1xuICAgIG5leHRGcmFtZTogTmV4dEZyYW1lRm5cbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL3BhbmVsL21haW4udHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=