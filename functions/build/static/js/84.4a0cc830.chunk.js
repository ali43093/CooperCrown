(this["webpackJsonpfuse-react-app"]=this["webpackJsonpfuse-react-app"]||[]).push([[84],{1686:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.FrameContextConsumer=t.FrameContextProvider=t.FrameContext=void 0;var a,r=n(0),o=(a=r)&&a.__esModule?a:{default:a};var i=void 0,c=void 0;"undefined"!==typeof document&&(i=document),"undefined"!==typeof window&&(c=window);var s=t.FrameContext=o.default.createContext({document:i,window:c}),l=s.Provider,u=s.Consumer;t.FrameContextProvider=l,t.FrameContextConsumer=u},1689:function(e,t,n){"use strict";n.d(t,"a",(function(){return P}));var a=n(17),r=n(140),o=n(1669),i=n(1677),c=n(1647),s=n(1680),l=n(1681),u=n(0),d=n.n(u),f=n(12),m=n(4),p=n(83),h=n(84),v=n(152),b=n(153),y=n(1600),x=n(797),g=n(1636),k=n(1668),E=n(9),O=n(516),j=n(517),C=n(1690),w=n.n(C),D=Object(y.a)({productionPrefix:"iframe-"}),_=function(e){Object(v.a)(n,e);var t=Object(b.a)(n);function n(){var e;Object(p.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={ready:!1},e.handleRef=function(t){e.contentDocument=t?t.node.contentDocument:null},e.onContentDidMount=function(){e.setState({ready:!0,jss:Object(O.a)(Object(m.a)(Object(m.a)({},Object(x.a)()),{},{plugins:[].concat(Object(f.a)(Object(x.a)().plugins),[Object(j.a)()]),insertionPoint:e.contentDocument.querySelector("#jss-demo-insertion-point")})),sheetsManager:new Map,container:e.contentDocument.body})},e.onContentDidUpdate=function(){e.contentDocument.body.dir=e.props.theme.direction},e.renderHead=function(){return d.a.createElement(d.a.Fragment,null,d.a.createElement("style",{dangerouslySetInnerHTML:{__html:"\n                    html {\n                    font-size: 62.5%;\n                    font-family: Muli, Roboto, Helvetica Neue, Arial, sans-serif;\n                    }\n                "}}),d.a.createElement("noscript",{id:"jss-demo-insertion-point"}))},e}return Object(h.a)(n,[{key:"render",value:function(){var e=this.props,t=e.children,n=e.classes,a=e.theme;return d.a.createElement(w.a,{head:this.renderHead(),ref:this.handleRef,className:n.root,contentDidMount:this.onContentDidMount,contentDidUpdate:this.onContentDidUpdate},this.state.ready?d.a.createElement(g.b,{jss:this.state.jss,generateClassName:D,sheetsManager:this.state.sheetsManager},d.a.createElement(k.a,{theme:a},d.a.cloneElement(t,{container:this.state.container}))):null)}}]),n}(d.a.Component),M=Object(E.a)((function(e){return{root:{backgroundColor:e.palette.background.default,flexGrow:1,height:400,border:"none",boxShadow:e.shadows[1]}}}),{withTheme:!0})(_);function N(e){var t=Object(u.useState)(e.currentTabIndex),n=Object(a.a)(t,2),f=n[0],m=n[1],p=e.component,h=e.raw,v=e.iframe,b=e.className;return d.a.createElement(i.a,{className:b},d.a.createElement(o.a,{position:"static",color:"default",elevation:0},d.a.createElement(l.a,{classes:{root:"border-b-1",flexContainer:"justify-end"},value:f,onChange:function(e,t){m(t)}},p&&d.a.createElement(s.a,{classes:{root:"min-w-64"},icon:d.a.createElement(c.a,null,"remove_red_eye")}),h&&d.a.createElement(s.a,{classes:{root:"min-w-64"},icon:d.a.createElement(c.a,null,"code")}))),d.a.createElement("div",{className:"flex justify-center"},d.a.createElement("div",{className:0===f?"flex flex-1":"hidden"},p&&(v?d.a.createElement(M,null,d.a.createElement(p,null)):d.a.createElement("div",{className:"p-24 flex flex-1 justify-center"},d.a.createElement(p,null)))),d.a.createElement("div",{className:1===f?"flex flex-1":"hidden"},h&&d.a.createElement("div",{className:"flex flex-1"},d.a.createElement(r.a,{component:"pre",className:"language-javascript w-full"},h.default)))))}N.defaultProps={currentTabIndex:0};var P=N},1690:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.FrameContextConsumer=t.FrameContext=void 0;var a=n(1686);Object.defineProperty(t,"FrameContext",{enumerable:!0,get:function(){return a.FrameContext}}),Object.defineProperty(t,"FrameContextConsumer",{enumerable:!0,get:function(){return a.FrameContextConsumer}});var r,o=n(1691),i=(r=o)&&r.__esModule?r:{default:r};t.default=i.default},1691:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},r=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),o=n(0),i=d(o),c=d(n(18)),s=d(n(2)),l=n(1686),u=d(n(1692));function d(e){return e&&e.__esModule?e:{default:e}}var f=function(e){function t(e,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));return a.handleLoad=function(){a.forceUpdate()},a._isMounted=!1,a}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),r(t,[{key:"componentDidMount",value:function(){this._isMounted=!0;var e=this.getDoc();e&&"complete"===e.readyState?this.forceUpdate():this.node.addEventListener("load",this.handleLoad)}},{key:"componentWillUnmount",value:function(){this._isMounted=!1,this.node.removeEventListener("load",this.handleLoad)}},{key:"getDoc",value:function(){return this.node?this.node.contentDocument:null}},{key:"getMountTarget",value:function(){var e=this.getDoc();return this.props.mountTarget?e.querySelector(this.props.mountTarget):e.body.children[0]}},{key:"renderFrameContents",value:function(){if(!this._isMounted)return null;var e=this.getDoc();if(!e)return null;var t=this.props.contentDidMount,n=this.props.contentDidUpdate,a=e.defaultView||e.parentView,r=!this._setInitialContent,o=i.default.createElement(u.default,{contentDidMount:t,contentDidUpdate:n},i.default.createElement(l.FrameContextProvider,{value:{document:e,window:a}},i.default.createElement("div",{className:"frame-content"},this.props.children)));r&&(e.open("text/html","replace"),e.write(this.props.initialContent),e.close(),this._setInitialContent=!0);var s=this.getMountTarget();return[c.default.createPortal(this.props.head,this.getDoc().head),c.default.createPortal(o,s)]}},{key:"render",value:function(){var e=this,t=a({},this.props,{children:void 0});return delete t.head,delete t.initialContent,delete t.mountTarget,delete t.contentDidMount,delete t.contentDidUpdate,i.default.createElement("iframe",a({},t,{ref:function(t){e.node=t}}),this.renderFrameContents())}}]),t}(o.Component);f.propTypes={style:s.default.object,head:s.default.node,initialContent:s.default.string,mountTarget:s.default.string,contentDidMount:s.default.func,contentDidUpdate:s.default.func,children:s.default.oneOfType([s.default.element,s.default.arrayOf(s.default.element)])},f.defaultProps={style:{},head:null,children:void 0,mountTarget:void 0,contentDidMount:function(){},contentDidUpdate:function(){},initialContent:'<!DOCTYPE html><html><head></head><body><div class="frame-root"></div></body></html>'},t.default=f},1692:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),r=n(0),o=(i(r),i(n(2)));function i(e){return e&&e.__esModule?e:{default:e}}function c(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}var l=function(e){function t(){return c(this,t),s(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),a(t,[{key:"componentDidMount",value:function(){this.props.contentDidMount()}},{key:"componentDidUpdate",value:function(){this.props.contentDidUpdate()}},{key:"render",value:function(){return r.Children.only(this.props.children)}}]),t}(r.Component);l.propTypes={children:o.default.element.isRequired,contentDidMount:o.default.func.isRequired,contentDidUpdate:o.default.func.isRequired},t.default=l},1921:function(e,t,n){"use strict";var a=n(1),r=n(3),o=n(0),i=(n(2),n(6)),c=n(9),s=n(11),l=o.forwardRef((function(e,t){var n=e.classes,c=e.className,l=e.color,u=void 0===l?"primary":l,d=e.disableShrink,f=void 0!==d&&d,m=e.size,p=void 0===m?40:m,h=e.style,v=e.thickness,b=void 0===v?3.6:v,y=e.value,x=void 0===y?0:y,g=e.variant,k=void 0===g?"indeterminate":g,E=Object(r.a)(e,["classes","className","color","disableShrink","size","style","thickness","value","variant"]),O={},j={},C={};if("determinate"===k||"static"===k){var w=2*Math.PI*((44-b)/2);O.strokeDasharray=w.toFixed(3),C["aria-valuenow"]=Math.round(x),O.strokeDashoffset="".concat(((100-x)/100*w).toFixed(3),"px"),j.transform="rotate(-90deg)"}return o.createElement("div",Object(a.a)({className:Object(i.a)(n.root,c,"inherit"!==u&&n["color".concat(Object(s.a)(u))],{determinate:n.determinate,indeterminate:n.indeterminate,static:n.static}[k]),style:Object(a.a)({width:p,height:p},j,h),ref:t,role:"progressbar"},C,E),o.createElement("svg",{className:n.svg,viewBox:"".concat(22," ").concat(22," ").concat(44," ").concat(44)},o.createElement("circle",{className:Object(i.a)(n.circle,f&&n.circleDisableShrink,{determinate:n.circleDeterminate,indeterminate:n.circleIndeterminate,static:n.circleStatic}[k]),style:O,cx:44,cy:44,r:(44-b)/2,fill:"none",strokeWidth:b})))}));t.a=Object(c.a)((function(e){return{root:{display:"inline-block"},static:{transition:e.transitions.create("transform")},indeterminate:{animation:"$circular-rotate 1.4s linear infinite"},determinate:{transition:e.transitions.create("transform")},colorPrimary:{color:e.palette.primary.main},colorSecondary:{color:e.palette.secondary.main},svg:{display:"block"},circle:{stroke:"currentColor"},circleStatic:{transition:e.transitions.create("stroke-dashoffset")},circleIndeterminate:{animation:"$circular-dash 1.4s ease-in-out infinite",strokeDasharray:"80px, 200px",strokeDashoffset:"0px"},circleDeterminate:{transition:e.transitions.create("stroke-dashoffset")},"@keyframes circular-rotate":{"0%":{transformOrigin:"50% 50%"},"100%":{transform:"rotate(360deg)"}},"@keyframes circular-dash":{"0%":{strokeDasharray:"1px, 200px",strokeDashoffset:"0px"},"50%":{strokeDasharray:"100px, 200px",strokeDashoffset:"-15px"},"100%":{strokeDasharray:"100px, 200px",strokeDashoffset:"-125px"}},circleDisableShrink:{animation:"none"}}}),{name:"MuiCircularProgress",flip:!1})(l)},3105:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return d}));var a=n(17),r=n(0),o=n.n(r),i=n(795),c=n(1921),s=n(1652),l=n(1634),u=Object(l.a)((function(e){return{backdrop:{zIndex:e.zIndex.drawer+1,color:"#fff"}}}));function d(){var e=u(),t=o.a.useState(!1),n=Object(a.a)(t,2),r=n[0],l=n[1];return o.a.createElement("div",null,o.a.createElement(s.a,{variant:"outlined",color:"primary",onClick:function(){l(!r)}},"Show backdrop"),o.a.createElement(i.a,{className:e.backdrop,open:r,onClick:function(){l(!1)}},o.a.createElement(c.a,{color:"inherit"})))}},3106:function(e,t,n){"use strict";n.r(t),t.default="import React from 'react';\r\nimport Backdrop from '@material-ui/core/Backdrop';\r\nimport CircularProgress from '@material-ui/core/CircularProgress';\r\nimport Button from '@material-ui/core/Button';\r\nimport { makeStyles } from '@material-ui/core/styles';\r\n\r\nconst useStyles = makeStyles((theme) => ({\r\n  backdrop: {\r\n    zIndex: theme.zIndex.drawer + 1,\r\n    color: '#fff',\r\n  },\r\n}));\r\n\r\nexport default function SimpleBackdrop() {\r\n  const classes = useStyles();\r\n  const [open, setOpen] = React.useState(false);\r\n  const handleClose = () => {\r\n    setOpen(false);\r\n  };\r\n  const handleToggle = () => {\r\n    setOpen(!open);\r\n  };\r\n\r\n  return (\r\n    <div>\r\n      <Button variant=\"outlined\" color=\"primary\" onClick={handleToggle}>\r\n        Show backdrop\r\n      </Button>\r\n      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>\r\n        <CircularProgress color=\"inherit\" />\r\n      </Backdrop>\r\n    </div>\r\n  );\r\n}\r\n"},3965:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(1689),i=(n(140),n(198)),c=n(1652),s=n(1647),l=n(244),u=n(1634),d=Object(u.a)((function(e){return{layoutRoot:{"& .description":{marginBottom:16}}}}));t.default=function(e){var t=d();return r.a.createElement(i.a,{classes:{root:t.layoutRoot},header:r.a.createElement("div",{className:"flex flex-1 items-center justify-between p-24"},r.a.createElement("div",{className:"flex flex-col"},r.a.createElement("div",{className:"flex items-center mb-16"},r.a.createElement(s.a,{className:"text-18",color:"action"},"home"),r.a.createElement(s.a,{className:"text-16",color:"action"},"chevron_right"),r.a.createElement(l.a,{color:"textSecondary"},"Documentation"),r.a.createElement(s.a,{className:"text-16",color:"action"},"chevron_right"),r.a.createElement(l.a,{color:"textSecondary"},"Material UI Components")),r.a.createElement(l.a,{variant:"h6"},"Backdrop")),r.a.createElement(c.a,{className:"normal-case",variant:"contained",component:"a",href:"https://material-ui.com/components/backdrop",target:"_blank",role:"button"},r.a.createElement(s.a,null,"link"),r.a.createElement("span",{className:"mx-4"},"Reference"))),content:r.a.createElement("div",{className:"p-24 max-w-2xl"},r.a.createElement(l.a,{className:"text-44 mt-32 mb-8",component:"h1"},"Backdrop"),r.a.createElement(l.a,{className:"description"},"The backdrop component is used to provide emphasis on a particular element or parts of it."),r.a.createElement(l.a,{className:"mb-16",component:"div"},"The backdrop signals to the user of a state change within the application and can be used for creating loaders, dialogs and more. In its simplest form, the backdrop component will add a dimmed layer over your application."),r.a.createElement(l.a,{className:"mb-16",component:"div"},r.a.createElement(o.a,{className:"my-24",iframe:!1,component:n(3105).default,raw:n(3106)})))})}}}]);