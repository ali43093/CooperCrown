(this["webpackJsonpfuse-react-app"]=this["webpackJsonpfuse-react-app"]||[]).push([[107],{1797:function(e,a,t){"use strict";var n=t(1),r=t(3),c=t(0),l=(t(2),t(6)),o=t(9),i=c.forwardRef((function(e,a){var t=e.classes,o=e.className,i=e.dividers,s=void 0!==i&&i,m=Object(r.a)(e,["classes","className","dividers"]);return c.createElement("div",Object(n.a)({className:Object(l.a)(t.root,o,s&&t.dividers),ref:a},m))}));a.a=Object(o.a)((function(e){return{root:{flex:"1 1 auto",WebkitOverflowScrolling:"touch",overflowY:"auto",padding:"8px 24px","&:first-child":{paddingTop:20}},dividers:{padding:"16px 24px",borderTop:"1px solid ".concat(e.palette.divider),borderBottom:"1px solid ".concat(e.palette.divider)}}}),{name:"MuiDialogContent"})(i)},1811:function(e,a,t){"use strict";var n=t(1),r=t(3),c=t(0),l=(t(2),t(6)),o=t(9),i=c.forwardRef((function(e,a){var t=e.disableSpacing,o=void 0!==t&&t,i=e.classes,s=e.className,m=Object(r.a)(e,["disableSpacing","classes","className"]);return c.createElement("div",Object(n.a)({className:Object(l.a)(i.root,s,!o&&i.spacing),ref:a},m))}));a.a=Object(o.a)({root:{display:"flex",alignItems:"center",padding:8,justifyContent:"flex-end",flex:"0 0 auto"},spacing:{"& > :not(:first-child)":{marginLeft:8}}},{name:"MuiDialogActions"})(i)},1873:function(e,a,t){"use strict";var n=t(1),r=t(3),c=t(0),l=(t(2),t(6)),o=t(9),i=t(244),s=c.forwardRef((function(e,a){var t=e.children,o=e.classes,s=e.className,m=e.disableTypography,u=void 0!==m&&m,d=Object(r.a)(e,["children","classes","className","disableTypography"]);return c.createElement("div",Object(n.a)({className:Object(l.a)(o.root,s),ref:a},d),u?t:c.createElement(i.a,{component:"h2",variant:"h6"},t))}));a.a=Object(o.a)({root:{margin:0,padding:"16px 24px",flex:"0 0 auto"}},{name:"MuiDialogTitle"})(s)},1942:function(e,a,t){"use strict";var n=t(1),r=t(0),c=(t(2),t(9)),l=t(244),o=r.forwardRef((function(e,a){return r.createElement(l.a,Object(n.a)({component:"p",variant:"body1",color:"textSecondary",ref:a},e))}));a.a=Object(c.a)({root:{marginBottom:12}},{name:"MuiDialogContentText"})(o)},4046:function(e,a,t){"use strict";t.r(a);var n=t(4),r=t(17),c=t(128),l=t(205),o=t(1652),i=t(1677),s=t(1678),m=t(1664),u=t(1811),d=t(1797),p=t(1942),f=t(1873),b=t(1647),v=t(1607),x=t(1608),E=t(1675),g=t(1655),j=t(831),O=t(1634),y=t(244),w=t(58),h=t.n(w),N=t(10),k=t(0),S=t.n(k),C=S.a.forwardRef((function(e,a){return S.a.createElement(j.a,Object.assign({direction:"up",ref:a},e))})),T=Object(O.a)((function(e){return{header:{background:"linear-gradient(to right, ".concat(e.palette.primary.dark," 0%, ").concat(e.palette.primary.main," 100%)"),color:e.palette.primary.contrastText}}}));a.default=function(){var e=T(),a=Object(k.useState)([]),t=Object(r.a)(a,2),j=t[0],O=t[1],w=Object(k.useState)({open:!1,title:null,content:null}),M=Object(r.a)(w,2),R=M[0],D=M[1];return Object(k.useEffect)((function(){h.a.get("/api/knowledge-base").then((function(e){O(e.data)}))}),[]),S.a.createElement("div",{className:"w-full"},S.a.createElement("div",{className:Object(N.a)(e.header,"flex flex-col items-center justify-center text-center p-16 sm:p-24 h-200 sm:h-360")},S.a.createElement(c.a,{animation:"transition.slideUpIn",duration:400,delay:100},S.a.createElement(y.a,{color:"inherit",className:"text-36 sm:text-56 font-light"},"How can we help?")),S.a.createElement(c.a,{duration:400,delay:600},S.a.createElement(y.a,{variant:"subtitle1",color:"inherit",className:"opacity-75 mt-16 mx-auto max-w-512"},"Welcome to our knowledge base"))),S.a.createElement("div",null,Object(k.useMemo)((function(){return S.a.createElement(l.a,{enter:{animation:"transition.slideUpBigIn"},className:"flex flex-wrap justify-center max-w-xl w-full mx-auto px-16 sm:px-24 py-32"},j.map((function(e){return S.a.createElement("div",{className:"w-full max-w-512 pb-24 md:w-1/2 md:p-16",key:e.id},S.a.createElement(i.a,{elevation:1},S.a.createElement(s.a,null,S.a.createElement(y.a,{className:"font-medium px-16 pt-8",color:"textSecondary"},e.title),S.a.createElement(v.a,{component:"nav"},e.featuredArticles.map((function(e){return S.a.createElement(x.a,{key:e.id,button:!0,onClick:function(){return a=e,void D(Object(n.a)({open:!0},a));var a}},S.a.createElement(E.a,{className:"min-w-40"},S.a.createElement(b.a,null,"note")),S.a.createElement(g.a,{primary:e.title}))}))),S.a.createElement(o.a,{className:"normal-case w-full justify-start",color:"secondary"},"See all articles (".concat(e.articlesCount,")")))))})))}),[j])),Object(k.useMemo)((function(){function e(){D(Object(n.a)(Object(n.a)({},R),{},{open:!1}))}return S.a.createElement(m.a,{open:R.open,onClose:e,"aria-labelledby":"knowledge-base-document",TransitionComponent:C},S.a.createElement(f.a,null,R.title),S.a.createElement(d.a,null,S.a.createElement(p.a,{dangerouslySetInnerHTML:{__html:R.content}})),S.a.createElement(u.a,null,S.a.createElement(o.a,{onClick:e,color:"primary"},"CLOSE")))}),[R]))}}}]);