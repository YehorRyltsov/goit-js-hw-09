var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},t={},o=e.parcelRequired7c6;null==o&&((o=function(e){if(e in n)return n[e].exports;if(e in t){var o=t[e];delete t[e];var i={id:e,exports:{}};return n[e]=i,o.call(i.exports,i,i.exports),i.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,n){t[e]=n},e.parcelRequired7c6=o);var i=o("iQIUW");let r=document.querySelector("form");function l(e,n){return new Promise(((t,o)=>{setTimeout((()=>{Math.random()>.3?t({position:e,delay:n}):o({position:e,delay:n})}),n)}))}r.addEventListener("submit",(function(e){e.preventDefault();let n=parseInt(r.elements.delay.value),t=parseInt(r.elements.step.value),o=parseInt(r.elements.amount.value);for(let e=1;e<=o;e++)l(e,n).then((({position:e,delay:n})=>{i.Notify.success(`✅ Fulfilled promise ${e} in ${n}ms`)})).catch((({position:e,delay:n})=>{i.Notify.warning(`❌ Rejected promise ${e} in ${n}ms`)})),n+=t}));
//# sourceMappingURL=03-promises.d5d0c06a.js.map