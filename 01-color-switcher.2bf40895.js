const t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),o=document.querySelector("body");let r=null;const d=()=>{o.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`};t.addEventListener("click",(()=>{r=setInterval(d,1e3),t.setAttribute("disabled",!0),e.removeAttribute("disabled")})),e.addEventListener("click",(()=>{clearInterval(r),e.setAttribute("disabled",!0),t.removeAttribute("disabled"),console.log(`Interval with id ${r} has stopped!`)}));
//# sourceMappingURL=01-color-switcher.2bf40895.js.map