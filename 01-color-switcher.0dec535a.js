!function(){var t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),o=document.querySelector("body");var n=null,r=function(){o.style.backgroundColor="".concat("#".concat(Math.floor(16777215*Math.random()).toString(16)))};t.addEventListener("click",(function(){n=setInterval(r,1e3),t.setAttribute("disabled",!0),e.removeAttribute("disabled")})),e.addEventListener("click",(function(){clearInterval(n),e.setAttribute("disabled",!0),t.removeAttribute("disabled"),console.log("Interval with id ".concat(n," has stopped!"))}))}();
//# sourceMappingURL=01-color-switcher.0dec535a.js.map
