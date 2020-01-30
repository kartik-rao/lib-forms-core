(window.webpackJsonpForms=window.webpackJsonpForms||[]).push([["daterange"],{"./src/views/controls/DateRangeView.tsx":
/*!**********************************************!*\
  !*** ./src/views/controls/DateRangeView.tsx ***!
  \**********************************************/
/*! exports provided: DateRangeView */function(e,t,a){"use strict";a.r(t),a.d(t,"DateRangeView",(function(){return s}));var n=a(/*! mobx-react */"./node_modules/mobx-react/dist/mobx-react.module.js"),r=a(/*! moment */"moment"),d=a.n(r),l=a(/*! react */"react"),o=a(/*! antd/es/date-picker */"./node_modules/antd/es/date-picker/index.js");const s=e=>{let t=e.field.componentProps,{dateFormat:a,mode:r,defaultStartValue:s,defaultEndValue:u}=e.field.componentProps;const c=Object(n.useLocalStore)(()=>({get dates(){return[c.defaultStart,c.defaultEnd]},defaultValue:t.defaultValue,dateMode:r||"date",defaultStart:s?d()(s,a):null,defaultEnd:u?d()(u,a):null,get dateFormat(){switch(t.mode){case"date":return d.a.HTML5_FMT.DATE;case"month":return d.a.HTML5_FMT.MONTH;case"time":case"year":return d.a.HTML5_FMT.TIME;default:return d.a.HTML5_FMT.DATE}}}));let m=t=>{let a=t.target?t.target.value:t;a?e.onChange(d()(a).format(c.dateFormat)):e.onChange(null)};return Object(n.useObserver)(()=>l.createElement(l.Suspense,{fallback:""},l.createElement("span",{id:`${e.field.id}-start`,className:"fl-daterange-field-start",style:{marginRight:"5px"}},l.createElement(o.default.RangePicker,{onChange:m,format:c.dateFormat}))))}}}]);
//# sourceMappingURL=daterange.chunk.js.map