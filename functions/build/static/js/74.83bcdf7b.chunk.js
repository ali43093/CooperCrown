(this["webpackJsonpfuse-react-app"]=this["webpackJsonpfuse-react-app"]||[]).push([[74],{1686:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.FrameContextConsumer=t.FrameContextProvider=t.FrameContext=void 0;var a,r=n(0),o=(a=r)&&a.__esModule?a:{default:a};var i=void 0,l=void 0;"undefined"!==typeof document&&(i=document),"undefined"!==typeof window&&(l=window);var c=t.FrameContext=o.default.createContext({document:i,window:l}),s=c.Provider,u=c.Consumer;t.FrameContextProvider=s,t.FrameContextConsumer=u},1689:function(e,t,n){"use strict";n.d(t,"a",(function(){return L}));var a=n(17),r=n(140),o=n(1669),i=n(1677),l=n(1647),c=n(1680),s=n(1681),u=n(0),m=n.n(u),d=n(12),f=n(4),p=n(83),h=n(84),b=n(152),v=n(153),y=n(1600),E=n(797),g=n(1636),w=n(1668),k=n(9),x=n(516),j=n(517),C=n(1690),O=n.n(C),D=Object(y.a)({productionPrefix:"iframe-"}),_=function(e){Object(b.a)(n,e);var t=Object(v.a)(n);function n(){var e;Object(p.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={ready:!1},e.handleRef=function(t){e.contentDocument=t?t.node.contentDocument:null},e.onContentDidMount=function(){e.setState({ready:!0,jss:Object(x.a)(Object(f.a)(Object(f.a)({},Object(E.a)()),{},{plugins:[].concat(Object(d.a)(Object(E.a)().plugins),[Object(j.a)()]),insertionPoint:e.contentDocument.querySelector("#jss-demo-insertion-point")})),sheetsManager:new Map,container:e.contentDocument.body})},e.onContentDidUpdate=function(){e.contentDocument.body.dir=e.props.theme.direction},e.renderHead=function(){return m.a.createElement(m.a.Fragment,null,m.a.createElement("style",{dangerouslySetInnerHTML:{__html:"\n                    html {\n                    font-size: 62.5%;\n                    font-family: Muli, Roboto, Helvetica Neue, Arial, sans-serif;\n                    }\n                "}}),m.a.createElement("noscript",{id:"jss-demo-insertion-point"}))},e}return Object(h.a)(n,[{key:"render",value:function(){var e=this.props,t=e.children,n=e.classes,a=e.theme;return m.a.createElement(O.a,{head:this.renderHead(),ref:this.handleRef,className:n.root,contentDidMount:this.onContentDidMount,contentDidUpdate:this.onContentDidUpdate},this.state.ready?m.a.createElement(g.b,{jss:this.state.jss,generateClassName:D,sheetsManager:this.state.sheetsManager},m.a.createElement(w.a,{theme:a},m.a.cloneElement(t,{container:this.state.container}))):null)}}]),n}(m.a.Component),N=Object(k.a)((function(e){return{root:{backgroundColor:e.palette.background.default,flexGrow:1,height:400,border:"none",boxShadow:e.shadows[1]}}}),{withTheme:!0})(_);function T(e){var t=Object(u.useState)(e.currentTabIndex),n=Object(a.a)(t,2),d=n[0],f=n[1],p=e.component,h=e.raw,b=e.iframe,v=e.className;return m.a.createElement(i.a,{className:v},m.a.createElement(o.a,{position:"static",color:"default",elevation:0},m.a.createElement(s.a,{classes:{root:"border-b-1",flexContainer:"justify-end"},value:d,onChange:function(e,t){f(t)}},p&&m.a.createElement(c.a,{classes:{root:"min-w-64"},icon:m.a.createElement(l.a,null,"remove_red_eye")}),h&&m.a.createElement(c.a,{classes:{root:"min-w-64"},icon:m.a.createElement(l.a,null,"code")}))),m.a.createElement("div",{className:"flex justify-center"},m.a.createElement("div",{className:0===d?"flex flex-1":"hidden"},p&&(b?m.a.createElement(N,null,m.a.createElement(p,null)):m.a.createElement("div",{className:"p-24 flex flex-1 justify-center"},m.a.createElement(p,null)))),m.a.createElement("div",{className:1===d?"flex flex-1":"hidden"},h&&m.a.createElement("div",{className:"flex flex-1"},m.a.createElement(r.a,{component:"pre",className:"language-javascript w-full"},h.default)))))}T.defaultProps={currentTabIndex:0};var L=T},1690:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.FrameContextConsumer=t.FrameContext=void 0;var a=n(1686);Object.defineProperty(t,"FrameContext",{enumerable:!0,get:function(){return a.FrameContext}}),Object.defineProperty(t,"FrameContextConsumer",{enumerable:!0,get:function(){return a.FrameContextConsumer}});var r,o=n(1691),i=(r=o)&&r.__esModule?r:{default:r};t.default=i.default},1691:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},r=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),o=n(0),i=m(o),l=m(n(18)),c=m(n(2)),s=n(1686),u=m(n(1692));function m(e){return e&&e.__esModule?e:{default:e}}var d=function(e){function t(e,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));return a.handleLoad=function(){a.forceUpdate()},a._isMounted=!1,a}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),r(t,[{key:"componentDidMount",value:function(){this._isMounted=!0;var e=this.getDoc();e&&"complete"===e.readyState?this.forceUpdate():this.node.addEventListener("load",this.handleLoad)}},{key:"componentWillUnmount",value:function(){this._isMounted=!1,this.node.removeEventListener("load",this.handleLoad)}},{key:"getDoc",value:function(){return this.node?this.node.contentDocument:null}},{key:"getMountTarget",value:function(){var e=this.getDoc();return this.props.mountTarget?e.querySelector(this.props.mountTarget):e.body.children[0]}},{key:"renderFrameContents",value:function(){if(!this._isMounted)return null;var e=this.getDoc();if(!e)return null;var t=this.props.contentDidMount,n=this.props.contentDidUpdate,a=e.defaultView||e.parentView,r=!this._setInitialContent,o=i.default.createElement(u.default,{contentDidMount:t,contentDidUpdate:n},i.default.createElement(s.FrameContextProvider,{value:{document:e,window:a}},i.default.createElement("div",{className:"frame-content"},this.props.children)));r&&(e.open("text/html","replace"),e.write(this.props.initialContent),e.close(),this._setInitialContent=!0);var c=this.getMountTarget();return[l.default.createPortal(this.props.head,this.getDoc().head),l.default.createPortal(o,c)]}},{key:"render",value:function(){var e=this,t=a({},this.props,{children:void 0});return delete t.head,delete t.initialContent,delete t.mountTarget,delete t.contentDidMount,delete t.contentDidUpdate,i.default.createElement("iframe",a({},t,{ref:function(t){e.node=t}}),this.renderFrameContents())}}]),t}(o.Component);d.propTypes={style:c.default.object,head:c.default.node,initialContent:c.default.string,mountTarget:c.default.string,contentDidMount:c.default.func,contentDidUpdate:c.default.func,children:c.default.oneOfType([c.default.element,c.default.arrayOf(c.default.element)])},d.defaultProps={style:{},head:null,children:void 0,mountTarget:void 0,contentDidMount:function(){},contentDidUpdate:function(){},initialContent:'<!DOCTYPE html><html><head></head><body><div class="frame-root"></div></body></html>'},t.default=d},1692:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),r=n(0),o=(i(r),i(n(2)));function i(e){return e&&e.__esModule?e:{default:e}}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function c(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}var s=function(e){function t(){return l(this,t),c(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),a(t,[{key:"componentDidMount",value:function(){this.props.contentDidMount()}},{key:"componentDidUpdate",value:function(){this.props.contentDidUpdate()}},{key:"render",value:function(){return r.Children.only(this.props.children)}}]),t}(r.Component);s.propTypes={children:o.default.element.isRequired,contentDidMount:o.default.func.isRequired,contentDidUpdate:o.default.func.isRequired},t.default=s},2405:function(e,t,n){"use strict";var a=n(1),r=n(3),o=n(0),i=(n(2),n(6)),l=n(11),c=n(9),s=n(300),u=n(26),m=n(244),d=o.forwardRef((function(e,t){var n=e.classes,c=e.className,d=e.color,f=void 0===d?"primary":d,p=e.component,h=void 0===p?"a":p,b=e.onBlur,v=e.onFocus,y=e.TypographyClasses,E=e.underline,g=void 0===E?"hover":E,w=e.variant,k=void 0===w?"inherit":w,x=Object(r.a)(e,["classes","className","color","component","onBlur","onFocus","TypographyClasses","underline","variant"]),j=Object(s.a)(),C=j.isFocusVisible,O=j.onBlurVisible,D=j.ref,_=o.useState(!1),N=_[0],T=_[1],L=Object(u.a)(t,D);return o.createElement(m.a,Object(a.a)({className:Object(i.a)(n.root,n["underline".concat(Object(l.a)(g))],c,N&&n.focusVisible,"button"===h&&n.button),classes:y,color:f,component:h,onBlur:function(e){N&&(O(),T(!1)),b&&b(e)},onFocus:function(e){C(e)&&T(!0),v&&v(e)},ref:L,variant:k},x))}));t.a=Object(c.a)({root:{},underlineNone:{textDecoration:"none"},underlineHover:{textDecoration:"none","&:hover":{textDecoration:"underline"}},underlineAlways:{textDecoration:"underline"},button:{position:"relative",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle","-moz-appearance":"none","-webkit-appearance":"none","&::-moz-focus-inner":{borderStyle:"none"},"&$focusVisible":{outline:"auto"}},focusVisible:{}},{name:"MuiLink"})(d)},3344:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return s}));var a=n(0),r=n.n(a),o=n(1634),i=n(2405),l=n(244),c=Object(o.a)((function(e){return{root:{"& > * + *":{marginLeft:e.spacing(2)}}}}));function s(){var e=c(),t=function(e){return e.preventDefault()};return r.a.createElement(l.a,{className:e.root},r.a.createElement(i.a,{href:"#",onClick:t},"Link"),r.a.createElement(i.a,{href:"#",onClick:t,color:"inherit"},'color="inherit"'),r.a.createElement(i.a,{href:"#",onClick:t,variant:"body2"},'variant="body2"'))}},3345:function(e,t,n){"use strict";n.r(t),t.default="/* eslint-disable jsx-a11y/anchor-is-valid */\r\nimport React from 'react';\r\nimport { makeStyles } from '@material-ui/core/styles';\r\nimport Link from '@material-ui/core/Link';\r\nimport Typography from '@material-ui/core/Typography';\r\n\r\nconst useStyles = makeStyles((theme) => ({\r\n  root: {\r\n    '& > * + *': {\r\n      marginLeft: theme.spacing(2),\r\n    },\r\n  },\r\n}));\r\n\r\nexport default function Links() {\r\n  const classes = useStyles();\r\n  const preventDefault = (event) => event.preventDefault();\r\n\r\n  return (\r\n    <Typography className={classes.root}>\r\n      <Link href=\"#\" onClick={preventDefault}>\r\n        Link\r\n      </Link>\r\n      <Link href=\"#\" onClick={preventDefault} color=\"inherit\">\r\n        {'color=\"inherit\"'}\r\n      </Link>\r\n      <Link href=\"#\" onClick={preventDefault} variant=\"body2\">\r\n        {'variant=\"body2\"'}\r\n      </Link>\r\n    </Typography>\r\n  );\r\n}\r\n"},3346:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return i}));var a=n(0),r=n.n(a),o=n(2405);function i(){return r.a.createElement(o.a,{component:"button",variant:"body2",onClick:function(){console.info("I'm a button.")}},"Button Link")}},3347:function(e,t,n){"use strict";n.r(t),t.default='/* eslint-disable jsx-a11y/anchor-is-valid */\r\nimport React from \'react\';\r\nimport Link from \'@material-ui/core/Link\';\r\n\r\nexport default function ButtonLink() {\r\n  return (\r\n    <Link\r\n      component="button"\r\n      variant="body2"\r\n      onClick={() => {\r\n        console.info("I\'m a button.");\r\n      }}\r\n    >\r\n      Button Link\r\n    </Link>\r\n  );\r\n}\r\n'},3986:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(1689),i=(n(140),n(198)),l=n(1652),c=n(1647),s=n(244),u=n(1634),m=Object(u.a)((function(e){return{layoutRoot:{"& .description":{marginBottom:16}}}}));t.default=function(e){var t=m();return r.a.createElement(i.a,{classes:{root:t.layoutRoot},header:r.a.createElement("div",{className:"flex flex-1 items-center justify-between p-24"},r.a.createElement("div",{className:"flex flex-col"},r.a.createElement("div",{className:"flex items-center mb-16"},r.a.createElement(c.a,{className:"text-18",color:"action"},"home"),r.a.createElement(c.a,{className:"text-16",color:"action"},"chevron_right"),r.a.createElement(s.a,{color:"textSecondary"},"Documentation"),r.a.createElement(c.a,{className:"text-16",color:"action"},"chevron_right"),r.a.createElement(s.a,{color:"textSecondary"},"Material UI Components")),r.a.createElement(s.a,{variant:"h6"},"Links")),r.a.createElement(l.a,{className:"normal-case",variant:"contained",component:"a",href:"https://material-ui.com/components/links",target:"_blank",role:"button"},r.a.createElement(c.a,null,"link"),r.a.createElement("span",{className:"mx-4"},"Reference"))),content:r.a.createElement("div",{className:"p-24 max-w-2xl"},r.a.createElement(s.a,{className:"text-44 mt-32 mb-8",component:"h1"},"Links"),r.a.createElement(s.a,{className:"description"},"The Link component allows you to easily customize anchor elements with your theme colors and typography styles."),r.a.createElement(s.a,{className:"text-32 mt-32 mb-8",component:"h2"},"Simple links"),r.a.createElement(s.a,{className:"mb-16",component:"div"},"The Link component is built on top of the ",r.a.createElement("a",{href:"/api/typography/"},"Typography")," component. You can leverage its properties."),r.a.createElement(s.a,{className:"mb-16",component:"div"},r.a.createElement(o.a,{className:"my-24",iframe:!1,component:n(3344).default,raw:n(3345)})),r.a.createElement(s.a,{className:"mb-16",component:"div"},"However, the Link component has different default properties than the Typography component:"),r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement("code",null,'color="primary"')," as the link needs to stand out."),r.a.createElement("li",null,r.a.createElement("code",null,'variant="inherit"')," as the link will, most of the time, be used as a child of a Typography component.")),r.a.createElement(s.a,{className:"text-32 mt-32 mb-8",component:"h2"},"Security"),r.a.createElement(s.a,{className:"mb-16",component:"div"},"When you use ",r.a.createElement("code",null,'target="_blank"')," with Links, it is ",r.a.createElement("a",{href:"https://developers.google.com/web/tools/lighthouse/audits/noopener"},"recommended")," to always set ",r.a.createElement("code",null,'rel="noopener"')," or ",r.a.createElement("code",null,'rel="noreferrer"')," when linking to third party content."),r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement("code",null,'rel="noopener"')," prevents the new page from being able to access the ",r.a.createElement("code",null,"window.opener")," property and ensures it runs in a separate process. Without this, the target page can potentially redirect your page to a malicious URL."),r.a.createElement("li",null,r.a.createElement("code",null,'rel="noreferrer"')," has the same effect, but also prevents the ",r.a.createElement("em",null,"Referer")," header from being sent to the new page. \u26a0\ufe0f Removing the referrer header will affect analytics.")),r.a.createElement(s.a,{className:"text-32 mt-32 mb-8",component:"h2"},"Third-party routing library"),r.a.createElement(s.a,{className:"mb-16",component:"div"},"One common use case is to perform navigation on the client only, without an HTTP round-trip to the server. The ",r.a.createElement("code",null,"Link")," component provides a property to handle this use case: ",r.a.createElement("code",null,"component"),"."),r.a.createElement(s.a,{className:"mb-16",component:"div"},"Here is an ",r.a.createElement("a",{href:"/guides/composition/#link"},"integration example with react-router"),"."),r.a.createElement(s.a,{className:"text-32 mt-32 mb-8",component:"h2"},"Accessibility"),r.a.createElement(s.a,{className:"mb-16",component:"div"},"(WAI-ARIA: ",r.a.createElement("a",{href:"https://www.w3.org/TR/wai-aria-practices/#link"},"https://www.w3.org/TR/wai-aria-practices/#link"),")"),r.a.createElement("ul",null,r.a.createElement("li",null,'When providing the content for the link, avoid generic descriptions like "click here" or "go to". Instead, use ',r.a.createElement("a",{href:"https://developers.google.com/web/tools/lighthouse/audits/descriptive-link-text"},"specific descriptions"),"."),r.a.createElement("li",null,"For the best user experience, links should stand out from the text on the page."),r.a.createElement("li",null,"If a link doesn't have a meaningful href, ",r.a.createElement("a",{href:"https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md"},"it should be rendered using a ",r.a.createElement("code",null,"<button>")," element"),".")),r.a.createElement(s.a,{className:"mb-16",component:"div"},r.a.createElement(o.a,{className:"my-24",iframe:!1,component:n(3346).default,raw:n(3347)})))})}}}]);