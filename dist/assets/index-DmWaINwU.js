var ue=Object.defineProperty;var ge=(i,e,a)=>e in i?ue(i,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):i[e]=a;var f=(i,e,a)=>ge(i,typeof e!="symbol"?e+"":e,a);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))t(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&t(o)}).observe(document,{childList:!0,subtree:!0});function a(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function t(s){if(s.ep)return;s.ep=!0;const n=a(s);fetch(s.href,n)}})();const he="modulepreload",ve=function(i){return"/"+i},J={},v=function(e,a,t){let s=Promise.resolve();if(a&&a.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),r=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));s=Promise.allSettled(a.map(l=>{if(l=ve(l),l in J)return;J[l]=!0;const d=l.endsWith(".css"),p=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${p}`))return;const c=document.createElement("link");if(c.rel=d?"stylesheet":he,d||(c.as="script"),c.crossOrigin="",c.href=l,r&&c.setAttribute("nonce",r),document.head.appendChild(c),d)return new Promise((u,g)=>{c.addEventListener("load",u),c.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${l}`)))})}))}function n(o){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=o,window.dispatchEvent(r),!r.defaultPrevented)throw o}return s.then(o=>{for(const r of o||[])r.status==="rejected"&&n(r.reason);return e().catch(n)})},z={ui:{currentSection:"hero",theme:"auto",language:"es",loading:!1,error:null},progress:{sections:{},activities:{},completionRate:0,lastUpdated:null},components:{dragDrop:{},branchSimulator:{},collaborationSim:{},terminal:{},comparisons:{}},preferences:{autoSave:!0,animations:!0,soundEffects:!1,keyboardShortcuts:!0,highContrast:!1},analytics:{sessionStart:null,pageViews:{},interactions:[],timeSpent:{}}},h={SET_CURRENT_SECTION:"SET_CURRENT_SECTION",SET_THEME:"SET_THEME",SET_LANGUAGE:"SET_LANGUAGE",SET_LOADING:"SET_LOADING",SET_ERROR:"SET_ERROR",UPDATE_PROGRESS:"UPDATE_PROGRESS",COMPLETE_ACTIVITY:"COMPLETE_ACTIVITY",UPDATE_COMPONENT_STATE:"UPDATE_COMPONENT_STATE",UPDATE_PREFERENCES:"UPDATE_PREFERENCES",TRACK_INTERACTION:"TRACK_INTERACTION",TRACK_TIME_SPENT:"TRACK_TIME_SPENT"},fe={[h.SET_CURRENT_SECTION]:(i,e)=>({...i,ui:{...i.ui,currentSection:e.payload.section}}),[h.SET_THEME]:(i,e)=>({...i,ui:{...i.ui,theme:e.payload.theme}}),[h.SET_LANGUAGE]:(i,e)=>({...i,ui:{...i.ui,language:e.payload.language}}),[h.SET_LOADING]:(i,e)=>({...i,ui:{...i.ui,loading:e.payload.loading}}),[h.SET_ERROR]:(i,e)=>({...i,ui:{...i.ui,error:e.payload.error}}),[h.UPDATE_PROGRESS]:(i,e)=>{const{section:a,activity:t,completed:s}=e.payload,n={...i.progress,sections:{...i.progress.sections,[a]:{...i.progress.sections[a],[t]:s}},lastUpdated:Date.now()};return n.completionRate=be(n),{...i,progress:n}},[h.COMPLETE_ACTIVITY]:(i,e)=>{const{activityId:a,data:t}=e.payload;return{...i,progress:{...i.progress,activities:{...i.progress.activities,[a]:{completed:!0,completedAt:Date.now(),data:t}}}}},[h.UPDATE_COMPONENT_STATE]:(i,e)=>{const{componentId:a,state:t}=e.payload;return{...i,components:{...i.components,[a]:{...i.components[a],...t}}}},[h.UPDATE_PREFERENCES]:(i,e)=>({...i,preferences:{...i.preferences,...e.payload}}),[h.TRACK_INTERACTION]:(i,e)=>({...i,analytics:{...i.analytics,interactions:[...i.analytics.interactions,e.payload]}}),[h.TRACK_TIME_SPENT]:(i,e)=>{const{section:a,timeSpent:t}=e.payload;return{...i,analytics:{...i.analytics,timeSpent:{...i.analytics.timeSpent,[a]:(i.analytics.timeSpent[a]||0)+t}}}}};function be(i){const e=Object.values(i.sections).reduce((t,s)=>t+Object.keys(s).length,0),a=Object.values(i.sections).reduce((t,s)=>t+Object.values(s).filter(Boolean).length,0);return e>0?Math.round(a/e*100):0}class ye{constructor(){this.state={...z},this.listeners=new Map,this.middleware=[],this.isHydrated=!1}async init(){await this.loadPersistedState(),this.setupAutoSave(),this.state.analytics.sessionStart=Date.now(),console.log("🏪 State Manager initialized")}dispatch(e,a={}){const t={type:e,payload:a};for(const n of this.middleware)n(t,this.state);const s=fe[e];if(s){const n=s(this.state,t);this.setState(n)}else console.warn(`No reducer found for action type: ${e}`);this.notifyListeners(e,a)}subscribe(e,a){return this.listeners.has(e)||this.listeners.set(e,[]),this.listeners.get(e).push(a),()=>{const t=this.listeners.get(e);if(t){const s=t.indexOf(a);s>-1&&t.splice(s,1)}}}getState(){return{...this.state}}getStateSlice(e){return e.split(".").reduce((a,t)=>a&&a[t],this.state)}setState(e){this.state=e,this.state.preferences.autoSave&&this.saveState()}use(e){this.middleware.push(e)}notifyListeners(e,a){const t=this.listeners.get(e);t&&t.forEach(s=>{try{s(a)}catch(n){console.error("Error in state listener:",n)}})}async loadPersistedState(){var e,a;try{const t=localStorage.getItem("gitPedagogy:state");if(t){const s=JSON.parse(t);this.state={...z,...s,ui:{...z.ui,theme:((e=s.ui)==null?void 0:e.theme)||"auto",language:((a=s.ui)==null?void 0:a.language)||"es"}},this.isHydrated=!0,console.log("💾 State hydrated from localStorage")}}catch(t){console.warn("Failed to load persisted state:",t)}}saveState(){try{const e={...this.state,ui:{theme:this.state.ui.theme,language:this.state.ui.language}};localStorage.setItem("gitPedagogy:state",JSON.stringify(e))}catch(e){console.warn("Failed to save state:",e)}}setupAutoSave(){setInterval(()=>{this.state.preferences.autoSave&&this.saveState()},3e4),window.addEventListener("beforeunload",()=>{this.saveState()})}reset(){this.state={...z},localStorage.removeItem("gitPedagogy:state"),this.notifyListeners("STATE_RESET",{})}exportState(){return JSON.stringify(this.state,null,2)}importState(e){try{const a=JSON.parse(e);this.setState(a),console.log("State imported successfully")}catch(a){console.error("Failed to import state:",a)}}}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const G=globalThis,V=G.ShadowRoot&&(G.ShadyCSS===void 0||G.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,K=Symbol(),Q=new WeakMap;let re=class{constructor(e,a,t){if(this._$cssResult$=!0,t!==K)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=a}get styleSheet(){let e=this.o;const a=this.t;if(V&&e===void 0){const t=a!==void 0&&a.length===1;t&&(e=Q.get(a)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&Q.set(a,e))}return e}toString(){return this.cssText}};const we=i=>new re(typeof i=="string"?i:i+"",void 0,K),Ee=(i,...e)=>{const a=i.length===1?i[0]:e.reduce((t,s,n)=>t+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+i[n+1],i[0]);return new re(a,i,K)},Ce=(i,e)=>{if(V)i.adoptedStyleSheets=e.map(a=>a instanceof CSSStyleSheet?a:a.styleSheet);else for(const a of e){const t=document.createElement("style"),s=G.litNonce;s!==void 0&&t.setAttribute("nonce",s),t.textContent=a.cssText,i.appendChild(t)}},Y=V?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let a="";for(const t of e.cssRules)a+=t.cssText;return we(a)})(i):i;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Se,defineProperty:xe,getOwnPropertyDescriptor:Ae,getOwnPropertyNames:Pe,getOwnPropertySymbols:Te,getPrototypeOf:ke}=Object,y=globalThis,X=y.trustedTypes,Ie=X?X.emptyScript:"",O=y.reactiveElementPolyfillSupport,k=(i,e)=>i,F={toAttribute(i,e){switch(e){case Boolean:i=i?Ie:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let a=i;switch(e){case Boolean:a=i!==null;break;case Number:a=i===null?null:Number(i);break;case Object:case Array:try{a=JSON.parse(i)}catch{a=null}}return a}},le=(i,e)=>!Se(i,e),Z={attribute:!0,type:String,converter:F,reflect:!1,useDefault:!1,hasChanged:le};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),y.litPropertyMetadata??(y.litPropertyMetadata=new WeakMap);let x=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,a=Z){if(a.state&&(a.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((a=Object.create(a)).wrapped=!0),this.elementProperties.set(e,a),!a.noAccessor){const t=Symbol(),s=this.getPropertyDescriptor(e,t,a);s!==void 0&&xe(this.prototype,e,s)}}static getPropertyDescriptor(e,a,t){const{get:s,set:n}=Ae(this.prototype,e)??{get(){return this[a]},set(o){this[a]=o}};return{get:s,set(o){const r=s==null?void 0:s.call(this);n==null||n.call(this,o),this.requestUpdate(e,r,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Z}static _$Ei(){if(this.hasOwnProperty(k("elementProperties")))return;const e=ke(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(k("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(k("properties"))){const a=this.properties,t=[...Pe(a),...Te(a)];for(const s of t)this.createProperty(s,a[s])}const e=this[Symbol.metadata];if(e!==null){const a=litPropertyMetadata.get(e);if(a!==void 0)for(const[t,s]of a)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[a,t]of this.elementProperties){const s=this._$Eu(a,t);s!==void 0&&this._$Eh.set(s,a)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const a=[];if(Array.isArray(e)){const t=new Set(e.flat(1/0).reverse());for(const s of t)a.unshift(Y(s))}else e!==void 0&&a.push(Y(e));return a}static _$Eu(e,a){const t=a.attribute;return t===!1?void 0:typeof t=="string"?t:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(a=>this.enableUpdating=a),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(a=>a(this))}addController(e){var a;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((a=e.hostConnected)==null||a.call(e))}removeController(e){var a;(a=this._$EO)==null||a.delete(e)}_$E_(){const e=new Map,a=this.constructor.elementProperties;for(const t of a.keys())this.hasOwnProperty(t)&&(e.set(t,this[t]),delete this[t]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ce(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(a=>{var t;return(t=a.hostConnected)==null?void 0:t.call(a)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(a=>{var t;return(t=a.hostDisconnected)==null?void 0:t.call(a)})}attributeChangedCallback(e,a,t){this._$AK(e,t)}_$ET(e,a){var n;const t=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,t);if(s!==void 0&&t.reflect===!0){const o=(((n=t.converter)==null?void 0:n.toAttribute)!==void 0?t.converter:F).toAttribute(a,t.type);this._$Em=e,o==null?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(e,a){var n,o;const t=this.constructor,s=t._$Eh.get(e);if(s!==void 0&&this._$Em!==s){const r=t.getPropertyOptions(s),l=typeof r.converter=="function"?{fromAttribute:r.converter}:((n=r.converter)==null?void 0:n.fromAttribute)!==void 0?r.converter:F;this._$Em=s;const d=l.fromAttribute(a,r.type);this[s]=d??((o=this._$Ej)==null?void 0:o.get(s))??d,this._$Em=null}}requestUpdate(e,a,t){var s;if(e!==void 0){const n=this.constructor,o=this[e];if(t??(t=n.getPropertyOptions(e)),!((t.hasChanged??le)(o,a)||t.useDefault&&t.reflect&&o===((s=this._$Ej)==null?void 0:s.get(e))&&!this.hasAttribute(n._$Eu(e,t))))return;this.C(e,a,t)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,a,{useDefault:t,reflect:s,wrapped:n},o){t&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,o??a??this[e]),n!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||t||(a=void 0),this._$AL.set(e,a)),s===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(a){Promise.reject(a)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[n,o]of s){const{wrapped:r}=o,l=this[n];r!==!0||this._$AL.has(n)||l===void 0||this.C(n,void 0,o,l)}}let e=!1;const a=this._$AL;try{e=this.shouldUpdate(a),e?(this.willUpdate(a),(t=this._$EO)==null||t.forEach(s=>{var n;return(n=s.hostUpdate)==null?void 0:n.call(s)}),this.update(a)):this._$EM()}catch(s){throw e=!1,this._$EM(),s}e&&this._$AE(a)}willUpdate(e){}_$AE(e){var a;(a=this._$EO)==null||a.forEach(t=>{var s;return(s=t.hostUpdated)==null?void 0:s.call(t)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(a=>this._$ET(a,this[a]))),this._$EM()}updated(e){}firstUpdated(e){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[k("elementProperties")]=new Map,x[k("finalized")]=new Map,O==null||O({ReactiveElement:x}),(y.reactiveElementVersions??(y.reactiveElementVersions=[])).push("2.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const I=globalThis,M=I.trustedTypes,ee=M?M.createPolicy("lit-html",{createHTML:i=>i}):void 0,ce="$lit$",b=`lit$${Math.random().toFixed(9).slice(2)}$`,de="?"+b,_e=`<${de}>`,S=document,$=()=>S.createComment(""),L=i=>i===null||typeof i!="object"&&typeof i!="function",W=Array.isArray,$e=i=>W(i)||typeof(i==null?void 0:i[Symbol.iterator])=="function",q=`[ 	
\f\r]`,T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ae=/-->/g,te=/>/g,w=RegExp(`>|${q}(?:([^\\s"'>=/]+)(${q}*=${q}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),se=/'/g,ie=/"/g,pe=/^(?:script|style|textarea|title)$/i,Le=i=>(e,...a)=>({_$litType$:i,strings:e,values:a}),Re=Le(1),A=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),ne=new WeakMap,E=S.createTreeWalker(S,129);function me(i,e){if(!W(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return ee!==void 0?ee.createHTML(e):e}const De=(i,e)=>{const a=i.length-1,t=[];let s,n=e===2?"<svg>":e===3?"<math>":"",o=T;for(let r=0;r<a;r++){const l=i[r];let d,p,c=-1,u=0;for(;u<l.length&&(o.lastIndex=u,p=o.exec(l),p!==null);)u=o.lastIndex,o===T?p[1]==="!--"?o=ae:p[1]!==void 0?o=te:p[2]!==void 0?(pe.test(p[2])&&(s=RegExp("</"+p[2],"g")),o=w):p[3]!==void 0&&(o=w):o===w?p[0]===">"?(o=s??T,c=-1):p[1]===void 0?c=-2:(c=o.lastIndex-p[2].length,d=p[1],o=p[3]===void 0?w:p[3]==='"'?ie:se):o===ie||o===se?o=w:o===ae||o===te?o=T:(o=w,s=void 0);const g=o===w&&i[r+1].startsWith("/>")?" ":"";n+=o===T?l+_e:c>=0?(t.push(d),l.slice(0,c)+ce+l.slice(c)+b+g):l+b+(c===-2?r:g)}return[me(i,n+(i[a]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),t]};class R{constructor({strings:e,_$litType$:a},t){let s;this.parts=[];let n=0,o=0;const r=e.length-1,l=this.parts,[d,p]=De(e,a);if(this.el=R.createElement(d,t),E.currentNode=this.el.content,a===2||a===3){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(s=E.nextNode())!==null&&l.length<r;){if(s.nodeType===1){if(s.hasAttributes())for(const c of s.getAttributeNames())if(c.endsWith(ce)){const u=p[o++],g=s.getAttribute(c).split(b),j=/([.?@])?(.*)/.exec(u);l.push({type:1,index:n,name:j[2],strings:g,ctor:j[1]==="."?ze:j[1]==="?"?Ge:j[1]==="@"?Me:H}),s.removeAttribute(c)}else c.startsWith(b)&&(l.push({type:6,index:n}),s.removeAttribute(c));if(pe.test(s.tagName)){const c=s.textContent.split(b),u=c.length-1;if(u>0){s.textContent=M?M.emptyScript:"";for(let g=0;g<u;g++)s.append(c[g],$()),E.nextNode(),l.push({type:2,index:++n});s.append(c[u],$())}}}else if(s.nodeType===8)if(s.data===de)l.push({type:2,index:n});else{let c=-1;for(;(c=s.data.indexOf(b,c+1))!==-1;)l.push({type:7,index:n}),c+=b.length-1}n++}}static createElement(e,a){const t=S.createElement("template");return t.innerHTML=e,t}}function P(i,e,a=i,t){var o,r;if(e===A)return e;let s=t!==void 0?(o=a._$Co)==null?void 0:o[t]:a._$Cl;const n=L(e)?void 0:e._$litDirective$;return(s==null?void 0:s.constructor)!==n&&((r=s==null?void 0:s._$AO)==null||r.call(s,!1),n===void 0?s=void 0:(s=new n(i),s._$AT(i,a,t)),t!==void 0?(a._$Co??(a._$Co=[]))[t]=s:a._$Cl=s),s!==void 0&&(e=P(i,s._$AS(i,e.values),s,t)),e}class je{constructor(e,a){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=a}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:a},parts:t}=this._$AD,s=((e==null?void 0:e.creationScope)??S).importNode(a,!0);E.currentNode=s;let n=E.nextNode(),o=0,r=0,l=t[0];for(;l!==void 0;){if(o===l.index){let d;l.type===2?d=new D(n,n.nextSibling,this,e):l.type===1?d=new l.ctor(n,l.name,l.strings,this,e):l.type===6&&(d=new He(n,this,e)),this._$AV.push(d),l=t[++r]}o!==(l==null?void 0:l.index)&&(n=E.nextNode(),o++)}return E.currentNode=S,s}p(e){let a=0;for(const t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(e,t,a),a+=t.strings.length-2):t._$AI(e[a])),a++}}class D{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,a,t,s){this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=e,this._$AB=a,this._$AM=t,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const a=this._$AM;return a!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=a.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,a=this){e=P(this,e,a),L(e)?e===m||e==null||e===""?(this._$AH!==m&&this._$AR(),this._$AH=m):e!==this._$AH&&e!==A&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):$e(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==m&&L(this._$AH)?this._$AA.nextSibling.data=e:this.T(S.createTextNode(e)),this._$AH=e}$(e){var n;const{values:a,_$litType$:t}=e,s=typeof t=="number"?this._$AC(e):(t.el===void 0&&(t.el=R.createElement(me(t.h,t.h[0]),this.options)),t);if(((n=this._$AH)==null?void 0:n._$AD)===s)this._$AH.p(a);else{const o=new je(s,this),r=o.u(this.options);o.p(a),this.T(r),this._$AH=o}}_$AC(e){let a=ne.get(e.strings);return a===void 0&&ne.set(e.strings,a=new R(e)),a}k(e){W(this._$AH)||(this._$AH=[],this._$AR());const a=this._$AH;let t,s=0;for(const n of e)s===a.length?a.push(t=new D(this.O($()),this.O($()),this,this.options)):t=a[s],t._$AI(n),s++;s<a.length&&(this._$AR(t&&t._$AB.nextSibling,s),a.length=s)}_$AR(e=this._$AA.nextSibling,a){var t;for((t=this._$AP)==null?void 0:t.call(this,!1,!0,a);e!==this._$AB;){const s=e.nextSibling;e.remove(),e=s}}setConnected(e){var a;this._$AM===void 0&&(this._$Cv=e,(a=this._$AP)==null||a.call(this,e))}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,a,t,s,n){this.type=1,this._$AH=m,this._$AN=void 0,this.element=e,this.name=a,this._$AM=s,this.options=n,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=m}_$AI(e,a=this,t,s){const n=this.strings;let o=!1;if(n===void 0)e=P(this,e,a,0),o=!L(e)||e!==this._$AH&&e!==A,o&&(this._$AH=e);else{const r=e;let l,d;for(e=n[0],l=0;l<n.length-1;l++)d=P(this,r[t+l],a,l),d===A&&(d=this._$AH[l]),o||(o=!L(d)||d!==this._$AH[l]),d===m?e=m:e!==m&&(e+=(d??"")+n[l+1]),this._$AH[l]=d}o&&!s&&this.j(e)}j(e){e===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ze extends H{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===m?void 0:e}}class Ge extends H{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==m)}}class Me extends H{constructor(e,a,t,s,n){super(e,a,t,s,n),this.type=5}_$AI(e,a=this){if((e=P(this,e,a,0)??m)===A)return;const t=this._$AH,s=e===m&&t!==m||e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive,n=e!==m&&(t===m||s);s&&this.element.removeEventListener(this.name,this,t),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var a;typeof this._$AH=="function"?this._$AH.call(((a=this.options)==null?void 0:a.host)??this.element,e):this._$AH.handleEvent(e)}}class He{constructor(e,a,t){this.element=e,this.type=6,this._$AN=void 0,this._$AM=a,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(e){P(this,e)}}const U=I.litHtmlPolyfillSupport;U==null||U(R,D),(I.litHtmlVersions??(I.litHtmlVersions=[])).push("3.3.1");const Oe=(i,e,a)=>{const t=(a==null?void 0:a.renderBefore)??e;let s=t._$litPart$;if(s===void 0){const n=(a==null?void 0:a.renderBefore)??null;t._$litPart$=s=new D(e.insertBefore($(),n),n,void 0,a??{})}return s._$AI(i),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const C=globalThis;class _ extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var a;const e=super.createRenderRoot();return(a=this.renderOptions).renderBefore??(a.renderBefore=e.firstChild),e}update(e){const a=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Oe(a,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return A}}var oe;_._$litElement$=!0,_.finalized=!0,(oe=C.litElementHydrateSupport)==null||oe.call(C,{LitElement:_});const B=C.litElementPolyfillSupport;B==null||B({LitElement:_});(C.litElementVersions??(C.litElementVersions=[])).push("4.2.1");class N extends _{constructor(){super(),this.lang="es",this.theme="light",this.progress={}}emit(e,a={}){this.dispatchEvent(new CustomEvent(e,{detail:a,bubbles:!0,composed:!0}))}t(e,a=""){return a||e}track(e,a={}){this.emit("track-interaction",{component:this.tagName.toLowerCase(),action:e,data:a})}updateProgress(e,a=!0){this.emit("progress-update",{component:this.tagName.toLowerCase(),activity:e,completed:a})}}f(N,"properties",{lang:{type:String},theme:{type:String},progress:{type:Object}}),f(N,"styles",Ee`
        :host {
            --primary: #2563eb;
            --secondary: #059669;
            --accent: #d97706;
            --success: #22c55e;
            --warning: #f59e0b;
            --danger: #ef4444;
            --neutral: #64748b;
            --bg: #f1f5f9;
            --text: #0f172a;
            --card-bg: #ffffff;
            --border-color: #e2e8f0;
            
            display: block;
            font-family: 'Poppins', system-ui, sans-serif;
        }

        :host([theme="dark"]) {
            --primary: #3b82f6;
            --secondary: #10b981;
            --accent: #f59e0b;
            --neutral: #94a3b8;
            --bg: #020617;
            --text: #e2e8f0;
            --card-bg: #0f172a;
            --border-color: #1e293b;
        }

        .component-container {
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: 0.5rem;
            padding: 1rem;
            color: var(--text);
        }

        .btn {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 1rem;
            border-radius: 0.375rem;
            font-weight: 600;
            font-size: 0.875rem;
            transition: all 0.2s ease;
            cursor: pointer;
            border: none;
            text-decoration: none;
        }

        .btn-primary {
            background-color: var(--primary);
            color: white;
        }

        .btn-primary:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
        }

        .btn-secondary {
            background-color: transparent;
            color: var(--primary);
            border: 1px solid var(--primary);
        }

        .btn-secondary:hover {
            background-color: var(--primary);
            color: white;
        }

        .loading {
            opacity: 0.6;
            pointer-events: none;
        }

        .success {
            color: var(--success);
        }

        .error {
            color: var(--danger);
        }

        @media (prefers-reduced-motion: reduce) {
            * {
                animation-duration: 0.01ms !important;
                transition-duration: 0.01ms !important;
            }
        }
    `);class qe{constructor(){f(this,"dev",{list:()=>{console.table(this.getUsageStats())},reload:async(e,a)=>{this.unregister(e),await this.lazyLoad(e,a),document.querySelectorAll(e).forEach(t=>{t.requestUpdate&&t.requestUpdate()})},validate:()=>{const e=this.validateComponents();return e.length===0?console.log("✅ All components are valid"):console.warn("⚠️ Component validation issues:",e),e}});this.components=new Map,this.initialized=!1}register(e,a){if(customElements.get(e)){console.warn(`Component ${e} is already registered`);return}try{customElements.define(e,a),this.components.set(e,a),console.log(`✅ Registered component: ${e}`)}catch(t){console.error(`❌ Failed to register component ${e}:`,t)}}get(e){return this.components.get(e)}has(e){return this.components.has(e)}getAll(){return Array.from(this.components.keys())}createElement(e,a={}){if(!this.has(e))throw new Error(`Component ${e} is not registered`);const t=document.createElement(e);return Object.entries(a).forEach(([s,n])=>{typeof n=="boolean"?n&&t.setAttribute(s,""):t.setAttribute(s,String(n))}),t}async initialize(){this.initialized||(console.log("🔧 Initializing Component Registry..."),this.registerBaseComponents(),this.initialized=!0,console.log("✅ Component Registry initialized"))}registerBaseComponents(){["git-drag-drop","git-terminal","git-branch-visualizer","git-comparison-tool","git-three-states","git-hash-generator","git-timeline","git-collaboration-sim","git-cicd-pipeline","git-platform-comparison","git-udl-checklist"].forEach(a=>{customElements.get(a)||this.register(a,class extends N{render(){return Re`
                            <div class="component-container">
                                <p>Loading ${a}...</p>
                            </div>
                        `}})})}async lazyLoad(e,a){try{if(this.has(e))return this.get(e);console.log(`📦 Lazy loading ${e}...`);const t=await a();if(t.default)return this.register(e,t.default),t.default;throw new Error(`Module for ${e} does not export default`)}catch(t){throw console.error(`Failed to lazy load ${e}:`,t),t}}batchRegister(e){const a=[];return e.forEach(({tagName:t,componentClass:s})=>{try{this.register(t,s),a.push({tagName:t,success:!0})}catch(n){a.push({tagName:t,success:!1,error:n})}}),a}unregister(e){this.components.has(e)&&(this.components.delete(e),console.log(`🗑️ Unregistered component: ${e}`))}getUsageStats(){const e={};return this.components.forEach((a,t)=>{const s=document.querySelectorAll(t);e[t]={registered:!0,instances:s.length,class:a.name}}),e}validateComponents(){const e=[];return this.components.forEach((a,t)=>{try{const s=new a;["render"].forEach(o=>{typeof s[o]!="function"&&e.push({component:t,issue:`Missing required method: ${o}`})})}catch(s){e.push({component:t,issue:`Cannot instantiate: ${s.message}`})}}),e}}class Ue{constructor(){f(this,"dev",{testThemes:()=>{const e=["light","dark","auto"];let a=0;const t=()=>{this.setTheme(e[a]),console.log(`Applied theme: ${e[a]}`),a=(a+1)%e.length,a!==0&&setTimeout(t,2e3)};t()},info:()=>{console.log("Theme Manager Info:",{current:this.currentTheme,resolved:this.getResolvedTheme(),system:this.getSystemPreference(),colors:this.getThemeColors()})}});this.currentTheme="auto",this.systemPrefersDark=!1,this.mediaQuery=null}init(){this.mediaQuery=window.matchMedia("(prefers-color-scheme: dark)"),this.systemPrefersDark=this.mediaQuery.matches,this.mediaQuery.addEventListener("change",a=>{this.systemPrefersDark=a.matches,this.currentTheme==="auto"&&this.applyTheme("auto")});const e=localStorage.getItem("theme")||"auto";this.setTheme(e),console.log("🎨 Theme Manager initialized")}setTheme(e){["auto","light","dark"].includes(e)||(console.warn(`Invalid theme: ${e}. Using 'auto' instead.`),e="auto"),this.currentTheme=e,this.applyTheme(e),this.updateThemeButtons(),this.saveTheme(),document.dispatchEvent(new CustomEvent("theme-changed",{detail:{theme:e,resolvedTheme:this.getResolvedTheme()}}))}applyTheme(e){let a;e==="auto"?a=this.systemPrefersDark?"dark":"light":a=e,document.body.classList.remove("theme-light","theme-dark"),document.body.classList.add(`theme-${a}`),this.updateMetaThemeColor(a),this.updateCustomProperties(a)}updateThemeButtons(){const e={auto:document.getElementById("theme-auto"),light:document.getElementById("theme-light"),dark:document.getElementById("theme-dark")};Object.values(e).forEach(t=>{t&&(t.style.backgroundColor="transparent",t.querySelector("i").style.color="var(--neutral)",t.setAttribute("aria-pressed","false"))});const a=e[this.currentTheme];a&&(a.style.backgroundColor="var(--primary)",a.querySelector("i").style.color="var(--bg)",a.setAttribute("aria-pressed","true"))}updateMetaThemeColor(e){const a=document.querySelector('meta[name="theme-color"]');if(a){const t=e==="dark"?"#020617":"#2563eb";a.setAttribute("content",t)}}updateCustomProperties(e){const a=document.documentElement;e==="dark"?(a.style.setProperty("--resolved-bg","#020617"),a.style.setProperty("--resolved-text","#e2e8f0"),a.style.setProperty("--resolved-card-bg","#0f172a"),a.style.setProperty("--resolved-border","#1e293b")):(a.style.setProperty("--resolved-bg","#f1f5f9"),a.style.setProperty("--resolved-text","#0f172a"),a.style.setProperty("--resolved-card-bg","#ffffff"),a.style.setProperty("--resolved-border","#e2e8f0"))}getCurrentTheme(){return this.currentTheme}getResolvedTheme(){return this.currentTheme==="auto"?this.systemPrefersDark?"dark":"light":this.currentTheme}toggleTheme(){const e=["light","dark","auto"],t=(e.indexOf(this.currentTheme)+1)%e.length;this.setTheme(e[t])}getSystemPreference(){return this.systemPrefersDark?"dark":"light"}saveTheme(){try{localStorage.setItem("theme",this.currentTheme)}catch(e){console.warn("Failed to save theme preference:",e)}}getThemeColors(){const e=this.getResolvedTheme()==="dark";return{primary:e?"#3b82f6":"#2563eb",secondary:e?"#10b981":"#059669",accent:e?"#f59e0b":"#d97706",neutral:e?"#94a3b8":"#64748b",bg:e?"#020617":"#f1f5f9",text:e?"#e2e8f0":"#0f172a",cardBg:e?"#0f172a":"#ffffff",border:e?"#1e293b":"#e2e8f0"}}createThemeCSS(e,a){return this.getResolvedTheme()==="dark"?a:e}onThemeChange(e){document.addEventListener("theme-changed",a=>{e(a.detail)})}preloadThemeAssets(){this.getResolvedTheme()==="dark"?this.preloadImage("/assets/icons/dark-mode-hero.svg"):this.preloadImage("/assets/icons/light-mode-hero.svg")}preloadImage(e){const a=document.createElement("link");a.rel="preload",a.as="image",a.href=e,document.head.appendChild(a)}getAnalyticsData(){return{currentTheme:this.currentTheme,resolvedTheme:this.getResolvedTheme(),systemPreference:this.getSystemPreference(),supportsColorSchemeQuery:this.mediaQuery!==null}}}class Be{constructor(){f(this,"dev",{listKeys:(e=this.currentLanguage)=>{const a=this.translations.get(e);if(a){const t=this.flattenObject(a);console.table(t)}},checkMissing:()=>{const e=this.flattenObject(this.translations.get("es")||{}),a=this.flattenObject(this.translations.get("en")||{}),t=new Set(Object.keys(e)),s=new Set(Object.keys(a)),n=[...t].filter(r=>!s.has(r)),o=[...s].filter(r=>!t.has(r));n.length>0&&console.warn("Missing English translations:",n),o.length>0&&console.warn("Missing Spanish translations:",o),n.length===0&&o.length===0&&console.log("✅ All translations are complete")},testSwitching:()=>{const e=this.supportedLanguages;let a=0;const t=()=>{this.setLanguage(e[a]),console.log(`Switched to: ${e[a]}`),a=(a+1)%e.length,a!==0&&setTimeout(t,3e3)};t()}});this.currentLanguage="es",this.supportedLanguages=["es","en"],this.translations=new Map,this.fallbackLanguage="es"}init(){const e=localStorage.getItem("language")||this.detectBrowserLanguage();this.setLanguage(e),this.loadTranslations(),console.log("🌐 Language Manager initialized")}setLanguage(e){this.supportedLanguages.includes(e)||(console.warn(`Unsupported language: ${e}. Using fallback: ${this.fallbackLanguage}`),e=this.fallbackLanguage),this.currentLanguage=e,this.applyLanguage(),this.updateLanguageToggle(),this.saveLanguage(),document.dispatchEvent(new CustomEvent("language-changed",{detail:{language:e,previousLanguage:this.currentLanguage}}))}applyLanguage(){document.documentElement.lang=this.currentLanguage,document.querySelectorAll("[data-lang-es], [data-lang-en]").forEach(a=>{const t=a.getAttribute(`data-lang-${this.currentLanguage}`);t&&(a.innerHTML=t)}),document.querySelectorAll("[data-placeholder-es], [data-placeholder-en]").forEach(a=>{const t=a.getAttribute(`data-placeholder-${this.currentLanguage}`);t&&(a.placeholder=t)}),document.querySelectorAll("[data-aria-label-es], [data-aria-label-en]").forEach(a=>{const t=a.getAttribute(`data-aria-label-${this.currentLanguage}`);t&&a.setAttribute("aria-label",t)});const e=document.querySelector(`meta[name="title-${this.currentLanguage}"]`);e&&(document.title=e.getAttribute("content"))}updateLanguageToggle(){const e=document.getElementById("language-toggle");e&&(e.checked=this.currentLanguage==="en")}detectBrowserLanguage(){const a=(navigator.language||navigator.userLanguage).split("-")[0];return this.supportedLanguages.includes(a)?a:this.fallbackLanguage}getCurrentLanguage(){return this.currentLanguage}toggleLanguage(){const e=this.currentLanguage==="es"?"en":"es";this.setLanguage(e)}translate(e,a={},t=this.currentLanguage){const s=this.translations.get(t);if(!s)return console.warn(`No translations loaded for language: ${t}`),e;let n=this.getNestedValue(s,e);if(!n&&t!==this.fallbackLanguage){const o=this.translations.get(this.fallbackLanguage);o&&(n=this.getNestedValue(o,e))}return n?this.replaceVariables(n,a):(console.warn(`Missing translation for key: ${e}`),e)}t(e,a={},t=this.currentLanguage){return this.translate(e,a,t)}getNestedValue(e,a){return a.split(".").reduce((t,s)=>t&&t[s]!==void 0?t[s]:null,e)}replaceVariables(e,a){return e.replace(/\{\{(\w+)\}\}/g,(t,s)=>a[s]!==void 0?a[s]:t)}async loadTranslations(){try{const[e,a]=await Promise.all([this.loadTranslationFile("es"),this.loadTranslationFile("en")]);this.translations.set("es",e),this.translations.set("en",a),console.log("📚 Translations loaded")}catch(e){console.warn("Failed to load translations:",e),this.loadFallbackTranslations()}}async loadTranslationFile(e){try{const a=await fetch(`/src/data/translations/${e}.json`);if(!a.ok)throw new Error(`HTTP ${a.status}`);return await a.json()}catch(a){return console.warn(`Failed to load ${e} translations:`,a),{}}}loadFallbackTranslations(){const e={es:{common:{loading:"Cargando...",error:"Error",success:"Éxito",continue:"Continuar",back:"Atrás",next:"Siguiente",finish:"Finalizar"},navigation:{home:"Inicio",progress:"Progreso"}},en:{common:{loading:"Loading...",error:"Error",success:"Success",continue:"Continue",back:"Back",next:"Next",finish:"Finish"},navigation:{home:"Home",progress:"Progress"}}};this.translations.set("es",e.es),this.translations.set("en",e.en)}saveLanguage(){try{localStorage.setItem("language",this.currentLanguage)}catch(e){console.warn("Failed to save language preference:",e)}}formatDate(e,a={}){const t=this.currentLanguage==="es"?"es-ES":"en-US";return new Intl.DateTimeFormat(t,a).format(e)}formatNumber(e,a={}){const t=this.currentLanguage==="es"?"es-ES":"en-US";return new Intl.NumberFormat(t,a).format(e)}getTextDirection(){return"ltr"}onLanguageChange(e){document.addEventListener("language-changed",a=>{e(a.detail)})}getAnalyticsData(){return{currentLanguage:this.currentLanguage,supportedLanguages:this.supportedLanguages,browserLanguage:navigator.language||navigator.userLanguage,detectedLanguage:this.detectBrowserLanguage()}}plural(e,a,t={}){const s=e===1?`${a}.one`:`${a}.other`;return this.translate(s,{...t,count:e})}flattenObject(e,a=""){const t={};return Object.keys(e).forEach(s=>{const n=a?`${a}.${s}`:s;typeof e[s]=="object"&&e[s]!==null?Object.assign(t,this.flattenObject(e[s],n)):t[n]=e[s]}),t}}class Fe{constructor(e){f(this,"dev",{getProgress:()=>this.getProgressSummary(),completeAll:()=>{this.activities.forEach((e,a)=>{this.updateProgress(a,!0)})},completeSection:e=>{Array.from(this.activities.entries()).filter(([t,s])=>s.section===e).forEach(([t,s])=>{this.updateProgress(t,!0)})},showAchievements:()=>{console.table(Array.from(this.milestones.entries()).map(([e,a])=>({id:e,name:a.name,unlocked:this.achievements.has(e),reward:a.reward})))}});this.state=e,this.activities=new Map,this.milestones=new Map,this.achievements=new Set}init(){this.setupActivityDefinitions(),this.setupMilestones(),this.updateProgressBar(),console.log("📊 Progress Tracker initialized")}setupActivityDefinitions(){[{id:"drag-drop-vcs",section:"part1",weight:2,name:"VCS Concept Match"},{id:"drag-drop-commit",section:"part1",weight:2,name:"Commit Concept Match"},{id:"drag-drop-repository",section:"part1",weight:2,name:"Repository Concept Match"},{id:"drag-drop-branch",section:"part1",weight:2,name:"Branch Concept Match"},{id:"cvcs-explored",section:"part1",weight:3,name:"CVCS Architecture Explored"},{id:"dvcs-explored",section:"part1",weight:3,name:"DVCS Architecture Explored"},{id:"delta-model-explored",section:"part1",weight:3,name:"Delta Model Explored"},{id:"snapshot-model-explored",section:"part1",weight:3,name:"Snapshot Model Explored"},{id:"three-states-demo",section:"part1",weight:4,name:"Three States Demo Completed"},{id:"hash-generator-used",section:"part1",weight:2,name:"Hash Generator Used"},{id:"terminal-commands",section:"part2",weight:3,name:"Terminal Commands Practice"},{id:"branch-commit",section:"part2",weight:3,name:"Branch Commit Created"},{id:"branch-create",section:"part2",weight:3,name:"New Branch Created"},{id:"branch-merge",section:"part2",weight:4,name:"Branch Merge Completed"},{id:"merge-conflict-resolved",section:"part2",weight:5,name:"Merge Conflict Resolved"},{id:"collab-commit",section:"part3",weight:2,name:"Collaboration Commit"},{id:"collab-push",section:"part3",weight:3,name:"Push to Fork"},{id:"collab-pr",section:"part3",weight:4,name:"Pull Request Created"},{id:"platform-github",section:"part3",weight:2,name:"GitHub Platform Explored"},{id:"platform-gitlab",section:"part3",weight:2,name:"GitLab Platform Explored"},{id:"platform-bitbucket",section:"part3",weight:2,name:"Bitbucket Platform Explored"},{id:"cicd-demo",section:"part3",weight:3,name:"CI/CD Pipeline Demo"},{id:"udl-representation",section:"part4",weight:2,name:"UDL Representation Explored"},{id:"udl-expression",section:"part4",weight:2,name:"UDL Expression Explored"},{id:"udl-engagement",section:"part4",weight:2,name:"UDL Engagement Explored"},{id:"learning-path-completed",section:"part4",weight:5,name:"Learning Path Completed"}].forEach(a=>{this.activities.set(a.id,a)})}setupMilestones(){[{id:"first-concept",name:"First Steps",description:"Complete your first concept match",condition:a=>this.getCompletedActivitiesCount()>=1,reward:"Git Novice",icon:"ph-star"},{id:"part1-complete",name:"Foundation Master",description:"Complete all Part I activities",condition:a=>this.getSectionProgress("part1")>=100,reward:"Foundation Expert",icon:"ph-graduation-cap"},{id:"branching-expert",name:"Branching Expert",description:"Master all branching concepts",condition:a=>["branch-commit","branch-create","branch-merge"].every(t=>{var s;return a.activities&&((s=a.activities[t])==null?void 0:s.completed)}),reward:"Branch Master",icon:"ph-git-branch"},{id:"collaboration-pro",name:"Collaboration Pro",description:"Complete the collaboration workflow",condition:a=>["collab-commit","collab-push","collab-pr"].every(t=>{var s;return a.activities&&((s=a.activities[t])==null?void 0:s.completed)}),reward:"Team Player",icon:"ph-users"},{id:"platform-explorer",name:"Platform Explorer",description:"Explore all three major platforms",condition:a=>["platform-github","platform-gitlab","platform-bitbucket"].every(t=>{var s;return a.activities&&((s=a.activities[t])==null?void 0:s.completed)}),reward:"Platform Expert",icon:"ph-globe"},{id:"git-master",name:"Git Master",description:"Complete the entire learning journey",condition:a=>this.getOverallProgress()>=100,reward:"Git Guru",icon:"ph-crown"}].forEach(a=>{this.milestones.set(a.id,a)})}updateProgress(e,a=!0,t={}){if(!this.activities.has(e)){console.warn(`Unknown activity: ${e}`);return}const s=this.activities.get(e);this.state.dispatch("COMPLETE_ACTIVITY",{activityId:e,data:{...t,timestamp:Date.now(),section:s.section,weight:s.weight}}),this.state.dispatch("UPDATE_PROGRESS",{section:s.section,activity:e,completed:a}),this.checkAchievements(),this.updateProgressBar(),console.log(`📈 Progress updated: ${s.name}`)}getOverallProgress(){const e=Array.from(this.activities.values()).reduce((t,s)=>t+s.weight,0),a=this.getCompletedActivities().reduce((t,s)=>t+s.weight,0);return e>0?Math.round(a/e*100):0}getSectionProgress(e){const t=Array.from(this.activities.values()).filter(o=>o.section===e).reduce((o,r)=>o+r.weight,0),n=this.getCompletedActivities().filter(o=>o.section===e).reduce((o,r)=>o+r.weight,0);return t>0?Math.round(n/t*100):0}getCompletedActivities(){const e=this.state.getState();return Object.keys(e.progress.activities||{}).filter(t=>{var s;return(s=e.progress.activities[t])==null?void 0:s.completed}).map(t=>this.activities.get(t)).filter(Boolean)}getCompletedActivitiesCount(){return this.getCompletedActivities().length}updateProgressBar(){const e=document.getElementById("progress-bar");if(e){const a=this.getOverallProgress();e.style.transform=`scaleX(${a/100})`,e.setAttribute("aria-valuenow",a)}}checkAchievements(){const e=this.state.getState();this.milestones.forEach((a,t)=>{!this.achievements.has(t)&&a.condition(e.progress)&&this.unlockAchievement(t,a)})}unlockAchievement(e,a){this.achievements.add(e),this.showAchievementNotification(a),this.state.dispatch("TRACK_INTERACTION",{type:"achievement_unlocked",data:{achievementId:e,name:a.name,reward:a.reward}}),console.log(`🏆 Achievement unlocked: ${a.name}`)}showAchievementNotification(e){const a=document.createElement("div");a.className="achievement-notification",a.innerHTML=`
            <div class="achievement-content">
                <i class="${e.icon} achievement-icon"></i>
                <div class="achievement-text">
                    <div class="achievement-title">${e.name}</div>
                    <div class="achievement-reward">${e.reward}</div>
                </div>
                <i class="ph-x close-btn"></i>
            </div>
        `,a.style.cssText=`
            position: fixed;
            top: 80px;
            right: 20px;
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            padding: 1rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `,document.body.appendChild(a),setTimeout(()=>{a.style.transform="translateX(0)"},100),setTimeout(()=>{a.style.transform="translateX(100%)",setTimeout(()=>{a.parentNode&&a.parentNode.removeChild(a)},300)},5e3),a.querySelector(".close-btn").addEventListener("click",()=>{a.style.transform="translateX(100%)",setTimeout(()=>{a.parentNode&&a.parentNode.removeChild(a)},300)})}getProgressSummary(){const e=["part1","part2","part3","part4"],a={part1:"Fundamentos Conceptuales",part2:"Ruta de Aprendizaje",part3:"Ecosistema Extendido",part4:"Pedagogía Inclusiva"};return{overall:this.getOverallProgress(),completed:this.getCompletedActivitiesCount(),total:this.activities.size,achievements:this.achievements.size,sections:e.map(t=>({id:t,title:a[t],progress:this.getSectionProgress(t)}))}}exportProgress(){const e=this.getProgressSummary(),a=this.getCompletedActivities();return{summary:e,activities:a.map(t=>{var s;return{id:t.id,name:t.name,section:t.section,weight:t.weight,completedAt:(s=this.state.getState().progress.activities[t.id])==null?void 0:s.completedAt}}),achievements:Array.from(this.achievements),exportedAt:Date.now()}}resetProgress(){this.achievements.clear(),this.state.dispatch("RESET_PROGRESS"),this.updateProgressBar(),console.log("🔄 Progress reset")}}class Ne{constructor(){f(this,"dev",{getState:()=>({currentSection:this.currentSection,sections:this.sections,progress:this.getSectionProgress(),isNavigating:this.isNavigating}),testNavigation:()=>{let e=0;const a=()=>{this.navigateToSection(this.sections[e]),console.log(`Navigated to: ${this.sections[e]}`),e=(e+1)%this.sections.length,e!==0&&setTimeout(a,2e3)};a()},jumpTo:e=>{e>=0&&e<this.sections.length&&this.navigateToSection(this.sections[e])}});this.currentSection="hero",this.sections=["hero","part1","part2","part3","part4"],this.observer=null,this.scrollTimeout=null,this.isNavigating=!1}init(){this.setupIntersectionObserver(),this.setupScrollBehavior(),this.handleInitialHash(),this.setupNavigationEvents(),console.log("🧭 Navigation Manager initialized")}setupIntersectionObserver(){const e={root:null,rootMargin:"-20% 0px -20% 0px",threshold:.1};this.observer=new IntersectionObserver(a=>{this.isNavigating||a.forEach(t=>{if(t.isIntersecting){const s=t.target.id;s&&this.sections.includes(s)&&this.updateCurrentSection(s)}})},e)}observeSections(){this.sections.forEach(e=>{const a=document.getElementById(e);a&&this.observer.observe(a)})}setupScrollBehavior(){document.addEventListener("click",e=>{const a=e.target.closest('a[href^="#"]');if(a){e.preventDefault();const t=a.getAttribute("href").slice(1);this.navigateToSection(t)}}),window.addEventListener("popstate",e=>{e.state&&e.state.section&&this.navigateToSection(e.state.section,!1)})}handleInitialHash(){const e=window.location.hash.slice(1);e&&this.sections.includes(e)&&setTimeout(()=>{this.navigateToSection(e)},100)}setupNavigationEvents(){document.addEventListener("keydown",e=>{if(!(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"))switch(e.key){case"ArrowUp":case"PageUp":e.preventDefault(),this.navigateToPreviousSection();break;case"ArrowDown":case"PageDown":e.preventDefault(),this.navigateToNextSection();break;case"Home":e.preventDefault(),this.navigateToSection("hero");break;case"End":e.preventDefault(),this.navigateToSection(this.sections[this.sections.length-1]);break}})}navigateToSection(e,a=!0){if(!this.sections.includes(e)){console.warn(`Invalid section: ${e}`);return}const t=document.getElementById(e);if(!t){console.warn(`Section element not found: ${e}`);return}this.isNavigating=!0,a&&this.updateURL(e),this.scrollToSection(t).then(()=>{this.updateCurrentSection(e),this.isNavigating=!1,this.lazyLoadSection(e)})}scrollToSection(e){return new Promise(a=>{const s=e.offsetTop-64,n=window.pageYOffset,o=s-n,r=Math.min(Math.abs(o)*.5,800);let l=null;const d=c=>c<.5?4*c*c*c:(c-1)*(2*c-2)*(2*c-2)+1,p=c=>{l===null&&(l=c);const u=c-l,g=Math.min(u/r,1);window.scrollTo(0,n+o*d(g)),u<r?requestAnimationFrame(p):a()};requestAnimationFrame(p)})}navigateToPreviousSection(){const e=this.sections.indexOf(this.currentSection);e>0&&this.navigateToSection(this.sections[e-1])}navigateToNextSection(){const e=this.sections.indexOf(this.currentSection);e<this.sections.length-1&&this.navigateToSection(this.sections[e+1])}updateCurrentSection(e){if(this.currentSection===e)return;const a=this.currentSection;this.currentSection=e,this.updateActiveSection(e),document.dispatchEvent(new CustomEvent("section-changed",{detail:{section:e,previousSection:a,sectionIndex:this.sections.indexOf(e)}}))}updateActiveSection(e){document.querySelectorAll(".nav-dot").forEach(n=>{const o=n.dataset.section===e;n.classList.toggle("active",o),n.setAttribute("aria-current",o?"true":"false")});const t=(this.sections.indexOf(e)+1)/this.sections.length*100,s=document.getElementById("progress-bar");s&&(s.style.transform=`scaleX(${t/100})`)}updateURL(e){const a=`${window.location.pathname}#${e}`;history.pushState({section:e},"",a)}lazyLoadSection(e){const a=document.getElementById(e);a&&!a.dataset.loaded&&(a.classList.remove("component-loading"),a.classList.add("component-loaded"),a.dataset.loaded="true",document.dispatchEvent(new CustomEvent("section-load",{detail:{section:e}})))}getCurrentSection(){return this.currentSection}getSections(){return[...this.sections]}getSectionProgress(){return(this.sections.indexOf(this.currentSection)+1)/this.sections.length}sectionExists(e){return this.sections.includes(e)}getNextSection(){const e=this.sections.indexOf(this.currentSection);return e<this.sections.length-1?this.sections[e+1]:null}getPreviousSection(){const e=this.sections.indexOf(this.currentSection);return e>0?this.sections[e-1]:null}scrollToTop(){const e=document.getElementById(this.currentSection);e&&this.scrollToSection(e)}setSmoothScrolling(e){document.documentElement.style.scrollBehavior=e?"smooth":"auto"}onSectionChange(e){document.addEventListener("section-changed",a=>{e(a.detail)})}destroy(){this.observer&&this.observer.disconnect(),this.scrollTimeout&&clearTimeout(this.scrollTimeout)}}class Ve{constructor(){f(this,"dev",{getSession:()=>({sessionId:this.sessionId,events:this.events.length,duration:Date.now()-this.startTime}),report:()=>{const e=this.generateReport();return console.log("📊 Analytics Report:",e),e},clear:()=>{this.events=[],console.log("🗑️ Analytics events cleared")},export:()=>{const e=JSON.stringify(this.events,null,2);return console.log("📤 Analytics Export:",e),e},simulate:()=>{const e=["section_view","user_action","progress_milestone"];for(let a=0;a<20;a++){const t=e[Math.floor(Math.random()*e.length)];this.track(t,{simulated:!0,index:a})}console.log("🎯 Simulated 20 analytics events")}});this.sessionId=this.generateSessionId(),this.events=[],this.userAgent=navigator.userAgent,this.startTime=Date.now(),this.isEnabled=!0,this.batchSize=10,this.flushInterval=3e4}initialize(){this.setupEventListeners(),this.startSession(),this.setupPeriodicFlush(),console.log("📊 Analytics Manager initialized")}generateSessionId(){return`${Date.now()}-${Math.random().toString(36).substr(2,9)}`}setupEventListeners(){document.addEventListener("visibilitychange",()=>{this.track("page_visibility",{visible:!document.hidden,timestamp:Date.now()})}),document.addEventListener("track-interaction",e=>{this.track("component_interaction",e.detail)}),document.addEventListener("progress-update",e=>{this.track("progress_update",e.detail)}),document.addEventListener("section-changed",e=>{this.trackSectionView(e.detail.section)}),window.addEventListener("error",e=>{this.trackError(e.error)}),window.addEventListener("load",()=>{setTimeout(()=>this.trackPerformance(),1e3)})}startSession(){this.track("session_start",{sessionId:this.sessionId,userAgent:this.userAgent,language:navigator.language,screen:{width:screen.width,height:screen.height,colorDepth:screen.colorDepth},viewport:{width:window.innerWidth,height:window.innerHeight},timezone:Intl.DateTimeFormat().resolvedOptions().timeZone})}track(e,a={}){if(!this.isEnabled)return;const t={id:this.generateEventId(),sessionId:this.sessionId,type:e,timestamp:Date.now(),url:window.location.href,data:a,sessionDuration:Date.now()-this.startTime};this.events.push(t),this.isDevelopment()&&console.log(`📈 Analytics: ${e}`,a),this.events.length>=this.batchSize&&this.flush()}generateEventId(){return`${this.sessionId}-${this.events.length+1}`}trackSectionView(e){this.track("section_view",{section:e,previousSection:this.currentSection,timeInPreviousSection:this.currentSection?Date.now()-this.sectionStartTime:0}),this.currentSection=e,this.sectionStartTime=Date.now()}trackAction(e,a={}){this.track("user_action",{action:e,...a})}trackProgress(e){this.track("progress_milestone",{...e,sessionProgress:this.getSessionProgress()})}trackError(e){this.track("error",{message:e.message,stack:e.stack,filename:e.filename,lineno:e.lineno,colno:e.colno})}trackPerformance(){var s,n;if(!("performance"in window))return;const e=performance.getEntriesByType("navigation")[0],a=performance.getEntriesByType("paint"),t={domContentLoaded:(e==null?void 0:e.domContentLoadedEventEnd)-(e==null?void 0:e.domContentLoadedEventStart),loadComplete:(e==null?void 0:e.loadEventEnd)-(e==null?void 0:e.loadEventStart),firstPaint:(s=a.find(o=>o.name==="first-paint"))==null?void 0:s.startTime,firstContentfulPaint:(n=a.find(o=>o.name==="first-contentful-paint"))==null?void 0:n.startTime,totalResources:performance.getEntriesByType("resource").length,memory:"memory"in performance?{usedJSHeapSize:performance.memory.usedJSHeapSize,totalJSHeapSize:performance.memory.totalJSHeapSize}:null};this.track("performance",t)}trackLearningEvent(e,a={}){this.track("learning_event",{eventType:e,learningData:a,sessionTime:Date.now()-this.startTime})}trackAccessibility(e,a={}){this.track("accessibility",{feature:e,...a})}getSessionProgress(){const e=this.events.filter(t=>t.sessionId===this.sessionId),a=e.filter(t=>t.type==="progress_milestone");return{totalEvents:e.length,progressEvents:a.length,sessionDuration:Date.now()-this.startTime}}async flush(){if(this.events.length===0)return;const e=[...this.events];this.events=[];try{await this.sendToAnalyticsService(e),this.isDevelopment()&&console.log(`📤 Flushed ${e.length} analytics events`)}catch(a){console.warn("Failed to send analytics events:",a),this.events.unshift(...e)}}async sendToAnalyticsService(e){return new Promise(a=>{setTimeout(()=>{this.isDevelopment()&&console.log("Analytics Events:",e),a()},100)})}setupPeriodicFlush(){setInterval(()=>{this.events.length>0&&this.flush()},this.flushInterval),window.addEventListener("beforeunload",()=>{this.events.length>0&&this.flushSync()})}flushSync(){if(this.events.length===0)return;const e=JSON.stringify({sessionId:this.sessionId,events:this.events});"sendBeacon"in navigator?navigator.sendBeacon("/api/analytics",e):fetch("/api/analytics",{method:"POST",body:e,headers:{"Content-Type":"application/json"},keepalive:!0}).catch(()=>{}),this.events=[]}isDevelopment(){return window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1"||window.location.hostname.includes("dev")}generateReport(){return{session:{id:this.sessionId,duration:Date.now()-this.startTime,eventCount:this.events.length},events:this.events.reduce((a,t)=>(a[t.type]=(a[t.type]||0)+1,a),{}),performance:this.getPerformanceMetrics(),userAgent:this.userAgent}}getPerformanceMetrics(){const e=this.events.filter(a=>a.type==="performance");return e.length>0?e[0].data:null}setEnabled(e){this.isEnabled=e,e?this.track("analytics_enabled"):(this.track("analytics_disabled"),this.flush())}getPrivacyData(){return{sessionId:this.sessionId,dataCollected:["User interactions with educational components","Learning progress and achievements","Page navigation and time spent","Error events for debugging","Performance metrics","Accessibility feature usage"],dataNotCollected:["Personal identifying information","IP addresses","Exact location data","Third-party account information"],retention:"30 days for learning analytics, 7 days for technical metrics"}}destroy(){this.flush(),this.isEnabled=!1}}class Ke{constructor(){this.state=new ye,this.components=new qe,this.theme=new Ue,this.language=new Be,this.progress=new Fe(this.state),this.navigation=new Ne,this.analytics=new Ve,this.isInitialized=!1}async init(){try{console.log("🚀 Initializing Git Pedagogy SPA..."),await this.initializeCore(),await this.loadComponents(),this.setupEventListeners(),await this.initializeSections(),this.analytics.initialize(),this.isInitialized=!0,console.log("✅ Application initialized successfully"),this.state.dispatch("APP_INITIALIZED")}catch(e){console.error("❌ Failed to initialize application:",e),this.handleInitializationError(e)}}async initializeCore(){await this.state.init(),this.theme.init(),this.language.init(),this.navigation.init(),document.getElementById("current-year").textContent=new Date().getFullYear()}async loadComponents(){const e=[()=>v(()=>import("./drag-drop-component-gxHlN6ye.js"),[]),()=>v(()=>import("./three-states-component-D03iiYn6.js"),[]),()=>v(()=>import("./comparison-tool-component-CSIycFcE.js"),[]),()=>v(()=>import("./hash-generator-component-BVSRY3zG.js"),[]),()=>v(()=>import("./git-terminal-simulator-BxU-0IxA.js"),[]),()=>v(()=>import("./git-branch-visualizer-By8XwNSg.js"),[]),()=>v(()=>import("./platform-comparison-tool-DpNXxoAa.js"),[]),()=>v(()=>import("./cicd-pipeline-visualizer-DLWQ0Nh8.js"),[]),()=>v(()=>import("./accessibility-toolkit-CxAX4sPo.js"),[]),()=>v(()=>import("./learning-style-assessment-1YEMN2ew.js"),[])],a=e.length;let t=0;for(const s of e)try{await s(),t++;const n=t/a*100;this.state.dispatch("LOADING_PROGRESS",{progress:n})}catch(n){console.warn("⚠️ Failed to load component:",n)}console.log(`📦 Loaded ${t}/${a} components`)}setupEventListeners(){var e,a,t,s,n,o;(e=document.getElementById("theme-auto"))==null||e.addEventListener("click",()=>{this.theme.setTheme("auto")}),(a=document.getElementById("theme-light"))==null||a.addEventListener("click",()=>{this.theme.setTheme("light")}),(t=document.getElementById("theme-dark"))==null||t.addEventListener("click",()=>{this.theme.setTheme("dark")}),(s=document.getElementById("language-toggle"))==null||s.addEventListener("change",r=>{this.language.setLanguage(r.target.checked?"en":"es")}),(n=document.getElementById("start-learning"))==null||n.addEventListener("click",()=>{this.startLearningJourney()}),(o=document.getElementById("progress-overview"))==null||o.addEventListener("click",()=>{this.showProgressOverview()}),document.querySelectorAll(".nav-dot").forEach(r=>{r.addEventListener("click",()=>{const l=r.dataset.section;this.navigation.navigateToSection(l)}),r.addEventListener("keydown",l=>{if(l.key==="Enter"||l.key===" "){l.preventDefault();const d=r.dataset.section;this.navigation.navigateToSection(d)}})}),document.addEventListener("keydown",r=>{this.handleKeyboardShortcuts(r)}),this.state.subscribe("SECTION_CHANGED",r=>{this.navigation.updateActiveSection(r.section),this.analytics.trackSectionView(r.section)}),this.state.subscribe("PROGRESS_UPDATED",r=>{this.progress.updateProgressBar(),this.analytics.trackProgress(r)}),window.addEventListener("error",r=>{this.analytics.trackError(r.error),console.error("Global error:",r.error)}),window.addEventListener("unhandledrejection",r=>{this.analytics.trackError(r.reason),console.error("Unhandled promise rejection:",r.reason)})}async initializeSections(){const e=document.getElementById("content-sections");if(!e)throw new Error("Content sections container not found");[{id:"part1",title:"Fundamentos Conceptuales",content:this.createPart1Content()},{id:"part2",title:"Ruta de Aprendizaje",content:this.createPart2Content()},{id:"part3",title:"Ecosistema Extendido",content:this.createPart3Content()},{id:"part4",title:"Pedagogía Inclusiva",content:this.createPart4Content()}].forEach(t=>{const s=document.createElement("section");s.id=t.id,s.className="section py-20",s.innerHTML=t.content,e.appendChild(s)}),this.navigation.observeSections(),console.log("📄 Content sections initialized with real content")}createPart1Content(){return`
            <div class="max-w-6xl mx-auto">
                <h2 class="text-4xl font-bold mb-4 text-center" style="color: var(--text);">
                    Parte I: Fundamentos Conceptuales del Control de Versiones
                </h2>
                <p class="text-xl text-center mb-12" style="color: var(--neutral);">
                    Más allá de "Guardar Como..." - La base teórica del desarrollo colaborativo moderno
                </p>

                <!-- Section 1.1: Defining Version Control -->
                <section class="mb-16">
                    <h3 class="text-2xl font-semibold mb-6" style="color: var(--text);">
                        <i class="ph-question-mark-duotone mr-3" style="color: var(--primary);"></i>
                        1.1 Definiendo el Control de Versiones: Más allá de "Guardar Como..."
                    </h3>
                    
                    <div class="grid md:grid-cols-2 gap-8 mb-8">
                        <div class="concept-explanation">
                            <div class="comparison-container">
                                <h4 class="text-lg font-semibold mb-4 text-red-600">❌ Enfoque Manual (Problemático)</h4>
                                <div class="manual-files">
                                    <div class="file-item">📄 proyecto_v1.docx</div>
                                    <div class="file-item">📄 proyecto_v2_final.docx</div>
                                    <div class="file-item">📄 proyecto_v2_final_REAL.docx</div>
                                    <div class="file-item">📄 proyecto_v3_corregido.docx</div>
                                    <div class="file-item">📄 proyecto_final_definitivo.docx</div>
                                </div>
                                <p class="text-sm mt-3 text-red-600">¿Cuál es la versión correcta? ¿Qué cambios se hicieron?</p>
                            </div>
                        </div>
                        
                        <div class="concept-explanation">
                            <div class="comparison-container">
                                <h4 class="text-lg font-semibold mb-4 text-green-600">✅ Sistema de Control de Versiones</h4>
                                <div class="vcs-structure">
                                    <div class="vcs-item">🗄️ Base de datos especializada</div>
                                    <div class="vcs-item">📊 Historial completo automático</div>
                                    <div class="vcs-item">👥 Colaboración sin conflictos</div>
                                    <div class="vcs-item">🔒 Integridad garantizada</div>
                                    <div class="vcs-item">⏪ Recuperación instantánea</div>
                                </div>
                                <p class="text-sm mt-3 text-green-600">Cada cambio registrado con precisión y contexto</p>
                            </div>
                        </div>
                    </div>

                    <div class="key-insight">
                        <i class="ph-lightbulb text-2xl mr-3" style="color: var(--accent);"></i>
                        <p><strong>Concepto Clave:</strong> Un VCS no es solo una herramienta de respaldo, sino el pilar fundamental sobre el cual se construye todo el desarrollo colaborativo, las prácticas DevOps y la integridad del proyecto.</p>
                    </div>
                </section>

                <!-- Interactive Component: Drag Drop Exercise -->
                <section class="mb-16">
                    <div class="interactive-component-container">
                        <git-drag-drop></git-drag-drop>
                    </div>
                </section>

                <!-- Section 1.2: Core Benefits -->
                <section class="mb-16">
                    <h3 class="text-2xl font-semibold mb-6" style="color: var(--text);">
                        <i class="ph-star-four-duotone mr-3" style="color: var(--secondary);"></i>
                        1.2 Los Beneficios Fundamentales: Colaboración, Historial y Recuperación
                    </h3>

                    <div class="benefits-grid">
                        <div class="benefit-card collaboration">
                            <div class="benefit-header">
                                <i class="ph-users-three text-4xl mb-4" style="color: var(--primary);"></i>
                                <h4 class="text-xl font-semibold mb-3">Colaboración y Desarrollo Paralelo</h4>
                            </div>
                            <div class="benefit-content">
                                <p class="mb-3">Permite que múltiples desarrolladores trabajen simultáneamente sin sobrescribir cambios.</p>
                                <ul class="benefit-list">
                                    <li>Sincronización automática de cambios</li>
                                    <li>Resolución inteligente de conflictos</li>
                                    <li>Flujos de trabajo estructurados</li>
                                </ul>
                                <div class="mini-demo">
                                    <div class="developer">👨‍💻 Dev A</div>
                                    <div class="sync-arrow">↔️</div>
                                    <div class="repository">🏛️ Repo</div>
                                    <div class="sync-arrow">↔️</div>
                                    <div class="developer">👩‍💻 Dev B</div>
                                </div>
                            </div>
                        </div>

                        <div class="benefit-card history">
                            <div class="benefit-header">
                                <i class="ph-clock-clockwise text-4xl mb-4" style="color: var(--secondary);"></i>
                                <h4 class="text-xl font-semibold mb-3">Historial y Trazabilidad</h4>
                            </div>
                            <div class="benefit-content">
                                <p class="mb-3">Cada cambio queda registrado con metadatos completos y propósito.</p>
                                <ul class="benefit-list">
                                    <li>Quién hizo qué cambio y cuándo</li>
                                    <li>Razones documentadas para cada modificación</li>
                                    <li>Seguimiento del origen de errores</li>
                                </ul>
                                <div class="commit-example">
                                    <div class="commit-line">
                                        <span class="commit-hash">a3b7c9d</span>
                                        <span class="commit-author">María González</span>
                                        <span class="commit-date">2024-03-15</span>
                                    </div>
                                    <div class="commit-message">"Implementar autenticación de usuarios"</div>
                                </div>
                            </div>
                        </div>

                        <div class="benefit-card recovery">
                            <div class="benefit-header">
                                <i class="ph-shield-check text-4xl mb-4" style="color: var(--success);"></i>
                                <h4 class="text-xl font-semibold mb-3">Recuperación y Experimentación</h4>
                            </div>
                            <div class="benefit-content">
                                <p class="mb-3">Red de seguridad que permite experimentación confiada y recuperación instantánea.</p>
                                <ul class="benefit-list">
                                    <li>Reversión a estados anteriores estables</li>
                                    <li>Experimentación en ramas aisladas</li>
                                    <li>Protección contra pérdida de datos</li>
                                </ul>
                                <div class="recovery-demo">
                                    <div class="timeline">
                                        <div class="timeline-point stable">✅ Estable</div>
                                        <div class="timeline-point experiment">🧪 Experimento</div>
                                        <div class="timeline-point error">❌ Error</div>
                                        <div class="timeline-point recovery">↩️ Recuperar</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="benefit-card branching">
                            <div class="benefit-header">
                                <i class="ph-git-branch text-4xl mb-4" style="color: var(--accent);"></i>
                                <h4 class="text-xl font-semibold mb-3">Ramificación y Fusión</h4>
                            </div>
                            <div class="benefit-content">
                                <p class="mb-3">Desarrollo paralelo independiente con integración controlada.</p>
                                <ul class="benefit-list">
                                    <li>Líneas de desarrollo aisladas</li>
                                    <li>Integración segura de características</li>
                                    <li>Código principal siempre estable</li>
                                </ul>
                                <div class="branch-visual">
                                    <div class="main-branch">main ——————————————————————————————————</div>
                                    <div class="feature-branch">feature ——————————————————————————————————⤴</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Section 1.3: CVCS vs DVCS Comparison -->
                <section class="mb-16">
                    <h3 class="text-2xl font-semibold mb-6" style="color: var(--text);">
                        <i class="ph-arrows-split-duotone mr-3" style="color: var(--primary);"></i>
                        1.3 Paradigmas Arquitecturales: Sistemas Centralizados vs Distribuidos
                    </h3>

                    <div class="architecture-intro mb-8">
                        <p class="text-lg mb-4" style="color: var(--neutral);">
                            La arquitectura de un sistema de control de versiones determina cómo se almacenan los datos y cómo colaboran los desarrolladores. Entender estas diferencias es crucial para apreciar por qué Git se ha convertido en el estándar de la industria.
                        </p>
                    </div>

                    <!-- Interactive Comparison Tool -->
                    <div class="interactive-component-container mb-8">
                        <git-comparison-tool></git-comparison-tool>
                    </div>

                    <!-- Detailed Comparison Table -->
                    <div class="comparison-table-container">
                        <table class="architecture-comparison-table">
                            <thead>
                                <tr>
                                    <th>Característica</th>
                                    <th class="cvcs-column">
                                        <i class="ph-building-office mr-2"></i>
                                        Centralizado (CVCS)
                                    </th>
                                    <th class="dvcs-column">
                                        <i class="ph-network mr-2"></i>
                                        Distribuido (DVCS)
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>Modelo de Repositorio</strong></td>
                                    <td>Un repositorio central en el servidor. Los clientes tienen solo una copia de trabajo.</td>
                                    <td>Cada desarrollador tiene un clon completo del repositorio con todo el historial.</td>
                                </tr>
                                <tr>
                                    <td><strong>Flujo de Trabajo</strong></td>
                                    <td>Check out → Modificar → Commit al servidor central</td>
                                    <td>Clonar → Trabajar localmente → Push/Pull para compartir cambios</td>
                                </tr>
                                <tr>
                                    <td><strong>Velocidad</strong></td>
                                    <td>Más lento, requiere comunicación constante con el servidor</td>
                                    <td>Más rápido, la mayoría de operaciones son locales</td>
                                </tr>
                                <tr>
                                    <td><strong>Capacidad Offline</strong></td>
                                    <td>Limitada, requiere conexión constante para la mayoría de acciones</td>
                                    <td>Excelente, se puede trabajar completamente offline</td>
                                </tr>
                                <tr>
                                    <td><strong>Ramificación y Fusión</strong></td>
                                    <td>Puede ser lenta y engorrosa</td>
                                    <td>Rápida, flexible y eficiente</td>
                                </tr>
                                <tr>
                                    <td><strong>Resistencia a Fallos</strong></td>
                                    <td>Vulnerable, el servidor central es un punto único de fallo</td>
                                    <td>Muy resistente, cada clon es un respaldo completo</td>
                                </tr>
                                <tr>
                                    <td><strong>Casos de Uso Ideales</strong></td>
                                    <td>Equipos pequeños, ubicación única, control centralizado estricto</td>
                                    <td>Equipos distribuidos, proyectos open source, alta flexibilidad</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <!-- Section 2: Git Philosophy -->
                <section class="mb-16">
                    <h3 class="text-2xl font-semibold mb-6" style="color: var(--text);">
                        <i class="ph-brain-duotone mr-3" style="color: var(--accent);"></i>
                        2. La Filosofía de Git: Pensando en Instantáneas
                    </h3>

                    <div class="git-philosophy mb-8">
                        <div class="philosophy-intro">
                            <p class="text-lg mb-6" style="color: var(--neutral);">
                                Para usar Git efectivamente, es esencial entender no solo sus comandos, sino la filosofía de diseño subyacente que lo hace tan poderoso y distinto de sus predecesores.
                            </p>
                        </div>

                        <div class="grid md:grid-cols-2 gap-8 mb-8">
                            <div class="concept-card">
                                <h4 class="text-xl font-semibold mb-4">
                                    <i class="ph-camera-duotone mr-2" style="color: var(--primary);"></i>
                                    Modelo de Datos: Instantáneas vs Deltas
                                </h4>
                                <div class="data-model-comparison">
                                    <div class="traditional-model mb-4">
                                        <h5 class="font-semibold text-red-600 mb-2">❌ Sistemas Tradicionales (Deltas)</h5>
                                        <div class="delta-visualization">
                                            <div class="file-version">Archivo v1</div>
                                            <div class="delta">+ línea agregada</div>
                                            <div class="file-version">Archivo v2</div>
                                            <div class="delta">- línea eliminada</div>
                                            <div class="file-version">Archivo v3</div>
                                        </div>
                                    </div>
                                    <div class="git-model">
                                        <h5 class="font-semibold text-green-600 mb-2">✅ Git (Instantáneas)</h5>
                                        <div class="snapshot-visualization">
                                            <div class="snapshot">📷 Snapshot 1</div>
                                            <div class="snapshot">📷 Snapshot 2</div>
                                            <div class="snapshot">📷 Snapshot 3</div>
                                        </div>
                                        <p class="text-sm mt-2 text-green-600">Cada commit es una foto completa del proyecto</p>
                                    </div>
                                </div>
                            </div>

                            <div class="concept-card">
                                <h4 class="text-xl font-semibold mb-4">
                                    <i class="ph-lock-duotone mr-2" style="color: var(--secondary);"></i>
                                    Integridad de Datos: SHA-1 Hashing
                                </h4>
                                <div class="integrity-demo">
                                    <p class="mb-3">Todo en Git se identifica por su checksum SHA-1:</p>
                                    <div class="hash-example mb-3">
                                        <div class="file-content">Contenido del archivo</div>
                                        <div class="hash-arrow">↓ SHA-1</div>
                                        <div class="hash-result">a3b5c7d9e1f2a4b6c8d0e2f4a6b8c0d2e4f6a8b0</div>
                                    </div>
                                    <p class="text-sm" style="color: var(--neutral);">
                                        Imposible alterar contenido sin que Git lo detecte
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Section 2.3: The Three States -->
                <section class="mb-16">
                    <h3 class="text-2xl font-semibold mb-6" style="color: var(--text);">
                        <i class="ph-stack-duotone mr-3" style="color: var(--primary);"></i>
                        2.3 Los Tres Estados: El Viaje desde el Directorio de Trabajo al Repositorio
                    </h3>

                    <div class="three-states-intro mb-8">
                        <p class="text-lg mb-4" style="color: var(--neutral);">
                            Para usar Git efectivamente, debes internalizar que los archivos pueden residir en tres estados principales. Este proceso de tres etapas es central al flujo de trabajo de Git.
                        </p>
                    </div>

                    <!-- Interactive Three States Demo -->
                    <div class="interactive-component-container mb-8">
                        <git-three-states></git-three-states>
                    </div>

                    <div class="states-explanation">
                        <div class="state-detail">
                            <div class="state-icon modified">
                                <i class="ph-pencil-duotone text-3xl"></i>
                            </div>
                            <div class="state-content">
                                <h4 class="text-xl font-semibold mb-2" style="color: var(--accent);">1. Modificado (Modified)</h4>
                                <p class="mb-3">Archivos que han sido cambiados pero aún no están registrados formalmente. Estos cambios existen solo en tu <strong>Directorio de Trabajo</strong> visible.</p>
                                <div class="state-commands">
                                    <code>git status</code> <span class="command-desc">→ muestra archivos modificados</span>
                                </div>
                            </div>
                        </div>

                        <div class="state-detail">
                            <div class="state-icon staged">
                                <i class="ph-staging-duotone text-3xl"></i>
                            </div>
                            <div class="state-content">
                                <h4 class="text-xl font-semibold mb-2" style="color: var(--primary);">2. Preparado (Staged)</h4>
                                <p class="mb-3">Archivos marcados para ser incluidos en la próxima instantánea del commit. Residen en el <strong>Área de Preparación</strong> (staging area o "index").</p>
                                <div class="state-commands">
                                    <code>git add archivo.js</code> <span class="command-desc">→ prepara archivo para commit</span>
                                </div>
                            </div>
                        </div>

                        <div class="state-detail">
                            <div class="state-icon committed">
                                <i class="ph-database-duotone text-3xl"></i>
                            </div>
                            <div class="state-content">
                                <h4 class="text-xl font-semibold mb-2" style="color: var(--success);">3. Confirmado (Committed)</h4>
                                <p class="mb-3">Los datos del área de preparación han sido almacenados como una instantánea permanente en el <strong>Directorio Git</strong> (carpeta oculta .git).</p>
                                <div class="state-commands">
                                    <code>git commit -m "mensaje"</code> <span class="command-desc">→ crea instantánea permanente</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Interactive SHA-1 Hash Generator -->
                <section class="mb-16">
                    <h3 class="text-2xl font-semibold mb-6" style="color: var(--text);">
                        <i class="ph-fingerprint-duotone mr-3" style="color: var(--accent);"></i>
                        Demostración: Generador de Hash SHA-1
                    </h3>
                    <div class="interactive-component-container">
                        <git-hash-generator></git-hash-generator>
                    </div>
                </section>

                <!-- Key Takeaways -->
                <section class="key-takeaways">
                    <h3 class="text-2xl font-semibold mb-6" style="color: var(--text);">
                        <i class="ph-key-duotone mr-3" style="color: var(--primary);"></i>
                        Conceptos Clave para Recordar
                    </h3>
                    <div class="takeaway-grid">
                        <div class="takeaway-item">
                            <i class="ph-camera text-2xl mb-2" style="color: var(--primary);"></i>
                            <h4 class="font-semibold mb-2">Git piensa en instantáneas</h4>
                            <p class="text-sm">Cada commit es una foto completa del proyecto, no una lista de cambios</p>
                        </div>
                        <div class="takeaway-item">
                            <i class="ph-stack text-2xl mb-2" style="color: var(--secondary);"></i>
                            <h4 class="font-semibold mb-2">Tres estados fundamentales</h4>
                            <p class="text-sm">Modificado → Preparado → Confirmado es el flujo central de Git</p>
                        </div>
                        <div class="takeaway-item">
                            <i class="ph-shield-check text-2xl mb-2" style="color: var(--success);"></i>
                            <h4 class="font-semibold mb-2">Integridad garantizada</h4>
                            <p class="text-sm">SHA-1 hashing protege contra corrupción y alteración maliciosa</p>
                        </div>
                        <div class="takeaway-item">
                            <i class="ph-network text-2xl mb-2" style="color: var(--accent);"></i>
                            <h4 class="font-semibold mb-2">Distribución = Resistencia</h4>
                            <p class="text-sm">Cada clon es un respaldo completo, eliminando puntos únicos de fallo</p>
                        </div>
                    </div>
                </section>
            </div>
        `}createPart2Content(){return`
            <div class="max-w-6xl mx-auto">
                <h2 class="text-3xl font-bold mb-8 text-center" style="color: var(--text);" 
                    data-lang-es="Parte II: Ruta de Aprendizaje Estructurada" 
                    data-lang-en="Part II: Structured Learning Path">
                    Parte II: Ruta de Aprendizaje Estructurada
                </h2>
                
                <!-- Introduction -->
                <div class="educational-intro mb-12">
                    <p class="text-lg leading-relaxed" 
                       data-lang-es="Esta sección presenta un camino estructurado y pedagógicamente informado para dominar Git, desde conceptos básicos hasta flujos de trabajo colaborativos avanzados." 
                       data-lang-en="This section presents a structured and pedagogically informed path to mastering Git, from basic concepts to advanced collaborative workflows.">
                        Esta sección presenta un camino estructurado y pedagógicamente informado para dominar Git, desde conceptos básicos hasta flujos de trabajo colaborativos avanzados.
                    </p>
                </div>

                <!-- Section 3: The Beginner's Toolkit -->
                <section class="mb-16">
                    <h3 class="text-2xl font-semibold mb-8 section-header" 
                        data-lang-es="Sección 3: Kit de Herramientas del Principiante" 
                        data-lang-en="Section 3: The Beginner's Toolkit">
                        <i class="ph-toolbox mr-3" style="color: var(--primary);"></i>
                        Sección 3: Kit de Herramientas del Principiante
                    </h3>

                    <!-- Interactive Terminal Simulator -->
                    <div class="interactive-component mb-12">
                        <div class="component-header">
                            <h4 class="text-xl font-semibold" 
                                data-lang-es="🖥️ Simulador de Terminal Interactivo" 
                                data-lang-en="🖥️ Interactive Terminal Simulator">
                                🖥️ Simulador de Terminal Interactivo
                            </h4>
                            <p class="mt-2" 
                               data-lang-es="Practica comandos Git en un entorno seguro sin riesgo de errores." 
                               data-lang-en="Practice Git commands in a safe environment without risk of errors.">
                                Practica comandos Git en un entorno seguro sin riesgo de errores.
                            </p>
                        </div>
                        <git-terminal-simulator></git-terminal-simulator>
                    </div>

                    <!-- Basic Commands Section -->
                    <div class="educational-section">
                        <h4 class="text-xl font-semibold mb-6" 
                            data-lang-es="3.1 Los Comandos Esenciales: Tu Primer Día con Git" 
                            data-lang-en="3.1 Essential Commands: Your First Day with Git">
                            3.1 Los Comandos Esenciales: Tu Primer Día con Git
                        </h4>
                        
                        <div class="command-grid">
                            <div class="command-card">
                                <div class="command-header">
                                    <code class="command-name">git init</code>
                                    <span class="command-type">Inicialización</span>
                                </div>
                                <p class="command-description" 
                                   data-lang-es="Convierte un directorio en un repositorio Git, creando el directorio .git oculto donde se almacena toda la historia del proyecto." 
                                   data-lang-en="Converts a directory into a Git repository, creating the hidden .git directory where all project history is stored.">
                                    Convierte un directorio en un repositorio Git, creando el directorio .git oculto donde se almacena toda la historia del proyecto.
                                </p>
                                <div class="command-example">
                                    <code>$ git init mi-proyecto</code>
                                </div>
                            </div>

                            <div class="command-card">
                                <div class="command-header">
                                    <code class="command-name">git add</code>
                                    <span class="command-type">Preparación</span>
                                </div>
                                <p class="command-description" 
                                   data-lang-es="Prepara cambios para ser incluidos en el próximo commit. Puedes añadir archivos específicos o usar '.' para todos." 
                                   data-lang-en="Stages changes to be included in the next commit. You can add specific files or use '.' for all.">
                                    Prepara cambios para ser incluidos en el próximo commit. Puedes añadir archivos específicos o usar '.' para todos.
                                </p>
                                <div class="command-example">
                                    <code>$ git add archivo.txt<br>$ git add .</code>
                                </div>
                            </div>

                            <div class="command-card">
                                <div class="command-header">
                                    <code class="command-name">git commit</code>
                                    <span class="command-type">Confirmación</span>
                                </div>
                                <p class="command-description" 
                                   data-lang-es="Crea un registro permanente de los cambios preparados con un mensaje descriptivo que explique qué se modificó." 
                                   data-lang-en="Creates a permanent record of the staged changes with a descriptive message explaining what was modified.">
                                    Crea un registro permanente de los cambios preparados con un mensaje descriptivo que explique qué se modificó.
                                </p>
                                <div class="command-example">
                                    <code>$ git commit -m "Añade función de login"</code>
                                </div>
                            </div>

                            <div class="command-card">
                                <div class="command-header">
                                    <code class="command-name">git status</code>
                                    <span class="command-type">Información</span>
                                </div>
                                <p class="command-description" 
                                   data-lang-es="Muestra el estado actual del repositorio: qué archivos han cambiado, cuáles están preparados y cuáles no están rastreados." 
                                   data-lang-en="Shows the current state of the repository: which files have changed, which are staged, and which are untracked.">
                                    Muestra el estado actual del repositorio: qué archivos han cambiado, cuáles están preparados y cuáles no están rastreados.
                                </p>
                                <div class="command-example">
                                    <code>$ git status</code>
                                </div>
                            </div>

                            <div class="command-card">
                                <div class="command-header">
                                    <code class="command-name">git log</code>
                                    <span class="command-type">Historia</span>
                                </div>
                                <p class="command-description" 
                                   data-lang-es="Visualiza el historial de commits del repositorio, mostrando autor, fecha y mensaje de cada cambio." 
                                   data-lang-en="Displays the repository's commit history, showing author, date, and message for each change.">
                                    Visualiza el historial de commits del repositorio, mostrando autor, fecha y mensaje de cada cambio.
                                </p>
                                <div class="command-example">
                                    <code>$ git log --oneline</code>
                                </div>
                            </div>

                            <div class="command-card">
                                <div class="command-header">
                                    <code class="command-name">git diff</code>
                                    <span class="command-type">Comparación</span>
                                </div>
                                <p class="command-description" 
                                   data-lang-es="Compara diferentes versiones de archivos, mostrando exactamente qué líneas han cambiado entre commits o estados." 
                                   data-lang-en="Compares different versions of files, showing exactly which lines have changed between commits or states.">
                                    Compara diferentes versiones de archivos, mostrando exactamente qué líneas han cambiado entre commits o estados.
                                </p>
                                <div class="command-example">
                                    <code>$ git diff<br>$ git diff --staged</code>
                                </div>
                            </div>
                        </div>

                        <!-- First Workflow Example -->
                        <div class="workflow-example mt-8">
                            <h5 class="text-lg font-semibold mb-4" 
                                data-lang-es="🔄 Tu Primer Flujo de Trabajo" 
                                data-lang-en="🔄 Your First Workflow">
                                🔄 Tu Primer Flujo de Trabajo
                            </h5>
                            <div class="workflow-steps">
                                <div class="workflow-step">
                                    <span class="step-number">1</span>
                                    <div class="step-content">
                                        <code>git init</code>
                                        <p data-lang-es="Inicializa tu repositorio" data-lang-en="Initialize your repository">
                                            Inicializa tu repositorio
                                        </p>
                                    </div>
                                </div>
                                <div class="workflow-arrow">→</div>
                                <div class="workflow-step">
                                    <span class="step-number">2</span>
                                    <div class="step-content">
                                        <code>git add .</code>
                                        <p data-lang-es="Prepara todos los cambios" data-lang-en="Stage all changes">
                                            Prepara todos los cambios
                                        </p>
                                    </div>
                                </div>
                                <div class="workflow-arrow">→</div>
                                <div class="workflow-step">
                                    <span class="step-number">3</span>
                                    <div class="step-content">
                                        <code>git commit -m "..."</code>
                                        <p data-lang-es="Confirma los cambios" data-lang-en="Commit the changes">
                                            Confirma los cambios
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Inclusive Strategy Focus -->
                    <div class="inclusive-focus mt-8">
                        <h4 class="text-lg font-semibold mb-4" 
                            data-lang-es="🎯 Enfoque de Estrategia Inclusiva: Construyendo Confianza a Través de la Práctica Estructurada" 
                            data-lang-en="🎯 Inclusive Strategy Focus: Building Confidence Through Structured Practice">
                            🎯 Enfoque de Estrategia Inclusiva: Construyendo Confianza a Través de la Práctica Estructurada
                        </h4>
                        <div class="strategy-tips">
                            <div class="tip-card">
                                <i class="ph-check-circle" style="color: var(--success);"></i>
                                <div>
                                    <strong data-lang-es="Comandos de Referencia Rápida" data-lang-en="Quick Reference Commands">
                                        Comandos de Referencia Rápida
                                    </strong>
                                    <p data-lang-es="Proporciona tarjetas de referencia o comandos 'cheat sheet' que los estudiantes puedan consultar sin presión." 
                                       data-lang-en="Provide reference cards or 'cheat sheets' that students can consult without pressure.">
                                        Proporciona tarjetas de referencia o comandos 'cheat sheet' que los estudiantes puedan consultar sin presión.
                                    </p>
                                </div>
                            </div>
                            <div class="tip-card">
                                <i class="ph-repeat" style="color: var(--primary);"></i>
                                <div>
                                    <strong data-lang-es="Práctica Repetitiva y Segura" data-lang-en="Repetitive and Safe Practice">
                                        Práctica Repetitiva y Segura
                                    </strong>
                                    <p data-lang-es="Utiliza repositorios de práctica donde los errores no tienen consecuencias y la repetición es bienvenida." 
                                       data-lang-en="Use practice repositories where mistakes have no consequences and repetition is welcome.">
                                        Utiliza repositorios de práctica donde los errores no tienen consecuencias y la repetición es bienvenida.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Section 4: Branching Power -->
                <section class="mb-16">
                    <h3 class="text-2xl font-semibold mb-8 section-header" 
                        data-lang-es="Sección 4: El Poder de las Ramas - Desarrollo Paralelo" 
                        data-lang-en="Section 4: Branching Power - Parallel Development">
                        <i class="ph-git-branch mr-3" style="color: var(--secondary);"></i>
                        Sección 4: El Poder de las Ramas - Desarrollo Paralelo
                    </h3>

                    <!-- Interactive Branch Visualizer -->
                    <div class="interactive-component mb-12">
                        <div class="component-header">
                            <h4 class="text-xl font-semibold" 
                                data-lang-es="🌳 Visualizador de Ramas Interactivo" 
                                data-lang-en="🌳 Interactive Branch Visualizer">
                                🌳 Visualizador de Ramas Interactivo
                            </h4>
                            <p class="mt-2" 
                               data-lang-es="Explora cómo las ramas permiten el desarrollo paralelo y la colaboración efectiva." 
                               data-lang-en="Explore how branches enable parallel development and effective collaboration.">
                                Explora cómo las ramas permiten el desarrollo paralelo y la colaboración efectiva.
                            </p>
                        </div>
                        <git-branch-visualizer></git-branch-visualizer>
                    </div>

                    <!-- Branching Concepts -->
                    <div class="educational-section">
                        <h4 class="text-xl font-semibold mb-6" 
                            data-lang-es="4.1 Conceptos Fundamentales de Ramificación" 
                            data-lang-en="4.1 Fundamental Branching Concepts">
                            4.1 Conceptos Fundamentales de Ramificación
                        </h4>

                        <div class="concept-explanation">
                            <p class="mb-6" 
                               data-lang-es="Las ramas en Git son líneas independientes de desarrollo que permiten trabajar en diferentes características o experimentos sin afectar el código principal. Imagina un árbol donde cada rama puede crecer en su propia dirección." 
                               data-lang-en="Branches in Git are independent lines of development that allow you to work on different features or experiments without affecting the main code. Imagine a tree where each branch can grow in its own direction.">
                                Las ramas en Git son líneas independientes de desarrollo que permiten trabajar en diferentes características o experimentos sin afectar el código principal. Imagina un árbol donde cada rama puede crecer en su propia dirección.
                            </p>
                        </div>

                        <!-- Branch Commands -->
                        <div class="branch-commands-grid">
                            <div class="command-card">
                                <div class="command-header">
                                    <code class="command-name">git branch</code>
                                    <span class="command-type">Gestión</span>
                                </div>
                                <p class="command-description" 
                                   data-lang-es="Lista todas las ramas existentes y muestra en cuál estás trabajando actualmente." 
                                   data-lang-en="Lists all existing branches and shows which one you're currently working on.">
                                    Lista todas las ramas existentes y muestra en cuál estás trabajando actualmente.
                                </p>
                                <div class="command-example">
                                    <code>$ git branch<br>$ git branch nueva-rama</code>
                                </div>
                            </div>

                            <div class="command-card">
                                <div class="command-header">
                                    <code class="command-name">git checkout</code>
                                    <span class="command-type">Navegación</span>
                                </div>
                                <p class="command-description" 
                                   data-lang-es="Cambia entre ramas o crea una nueva rama y se mueve a ella inmediatamente." 
                                   data-lang-en="Switches between branches or creates a new branch and moves to it immediately.">
                                    Cambia entre ramas o crea una nueva rama y se mueve a ella inmediatamente.
                                </p>
                                <div class="command-example">
                                    <code>$ git checkout main<br>$ git checkout -b feature</code>
                                </div>
                            </div>

                            <div class="command-card">
                                <div class="command-header">
                                    <code class="command-name">git merge</code>
                                    <span class="command-type">Integración</span>
                                </div>
                                <p class="command-description" 
                                   data-lang-es="Combina los cambios de una rama con otra, integrando el trabajo desarrollado por separado." 
                                   data-lang-en="Combines changes from one branch with another, integrating work developed separately.">
                                    Combina los cambios de una rama con otra, integrando el trabajo desarrollado por separado.
                                </p>
                                <div class="command-example">
                                    <code>$ git merge feature</code>
                                </div>
                            </div>

                            <div class="command-card">
                                <div class="command-header">
                                    <code class="command-name">git switch</code>
                                    <span class="command-type">Moderno</span>
                                </div>
                                <p class="command-description" 
                                   data-lang-es="Comando moderno para cambiar ramas de forma más clara y segura que checkout." 
                                   data-lang-en="Modern command for switching branches more clearly and safely than checkout.">
                                    Comando moderno para cambiar ramas de forma más clara y segura que checkout.
                                </p>
                                <div class="command-example">
                                    <code>$ git switch main<br>$ git switch -c nueva-rama</code>
                                </div>
                            </div>
                        </div>

                        <!-- Branch Workflow -->
                        <div class="branch-workflow mt-8">
                            <h5 class="text-lg font-semibold mb-4" 
                                data-lang-es="🔄 Flujo de Trabajo con Ramas" 
                                data-lang-en="🔄 Branching Workflow">
                                🔄 Flujo de Trabajo con Ramas
                            </h5>
                            <div class="workflow-steps">
                                <div class="workflow-step">
                                    <span class="step-number">1</span>
                                    <div class="step-content">
                                        <code>git checkout -b feature</code>
                                        <p data-lang-es="Crea y cambia a nueva rama" data-lang-en="Create and switch to new branch">
                                            Crea y cambia a nueva rama
                                        </p>
                                    </div>
                                </div>
                                <div class="workflow-arrow">→</div>
                                <div class="workflow-step">
                                    <span class="step-number">2</span>
                                    <div class="step-content">
                                        <code>Desarrollar función</code>
                                        <p data-lang-es="Trabaja en la nueva característica" data-lang-en="Work on the new feature">
                                            Trabaja en la nueva característica
                                        </p>
                                    </div>
                                </div>
                                <div class="workflow-arrow">→</div>
                                <div class="workflow-step">
                                    <span class="step-number">3</span>
                                    <div class="step-content">
                                        <code>git checkout main</code>
                                        <p data-lang-es="Regresa a rama principal" data-lang-en="Return to main branch">
                                            Regresa a rama principal
                                        </p>
                                    </div>
                                </div>
                                <div class="workflow-arrow">→</div>
                                <div class="workflow-step">
                                    <span class="step-number">4</span>
                                    <div class="step-content">
                                        <code>git merge feature</code>
                                        <p data-lang-es="Integra los cambios" data-lang-en="Integrate the changes">
                                            Integra los cambios
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Merge Strategies -->
                    <div class="educational-section mt-8">
                        <h4 class="text-xl font-semibold mb-6" 
                            data-lang-es="4.2 Estrategias de Fusión: Fast-Forward vs Merge Commits" 
                            data-lang-en="4.2 Merge Strategies: Fast-Forward vs Merge Commits">
                            4.2 Estrategias de Fusión: Fast-Forward vs Merge Commits
                        </h4>

                        <div class="strategy-comparison">
                            <div class="strategy-card">
                                <h5 class="font-semibold" style="color: var(--primary);" 
                                    data-lang-es="Fast-Forward Merge" 
                                    data-lang-en="Fast-Forward Merge">
                                    Fast-Forward Merge
                                </h5>
                                <p data-lang-es="Cuando la rama principal no ha cambiado, Git simplemente mueve el puntero hacia adelante." 
                                   data-lang-en="When the main branch hasn't changed, Git simply moves the pointer forward.">
                                    Cuando la rama principal no ha cambiado, Git simplemente mueve el puntero hacia adelante.
                                </p>
                                <div class="strategy-visual">
                                    <code>A ← B ← C (main)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↖ D ← E (feature)</code>
                                </div>
                            </div>

                            <div class="strategy-card">
                                <h5 class="font-semibold" style="color: var(--secondary);" 
                                    data-lang-es="3-Way Merge" 
                                    data-lang-en="3-Way Merge">
                                    3-Way Merge
                                </h5>
                                <p data-lang-es="When ambas ramas han cambiado, Git crea un commit de fusión que une ambas historias." 
                                   data-lang-en="When both branches have changed, Git creates a merge commit that joins both histories.">
                                    Cuando ambas ramas han cambiado, Git crea un commit de fusión que une ambas historias.
                                </p>
                                <div class="strategy-visual">
                                    <code>A ← B ← C ← F (main)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↖ D ← E ↙<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(merge commit)</code>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Inclusive Strategy Focus -->
                    <div class="inclusive-focus mt-8">
                        <h4 class="text-lg font-semibold mb-4" 
                            data-lang-es="🎯 Enfoque de Estrategia Inclusiva: Visualización y Estructura para el Éxito" 
                            data-lang-en="🎯 Inclusive Strategy Focus: Visualization and Structure for Success">
                            🎯 Enfoque de Estrategia Inclusiva: Visualización y Estructura para el Éxito
                        </h4>
                        <div class="strategy-tips">
                            <div class="tip-card">
                                <i class="ph-eye" style="color: var(--primary);"></i>
                                <div>
                                    <strong data-lang-es="Herramientas de Visualización" data-lang-en="Visualization Tools">
                                        Herramientas de Visualización
                                    </strong>
                                    <p data-lang-es="Usa herramientas gráficas como gitk, SourceTree o la visualización de GitHub para hacer que las ramas sean más concretas." 
                                       data-lang-en="Use graphical tools like gitk, SourceTree, or GitHub visualization to make branches more concrete.">
                                        Usa herramientas gráficas como gitk, SourceTree o la visualización de GitHub para hacer que las ramas sean más concretas.
                                    </p>
                                </div>
                            </div>
                            <div class="tip-card">
                                <i class="ph-list-dashes" style="color: var(--secondary);"></i>
                                <div>
                                    <strong data-lang-es="Convenciones de Nomenclatura" data-lang-en="Naming Conventions">
                                        Convenciones de Nomenclatura
                                    </strong>
                                    <p data-lang-es="Establece patrones claros para nombrar ramas (ej: feature/login, bugfix/header, etc.) para reducir la carga cognitiva." 
                                       data-lang-en="Establish clear patterns for naming branches (e.g., feature/login, bugfix/header, etc.) to reduce cognitive load.">
                                        Establece patrones claros para nombrar ramas (ej: feature/login, bugfix/header, etc.) para reducir la carga cognitiva.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Summary and Next Steps -->
                <div class="learning-summary mt-12">
                    <h3 class="text-2xl font-semibold mb-6" 
                        data-lang-es="🎯 Resumen de la Ruta de Aprendizaje" 
                        data-lang-en="🎯 Learning Path Summary">
                        🎯 Resumen de la Ruta de Aprendizaje
                    </h3>
                    <div class="summary-grid">
                        <div class="summary-card">
                            <i class="ph-graduation-cap text-3xl mb-4" style="color: var(--primary);"></i>
                            <h4 class="font-semibold" 
                                data-lang-es="Dominaste los Fundamentos" 
                                data-lang-en="You've Mastered the Fundamentals">
                                Dominaste los Fundamentos
                            </h4>
                            <p data-lang-es="Comandos básicos, el concepto de tres estados, y flujos de trabajo esenciales." 
                               data-lang-en="Basic commands, the three-state concept, and essential workflows.">
                                Comandos básicos, el concepto de tres estados, y flujos de trabajo esenciales.
                            </p>
                        </div>
                        <div class="summary-card">
                            <i class="ph-git-branch text-3xl mb-4" style="color: var(--secondary);"></i>
                            <h4 class="font-semibold" 
                                data-lang-es="Poder de las Ramas" 
                                data-lang-en="Branching Power">
                                Poder de las Ramas
                            </h4>
                            <p data-lang-es="Desarrollo paralelo, fusiones y estrategias de colaboración efectiva." 
                               data-lang-en="Parallel development, merges, and effective collaboration strategies.">
                                Desarrollo paralelo, fusiones y estrategias de colaboración efectiva.
                            </p>
                        </div>
                        <div class="summary-card">
                            <i class="ph-rocket text-3xl mb-4" style="color: var(--accent);"></i>
                            <h4 class="font-semibold" 
                                data-lang-es="Listo para Colaborar" 
                                data-lang-en="Ready to Collaborate">
                                Listo para Colaborar
                            </h4>
                            <p data-lang-es="Preparado para trabajar en equipo con repositorios remotos y flujos profesionales." 
                               data-lang-en="Prepared to work in teams with remote repositories and professional workflows.">
                                Preparado para trabajar en equipo con repositorios remotos y flujos profesionales.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `}createPart3Content(){return`
            <div class="max-w-6xl mx-auto">
                <h2 class="text-3xl font-bold mb-8 text-center" style="color: var(--text);" 
                    data-lang-es="Parte III: El Ecosistema Ampliado - Plataformas y Estrategias Avanzadas" 
                    data-lang-en="Part III: The Broader Ecosystem - Platforms and Advanced Strategies">
                    Parte III: El Ecosistema Ampliado - Plataformas y Estrategias Avanzadas
                </h2>
                
                <!-- Introduction -->
                <div class="educational-intro mb-12">
                    <p class="text-lg leading-relaxed" 
                       data-lang-es="El dominio del control de versiones se extiende más allá de la línea de comandos de Git para incluir plataformas de hospedaje y flujos de trabajo profesionales." 
                       data-lang-en="Mastery of version control extends beyond the Git command line to include hosting platforms and professional workflows.">
                        El dominio del control de versiones se extiende más allá de la línea de comandos de Git para incluir plataformas de hospedaje y flujos de trabajo profesionales.
                    </p>
                </div>

                <!-- Section 6: Platform Landscape -->
                <section class="mb-16">
                    <h3 class="text-2xl font-semibold mb-8 section-header" 
                        data-lang-es="Sección 6: El Panorama de las Plataformas de Control de Versiones" 
                        data-lang-en="Section 6: The Landscape of Version Control Platforms">
                        <i class="ph-cloud mr-3" style="color: var(--primary);"></i>
                        Sección 6: El Panorama de las Plataformas de Control de Versiones
                    </h3>

                    <!-- Interactive Platform Comparison -->
                    <div class="interactive-component mb-12">
                        <div class="component-header">
                            <h4 class="text-xl font-semibold" 
                                data-lang-es="🏛️ Comparador Interactivo de Plataformas" 
                                data-lang-en="🏛️ Interactive Platform Comparison">
                                🏛️ Comparador Interactivo de Plataformas
                            </h4>
                            <p class="mt-2" 
                               data-lang-es="Explora las diferencias entre GitHub, GitLab, Bitbucket y plataformas auto-hospedadas." 
                               data-lang-en="Explore the differences between GitHub, GitLab, Bitbucket, and self-hosted platforms.">
                                Explora las diferencias entre GitHub, GitLab, Bitbucket y plataformas auto-hospedadas.
                            </p>
                        </div>
                        <platform-comparison-tool></platform-comparison-tool>
                    </div>

                    <!-- The Titans Comparison -->
                    <div class="educational-section">
                        <h4 class="text-xl font-semibold mb-6" 
                            data-lang-es="6.1 Los Titanes: Análisis Comparativo de GitHub, GitLab y Bitbucket" 
                            data-lang-en="6.1 The Titans: A Comparative Analysis of GitHub, GitLab, and Bitbucket">
                            6.1 Los Titanes: Análisis Comparativo de GitHub, GitLab y Bitbucket
                        </h4>
                        
                        <div class="platform-analysis-grid">
                            <div class="platform-analysis-card github">
                                <div class="platform-header">
                                    <i class="ph-github-logo text-4xl"></i>
                                    <h5 class="platform-name">GitHub</h5>
                                </div>
                                <div class="platform-details">
                                    <div class="detail-section">
                                        <h6 data-lang-es="Enfoque Principal" data-lang-en="Primary Focus">Enfoque Principal</h6>
                                        <p data-lang-es="Colaboración de código abierto, experiencia del desarrollador y un gran ecosistema." 
                                           data-lang-en="Open-source collaboration, developer experience, and a large ecosystem.">
                                            Colaboración de código abierto, experiencia del desarrollador y un gran ecosistema.
                                        </p>
                                    </div>
                                    <div class="detail-section">
                                        <h6>CI/CD</h6>
                                        <p><strong>GitHub Actions</strong>: Altamente flexible, modular, con un vasto marketplace de acciones comunitarias.</p>
                                    </div>
                                    <div class="detail-section">
                                        <h6 data-lang-es="Diferenciador Clave" data-lang-en="Key Differentiator">Diferenciador Clave</h6>
                                        <p data-lang-es="La comunidad de desarrolladores más grande, asistente AI Copilot, y marketplace extensivo." 
                                           data-lang-en="The largest developer community, Copilot AI assistant, and extensive marketplace.">
                                            La comunidad de desarrolladores más grande, asistente AI Copilot, y marketplace extensivo.
                                        </p>
                                    </div>
                                    <div class="detail-section">
                                        <h6 data-lang-es="Usuario Ideal" data-lang-en="Ideal User">Usuario Ideal</h6>
                                        <p data-lang-es="Proyectos de código abierto, desarrolladores individuales y equipos de todos los tamaños que buscan flexibilidad." 
                                           data-lang-en="Open-source projects, individual developers, and teams of all sizes seeking flexibility.">
                                            Proyectos de código abierto, desarrolladores individuales y equipos de todos los tamaños que buscan flexibilidad.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div class="platform-analysis-card gitlab">
                                <div class="platform-header">
                                    <i class="ph-gitlab-logo-simple text-4xl"></i>
                                    <h5 class="platform-name">GitLab</h5>
                                </div>
                                <div class="platform-details">
                                    <div class="detail-section">
                                        <h6 data-lang-es="Enfoque Principal" data-lang-en="Primary Focus">Enfoque Principal</h6>
                                        <p data-lang-es="Una plataforma DevSecOps única y completa con características estrechamente integradas." 
                                           data-lang-en="A single, all-in-one DevSecOps platform with tightly integrated features.">
                                            Una plataforma DevSecOps única y completa con características estrechamente integradas.
                                        </p>
                                    </div>
                                    <div class="detail-section">
                                        <h6>CI/CD</h6>
                                        <p><strong>GitLab CI/CD</strong>: Poderoso, maduro y estrechamente integrado en la plataforma. Incluye características Auto DevOps.</p>
                                    </div>
                                    <div class="detail-section">
                                        <h6 data-lang-es="Diferenciador Clave" data-lang-en="Key Differentiator">Diferenciador Clave</h6>
                                        <p data-lang-es="Plataforma DevOps completa con características fuertes de seguridad y operaciones integradas." 
                                           data-lang-en="A complete, single-application DevOps platform with strong, built-in security and ops features.">
                                            Plataforma DevOps completa con características fuertes de seguridad y operaciones integradas.
                                        </p>
                                    </div>
                                    <div class="detail-section">
                                        <h6 data-lang-es="Usuario Ideal" data-lang-en="Ideal User">Usuario Ideal</h6>
                                        <p data-lang-es="Equipos que desean una solución DevOps completa lista para usar, especialmente con necesidades de auto-hospedaje." 
                                           data-lang-en="Teams wanting a comprehensive, out-of-the-box DevOps solution, especially with self-hosting needs.">
                                            Equipos que desean una solución DevOps completa lista para usar, especialmente con necesidades de auto-hospedaje.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div class="platform-analysis-card bitbucket">
                                <div class="platform-header">
                                    <i class="ph-git-branch text-4xl"></i>
                                    <h5 class="platform-name">Bitbucket</h5>
                                </div>
                                <div class="platform-details">
                                    <div class="detail-section">
                                        <h6 data-lang-es="Enfoque Principal" data-lang-en="Primary Focus">Enfoque Principal</h6>
                                        <p data-lang-es="Equipos empresariales, repositorios privados e integración profunda con la suite Atlassian." 
                                           data-lang-en="Enterprise teams, private repositories, and deep integration with the Atlassian suite.">
                                            Equipos empresariales, repositorios privados e integración profunda con la suite Atlassian.
                                        </p>
                                    </div>
                                    <div class="detail-section">
                                        <h6>CI/CD</h6>
                                        <p><strong>Bitbucket Pipelines</strong>: CI/CD integrado que se integra bien con la plataforma y Jira.</p>
                                    </div>
                                    <div class="detail-section">
                                        <h6 data-lang-es="Diferenciador Clave" data-lang-en="Key Differentiator">Diferenciador Clave</h6>
                                        <p data-lang-es="Integración perfecta con Jira y otros productos Atlassian." 
                                           data-lang-en="Seamless integration with Jira and other Atlassian products.">
                                            Integración perfecta con Jira y otros productos Atlassian.
                                        </p>
                                    </div>
                                    <div class="detail-section">
                                        <h6 data-lang-es="Usuario Ideal" data-lang-en="Ideal User">Usuario Ideal</h6>
                                        <p data-lang-es="Organizaciones fuertemente invertidas en el ecosistema Atlassian, particularmente aquellas que usan Jira." 
                                           data-lang-en="Organizations heavily invested in the Atlassian ecosystem, particularly those using Jira.">
                                            Organizaciones fuertemente invertidas en el ecosistema Atlassian, particularmente aquellas que usan Jira.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Self-Hosted Solutions -->
                        <div class="self-hosted-section mt-12">
                            <h5 class="text-lg font-semibold mb-6" 
                                data-lang-es="6.2 La Frontera Auto-Hospedada: Gitea, Gogs y SourceHut para Control y Privacidad" 
                                data-lang-en="6.2 The Self-Hosted Frontier: Gitea, Gogs, and SourceHut for Control and Privacy">
                                6.2 La Frontera Auto-Hospedada: Gitea, Gogs y SourceHut para Control y Privacidad
                            </h5>
                            
                            <div class="self-hosted-grid">
                                <div class="self-hosted-card">
                                    <h6 class="font-semibold">Gogs</h6>
                                    <p class="text-sm" 
                                       data-lang-es="Servicio Git extremadamente ligero y fácil de configurar, perfecto para individuos o equipos pequeños." 
                                       data-lang-en="An extremely lightweight and easy-to-set-up Git service, perfect for individuals or small teams.">
                                        Servicio Git extremadamente ligero y fácil de configurar, perfecto para individuos o equipos pequeños.
                                    </p>
                                </div>
                                <div class="self-hosted-card">
                                    <h6 class="font-semibold">Gitea</h6>
                                    <p class="text-sm" 
                                       data-lang-es="Fork comunitario de Gogs, más rico en características, incluyendo registro de paquetes y sistema CI/CD compatible con GitHub Actions." 
                                       data-lang-en="A community fork of Gogs, Gitea is more feature-rich, including a package registry and a CI/CD system compatible with GitHub Actions.">
                                        Fork comunitario de Gogs, más rico en características, incluyendo registro de paquetes y sistema CI/CD compatible con GitHub Actions.
                                    </p>
                                </div>
                                <div class="self-hosted-card">
                                    <h6 class="font-semibold">SourceHut</h6>
                                    <p class="text-sm" 
                                       data-lang-es="Suite de herramientas que prioriza simplicidad, privacidad y flujo de trabajo tradicional basado en email." 
                                       data-lang-en="A suite of tools prioritizing simplicity, privacy, and a traditional, email-driven workflow.">
                                        Suite de herramientas que prioriza simplicidad, privacidad y flujo de trabajo tradicional basado en email.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Section 7: Advanced Workflows -->
                <section class="mb-16">
                    <h3 class="text-2xl font-semibold mb-8 section-header" 
                        data-lang-es="Sección 7: Flujos de Trabajo Avanzados y Prácticas Profesionales" 
                        data-lang-en="Section 7: Advanced Workflows and Professional Practices">
                        <i class="ph-flow-arrow mr-3" style="color: var(--secondary);"></i>
                        Sección 7: Flujos de Trabajo Avanzados y Prácticas Profesionales
                    </h3>

                    <!-- Interactive CI/CD Pipeline -->
                    <div class="interactive-component mb-12">
                        <div class="component-header">
                            <h4 class="text-xl font-semibold" 
                                data-lang-es="⚙️ Visualizador de Pipeline CI/CD" 
                                data-lang-en="⚙️ CI/CD Pipeline Visualizer">
                                ⚙️ Visualizador de Pipeline CI/CD
                            </h4>
                            <p class="mt-2" 
                               data-lang-es="Comprende cómo funciona la integración y despliegue continuo con GitHub Actions." 
                               data-lang-en="Understand how continuous integration and deployment works with GitHub Actions.">
                                Comprende cómo funciona la integración y despliegue continuo con GitHub Actions.
                            </p>
                        </div>
                        <cicd-pipeline-visualizer></cicd-pipeline-visualizer>
                    </div>

                    <!-- Branching Strategies -->
                    <div class="educational-section">
                        <h4 class="text-xl font-semibold mb-6" 
                            data-lang-es="7.1 Modelos de Ramificación Estratégicos: GitFlow, GitHub Flow y Desarrollo Basado en Trunk" 
                            data-lang-en="7.1 Strategic Branching Models: GitFlow, GitHub Flow, and Trunk-Based Development">
                            7.1 Modelos de Ramificación Estratégicos: GitFlow, GitHub Flow y Desarrollo Basado en Trunk
                        </h4>
                        
                        <div class="branching-models-grid">
                            <div class="model-card gitflow">
                                <div class="model-header">
                                    <h5 class="font-semibold">GitFlow</h5>
                                    <span class="complexity-badge high" 
                                          data-lang-es="Complejidad: Alta" 
                                          data-lang-en="Complexity: High">Complejidad: Alta</span>
                                </div>
                                <div class="model-visual">
                                    <code>main → develop → feature<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↘ release → hotfix</code>
                                </div>
                                <div class="model-details">
                                    <p><strong data-lang-es="Ciclo de Lanzamiento" data-lang-en="Release Cycle">Ciclo de Lanzamiento:</strong> 
                                       <span data-lang-es="Estructurado, lanzamientos programados (ej. v1.0, v1.1)" 
                                             data-lang-en="Structured, scheduled releases (e.g., v1.0, v1.1)">
                                           Estructurado, lanzamientos programados (ej. v1.0, v1.1)
                                       </span>
                                    </p>
                                    <p><strong data-lang-es="Caso de Uso Ideal" data-lang-en="Ideal Use Case">Caso de Uso Ideal:</strong> 
                                       <span data-lang-es="Proyectos con lanzamientos formales y versionados (ej. software de escritorio)" 
                                             data-lang-en="Projects with formal, versioned releases (e.g., desktop software)">
                                           Proyectos con lanzamientos formales y versionados (ej. software de escritorio)
                                       </span>
                                    </p>
                                </div>
                            </div>

                            <div class="model-card github-flow">
                                <div class="model-header">
                                    <h5 class="font-semibold">GitHub Flow</h5>
                                    <span class="complexity-badge low" 
                                          data-lang-es="Complejidad: Baja" 
                                          data-lang-en="Complexity: Low">Complejidad: Baja</span>
                                </div>
                                <div class="model-visual">
                                    <code>main<br>&nbsp;&nbsp;↘ feature → PR → merge</code>
                                </div>
                                <div class="model-details">
                                    <p><strong data-lang-es="Ciclo de Lanzamiento" data-lang-en="Release Cycle">Ciclo de Lanzamiento:</strong> 
                                       <span data-lang-es="Continuo; lanzamientos después de merge a main" 
                                             data-lang-en="Continuous; releases happen any time after a merge to main">
                                           Continuo; lanzamientos después de merge a main
                                       </span>
                                    </p>
                                    <p><strong data-lang-es="Caso de Uso Ideal" data-lang-en="Ideal Use Case">Caso de Uso Ideal:</strong> 
                                       <span data-lang-es="Aplicaciones web y servicios desplegados frecuentemente" 
                                             data-lang-en="Web applications and services deployed frequently">
                                           Aplicaciones web y servicios desplegados frecuentemente
                                       </span>
                                    </p>
                                </div>
                            </div>

                            <div class="model-card trunk-based">
                                <div class="model-header">
                                    <h5 class="font-semibold">Trunk-Based</h5>
                                    <span class="complexity-badge very-low" 
                                          data-lang-es="Complejidad: Muy Baja" 
                                          data-lang-en="Complexity: Very Low">Complejidad: Muy Baja</span>
                                </div>
                                <div class="model-visual">
                                    <code>trunk (siempre desplegable)<br>&nbsp;&nbsp;commits directos</code>
                                </div>
                                <div class="model-details">
                                    <p><strong data-lang-es="Ciclo de Lanzamiento" data-lang-en="Release Cycle">Ciclo de Lanzamiento:</strong> 
                                       <span data-lang-es="Continuo; trunk siempre listo para despliegue" 
                                             data-lang-en="Continuous; the trunk is always releasable">
                                           Continuo; trunk siempre listo para despliegue
                                       </span>
                                    </p>
                                    <p><strong data-lang-es="Caso de Uso Ideal" data-lang-en="Ideal Use Case">Caso de Uso Ideal:</strong> 
                                       <span data-lang-es="Proyectos de alta velocidad practicando CI/CD" 
                                             data-lang-en="High-velocity projects practicing CI/CD">
                                           Proyectos de alta velocidad practicando CI/CD
                                       </span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="evolution-note mt-8">
                            <p class="italic" 
                               data-lang-es="La evolución desde modelos complejos como GitFlow hacia otros más simples como TBD refleja una tendencia de la industria hacia despliegues más rápidos y automatizados." 
                               data-lang-en="The evolution from complex models like GitFlow to simpler ones like TBD reflects a broader industry trend towards more rapid, automated deployment.">
                                La evolución desde modelos complejos como GitFlow hacia otros más simples como TBD refleja una tendencia de la industria hacia despliegues más rápidos y automatizados.
                            </p>
                        </div>
                    </div>

                    <!-- GitHub Pages Section -->
                    <div class="educational-section mt-12">
                        <h4 class="text-xl font-semibold mb-6" 
                            data-lang-es="7.3 Hospedaje y Despliegue: Una Introducción a GitHub Pages" 
                            data-lang-en="7.3 Hosting and Deployment: A Primer on GitHub Pages">
                            7.3 Hospedaje y Despliegue: Una Introducción a GitHub Pages
                        </h4>
                        
                        <div class="github-pages-guide">
                            <p class="mb-6" 
                               data-lang-es="GitHub Pages proporciona una forma simple y gratuita de hospedar sitios web estáticos directamente desde un repositorio GitHub." 
                               data-lang-en="GitHub Pages provides a simple and free way to host static websites directly from a GitHub repository.">
                                GitHub Pages proporciona una forma simple y gratuita de hospedar sitios web estáticos directamente desde un repositorio GitHub.
                            </p>
                            
                            <div class="deployment-steps">
                                <div class="step-card">
                                    <span class="step-number">1</span>
                                    <div class="step-content">
                                        <h6 data-lang-es="Crear Repositorio" data-lang-en="Create Repository">Crear Repositorio</h6>
                                        <p data-lang-es="Crear un repositorio público llamado 'tu-usuario.github.io'" 
                                           data-lang-en="Create a public GitHub repository named 'your-username.github.io'">
                                            Crear un repositorio público llamado 'tu-usuario.github.io'
                                        </p>
                                    </div>
                                </div>
                                <div class="step-card">
                                    <span class="step-number">2</span>
                                    <div class="step-content">
                                        <h6 data-lang-es="Crear Archivo HTML" data-lang-en="Create HTML File">Crear Archivo HTML</h6>
                                        <p data-lang-es="Crear un archivo 'index.html' en la raíz del repositorio" 
                                           data-lang-en="Create an 'index.html' file in the root of this repository">
                                            Crear un archivo 'index.html' en la raíz del repositorio
                                        </p>
                                    </div>
                                </div>
                                <div class="step-card">
                                    <span class="step-number">3</span>
                                    <div class="step-content">
                                        <h6 data-lang-es="Configurar Pages" data-lang-en="Configure Pages">Configurar Pages</h6>
                                        <p data-lang-es="En la configuración del repositorio, establecer la fuente desde la rama 'main'" 
                                           data-lang-en="In the repository's settings under 'Pages', ensure the source is set to deploy from the 'main' branch">
                                            En la configuración del repositorio, establecer la fuente desde la rama 'main'
                                        </p>
                                    </div>
                                </div>
                                <div class="step-card">
                                    <span class="step-number">4</span>
                                    <div class="step-content">
                                        <h6 data-lang-es="Sitio Activo" data-lang-en="Live Site">Sitio Activo</h6>
                                        <p data-lang-es="El sitio estará disponible en https://tu-usuario.github.io" 
                                           data-lang-en="The website will be live at https://your-username.github.io">
                                            El sitio estará disponible en https://tu-usuario.github.io
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Summary -->
                <div class="ecosystem-summary mt-12">
                    <h3 class="text-2xl font-semibold mb-6" 
                        data-lang-es="🚀 Dominando el Ecosistema Profesional" 
                        data-lang-en="🚀 Mastering the Professional Ecosystem">
                        🚀 Dominando el Ecosistema Profesional
                    </h3>
                    <div class="summary-grid">
                        <div class="summary-card">
                            <i class="ph-buildings text-3xl mb-4" style="color: var(--primary);"></i>
                            <h4 class="font-semibold" 
                                data-lang-es="Plataformas de Hospedaje" 
                                data-lang-en="Hosting Platforms">
                                Plataformas de Hospedaje
                            </h4>
                            <p data-lang-es="Comprende las diferencias entre GitHub, GitLab, Bitbucket y soluciones auto-hospedadas." 
                               data-lang-en="Understand the differences between GitHub, GitLab, Bitbucket, and self-hosted solutions.">
                                Comprende las diferencias entre GitHub, GitLab, Bitbucket y soluciones auto-hospedadas.
                            </p>
                        </div>
                        <div class="summary-card">
                            <i class="ph-flow-arrow text-3xl mb-4" style="color: var(--secondary);"></i>
                            <h4 class="font-semibold" 
                                data-lang-es="Estrategias de Ramificación" 
                                data-lang-en="Branching Strategies">
                                Estrategias de Ramificación
                            </h4>
                            <p data-lang-es="Domina GitFlow, GitHub Flow y desarrollo basado en trunk para diferentes tipos de proyectos." 
                               data-lang-en="Master GitFlow, GitHub Flow, and trunk-based development for different project types.">
                                Domina GitFlow, GitHub Flow y desarrollo basado en trunk para diferentes tipos de proyectos.
                            </p>
                        </div>
                        <div class="summary-card">
                            <i class="ph-gear text-3xl mb-4" style="color: var(--accent);"></i>
                            <h4 class="font-semibold" 
                                data-lang-es="Automatización CI/CD" 
                                data-lang-en="CI/CD Automation">
                                Automatización CI/CD
                            </h4>
                            <p data-lang-es="Implementa pipelines de integración y despliegue continuo con GitHub Actions y otras herramientas." 
                               data-lang-en="Implement continuous integration and deployment pipelines with GitHub Actions and other tools.">
                                Implementa pipelines de integración y despliegue continuo con GitHub Actions y otras herramientas.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `}createPart4Content(){return`
            <div class="max-w-6xl mx-auto">
                <h2 class="text-3xl font-bold mb-8 text-center" style="color: var(--text);" 
                    data-lang-es="Parte IV: Pedagogía Inclusiva para el Aprendizaje de Control de Versiones"
                    data-lang-en="Part IV: Inclusive Pedagogy for Version Control Learning">
                    Parte IV: Pedagogía Inclusiva para el Aprendizaje de Control de Versiones
                </h2>
                
                <!-- Interactive Accessibility Toolkit -->
                <div class="interactive-component mb-12">
                    <accessibility-toolkit></accessibility-toolkit>
                </div>

                <!-- UDL Framework Implementation -->
                <div class="udl-framework-section mb-12">
                    <h3 class="text-2xl font-bold mb-6" style="color: var(--primary);"
                        data-lang-es="Principios de Diseño Universal para el Aprendizaje (UDL)"
                        data-lang-en="Universal Design for Learning (UDL) Principles">
                        Principios de Diseño Universal para el Aprendizaje (UDL)
                    </h3>
                    
                    <div class="udl-principles-grid">
                        <div class="udl-principle-card representation">
                            <div class="principle-icon">
                                <i class="ph-eye" style="color: var(--primary);"></i>
                            </div>
                            <h4 class="principle-title" 
                                data-lang-es="Múltiples Formas de Representación" 
                                data-lang-en="Multiple Means of Representation">
                                Múltiples Formas de Representación
                            </h4>
                            <p class="principle-subtitle" 
                                data-lang-es="El 'QUÉ' del aprendizaje"
                                data-lang-en="The 'WHAT' of learning">
                                El 'QUÉ' del aprendizaje
                            </p>
                            <div class="principle-content">
                                <div class="strategy-item">
                                    <strong data-lang-es="Visualización Interactiva:" data-lang-en="Interactive Visualization:">Visualización Interactiva:</strong>
                                    <span data-lang-es="Gráficos dinámicos, diagramas de flujo, y simulaciones de Git que permiten a los estudiantes ver los conceptos abstractos en acción."
                                          data-lang-en="Dynamic graphics, flowcharts, and Git simulations that allow students to see abstract concepts in action.">
                                        Gráficos dinámicos, diagramas de flujo, y simulaciones de Git que permiten a los estudiantes ver los conceptos abstractos en acción.
                                    </span>
                                </div>
                                <div class="strategy-item">
                                    <strong data-lang-es="Contenido Multimodal:" data-lang-en="Multimodal Content:">Contenido Multimodal:</strong>
                                    <span data-lang-es="Combinación de texto, audio, video, y elementos interactivos para abordar diferentes estilos de procesamiento de información."
                                          data-lang-en="Combination of text, audio, video, and interactive elements to address different information processing styles.">
                                        Combinación de texto, audio, video, y elementos interactivos para abordar diferentes estilos de procesamiento de información.
                                    </span>
                                </div>
                                <div class="strategy-item">
                                    <strong data-lang-es="Progresión Gradual:" data-lang-en="Gradual Progression:">Progresión Gradual:</strong>
                                    <span data-lang-es="Información presentada en capas, desde conceptos básicos hasta aplicaciones avanzadas, permitiendo diferentes puntos de entrada."
                                          data-lang-en="Information presented in layers, from basic concepts to advanced applications, allowing different entry points.">
                                        Información presentada en capas, desde conceptos básicos hasta aplicaciones avanzadas, permitiendo diferentes puntos de entrada.
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div class="udl-principle-card engagement">
                            <div class="principle-icon">
                                <i class="ph-heart" style="color: var(--secondary);"></i>
                            </div>
                            <h4 class="principle-title" 
                                data-lang-es="Múltiples Formas de Participación" 
                                data-lang-en="Multiple Means of Engagement">
                                Múltiples Formas de Participación
                            </h4>
                            <p class="principle-subtitle" 
                                data-lang-es="El 'POR QUÉ' del aprendizaje"
                                data-lang-en="The 'WHY' of learning">
                                El 'POR QUÉ' del aprendizaje
                            </p>
                            <div class="principle-content">
                                <div class="strategy-item">
                                    <strong data-lang-es="Aprendizaje Basado en Proyectos:" data-lang-en="Project-Based Learning:">Aprendizaje Basado en Proyectos:</strong>
                                    <span data-lang-es="Proyectos auténticos y significativos como crear un portafolio personal, colaborar en código abierto, o desarrollar una aplicación."
                                          data-lang-en="Authentic and meaningful projects like creating a personal portfolio, collaborating on open source, or developing an application.">
                                        Proyectos auténticos y significativos como crear un portafolio personal, colaborar en código abierto, o desarrollar una aplicación.
                                    </span>
                                </div>
                                <div class="strategy-item">
                                    <strong data-lang-es="Gamificación Apropiada:" data-lang-en="Appropriate Gamification:">Gamificación Apropiada:</strong>
                                    <span data-lang-es="Elementos de juego como badges, progress tracking, y desafíos opcionales que motivan sin crear ansiedad."
                                          data-lang-en="Game elements like badges, progress tracking, and optional challenges that motivate without creating anxiety.">
                                        Elementos de juego como badges, progress tracking, y desafíos opcionales que motivan sin crear ansiedad.
                                    </span>
                                </div>
                                <div class="strategy-item">
                                    <strong data-lang-es="Elección y Autonomía:" data-lang-en="Choice and Autonomy:">Elección y Autonomía:</strong>
                                    <span data-lang-es="Opciones en temas de proyectos, herramientas preferidas (GUI vs CLI), y ritmo de aprendizaje."
                                          data-lang-en="Choices in project topics, preferred tools (GUI vs CLI), and learning pace.">
                                        Opciones en temas de proyectos, herramientas preferidas (GUI vs CLI), y ritmo de aprendizaje.
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div class="udl-principle-card expression">
                            <div class="principle-icon">
                                <i class="ph-hand-waving" style="color: var(--success);"></i>
                            </div>
                            <h4 class="principle-title" 
                                data-lang-es="Múltiples Formas de Acción y Expresión" 
                                data-lang-en="Multiple Means of Action and Expression">
                                Múltiples Formas de Acción y Expresión
                            </h4>
                            <p class="principle-subtitle" 
                                data-lang-es="El 'CÓMO' del aprendizaje"
                                data-lang-en="The 'HOW' of learning">
                                El 'CÓMO' del aprendizaje
                            </p>
                            <div class="principle-content">
                                <div class="strategy-item">
                                    <strong data-lang-es="Múltiples Herramientas:" data-lang-en="Multiple Tools:">Múltiples Herramientas:</strong>
                                    <span data-lang-es="Variedad de interfaces (GUI, línea de comandos, IDE integrations) para acomodar diferentes preferencias y necesidades."
                                          data-lang-en="Variety of interfaces (GUI, command line, IDE integrations) to accommodate different preferences and needs.">
                                        Variedad de interfaces (GUI, línea de comandos, IDE integrations) para acomodar diferentes preferencias y necesidades.
                                    </span>
                                </div>
                                <div class="strategy-item">
                                    <strong data-lang-es="Scaffolding Flexible:" data-lang-en="Flexible Scaffolding:">Scaffolding Flexible:</strong>
                                    <span data-lang-es="Soporte estructural que se puede ajustar o remover gradualmente según el progreso individual."
                                          data-lang-en="Structural support that can be adjusted or gradually removed based on individual progress.">
                                        Soporte estructural que se puede ajustar o remover gradualmente según el progreso individual.
                                    </span>
                                </div>
                                <div class="strategy-item">
                                    <strong data-lang-es="Evaluación Diversa:" data-lang-en="Diverse Assessment:">Evaluación Diversa:</strong>
                                    <span data-lang-es="Opciones de demostrar conocimiento a través de proyectos, presentaciones, documentación, o contribuciones colaborativas."
                                          data-lang-en="Options to demonstrate knowledge through projects, presentations, documentation, or collaborative contributions.">
                                        Opciones de demostrar conocimiento a través de proyectos, presentaciones, documentación, o contribuciones colaborativas.
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Neurodiversity-Affirming Learning Strategies -->
                <div class="neurodiversity-section mb-12">
                    <h3 class="text-2xl font-bold mb-6" style="color: var(--secondary);"
                        data-lang-es="Estrategias de Aprendizaje que Afirman la Neurodiversidad"
                        data-lang-en="Neurodiversity-Affirming Learning Strategies">
                        Estrategias de Aprendizaje que Afirman la Neurodiversidad
                    </h3>

                    <div class="neurodiversity-strategies-grid">
                        <div class="strategy-card executive-function">
                            <div class="strategy-icon">
                                <i class="ph-brain" style="color: var(--primary);"></i>
                            </div>
                            <h4 class="strategy-title"
                                data-lang-es="Soporte para Función Ejecutiva"
                                data-lang-en="Executive Function Support">
                                Soporte para Función Ejecutiva
                            </h4>
                            <div class="strategy-content">
                                <div class="support-item">
                                    <strong data-lang-es="Estructuración Clara:" data-lang-en="Clear Structure:">Estructuración Clara:</strong>
                                    <p data-lang-es="Cada sesión de aprendizaje tiene un inicio, desarrollo y cierre claramente definidos con objetivos explícitos."
                                       data-lang-en="Each learning session has clearly defined beginning, development, and closure with explicit objectives.">
                                        Cada sesión de aprendizaje tiene un inicio, desarrollo y cierre claramente definidos con objetivos explícitos.
                                    </p>
                                </div>
                                <div class="support-item">
                                    <strong data-lang-es="Listas de Verificación:" data-lang-en="Checklists:">Listas de Verificación:</strong>
                                    <p data-lang-es="Templates y checklists para workflows de Git que reducen la carga cognitiva y previenen errores."
                                       data-lang-en="Templates and checklists for Git workflows that reduce cognitive load and prevent errors.">
                                        Templates y checklists para workflows de Git que reducen la carga cognitiva y previenen errores.
                                    </p>
                                </div>
                                <div class="support-item">
                                    <strong data-lang-es="Progreso Visual:" data-lang-en="Visual Progress:">Progreso Visual:</strong>
                                    <p data-lang-es="Indicadores de progreso claros y celebración de pequeños logros para mantener la motivación."
                                       data-lang-en="Clear progress indicators and celebration of small achievements to maintain motivation.">
                                        Indicadores de progreso claros y celebración de pequeños logros para mantener la motivación.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="strategy-card sensory-processing">
                            <div class="strategy-icon">
                                <i class="ph-eye-closed" style="color: var(--secondary);"></i>
                            </div>
                            <h4 class="strategy-title"
                                data-lang-es="Consideraciones Sensoriales"
                                data-lang-en="Sensory Considerations">
                                Consideraciones Sensoriales
                            </h4>
                            <div class="strategy-content">
                                <div class="support-item">
                                    <strong data-lang-es="Control de Estimulación:" data-lang-en="Stimulation Control:">Control de Estimulación:</strong>
                                    <p data-lang-es="Opciones para reducir animaciones, sonidos, o elementos visuales que puedan ser abrumadores."
                                       data-lang-en="Options to reduce animations, sounds, or visual elements that might be overwhelming.">
                                        Opciones para reducir animaciones, sonidos, o elementos visuales que puedan ser abrumadores.
                                    </p>
                                </div>
                                <div class="support-item">
                                    <strong data-lang-es="Personalización Visual:" data-lang-en="Visual Customization:">Personalización Visual:</strong>
                                    <p data-lang-es="Temas de alto contraste, ajuste de tamaño de fuente, y opciones de color que respeten diferentes sensibilidades."
                                       data-lang-en="High contrast themes, font size adjustment, and color options that respect different sensitivities.">
                                        Temas de alto contraste, ajuste de tamaño de fuente, y opciones de color que respeten diferentes sensibilidades.
                                    </p>
                                </div>
                                <div class="support-item">
                                    <strong data-lang-es="Pausas Regulares:" data-lang-en="Regular Breaks:">Pausas Regulares:</strong>
                                    <p data-lang-es="Recordatorios integrados para tomar descansos y técnicas de autorregulación."
                                       data-lang-en="Integrated reminders to take breaks and self-regulation techniques.">
                                        Recordatorios integrados para tomar descansos y técnicas de autorregulación.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="strategy-card social-communication">
                            <div class="strategy-icon">
                                <i class="ph-users-three" style="color: var(--success);"></i>
                            </div>
                            <h4 class="strategy-title"
                                data-lang-es="Comunicación Social Estructurada"
                                data-lang-en="Structured Social Communication">
                                Comunicación Social Estructurada
                            </h4>
                            <div class="strategy-content">
                                <div class="support-item">
                                    <strong data-lang-es="Roles Definidos:" data-lang-en="Defined Roles:">Roles Definidos:</strong>
                                    <p data-lang-es="En colaboraciones, roles claros como 'Reviewer', 'Author', 'Maintainer' que definen expectativas específicas."
                                       data-lang-en="In collaborations, clear roles like 'Reviewer', 'Author', 'Maintainer' that define specific expectations.">
                                        En colaboraciones, roles claros como 'Reviewer', 'Author', 'Maintainer' que definen expectativas específicas.
                                    </p>
                                </div>
                                <div class="support-item">
                                    <strong data-lang-es="Templates de Comunicación:" data-lang-en="Communication Templates:">Templates de Comunicación:</strong>
                                    <p data-lang-es="Plantillas para Pull Requests, Issues, y Code Reviews que estructuran la comunicación técnica."
                                       data-lang-en="Templates for Pull Requests, Issues, and Code Reviews that structure technical communication.">
                                        Plantillas para Pull Requests, Issues, y Code Reviews que estructuran la comunicación técnica.
                                    </p>
                                </div>
                                <div class="support-item">
                                    <strong data-lang-es="Comunicación Asíncrona:" data-lang-en="Asynchronous Communication:">Comunicación Asíncrona:</strong>
                                    <p data-lang-es="Énfasis en Pull Requests y documentation que permite procesamiento reflexivo sin presión social inmediata."
                                       data-lang-en="Emphasis on Pull Requests and documentation that allows reflective processing without immediate social pressure.">
                                        Énfasis en Pull Requests y documentation que permite procesamiento reflexivo sin presión social inmediata.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Learning Style Support Matrix -->
                <div class="learning-styles-section mb-12">
                    <h3 class="text-2xl font-bold mb-6" style="color: var(--primary);"
                        data-lang-es="Matriz de Soporte para Diferentes Estilos de Aprendizaje"
                        data-lang-en="Support Matrix for Different Learning Styles">
                        Matriz de Soporte para Diferentes Estilos de Aprendizaje
                    </h3>
                    
                    <div class="learning-styles-table">
                        <div class="table-header">
                            <div class="header-cell" data-lang-es="Necesidad/Estilo de Aprendizaje" data-lang-en="Learning Need/Style">Necesidad/Estilo de Aprendizaje</div>
                            <div class="header-cell" data-lang-es="Herramienta/Estrategia Recomendada" data-lang-en="Recommended Tool/Strategy">Herramienta/Estrategia Recomendada</div>
                            <div class="header-cell" data-lang-es="Cómo Ayuda" data-lang-en="How It Helps">Cómo Ayuda</div>
                        </div>
                        
                        <div class="table-row visual-learner">
                            <div class="cell learning-style">
                                <strong data-lang-es="Aprendiz Visual" data-lang-en="Visual Learner">Aprendiz Visual</strong>
                                <span class="icon">👁️</span>
                            </div>
                            <div class="cell tools">
                                <span class="tool-tag" data-lang-es="Learn Git Branching" data-lang-en="Learn Git Branching">Learn Git Branching</span>
                                <span class="tool-tag" data-lang-es="GUI Clients" data-lang-en="GUI Clients">GUI Clients</span>
                                <span class="tool-tag" data-lang-es="Visual Cheat Sheets" data-lang-en="Visual Cheat Sheets">Visual Cheat Sheets</span>
                            </div>
                            <div class="cell rationale">
                                <span data-lang-es="Proporciona visualización directa de estructuras abstractas, haciendo concretos los efectos de los comandos."
                                      data-lang-en="Provides direct visualization of abstract structures, making command effects concrete.">
                                    Proporciona visualización directa de estructuras abstractas, haciendo concretos los efectos de los comandos.
                                </span>
                            </div>
                        </div>

                        <div class="table-row kinesthetic-learner">
                            <div class="cell learning-style">
                                <strong data-lang-es="Aprendiz Kinestésico" data-lang-en="Kinesthetic Learner">Aprendiz Kinestésico</strong>
                                <span class="icon">🤲</span>
                            </div>
                            <div class="cell tools">
                                <span class="tool-tag" data-lang-es="Aprendizaje Basado en Proyectos" data-lang-en="Project-Based Learning">Aprendizaje Basado en Proyectos</span>
                                <span class="tool-tag" data-lang-es="Tutoriales Interactivos" data-lang-en="Interactive Tutorials">Tutoriales Interactivos</span>
                                <span class="tool-tag" data-lang-es="Code-Along Sessions" data-lang-en="Code-Along Sessions">Code-Along Sessions</span>
                            </div>
                            <div class="cell rationale">
                                <span data-lang-es="Refuerza el aprendizaje mediante participación activa y repetición. La forma más efectiva es aprendiendo haciendo."
                                      data-lang-en="Reinforces learning through active participation and repetition. The most effective way is learning by doing.">
                                    Refuerza el aprendizaje mediante participación activa y repetición. La forma más efectiva es aprendiendo haciendo.
                                </span>
                            </div>
                        </div>

                        <div class="table-row structured-learner">
                            <div class="cell learning-style">
                                <strong data-lang-es="Necesita Estructura" data-lang-en="Needs Structure">Necesita Estructura</strong>
                                <span class="icon">📋</span>
                            </div>
                            <div class="cell tools">
                                <span class="tool-tag" data-lang-es="Enfoque GUI-Primero" data-lang-en="GUI-First Approach">Enfoque GUI-Primero</span>
                                <span class="tool-tag" data-lang-es="Integración IDE" data-lang-en="IDE Integration">Integración IDE</span>
                                <span class="tool-tag" data-lang-es="Templates PR/Issue" data-lang-en="PR/Issue Templates">Templates PR/Issue</span>
                            </div>
                            <div class="cell rationale">
                                <span data-lang-es="Reduce la carga cognitiva proporcionando pistas visuales, minimizando el cambio de contexto."
                                      data-lang-en="Reduces cognitive load by providing visual cues, minimizing context switching.">
                                    Reduce la carga cognitiva proporcionando pistas visuales, minimizando el cambio de contexto.
                                </span>
                            </div>
                        </div>

                        <div class="table-row anxiety-feedback">
                            <div class="cell learning-style">
                                <strong data-lang-es="Ansiedad con Feedback" data-lang-en="Anxiety with Feedback">Ansiedad con Feedback</strong>
                                <span class="icon">😰</span>
                            </div>
                            <div class="cell tools">
                                <span class="tool-tag" data-lang-es="Code Review Estructurado" data-lang-en="Structured Code Review">Code Review Estructurado</span>
                                <span class="tool-tag" data-lang-es="Comunicación Asíncrona" data-lang-en="Asynchronous Communication">Comunicación Asíncrona</span>
                                <span class="tool-tag" data-lang-es="Roles Definidos" data-lang-en="Defined Roles">Roles Definidos</span>
                            </div>
                            <div class="cell rationale">
                                <span data-lang-es="Proporciona reglas claras para la interacción, reduciendo la ambigüedad social."
                                      data-lang-en="Provides clear rules for interaction, reducing social ambiguity.">
                                    Proporciona reglas claras para la interacción, reduciendo la ambigüedad social.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Project-Based Learning Progression -->
                <div class="project-progression-section mb-12">
                    <h3 class="text-2xl font-bold mb-6" style="color: var(--success);"
                        data-lang-es="Progresión de Aprendizaje Basado en Proyectos"
                        data-lang-en="Project-Based Learning Progression">
                        Progresión de Aprendizaje Basado en Proyectos
                    </h3>

                    <div class="project-timeline">
                        <div class="project-phase phase-1">
                            <div class="phase-number">1</div>
                            <div class="phase-content">
                                <h4 class="phase-title" 
                                    data-lang-es="Proyecto 1: Fundamentos Locales" 
                                    data-lang-en="Project 1: Local Basics">
                                    Proyecto 1: Fundamentos Locales
                                </h4>
                                <p class="phase-description"
                                   data-lang-es="Crear un sitio web de portafolio personal usando git init, git add, y git commit para rastrear el progreso localmente."
                                   data-lang-en="Create a personal portfolio website using git init, git add, and git commit to track progress locally.">
                                    Crear un sitio web de portafolio personal usando git init, git add, y git commit para rastrear el progreso localmente.
                                </p>
                                <div class="phase-skills">
                                    <span class="skill-tag" data-lang-es="Inicialización de repositorio" data-lang-en="Repository initialization">Inicialización de repositorio</span>
                                    <span class="skill-tag" data-lang-es="Staging y commits" data-lang-en="Staging and commits">Staging y commits</span>
                                    <span class="skill-tag" data-lang-es="Historial básico" data-lang-en="Basic history">Historial básico</span>
                                </div>
                            </div>
                        </div>

                        <div class="project-phase phase-2">
                            <div class="phase-number">2</div>
                            <div class="phase-content">
                                <h4 class="phase-title" 
                                    data-lang-es="Proyecto 2: Branching Local" 
                                    data-lang-en="Project 2: Local Branching">
                                    Proyecto 2: Branching Local
                                </h4>
                                <p class="phase-description"
                                   data-lang-es="Agregar una nueva sección al portafolio en una rama de funcionalidad y fusionarla de vuelta a main."
                                   data-lang-en="Add a new section to the portfolio on a feature branch and merge it back to main.">
                                    Agregar una nueva sección al portafolio en una rama de funcionalidad y fusionarla de vuelta a main.
                                </p>
                                <div class="phase-skills">
                                    <span class="skill-tag" data-lang-es="Creación de ramas" data-lang-en="Branch creation">Creación de ramas</span>
                                    <span class="skill-tag" data-lang-es="Switching y merging" data-lang-en="Switching and merging">Switching y merging</span>
                                    <span class="skill-tag" data-lang-es="Resolución de conflictos básica" data-lang-en="Basic conflict resolution">Resolución de conflictos básica</span>
                                </div>
                            </div>
                        </div>

                        <div class="project-phase phase-3">
                            <div class="phase-number">3</div>
                            <div class="phase-content">
                                <h4 class="phase-title" 
                                    data-lang-es="Proyecto 3: Remoto y Despliegue" 
                                    data-lang-en="Project 3: Remote and Deployment">
                                    Proyecto 3: Remoto y Despliegue
                                </h4>
                                <p class="phase-description"
                                   data-lang-es="Push del portafolio a GitHub y desplegarlo en vivo usando GitHub Pages."
                                   data-lang-en="Push the portfolio to GitHub and deploy it live using GitHub Pages.">
                                    Push del portafolio a GitHub y desplegarlo en vivo usando GitHub Pages.
                                </p>
                                <div class="phase-skills">
                                    <span class="skill-tag" data-lang-es="Repositorios remotos" data-lang-en="Remote repositories">Repositorios remotos</span>
                                    <span class="skill-tag" data-lang-es="Push y pull" data-lang-en="Push and pull">Push y pull</span>
                                    <span class="skill-tag" data-lang-es="Despliegue automatizado" data-lang-en="Automated deployment">Despliegue automatizado</span>
                                </div>
                            </div>
                        </div>

                        <div class="project-phase phase-4">
                            <div class="phase-number">4</div>
                            <div class="phase-content">
                                <h4 class="phase-title" 
                                    data-lang-es="Proyecto 4: Colaboración" 
                                    data-lang-en="Project 4: Collaboration">
                                    Proyecto 4: Colaboración
                                </h4>
                                <p class="phase-description"
                                   data-lang-es="En pares, hacer fork del repositorio de un compañero, agregar una nueva funcionalidad, y abrir un Pull Request."
                                   data-lang-en="In pairs, fork a classmate's repository, add a new feature, and open a Pull Request.">
                                    En pares, hacer fork del repositorio de un compañero, agregar una nueva funcionalidad, y abrir un Pull Request.
                                </p>
                                <div class="phase-skills">
                                    <span class="skill-tag" data-lang-es="Forking y cloning" data-lang-en="Forking and cloning">Forking y cloning</span>
                                    <span class="skill-tag" data-lang-es="Pull Requests" data-lang-en="Pull Requests">Pull Requests</span>
                                    <span class="skill-tag" data-lang-es="Code review colaborativo" data-lang-en="Collaborative code review">Code review colaborativo</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Accessibility Features Implementation -->
                <div class="accessibility-implementation-section mb-12">
                    <h3 class="text-2xl font-bold mb-6" style="color: var(--primary);"
                        data-lang-es="Implementación de Características de Accesibilidad"
                        data-lang-en="Accessibility Features Implementation">
                        Implementación de Características de Accesibilidad
                    </h3>

                    <div class="accessibility-features-grid">
                        <div class="accessibility-feature keyboard-navigation">
                            <div class="feature-icon">
                                <i class="ph-keyboard" style="color: var(--primary);"></i>
                            </div>
                            <h4 class="feature-title"
                                data-lang-es="Navegación por Teclado Completa"
                                data-lang-en="Full Keyboard Navigation">
                                Navegación por Teclado Completa
                            </h4>
                            <ul class="feature-list">
                                <li data-lang-es="Tab y Shift+Tab para navegación secuencial" data-lang-en="Tab and Shift+Tab for sequential navigation">Tab y Shift+Tab para navegación secuencial</li>
                                <li data-lang-es="Enter y Space para activar controles" data-lang-en="Enter and Space to activate controls">Enter y Space para activar controles</li>
                                <li data-lang-es="Atajos de teclado personalizables" data-lang-en="Customizable keyboard shortcuts">Atajos de teclado personalizables</li>
                                <li data-lang-es="Indicadores de foco visibles" data-lang-en="Visible focus indicators">Indicadores de foco visibles</li>
                            </ul>
                        </div>

                        <div class="accessibility-feature screen-reader">
                            <div class="feature-icon">
                                <i class="ph-megaphone-simple" style="color: var(--secondary);"></i>
                            </div>
                            <h4 class="feature-title"
                                data-lang-es="Compatibilidad con Lectores de Pantalla"
                                data-lang-en="Screen Reader Compatibility">
                                Compatibilidad con Lectores de Pantalla
                            </h4>
                            <ul class="feature-list">
                                <li data-lang-es="Etiquetas ARIA apropiadas" data-lang-en="Appropriate ARIA labels">Etiquetas ARIA apropiadas</li>
                                <li data-lang-es="Estructura semántica HTML" data-lang-en="Semantic HTML structure">Estructura semántica HTML</li>
                                <li data-lang-es="Descripciones de contenido visual" data-lang-en="Visual content descriptions">Descripciones de contenido visual</li>
                                <li data-lang-es="Anuncios de cambios de estado" data-lang-en="State change announcements">Anuncios de cambios de estado</li>
                            </ul>
                        </div>

                        <div class="accessibility-feature visual-customization">
                            <div class="feature-icon">
                                <i class="ph-palette" style="color: var(--success);"></i>
                            </div>
                            <h4 class="feature-title"
                                data-lang-es="Personalización Visual"
                                data-lang-en="Visual Customization">
                                Personalización Visual
                            </h4>
                            <ul class="feature-list">
                                <li data-lang-es="Temas de alto contraste" data-lang-en="High contrast themes">Temas de alto contraste</li>
                                <li data-lang-es="Ajuste de tamaño de fuente" data-lang-en="Font size adjustment">Ajuste de tamaño de fuente</li>
                                <li data-lang-es="Reducción de movimiento" data-lang-en="Reduced motion">Reducción de movimiento</li>
                                <li data-lang-es="Esquemas de color personalizables" data-lang-en="Customizable color schemes">Esquemas de color personalizables</li>
                            </ul>
                        </div>

                        <div class="accessibility-feature cognitive-support">
                            <div class="feature-icon">
                                <i class="ph-brain" style="color: var(--warning);"></i>
                            </div>
                            <h4 class="feature-title"
                                data-lang-es="Soporte Cognitivo"
                                data-lang-en="Cognitive Support">
                                Soporte Cognitivo
                            </h4>
                            <ul class="feature-list">
                                <li data-lang-es="Instrucciones paso a paso claras" data-lang-en="Clear step-by-step instructions">Instrucciones paso a paso claras</li>
                                <li data-lang-es="Indicadores de progreso visual" data-lang-en="Visual progress indicators">Indicadores de progreso visual</li>
                                <li data-lang-es="Funcionalidad de deshacer/rehacer" data-lang-en="Undo/redo functionality">Funcionalidad de deshacer/rehacer</li>
                                <li data-lang-es="Recordatorios y ayudas contextuales" data-lang-en="Reminders and contextual help">Recordatorios y ayudas contextuales</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Interactive Learning Style Assessment -->
                <div class="interactive-component mb-12">
                    <learning-style-assessment></learning-style-assessment>
                </div>

                <!-- Conclusion and Implementation Guide -->
                <div class="conclusion-section">
                    <h3 class="text-2xl font-bold mb-6" style="color: var(--primary);"
                        data-lang-es="Conclusión: Implementando Pedagogía Inclusiva"
                        data-lang-en="Conclusion: Implementing Inclusive Pedagogy">
                        Conclusión: Implementando Pedagogía Inclusiva
                    </h3>

                    <div class="conclusion-content">
                        <p class="conclusion-text"
                           data-lang-es="La maestría del control de versiones es una piedra angular de la educación moderna en ciencias de la computación. El enfoque óptimo es uno que es multimodal, gradual, y profundamente considerado de los diversos estilos cognitivos presentes en cualquier aula."
                           data-lang-en="The mastery of version control is a cornerstone of modern computer science education. The optimal approach is one that is multimodal, scaffolded, and deeply considerate of the diverse cognitive styles present in any classroom.">
                            La maestría del control de versiones es una piedra angular de la educación moderna en ciencias de la computación. El enfoque óptimo es uno que es multimodal, gradual, y profundamente considerado de los diversos estilos cognitivos presentes en cualquier aula.
                        </p>

                        <div class="key-recommendations">
                            <h4 class="recommendations-title"
                                data-lang-es="Recomendaciones Clave:"
                                data-lang-en="Key Recommendations:">
                                Recomendaciones Clave:
                            </h4>
                            <ul class="recommendations-list">
                                <li data-lang-es="Construir una base conceptual sólida primero: Asegurar que los estudiantes entiendan el 'por qué' antes del 'cómo'."
                                    data-lang-en="Build a strong conceptual foundation first: Ensure students understand the 'why' before the 'how'.">
                                    <strong>Construir una base conceptual sólida primero:</strong> Asegurar que los estudiantes entiendan el "por qué" antes del "cómo".
                                </li>
                                <li data-lang-es="Adoptar un enfoque GUI-Primero, CLI-Después: Usar clientes visuales como andamiaje pedagógico."
                                    data-lang-en="Embrace a GUI-First, CLI-Later approach: Use visual clients as pedagogical scaffolding.">
                                    <strong>Adoptar un enfoque GUI-Primero, CLI-Después:</strong> Usar clientes visuales como andamiaje pedagógico.
                                </li>
                                <li data-lang-es="Aprovechar herramientas visuales e interactivas: Hacer herramientas como Learn Git Branching centrales al currículo."
                                    data-lang-en="Leverage visual and interactive tools: Make tools like Learn Git Branching central to the curriculum.">
                                    <strong>Aprovechar herramientas visuales e interactivas:</strong> Hacer herramientas como Learn Git Branching centrales al currículo.
                                </li>
                                <li data-lang-es="Integrar el aprendizaje en el IDE: Enseñar Git dentro de un IDE moderno para reducir la carga cognitiva."
                                    data-lang-en="Integrate learning into the IDE: Teach Git within a modern IDE to reduce cognitive load.">
                                    <strong>Integrar el aprendizaje en el IDE:</strong> Enseñar Git dentro de un IDE moderno para reducir la carga cognitiva.
                                </li>
                                <li data-lang-es="Estructurar todo: Usar templates, checklists y roles definidos para apoyar el funcionamiento ejecutivo."
                                    data-lang-en="Structure everything: Use templates, checklists, and defined roles to support executive functioning.">
                                    <strong>Estructurar todo:</strong> Usar templates, checklists y roles definidos para apoyar el funcionamiento ejecutivo.
                                </li>
                                <li data-lang-es="Basar el aprendizaje en la práctica: Centrar el currículo alrededor de proyectos tangibles y motivadores."
                                    data-lang-en="Ground learning in practice: Center the curriculum around tangible, motivating projects.">
                                    <strong>Basar el aprendizaje en la práctica:</strong> Centrar el currículo alrededor de proyectos tangibles y motivadores.
                                </li>
                            </ul>
                        </div>

                        <div class="final-message">
                            <p data-lang-es="Al adoptar este marco inclusivo y basado en evidencia, los educadores pueden empoderar a todos los estudiantes para convertirse en colaboradores seguros y competentes en el mundo del desarrollo de software."
                               data-lang-en="By adopting this inclusive and evidence-based framework, educators can empower all students to become confident and competent collaborators in the world of software development.">
                                Al adoptar este marco inclusivo y basado en evidencia, los educadores pueden empoderar a todos los estudiantes para convertirse en colaboradores seguros y competentes en el mundo del desarrollo de software.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `}handleKeyboardShortcuts(e){if(!(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"))switch(e.key){case"1":this.navigation.navigateToSection("hero");break;case"2":this.navigation.navigateToSection("part1");break;case"3":this.navigation.navigateToSection("part2");break;case"4":this.navigation.navigateToSection("part3");break;case"5":this.navigation.navigateToSection("part4");break;case"h":this.showKeyboardShortcuts();break;case"p":this.showProgressOverview();break;case"t":this.theme.toggleTheme();break;case"l":this.language.toggleLanguage();break}}startLearningJourney(){this.analytics.trackAction("start_learning"),this.navigation.navigateToSection("part1"),this.showNotification("¡Bienvenido! Comencemos tu viaje de aprendizaje.","success")}showProgressOverview(){this.analytics.trackAction("view_progress");const e=this.progress.getProgressSummary(),a=this.createProgressModal(e);document.body.appendChild(a),setTimeout(()=>{a.parentNode&&a.parentNode.removeChild(a)},1e4)}createProgressModal(e){const a=document.createElement("div");return a.className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",a.innerHTML=`
            <div class="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full mx-4">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-xl font-semibold">Tu Progreso</h3>
                    <button class="close-modal p-1 rounded">
                        <i class="ph-x text-xl"></i>
                    </button>
                </div>
                <div class="space-y-4">
                    <div class="progress-bar-container">
                        <div class="flex justify-between text-sm mb-1">
                            <span>Progreso General</span>
                            <span>${e.overall}%</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2">
                            <div class="bg-blue-600 h-2 rounded-full" style="width: ${e.overall}%"></div>
                        </div>
                    </div>
                    ${e.sections.map(t=>`
                        <div class="section-progress">
                            <div class="flex justify-between text-sm mb-1">
                                <span>${t.title}</span>
                                <span>${t.progress}%</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-1">
                                <div class="bg-green-600 h-1 rounded-full" style="width: ${t.progress}%"></div>
                            </div>
                        </div>
                    `).join("")}
                </div>
            </div>
        `,a.addEventListener("click",t=>{(t.target===a||t.target.closest(".close-modal"))&&a.remove()}),a}showNotification(e,a="info"){const t=document.createElement("div");t.className=`notification notification-${a}`,t.innerHTML=`
            <div class="flex items-center gap-2">
                <i class="ph-${a==="success"?"check-circle":"info"} text-xl"></i>
                <span>${e}</span>
            </div>
        `,document.body.appendChild(t),setTimeout(()=>{t.style.transform="translateX(100%)",setTimeout(()=>t.remove(),300)},3e3)}showKeyboardShortcuts(){const e=[{key:"1-5",action:"Navegar a secciones"},{key:"H",action:"Mostrar ayuda"},{key:"P",action:"Ver progreso"},{key:"T",action:"Cambiar tema"},{key:"L",action:"Cambiar idioma"}],a=document.createElement("div");a.className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",a.innerHTML=`
            <div class="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full mx-4">
                <h3 class="text-xl font-semibold mb-4">Atajos de Teclado</h3>
                <div class="space-y-2">
                    ${e.map(t=>`
                        <div class="flex justify-between">
                            <kbd class="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">${t.key}</kbd>
                            <span>${t.action}</span>
                        </div>
                    `).join("")}
                </div>
                <button class="mt-4 w-full btn btn-primary" onclick="this.closest('.fixed').remove()">
                    Cerrar
                </button>
            </div>
        `,document.body.appendChild(a)}handleInitializationError(e){const a=document.createElement("div");a.className="error-container fixed inset-0 flex items-center justify-center bg-red-50 dark:bg-red-900",a.innerHTML=`
            <div class="text-center p-8">
                <i class="ph-warning text-6xl text-red-500 mb-4"></i>
                <h2 class="text-2xl font-bold mb-2">Error de Inicialización</h2>
                <p class="text-gray-600 dark:text-gray-300 mb-4">
                    No se pudo inicializar la aplicación correctamente.
                </p>
                <button onclick="window.location.reload()" class="btn btn-primary">
                    Recargar Página
                </button>
            </div>
        `,document.body.appendChild(a)}}document.addEventListener("DOMContentLoaded",async()=>{const i=new Ke;window.gitPedagogyApp=i,await i.init()});window.addEventListener("error",i=>{i.filename&&i.filename.includes(".js")&&console.error("Failed to load module:",i.filename)});export{N as B,_ as a,Ee as i,Re as x};
//# sourceMappingURL=index-DmWaINwU.js.map
