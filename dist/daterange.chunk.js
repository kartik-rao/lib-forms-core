(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{425:function(e,t,a){"use strict";a.r(t),a.d(t,"DateRangeView",function(){return o});var n=a(60),r=a(16),l=a.n(r),d=a(2),u=a(238);const o=e=>{let t=e.field.componentProps,{dateFormat:a,mode:r,defaultStartValue:o,defaultEndValue:s}=e.field.componentProps;const c=Object(n.a)(()=>({get dates(){return[c.defaultStart,c.defaultEnd]},defaultValue:t.defaultValue,dateMode:r||"date",defaultStart:o?l()(o,a):null,defaultEnd:s?l()(s,a):null,get dateFormat(){switch(t.mode){case"date":return l.a.HTML5_FMT.DATE;case"month":return l.a.HTML5_FMT.MONTH;case"time":case"year":return l.a.HTML5_FMT.TIME;default:return l.a.HTML5_FMT.DATE}}}));let f=t=>{let a=t.target?t.target.value:t;a?e.onChange(l()(a).format(c.dateFormat)):e.onChange(null)};return Object(n.b)(()=>d.createElement(d.Suspense,{fallback:""},d.createElement("span",{id:`${e.field.id}-start`,className:"fl-daterange-field-start",style:{marginRight:"5px"}},d.createElement(u.default.RangePicker,{onChange:f,format:c.dateFormat}))))}}}]);
//# sourceMappingURL=daterange.chunk.js.map