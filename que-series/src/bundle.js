!function(t,e){for(var r in e)t[r]=e[r]}(exports,function(t){var e={};function r(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}return r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)r.d(n,i,function(e){return t[e]}.bind(null,i));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e,r){"use strict";r.r(e),r.d(e,"aesthetique",(function(){return J})),r.d(e,"mathematique",(function(){return K})),r.d(e,"utilique",(function(){return Q}));var n={};r.r(n),r.d(n,"hexColorFromPercent",(function(){return s}));var i={};r.r(i),r.d(i,"cndf",(function(){return p})),r.d(i,"cndfInv",(function(){return d})),r.d(i,"ndf",(function(){return f})),r.d(i,"loss",(function(){return g})),r.d(i,"d1",(function(){return h})),r.d(i,"d2",(function(){return y})),r.d(i,"getRangeOfPrices",(function(){return M})),r.d(i,"delta",(function(){return L})),r.d(i,"gamma",(function(){return C})),r.d(i,"theta",(function(){return m})),r.d(i,"vega",(function(){return k})),r.d(i,"rho",(function(){return B})),r.d(i,"calculateGreeks",(function(){return P})),r.d(i,"calculateIV",(function(){return q})),r.d(i,"calculateOptionsPrice",(function(){return w})),r.d(i,"calculateProfitAtExpiry",(function(){return x})),r.d(i,"collateralAnalysis",(function(){return b})),r.d(i,"extractStrategies",(function(){return v})),r.d(i,"assignmentRiskAnalysis",(function(){return S})),r.d(i,"nakedLegsAnalysis",(function(){return $})),r.d(i,"nameStrategy",(function(){return j}));var l={};r.r(l),r.d(l,"getMean",(function(){return O})),r.d(l,"getSD",(function(){return I})),r.d(l,"getPDF",(function(){return N})),r.d(l,"getPDFLaplace",(function(){return A})),r.d(l,"setDistribution",(function(){return R})),r.d(l,"isOutlier",(function(){return V}));var u={};r.r(u),r.d(u,"getInt",(function(){return D})),r.d(u,"getClose",(function(){return F})),r.d(u,"getDays",(function(){return T})),r.d(u,"getRightYield",(function(){return _}));var o={};r.r(o),r.d(o,"fetchReq",(function(){return U})),r.d(o,"fetchReqAuth",(function(){return Y})),r.d(o,"fileReq",(function(){return z}));var a={};function s(t){return t<=0?c(Math.max(80,255+25*t),0,0):t<=.5&&t>0?c(350*t+80,0,0):t<=1&&t>.5?c(255,510*(t-.5),510*(t-.5)):t<=4&&t>1?c(-85*(t-1)+255,255,-85*(t-1)+255):t>4?c(0,Math.max(80,255-25*t),0):void 0}function c(t,e,r){return`rgba(${Math.round(t)},${Math.round(e)},${Math.round(r)}, 1)`}function p(t){if(t<-5)return 0;if(t>5)return 1;let e=1;t<0&&(e=-1);const r=1/(1+.3275911*(t=Math.abs(t)/Math.sqrt(2)));return.5*(1+e*(1-((((1.061405429*r-1.453152027)*r+1.421413741)*r-.284496736)*r+.254829592)*r*Math.exp(-t*t)))}function d(t){const e=-.00778489400243029,r=-.322396458041136,n=-2.40075827716184,i=-2.54973253934373,l=4.37466414146497,u=2.93816398269878,o=.00778469570904146,a=.32246712907004,s=2.445134137143,c=3.75440866190742;let p,d,f;return t<0||t>1?f=null:t<.02425?(p=Math.sqrt(-2*Math.log(t)),f=(((((e*p+r)*p+n)*p+i)*p+l)*p+u)/((((o*p+a)*p+s)*p+c)*p+1)):t<=.97575?(p=t-.5,d=p*p,f=(((((-39.6968302866538*d+220.946098424521)*d-275.928510446969)*d+138.357751867269)*d-30.6647980661472)*d+2.50662827745924)*p/(((((-54.4760987982241*d+161.585836858041)*d-155.698979859887)*d+66.8013118877197)*d-13.2806815528857)*d+1)):(p=Math.sqrt(-2*Math.log(1-t)),f=-(((((e*p+r)*p+n)*p+i)*p+l)*p+u)/((((o*p+a)*p+s)*p+c)*p+1)),f}function f(t){return 1/Math.sqrt(2*Math.PI)*Math.exp(-1*t*t/2)}function g(t,e){return t-e}function h(t,e,r,n,i,l){return(Math.log(t/e)+r*(i-n+l*l/2))/(l*Math.sqrt(r))}function y(t,e,r,n,i,l){return(Math.log(t/e)+r*(i-n+l*l/2))/(l*Math.sqrt(r))-l*Math.sqrt(r)}function M(t,e,r,n){const i=[],l=t/Math.pow(1+e/100,Math.floor(r/2)),u=t*Math.pow(1+e/100,Math.floor(r/2));for(let t=l;t<u*(1+e/200);t*=1+e/100)i.push([t,n]);return i}function L(t,e,r,n,i,l,u,o){return n?(i?1:-1)*Math.exp(-1*u*t)*p(h(e,r,t,u,l,o)):n?void 0:(i?1:-1)*Math.exp(-1*u*t)*(p(h(e,r,t,u,l,o))-1)}function C(t,e,r,n,i,l,u){return(n?1:-1)*Math.exp(-1*l*t)*f(h(e,r,t,l,i,u))/(e*u*Math.sqrt(t))}function m(t,e,r,n,i,l,u,o){return n?(i?1:-1)*(-f(h(e,r,t,u,l,o))/(2*Math.sqrt(t))*e*o*Math.exp(-1*u*t)+u*e*Math.exp(-1*u*t)*p(h(e,r,t,u,l,o))-l*r*Math.exp(-1*l*t)*f(y(e,r,t,u,l,o)))/365:n?void 0:(i?1:-1)*(-f(h(e,r,t,u,l,o))/(2*Math.sqrt(t))*e*o*Math.exp(-1*u*t)-u*e*Math.exp(-1*u*t)*p(-1*h(e,r,t,u,l,o))-l*r*Math.exp(-1*l*t)*f(-1*y(e,r,t,u,l,o)))/365}function k(t,e,r,n,i,l,u){return(n?1:-1)*e/100*Math.exp(-1*l*t)*Math.sqrt(t)*f(h(e,r,t,l,i,u))}function B(t,e,r,n,i,l,u,o){return n?(i?1:-1)*t/100*Math.exp(-1*l*t)*r*p(y(e,r,t,u,l,o)):n?void 0:(i?1:-1)*t/-100*Math.exp(-1*l*t)*r*p(-1*y(e,r,t,u,l,o))}function P(t,e,r,n,i,l,u,o){const a={};return a.delta=L(t,e,r,n,i,l,u,o),a.gamma=C(t,e,r,i,l,u,o),a.theta=m(t,e,r,n,i,l,u,o),a.vega=k(t,e,r,i,l,u,o),a.rho=B(t,e,r,n,i,l,u,o),a}function q(t,e,r,n,i,l,u){let o=e=parseFloat(e);if(i&&r-n>e&&n<r?(o=r-n+.001,l=0,u=0):!i&&n-r>e&&n>r&&(o=n-r+.001,l=0,u=0),t<=0)return 1/0;let a,s=Math.sqrt(2*Math.PI/t)*o/r;if(s<=0)return.01;let c=w(t,r,n,i,!0,l,u,s),p=0;for(;(g(o,c)>.01||g(o,c)<-.01)&&(Math.abs(g(o,c))>o/10?(o>c&&(s*=Math.random()/2+.01+1),o<c&&(s/=Math.random()/2+.01+1)):(a=r*Math.exp(-1*u*t)*Math.sqrt(t)*f(h(r,n,t,u,l,s)),s+=g(o,c)/a),c=w(t,r,n,i,!0,l,u,s),p++,!(p>75)););return s<=.005&&(s=NaN),s}function w(t,e,r,n,i,l,u,o){let a;return n?a=e*Math.exp(-1*u*t)*p(h(e,r,t,u,l,o))-r*Math.exp(-1*l*t)*p(y(e,r,t,u,l,o)):n||(a=-1*e*Math.exp(-1*u*t)*p(-1*h(e,r,t,u,l,o))+r*Math.exp(-1*l*t)*p(-1*y(e,r,t,u,l,o))),0==a&&(a=.01),i||(a*=-1),a}function x(t,e,r,n,i){if(n){if(i)return Math.max(-1*t+(e-r),-1*t);if(!i)return Math.min(t-(e-r),t)}else if(!n){if(i)return Math.max(-1*t+(-1*e+r),-1*t);if(!i)return Math.min(t-(-1*e+r),t)}}function b(t){for(const e of t)if(e.price<0){if(4==e.quantity||3==e.quantity)return Math.max(e.a-e.b,e.c-e.d);if(2==e.quantity)return e.upper-e.lower;if(1==e.quantity&&!e.isLong)return 1/0}return 0}function v(t){const e=[...t],r=[];for(const t of e)for(let e=0;e<(null!=t.quantity?t.quantity:1);e++)r.push(t);let n=!0,i=0,l=1,u=0;for(;n&&null!=r[l];)null==r[i].type&&r[i].date==r[l].date&&r[i].isCall===r[l].isCall&&r[i].isLong!=r[l].isLong&&r[i].strike!=r[l].strike?(r.splice(u,0,{isCall:r[i].isCall,isLong:r[i].isCall?!r[i].isLong:r[i].isLong,type:r[i].isCall?"Call Spread":"Put Spread",dir:r[i].isLong?"Bear":"Bull",upper:r[i].strike,lower:r[l].strike,date:r[i].date,price:(r[i].isLong?1:-1)*r[i].limitPrice+(r[l].isLong?1:-1)*r[l].limitPrice,quantity:2}),r.splice(i+1,1),r.splice(l,1),u++,i=u,l=u+1):(l==r.length-1&&(i++,l=i),l++);for(n=!0,i=0,l=1,u=0;n&&null!=r[l];)r[i].type!=r[l].type&&null!=r[i].type&&null!=r[l].type&&r[i].type.includes("Spread")&&r[i].date==r[l].date&&r[i].dir!=r[l].dir?r[i].lower==r[l].upper&&r[i].upper!=r[l].lower?(r.splice(u,0,{date:r[i].date,a:r[i].upper,b:r[i].lower,c:r[l].upper,d:r[l].lower,isLong:"Bear"==r[i].dir&&"Bull"==r[l].dir,dir:"Bear"==r[i].dir&&"Bull"==r[l].dir?"Pin":"Neu",type:"Iron Fly",price:r[i].price+r[l].price,quantity:3}),r.splice(i+1,1),r.splice(l,1),u++,i=u,l=u+1):r[i].upper==r[l].upper&&r[i].lower==r[l].lower?(r.splice(u,0,{date:r[i].date,upper:r[i].upper,lower:r[i].lower,isLong:"Bear"==r[i].dir&&"Bull"==r[l].dir,dir:"Bear"==r[i].dir&&"Bull"==r[l].dir?"Pin":"Neu",type:"Box Spread",price:r[i].price+r[l].price,quantity:4}),r.splice(i+1,1),r.splice(l,1),u++,i=u,l=u+1):r[i].lower!=r[l].upper&&r[i].upper!=r[l].lower&&(r.splice(u,0,{date:r[i].date,a:r[i].upper,b:r[i].lower>r[l].upper?r[i].lower:r[l].upper,c:r[i].lower<r[l].upper?r[i].lower:r[l].upper,d:r[l].lower,isLong:"Bear"==r[i].dir&&"Bull"==r[l].dir,dir:"Bear"==r[i].dir&&"Bull"==r[l].dir?"Pin":"Neu",type:"Iron Condor",price:r[i].price+r[l].price,quantity:4}),r.splice(i+1,1),r.splice(l,1),u++,i=u,l=u+1):r[i].type==r[l].type&&null!=r[i].type&&r[i].type.includes("Spread")&&r[i].date==r[l].date&&r[i].dir!=r[l].dir?r[i].lower==r[l].upper&&r[i].upper!=r[l].lower?(r.splice(u,0,{date:r[i].date,a:r[i].upper,b:r[i].lower,c:r[l].upper,d:r[l].lower,isLong:"Bear"==r[i].dir&&"Bull"==r[l].dir,isCall:r[i].isCall,dir:"Bear"==r[i].dir&&"Bull"==r[l].dir?"Pin":"Neu",type:`${r[i].isCall?"Call":"Put"} Fly`,price:r[i].price+r[l].price,quantity:3}),r.splice(i+1,1),r.splice(l,1),u++,i=u,l=u+1):r[i].lower!=r[l].upper&&r[i].upper!=r[l].lower&&(r.splice(u,0,{date:r[i].date,a:r[i].upper,b:r[i].lower>r[l].upper?r[i].lower:r[l].upper,c:r[i].lower<r[l].upper?r[i].lower:r[l].upper,d:r[l].lower,isLong:"Bear"==r[i].dir&&"Bull"==r[l].dir,isCall:r[i].isCall,dir:"Bear"==r[i].dir&&"Bull"==r[l].dir?"Pin":"Neu",type:`${r[i].isCall?"Call":"Put"} Condor`,price:r[i].price+r[l].price,quantity:4}),r.splice(i+1,1),r.splice(l,1),u++,i=u,l=u+1):(l==r.length-1&&(i++,l=i),l++);for(n=!0,i=0,l=1,u=0;n&&null!=r[l];)null==r[i].type&&null==r[l].type&&r[i].isCall===r[l].isCall&&r[i].isLong!=r[l].isLong&&r[i].strike!=r[l].strike?(r.splice(u,0,{isCall:r[i].isCall,isLong:r[l].isLong,date:r[i].date,upper:r[i].strike>r[l].strike?r[i].strike:r[l].strike,lower:r[i].strike<r[l].strike?r[i].strike:r[l].strike,dir:r[l].isLong?r[i].strike>r[l].strike?"Bull":"Bear":r[i].strike>r[l].strike?"Bear":"Bull",type:`Diagonal ${r[i].isCall?"Call":"Put"} Spread`,price:(r[i].isLong?1:-1)*r[i].limitPrice+(r[l].isLong?1:-1)*r[l].limitPrice,quantity:2}),r.splice(i+1,1),r.splice(l,1),u++,i=u,l=u+1):(l==r.length-1&&(i++,l=i),l++);for(n=!0,i=0,l=1,u=0;n&&null!=r[l];)null==r[i].type&&null==r[l].type&&r[i].date!=r[l].date&&r[i].strike===r[l].strike&&r[i].isCall==r[l].isCall&&r[i].isLong!=r[l].isLong?(r.splice(u,0,{isCall:r[i].isCall,isLong:r[l].isLong,date:r[i].date,strike:r[i].strike,dir:r[l].isLong?"Pin":"Neu",type:`${r[i].isCall?"Call":"Put"} Calendar Spread`,price:(r[i].isLong?1:-1)*r[i].limitPrice+(r[l].isLong?1:-1)*r[l].limitPrice,quantity:2}),r.splice(i+1,1),r.splice(l,1),u++,i=u,l=u+1):(l==r.length-1&&(i++,l=i),l++);for(n=!0,i=0,l=1,u=0;n&&null!=r[l];)null==r[i].type&&null==r[l].type&&r[i].date==r[l].date&&r[i].isCall!=r[l].isCall&&r[i].isLong==r[l].isLong?r[i].strike===r[l].strike?(r.splice(u,0,{isLong:r[i].isLong,date:r[i].date,strike:r[i].strike,dir:r[i].isLong?"Neu":"Pin",type:"Straddle",price:(r[i].isLong?1:-1)*r[i].limitPrice+(r[l].isLong?1:-1)*r[l].limitPrice,quantity:2}),r.splice(i+1,1),r.splice(l,1),u++,i=u,l=u+1):(r.splice(u,0,{isLong:r[i].isLong,date:r[i].date,upper:r[i].strike,lower:r[l].strike,dir:r[i].isLong?"Neu":"Pin",type:"Strangle",price:(r[i].isLong?1:-1)*r[i].limitPrice+(r[l].isLong?1:-1)*r[l].limitPrice,quantity:2}),r.splice(i+1,1),r.splice(l,1),u++,i=u,l=u+1):(l==r.length-1&&(i++,l=i),l++);for(n=!0,i=0,l=1,u=0;n&&null!=r[l];)null==r[i].type&&null==r[l].type&&r[i].isCall!=r[l].isCall&&r[i].isLong!=r[l].isLong?(r.splice(u,0,{isLong:r[i].isLong?r[i].isCall:r[l].isCall,date:r[i].date,upper:r[i].strike,lower:r[l].strike,dir:r[i].isLong?r[i].isCall?"Bull":"Bear":r[i].isCall?"Bear":"Bull",type:"Synthetic",price:(r[i].isLong?1:-1)*r[i].limitPrice+(r[l].isLong?1:-1)*r[l].limitPrice,quantity:2}),r.splice(i+1,1),r.splice(l,1),u++,i=u,l=u+1):(l==r.length-1&&(i++,l=i),l++);for(n=!0,i=0;n&&null!=r[i];)null==r[i].type&&(r[i]={type:r[i].isCall?"Call":"Put",dir:r[i].isLong?r[i].isCall?"Bull":"Bear":r[i].isCall?"Bear":"Bull",isCall:r[i].isCall,isLong:r[i].isLong,date:r[i].date,strike:r[i].strike,price:(r[i].isLong?1:-1)*r[i].limitPrice,quantity:1}),i++;return r}function S(t,e){const r=[];for(const n of e)n.isLong||(n.strike<.92*t&&n.isCall||n.strike>1.08*t&&!n.isCall)&&r.push(n);return r}function $(t){const e=[...t];for(let t=0;t<e.length;t++){const r=e[t];for(let n=t+1;n<e.length;n++){const t=e[n];if((t.date==r.date||t.isLong)&&r.isCall==t.isCall&&(r.isLong?!t.isLong:t.isLong)){e.splice(e.findIndex(t=>t.date==r.date&&t.strike==r.strike&&t.isCall==r.isCall),1),e.splice(e.findIndex(e=>e.date==t.date&&e.strike==t.strike&&e.isCall==t.isCall),1);break}}for(let t=0;t<e.length;t++){const r=e[t];r.isLong&&e.splice(e.findIndex(t=>t.date==r.date&&t.strike==r.strike&&t.isCall==r.isCall),1)}}return e}function j(t){const e=t.map(t=>({type:t.type,quantity:t.quantity,dir:t.dir})),r=e.reduce((t,e)=>t+e.quantity,0);if(e.length>1){if(!e.every(t=>t.dir===e[0].dir))return`${r} Legged Strategy`;if(e.every(t=>t.type===e[0].type)){if("Bull"==e[0].dir||"Bear"==e[0].dir)return`${e[0].dir}ish ${e[0].type}s`;if("Neu"==e[0].dir)return`Long Volatility ${e[0].type}s`;if("Pin"==e[0].dir)return`Short Volatility ${e[0].type}s`}else{if("Bull"==e[0].dir||"Bear"==e[0].dir)return`${e[0].dir}ish ${r} Legged Strategy`;if("Neu"==e[0].dir)return`Long Volatility ${r} Legged Strategy`;if("Pin"==e[0].dir)return`Short Volatility ${r} Legged Strategy`}}else if(1==e.length){if("Bull"==e[0].dir||"Bear"==e[0].dir)return`${e[0].dir}ish ${e[0].type}`;if("Neu"==e[0].dir)return`Long Volatility ${e[0].type}`;if("Pin"==e[0].dir)return`Short Volatility ${e[0].type}`}return"Cost of Strategy"}function O(t){let e=0;for(const r of t)e+=r;return e/t.length}function I(t){let e=0;const r=O(t);for(const n of t)e+=Math.pow(n-r,2);return e<=0?0:Math.sqrt(e/t.length)}function N(t,e,r){const n=r*r,i=r*Math.sqrt(2*Math.PI);return Math.exp(-Math.pow(t-e,2)/(2*n))/i}function A(t,e,r){const n=r/Math.sqrt(2);return Math.exp(-Math.abs(t-e)/n)*(1/(2*n))}function R(t,e){const r=[];for(let n=0;n<t.length;n++)for(let i=0;i<e[n];i++)r.push(t[n]);return r}function V(t,e,r,n,i){return t/e>3*A(r,n,i)}function D(t){return t.includes("M")?30:t.includes("Y")?365:1}function F(t,e,r,n,i){let l=0;return n-i!=0&&(l=r+(e-r)*(t-i)/(n-i)),l}function T(t){return t.map(t=>({...t,days:D(t.name)*parseInt(null!=t.name.match(/(\d+)/)[0]?t.name.match(/(\d+)/)[0]:0)}))}function _(t,e){if(0==t.length||null==t||null==t)return 0;if(e<(t=T(t))[0].days)return F(e,0,t[0].val,0,t[0].days);for(let r=0;r<t.length-1;r++)if(t[r].days<e&&e<=t[r+1].days)return F(e,t[r+1].val,t[r].val,t[r+1].days,t[r].days);return 0}function U(t,e,r){fetch(t,{method:"post",headers:{Accept:"application/json","Content-Type":"application/json"},body:e}).then(t=>t.json()).then(t=>r(t))}function Y(t,e,r,n){fetch(t,{method:"post",headers:{Authorization:e,Accept:"application/json","Content-Type":"application/json"},body:r}).then(t=>t.json()).then(t=>n(t))}function z(t,e){fetch(t,{method:"post",body:e})}function E(t){const e=Object.create(null);for(const[r,n]of t)e[r]=n;return e}function G(t){const e=Object.entries(t);for(const t of e)t[1]=Object.entries(t[1]);return e}function H(t){const e=atob(t.split(",")[1]),r=t.split(",")[0].split(":")[1].split(";")[0],n=new ArrayBuffer(e.length),i=new Uint8Array(n);for(let t=0;t<e.length;t++)i[t]=e.charCodeAt(t);return new Blob([n],{type:r})}r.r(a),r.d(a,"mapToObject",(function(){return E})),r.d(a,"objectToMap",(function(){return G})),r.d(a,"dataURItoBlob",(function(){return H}));var J={color:n},K={options:i,stats:l,treasury:u},Q={post:o,structures:a}}]));