(this.webpackJsonpmessenger=this.webpackJsonpmessenger||[]).push([[0],{11:function(e,t,s){e.exports={container:"Messenger_container__gA902",card:"Messenger_card__3SCKJ",move:"Messenger_move__2Bk8o",logo:"Messenger_logo__1lqdr",icon:"Messenger_icon__H5jjp",messages:"Messenger_messages__1A6Tp",typer:"Messenger_typer__2uVDU",type:"Messenger_type__1YdDg",submit:"Messenger_submit__PgnE3"}},14:function(e,t,s){e.exports={container:"Messages_container__KReUA",fade:"Messages_fade__5g-Gr",wrapper:"Messages_wrapper__qlgLc",info:"Messages_info__4NuBQ",details:"Messages_details__1dItq"}},34:function(e,t,s){},47:function(e,t,s){"use strict";s.r(t);var n=s(2),a=s(16),c=s.n(a),r=(s(34),s(13)),i=s(11),o=s.n(i),l=s(26),u=s.n(l),d=s(28),m=s.n(d),j=s(14),p=s.n(j),b=s(5),g=function(e){return Object(b.jsx)(b.Fragment,{children:Object(b.jsxs)("div",{className:p.a.container,style:{alignSelf:!0===e.sender?"flex-end":"flex-start"},children:[Object(b.jsxs)("div",{className:p.a.wrapper,style:{alignSelf:!0===e.sender?"flex-end":"flex-start",backgroundColor:!0===e.sender?"aqua":"lightgrey",borderTopLeftRadius:!0===e.sender?"5px":"0",borderBottomRightRadius:!0===e.sender?"0":"5px"},children:[Object(b.jsx)("div",{style:{textAlign:!0===e.sender?"right":"left",color:!0===e.sender?"blue":"red"},className:p.a.info,children:e.name}),e.text]}),Object(b.jsxs)("div",{className:p.a.details,style:{alignSelf:!0===e.sender?"flex-end":"flex-start"},children:[e.time.toLocaleDateString()," ",e.time.toLocaleTimeString()]})]})})},f=s(17),O=f.a.initializeApp({apiKey:"AIzaSyA20No1Szz3Gu2aLWUjv-AwqLALwHCl12Y",authDomain:"sandesh-chatting-app.firebaseapp.com",projectId:"sandesh-chatting-app",storageBucket:"sandesh-chatting-app.appspot.com",messagingSenderId:"128133152544",appId:"1:128133152544:web:01b451d3fdae452fc16145"}).firestore(),_=s(21),h=s.p+"static/media/insight-578.e7e8aabb.mp3",x=s.p+"static/media/done-for-you-612.f1aedf04.mp3",y=function(){var e=Object(n.useState)(.3),t=Object(r.a)(e,2),s=t[0],a=(t[1],Object(_.a)(h,{volume:s})),c=Object(r.a)(a,1)[0],i=Object(_.a)(x,{volume:s}),l=Object(r.a)(i,1)[0],d=Object(n.useRef)(null),j=Object(n.useState)("unknown"),p=Object(r.a)(j,2),y=p[0],v=p[1],S=Object(n.useState)(""),M=Object(r.a)(S,2),N=M[0],w=M[1],A=Object(n.useState)([]),k=Object(r.a)(A,2),D=k[0],I=k[1],L=Object(n.useState)({username:null}),q=Object(r.a)(L,2),B=q[0],E=q[1];Object(n.useEffect)((function(){var e;null===(e=d.current)||void 0===e||e.scrollIntoView({behavior:"smooth"}),D.length>0&&D[D.length-1].username!=y&&c()}),[D]),Object(n.useEffect)((function(){O.collection("messages").orderBy("timestamp","asc").onSnapshot((function(e){I(e.docs.map((function(e){return e.data()})))})),O.collection("typer").doc("typer").onSnapshot((function(e){E(e.data())}))}),[]),Object(n.useEffect)((function(){null!=B.username&&""!==B.username||(O.collection("typer").doc("typer").set({username:y}),setTimeout((function(){O.collection("typer").doc("typer").set({username:null})}),1e3))}),[N]),Object(n.useEffect)((function(){var e=prompt("enter name");v(null==e||""==e?"unknown":e)}),[]);return Object(b.jsx)(b.Fragment,{children:Object(b.jsx)("div",{className:o.a.container,children:Object(b.jsxs)("div",{className:o.a.card,children:[Object(b.jsxs)("div",{className:o.a.logo,children:[Object(b.jsx)(u.a,{className:o.a.icon}),Object(b.jsx)("div",{className:o.a.typer,children:null===B.username||B.username===y||""===B.username?"":"".concat(B.username," is typing...")})]}),Object(b.jsx)("div",{className:o.a.messages,children:D.map((function(e){return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(g,{text:e.message,sender:e.username===y,name:e.username===y?"":e.username,time:e.timestamp?new Date(1e3*e.timestamp.seconds):new Date}),Object(b.jsx)("div",{ref:d})]})}))}),Object(b.jsx)("div",{className:o.a.type,children:Object(b.jsxs)("form",{onSubmit:function(e){e.preventDefault(),O.collection("messages").add({message:N,username:y,timestamp:f.a.firestore.FieldValue.serverTimestamp()}),l(),w("")},children:[Object(b.jsx)("input",{type:"text",placeholder:"Type your message...",onChange:function(e){w(e.target.value)},required:!0,value:N}),Object(b.jsx)("button",{type:"submit",className:o.a.submit,children:Object(b.jsx)(m.a,{})})]})})]})})})},v=function(){return Object(b.jsx)(b.Fragment,{children:Object(b.jsx)(y,{})})};c.a.render(Object(b.jsx)(v,{}),document.getElementById("root"))}},[[47,1,2]]]);
//# sourceMappingURL=main.1b5d168b.chunk.js.map