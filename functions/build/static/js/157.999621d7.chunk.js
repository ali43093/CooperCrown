(this["webpackJsonpfuse-react-app"]=this["webpackJsonpfuse-react-app"]||[]).push([[157],{4088:function(e,t,a){"use strict";a.r(t);var n=a(1702),c=a(293),r=a(0),o=a.n(r),l=a(1774),i=a(128),s=a(1652),m=a(1647),d=a(740),u=a(242),p=a(1668),f=a(244),h=a(5),b=a(32),E=a(1715);var g=function(e){var t=Object(h.b)(),a=Object(h.c)((function(e){return e.eCommerceApp.products.searchText})),n=Object(h.c)((function(e){return e.fuse.settings.mainTheme}));return o.a.createElement("div",{className:"flex flex-1 w-full items-center justify-between"},o.a.createElement("div",{className:"flex items-center"},o.a.createElement(i.a,{animation:"transition.expandIn",delay:300},o.a.createElement(m.a,{className:"text-32"},"shopping_basket")),o.a.createElement(i.a,{animation:"transition.slideLeftIn",delay:300},o.a.createElement(f.a,{className:"hidden sm:flex mx-0 sm:mx-12",variant:"h6"},"Show Rooms"))),o.a.createElement("div",{className:"flex flex-1 items-center justify-center px-12"},o.a.createElement(p.a,{theme:n},o.a.createElement(i.a,{animation:"transition.slideDownIn",delay:300},o.a.createElement(u.a,{className:"flex items-center w-full max-w-512 px-8 py-4 rounded-8",elevation:1},o.a.createElement(m.a,{color:"action"},"search"),o.a.createElement(d.a,{placeholder:"Search",className:"flex flex-1 mx-8",disableUnderline:!0,fullWidth:!0,value:a,inputProps:{"aria-label":"Search"},onChange:function(e){return t(E.W(e))}}))))),o.a.createElement(i.a,{animation:"transition.slideRightIn",delay:300},o.a.createElement(s.a,{component:b.a,to:"/apps/e-commerce/showRoom/new",className:"whitespace-no-wrap normal-case",variant:"contained",color:"secondary"},o.a.createElement("span",{className:"hidden sm:flex"},"Add New Show-Room"),o.a.createElement("span",{className:"flex sm:hidden"},"New"))))},w=a(1693),x=a.n(w),v=a(1717),j=a(17),O=a(37),C=a(8),N=a(1659),S=a(1812),k=a(1816),y=a(1815),P=a(2455),A=a(1814),R=a(525),I=a(10),B=a(103),L=a(830),T=a(1675),W=a(1655),z=a(538),D=a(1649),q=a(1606),J=a(1634),M=a(1813),Z=a(2454),_=a(1653),U=[{id:"Location-Name",align:"left",disablePadding:!1,label:"Location  Name",sort:!0},{id:"Location Address",align:"left",disablePadding:!1,label:"Location Address",sort:!0},{id:"City",align:"left",disablePadding:!1,label:"City",sort:!0},{id:"State",align:"left",disablePadding:!1,label:"State",sort:!0},{id:"Zip-Code",align:"left",disablePadding:!1,label:"Zip Code",sort:!0},{id:"Actions",align:"left",disablePadding:!1,label:"Actions",sort:!0}],F=Object(J.a)((function(e){return{actionsButtonWrapper:{background:e.palette.background.paper}}}));var G=function(e){var t=F(e),a=Object(r.useState)(null),n=Object(j.a)(a,2),c=n[0],l=n[1];function i(){l(null)}return o.a.createElement(M.a,null,o.a.createElement(A.a,{className:"h-64"},o.a.createElement(y.a,{padding:"none",className:"relative w-64 text-center"},o.a.createElement(N.a,{indeterminate:e.numSelected>0&&e.numSelected<e.rowCount,checked:e.numSelected===e.rowCount,onChange:e.onSelectAllClick}),e.numSelected>0&&o.a.createElement("div",{className:Object(I.a)("flex items-center justify-center absolute w-64 top-0 ltr:left-0 rtl:right-0 mx-56 h-64 z-10",t.actionsButtonWrapper)},o.a.createElement(L.a,{"aria-owns":c?"selectedProductsMenu":null,"aria-haspopup":"true",onClick:function(e){l(e.currentTarget)}},o.a.createElement(m.a,null,"more_horiz")),o.a.createElement(z.a,{id:"selectedProductsMenu",anchorEl:c,open:Boolean(c),onClose:i},o.a.createElement(q.a,null,o.a.createElement(D.a,{onClick:function(){i()}},o.a.createElement(T.a,{className:"min-w-40"},o.a.createElement(m.a,null,"delete")),o.a.createElement(W.a,{primary:"Remove"})))))),U.map((function(t){return o.a.createElement(y.a,{key:t.id,align:t.align,padding:t.disablePadding?"none":"default",sortDirection:e.order.id===t.id&&e.order.direction},t.sort&&o.a.createElement(_.a,{title:"Sort",placement:"right"===t.align?"bottom-end":"bottom-start",enterDelay:300},o.a.createElement(Z.a,{active:e.order.id===t.id,direction:e.order.direction,onClick:(a=t.id,function(t){e.onRequestSort(t,a)})},t.label)));var a}),this)))};var H=Object(B.j)((function(e){var t=Object(h.b)(),a=Object(h.c)((function(e){return e.eCommerceApp.products.data})),n=Object(h.c)((function(e){return e.eCommerceApp.products.searchText})),c=Object(r.useState)([]),l=Object(j.a)(c,2),i=l[0],m=l[1],d=Object(r.useState)(a),u=Object(j.a)(d,2),p=u[0],f=u[1],b=Object(r.useState)(!1),g=Object(j.a)(b,2),w=g[0],I=g[1],B=Object(r.useState)(0),L=Object(j.a)(B,2),T=L[0],W=L[1],z=Object(r.useState)(10),D=Object(j.a)(z,2),q=D[0],J=D[1],M=Object(r.useState)({direction:"asc",id:null}),Z=Object(j.a)(M,2),_=Z[0],U=Z[1];return Object(r.useEffect)((function(){(function(){var e=Object(v.a)(x.a.mark((function e(){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return I(!1),e.t0=t,e.next=4,E.I();case 4:return e.t1=e.sent,e.next=7,(0,e.t0)(e.t1);case 7:I(!0);case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[t]),Object(r.useEffect)((function(){f(a)}),[a,n]),w?o.a.createElement("div",{className:"w-full flex flex-col"},o.a.createElement(O.a,{className:"flex-grow overflow-x-auto"},o.a.createElement(S.a,{className:"min-w-xl","aria-labelledby":"tableTitle"},o.a.createElement(G,{numSelected:i.length,order:_,onSelectAllClick:function(e){e.target.checked?m(p.map((function(e){return e.id}))):m([])},onRequestSort:function(e,t){var a=t,n="desc";_.id===t&&"desc"===_.direction&&(n="asc"),U({direction:n,id:a})},rowCount:p.length}),o.a.createElement(k.a,null,C.a.orderBy(p,[function(e){switch(_.id){case"State":return e.categories[0];default:return e[_.id]}}],[_.direction]).slice(T*q,T*q+q).map((function(t){var a=-1!==i.indexOf(t.id);return o.a.createElement(A.a,{className:"h-64 cursor-pointer",hover:!0,role:"checkbox","aria-checked":a,tabIndex:-1,key:t.id,selected:a,onClick:function(a){return n=t,void e.history.push("/apps/e-commerce/showRoom/".concat(n.id));var n}},o.a.createElement(y.a,{className:"w-64 text-center",padding:"none"},o.a.createElement(N.a,{checked:a,onClick:function(e){return e.stopPropagation()},onChange:function(e){return function(e,t){var a=i.indexOf(t),n=[];-1===a?n=n.concat(i,t):0===a?n=n.concat(i.slice(1)):a===i.length-1?n=n.concat(i.slice(0,-1)):a>0&&(n=n.concat(i.slice(0,a),i.slice(a+1))),m(n)}(0,t.id)}})),o.a.createElement(y.a,{component:"th",scope:"row"},t.locationName),o.a.createElement(y.a,{component:"th",scope:"row"},t.locationAddress),o.a.createElement(y.a,{component:"th",scope:"row"},t.City),o.a.createElement(y.a,{component:"th",scope:"row"},t.State),o.a.createElement(y.a,{component:"th",scope:"row"},t.zipCode),o.a.createElement(y.a,{component:"th",scope:"row"},o.a.createElement(s.a,{className:"whitespace-no-wrap normal-case",variant:"contained",color:"secondary",onClick:function(){e.history.push("/apps/e-commerce/showRoom/".concat(t.id))}},"Edit")))}))))),o.a.createElement(P.a,{className:"overflow-hidden",component:"div",count:p.length,rowsPerPage:q,page:T,backIconButtonProps:{"aria-label":"Previous Page"},nextIconButtonProps:{"aria-label":"Next Page"},onChangePage:function(e,t){W(t)},onChangeRowsPerPage:function(e){J(e.target.value)}})):o.a.createElement(R.a,null)}));t.default=Object(c.a)("eCommerceApp",l.a)((function(){return o.a.createElement(n.a,{classes:{content:"flex",header:"min-h-72 h-72 sm:h-136 sm:min-h-136"},header:o.a.createElement(g,null),content:o.a.createElement(H,null),innerScroll:!0})}))}}]);