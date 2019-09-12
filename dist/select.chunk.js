(window.webpackJsonpForms=window.webpackJsonpForms||[]).push([["select"],{"./src/views/controls/SelectView.tsx":
/*!*******************************************!*\
  !*** ./src/views/controls/SelectView.tsx ***!
  \*******************************************/
/*! exports provided: SelectView */function(e,t,n){"use strict";n.r(t),n.d(t,"SelectView",function(){return l});var o=n(/*! antd */"antd"),s=n(/*! mobx-react */"./node_modules/mobx-react/dist/mobx-react.module.js"),c=n(/*! react */"react");const l=e=>{let t=e.field.componentProps;return Object(s.useObserver)(()=>c.createElement(c.Suspense,{fallback:""},c.createElement(o.Select,Object.assign({},t,{onChange:e.onChange,onBlur:e.onBlur}),t.options&&t.options.map((t,n)=>c.createElement(o.Select.Option,{key:e.field.id+"-option-"+n,value:t.value},t.label)))))}}}]);
//# sourceMappingURL=select.chunk.js.map