(this["webpackJsonpfuse-react-app"]=this["webpackJsonpfuse-react-app"]||[]).push([[155],{3933:function(e,a,t){"use strict";t.r(a);var n=t(1693),r=t.n(n),s=t(1717),o=t(17),i=t(128),c=(t(529),t(525)),l=t(1702),m=t(154),u=(t(30),t(8),t(1652)),d=t(235),p=t(1647),f=t(1634),h=t(51),w=t(1680),b=t(1681),x=t(1657),E=t(244),g=t(293),v=(t(10),t(0)),y=t.n(v),I=t(5),O=t(103),j=t(32),N=t(1715),C=t(1774),k=Object(f.a)((function(e){return{productImageFeaturedStar:{position:"absolute",top:0,right:0,color:d.a[400],opacity:0},productImageUpload:{transitionProperty:"box-shadow",transitionDuration:e.transitions.duration.short,transitionTimingFunction:e.transitions.easing.easeInOut},productImageItem:{transitionProperty:"box-shadow",transitionDuration:e.transitions.duration.short,transitionTimingFunction:e.transitions.easing.easeInOut,"&:hover":{"& $productImageFeaturedStar":{opacity:.8}},"&.featured":{pointerEvents:"none",boxShadow:e.shadows[3],"& $productImageFeaturedStar":{opacity:1},"&:hover $productImageFeaturedStar":{opacity:1}}}}}));a.default=Object(g.a)("eCommerceApp",C.a)((function(e){var a=Object(I.b)(),t=Object(I.c)((function(e){return e.eCommerceApp.user})),n=Object(h.a)(),d=(k(e),Object(v.useState)(0)),f=Object(o.a)(d,2),g=f[0],C=f[1],S=Object(v.useState)(!1),F=Object(o.a)(S,2),P=F[0],U=F[1],T=Object(m.c)(null),D=T.form,R=T.handleChange,W=T.setForm,$=Object(O.i)();return Object(m.b)((function(){(function(){var e=Object(s.a)(r.a.mark((function e(){var t;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(U(!1),"new"!==(t=$.userId)){e.next=7;break}a(N.O()),U(!0),e.next=14;break;case 7:return e.t0=a,e.next=10,N.B(t);case 10:return e.t1=e.sent,e.next=13,(0,e.t0)(e.t1);case 13:U(!0);case 14:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[a,$]),Object(v.useEffect)((function(){(t.data&&!D||t.data&&D&&t.data.id!==D.id)&&W(t.data)}),[D,t.data,W]),t.data&&(!t.data||$.userId===t.data.id)||"new"===$.userId||P?y.a.createElement(l.a,{classes:{toolbar:"p-0",header:"min-h-72 h-72 sm:h-136 sm:min-h-136"},header:D&&y.a.createElement("div",{className:"flex flex-1 w-full items-center justify-between"},y.a.createElement("div",{className:"flex flex-col items-start max-w-full"},y.a.createElement(i.a,{animation:"transition.slideRightIn",delay:300},y.a.createElement(E.a,{className:"normal-case flex items-center sm:mb-12",component:j.a,role:"button",to:"/apps/e-commerce/users",color:"inherit"},y.a.createElement(p.a,{className:"text-20"},"ltr"===n.direction?"arrow_back":"arrow_forward"),y.a.createElement("span",{className:"mx-4"},"Users"))),y.a.createElement("div",{className:"flex items-center max-w-full"},y.a.createElement(i.a,{animation:"transition.expandIn",delay:300},y.a.createElement("img",{className:"w-32 sm:w-48 rounded",src:"assets/images/ecommerce/product-image-placeholder.png",alt:D.email})),y.a.createElement("div",{className:"flex flex-col min-w-0 mx-8 sm:mc-16"},y.a.createElement(i.a,{animation:"transition.slideLeftIn",delay:300},y.a.createElement(E.a,{className:"text-16 sm:text-20 truncate"},D.email?D.email:"New User")),y.a.createElement(i.a,{animation:"transition.slideLeftIn",delay:300},y.a.createElement(E.a,{variant:"caption"},"User Detail"))))),y.a.createElement(i.a,{animation:"transition.slideRightIn",delay:300},y.a.createElement(u.a,{className:"whitespace-no-wrap normal-case",variant:"contained",color:"secondary",disabled:!(D.email.length>0&&D.password.length>0&&D.confirmPassword.length>0&&D.password===D.confirmPassword),onClick:Object(s.a)(r.a.mark((function t(){return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if("new"!==$.userId){t.next=10;break}return U(!1),t.t0=a,t.next=5,N.T(D);case 5:return t.t1=t.sent,t.next=8,(0,t.t0)(t.t1);case 8:e.history.push("/apps/e-commerce/users"),U(!0);case 10:case"end":return t.stop()}}),t)})))},"Save"))),contentToolbar:y.a.createElement(b.a,{value:g,onChange:function(e,a){C(a)},indicatorColor:"primary",textColor:"primary",variant:"scrollable",scrollButtons:"auto",classes:{root:"w-full h-64"}},y.a.createElement(w.a,{className:"h-64 normal-case",label:"Register User"})),content:D&&y.a.createElement("div",{className:"p-16 sm:p-24 max-w-2xl"},0===g&&y.a.createElement("div",null,y.a.createElement(x.a,{className:"mt-8 mb-16",error:""===D.email,required:!0,label:"Email",autoFocus:!0,id:"user-email",name:"email",value:D.email,onChange:R,variant:"outlined",fullWidth:!0}),y.a.createElement(x.a,{className:"mt-8 mb-16",id:"user-password",name:"password",onChange:R,label:"Password",type:"password",value:D.password,variant:"outlined",fullWidth:!0}),y.a.createElement(x.a,{className:"mt-8 mb-16",id:"user-password-confirm",name:"confirmPassword",onChange:R,label:"Confirm Password",type:"password",value:D.confirmPassword,variant:"outlined",fullWidth:!0}))),innerScroll:!0}):y.a.createElement(c.a,null)}))}}]);