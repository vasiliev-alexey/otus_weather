/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _js_renderData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/renderData */ \"./src/js/renderData.js\");\n\n(0,_js_renderData__WEBPACK_IMPORTED_MODULE_0__.renderInitialData)();\n(0,_js_renderData__WEBPACK_IMPORTED_MODULE_0__.renderSearchForm)();\n(0,_js_renderData__WEBPACK_IMPORTED_MODULE_0__.renderCityList)();\n\n//# sourceURL=webpack://weather_forecast/./src/index.js?");

/***/ }),

/***/ "./src/js/data.js":
/*!************************!*\
  !*** ./src/js/data.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"currentCity\": () => (/* binding */ currentCity),\n/* harmony export */   \"currentWeather\": () => (/* binding */ currentWeather)\n/* harmony export */ });\nasync function currentCity() {\n  try {\n    const ipGeoPosition = await fetch('https://ipapi.co/json/');\n    const data = await ipGeoPosition.json();\n    return data.city;\n  } catch {\n    return new Error('Ошибка определения города по геолокации');\n  }\n}\nasync function currentWeather(city) {\n  const MAIN_PATH = 'https://api.openweathermap.org/data/2.5/weather?q=';\n  const API_KEY = 'ee1b612e4275f70a8d94e61043101407';\n\n  try {\n    const weatherService = await fetch(`${MAIN_PATH}${city}&appid=${API_KEY}&units=metric&lang=ru`);\n    const data = await weatherService.json();\n    return data;\n  } catch {\n    return new Error('Ошибка работы сервиса данных о погоде');\n  }\n}\n\n//# sourceURL=webpack://weather_forecast/./src/js/data.js?");

/***/ }),

/***/ "./src/js/renderData.js":
/*!******************************!*\
  !*** ./src/js/renderData.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"renderData\": () => (/* binding */ renderData),\n/* harmony export */   \"renderCityList\": () => (/* binding */ renderCityList),\n/* harmony export */   \"renderInitialData\": () => (/* binding */ renderInitialData),\n/* harmony export */   \"renderSearchForm\": () => (/* binding */ renderSearchForm)\n/* harmony export */ });\n/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage */ \"./src/js/storage.js\");\n/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data */ \"./src/js/data.js\");\n\n\nasync function renderData(city) {\n  const mainPoint = document.querySelector('.main');\n  const mapPoint = document.querySelector('.map');\n  mainPoint.innerHTML = '';\n  mapPoint.src = '';\n  const div = document.createElement('div');\n  div.classList.add('icon');\n  const p = document.createElement('p');\n  p.classList.add('cityLabel');\n  div.appendChild(p);\n  const currWeather = await (0,_data__WEBPACK_IMPORTED_MODULE_1__.currentWeather)(city);\n\n  if (currWeather instanceof Error) {\n    p.innerText = currWeather.message;\n  } else if (currWeather.cod === '404') {\n    p.innerText = 'Город не найден';\n  } else if (currWeather.cod !== 200) {\n    p.innerText = 'Ошибка работы сервиса геолокации';\n  } else {\n    p.innerText = `${currWeather.name}  ${currWeather.main.temp}`;\n    currWeather.weather.forEach(w => {\n      const img = document.createElement('img');\n      img.src = `https://openweathermap.org/img/wn/${w.icon}@2x.png`;\n      div.appendChild(img);\n    });\n    const utlRoot = 'https://maps.googleapis.com/maps/api/staticmap?center=';\n    const apiSuffix = '&zoom=12&size=1200x1200&key=AIzaSyAPubPBOtMn4EiVxxZ1ySt32GSX5yd1bIs';\n    mapPoint.src = `${utlRoot}${currWeather.coord.lat},\n  ${currWeather.coord.lon}${apiSuffix}`;\n    (0,_storage__WEBPACK_IMPORTED_MODULE_0__.saveCity)(city);\n  }\n\n  div.appendChild(p);\n  mainPoint.appendChild(div);\n}\nfunction renderCityList() {\n  const mainPoint = document.querySelector('.cityList');\n  mainPoint.innerHTML = '';\n  const table = document.createElement('table');\n  table.classList.add('city-list');\n  const tr = document.createElement('tr');\n  const th = document.createElement('th');\n  th.textContent = 'Ранее было';\n  tr.appendChild(th);\n  table.appendChild(th);\n  const data = (0,_storage__WEBPACK_IMPORTED_MODULE_0__.getCityList)();\n  const cityTableBody = document.createElement('tbody');\n  data.forEach(c => {\n    const trd = document.createElement('tr');\n    trd.classList.add('trd-1');\n    const thd = document.createElement('td');\n    trd.appendChild(thd);\n    thd.textContent = c;\n    cityTableBody.appendChild(trd);\n  });\n  cityTableBody.addEventListener('click', event => {\n    renderData(event.target.outerText);\n  });\n  table.appendChild(cityTableBody);\n  mainPoint.appendChild(table);\n}\nasync function renderInitialData() {\n  const mainPoint = document.querySelector('.main');\n  mainPoint.innerHTML = '';\n  const div = document.createElement('div');\n  div.classList.add('icon');\n  const p = document.createElement('p');\n  p.classList.add('label_city');\n\n  try {\n    const curCity = await (0,_data__WEBPACK_IMPORTED_MODULE_1__.currentCity)();\n\n    if (curCity instanceof Error) {\n      p.innerText = `Ошибка при попытке установить местоположение`;\n    } else {\n      await renderData(curCity);\n    }\n  } catch (e) {\n    p.innerText = `Ошибка при попытке установить местоположения \\n${e}`;\n  }\n\n  div.appendChild(p);\n  mainPoint.appendChild(div);\n}\nfunction renderSearchForm() {\n  const mainPoint = document.querySelector('.searchDiv');\n  const div = document.createElement('div');\n  div.classList.add('search');\n  const form = document.createElement('div');\n  const inputSearchParagraph = document.createElement('p');\n  const searchButton = document.createElement('searchButton');\n  searchButton.innerText = 'Введите город';\n  inputSearchParagraph.appendChild(searchButton);\n  const inputSearchCity = document.createElement('textarea');\n  inputSearchCity.classList.add('searchCity');\n  inputSearchCity.rows = 1;\n  inputSearchCity.cols = 10;\n  inputSearchCity.classList.add('ta');\n  inputSearchCity.addEventListener('keyup', () => {\n    const srchButton = document.querySelector('.btnWeather');\n    const inpArea = document.querySelector('.ta');\n\n    if (inpArea.value.trim().length > 0) {\n      srchButton.hidden = false;\n    } else {\n      srchButton.hidden = true;\n    }\n  });\n  const btnShowWeather = document.createElement('button');\n  btnShowWeather.textContent = 'Найти';\n  btnShowWeather.cols = 10;\n  btnShowWeather.classList.add('btnWeather');\n  btnShowWeather.hidden = true;\n  btnShowWeather.addEventListener('click', () => {\n    const inpArea = document.querySelector('.ta');\n\n    if (inpArea.value.trim().length > 0) {\n      renderData(inputSearchCity.value);\n      renderCityList();\n      inpArea.value = '';\n      inpArea.dispatchEvent(new Event('keyup'));\n    } else {\n      searchButton.innerText = 'Город не указан';\n    }\n  });\n  const p2 = document.createElement('p');\n  p2.append(btnShowWeather);\n  form.append(inputSearchParagraph, inputSearchCity, p2);\n  div.appendChild(form);\n  mainPoint.appendChild(div);\n}\n\n//# sourceURL=webpack://weather_forecast/./src/js/renderData.js?");

/***/ }),

/***/ "./src/js/storage.js":
/*!***************************!*\
  !*** ./src/js/storage.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"saveCity\": () => (/* binding */ saveCity),\n/* harmony export */   \"getCityList\": () => (/* binding */ getCityList)\n/* harmony export */ });\nconst KEY = 'cityList';\nfunction saveCity(city) {\n  const storageData = localStorage.getItem(KEY);\n  let data = JSON.parse(storageData);\n\n  if (data === null) {\n    data = [];\n  }\n\n  if (!data.includes(city)) {\n    if (data.length === 10) {\n      data.shift();\n    }\n\n    data.push(city);\n  } else {\n    return;\n  }\n\n  localStorage.setItem(KEY, JSON.stringify(data));\n}\nfunction getCityList() {\n  const storageData = localStorage.getItem(KEY);\n  return JSON.parse(storageData);\n}\n\n//# sourceURL=webpack://weather_forecast/./src/js/storage.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;