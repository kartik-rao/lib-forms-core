(window.webpackJsonpForms=window.webpackJsonpForms||[]).push([["htmlfragment"],{"./src/views/controls/HtmlFragmentView.tsx":
/*!*************************************************!*\
  !*** ./src/views/controls/HtmlFragmentView.tsx ***!
  \*************************************************/
/*! exports provided: HtmlFragmentView */function(s,e,l){"use strict";l.r(e),l.d(e,"HtmlFragmentView",(function(){return a}));var o=l(/*! tslib */"./node_modules/tslib/tslib.es6.js"),t=l(/*! react */"react"),r=l(/*! mobx-react */"./node_modules/mobx-react/dist/mobx-react.module.js");const a=s=>{let{field:e}=s,l=e.componentProps,{allowForms:a,allowPopups:n,allowScripts:m,fragmentUrl:c,seamless:i}=l,p=Object(o.__rest)(l,["allowForms","allowPopups","allowScripts","fragmentUrl","seamless"]),u=[];return a&&u.push("allow-forms"),n&&u.push("allow-popups"),m&&u.push("allow-scripts"),Object(r.useObserver)(()=>t.createElement(t.Suspense,{fallback:""},t.createElement("iframe",Object.assign({},p,{src:c,id:e.id,"data-uuid":e.uuid,sandbox:u.join(" "),seamless:i}))))}}}]);
//# sourceMappingURL=htmlfragment.chunk.js.map