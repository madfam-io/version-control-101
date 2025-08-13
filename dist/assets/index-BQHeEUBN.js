var pe=Object.defineProperty;var ue=(i,e,t)=>e in i?pe(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var v=(i,e,t)=>ue(i,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(a){if(a.ep)return;a.ep=!0;const n=t(a);fetch(a.href,n)}})();const ge="modulepreload",ve=function(i){return"/"+i},J={},S=function(e,t,s){let a=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),r=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));a=Promise.allSettled(t.map(c=>{if(c=ve(c),c in J)return;J[c]=!0;const d=c.endsWith(".css"),h=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${h}`))return;const l=document.createElement("link");if(l.rel=d?"stylesheet":ge,d||(l.as="script"),l.crossOrigin="",l.href=c,r&&l.setAttribute("nonce",r),document.head.appendChild(l),d)return new Promise((p,u)=>{l.addEventListener("load",p),l.addEventListener("error",()=>u(new Error(`Unable to preload CSS for ${c}`)))})}))}function n(o){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=o,window.dispatchEvent(r),!r.defaultPrevented)throw o}return a.then(o=>{for(const r of o||[])r.status==="rejected"&&n(r.reason);return e().catch(n)})},O={ui:{currentSection:"hero",theme:"auto",language:"es",loading:!1,error:null},progress:{sections:{},activities:{},completionRate:0,lastUpdated:null},components:{dragDrop:{},branchSimulator:{},collaborationSim:{},terminal:{},comparisons:{}},preferences:{autoSave:!0,animations:!0,soundEffects:!1,keyboardShortcuts:!0,highContrast:!1},analytics:{sessionStart:null,pageViews:{},interactions:[],timeSpent:{}}},g={SET_CURRENT_SECTION:"SET_CURRENT_SECTION",SET_THEME:"SET_THEME",SET_LANGUAGE:"SET_LANGUAGE",SET_LOADING:"SET_LOADING",SET_ERROR:"SET_ERROR",UPDATE_PROGRESS:"UPDATE_PROGRESS",COMPLETE_ACTIVITY:"COMPLETE_ACTIVITY",UPDATE_COMPONENT_STATE:"UPDATE_COMPONENT_STATE",UPDATE_PREFERENCES:"UPDATE_PREFERENCES",TRACK_INTERACTION:"TRACK_INTERACTION",TRACK_TIME_SPENT:"TRACK_TIME_SPENT"},fe={[g.SET_CURRENT_SECTION]:(i,e)=>({...i,ui:{...i.ui,currentSection:e.payload.section}}),[g.SET_THEME]:(i,e)=>({...i,ui:{...i.ui,theme:e.payload.theme}}),[g.SET_LANGUAGE]:(i,e)=>({...i,ui:{...i.ui,language:e.payload.language}}),[g.SET_LOADING]:(i,e)=>({...i,ui:{...i.ui,loading:e.payload.loading}}),[g.SET_ERROR]:(i,e)=>({...i,ui:{...i.ui,error:e.payload.error}}),[g.UPDATE_PROGRESS]:(i,e)=>{const{section:t,activity:s,completed:a}=e.payload,n={...i.progress,sections:{...i.progress.sections,[t]:{...i.progress.sections[t],[s]:a}},lastUpdated:Date.now()};return n.completionRate=be(n),{...i,progress:n}},[g.COMPLETE_ACTIVITY]:(i,e)=>{const{activityId:t,data:s}=e.payload;return{...i,progress:{...i.progress,activities:{...i.progress.activities,[t]:{completed:!0,completedAt:Date.now(),data:s}}}}},[g.UPDATE_COMPONENT_STATE]:(i,e)=>{const{componentId:t,state:s}=e.payload;return{...i,components:{...i.components,[t]:{...i.components[t],...s}}}},[g.UPDATE_PREFERENCES]:(i,e)=>({...i,preferences:{...i.preferences,...e.payload}}),[g.TRACK_INTERACTION]:(i,e)=>({...i,analytics:{...i.analytics,interactions:[...i.analytics.interactions,e.payload]}}),[g.TRACK_TIME_SPENT]:(i,e)=>{const{section:t,timeSpent:s}=e.payload;return{...i,analytics:{...i.analytics,timeSpent:{...i.analytics.timeSpent,[t]:(i.analytics.timeSpent[t]||0)+s}}}}};function be(i){const e=Object.values(i.sections).reduce((s,a)=>s+Object.keys(a).length,0),t=Object.values(i.sections).reduce((s,a)=>s+Object.values(a).filter(Boolean).length,0);return e>0?Math.round(t/e*100):0}class ye{constructor(){this.state={...O},this.listeners=new Map,this.middleware=[],this.isHydrated=!1}async init(){await this.loadPersistedState(),this.setupAutoSave(),this.state.analytics.sessionStart=Date.now(),console.log("🏪 State Manager initialized")}dispatch(e,t={}){const s={type:e,payload:t};for(const n of this.middleware)n(s,this.state);const a=fe[e];if(a){const n=a(this.state,s);this.setState(n)}else console.warn(`No reducer found for action type: ${e}`);this.notifyListeners(e,t)}subscribe(e,t){return this.listeners.has(e)||this.listeners.set(e,[]),this.listeners.get(e).push(t),()=>{const s=this.listeners.get(e);if(s){const a=s.indexOf(t);a>-1&&s.splice(a,1)}}}getState(){return{...this.state}}getStateSlice(e){return e.split(".").reduce((t,s)=>t&&t[s],this.state)}setState(e){this.state=e,this.state.preferences.autoSave&&this.saveState()}use(e){this.middleware.push(e)}notifyListeners(e,t){const s=this.listeners.get(e);s&&s.forEach(a=>{try{a(t)}catch(n){console.error("Error in state listener:",n)}})}async loadPersistedState(){var e,t;try{const s=localStorage.getItem("gitPedagogy:state");if(s){const a=JSON.parse(s);this.state={...O,...a,ui:{...O.ui,theme:((e=a.ui)==null?void 0:e.theme)||"auto",language:((t=a.ui)==null?void 0:t.language)||"es"}},this.isHydrated=!0,console.log("💾 State hydrated from localStorage")}}catch(s){console.warn("Failed to load persisted state:",s)}}saveState(){try{const e={...this.state,ui:{theme:this.state.ui.theme,language:this.state.ui.language}};localStorage.setItem("gitPedagogy:state",JSON.stringify(e))}catch(e){console.warn("Failed to save state:",e)}}setupAutoSave(){setInterval(()=>{this.state.preferences.autoSave&&this.saveState()},3e4),window.addEventListener("beforeunload",()=>{this.saveState()})}reset(){this.state={...O},localStorage.removeItem("gitPedagogy:state"),this.notifyListeners("STATE_RESET",{})}exportState(){return JSON.stringify(this.state,null,2)}importState(e){try{const t=JSON.parse(e);this.setState(t),console.log("State imported successfully")}catch(t){console.error("Failed to import state:",t)}}}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const z=globalThis,V=z.ShadowRoot&&(z.ShadyCSS===void 0||z.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,K=Symbol(),Y=new WeakMap;let re=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==K)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(V&&e===void 0){const s=t!==void 0&&t.length===1;s&&(e=Y.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&Y.set(t,e))}return e}toString(){return this.cssText}};const we=i=>new re(typeof i=="string"?i:i+"",void 0,K),Ee=(i,...e)=>{const t=i.length===1?i[0]:e.reduce((s,a,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+i[n+1],i[0]);return new re(t,i,K)},xe=(i,e)=>{if(V)i.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const s=document.createElement("style"),a=z.litNonce;a!==void 0&&s.setAttribute("nonce",a),s.textContent=t.cssText,i.appendChild(s)}},Q=V?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return we(t)})(i):i;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Se,defineProperty:Ce,getOwnPropertyDescriptor:Te,getOwnPropertyNames:Ae,getOwnPropertySymbols:$e,getPrototypeOf:Pe}=Object,b=globalThis,X=b.trustedTypes,_e=X?X.emptyScript:"",U=b.reactiveElementPolyfillSupport,P=(i,e)=>i,G={toAttribute(i,e){switch(e){case Boolean:i=i?_e:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let t=i;switch(e){case Boolean:t=i!==null;break;case Number:t=i===null?null:Number(i);break;case Object:case Array:try{t=JSON.parse(i)}catch{t=null}}return t}},ce=(i,e)=>!Se(i,e),Z={attribute:!0,type:String,converter:G,reflect:!1,useDefault:!1,hasChanged:ce};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),b.litPropertyMetadata??(b.litPropertyMetadata=new WeakMap);let C=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Z){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const s=Symbol(),a=this.getPropertyDescriptor(e,s,t);a!==void 0&&Ce(this.prototype,e,a)}}static getPropertyDescriptor(e,t,s){const{get:a,set:n}=Te(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get:a,set(o){const r=a==null?void 0:a.call(this);n==null||n.call(this,o),this.requestUpdate(e,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Z}static _$Ei(){if(this.hasOwnProperty(P("elementProperties")))return;const e=Pe(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(P("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(P("properties"))){const t=this.properties,s=[...Ae(t),...$e(t)];for(const a of s)this.createProperty(a,t[a])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[s,a]of t)this.elementProperties.set(s,a)}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const a=this._$Eu(t,s);a!==void 0&&this._$Eh.set(a,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const a of s)t.unshift(Q(a))}else e!==void 0&&t.push(Q(e));return t}static _$Eu(e,t){const s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return xe(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var s;return(s=t.hostConnected)==null?void 0:s.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var s;return(s=t.hostDisconnected)==null?void 0:s.call(t)})}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){var n;const s=this.constructor.elementProperties.get(e),a=this.constructor._$Eu(e,s);if(a!==void 0&&s.reflect===!0){const o=(((n=s.converter)==null?void 0:n.toAttribute)!==void 0?s.converter:G).toAttribute(t,s.type);this._$Em=e,o==null?this.removeAttribute(a):this.setAttribute(a,o),this._$Em=null}}_$AK(e,t){var n,o;const s=this.constructor,a=s._$Eh.get(e);if(a!==void 0&&this._$Em!==a){const r=s.getPropertyOptions(a),c=typeof r.converter=="function"?{fromAttribute:r.converter}:((n=r.converter)==null?void 0:n.fromAttribute)!==void 0?r.converter:G;this._$Em=a;const d=c.fromAttribute(t,r.type);this[a]=d??((o=this._$Ej)==null?void 0:o.get(a))??d,this._$Em=null}}requestUpdate(e,t,s){var a;if(e!==void 0){const n=this.constructor,o=this[e];if(s??(s=n.getPropertyOptions(e)),!((s.hasChanged??ce)(o,t)||s.useDefault&&s.reflect&&o===((a=this._$Ej)==null?void 0:a.get(e))&&!this.hasAttribute(n._$Eu(e,s))))return;this.C(e,t,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:a,wrapped:n},o){s&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,o??t??this[e]),n!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),a===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}const a=this.constructor.elementProperties;if(a.size>0)for(const[n,o]of a){const{wrapped:r}=o,c=this[n];r!==!0||this._$AL.has(n)||c===void 0||this.C(n,void 0,o,c)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(s=this._$EO)==null||s.forEach(a=>{var n;return(n=a.hostUpdate)==null?void 0:n.call(a)}),this.update(t)):this._$EM()}catch(a){throw e=!1,this._$EM(),a}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(s=>{var a;return(a=s.hostUpdated)==null?void 0:a.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};C.elementStyles=[],C.shadowRootOptions={mode:"open"},C[P("elementProperties")]=new Map,C[P("finalized")]=new Map,U==null||U({ReactiveElement:C}),(b.reactiveElementVersions??(b.reactiveElementVersions=[])).push("2.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const _=globalThis,j=_.trustedTypes,ee=j?j.createPolicy("lit-html",{createHTML:i=>i}):void 0,le="$lit$",f=`lit$${Math.random().toFixed(9).slice(2)}$`,de="?"+f,ke=`<${de}>`,x=document,L=()=>x.createComment(""),I=i=>i===null||typeof i!="object"&&typeof i!="function",W=Array.isArray,Le=i=>W(i)||typeof(i==null?void 0:i[Symbol.iterator])=="function",B=`[ 	
\f\r]`,$=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,te=/-->/g,se=/>/g,y=RegExp(`>|${B}(?:([^\\s"'>=/]+)(${B}*=${B}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ae=/'/g,ie=/"/g,he=/^(?:script|style|textarea|title)$/i,Ie=i=>(e,...t)=>({_$litType$:i,strings:e,values:t}),Re=Ie(1),T=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),ne=new WeakMap,w=x.createTreeWalker(x,129);function me(i,e){if(!W(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return ee!==void 0?ee.createHTML(e):e}const De=(i,e)=>{const t=i.length-1,s=[];let a,n=e===2?"<svg>":e===3?"<math>":"",o=$;for(let r=0;r<t;r++){const c=i[r];let d,h,l=-1,p=0;for(;p<c.length&&(o.lastIndex=p,h=o.exec(c),h!==null);)p=o.lastIndex,o===$?h[1]==="!--"?o=te:h[1]!==void 0?o=se:h[2]!==void 0?(he.test(h[2])&&(a=RegExp("</"+h[2],"g")),o=y):h[3]!==void 0&&(o=y):o===y?h[0]===">"?(o=a??$,l=-1):h[1]===void 0?l=-2:(l=o.lastIndex-h[2].length,d=h[1],o=h[3]===void 0?y:h[3]==='"'?ie:ae):o===ie||o===ae?o=y:o===te||o===se?o=$:(o=y,a=void 0);const u=o===y&&i[r+1].startsWith("/>")?" ":"";n+=o===$?c+ke:l>=0?(s.push(d),c.slice(0,l)+le+c.slice(l)+f+u):c+f+(l===-2?r:u)}return[me(i,n+(i[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]};class R{constructor({strings:e,_$litType$:t},s){let a;this.parts=[];let n=0,o=0;const r=e.length-1,c=this.parts,[d,h]=De(e,t);if(this.el=R.createElement(d,s),w.currentNode=this.el.content,t===2||t===3){const l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(a=w.nextNode())!==null&&c.length<r;){if(a.nodeType===1){if(a.hasAttributes())for(const l of a.getAttributeNames())if(l.endsWith(le)){const p=h[o++],u=a.getAttribute(l).split(f),M=/([.?@])?(.*)/.exec(p);c.push({type:1,index:n,name:M[2],strings:u,ctor:M[1]==="."?Oe:M[1]==="?"?ze:M[1]==="@"?je:N}),a.removeAttribute(l)}else l.startsWith(f)&&(c.push({type:6,index:n}),a.removeAttribute(l));if(he.test(a.tagName)){const l=a.textContent.split(f),p=l.length-1;if(p>0){a.textContent=j?j.emptyScript:"";for(let u=0;u<p;u++)a.append(l[u],L()),w.nextNode(),c.push({type:2,index:++n});a.append(l[p],L())}}}else if(a.nodeType===8)if(a.data===de)c.push({type:2,index:n});else{let l=-1;for(;(l=a.data.indexOf(f,l+1))!==-1;)c.push({type:7,index:n}),l+=f.length-1}n++}}static createElement(e,t){const s=x.createElement("template");return s.innerHTML=e,s}}function A(i,e,t=i,s){var o,r;if(e===T)return e;let a=s!==void 0?(o=t._$Co)==null?void 0:o[s]:t._$Cl;const n=I(e)?void 0:e._$litDirective$;return(a==null?void 0:a.constructor)!==n&&((r=a==null?void 0:a._$AO)==null||r.call(a,!1),n===void 0?a=void 0:(a=new n(i),a._$AT(i,t,s)),s!==void 0?(t._$Co??(t._$Co=[]))[s]=a:t._$Cl=a),a!==void 0&&(e=A(i,a._$AS(i,e.values),a,s)),e}class Me{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:s}=this._$AD,a=((e==null?void 0:e.creationScope)??x).importNode(t,!0);w.currentNode=a;let n=w.nextNode(),o=0,r=0,c=s[0];for(;c!==void 0;){if(o===c.index){let d;c.type===2?d=new D(n,n.nextSibling,this,e):c.type===1?d=new c.ctor(n,c.name,c.strings,this,e):c.type===6&&(d=new Ne(n,this,e)),this._$AV.push(d),c=s[++r]}o!==(c==null?void 0:c.index)&&(n=w.nextNode(),o++)}return w.currentNode=x,a}p(e){let t=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class D{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,s,a){this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=a,this._$Cv=(a==null?void 0:a.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=A(this,e,t),I(e)?e===m||e==null||e===""?(this._$AH!==m&&this._$AR(),this._$AH=m):e!==this._$AH&&e!==T&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Le(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==m&&I(this._$AH)?this._$AA.nextSibling.data=e:this.T(x.createTextNode(e)),this._$AH=e}$(e){var n;const{values:t,_$litType$:s}=e,a=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=R.createElement(me(s.h,s.h[0]),this.options)),s);if(((n=this._$AH)==null?void 0:n._$AD)===a)this._$AH.p(t);else{const o=new Me(a,this),r=o.u(this.options);o.p(t),this.T(r),this._$AH=o}}_$AC(e){let t=ne.get(e.strings);return t===void 0&&ne.set(e.strings,t=new R(e)),t}k(e){W(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,a=0;for(const n of e)a===t.length?t.push(s=new D(this.O(L()),this.O(L()),this,this.options)):s=t[a],s._$AI(n),a++;a<t.length&&(this._$AR(s&&s._$AB.nextSibling,a),t.length=a)}_$AR(e=this._$AA.nextSibling,t){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,t);e!==this._$AB;){const a=e.nextSibling;e.remove(),e=a}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class N{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,a,n){this.type=1,this._$AH=m,this._$AN=void 0,this.element=e,this.name=t,this._$AM=a,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=m}_$AI(e,t=this,s,a){const n=this.strings;let o=!1;if(n===void 0)e=A(this,e,t,0),o=!I(e)||e!==this._$AH&&e!==T,o&&(this._$AH=e);else{const r=e;let c,d;for(e=n[0],c=0;c<n.length-1;c++)d=A(this,r[s+c],t,c),d===T&&(d=this._$AH[c]),o||(o=!I(d)||d!==this._$AH[c]),d===m?e=m:e!==m&&(e+=(d??"")+n[c+1]),this._$AH[c]=d}o&&!a&&this.j(e)}j(e){e===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Oe extends N{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===m?void 0:e}}class ze extends N{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==m)}}class je extends N{constructor(e,t,s,a,n){super(e,t,s,a,n),this.type=5}_$AI(e,t=this){if((e=A(this,e,t,0)??m)===T)return;const s=this._$AH,a=e===m&&s!==m||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,n=e!==m&&(s===m||a);a&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class Ne{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){A(this,e)}}const H=_.litHtmlPolyfillSupport;H==null||H(R,D),(_.litHtmlVersions??(_.litHtmlVersions=[])).push("3.3.1");const Ue=(i,e,t)=>{const s=(t==null?void 0:t.renderBefore)??e;let a=s._$litPart$;if(a===void 0){const n=(t==null?void 0:t.renderBefore)??null;s._$litPart$=a=new D(e.insertBefore(L(),n),n,void 0,t??{})}return a._$AI(i),a};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const E=globalThis;class k extends C{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ue(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return T}}var oe;k._$litElement$=!0,k.finalized=!0,(oe=E.litElementHydrateSupport)==null||oe.call(E,{LitElement:k});const F=E.litElementPolyfillSupport;F==null||F({LitElement:k});(E.litElementVersions??(E.litElementVersions=[])).push("4.2.1");class q extends k{constructor(){super(),this.lang="es",this.theme="light",this.progress={}}emit(e,t={}){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}t(e,t=""){return t||e}track(e,t={}){this.emit("track-interaction",{component:this.tagName.toLowerCase(),action:e,data:t})}updateProgress(e,t=!0){this.emit("progress-update",{component:this.tagName.toLowerCase(),activity:e,completed:t})}}v(q,"properties",{lang:{type:String},theme:{type:String},progress:{type:Object}}),v(q,"styles",Ee`
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
    `);class Be{constructor(){v(this,"dev",{list:()=>{console.table(this.getUsageStats())},reload:async(e,t)=>{this.unregister(e),await this.lazyLoad(e,t),document.querySelectorAll(e).forEach(s=>{s.requestUpdate&&s.requestUpdate()})},validate:()=>{const e=this.validateComponents();return e.length===0?console.log("✅ All components are valid"):console.warn("⚠️ Component validation issues:",e),e}});this.components=new Map,this.initialized=!1}register(e,t){if(customElements.get(e)){console.warn(`Component ${e} is already registered`);return}try{customElements.define(e,t),this.components.set(e,t),console.log(`✅ Registered component: ${e}`)}catch(s){console.error(`❌ Failed to register component ${e}:`,s)}}get(e){return this.components.get(e)}has(e){return this.components.has(e)}getAll(){return Array.from(this.components.keys())}createElement(e,t={}){if(!this.has(e))throw new Error(`Component ${e} is not registered`);const s=document.createElement(e);return Object.entries(t).forEach(([a,n])=>{typeof n=="boolean"?n&&s.setAttribute(a,""):s.setAttribute(a,String(n))}),s}async initialize(){this.initialized||(console.log("🔧 Initializing Component Registry..."),this.registerBaseComponents(),this.initialized=!0,console.log("✅ Component Registry initialized"))}registerBaseComponents(){["git-drag-drop","git-terminal","git-branch-visualizer","git-comparison-tool","git-three-states","git-hash-generator","git-timeline","git-collaboration-sim","git-cicd-pipeline","git-platform-comparison","git-udl-checklist"].forEach(t=>{customElements.get(t)||this.register(t,class extends q{render(){return Re`
                            <div class="component-container">
                                <p>Loading ${t}...</p>
                            </div>
                        `}})})}async lazyLoad(e,t){try{if(this.has(e))return this.get(e);console.log(`📦 Lazy loading ${e}...`);const s=await t();if(s.default)return this.register(e,s.default),s.default;throw new Error(`Module for ${e} does not export default`)}catch(s){throw console.error(`Failed to lazy load ${e}:`,s),s}}batchRegister(e){const t=[];return e.forEach(({tagName:s,componentClass:a})=>{try{this.register(s,a),t.push({tagName:s,success:!0})}catch(n){t.push({tagName:s,success:!1,error:n})}}),t}unregister(e){this.components.has(e)&&(this.components.delete(e),console.log(`🗑️ Unregistered component: ${e}`))}getUsageStats(){const e={};return this.components.forEach((t,s)=>{const a=document.querySelectorAll(s);e[s]={registered:!0,instances:a.length,class:t.name}}),e}validateComponents(){const e=[];return this.components.forEach((t,s)=>{try{const a=new t;["render"].forEach(o=>{typeof a[o]!="function"&&e.push({component:s,issue:`Missing required method: ${o}`})})}catch(a){e.push({component:s,issue:`Cannot instantiate: ${a.message}`})}}),e}}class He{constructor(){v(this,"dev",{testThemes:()=>{const e=["light","dark","auto"];let t=0;const s=()=>{this.setTheme(e[t]),console.log(`Applied theme: ${e[t]}`),t=(t+1)%e.length,t!==0&&setTimeout(s,2e3)};s()},info:()=>{console.log("Theme Manager Info:",{current:this.currentTheme,resolved:this.getResolvedTheme(),system:this.getSystemPreference(),colors:this.getThemeColors()})}});this.currentTheme="auto",this.systemPrefersDark=!1,this.mediaQuery=null}init(){this.mediaQuery=window.matchMedia("(prefers-color-scheme: dark)"),this.systemPrefersDark=this.mediaQuery.matches,this.mediaQuery.addEventListener("change",t=>{this.systemPrefersDark=t.matches,this.currentTheme==="auto"&&this.applyTheme("auto")});const e=localStorage.getItem("theme")||"auto";this.setTheme(e),console.log("🎨 Theme Manager initialized")}setTheme(e){["auto","light","dark"].includes(e)||(console.warn(`Invalid theme: ${e}. Using 'auto' instead.`),e="auto"),this.currentTheme=e,this.applyTheme(e),this.updateThemeButtons(),this.saveTheme(),document.dispatchEvent(new CustomEvent("theme-changed",{detail:{theme:e,resolvedTheme:this.getResolvedTheme()}}))}applyTheme(e){let t;e==="auto"?t=this.systemPrefersDark?"dark":"light":t=e,document.body.classList.remove("theme-light","theme-dark"),document.body.classList.add(`theme-${t}`),this.updateMetaThemeColor(t),this.updateCustomProperties(t)}updateThemeButtons(){const e={auto:document.getElementById("theme-auto"),light:document.getElementById("theme-light"),dark:document.getElementById("theme-dark")};Object.values(e).forEach(s=>{s&&(s.style.backgroundColor="transparent",s.querySelector("i").style.color="var(--neutral)",s.setAttribute("aria-pressed","false"))});const t=e[this.currentTheme];t&&(t.style.backgroundColor="var(--primary)",t.querySelector("i").style.color="var(--bg)",t.setAttribute("aria-pressed","true"))}updateMetaThemeColor(e){const t=document.querySelector('meta[name="theme-color"]');if(t){const s=e==="dark"?"#020617":"#2563eb";t.setAttribute("content",s)}}updateCustomProperties(e){const t=document.documentElement;e==="dark"?(t.style.setProperty("--resolved-bg","#020617"),t.style.setProperty("--resolved-text","#e2e8f0"),t.style.setProperty("--resolved-card-bg","#0f172a"),t.style.setProperty("--resolved-border","#1e293b")):(t.style.setProperty("--resolved-bg","#f1f5f9"),t.style.setProperty("--resolved-text","#0f172a"),t.style.setProperty("--resolved-card-bg","#ffffff"),t.style.setProperty("--resolved-border","#e2e8f0"))}getCurrentTheme(){return this.currentTheme}getResolvedTheme(){return this.currentTheme==="auto"?this.systemPrefersDark?"dark":"light":this.currentTheme}toggleTheme(){const e=["light","dark","auto"],s=(e.indexOf(this.currentTheme)+1)%e.length;this.setTheme(e[s])}getSystemPreference(){return this.systemPrefersDark?"dark":"light"}saveTheme(){try{localStorage.setItem("theme",this.currentTheme)}catch(e){console.warn("Failed to save theme preference:",e)}}getThemeColors(){const e=this.getResolvedTheme()==="dark";return{primary:e?"#3b82f6":"#2563eb",secondary:e?"#10b981":"#059669",accent:e?"#f59e0b":"#d97706",neutral:e?"#94a3b8":"#64748b",bg:e?"#020617":"#f1f5f9",text:e?"#e2e8f0":"#0f172a",cardBg:e?"#0f172a":"#ffffff",border:e?"#1e293b":"#e2e8f0"}}createThemeCSS(e,t){return this.getResolvedTheme()==="dark"?t:e}onThemeChange(e){document.addEventListener("theme-changed",t=>{e(t.detail)})}preloadThemeAssets(){this.getResolvedTheme()==="dark"?this.preloadImage("/assets/icons/dark-mode-hero.svg"):this.preloadImage("/assets/icons/light-mode-hero.svg")}preloadImage(e){const t=document.createElement("link");t.rel="preload",t.as="image",t.href=e,document.head.appendChild(t)}getAnalyticsData(){return{currentTheme:this.currentTheme,resolvedTheme:this.getResolvedTheme(),systemPreference:this.getSystemPreference(),supportsColorSchemeQuery:this.mediaQuery!==null}}}class Fe{constructor(){v(this,"dev",{listKeys:(e=this.currentLanguage)=>{const t=this.translations.get(e);if(t){const s=this.flattenObject(t);console.table(s)}},checkMissing:()=>{const e=this.flattenObject(this.translations.get("es")||{}),t=this.flattenObject(this.translations.get("en")||{}),s=new Set(Object.keys(e)),a=new Set(Object.keys(t)),n=[...s].filter(r=>!a.has(r)),o=[...a].filter(r=>!s.has(r));n.length>0&&console.warn("Missing English translations:",n),o.length>0&&console.warn("Missing Spanish translations:",o),n.length===0&&o.length===0&&console.log("✅ All translations are complete")},testSwitching:()=>{const e=this.supportedLanguages;let t=0;const s=()=>{this.setLanguage(e[t]),console.log(`Switched to: ${e[t]}`),t=(t+1)%e.length,t!==0&&setTimeout(s,3e3)};s()}});this.currentLanguage="es",this.supportedLanguages=["es","en"],this.translations=new Map,this.fallbackLanguage="es"}init(){const e=localStorage.getItem("language")||this.detectBrowserLanguage();this.setLanguage(e),this.loadTranslations(),console.log("🌐 Language Manager initialized")}setLanguage(e){this.supportedLanguages.includes(e)||(console.warn(`Unsupported language: ${e}. Using fallback: ${this.fallbackLanguage}`),e=this.fallbackLanguage),this.currentLanguage=e,this.applyLanguage(),this.updateLanguageToggle(),this.saveLanguage(),document.dispatchEvent(new CustomEvent("language-changed",{detail:{language:e,previousLanguage:this.currentLanguage}}))}applyLanguage(){document.documentElement.lang=this.currentLanguage,document.querySelectorAll("[data-lang-es], [data-lang-en]").forEach(t=>{const s=t.getAttribute(`data-lang-${this.currentLanguage}`);s&&(t.innerHTML=s)}),document.querySelectorAll("[data-placeholder-es], [data-placeholder-en]").forEach(t=>{const s=t.getAttribute(`data-placeholder-${this.currentLanguage}`);s&&(t.placeholder=s)}),document.querySelectorAll("[data-aria-label-es], [data-aria-label-en]").forEach(t=>{const s=t.getAttribute(`data-aria-label-${this.currentLanguage}`);s&&t.setAttribute("aria-label",s)});const e=document.querySelector(`meta[name="title-${this.currentLanguage}"]`);e&&(document.title=e.getAttribute("content"))}updateLanguageToggle(){const e=document.getElementById("language-toggle");e&&(e.checked=this.currentLanguage==="en")}detectBrowserLanguage(){const t=(navigator.language||navigator.userLanguage).split("-")[0];return this.supportedLanguages.includes(t)?t:this.fallbackLanguage}getCurrentLanguage(){return this.currentLanguage}toggleLanguage(){const e=this.currentLanguage==="es"?"en":"es";this.setLanguage(e)}translate(e,t={},s=this.currentLanguage){const a=this.translations.get(s);if(!a)return console.warn(`No translations loaded for language: ${s}`),e;let n=this.getNestedValue(a,e);if(!n&&s!==this.fallbackLanguage){const o=this.translations.get(this.fallbackLanguage);o&&(n=this.getNestedValue(o,e))}return n?this.replaceVariables(n,t):(console.warn(`Missing translation for key: ${e}`),e)}t(e,t={},s=this.currentLanguage){return this.translate(e,t,s)}getNestedValue(e,t){return t.split(".").reduce((s,a)=>s&&s[a]!==void 0?s[a]:null,e)}replaceVariables(e,t){return e.replace(/\{\{(\w+)\}\}/g,(s,a)=>t[a]!==void 0?t[a]:s)}async loadTranslations(){try{const[e,t]=await Promise.all([this.loadTranslationFile("es"),this.loadTranslationFile("en")]);this.translations.set("es",e),this.translations.set("en",t),console.log("📚 Translations loaded")}catch(e){console.warn("Failed to load translations:",e),this.loadFallbackTranslations()}}async loadTranslationFile(e){try{const t=await fetch(`/src/data/translations/${e}.json`);if(!t.ok)throw new Error(`HTTP ${t.status}`);return await t.json()}catch(t){return console.warn(`Failed to load ${e} translations:`,t),{}}}loadFallbackTranslations(){const e={es:{common:{loading:"Cargando...",error:"Error",success:"Éxito",continue:"Continuar",back:"Atrás",next:"Siguiente",finish:"Finalizar"},navigation:{home:"Inicio",progress:"Progreso"}},en:{common:{loading:"Loading...",error:"Error",success:"Success",continue:"Continue",back:"Back",next:"Next",finish:"Finish"},navigation:{home:"Home",progress:"Progress"}}};this.translations.set("es",e.es),this.translations.set("en",e.en)}saveLanguage(){try{localStorage.setItem("language",this.currentLanguage)}catch(e){console.warn("Failed to save language preference:",e)}}formatDate(e,t={}){const s=this.currentLanguage==="es"?"es-ES":"en-US";return new Intl.DateTimeFormat(s,t).format(e)}formatNumber(e,t={}){const s=this.currentLanguage==="es"?"es-ES":"en-US";return new Intl.NumberFormat(s,t).format(e)}getTextDirection(){return"ltr"}onLanguageChange(e){document.addEventListener("language-changed",t=>{e(t.detail)})}getAnalyticsData(){return{currentLanguage:this.currentLanguage,supportedLanguages:this.supportedLanguages,browserLanguage:navigator.language||navigator.userLanguage,detectedLanguage:this.detectBrowserLanguage()}}plural(e,t,s={}){const a=e===1?`${t}.one`:`${t}.other`;return this.translate(a,{...s,count:e})}flattenObject(e,t=""){const s={};return Object.keys(e).forEach(a=>{const n=t?`${t}.${a}`:a;typeof e[a]=="object"&&e[a]!==null?Object.assign(s,this.flattenObject(e[a],n)):s[n]=e[a]}),s}}class Ge{constructor(e){v(this,"dev",{getProgress:()=>this.getProgressSummary(),completeAll:()=>{this.activities.forEach((e,t)=>{this.updateProgress(t,!0)})},completeSection:e=>{Array.from(this.activities.entries()).filter(([s,a])=>a.section===e).forEach(([s,a])=>{this.updateProgress(s,!0)})},showAchievements:()=>{console.table(Array.from(this.milestones.entries()).map(([e,t])=>({id:e,name:t.name,unlocked:this.achievements.has(e),reward:t.reward})))}});this.state=e,this.activities=new Map,this.milestones=new Map,this.achievements=new Set}init(){this.setupActivityDefinitions(),this.setupMilestones(),this.updateProgressBar(),console.log("📊 Progress Tracker initialized")}setupActivityDefinitions(){[{id:"drag-drop-vcs",section:"part1",weight:2,name:"VCS Concept Match"},{id:"drag-drop-commit",section:"part1",weight:2,name:"Commit Concept Match"},{id:"drag-drop-repository",section:"part1",weight:2,name:"Repository Concept Match"},{id:"drag-drop-branch",section:"part1",weight:2,name:"Branch Concept Match"},{id:"cvcs-explored",section:"part1",weight:3,name:"CVCS Architecture Explored"},{id:"dvcs-explored",section:"part1",weight:3,name:"DVCS Architecture Explored"},{id:"delta-model-explored",section:"part1",weight:3,name:"Delta Model Explored"},{id:"snapshot-model-explored",section:"part1",weight:3,name:"Snapshot Model Explored"},{id:"three-states-demo",section:"part1",weight:4,name:"Three States Demo Completed"},{id:"hash-generator-used",section:"part1",weight:2,name:"Hash Generator Used"},{id:"terminal-commands",section:"part2",weight:3,name:"Terminal Commands Practice"},{id:"branch-commit",section:"part2",weight:3,name:"Branch Commit Created"},{id:"branch-create",section:"part2",weight:3,name:"New Branch Created"},{id:"branch-merge",section:"part2",weight:4,name:"Branch Merge Completed"},{id:"merge-conflict-resolved",section:"part2",weight:5,name:"Merge Conflict Resolved"},{id:"collab-commit",section:"part3",weight:2,name:"Collaboration Commit"},{id:"collab-push",section:"part3",weight:3,name:"Push to Fork"},{id:"collab-pr",section:"part3",weight:4,name:"Pull Request Created"},{id:"platform-github",section:"part3",weight:2,name:"GitHub Platform Explored"},{id:"platform-gitlab",section:"part3",weight:2,name:"GitLab Platform Explored"},{id:"platform-bitbucket",section:"part3",weight:2,name:"Bitbucket Platform Explored"},{id:"cicd-demo",section:"part3",weight:3,name:"CI/CD Pipeline Demo"},{id:"udl-representation",section:"part4",weight:2,name:"UDL Representation Explored"},{id:"udl-expression",section:"part4",weight:2,name:"UDL Expression Explored"},{id:"udl-engagement",section:"part4",weight:2,name:"UDL Engagement Explored"},{id:"learning-path-completed",section:"part4",weight:5,name:"Learning Path Completed"}].forEach(t=>{this.activities.set(t.id,t)})}setupMilestones(){[{id:"first-concept",name:"First Steps",description:"Complete your first concept match",condition:t=>this.getCompletedActivitiesCount()>=1,reward:"Git Novice",icon:"ph-star"},{id:"part1-complete",name:"Foundation Master",description:"Complete all Part I activities",condition:t=>this.getSectionProgress("part1")>=100,reward:"Foundation Expert",icon:"ph-graduation-cap"},{id:"branching-expert",name:"Branching Expert",description:"Master all branching concepts",condition:t=>["branch-commit","branch-create","branch-merge"].every(s=>{var a;return t.activities&&((a=t.activities[s])==null?void 0:a.completed)}),reward:"Branch Master",icon:"ph-git-branch"},{id:"collaboration-pro",name:"Collaboration Pro",description:"Complete the collaboration workflow",condition:t=>["collab-commit","collab-push","collab-pr"].every(s=>{var a;return t.activities&&((a=t.activities[s])==null?void 0:a.completed)}),reward:"Team Player",icon:"ph-users"},{id:"platform-explorer",name:"Platform Explorer",description:"Explore all three major platforms",condition:t=>["platform-github","platform-gitlab","platform-bitbucket"].every(s=>{var a;return t.activities&&((a=t.activities[s])==null?void 0:a.completed)}),reward:"Platform Expert",icon:"ph-globe"},{id:"git-master",name:"Git Master",description:"Complete the entire learning journey",condition:t=>this.getOverallProgress()>=100,reward:"Git Guru",icon:"ph-crown"}].forEach(t=>{this.milestones.set(t.id,t)})}updateProgress(e,t=!0,s={}){if(!this.activities.has(e)){console.warn(`Unknown activity: ${e}`);return}const a=this.activities.get(e);this.state.dispatch("COMPLETE_ACTIVITY",{activityId:e,data:{...s,timestamp:Date.now(),section:a.section,weight:a.weight}}),this.state.dispatch("UPDATE_PROGRESS",{section:a.section,activity:e,completed:t}),this.checkAchievements(),this.updateProgressBar(),console.log(`📈 Progress updated: ${a.name}`)}getOverallProgress(){const e=Array.from(this.activities.values()).reduce((s,a)=>s+a.weight,0),t=this.getCompletedActivities().reduce((s,a)=>s+a.weight,0);return e>0?Math.round(t/e*100):0}getSectionProgress(e){const s=Array.from(this.activities.values()).filter(o=>o.section===e).reduce((o,r)=>o+r.weight,0),n=this.getCompletedActivities().filter(o=>o.section===e).reduce((o,r)=>o+r.weight,0);return s>0?Math.round(n/s*100):0}getCompletedActivities(){const e=this.state.getState();return Object.keys(e.progress.activities||{}).filter(s=>{var a;return(a=e.progress.activities[s])==null?void 0:a.completed}).map(s=>this.activities.get(s)).filter(Boolean)}getCompletedActivitiesCount(){return this.getCompletedActivities().length}updateProgressBar(){const e=document.getElementById("progress-bar");if(e){const t=this.getOverallProgress();e.style.transform=`scaleX(${t/100})`,e.setAttribute("aria-valuenow",t)}}checkAchievements(){const e=this.state.getState();this.milestones.forEach((t,s)=>{!this.achievements.has(s)&&t.condition(e.progress)&&this.unlockAchievement(s,t)})}unlockAchievement(e,t){this.achievements.add(e),this.showAchievementNotification(t),this.state.dispatch("TRACK_INTERACTION",{type:"achievement_unlocked",data:{achievementId:e,name:t.name,reward:t.reward}}),console.log(`🏆 Achievement unlocked: ${t.name}`)}showAchievementNotification(e){const t=document.createElement("div");t.className="achievement-notification",t.innerHTML=`
            <div class="achievement-content">
                <i class="${e.icon} achievement-icon"></i>
                <div class="achievement-text">
                    <div class="achievement-title">${e.name}</div>
                    <div class="achievement-reward">${e.reward}</div>
                </div>
                <i class="ph-x close-btn"></i>
            </div>
        `,t.style.cssText=`
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
        `,document.body.appendChild(t),setTimeout(()=>{t.style.transform="translateX(0)"},100),setTimeout(()=>{t.style.transform="translateX(100%)",setTimeout(()=>{t.parentNode&&t.parentNode.removeChild(t)},300)},5e3),t.querySelector(".close-btn").addEventListener("click",()=>{t.style.transform="translateX(100%)",setTimeout(()=>{t.parentNode&&t.parentNode.removeChild(t)},300)})}getProgressSummary(){const e=["part1","part2","part3","part4"],t={part1:"Fundamentos Conceptuales",part2:"Ruta de Aprendizaje",part3:"Ecosistema Extendido",part4:"Pedagogía Inclusiva"};return{overall:this.getOverallProgress(),completed:this.getCompletedActivitiesCount(),total:this.activities.size,achievements:this.achievements.size,sections:e.map(s=>({id:s,title:t[s],progress:this.getSectionProgress(s)}))}}exportProgress(){const e=this.getProgressSummary(),t=this.getCompletedActivities();return{summary:e,activities:t.map(s=>{var a;return{id:s.id,name:s.name,section:s.section,weight:s.weight,completedAt:(a=this.state.getState().progress.activities[s.id])==null?void 0:a.completedAt}}),achievements:Array.from(this.achievements),exportedAt:Date.now()}}resetProgress(){this.achievements.clear(),this.state.dispatch("RESET_PROGRESS"),this.updateProgressBar(),console.log("🔄 Progress reset")}}class qe{constructor(){v(this,"dev",{getState:()=>({currentSection:this.currentSection,sections:this.sections,progress:this.getSectionProgress(),isNavigating:this.isNavigating}),testNavigation:()=>{let e=0;const t=()=>{this.navigateToSection(this.sections[e]),console.log(`Navigated to: ${this.sections[e]}`),e=(e+1)%this.sections.length,e!==0&&setTimeout(t,2e3)};t()},jumpTo:e=>{e>=0&&e<this.sections.length&&this.navigateToSection(this.sections[e])}});this.currentSection="hero",this.sections=["hero","part1","part2","part3","part4"],this.observer=null,this.scrollTimeout=null,this.isNavigating=!1}init(){this.setupIntersectionObserver(),this.setupScrollBehavior(),this.handleInitialHash(),this.setupNavigationEvents(),console.log("🧭 Navigation Manager initialized")}setupIntersectionObserver(){const e={root:null,rootMargin:"-20% 0px -20% 0px",threshold:.1};this.observer=new IntersectionObserver(t=>{this.isNavigating||t.forEach(s=>{if(s.isIntersecting){const a=s.target.id;a&&this.sections.includes(a)&&this.updateCurrentSection(a)}})},e)}observeSections(){this.sections.forEach(e=>{const t=document.getElementById(e);t&&this.observer.observe(t)})}setupScrollBehavior(){document.addEventListener("click",e=>{const t=e.target.closest('a[href^="#"]');if(t){e.preventDefault();const s=t.getAttribute("href").slice(1);this.navigateToSection(s)}}),window.addEventListener("popstate",e=>{e.state&&e.state.section&&this.navigateToSection(e.state.section,!1)})}handleInitialHash(){const e=window.location.hash.slice(1);e&&this.sections.includes(e)&&setTimeout(()=>{this.navigateToSection(e)},100)}setupNavigationEvents(){document.addEventListener("keydown",e=>{if(!(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"))switch(e.key){case"ArrowUp":case"PageUp":e.preventDefault(),this.navigateToPreviousSection();break;case"ArrowDown":case"PageDown":e.preventDefault(),this.navigateToNextSection();break;case"Home":e.preventDefault(),this.navigateToSection("hero");break;case"End":e.preventDefault(),this.navigateToSection(this.sections[this.sections.length-1]);break}})}navigateToSection(e,t=!0){if(!this.sections.includes(e)){console.warn(`Invalid section: ${e}`);return}const s=document.getElementById(e);if(!s){console.warn(`Section element not found: ${e}`);return}this.isNavigating=!0,t&&this.updateURL(e),this.scrollToSection(s).then(()=>{this.updateCurrentSection(e),this.isNavigating=!1,this.lazyLoadSection(e)})}scrollToSection(e){return new Promise(t=>{const a=e.offsetTop-64,n=window.pageYOffset,o=a-n,r=Math.min(Math.abs(o)*.5,800);let c=null;const d=l=>l<.5?4*l*l*l:(l-1)*(2*l-2)*(2*l-2)+1,h=l=>{c===null&&(c=l);const p=l-c,u=Math.min(p/r,1);window.scrollTo(0,n+o*d(u)),p<r?requestAnimationFrame(h):t()};requestAnimationFrame(h)})}navigateToPreviousSection(){const e=this.sections.indexOf(this.currentSection);e>0&&this.navigateToSection(this.sections[e-1])}navigateToNextSection(){const e=this.sections.indexOf(this.currentSection);e<this.sections.length-1&&this.navigateToSection(this.sections[e+1])}updateCurrentSection(e){if(this.currentSection===e)return;const t=this.currentSection;this.currentSection=e,this.updateActiveSection(e),document.dispatchEvent(new CustomEvent("section-changed",{detail:{section:e,previousSection:t,sectionIndex:this.sections.indexOf(e)}}))}updateActiveSection(e){document.querySelectorAll(".nav-dot").forEach(n=>{const o=n.dataset.section===e;n.classList.toggle("active",o),n.setAttribute("aria-current",o?"true":"false")});const s=(this.sections.indexOf(e)+1)/this.sections.length*100,a=document.getElementById("progress-bar");a&&(a.style.transform=`scaleX(${s/100})`)}updateURL(e){const t=`${window.location.pathname}#${e}`;history.pushState({section:e},"",t)}lazyLoadSection(e){const t=document.getElementById(e);t&&!t.dataset.loaded&&(t.classList.remove("component-loading"),t.classList.add("component-loaded"),t.dataset.loaded="true",document.dispatchEvent(new CustomEvent("section-load",{detail:{section:e}})))}getCurrentSection(){return this.currentSection}getSections(){return[...this.sections]}getSectionProgress(){return(this.sections.indexOf(this.currentSection)+1)/this.sections.length}sectionExists(e){return this.sections.includes(e)}getNextSection(){const e=this.sections.indexOf(this.currentSection);return e<this.sections.length-1?this.sections[e+1]:null}getPreviousSection(){const e=this.sections.indexOf(this.currentSection);return e>0?this.sections[e-1]:null}scrollToTop(){const e=document.getElementById(this.currentSection);e&&this.scrollToSection(e)}setSmoothScrolling(e){document.documentElement.style.scrollBehavior=e?"smooth":"auto"}onSectionChange(e){document.addEventListener("section-changed",t=>{e(t.detail)})}destroy(){this.observer&&this.observer.disconnect(),this.scrollTimeout&&clearTimeout(this.scrollTimeout)}}class Ve{constructor(){v(this,"dev",{getSession:()=>({sessionId:this.sessionId,events:this.events.length,duration:Date.now()-this.startTime}),report:()=>{const e=this.generateReport();return console.log("📊 Analytics Report:",e),e},clear:()=>{this.events=[],console.log("🗑️ Analytics events cleared")},export:()=>{const e=JSON.stringify(this.events,null,2);return console.log("📤 Analytics Export:",e),e},simulate:()=>{const e=["section_view","user_action","progress_milestone"];for(let t=0;t<20;t++){const s=e[Math.floor(Math.random()*e.length)];this.track(s,{simulated:!0,index:t})}console.log("🎯 Simulated 20 analytics events")}});this.sessionId=this.generateSessionId(),this.events=[],this.userAgent=navigator.userAgent,this.startTime=Date.now(),this.isEnabled=!0,this.batchSize=10,this.flushInterval=3e4}initialize(){this.setupEventListeners(),this.startSession(),this.setupPeriodicFlush(),console.log("📊 Analytics Manager initialized")}generateSessionId(){return`${Date.now()}-${Math.random().toString(36).substr(2,9)}`}setupEventListeners(){document.addEventListener("visibilitychange",()=>{this.track("page_visibility",{visible:!document.hidden,timestamp:Date.now()})}),document.addEventListener("track-interaction",e=>{this.track("component_interaction",e.detail)}),document.addEventListener("progress-update",e=>{this.track("progress_update",e.detail)}),document.addEventListener("section-changed",e=>{this.trackSectionView(e.detail.section)}),window.addEventListener("error",e=>{this.trackError(e.error)}),window.addEventListener("load",()=>{setTimeout(()=>this.trackPerformance(),1e3)})}startSession(){this.track("session_start",{sessionId:this.sessionId,userAgent:this.userAgent,language:navigator.language,screen:{width:screen.width,height:screen.height,colorDepth:screen.colorDepth},viewport:{width:window.innerWidth,height:window.innerHeight},timezone:Intl.DateTimeFormat().resolvedOptions().timeZone})}track(e,t={}){if(!this.isEnabled)return;const s={id:this.generateEventId(),sessionId:this.sessionId,type:e,timestamp:Date.now(),url:window.location.href,data:t,sessionDuration:Date.now()-this.startTime};this.events.push(s),this.isDevelopment()&&console.log(`📈 Analytics: ${e}`,t),this.events.length>=this.batchSize&&this.flush()}generateEventId(){return`${this.sessionId}-${this.events.length+1}`}trackSectionView(e){this.track("section_view",{section:e,previousSection:this.currentSection,timeInPreviousSection:this.currentSection?Date.now()-this.sectionStartTime:0}),this.currentSection=e,this.sectionStartTime=Date.now()}trackAction(e,t={}){this.track("user_action",{action:e,...t})}trackProgress(e){this.track("progress_milestone",{...e,sessionProgress:this.getSessionProgress()})}trackError(e){this.track("error",{message:e.message,stack:e.stack,filename:e.filename,lineno:e.lineno,colno:e.colno})}trackPerformance(){var a,n;if(!("performance"in window))return;const e=performance.getEntriesByType("navigation")[0],t=performance.getEntriesByType("paint"),s={domContentLoaded:(e==null?void 0:e.domContentLoadedEventEnd)-(e==null?void 0:e.domContentLoadedEventStart),loadComplete:(e==null?void 0:e.loadEventEnd)-(e==null?void 0:e.loadEventStart),firstPaint:(a=t.find(o=>o.name==="first-paint"))==null?void 0:a.startTime,firstContentfulPaint:(n=t.find(o=>o.name==="first-contentful-paint"))==null?void 0:n.startTime,totalResources:performance.getEntriesByType("resource").length,memory:"memory"in performance?{usedJSHeapSize:performance.memory.usedJSHeapSize,totalJSHeapSize:performance.memory.totalJSHeapSize}:null};this.track("performance",s)}trackLearningEvent(e,t={}){this.track("learning_event",{eventType:e,learningData:t,sessionTime:Date.now()-this.startTime})}trackAccessibility(e,t={}){this.track("accessibility",{feature:e,...t})}getSessionProgress(){const e=this.events.filter(s=>s.sessionId===this.sessionId),t=e.filter(s=>s.type==="progress_milestone");return{totalEvents:e.length,progressEvents:t.length,sessionDuration:Date.now()-this.startTime}}async flush(){if(this.events.length===0)return;const e=[...this.events];this.events=[];try{await this.sendToAnalyticsService(e),this.isDevelopment()&&console.log(`📤 Flushed ${e.length} analytics events`)}catch(t){console.warn("Failed to send analytics events:",t),this.events.unshift(...e)}}async sendToAnalyticsService(e){return new Promise(t=>{setTimeout(()=>{this.isDevelopment()&&console.log("Analytics Events:",e),t()},100)})}setupPeriodicFlush(){setInterval(()=>{this.events.length>0&&this.flush()},this.flushInterval),window.addEventListener("beforeunload",()=>{this.events.length>0&&this.flushSync()})}flushSync(){if(this.events.length===0)return;const e=JSON.stringify({sessionId:this.sessionId,events:this.events});"sendBeacon"in navigator?navigator.sendBeacon("/api/analytics",e):fetch("/api/analytics",{method:"POST",body:e,headers:{"Content-Type":"application/json"},keepalive:!0}).catch(()=>{}),this.events=[]}isDevelopment(){return window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1"||window.location.hostname.includes("dev")}generateReport(){return{session:{id:this.sessionId,duration:Date.now()-this.startTime,eventCount:this.events.length},events:this.events.reduce((t,s)=>(t[s.type]=(t[s.type]||0)+1,t),{}),performance:this.getPerformanceMetrics(),userAgent:this.userAgent}}getPerformanceMetrics(){const e=this.events.filter(t=>t.type==="performance");return e.length>0?e[0].data:null}setEnabled(e){this.isEnabled=e,e?this.track("analytics_enabled"):(this.track("analytics_disabled"),this.flush())}getPrivacyData(){return{sessionId:this.sessionId,dataCollected:["User interactions with educational components","Learning progress and achievements","Page navigation and time spent","Error events for debugging","Performance metrics","Accessibility feature usage"],dataNotCollected:["Personal identifying information","IP addresses","Exact location data","Third-party account information"],retention:"30 days for learning analytics, 7 days for technical metrics"}}destroy(){this.flush(),this.isEnabled=!1}}class Ke{constructor(){this.state=new ye,this.components=new Be,this.theme=new He,this.language=new Fe,this.progress=new Ge(this.state),this.navigation=new qe,this.analytics=new Ve,this.isInitialized=!1}async init(){try{console.log("🚀 Initializing Git Pedagogy SPA..."),await this.initializeCore(),await this.loadComponents(),this.setupEventListeners(),await this.initializeSections(),this.analytics.initialize(),this.isInitialized=!0,console.log("✅ Application initialized successfully"),this.state.dispatch("APP_INITIALIZED")}catch(e){console.error("❌ Failed to initialize application:",e),this.handleInitializationError(e)}}async initializeCore(){await this.state.init(),this.theme.init(),this.language.init(),this.navigation.init(),document.getElementById("current-year").textContent=new Date().getFullYear()}async loadComponents(){const e=[()=>S(()=>import("./drag-drop-component-CQt3cgKN.js"),[]),()=>S(()=>import("./three-states-component-D5Ahn-oo.js"),[]),()=>S(()=>import("./comparison-tool-component-C_sVaCNm.js"),[]),()=>S(()=>import("./hash-generator-component-fPsBn9I5.js"),[]),()=>S(()=>import("./git-terminal-simulator-3g7a1nJA.js"),[]),()=>S(()=>import("./git-branch-visualizer-BhEo5DTW.js"),[])],t=e.length;let s=0;for(const a of e)try{await a(),s++;const n=s/t*100;this.state.dispatch("LOADING_PROGRESS",{progress:n})}catch(n){console.warn("⚠️ Failed to load component:",n)}console.log(`📦 Loaded ${s}/${t} components`)}setupEventListeners(){var e,t,s,a,n,o;(e=document.getElementById("theme-auto"))==null||e.addEventListener("click",()=>{this.theme.setTheme("auto")}),(t=document.getElementById("theme-light"))==null||t.addEventListener("click",()=>{this.theme.setTheme("light")}),(s=document.getElementById("theme-dark"))==null||s.addEventListener("click",()=>{this.theme.setTheme("dark")}),(a=document.getElementById("language-toggle"))==null||a.addEventListener("change",r=>{this.language.setLanguage(r.target.checked?"en":"es")}),(n=document.getElementById("start-learning"))==null||n.addEventListener("click",()=>{this.startLearningJourney()}),(o=document.getElementById("progress-overview"))==null||o.addEventListener("click",()=>{this.showProgressOverview()}),document.querySelectorAll(".nav-dot").forEach(r=>{r.addEventListener("click",()=>{const c=r.dataset.section;this.navigation.navigateToSection(c)}),r.addEventListener("keydown",c=>{if(c.key==="Enter"||c.key===" "){c.preventDefault();const d=r.dataset.section;this.navigation.navigateToSection(d)}})}),document.addEventListener("keydown",r=>{this.handleKeyboardShortcuts(r)}),this.state.subscribe("SECTION_CHANGED",r=>{this.navigation.updateActiveSection(r.section),this.analytics.trackSectionView(r.section)}),this.state.subscribe("PROGRESS_UPDATED",r=>{this.progress.updateProgressBar(),this.analytics.trackProgress(r)}),window.addEventListener("error",r=>{this.analytics.trackError(r.error),console.error("Global error:",r.error)}),window.addEventListener("unhandledrejection",r=>{this.analytics.trackError(r.reason),console.error("Unhandled promise rejection:",r.reason)})}async initializeSections(){const e=document.getElementById("content-sections");if(!e)throw new Error("Content sections container not found");[{id:"part1",title:"Fundamentos Conceptuales",content:this.createPart1Content()},{id:"part2",title:"Ruta de Aprendizaje",content:this.createPart2Content()},{id:"part3",title:"Ecosistema Extendido",content:this.createPart3Content()},{id:"part4",title:"Pedagogía Inclusiva",content:this.createPart4Content()}].forEach(s=>{const a=document.createElement("section");a.id=s.id,a.className="section py-20",a.innerHTML=s.content,e.appendChild(a)}),this.navigation.observeSections(),console.log("📄 Content sections initialized with real content")}createPart1Content(){return`
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
            <div class="max-w-4xl mx-auto">
                <h2 class="text-3xl font-bold mb-8 text-center" style="color: var(--text);">
                    Parte III: Ecosistema Extendido
                </h2>
                
                <div class="ecosystem-grid">
                    <div class="platform-card">
                        <i class="ph-github-logo text-4xl mb-4" style="color: var(--text);"></i>
                        <h3 class="text-xl font-semibold mb-2">GitHub</h3>
                        <p>Plataforma líder para desarrollo colaborativo con herramientas integradas de CI/CD.</p>
                    </div>

                    <div class="platform-card">
                        <i class="ph-gitlab-logo-simple text-4xl mb-4" style="color: var(--accent);"></i>
                        <h3 class="text-xl font-semibold mb-2">GitLab</h3>
                        <p>Plataforma completa DevOps con repositorios, CI/CD y gestión de proyectos.</p>
                    </div>

                    <div class="platform-card">
                        <i class="ph-git-branch text-4xl mb-4" style="color: var(--primary);"></i>
                        <h3 class="text-xl font-semibold mb-2">Bitbucket</h3>
                        <p>Solución de Atlassian integrada con Jira y otras herramientas de desarrollo.</p>
                    </div>
                </div>

                <div class="mt-12">
                    <h3 class="text-2xl font-semibold mb-6">Herramientas Complementarias</h3>
                    <div class="tools-grid">
                        <div class="tool-item">
                            <strong>Git GUI:</strong> Interfaces gráficas como GitKraken, SourceTree
                        </div>
                        <div class="tool-item">
                            <strong>IDE Integration:</strong> VS Code, IntelliJ, Eclipse
                        </div>
                        <div class="tool-item">
                            <strong>CI/CD:</strong> GitHub Actions, GitLab CI, Jenkins
                        </div>
                        <div class="tool-item">
                            <strong>Code Review:</strong> Pull Requests, Merge Requests
                        </div>
                    </div>
                </div>
            </div>
        `}createPart4Content(){return`
            <div class="max-w-4xl mx-auto">
                <h2 class="text-3xl font-bold mb-8 text-center" style="color: var(--text);">
                    Parte IV: Pedagogía Inclusiva
                </h2>
                
                <div class="accessibility-features">
                    <div class="feature-card">
                        <i class="ph-universal-access text-3xl mb-4" style="color: var(--success);"></i>
                        <h3 class="text-xl font-semibold mb-2">Accesibilidad Universal</h3>
                        <p>Diseño que considera diferentes estilos de aprendizaje y necesidades de accesibilidad.</p>
                        <ul class="mt-4 space-y-2">
                            <li>✅ Compatible con lectores de pantalla</li>
                            <li>✅ Navegación por teclado completa</li>
                            <li>✅ Alto contraste disponible</li>
                            <li>✅ Texto ajustable</li>
                        </ul>
                    </div>

                    <div class="feature-card">
                        <i class="ph-brain text-3xl mb-4" style="color: var(--primary);"></i>
                        <h3 class="text-xl font-semibold mb-2">Neurodiversidad</h3>
                        <p>Enfoque pedagógico que celebra diferentes formas de pensar y procesar información.</p>
                        <ul class="mt-4 space-y-2">
                            <li>🧠 Múltiples modalidades de aprendizaje</li>
                            <li>⏱️ Ritmo de aprendizaje flexible</li>
                            <li>🎯 Objetivos claros y estructurados</li>
                            <li>🔄 Retroalimentación constante</li>
                        </ul>
                    </div>

                    <div class="feature-card">
                        <i class="ph-chalkboard-teacher text-3xl mb-4" style="color: var(--secondary);"></i>
                        <h3 class="text-xl font-semibold mb-2">Metodología UDL</h3>
                        <p>Universal Design for Learning aplicado al aprendizaje de tecnología.</p>
                        <ul class="mt-4 space-y-2">
                            <li>📚 Múltiples formas de representación</li>
                            <li>🎮 Múltiples formas de participación</li>
                            <li>✍️ Múltiples formas de expresión</li>
                            <li>🎨 Personalización del entorno</li>
                        </ul>
                    </div>
                </div>

                <div class="mt-12 text-center">
                    <h3 class="text-2xl font-semibold mb-4">Para Educadores</h3>
                    <p class="text-lg mb-6" style="color: var(--neutral);">
                        Esta guía está diseñada para ser utilizada en el aula universitaria, 
                        proporcionando herramientas y recursos para enseñar Git de manera inclusiva.
                    </p>
                    <button class="btn btn-primary">
                        <i class="ph-download"></i>
                        Descargar Guía del Educador
                    </button>
                </div>
            </div>
        `}handleKeyboardShortcuts(e){if(!(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"))switch(e.key){case"1":this.navigation.navigateToSection("hero");break;case"2":this.navigation.navigateToSection("part1");break;case"3":this.navigation.navigateToSection("part2");break;case"4":this.navigation.navigateToSection("part3");break;case"5":this.navigation.navigateToSection("part4");break;case"h":this.showKeyboardShortcuts();break;case"p":this.showProgressOverview();break;case"t":this.theme.toggleTheme();break;case"l":this.language.toggleLanguage();break}}startLearningJourney(){this.analytics.trackAction("start_learning"),this.navigation.navigateToSection("part1"),this.showNotification("¡Bienvenido! Comencemos tu viaje de aprendizaje.","success")}showProgressOverview(){this.analytics.trackAction("view_progress");const e=this.progress.getProgressSummary(),t=this.createProgressModal(e);document.body.appendChild(t),setTimeout(()=>{t.parentNode&&t.parentNode.removeChild(t)},1e4)}createProgressModal(e){const t=document.createElement("div");return t.className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",t.innerHTML=`
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
                    ${e.sections.map(s=>`
                        <div class="section-progress">
                            <div class="flex justify-between text-sm mb-1">
                                <span>${s.title}</span>
                                <span>${s.progress}%</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-1">
                                <div class="bg-green-600 h-1 rounded-full" style="width: ${s.progress}%"></div>
                            </div>
                        </div>
                    `).join("")}
                </div>
            </div>
        `,t.addEventListener("click",s=>{(s.target===t||s.target.closest(".close-modal"))&&t.remove()}),t}showNotification(e,t="info"){const s=document.createElement("div");s.className=`notification notification-${t}`,s.innerHTML=`
            <div class="flex items-center gap-2">
                <i class="ph-${t==="success"?"check-circle":"info"} text-xl"></i>
                <span>${e}</span>
            </div>
        `,document.body.appendChild(s),setTimeout(()=>{s.style.transform="translateX(100%)",setTimeout(()=>s.remove(),300)},3e3)}showKeyboardShortcuts(){const e=[{key:"1-5",action:"Navegar a secciones"},{key:"H",action:"Mostrar ayuda"},{key:"P",action:"Ver progreso"},{key:"T",action:"Cambiar tema"},{key:"L",action:"Cambiar idioma"}],t=document.createElement("div");t.className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",t.innerHTML=`
            <div class="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full mx-4">
                <h3 class="text-xl font-semibold mb-4">Atajos de Teclado</h3>
                <div class="space-y-2">
                    ${e.map(s=>`
                        <div class="flex justify-between">
                            <kbd class="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">${s.key}</kbd>
                            <span>${s.action}</span>
                        </div>
                    `).join("")}
                </div>
                <button class="mt-4 w-full btn btn-primary" onclick="this.closest('.fixed').remove()">
                    Cerrar
                </button>
            </div>
        `,document.body.appendChild(t)}handleInitializationError(e){const t=document.createElement("div");t.className="error-container fixed inset-0 flex items-center justify-center bg-red-50 dark:bg-red-900",t.innerHTML=`
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
        `,document.body.appendChild(t)}}document.addEventListener("DOMContentLoaded",async()=>{const i=new Ke;window.gitPedagogyApp=i,await i.init()});window.addEventListener("error",i=>{i.filename&&i.filename.includes(".js")&&console.error("Failed to load module:",i.filename)});export{q as B,k as a,Ee as i,Re as x};
//# sourceMappingURL=index-BQHeEUBN.js.map
