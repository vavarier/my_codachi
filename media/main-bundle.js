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
exports.DOM = exports.transforms = exports.setState = exports.state = exports.initializeState = exports.Direction = exports.randomPetName = exports.randomPetType = exports.gifs = exports.mutateLevel = exports.generatePet = exports.getPetAnimations = exports.petTypes = void 0;
const pets_1 = __webpack_require__(/*! ./pets */ "./src/panel/pets.ts");
Object.defineProperty(exports, "petTypes", ({ enumerable: true, get: function () { return pets_1.petTypes; } }));
Object.defineProperty(exports, "getPetAnimations", ({ enumerable: true, get: function () { return pets_1.getPetAnimations; } }));
Object.defineProperty(exports, "generatePet", ({ enumerable: true, get: function () { return pets_1.generatePet; } }));
Object.defineProperty(exports, "mutateLevel", ({ enumerable: true, get: function () { return pets_1.mutateLevel; } }));
Object.defineProperty(exports, "gifs", ({ enumerable: true, get: function () { return pets_1.gifs; } }));
Object.defineProperty(exports, "randomPetType", ({ enumerable: true, get: function () { return pets_1.randomPetType; } }));
Object.defineProperty(exports, "randomPetName", ({ enumerable: true, get: function () { return pets_1.randomPetName; } }));
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
    selector.src = `${basePetUri}/${_1.gifs[animation.gif]}`;
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
exports.mutateLevel = exports.getNextLevelCap = exports.getLevel = exports.generatePet = exports.getPetAnimations = exports.randomPetName = exports.randomPetType = exports.petTypes = exports.petNames = exports.gifs = void 0;
const _1 = __webpack_require__(/*! ./ */ "./src/panel/index.ts");
exports.gifs = {
    egg1: 'egg1.gif',
    dust1: 'dust1.gif',
    dust2: 'dust2.gif',
    monster1phase1: 'm1d1.gif',
    monster1phase2: 'm1d2.gif',
    monster1phase3: 'm1d3.gif',
    monster2phase1: 'm2d1.gif',
    monster2phase2: 'm2d2.gif',
    monster2phase3: 'm2d3.gif',
    monster3phase1: 'm3d1.gif',
    monster3phase2: 'm3d2.gif',
    monster3phase3: 'm3d3.gif',
    monster4phase1: 'm4d1.gif',
    monster4phase2: 'm4d2.gif',
    monster4phase3: 'm4d3.gif',
    monster5phase1: 'm5d1.gif',
    monster5phase2: 'm5d2.gif',
    monster5phase3: 'm5d3.gif',
};
exports.petNames = [
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
];
const animationDefaults = {
    width: 75,
    height: 64,
    speed: 0,
    offset: 0,
};
const egg = {
    defaultState: 'idle',
    animations: {
        idle: Object.assign(Object.assign({}, animationDefaults), { gif: 'egg1' }),
        transition: Object.assign(Object.assign({}, animationDefaults), { gif: 'dust1', offset: 6, width: 100, height: 100 }),
    },
};
// Generic evolution transition
const transition = Object.assign(Object.assign({}, animationDefaults), { gif: 'dust2', offset: -80, width: 280, height: 100 });
exports.petTypes = new Map([
    [
        'monster2',
        {
            levels: new Map([
                [0, egg],
                [
                    1,
                    {
                        defaultState: 'walking',
                        animations: {
                            transition,
                            walking: Object.assign(Object.assign({}, animationDefaults), { gif: 'monster2phase1', speed: 4 }),
                        },
                    },
                ],
                [
                    2,
                    {
                        defaultState: 'walking',
                        animations: {
                            transition,
                            walking: Object.assign(Object.assign({}, animationDefaults), { gif: 'monster4phase2', speed: 3 }),
                        },
                    },
                ],
                [
                    5,
                    {
                        defaultState: 'walking',
                        animations: {
                            transition,
                            walking: Object.assign(Object.assign({}, animationDefaults), { gif: 'monster3phase3', speed: 3 }),
                        },
                    },
                ],
            ]),
        },
    ],
]);
const randomPetType = () => Array.from(exports.petTypes.keys())[Math.floor(Math.random() * exports.petTypes.size)];
exports.randomPetType = randomPetType;
const randomPetName = () => {
    const name = exports.petNames[Math.floor(Math.random() * exports.petNames.length)];
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};
exports.randomPetName = randomPetName;
const getPetAnimations = ({ userPet, }) => {
    const petTypeFound = exports.petTypes.get(userPet.type);
    if (!petTypeFound) {
        throw new Error(`Pet type not found: ${userPet.type}`);
    }
    const levelFound = petTypeFound.levels.get(userPet.level) || petTypeFound.levels.get(userPet.rank);
    if (!levelFound) {
        throw new Error(`Pet level not found for pet type ${userPet.type}: ${userPet.level}`);
    }
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
    return actualLevel * 10 + 1;
};
exports.getNextLevelCap = getNextLevelCap;
const mutateLevel = ({ userPet }) => {
    const nextLevelFound = (0, exports.getLevel)({
        petType: userPet.type,
        level: userPet.level + 1,
    });
    if (userPet.xp >= (0, exports.getNextLevelCap)(userPet.level)) {
        userPet.level += 1;
        userPet.xp = 0;
        if (!nextLevelFound)
            return;
        userPet.rank = userPet.level;
        userPet.speed = nextLevelFound.animations[userPet.state].speed || 0;
        userPet.state = nextLevelFound.defaultState;
        userPet.isTransitionIn = true;
    }
};
exports.mutateLevel = mutateLevel;


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFLLFlBQVMsQ0FBQyxLQUFLO2dCQUMzQixDQUFDLENBQUMsZUFBZSxHQUFHLEtBQUs7Z0JBQ3pCLENBQUMsQ0FBQyxlQUFlLEdBQUcsS0FBSztZQUU3QixPQUFPO2dCQUNMLFNBQVM7Z0JBQ1QsWUFBWTthQUNiO1FBQ0gsQ0FBQztLQUNGO0NBQ0Y7Ozs7Ozs7Ozs7Ozs7O0FDZUQsSUFBWSxTQUdYO0FBSEQsV0FBWSxTQUFTO0lBQ25CLDJDQUFTO0lBQ1QsMENBQVM7QUFDWCxDQUFDLEVBSFcsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFHcEI7Ozs7Ozs7VUNyREQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2NvZGFjaGlBcHAvLi9zcmMvcGFuZWwvZG9tLnRzIiwid2VicGFjazovL2NvZGFjaGlBcHAvLi9zcmMvcGFuZWwvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vY29kYWNoaUFwcC8uL3NyYy9wYW5lbC9tYWluLnRzIiwid2VicGFjazovL2NvZGFjaGlBcHAvLi9zcmMvcGFuZWwvcGV0cy50cyIsIndlYnBhY2s6Ly9jb2RhY2hpQXBwLy4vc3JjL3BhbmVsL3N0YXRlLnRzIiwid2VicGFjazovL2NvZGFjaGlBcHAvLi9zcmMvcGFuZWwvdHJhbnNmb3Jtcy50cyIsIndlYnBhY2s6Ly9jb2RhY2hpQXBwLy4vc3JjL3BhbmVsL3R5cGVzLnRzIiwid2VicGFjazovL2NvZGFjaGlBcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY29kYWNoaUFwcC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2NvZGFjaGlBcHAvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2NvZGFjaGlBcHAvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBET00ge1xuICBwcml2YXRlIF9wZXRJbWFnZVNlbGVjdG9yOiBzdHJpbmdcbiAgcHJpdmF0ZSBfbW92ZW1lbnRDb250YWluZXJTZWxlY3Rvcjogc3RyaW5nXG4gIHByaXZhdGUgX3RyYW5zaXRpb25Db250YWluZXJTZWxlY3Rvcjogc3RyaW5nXG4gIHByaXZhdGUgX3RyYW5zaXRpb25TZWxlY3Rvcjogc3RyaW5nXG5cbiAgcHJpdmF0ZSBfbW92ZW1lbnRDb250YWluZXJFbGVtZW50OiBIVE1MRWxlbWVudCB8IHVuZGVmaW5lZFxuICBwcml2YXRlIF9wZXRJbWFnZUVsZW1lbnQ6IEhUTUxJbWFnZUVsZW1lbnQgfCB1bmRlZmluZWRcbiAgcHJpdmF0ZSBfdHJhbnNpdGlvbkNvbnRhaW5lckVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgdW5kZWZpbmVkXG4gIHByaXZhdGUgX3RyYW5zaXRpb25JbWFnZUVsZW1lbnQ6IEhUTUxJbWFnZUVsZW1lbnQgfCB1bmRlZmluZWRcblxuICBjb25zdHJ1Y3Rvcih7XG4gICAgbW92ZW1lbnRDb250YWluZXJTZWxlY3RvcixcbiAgICBwZXRJbWFnZVNlbGVjdG9yLFxuICAgIHRyYW5zaXRpb25Db250YWluZXJTZWxlY3RvcixcbiAgICB0cmFuc2l0aW9uU2VsZWN0b3IsXG4gIH06IHtcbiAgICBwZXRJbWFnZVNlbGVjdG9yOiBzdHJpbmdcbiAgICBtb3ZlbWVudENvbnRhaW5lclNlbGVjdG9yOiBzdHJpbmdcbiAgICB0cmFuc2l0aW9uQ29udGFpbmVyU2VsZWN0b3I6IHN0cmluZ1xuICAgIHRyYW5zaXRpb25TZWxlY3Rvcjogc3RyaW5nXG4gIH0pIHtcbiAgICB0aGlzLl9wZXRJbWFnZVNlbGVjdG9yID0gcGV0SW1hZ2VTZWxlY3RvclxuICAgIHRoaXMuX21vdmVtZW50Q29udGFpbmVyU2VsZWN0b3IgPSBtb3ZlbWVudENvbnRhaW5lclNlbGVjdG9yXG4gICAgdGhpcy5fdHJhbnNpdGlvbkNvbnRhaW5lclNlbGVjdG9yID0gdHJhbnNpdGlvbkNvbnRhaW5lclNlbGVjdG9yXG4gICAgdGhpcy5fdHJhbnNpdGlvblNlbGVjdG9yID0gdHJhbnNpdGlvblNlbGVjdG9yXG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0SFRNTEVsZW1lbnQgPSA8VD4oZWxlbWVudE5hbWU6IHN0cmluZyk6IFQgPT4ge1xuICAgIGNvbnN0IGh0bWxFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudE5hbWUpIGFzIHVua25vd25cbiAgICBpZiAoIWh0bWxFbGVtZW50KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuYWJsZSB0byBsb2NhdGUgZWxlbWVudCBpbiBET006ICR7ZWxlbWVudE5hbWV9YClcbiAgICB9XG5cbiAgICByZXR1cm4gaHRtbEVsZW1lbnQgYXMgVFxuICB9XG5cbiAgZ2V0TW92ZW1lbnRTZWxlY3RvcigpOiBIVE1MRWxlbWVudCB7XG4gICAgaWYgKCF0aGlzLl9tb3ZlbWVudENvbnRhaW5lckVsZW1lbnQpIHtcbiAgICAgIHRoaXMuX21vdmVtZW50Q29udGFpbmVyRWxlbWVudCA9IHRoaXMuZ2V0SFRNTEVsZW1lbnQ8SFRNTEVsZW1lbnQ+KFxuICAgICAgICB0aGlzLl9tb3ZlbWVudENvbnRhaW5lclNlbGVjdG9yXG4gICAgICApXG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9tb3ZlbWVudENvbnRhaW5lckVsZW1lbnRcbiAgfVxuXG4gIGdldFBldEltYWdlU2VsZWN0b3IoKTogSFRNTEltYWdlRWxlbWVudCB7XG4gICAgaWYgKCF0aGlzLl9wZXRJbWFnZUVsZW1lbnQpIHtcbiAgICAgIHRoaXMuX3BldEltYWdlRWxlbWVudCA9IHRoaXMuZ2V0SFRNTEVsZW1lbnQ8SFRNTEltYWdlRWxlbWVudD4oXG4gICAgICAgIHRoaXMuX3BldEltYWdlU2VsZWN0b3JcbiAgICAgIClcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3BldEltYWdlRWxlbWVudFxuICB9XG5cbiAgZ2V0VHJhbnNpdGlvblNlbGVjdG9yKCk6IEhUTUxFbGVtZW50IHtcbiAgICBpZiAoIXRoaXMuX3RyYW5zaXRpb25Db250YWluZXJFbGVtZW50KSB7XG4gICAgICB0aGlzLl90cmFuc2l0aW9uQ29udGFpbmVyRWxlbWVudCA9IHRoaXMuZ2V0SFRNTEVsZW1lbnQ8SFRNTEVsZW1lbnQ+KFxuICAgICAgICB0aGlzLl90cmFuc2l0aW9uQ29udGFpbmVyU2VsZWN0b3JcbiAgICAgIClcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3RyYW5zaXRpb25Db250YWluZXJFbGVtZW50XG4gIH1cblxuICBnZXRUcmFuc2l0aW9uSW1hZ2VTZWxlY3RvcigpOiBIVE1MSW1hZ2VFbGVtZW50IHtcbiAgICBpZiAoIXRoaXMuX3RyYW5zaXRpb25JbWFnZUVsZW1lbnQpIHtcbiAgICAgIHRoaXMuX3RyYW5zaXRpb25JbWFnZUVsZW1lbnQgPSB0aGlzLmdldEhUTUxFbGVtZW50PEhUTUxJbWFnZUVsZW1lbnQ+KFxuICAgICAgICB0aGlzLl90cmFuc2l0aW9uU2VsZWN0b3JcbiAgICAgIClcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3RyYW5zaXRpb25JbWFnZUVsZW1lbnRcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgcGV0VHlwZXMsXG4gIGdldFBldEFuaW1hdGlvbnMsXG4gIGdlbmVyYXRlUGV0LFxuICBtdXRhdGVMZXZlbCxcbiAgZ2lmcyxcbiAgcmFuZG9tUGV0VHlwZSxcbiAgcmFuZG9tUGV0TmFtZSxcbn0gZnJvbSAnLi9wZXRzJ1xuaW1wb3J0IHsgdHJhbnNmb3JtcyB9IGZyb20gJy4vdHJhbnNmb3JtcydcbmltcG9ydCB7XG4gIFBldCxcbiAgUGV0U3RhdGUsXG4gIFVzZXJQZXRCYXNlUHJvcHMsXG4gIFBldFR5cGUsXG4gIFVzZXJQZXRBcmdzLFxuICBVc2VyUGV0LFxuICBHaWZzLFxuICBEaXJlY3Rpb24sXG4gIE5leHRGcmFtZU9wdHMsXG4gIE5leHRGcmFtZUZuLFxuICBOZXh0RnJhbWVGblJldHVybixcbiAgVHJhbnNmb3JtcyxcbiAgUGV0QW5pbWF0aW9uLFxuICBQZXRMZXZlbCxcbiAgU3RhdGUsXG59IGZyb20gJy4vdHlwZXMnXG5pbXBvcnQgeyBET00gfSBmcm9tICcuL2RvbSdcbmltcG9ydCB7IHN0YXRlLCBpbml0aWFsaXplU3RhdGUsIHNldFN0YXRlIH0gZnJvbSAnLi9zdGF0ZSdcblxuZXhwb3J0IHtcbiAgcGV0VHlwZXMsXG4gIGdldFBldEFuaW1hdGlvbnMsXG4gIGdlbmVyYXRlUGV0LFxuICBtdXRhdGVMZXZlbCxcbiAgZ2lmcyxcbiAgcmFuZG9tUGV0VHlwZSxcbiAgcmFuZG9tUGV0TmFtZSxcbiAgUGV0LFxuICBQZXRTdGF0ZSxcbiAgVXNlclBldEJhc2VQcm9wcyxcbiAgUGV0VHlwZSxcbiAgVXNlclBldEFyZ3MsXG4gIFVzZXJQZXQsXG4gIEdpZnMsXG4gIERpcmVjdGlvbixcbiAgTmV4dEZyYW1lT3B0cyxcbiAgTmV4dEZyYW1lRm4sXG4gIE5leHRGcmFtZUZuUmV0dXJuLFxuICBUcmFuc2Zvcm1zLFxuICBQZXRBbmltYXRpb24sXG4gIFBldExldmVsLFxuICBTdGF0ZSxcbiAgaW5pdGlhbGl6ZVN0YXRlLFxuICBzdGF0ZSxcbiAgc2V0U3RhdGUsXG4gIHRyYW5zZm9ybXMsXG4gIERPTSxcbn1cbiIsImltcG9ydCB7XG4gIFVzZXJQZXQsXG4gIHNldFN0YXRlLFxuICBnZXRQZXRBbmltYXRpb25zLFxuICBnaWZzLFxuICBnZW5lcmF0ZVBldCxcbiAgdHJhbnNmb3JtcyxcbiAgRE9NLFxuICBzdGF0ZSxcbiAgUGV0QW5pbWF0aW9uLFxufSBmcm9tICcuLydcbmltcG9ydCB7IGluaXRpYWxpemVTdGF0ZSB9IGZyb20gJy4vc3RhdGUnXG5cbmNvbnN0IGRlZmF1bHRTdGF0ZSA9IHtcbiAgdXNlclBldDogZ2VuZXJhdGVQZXQoeyBuYW1lOiAndW5rbm93bicsIHR5cGU6ICd1bmtub3duJyB9KSxcbiAgYmFzZVBldFVyaTogJycsXG59XG5cbmluaXRpYWxpemVTdGF0ZShkZWZhdWx0U3RhdGUpXG5cbmNvbnN0IGRvbSA9IG5ldyBET00oe1xuICBtb3ZlbWVudENvbnRhaW5lclNlbGVjdG9yOiAnbW92ZW1lbnQtY29udGFpbmVyJyxcbiAgcGV0SW1hZ2VTZWxlY3RvcjogJ3BldCcsXG4gIHRyYW5zaXRpb25Db250YWluZXJTZWxlY3RvcjogJ3RyYW5zaXRpb24tY29udGFpbmVyJyxcbiAgdHJhbnNpdGlvblNlbGVjdG9yOiAndHJhbnNpdGlvbicsXG59KVxuXG5jb25zdCBUSUNLX0lOVEVSVkFMX01TID0gMTAwXG5cbmNvbnN0IHRpY2sgPSAoeyB1c2VyUGV0IH06IHsgdXNlclBldDogVXNlclBldCB9KSA9PiB7XG4gIGNvbnN0IHsgbGVmdFBvc2l0aW9uLCBkaXJlY3Rpb24gfSA9IHRyYW5zZm9ybXNbdXNlclBldC5zdGF0ZV0ubmV4dEZyYW1lKHtcbiAgICBjb250YWluZXJXaWR0aDpcbiAgICAgIHdpbmRvdy5pbm5lcldpZHRoIHx8XG4gICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggfHxcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGgsXG4gICAgbGVmdFBvc2l0aW9uOiB1c2VyUGV0LmxlZnRQb3NpdGlvbixcbiAgICBkaXJlY3Rpb246IHVzZXJQZXQuZGlyZWN0aW9uLFxuICAgIHNwZWVkOiB1c2VyUGV0LnNwZWVkLFxuICAgIG9mZnNldDogZ2V0UGV0QW5pbWF0aW9ucyh7IHVzZXJQZXQgfSkuYW5pbWF0aW9uLm9mZnNldCB8fCAwLFxuICB9KVxuXG4gIHVzZXJQZXQubGVmdFBvc2l0aW9uID0gbGVmdFBvc2l0aW9uXG4gIHVzZXJQZXQuZGlyZWN0aW9uID0gZGlyZWN0aW9uXG5cbiAgLy8gQXBwbHkgdHJhbnNmb3JtYXRpb25cbiAgY29uc3QgbW92ZW1lbnRDb250YWluZXIgPSBkb20uZ2V0TW92ZW1lbnRTZWxlY3RvcigpXG4gIG1vdmVtZW50Q29udGFpbmVyLnN0eWxlLm1hcmdpbkxlZnQgPSBgJHt1c2VyUGV0LmxlZnRQb3NpdGlvbn1weGBcblxuICBjb25zdCBwZXRJbWFnZUVsZW1lbnQgPSBkb20uZ2V0UGV0SW1hZ2VTZWxlY3RvcigpXG4gIHBldEltYWdlRWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBgc2NhbGVYKCR7dXNlclBldC5kaXJlY3Rpb259KWBcblxuICBpZiAodXNlclBldC5pc1RyYW5zaXRpb25Jbikge1xuICAgIGNvbnN0IHsgdHJhbnNpdGlvbjogYW5pbWF0aW9uIH0gPSBnZXRQZXRBbmltYXRpb25zKHtcbiAgICAgIHVzZXJQZXQsXG4gICAgfSlcblxuICAgIGlmIChhbmltYXRpb24pIHtcbiAgICAgIGNvbnN0IHRyYW5zaXRpb25Db250YWluZXIgPSBkb20uZ2V0VHJhbnNpdGlvblNlbGVjdG9yKClcbiAgICAgIHRyYW5zaXRpb25Db250YWluZXIuc3R5bGUubWFyZ2luTGVmdCA9IGAke3VzZXJQZXQubGVmdFBvc2l0aW9ufXB4YFxuXG4gICAgICBzZXRJbWFnZSh7XG4gICAgICAgIGNvbnRhaW5lcjogZG9tLmdldFRyYW5zaXRpb25TZWxlY3RvcigpLFxuICAgICAgICBzZWxlY3RvcjogZG9tLmdldFRyYW5zaXRpb25JbWFnZVNlbGVjdG9yKCksXG4gICAgICAgIGFuaW1hdGlvbixcbiAgICAgIH0pXG4gICAgICBzdGF0ZS51c2VyUGV0LmlzVHJhbnNpdGlvbkluID0gZmFsc2VcbiAgICB9XG4gIH1cbn1cblxuY29uc3Qgc2V0SW1hZ2UgPSAoe1xuICBjb250YWluZXIsXG4gIHNlbGVjdG9yLFxuICBhbmltYXRpb24sXG59OiB7XG4gIGNvbnRhaW5lcjogSFRNTEVsZW1lbnRcbiAgc2VsZWN0b3I6IEhUTUxJbWFnZUVsZW1lbnRcbiAgYW5pbWF0aW9uOiBQZXRBbmltYXRpb25cbn0pID0+IHtcbiAgY29uc3QgeyBiYXNlUGV0VXJpIH0gPSBzdGF0ZVxuXG4gIHNlbGVjdG9yLnNyYyA9IGAke2Jhc2VQZXRVcml9LyR7Z2lmc1thbmltYXRpb24uZ2lmXX1gXG4gIHNlbGVjdG9yLndpZHRoID0gYW5pbWF0aW9uLndpZHRoXG4gIHNlbGVjdG9yLnN0eWxlLm1pbldpZHRoID0gYCR7YW5pbWF0aW9uLndpZHRofXB4YFxuICBzZWxlY3Rvci5oZWlnaHQgPSBhbmltYXRpb24uaGVpZ2h0XG5cbiAgY29udGFpbmVyLnN0eWxlLmxlZnQgPSBgJHthbmltYXRpb24ub2Zmc2V0ID8/IDB9cHhgXG59XG5cbmNvbnN0IHNsZWVwID0gKG1zOiBudW1iZXIpID0+IG5ldyBQcm9taXNlKChyKSA9PiBzZXRUaW1lb3V0KHIsIG1zKSlcblxuY29uc3Qgc3RhcnRBbmltYXRpb24gPSAoKSA9PiB7XG4gIGNvbnN0IHsgdXNlclBldCB9ID0gc3RhdGVcbiAgaWYgKHN0YXRlLmludGVydmFsSWQpIHtcbiAgICBjbGVhckludGVydmFsKHN0YXRlLmludGVydmFsSWQpXG4gIH1cbiAgY29uc3QgaW50ZXJ2YWxJZCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICB0aWNrKHsgdXNlclBldCB9KVxuICB9LCBUSUNLX0lOVEVSVkFMX01TKVxuICBzZXRTdGF0ZSgnaW50ZXJ2YWxJZCcsIGludGVydmFsSWQpXG59XG5cbmV4cG9ydCBjb25zdCBhZGRQZXRUb1BhbmVsID0gYXN5bmMgKHsgdXNlclBldCB9OiB7IHVzZXJQZXQ6IFVzZXJQZXQgfSkgPT4ge1xuICBzZXRTdGF0ZSgndXNlclBldCcsIHVzZXJQZXQpXG4gIHN0YXJ0QW5pbWF0aW9uKClcblxuICAvLyBHaXZlIHRoZSB0cmFuc2l0aW9uIGEgY2hhbmNlIHRvIHBsYXlcbiAgYXdhaXQgc2xlZXAoVElDS19JTlRFUlZBTF9NUyAqIDIpXG5cbiAgY29uc3QgeyBhbmltYXRpb24gfSA9IGdldFBldEFuaW1hdGlvbnMoe1xuICAgIHVzZXJQZXQsXG4gIH0pXG5cbiAgc2V0SW1hZ2Uoe1xuICAgIHNlbGVjdG9yOiBkb20uZ2V0UGV0SW1hZ2VTZWxlY3RvcigpLFxuICAgIGFuaW1hdGlvbixcbiAgICBjb250YWluZXI6IGRvbS5nZXRNb3ZlbWVudFNlbGVjdG9yKCksXG4gIH0pXG59XG5cbmV4cG9ydCBjb25zdCBhcHAgPSAoe1xuICB1c2VyUGV0LFxuICBiYXNlUGV0VXJpLFxufToge1xuICB1c2VyUGV0OiBVc2VyUGV0XG4gIGJhc2VQZXRVcmk6IHN0cmluZ1xufSkgPT4ge1xuICBzZXRTdGF0ZSgnYmFzZVBldFVyaScsIGJhc2VQZXRVcmkpXG5cbiAgaWYgKHVzZXJQZXQpIHtcbiAgICBhZGRQZXRUb1BhbmVsKHsgdXNlclBldCB9KVxuICB9XG5cbiAgLy8gSGFuZGxlIG1lc3NhZ2VzIHNlbnQgZnJvbSB0aGUgZXh0ZW5zaW9uIHRvIHRoZSB3ZWJ2aWV3XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgKGV2ZW50KTogdm9pZCA9PiB7XG4gICAgY29uc3QgeyBjb21tYW5kLCBkYXRhIH0gPSBldmVudC5kYXRhIC8vIFRoZSBkYXRhIHRoYXQgdGhlIGV4dGVuc2lvbiBzZW50XG4gICAgc3dpdGNoIChjb21tYW5kKSB7XG4gICAgICBjYXNlICdzcGF3bi1wZXQnOlxuICAgICAgICBhZGRQZXRUb1BhbmVsKHsgdXNlclBldDogZGF0YS51c2VyUGV0IH0pXG4gICAgICAgIGJyZWFrXG5cbiAgICAgIGNhc2UgJ3VwZGF0ZS1wZXQnOlxuICAgICAgICBhZGRQZXRUb1BhbmVsKHtcbiAgICAgICAgICB1c2VyUGV0OiB7XG4gICAgICAgICAgICAuLi5kYXRhLnVzZXJQZXQsXG4gICAgICAgICAgICBsZWZ0UG9zaXRpb246IHN0YXRlLnVzZXJQZXQubGVmdFBvc2l0aW9uLFxuICAgICAgICAgICAgZGlyZWN0aW9uOiBzdGF0ZS51c2VyUGV0LmRpcmVjdGlvbixcbiAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgICAgICBicmVha1xuICAgIH1cbiAgfSlcbn1cbiIsImltcG9ydCB7XG4gIFBldFR5cGUsXG4gIFBldCxcbiAgVXNlclBldEFyZ3MsXG4gIERpcmVjdGlvbixcbiAgUGV0QW5pbWF0aW9uLFxuICBVc2VyUGV0LFxuICBQZXRMZXZlbCxcbiAgR2lmcyxcbn0gZnJvbSAnLi8nXG5cbmV4cG9ydCBjb25zdCBnaWZzOiBHaWZzID0ge1xuICBlZ2cxOiAnZWdnMS5naWYnLFxuICBkdXN0MTogJ2R1c3QxLmdpZicsXG4gIGR1c3QyOiAnZHVzdDIuZ2lmJyxcbiAgbW9uc3RlcjFwaGFzZTE6ICdtMWQxLmdpZicsXG4gIG1vbnN0ZXIxcGhhc2UyOiAnbTFkMi5naWYnLFxuICBtb25zdGVyMXBoYXNlMzogJ20xZDMuZ2lmJyxcbiAgbW9uc3RlcjJwaGFzZTE6ICdtMmQxLmdpZicsXG4gIG1vbnN0ZXIycGhhc2UyOiAnbTJkMi5naWYnLFxuICBtb25zdGVyMnBoYXNlMzogJ20yZDMuZ2lmJyxcbiAgbW9uc3RlcjNwaGFzZTE6ICdtM2QxLmdpZicsXG4gIG1vbnN0ZXIzcGhhc2UyOiAnbTNkMi5naWYnLFxuICBtb25zdGVyM3BoYXNlMzogJ20zZDMuZ2lmJyxcbiAgbW9uc3RlcjRwaGFzZTE6ICdtNGQxLmdpZicsXG4gIG1vbnN0ZXI0cGhhc2UyOiAnbTRkMi5naWYnLFxuICBtb25zdGVyNHBoYXNlMzogJ200ZDMuZ2lmJyxcbiAgbW9uc3RlcjVwaGFzZTE6ICdtNWQxLmdpZicsXG4gIG1vbnN0ZXI1cGhhc2UyOiAnbTVkMi5naWYnLFxuICBtb25zdGVyNXBoYXNlMzogJ201ZDMuZ2lmJyxcbn1cblxuZXhwb3J0IGNvbnN0IHBldE5hbWVzID0gW1xuICAnYm9vJyxcbiAgJ25hY2hvJyxcbiAgJ2dhcnknLFxuICAnZnVkZ2UnLFxuICAnbmVrbycsXG4gICdwaXAnLFxuICAnYmlibycsXG4gICdmaWZpJyxcbiAgJ2pheCcsXG4gICdib2JiYScsXG4gICdnaWRnZXQnLFxuICAnbWluYScsXG4gICdjcnVtYicsXG4gICd6aW1ibycsXG4gICdkdXN0eScsXG4gICdicm9jaycsXG4gICdvdGlzJyxcbiAgJ21hcnZpbicsXG4gICdzbW9rZXknLFxuICAnYmFycnknLFxuICAndG9ueScsXG4gICdkdXN0eScsXG4gICdtb2NoaScsXG5dXG5cbmNvbnN0IGFuaW1hdGlvbkRlZmF1bHRzID0ge1xuICB3aWR0aDogNzUsXG4gIGhlaWdodDogNjQsXG4gIHNwZWVkOiAwLFxuICBvZmZzZXQ6IDAsXG59XG5cbmNvbnN0IGVnZzogUGV0TGV2ZWwgPSB7XG4gIGRlZmF1bHRTdGF0ZTogJ2lkbGUnLFxuICBhbmltYXRpb25zOiB7XG4gICAgaWRsZToge1xuICAgICAgLi4uYW5pbWF0aW9uRGVmYXVsdHMsXG4gICAgICBnaWY6ICdlZ2cxJyxcbiAgICB9LFxuICAgIHRyYW5zaXRpb246IHtcbiAgICAgIC4uLmFuaW1hdGlvbkRlZmF1bHRzLFxuICAgICAgZ2lmOiAnZHVzdDEnLFxuICAgICAgb2Zmc2V0OiA2LFxuICAgICAgd2lkdGg6IDEwMCxcbiAgICAgIGhlaWdodDogMTAwLFxuICAgIH0sXG4gIH0sXG59XG5cbi8vIEdlbmVyaWMgZXZvbHV0aW9uIHRyYW5zaXRpb25cbmNvbnN0IHRyYW5zaXRpb246IFBldEFuaW1hdGlvbiA9IHtcbiAgLi4uYW5pbWF0aW9uRGVmYXVsdHMsXG4gIGdpZjogJ2R1c3QyJyxcbiAgb2Zmc2V0OiAtODAsXG4gIHdpZHRoOiAyODAsXG4gIGhlaWdodDogMTAwLFxufVxuXG5leHBvcnQgY29uc3QgcGV0VHlwZXMgPSBuZXcgTWFwPHN0cmluZywgUGV0PihbXG4gIFtcbiAgICAnbW9uc3RlcjInLFxuICAgIHtcbiAgICAgIGxldmVsczogbmV3IE1hcChbXG4gICAgICAgIFswLCBlZ2ddLFxuICAgICAgICBbXG4gICAgICAgICAgMSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBkZWZhdWx0U3RhdGU6ICd3YWxraW5nJyxcbiAgICAgICAgICAgIGFuaW1hdGlvbnM6IHtcbiAgICAgICAgICAgICAgdHJhbnNpdGlvbixcbiAgICAgICAgICAgICAgd2Fsa2luZzoge1xuICAgICAgICAgICAgICAgIC4uLmFuaW1hdGlvbkRlZmF1bHRzLFxuICAgICAgICAgICAgICAgIGdpZjogJ21vbnN0ZXIycGhhc2UxJyxcbiAgICAgICAgICAgICAgICBzcGVlZDogNCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgICAgW1xuICAgICAgICAgIDIsXG4gICAgICAgICAge1xuICAgICAgICAgICAgZGVmYXVsdFN0YXRlOiAnd2Fsa2luZycsXG4gICAgICAgICAgICBhbmltYXRpb25zOiB7XG4gICAgICAgICAgICAgIHRyYW5zaXRpb24sXG4gICAgICAgICAgICAgIHdhbGtpbmc6IHtcbiAgICAgICAgICAgICAgICAuLi5hbmltYXRpb25EZWZhdWx0cyxcbiAgICAgICAgICAgICAgICBnaWY6ICdtb25zdGVyNHBoYXNlMicsXG4gICAgICAgICAgICAgICAgc3BlZWQ6IDMsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIFtcbiAgICAgICAgICA1LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGRlZmF1bHRTdGF0ZTogJ3dhbGtpbmcnLFxuICAgICAgICAgICAgYW5pbWF0aW9uczoge1xuICAgICAgICAgICAgICB0cmFuc2l0aW9uLFxuICAgICAgICAgICAgICB3YWxraW5nOiB7XG4gICAgICAgICAgICAgICAgLi4uYW5pbWF0aW9uRGVmYXVsdHMsXG4gICAgICAgICAgICAgICAgZ2lmOiAnbW9uc3RlcjNwaGFzZTMnLFxuICAgICAgICAgICAgICAgIHNwZWVkOiAzLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgXSksXG4gICAgfSxcbiAgXSxcblxuXSlcblxuZXhwb3J0IGNvbnN0IHJhbmRvbVBldFR5cGUgPSAoKTogUGV0VHlwZSA9PlxuICBBcnJheS5mcm9tKHBldFR5cGVzLmtleXMoKSlbXG4gIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBldFR5cGVzLnNpemUpXG4gIF0gYXMgUGV0VHlwZVxuXG5leHBvcnQgY29uc3QgcmFuZG9tUGV0TmFtZSA9ICgpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBuYW1lID0gcGV0TmFtZXNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcGV0TmFtZXMubGVuZ3RoKV1cbiAgcmV0dXJuIG5hbWUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBuYW1lLnNsaWNlKDEpLnRvTG93ZXJDYXNlKClcbn1cblxuZXhwb3J0IGNvbnN0IGdldFBldEFuaW1hdGlvbnMgPSAoe1xuICB1c2VyUGV0LFxufToge1xuICB1c2VyUGV0OiBVc2VyUGV0XG59KToge1xuICBhbmltYXRpb246IFBldEFuaW1hdGlvblxuICB0cmFuc2l0aW9uOiBQZXRBbmltYXRpb24gfCB1bmRlZmluZWRcbn0gPT4ge1xuICBjb25zdCBwZXRUeXBlRm91bmQgPSBwZXRUeXBlcy5nZXQodXNlclBldC50eXBlKVxuICBpZiAoIXBldFR5cGVGb3VuZCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgUGV0IHR5cGUgbm90IGZvdW5kOiAke3VzZXJQZXQudHlwZX1gKVxuICB9XG5cbiAgY29uc3QgbGV2ZWxGb3VuZCA9IHBldFR5cGVGb3VuZC5sZXZlbHMuZ2V0KHVzZXJQZXQubGV2ZWwpIHx8IHBldFR5cGVGb3VuZC5sZXZlbHMuZ2V0KHVzZXJQZXQucmFuaykgXG4gIGlmICghbGV2ZWxGb3VuZCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBQZXQgbGV2ZWwgbm90IGZvdW5kIGZvciBwZXQgdHlwZSAke3VzZXJQZXQudHlwZX06ICR7dXNlclBldC5sZXZlbH1gXG4gICAgKVxuICB9XG5cbiAgaWYgKCEodXNlclBldC5zdGF0ZSBpbiBsZXZlbEZvdW5kLmFuaW1hdGlvbnMpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYEFuaW1hdGlvbiBub3QgZm91bmQgZm9yIHBldCB0eXBlICR7dXNlclBldC50eXBlfSwgbGV2ZWwgJHt1c2VyUGV0LmxldmVsfTogJHt1c2VyUGV0LnN0YXRlfWBcbiAgICApXG4gIH1cblxuICBjb25zdCB0cmFuc2l0aW9uID1cbiAgICAndHJhbnNpdGlvbicgaW4gbGV2ZWxGb3VuZC5hbmltYXRpb25zXG4gICAgICA/IGxldmVsRm91bmQuYW5pbWF0aW9ucy50cmFuc2l0aW9uXG4gICAgICA6IHVuZGVmaW5lZFxuXG4gIHJldHVybiB7XG4gICAgYW5pbWF0aW9uOiBsZXZlbEZvdW5kLmFuaW1hdGlvbnNbdXNlclBldC5zdGF0ZV0sXG4gICAgdHJhbnNpdGlvbixcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgZ2VuZXJhdGVQZXQgPSAoeyBuYW1lLCB0eXBlIH06IFVzZXJQZXRBcmdzKTogVXNlclBldCA9PiAoe1xuICBsZWZ0UG9zaXRpb246IDAsXG4gIHNwZWVkOiAwLFxuICBkaXJlY3Rpb246IERpcmVjdGlvbi5yaWdodCxcbiAgbGV2ZWw6IDAsXG4gIHhwOiAwLFxuICByYW5rOiAwLFxuICAvLyBBbGwgbGV2ZWwgMCBjaGFyYWN0ZXJzIHJlcXVpcmUgdGhpcyBzdGF0ZVxuICBzdGF0ZTogJ2lkbGUnLFxuICBpc1RyYW5zaXRpb25JbjogdHJ1ZSxcbiAgbmFtZSxcbiAgdHlwZSxcbn0pXG5cbmV4cG9ydCBjb25zdCBnZXRMZXZlbCA9ICh7XG4gIHBldFR5cGUsXG4gIGxldmVsLFxufToge1xuICBwZXRUeXBlOiBQZXRUeXBlXG4gIGxldmVsOiBudW1iZXJcbn0pID0+IHtcbiAgY29uc3QgcGV0VHlwZUZvdW5kID0gcGV0VHlwZXMuZ2V0KHBldFR5cGUpXG4gIGlmICghcGV0VHlwZUZvdW5kKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZFxuICB9XG5cbiAgY29uc3QgbGV2ZWxGb3VuZCA9IHBldFR5cGVGb3VuZC5sZXZlbHMuZ2V0KGxldmVsKVxuICBpZiAoIWxldmVsRm91bmQpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkXG4gIH1cblxuICByZXR1cm4gbGV2ZWxGb3VuZFxufVxuXG5cbmV4cG9ydCBjb25zdCBnZXROZXh0TGV2ZWxDYXAgPSAoYWN0dWFsTGV2ZWw6IG51bWJlcikgPT4ge1xuICByZXR1cm4gYWN0dWFsTGV2ZWwgKiAxMCArIDFcbn1cblxuZXhwb3J0IGNvbnN0IG11dGF0ZUxldmVsID0gKHsgdXNlclBldCB9OiB7IHVzZXJQZXQ6IFVzZXJQZXQgfSkgPT4ge1xuICBjb25zdCBuZXh0TGV2ZWxGb3VuZCA9IGdldExldmVsKHtcbiAgICBwZXRUeXBlOiB1c2VyUGV0LnR5cGUsXG4gICAgbGV2ZWw6IHVzZXJQZXQubGV2ZWwgKyAxLFxuICB9KVxuICBpZiAodXNlclBldC54cCA+PSBnZXROZXh0TGV2ZWxDYXAodXNlclBldC5sZXZlbCkpIHtcbiAgICB1c2VyUGV0LmxldmVsICs9IDFcbiAgICB1c2VyUGV0LnhwID0gMFxuICAgIGlmICghbmV4dExldmVsRm91bmQpIHJldHVyblxuICAgIHVzZXJQZXQucmFuayA9IHVzZXJQZXQubGV2ZWxcbiAgICB1c2VyUGV0LnNwZWVkID0gbmV4dExldmVsRm91bmQuYW5pbWF0aW9uc1t1c2VyUGV0LnN0YXRlXS5zcGVlZCB8fCAwXG4gICAgdXNlclBldC5zdGF0ZSA9IG5leHRMZXZlbEZvdW5kLmRlZmF1bHRTdGF0ZVxuICAgIHVzZXJQZXQuaXNUcmFuc2l0aW9uSW4gPSB0cnVlXG4gIH1cbn1cbiIsImltcG9ydCB7IFN0YXRlIH0gZnJvbSAnLi8nXG5cbmV4cG9ydCBsZXQgc3RhdGU6IFN0YXRlXG5cbmV4cG9ydCBjb25zdCBpbml0aWFsaXplU3RhdGUgPSAoaW5pdGlhbFN0YXRlOiBTdGF0ZSkgPT4gKHN0YXRlID0gaW5pdGlhbFN0YXRlKVxuXG5leHBvcnQgY29uc3Qgc2V0U3RhdGUgPSA8SyBleHRlbmRzIGtleW9mIFN0YXRlPihrZXk6IEssIHZhbHVlOiBTdGF0ZVtLXSkgPT5cbiAgKHN0YXRlID0ge1xuICAgIC4uLnN0YXRlLFxuICAgIFtrZXldOiB2YWx1ZSxcbiAgfSlcbiIsImltcG9ydCB7IFRyYW5zZm9ybXMsIE5leHRGcmFtZU9wdHMsIERpcmVjdGlvbiB9IGZyb20gJy4vJ1xuXG5leHBvcnQgY29uc3QgdHJhbnNmb3JtczogVHJhbnNmb3JtcyA9IHtcbiAgaWRsZToge1xuICAgIG5leHRGcmFtZTogKHsgZGlyZWN0aW9uLCBvZmZzZXQgfTogTmV4dEZyYW1lT3B0cykgPT4gKHtcbiAgICAgIGRpcmVjdGlvbixcbiAgICAgIGxlZnRQb3NpdGlvbjogb2Zmc2V0LFxuICAgIH0pLFxuICB9LFxuICB3YWxraW5nOiB7XG4gICAgbmV4dEZyYW1lOiAoe1xuICAgICAgY29udGFpbmVyV2lkdGgsXG4gICAgICBsZWZ0UG9zaXRpb246IG9sZExlZnRQb3NpdGlvbixcbiAgICAgIGRpcmVjdGlvbjogb2xkRGlyZWN0aW9uLFxuICAgICAgc3BlZWQsXG4gICAgfTogLy8gb2Zmc2V0LFxuICAgIE5leHRGcmFtZU9wdHMpID0+IHtcbiAgICAgIGNvbnN0IGRpcmVjdGlvbiA9XG4gICAgICAgIG9sZExlZnRQb3NpdGlvbiA+PSBjb250YWluZXJXaWR0aCAtIHNwZWVkIC0gMTUwXG4gICAgICAgICAgPyBEaXJlY3Rpb24ubGVmdFxuICAgICAgICAgIDogb2xkTGVmdFBvc2l0aW9uIDw9IDAgKyBzcGVlZFxuICAgICAgICAgID8gRGlyZWN0aW9uLnJpZ2h0XG4gICAgICAgICAgOiBvbGREaXJlY3Rpb25cblxuICAgICAgY29uc3QgbGVmdFBvc2l0aW9uID1cbiAgICAgICAgZGlyZWN0aW9uID09PSBEaXJlY3Rpb24ucmlnaHRcbiAgICAgICAgICA/IG9sZExlZnRQb3NpdGlvbiArIHNwZWVkXG4gICAgICAgICAgOiBvbGRMZWZ0UG9zaXRpb24gLSBzcGVlZFxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBkaXJlY3Rpb24sXG4gICAgICAgIGxlZnRQb3NpdGlvbixcbiAgICAgIH1cbiAgICB9LFxuICB9LFxufVxuIiwiZXhwb3J0IHR5cGUgU3RhdGUgPSB7XG4gIHVzZXJQZXQ6IFVzZXJQZXRcbiAgYmFzZVBldFVyaTogc3RyaW5nXG4gIGludGVydmFsSWQ/OiBOb2RlSlMuVGltZW91dCB8IHVuZGVmaW5lZFxufVxuXG5leHBvcnQgdHlwZSBHaWZzID0geyBbbmFtZTogc3RyaW5nXTogc3RyaW5nIH1cblxuZXhwb3J0IHR5cGUgUGV0U3RhdGUgPSAnd2Fsa2luZycgfCAnaWRsZScgfCAndHJhbnNpdGlvbidcblxuZXhwb3J0IHR5cGUgUGV0QW5pbWF0aW9uID0ge1xuICBnaWY6IHN0cmluZ1xuICB3aWR0aDogbnVtYmVyXG4gIGhlaWdodDogbnVtYmVyXG4gIG9mZnNldD86IG51bWJlclxuICBzcGVlZD86IG51bWJlclxuICBkdXJhdGlvbj86IG51bWJlclxufVxuXG5leHBvcnQgdHlwZSBQZXRMZXZlbCA9IHtcbiAgZGVmYXVsdFN0YXRlOiBQZXRTdGF0ZVxuICBhbmltYXRpb25zOiB7XG4gICAgW25hbWU6IHN0cmluZ106IFBldEFuaW1hdGlvblxuICB9XG59XG5cbmV4cG9ydCB0eXBlIFBldCA9IHtcbiAgbGV2ZWxzOiBNYXA8bnVtYmVyLCBQZXRMZXZlbD5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBVc2VyUGV0QmFzZVByb3BzIHtcbiAgbGVmdFBvc2l0aW9uOiBudW1iZXJcbiAgc3BlZWQ6IG51bWJlclxuICBkaXJlY3Rpb246IG51bWJlclxuICBsZXZlbDogbnVtYmVyXG4gIHhwOiBudW1iZXJcbiAgcmFuazogbnVtYmVyXG4gIHN0YXRlOiBQZXRTdGF0ZVxuICBpc1RyYW5zaXRpb25JbjogYm9vbGVhblxufVxuXG5leHBvcnQgdHlwZSBQZXRUeXBlID0gJ21vbnN0ZXIxJyB8ICdtb25zdGVyMicgfCAndW5rbm93bidcblxuZXhwb3J0IGludGVyZmFjZSBVc2VyUGV0QXJncyB7XG4gIG5hbWU6IHN0cmluZ1xuICB0eXBlOiBQZXRUeXBlXG59XG5cbmV4cG9ydCB0eXBlIFVzZXJQZXQgPSBVc2VyUGV0QmFzZVByb3BzICYgVXNlclBldEFyZ3NcblxuZXhwb3J0IGVudW0gRGlyZWN0aW9uIHtcbiAgcmlnaHQgPSAxLFxuICBsZWZ0ID0gLTEsXG59XG5cbmV4cG9ydCB0eXBlIE5leHRGcmFtZU9wdHMgPSB7XG4gIGNvbnRhaW5lcldpZHRoOiBudW1iZXJcbiAgbGVmdFBvc2l0aW9uOiBudW1iZXJcbiAgZGlyZWN0aW9uOiBudW1iZXJcbiAgc3BlZWQ6IG51bWJlclxuICBvZmZzZXQ6IG51bWJlclxufVxuXG5leHBvcnQgdHlwZSBOZXh0RnJhbWVGblJldHVybiA9IHtcbiAgbGVmdFBvc2l0aW9uOiBudW1iZXJcbiAgZGlyZWN0aW9uOiBudW1iZXJcbiAgbmV3UGV0U3RhdGU/OiBQZXRTdGF0ZVxufVxuXG5leHBvcnQgdHlwZSBOZXh0RnJhbWVGbiA9IChvcHRzOiBOZXh0RnJhbWVPcHRzKSA9PiBOZXh0RnJhbWVGblJldHVyblxuXG5leHBvcnQgdHlwZSBUcmFuc2Zvcm1zID0ge1xuICBbdHJhbnNmb3JtOiBzdHJpbmddOiB7XG4gICAgbmV4dEZyYW1lOiBOZXh0RnJhbWVGblxuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvcGFuZWwvbWFpbi50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==