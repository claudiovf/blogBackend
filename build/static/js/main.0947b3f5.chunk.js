(this["webpackJsonpblog-app"]=this["webpackJsonpblog-app"]||[]).push([[0],{17:function(e,t,n){e.exports=n(41)},40:function(e,t,n){},41:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),l=n(16),u=n.n(l),c=n(6),o=n(2),i=n.n(o),s=n(4),m=n(1),f=r.a.forwardRef((function(e,t){var n=Object(a.useState)(!1),l=Object(m.a)(n,2),u=l[0],c=l[1],o={display:u?"none":""},i={display:u?"":"none"},s=function(){c(!u)};Object(a.useImperativeHandle)(t,(function(){return{toggleVisibility:s}}));var f="view"!==e.buttonLabel?r.a.createElement("div",{style:i,className:"visibleTogglable"},e.children,e.title||""," ",r.a.createElement("button",{onClick:s}," ",e.cancelLabel," ")):r.a.createElement("div",{style:i,className:"visibleTogglable"},e.title||""," ",r.a.createElement("button",{onClick:s}," ",e.cancelLabel," "),e.children);return r.a.createElement("div",null,r.a.createElement("div",{style:o,className:"togglableContent"},e.title," ",r.a.createElement("button",{name:e.buttonLabel,onClick:s}," ",e.buttonLabel," ")),f)}));f.displayName="Togglable";var b=f,g=function(e){var t=e.blog,n=e.updateBlog,l=Object(a.useState)(t.likes),u=Object(m.a)(l,2),c=u[0],o=u[1];return r.a.createElement("div",null,"Likes: ",c,r.a.createElement("button",{name:"likeButton",onClick:function(e){return function(e){e.preventDefault(),n(t.id,{likes:c+1}),o(c+1)}(e)}},"like"))},p=function(e){var t=e.blogs,n=e.updateBlog,a=e.removeBlog;return r.a.createElement("div",{className:"blogDiv"},r.a.createElement("h2",null,"Blogs"),t.map((function(e,t){return r.a.createElement("div",{key:t,className:"blogOnList"},r.a.createElement(b,{title:e.title,buttonLabel:"view",cancelLabel:"hide"},r.a.createElement("div",null,"URL: ",e.url),r.a.createElement(g,{blog:e,updateBlog:n}),r.a.createElement("div",null,"Author: ",e.author),r.a.createElement("button",{name:"deleteBlog",onClick:function(){return a(e.id,e)}},"Delete")))})))},d=function(e){var t=e.handleLogin,n=e.username,a=e.password,l=e.handleUsername,u=e.handlePassword;return r.a.createElement("form",{onSubmit:t,className:"loginForm"},r.a.createElement("h3",null,"Login to start"),r.a.createElement("div",null,"Username",r.a.createElement("input",{type:"text",value:n,name:"Username",onChange:function(e){return l(e)}})),r.a.createElement("div",null,"Password",r.a.createElement("input",{type:"password",value:a,name:"Password",onChange:function(e){return u(e)}})),r.a.createElement("button",{name:"loginSubmit",type:"submit"},"login"))},v=function(e){var t=e.createBlog,n=Object(a.useState)(""),l=Object(m.a)(n,2),u=l[0],c=l[1],o=Object(a.useState)(""),i=Object(m.a)(o,2),s=i[0],f=i[1],b=Object(a.useState)(""),g=Object(m.a)(b,2),p=g[0],d=g[1];return r.a.createElement("form",{onSubmit:function(e){e.preventDefault(),t({title:u,author:s,url:p}),c(""),f(""),d("")},className:"blogForm"},r.a.createElement("h2",null,"Create New Blog"),r.a.createElement("div",null,"Title:",r.a.createElement("input",{type:"text",value:u,name:"New Title",onChange:function(e){c(e.target.value)}})),r.a.createElement("div",null,"Author:",r.a.createElement("input",{type:"text",value:s,name:"New Author",onChange:function(e){f(e.target.value)}})),r.a.createElement("div",null,"Url:",r.a.createElement("input",{type:"text",value:p,name:"New Url",onChange:function(e){d(e.target.value)}})),r.a.createElement("button",{name:"Blog Submit",type:"submit"},"Create"))},h=function(e){var t=e.handleLogout,n=e.user;return r.a.createElement("p",null,"Logged in as ",n.name,r.a.createElement("input",{type:"button",value:"logout",name:"logout",onClick:t}))},E=function(e){var t=e.message;return null===t?null:r.a.createElement("div",{className:"error"},t)},w=function(e){var t=e.message;return null===t?null:r.a.createElement("div",{className:"confirmed"},t)},O=n(5),j=n.n(O),k=null,y={getAll:function(){var e=Object(s.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,j.a.get("/api/blogs");case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),create:function(){var e=Object(s.a)(i.a.mark((function e(t){var n,a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={headers:{Authorization:k}},e.next=3,j.a.post("/api/blogs",t,n);case 3:return a=e.sent,e.abrupt("return",a.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),setToken:function(e){k="bearer ".concat(e)},update:function(){var e=Object(s.a)(i.a.mark((function e(t,n){var a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,j.a.put("".concat("/api/blogs","/").concat(t),n);case 2:return a=e.sent,e.abrupt("return",a.data);case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),deleteBlog:function(){var e=Object(s.a)(i.a.mark((function e(t){var n,a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={headers:{Authorization:k}},e.next=3,j.a.delete("".concat("/api/blogs","/").concat(t),n);case 3:return a=e.sent,e.abrupt("return",a.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},S={login:function(){var e=Object(s.a)(i.a.mark((function e(t){var n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,j.a.post("/api/login",t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},x=function(){var e=Object(a.useState)([]),t=Object(m.a)(e,2),n=t[0],l=t[1],u=Object(a.useState)(""),o=Object(m.a)(u,2),f=o[0],g=o[1],O=Object(a.useState)(""),j=Object(m.a)(O,2),k=j[0],x=j[1],L=Object(a.useState)(null),B=Object(m.a)(L,2),N=B[0],C=B[1],T=Object(a.useState)(null),U=Object(m.a)(T,2),A=U[0],I=U[1],D=Object(a.useState)(null),J=Object(m.a)(D,2),P=J[0],R=J[1];Object(a.useEffect)((function(){y.getAll().then((function(e){return l(e.sort((function(e,t){return t.likes-e.likes})))}))}),[]),Object(a.useEffect)((function(){var e=window.localStorage.getItem("loggedUser");if(e){var t=JSON.parse(e);C(t),y.setToken(t.token)}}),[]);var F=function(){var e=Object(s.a)(i.a.mark((function e(t){var n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,S.login({username:f,password:k});case 4:n=e.sent,window.localStorage.setItem("loggedUser",JSON.stringify(n)),y.setToken(n.token),C(n),g(""),x(""),e.next=16;break;case 12:e.prev=12,e.t0=e.catch(1),I("Invalid username or password"),setTimeout((function(){I(null)}),5e3);case 16:case"end":return e.stop()}}),e,null,[[1,12]])})));return function(t){return e.apply(this,arguments)}}(),z=Object(a.useRef)();return r.a.createElement("div",null,r.a.createElement("h1",null,"Blog App"),r.a.createElement(E,{message:A}),r.a.createElement(w,{message:P}),null===N?r.a.createElement(d,{handleLogin:F,username:f,password:k,handleUsername:function(e){g(e.target.value)},handlePassword:function(e){x(e.target.value)}}):r.a.createElement(r.a.Fragment,null,r.a.createElement(h,{handleLogout:function(){C(null),window.localStorage.removeItem("loggedUser")},user:N}),r.a.createElement(b,{buttonLabel:"Add new blog",cancelLabel:"Cancel",ref:z},r.a.createElement(v,{createBlog:function(e){y.create(e).then((function(e){z.current.toggleVisibility(),R("".concat(N.name," added a new blog by ").concat(e.author)),setTimeout((function(){R(null)}),3e3),l(n.concat(e))})).catch((function(e){console.log(e),I(e.message),setTimeout((function(){I(null)}),3e3)}))}})),r.a.createElement(p,{blogs:n,updateBlog:function(e,t){y.update(e,t).then((function(t){var a=n,r=n.findIndex((function(t){return t.id===e}));a[r]=Object(c.a)(Object(c.a)({},a[r]),{},{likes:t.likes}),l(a)})).catch((function(e){I(e.message),setTimeout((function(){I(null)}),3e3)}))},removeBlog:function(e,t){window.confirm("Remove blog ".concat(t.title," by ").concat(t.author))&&y.deleteBlog(e).then((function(){return l(n.filter((function(t){return t.id!==e})))})).then((function(){R("".concat(t.title," by ").concat(t.author," removed from blog list")),setTimeout((function(){R(null)}),3e3)})).catch((function(e){I(e.message),setTimeout((function(){I(null)}),3e3)}))}})))};n(40);u.a.render(r.a.createElement(x,null),document.getElementById("root"))}},[[17,1,2]]]);
//# sourceMappingURL=main.0947b3f5.chunk.js.map