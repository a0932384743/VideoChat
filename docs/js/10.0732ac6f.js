(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[10],{a1c0:function(e,t,s){"use strict";s.r(t);var r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"row items-center justify-center"},[s("div",{staticClass:"col-12"},[s("div",{staticClass:"row justify-center"},[e._m(0),s("div",{staticClass:"text-subtitle1 text-grey-8 q-mb-lg"},[s("small",[e._v("Not registered?"),s("router-link",{staticClass:"q-ml-xs text-grey-8 text-hover-decoration-none",attrs:{to:{name:"SignUp"}}},[e._v("Create an account")])],1)])])]),s("div",{staticClass:"form-layer col-12"},[s("div",{staticClass:"form-body"},[s("q-form",{staticClass:"q-gutter-md",on:{keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:(t.preventDefault(),e.loginUser.apply(null,arguments))}}},[s("q-input",{ref:"email",attrs:{outlined:"",dense:"","lazy-rules":"",type:"email",label:"Enter work or school email",rules:[e.rules.required,e.rules.email]},scopedSlots:e._u([{key:"append",fn:function(){return[s("q-icon",{staticClass:"cursor-pointer",attrs:{name:"close"},on:{click:function(t){e.user.email=""}}})]},proxy:!0}]),model:{value:e.user.email,callback:function(t){e.$set(e.user,"email",t)},expression:"user.email"}}),s("q-input",{ref:"password",staticClass:"password-block",attrs:{dense:"","lazy-rules":"",outlined:"",type:e.isPwd?"password":"text",label:"Enter password",rules:[e.rules.required]},scopedSlots:e._u([{key:"append",fn:function(){return[s("q-icon",{staticClass:"cursor-pointer",attrs:{name:e.isPwd?"visibility_off":"visibility"},on:{click:function(t){e.isPwd=!e.isPwd}}})]},proxy:!0}]),model:{value:e.user.password,callback:function(t){e.$set(e.user,"password",t)},expression:"user.password"}}),s("div",{staticClass:"forgot-password text-subtitle1 no-margin text-right"},[s("small",[s("router-link",{staticClass:"text-grey-8 text-hover-decoration-none",attrs:{to:{name:"ForgotPassword"}}},[e._v("Forgot password")])],1)])],1)],1),s("div",{staticClass:"form-footer q-mt-md"},[s("q-btn",{staticClass:"full-width",attrs:{label:"Sign in","no-caps":"",color:"grey-9"},on:{click:e.loginUser}})],1)])])},i=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"text-h4 full-width text-center q-mb-md"},[s("small",[e._v("Welcome back!")])])}],a=s("60a3"),o=s("f5e2"),l=function(e,t,s,r){var i,a=arguments.length,o=a<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,s):r;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)o=Reflect.decorate(e,t,s,r);else for(var l=e.length-1;l>=0;l--)(i=e[l])&&(o=(a<3?i(o):a>3?i(t,s,o):i(t,s))||o);return a>3&&o&&Object.defineProperty(t,s,o),o};let n=class extends a["d"]{constructor(){super(...arguments),this.isPwd=!0,this.formHasError=!1,this.user={email:"",password:""},this.rules={email:e=>{const t=o["a"].patternEmail;return t.test(e)||"Enter correct email"},required:e=>!!e||"This field is required"}}loginUser(){this.$refs.email.validate(),this.$refs.password.validate(),this.$refs.email.hasError||this.$refs.password.hasError?this.formHasError=!0:(this.$q.loading.show(),this.$store.dispatch("authModule/login",this.user).then((()=>{this.$q.notify({icon:"done",color:"positive",message:"Login successful"}),this.$router.push({name:"StartMatching"})})).catch((e=>{this.$q.notify({icon:"report_problem",color:"warning",message:e.message})})).finally((()=>{this.$q.loading.hide()})))}};n=l([a["a"]],n);var c=n,u=c,d=s("2877"),f=s("0378"),p=s("27f9"),m=s("0016"),h=s("9c40"),w=s("eebe"),y=s.n(w),g=Object(d["a"])(u,r,i,!1,null,null,null);t["default"]=g.exports;y()(g,"components",{QForm:f["a"],QInput:p["a"],QIcon:m["a"],QBtn:h["a"]})},f5e2:function(e,t,s){"use strict";t["a"]={patternEmail:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/}}}]);