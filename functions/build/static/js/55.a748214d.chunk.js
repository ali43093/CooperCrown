(this["webpackJsonpfuse-react-app"]=this["webpackJsonpfuse-react-app"]||[]).push([[55],{1615:function(e,t,n){"use strict";n.r(t);var r=n(518);n.d(t,"default",(function(){return r.a}))},1685:function(e,t,n){"use strict";var r=n(799);Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var n=u.default.memo(u.default.forwardRef((function(t,n){return u.default.createElement(a.default,(0,o.default)({ref:n},t),e)})));0;return n.muiName=a.default.muiName,n};var o=r(n(176)),u=r(n(0)),a=r(n(1615))},1686:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.FrameContextConsumer=t.FrameContextProvider=t.FrameContext=void 0;var r,o=n(0),u=(r=o)&&r.__esModule?r:{default:r};var a=void 0,i=void 0;"undefined"!==typeof document&&(a=document),"undefined"!==typeof window&&(i=window);var l=t.FrameContext=u.default.createContext({document:a,window:i}),d=l.Provider,c=l.Consumer;t.FrameContextProvider=d,t.FrameContextConsumer=c},1690:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.FrameContextConsumer=t.FrameContext=void 0;var r=n(1686);Object.defineProperty(t,"FrameContext",{enumerable:!0,get:function(){return r.FrameContext}}),Object.defineProperty(t,"FrameContextConsumer",{enumerable:!0,get:function(){return r.FrameContextConsumer}});var o,u=n(1691),a=(o=u)&&o.__esModule?o:{default:o};t.default=a.default},1691:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(0),a=f(u),i=f(n(18)),l=f(n(2)),d=n(1686),c=f(n(1692));function f(e){return e&&e.__esModule?e:{default:e}}var p=function(e){function t(e,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var r=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));return r.handleLoad=function(){r.forceUpdate()},r._isMounted=!1,r}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),o(t,[{key:"componentDidMount",value:function(){this._isMounted=!0;var e=this.getDoc();e&&"complete"===e.readyState?this.forceUpdate():this.node.addEventListener("load",this.handleLoad)}},{key:"componentWillUnmount",value:function(){this._isMounted=!1,this.node.removeEventListener("load",this.handleLoad)}},{key:"getDoc",value:function(){return this.node?this.node.contentDocument:null}},{key:"getMountTarget",value:function(){var e=this.getDoc();return this.props.mountTarget?e.querySelector(this.props.mountTarget):e.body.children[0]}},{key:"renderFrameContents",value:function(){if(!this._isMounted)return null;var e=this.getDoc();if(!e)return null;var t=this.props.contentDidMount,n=this.props.contentDidUpdate,r=e.defaultView||e.parentView,o=!this._setInitialContent,u=a.default.createElement(c.default,{contentDidMount:t,contentDidUpdate:n},a.default.createElement(d.FrameContextProvider,{value:{document:e,window:r}},a.default.createElement("div",{className:"frame-content"},this.props.children)));o&&(e.open("text/html","replace"),e.write(this.props.initialContent),e.close(),this._setInitialContent=!0);var l=this.getMountTarget();return[i.default.createPortal(this.props.head,this.getDoc().head),i.default.createPortal(u,l)]}},{key:"render",value:function(){var e=this,t=r({},this.props,{children:void 0});return delete t.head,delete t.initialContent,delete t.mountTarget,delete t.contentDidMount,delete t.contentDidUpdate,a.default.createElement("iframe",r({},t,{ref:function(t){e.node=t}}),this.renderFrameContents())}}]),t}(u.Component);p.propTypes={style:l.default.object,head:l.default.node,initialContent:l.default.string,mountTarget:l.default.string,contentDidMount:l.default.func,contentDidUpdate:l.default.func,children:l.default.oneOfType([l.default.element,l.default.arrayOf(l.default.element)])},p.defaultProps={style:{},head:null,children:void 0,mountTarget:void 0,contentDidMount:function(){},contentDidUpdate:function(){},initialContent:'<!DOCTYPE html><html><head></head><body><div class="frame-root"></div></body></html>'},t.default=p},1692:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=n(0),u=(a(o),a(n(2)));function a(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}var d=function(e){function t(){return i(this,t),l(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),r(t,[{key:"componentDidMount",value:function(){this.props.contentDidMount()}},{key:"componentDidUpdate",value:function(){this.props.contentDidUpdate()}},{key:"render",value:function(){return o.Children.only(this.props.children)}}]),t}(o.Component);d.propTypes={children:u.default.element.isRequired,contentDidMount:u.default.func.isRequired,contentDidUpdate:u.default.func.isRequired},t.default=d},1710:function(e,t,n){var r=n(178).default;function o(e){if("function"!==typeof WeakMap)return null;var t=new WeakMap,n=new WeakMap;return(o=function(e){return e?n:t})(e)}e.exports=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!==r(e)&&"function"!==typeof e)return{default:e};var n=o(t);if(n&&n.has(e))return n.get(e);var u={},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var i in e)if("default"!==i&&Object.prototype.hasOwnProperty.call(e,i)){var l=a?Object.getOwnPropertyDescriptor(e,i):null;l&&(l.get||l.set)?Object.defineProperty(u,i,l):u[i]=e[i]}return u.default=e,n&&n.set(e,u),u},e.exports.default=e.exports,e.exports.__esModule=!0},1728:function(e,t,n){var r=n(178).default,o=n(59);e.exports=function(e,t){if(t&&("object"===r(t)||"function"===typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return o(e)},e.exports.default=e.exports,e.exports.__esModule=!0},1729:function(e,t){function n(t){return e.exports=n=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},e.exports.default=e.exports,e.exports.__esModule=!0,n(t)}e.exports=n,e.exports.default=e.exports,e.exports.__esModule=!0},1730:function(e,t,n){var r=n(820);e.exports=function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&r(e,t)},e.exports.default=e.exports,e.exports.__esModule=!0},1772:function(e,t,n){"use strict";var r=n(799);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r(n(0)),u=(0,r(n(1685)).default)(o.default.createElement("path",{d:"M19 3H4.99c-1.11 0-1.98.9-1.98 2L3 19c0 1.1.88 2 1.99 2H19c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 12h-4c0 1.66-1.35 3-3 3s-3-1.34-3-3H4.99V5H19v10zm-3-5h-2V7h-4v3H8l4 4 4-4z"}),"MoveToInbox");t.default=u},1875:function(e,t,n){"use strict";var r=n(799);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r(n(0)),u=(0,r(n(1685)).default)(o.default.createElement("path",{d:"M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"}),"MoreVert");t.default=u},1902:function(e,t,n){"use strict";var r=n(799);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r(n(0)),u=(0,r(n(1685)).default)(o.default.createElement("path",{d:"M21.99 8c0-.72-.37-1.35-.94-1.7L12 1 2.95 6.3C2.38 6.65 2 7.28 2 8v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2l-.01-10zM12 13L3.74 7.84 12 3l8.26 4.84L12 13z"}),"Drafts");t.default=u},1948:function(e,t,n){"use strict";var r=n(1710),o=n(799);Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"anchorRef",{enumerable:!0,get:function(){return h.anchorRef}}),Object.defineProperty(t,"bindTrigger",{enumerable:!0,get:function(){return h.bindTrigger}}),Object.defineProperty(t,"bindToggle",{enumerable:!0,get:function(){return h.bindToggle}}),Object.defineProperty(t,"bindHover",{enumerable:!0,get:function(){return h.bindHover}}),Object.defineProperty(t,"bindMenu",{enumerable:!0,get:function(){return h.bindMenu}}),Object.defineProperty(t,"bindPopover",{enumerable:!0,get:function(){return h.bindPopover}}),Object.defineProperty(t,"bindPopper",{enumerable:!0,get:function(){return h.bindPopper}}),t.default=void 0;var u=o(n(178)),a=o(n(522)),i=o(n(523)),l=o(n(1728)),d=o(n(1729)),c=o(n(59)),f=o(n(1730)),p=o(n(38)),s=r(n(0)),v=o(n(2)),h=n(1949),b=function(e){function t(){var e,n;(0,a.default)(this,t);for(var r=arguments.length,o=new Array(r),u=0;u<r;u++)o[u]=arguments[u];return n=(0,l.default)(this,(e=(0,d.default)(t)).call.apply(e,[this].concat(o))),(0,p.default)((0,c.default)(n),"state",h.initCoreState),(0,p.default)((0,c.default)(n),"_mounted",!0),(0,p.default)((0,c.default)(n),"_setStateIfMounted",(function(e){n._mounted&&n.setState(e)})),n}return(0,f.default)(t,e),(0,i.default)(t,[{key:"componentWillUnmount",value:function(){this._mounted=!1}},{key:"componentDidUpdate",value:function(e,t){var n=this.props.popupId;if((n!==e.popupId||this.state.anchorEl!==t.anchorEl)&&n&&"object"===("undefined"===typeof document?"undefined":(0,u.default)(document))){var r=document.getElementById(n);r&&r.focus()}}},{key:"render",value:function(){var e=this.props,t=e.children,n=e.popupId,r=e.variant,o=e.parentPopupState,u=t((0,h.createPopupState)({state:this.state,setState:this._setStateIfMounted,popupId:n,variant:r,parentPopupState:o}));return null==u?null:u}}]),t}(s.Component);t.default=b,(0,p.default)(b,"propTypes",{children:v.default.func.isRequired,popupId:v.default.string,variant:v.default.oneOf(["popover","popper"]).isRequired,parentPopupState:v.default.object})},1949:function(e,t,n){"use strict";var r=n(1710),o=n(799);Object.defineProperty(t,"__esModule",{value:!0}),t.createPopupState=function(e){var t=e.state,n=e.setState,r=e.parentPopupState,o=e.popupId,d=e.variant,c=t.isOpen,p=t.setAnchorElUsed,s=t.anchorEl,v=t.hovered,h=t._childPopupState,b=t,y=function(e){(function(e,t){for(var n in t)if(e.hasOwnProperty(n)&&e[n]!==t[n])return!0;return!1})(b,e)&&n(b=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){(0,a.default)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},b,{},e))},m=function(e){if(l||e||p||(l=!0,console.error("eventOrAnchorEl should be defined if setAnchorEl is not used")),r){if(!r.isOpen)return;r._setChildPopupState(_)}"object"===("undefined"===typeof document?"undefined":(0,u.default)(document))&&document.activeElement&&document.activeElement.blur();var t={isOpen:!0,hovered:e&&"mouseenter"===e.type};e&&e.currentTarget?p||(t.anchorEl=e.currentTarget):e&&(t.anchorEl=e),y(t)},O=function(){h&&h.close(),r&&r._setChildPopupState(null),y({isOpen:!1,hovered:!1})},_={anchorEl:s,setAnchorEl:function(e){y({setAnchorElUsed:!0,anchorEl:e})},setAnchorElUsed:p,popupId:o,variant:d,isOpen:c,open:m,close:O,toggle:function(e){c?O():m(e)},setOpen:function(e,t){e?m(t):O()},onMouseLeave:function(e){var t=e.relatedTarget;v&&!function e(t,n){var r=n.anchorEl,o=n._childPopupState;return f(r,t)||f(function(e){var t=e.popupId;return t&&"undefined"!==typeof document?document.getElementById(t):null}(n),t)||null!=o&&e(t,o)}(t,_)&&O()},_childPopupState:h,_setChildPopupState:function(e){return y({_childPopupState:e})}};return _},t.anchorRef=function(e){var t=e.setAnchorEl;return function(e){e&&t(e)}},t.bindTrigger=function(e){var t,n=e.isOpen,r=e.open,o=e.popupId,u=e.variant;return t={},(0,a.default)(t,"popover"===u?"aria-controls":"aria-describedby",n?o:null),(0,a.default)(t,"aria-haspopup","popover"===u||void 0),(0,a.default)(t,"onClick",r),t},t.bindToggle=function(e){var t,n=e.isOpen,r=e.toggle,o=e.popupId,u=e.variant;return t={},(0,a.default)(t,"popover"===u?"aria-controls":"aria-describedby",n?o:null),(0,a.default)(t,"aria-haspopup","popover"===u||void 0),(0,a.default)(t,"onClick",r),t},t.bindHover=function(e){var t,n=e.isOpen,r=e.open,o=e.onMouseLeave,u=e.popupId,i=e.variant;return t={},(0,a.default)(t,"popover"===i?"aria-controls":"aria-describedby",n?u:null),(0,a.default)(t,"aria-haspopup","popover"===i||void 0),(0,a.default)(t,"onMouseEnter",r),(0,a.default)(t,"onMouseLeave",o),t},t.bindPopover=d,t.bindPopper=function(e){var t=e.isOpen,n=e.anchorEl;return{id:e.popupId,anchorEl:n,open:t}},t.bindMenu=t.initCoreState=void 0;var u=o(n(178)),a=o(n(38));r(n(0));function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}var l=!1;function d(e){var t=e.isOpen,n=e.anchorEl,r=e.close;return{id:e.popupId,anchorEl:n,open:t,onClose:r,onMouseLeave:e.onMouseLeave}}t.initCoreState={isOpen:!1,setAnchorElUsed:!1,anchorEl:null,hovered:!1,_childPopupState:null};var c=d;function f(e,t){if(!e)return!1;for(;t;){if(t===e)return!0;t=t.parentElement}return!1}t.bindMenu=c},2012:function(e,t,n){"use strict";var r=n(799);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r(n(0)),u=(0,r(n(1685)).default)(o.default.createElement("path",{d:"M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"}),"Send");t.default=u},3387:function(e,t,n){"use strict";var r=n(799);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r(n(0)),u=(0,r(n(1685)).default)(o.default.createElement(o.default.Fragment,null,o.default.createElement("circle",{cx:"12",cy:"19",r:"2"}),o.default.createElement("path",{d:"M10 3h4v12h-4z"})),"PriorityHigh");t.default=u}}]);