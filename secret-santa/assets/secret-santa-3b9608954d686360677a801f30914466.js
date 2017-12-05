"use strict"
define("secret-santa/adapters/ls-adapter",["exports","ember-localstorage-adapter/adapters/ls-adapter"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=t.default}),define("secret-santa/adapters/person",["exports","ember-localstorage-adapter/adapters/ls-adapter"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=t.default.extend({})}),define("secret-santa/app",["exports","secret-santa/resolver","ember-load-initializers","secret-santa/config/environment"],function(e,t,n,a){Object.defineProperty(e,"__esModule",{value:!0})
var s=Ember.Application.extend({modulePrefix:a.default.modulePrefix,podModulePrefix:a.default.podModulePrefix,Resolver:t.default});(0,n.default)(s,a.default.modulePrefix),e.default=s}),define("secret-santa/components/add-person",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.Component.extend({store:Ember.inject.service("store"),actions:{newPerson:function(){var e=this.get("store").createRecord("person")
this.set("model",e),this.set("addingPerson",!0)},savePerson:function(e){console.log("inovked"),this.get("add-person")(e)}}})}),define("secret-santa/components/form-control",["exports","ember-cli-html5-validation/components/form-control"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("secret-santa/components/people-list",["exports","npm:randomcolor"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0})
var n=Ember.Component,a=(Ember.Object,Ember.computed),s=(Ember.observer,Ember.get)
e.default=n.extend({classNames:["people-list"],classNameBindings:["isSelectingAssociate"],isSelectingAssociate:a("selectedPerson",function(){return!!s(this,"selectedPerson")}),actions:{savePerson:function(e){e.get("isNew")&&this.store.createRecord("person"),e.save()},selectPerson:function(e){this.set("selectedPerson",e)},selectAssociate:function(e){var n=this,a=this.get("selectedPerson"),s=(0,t.default)()
a.setProperties({cantDraw:e,color:s}),a.save(),e.setProperties({cantDraw:a,color:s}),e.save().then(function(){n.set("selectedPerson",null)})},deletePerson:function(e){e.destroyRecord()},randomize:function(e,t,n){this._randomize(e)},reset:function(e){this._reset(e)},cancelAssociation:function(e){this.set("selectedPerson",null),e.get("cantDraw").then(function(t){t&&(t.set("cantDraw",null),t.set("color",null)),e.set("cantDraw",null),e.set("color",null)})}},_randomize:function(e,t,n){var a=this
this._reset(e),e.sortBy("sortId").forEach(function(s){s.set("sent_status",!1),s.get("cantDraw").then(function(r){var o=a._getRandomModel(e.filterBy("available").removeObject(s).removeObject(r))
void 0!==o?(o.set("available",!1),s.set("assigned",o.get("name")),s.save().then(function(){o.save().then(function(){var e={}
e.name=s.get("name"),e.email=s.get("email"),e.assigned=o.get("name"),e.message=n,t&&(e.recepient_hash=btoa(s.get("email"))),$.ajax({type:"POST",data:e,url:"http://128.199.218.232:89/secretsanta/",success:function(e){s.set("sent_status",!0)},error:function(e){console.log(e)}})})})):a._randomize(e)})})},_getRandomModel:function(e){var t=Math.floor(Math.random()*(e.get("length")-1))
return e.objectAt(t)},_reset:function(e){e.forEach(function(e,t){e.set("available",!0),e.set("sortId",Math.floor(500*Math.random()))})}})}),define("secret-santa/components/person-form",["exports","ember-cp-validations"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0})
var n=Ember.Component,a=(Ember.Object,Ember.get,Ember.set),s=(Ember.on,Ember.inject.service,(0,t.buildValidations)({email:[(0,t.validator)("presence",!0),(0,t.validator)("format",{type:"email",description:"Email"})],name:[(0,t.validator)("presence",!0)]}))
e.default=n.extend(s,{classNames:["person-form"],name:"",email:"",actions:{savePerson:function(e,t){var n=this
this.attrs.savePerson(e,t).then(function(e){a(n,"name",null),a(n,"email",null)})}}})}),define("secret-santa/components/person-show",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0})
var t=Ember.get,n=Ember.computed
e.default=Ember.Component.extend({classNames:["person-item"],classNameBindings:["isSelectedPerson"],isSelectedPerson:n("selectedPerson",function(){return t(this,"model")==t(this,"selectedPerson")}),isSent:n("model.sent_status",function(){return!!t(this,"model.sent_status")}),actions:{delete:function(e){this.get("delete-person")(e)},edit:function(){this.set("isEditing",!0)},savePerson:function(e){this.set("isEditing",!1),this.get("save-person")(e)},selectPerson:function(e){this.get("select-person")(e)},selectAssociate:function(e){this.get("select-associate")(e)},cancelAssociation:function(e){this.get("cancel-association")(e)}}})}),define("secret-santa/components/send-wishlist",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0})
var t=Ember.Component,n=Ember.Object,a=(Ember.get,Ember.set)
e.default=t.extend({classNames:["send-wishlist"],actions:{send:function(e,t){var s={}
s.recipient=atob(t),s.message=e,n.$.ajax({type:"POST",data:s,url:"http://128.199.218.232:89/secretsanta-wishlist/",success:function(e){a(this,"sent",!0),a(this,"message",null)},error:function(e){console.log(e)}})}}})}),define("secret-santa/components/snow-fall",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.Component.extend({didInsertElement:function(){function e(){s.clearRect(0,0,a.width,a.height)
for(var l=0;l<r;l++){var d=n[l],c=o,u=i,f=d.x,m=d.y,p=Math.sqrt((f-c)*(f-c)+(m-u)*(m-u))
if(p<100){var b=(c-f)/p,v=(u-m)/p,h=100/(p*p)/2
d.velX-=h*b,d.velY-=h*v}else d.velX*=.18,d.velY<=d.speed&&(d.velY=d.speed),d.velX+=Math.cos(d.step+=.05)*d.stepSize
s.fillStyle="rgba(255,255,255,"+d.opacity+")",d.y+=d.velY,d.x+=d.velX,(d.y>=a.height||d.y<=0)&&t(d),(d.x>=a.width||d.x<=0)&&t(d),s.beginPath(),s.arc(d.x,d.y,d.size,0,2*Math.PI),s.fill()}requestAnimationFrame(e)}function t(e){e.x=Math.floor(Math.random()*a.width),e.y=0,e.size=3*Math.random()+1,e.speed=1*Math.random()+.1,e.velY=e.speed,e.velX=0,e.opacity=.5*Math.random()+.3}(function(){var e=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}
window.requestAnimationFrame=e})()
var n=[],a=document.getElementById("snowfall"),s=a.getContext("2d"),r=100,o=-10,i=-10
a.width=window.innerWidth,a.height=500,a.addEventListener("mousemove",function(e){o=e.clientX,i=e.clientY}),window.addEventListener("resize",function(){a.width=window.innerWidth,a.height=window.innerHeight}),function(){for(var t=0;t<r;t++){var s=Math.floor(Math.random()*a.width),o=Math.floor(Math.random()*a.height),i=.1*Math.random()+1,l=.1*Math.random()+.05,d=.5*Math.random()+.3
n.push({speed:l,velY:l,velX:0,x:s,y:o,size:i,stepSize:Math.random()/30,step:0,opacity:d})}e()}()}})}),define("secret-santa/components/validatable-form",["exports","ember-cli-html5-validation/components/validatable-form"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("secret-santa/helpers/app-version",["exports","secret-santa/config/environment","ember-cli-app-version/utils/regexp"],function(e,t,n){function a(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}
return t.hideSha?s.match(n.versionRegExp)[0]:t.hideVersion?s.match(n.shaRegExp)[0]:s}Object.defineProperty(e,"__esModule",{value:!0}),e.appVersion=a
var s=t.default.APP.version
e.default=Ember.Helper.helper(a)}),define("secret-santa/helpers/pluralize",["exports","ember-inflector/lib/helpers/pluralize"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=t.default}),define("secret-santa/helpers/route-action",["exports","ember-route-action-helper/helpers/route-action"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("secret-santa/helpers/singularize",["exports","ember-inflector/lib/helpers/singularize"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=t.default}),define("secret-santa/initializers/app-version",["exports","ember-cli-app-version/initializer-factory","secret-santa/config/environment"],function(e,t,n){Object.defineProperty(e,"__esModule",{value:!0})
var a=void 0,s=void 0
n.default.APP&&(a=n.default.APP.name,s=n.default.APP.version),e.default={name:"App Version",initialize:(0,t.default)(a,s)}}),define("secret-santa/initializers/container-debug-adapter",["exports","ember-resolver/resolvers/classic/container-debug-adapter"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"container-debug-adapter",initialize:function(){var e=arguments[1]||arguments[0]
e.register("container-debug-adapter:main",t.default),e.inject("container-debug-adapter:main","namespace","application:main")}}}),define("secret-santa/initializers/data-adapter",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"data-adapter",before:"store",initialize:function(){}}}),define("secret-santa/initializers/ember-data",["exports","ember-data/setup-container","ember-data"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"ember-data",initialize:t.default}}),define("secret-santa/initializers/export-application-global",["exports","secret-santa/config/environment"],function(e,t){function n(){var e=arguments[1]||arguments[0]
if(!1!==t.default.exportApplicationGlobal){var n
if("undefined"!=typeof window)n=window
else if("undefined"!=typeof global)n=global
else{if("undefined"==typeof self)return
n=self}var a,s=t.default.exportApplicationGlobal
a="string"==typeof s?s:Ember.String.classify(t.default.modulePrefix),n[a]||(n[a]=e,e.reopen({willDestroy:function(){this._super.apply(this,arguments),delete n[a]}}))}}Object.defineProperty(e,"__esModule",{value:!0}),e.initialize=n,e.default={name:"export-application-global",initialize:n}}),define("secret-santa/initializers/html5-validation",["exports","ember-cli-html5-validation/ext/checkbox","ember-cli-html5-validation/ext/text-area","ember-cli-html5-validation/ext/text-field"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"ember-cli-html5-validation",initialize:function(){}}}),define("secret-santa/initializers/injectStore",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"injectStore",before:"store",initialize:function(){}}}),define("secret-santa/initializers/store",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"store",after:"ember-data",initialize:function(){}}}),define("secret-santa/initializers/transforms",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"transforms",before:"store",initialize:function(){}}}),define("secret-santa/instance-initializers/ember-data",["exports","ember-data/instance-initializers/initialize-store-service"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"ember-data",initialize:t.default}}),define("secret-santa/models/person",["exports","ember-data"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0})
var n=Ember.computed
e.default=t.default.Model.extend({name:t.default.attr("string"),email:t.default.attr("string"),assigned:t.default.attr("string"),sortId:t.default.attr("number"),available:t.default.attr("boolean",{defaultValue:!0}),cantDraw:t.default.belongsTo("person"),color:t.default.attr("string"),sent_status:t.default.attr("boolean",{defaultValue:!1}),escapedStyle:n("color",function(){var e=this.get("color")
return Ember.String.htmlSafe("color:"+e)})})}),define("secret-santa/resolver",["exports","ember-resolver"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=t.default}),define("secret-santa/router",["exports","secret-santa/config/environment"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0})
var n=Ember.Router.extend({location:t.default.locationType,rootURL:t.default.rootURL})
n.map(function(){this.route("index",{path:"/"}),this.route("send-wishlist",{path:"send-wishlist/:email"})}),e.default=n}),define("secret-santa/routes/index",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.Route.extend({model:function(){return this.store.findAll("person")},actions:{savePerson:function(e,t){return this.store.createRecord("person",{name:e,email:t}).save().then(function(e){return e})}}})}),define("secret-santa/routes/send-wishlist",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0})
var t=Ember.Route
e.default=t.extend({model:function(e){return e.email}})})
define("secret-santa/serializers/ls-serializer",["exports","ember-localstorage-adapter/serializers/ls-serializer"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=t.default}),define("secret-santa/services/ajax",["exports","ember-ajax/services/ajax"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("secret-santa/templates/application",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.HTMLBars.template({id:"yJgpS18A",block:'{"symbols":[],"statements":[[6,"div"],[9,"class","top-container"],[7],[0,"\\n  "],[1,[18,"snow-fall"],false],[0,"\\n  "],[6,"header"],[9,"id","main-header"],[7],[0,"\\n    "],[6,"h1"],[9,"id","main-title"],[7],[6,"a"],[9,"href","http://hashcooki.es/secret-santa"],[7],[0,"Secret Santa by Hash Cookies"],[8],[8],[0,"\\n  "],[8],[0,"\\n\\n  "],[6,"div"],[9,"id","trees"],[7],[0,"\\n\\n  "],[8],[0,"\\n  "],[6,"div"],[9,"id","snow"],[7],[0,"\\n  "],[8],[0,"\\n"],[8],[0,"\\n"],[6,"div"],[9,"class","outer-container"],[7],[0,"\\n  "],[6,"div"],[9,"class","container"],[7],[0,"\\n    "],[1,[18,"outlet"],false],[0,"\\n  "],[8],[0,"\\n  "],[6,"div"],[9,"id","footer"],[7],[0,"\\n    Produced with 💖   by the elves at Hash Cookies. "],[6,"a"],[9,"href","https://github.com/milindalvares/secret-santa"],[7],[0,"[Github]"],[8],[0," "],[6,"a"],[9,"href","http://hashcooki.es/journal/secret-santa"],[7],[0,"[How it works]"],[8],[0,"\\n  "],[8],[0,"\\n"],[8],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"secret-santa/templates/application.hbs"}})}),define("secret-santa/templates/assigned",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.HTMLBars.template({id:"9C7vc85F",block:'{"symbols":[],"statements":[],"hasEval":false}',meta:{moduleName:"secret-santa/templates/assigned.hbs"}})}),define("secret-santa/templates/components/add-person",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.HTMLBars.template({id:"hQTOcMju",block:'{"symbols":[],"statements":[],"hasEval":false}',meta:{moduleName:"secret-santa/templates/components/add-person.hbs"}})}),define("secret-santa/templates/components/people-list",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.HTMLBars.template({id:"cNYJciAG",block:'{"symbols":["person"],"statements":[[4,"if",[[20,["model"]]],null,{"statements":[[4,"each",[[20,["model"]]],null,{"statements":[[4,"if",[[19,1,["name"]]],null,{"statements":[[0,"      "],[1,[25,"person-show",null,[["model","save-person","delete-person","select-person","isSelectingAssociate","select-associate","cancel-association","selectedPerson"],[[19,1,[]],[25,"action",[[19,0,[]],"savePerson"],null],[25,"action",[[19,0,[]],"deletePerson"],null],[25,"action",[[19,0,[]],"selectPerson"],null],[20,["isSelectingAssociate"]],[25,"action",[[19,0,[]],"selectAssociate"],null],[25,"action",[[19,0,[]],"cancelAssociation"],null],[20,["selectedPerson"]]]]],false],[0,"\\n"]],"parameters":[]},null]],"parameters":[1]},null],[4,"if",[[20,["isSelectingAssociate"]]],null,{"statements":[[0,"    "],[6,"span"],[9,"class","placeholder text-center"],[7],[0,"Select pair to prevent drawing. Tap again to cancel."],[8],[0,"\\n"]],"parameters":[]},{"statements":[[0,"    "],[6,"span"],[9,"class","placeholder text-center"],[7],[0,"Tap pairs to prevent drawing each other."],[8],[0,"\\n"]],"parameters":[]}]],"parameters":[]},{"statements":[[0,"  "],[6,"span"],[9,"class","placeholder text-center"],[7],[0,"Your List is empty."],[8],[0,"\\n"]],"parameters":[]}],[0,"\\n"],[1,[25,"person-form",null,[["savePerson"],[[25,"action",[[19,0,[]],[20,["savePerson"]]],null]]]],false],[0,"\\n\\n"],[4,"if",[[20,["model"]]],null,{"statements":[[0,"  "],[6,"div"],[9,"id","actions"],[7],[0,"\\n\\n    "],[6,"div"],[9,"class","preview-block"],[7],[0,"\\n      "],[6,"span"],[9,"class","preview-label"],[7],[0,"Message Preview"],[8],[0,"\\n      "],[6,"p"],[9,"class","preview"],[7],[0,"Hi, you are secret santa to "],[1,[20,["model","firstObject","name"]],false],[0,"."],[8],[0,"\\n"],[4,"if",[[20,["allowWishlisting"]]],null,{"statements":[[0,"      "],[6,"p"],[9,"class","preview"],[7],[0,"You also have a secret santa of your own! You can\'t know who they are but you can write them a wishlist by clicking this link."],[8],[0,"\\n"]],"parameters":[]},null],[0,"      "],[1,[25,"textarea",null,[["value","placeholder","class"],[[20,["message"]],"Write optional message here…","form-control"]]],false],[0,"\\n    "],[8],[0,"\\n    "],[6,"div"],[9,"class","pull-left"],[7],[0,"\\n      "],[6,"label"],[7],[0,"\\n        "],[1,[25,"input",null,[["type","checked"],["checkbox",[20,["allowWishlisting"]]]]],false],[0," Allow Wishlisting "],[6,"a"],[9,"href","http://hashcooki.es/journal/secret-santa"],[7],[0,"(what\'s this?)"],[8],[0,"\\n      "],[8],[0,"\\n    "],[8],[0,"\\n    "],[6,"button"],[9,"class","btn btn-primary pull-right"],[3,"action",[[19,0,[]],"randomize",[20,["model"]],[20,["allowWishlisting"]],[20,["message"]]]],[7],[0,"Randomize and Send"],[8],[0,"\\n  "],[8],[0,"\\n"]],"parameters":[]},null]],"hasEval":false}',meta:{moduleName:"secret-santa/templates/components/people-list.hbs"}})}),define("secret-santa/templates/components/person-form",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.HTMLBars.template({id:"iw2X2G24",block:'{"symbols":[],"statements":[[6,"form"],[3,"action",[[19,0,[]],"savePerson",[20,["name"]],[20,["email"]]],[["on"],["submit"]]],[7],[0,"\\n  "],[6,"div"],[9,"class","form-group"],[7],[0,"\\n    "],[6,"label"],[7],[0,"Name"],[8],[0,"\\n    "],[1,[25,"input",null,[["value"],[[20,["name"]]]]],false],[0,"\\n  "],[8],[0,"\\n  "],[6,"div"],[9,"class","form-group"],[7],[0,"\\n    "],[6,"label"],[7],[0,"Email"],[8],[0,"\\n    "],[1,[25,"input",null,[["value"],[[20,["email"]]]]],false],[0,"\\n  "],[8],[0,"\\n\\n  "],[6,"button"],[10,"disabled",[19,0,["validations","isInvalid"]],null],[3,"action",[[19,0,[]],"savePerson",[20,["name"]],[20,["email"]]]],[7],[0,"Add To List"],[8],[0,"\\n"],[8],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"secret-santa/templates/components/person-form.hbs"}})}),define("secret-santa/templates/components/person-show",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.HTMLBars.template({id:"s1x0ZT9t",block:'{"symbols":[],"statements":[[4,"if",[[20,["isSelectedPerson"]]],null,{"statements":[[0,"  "],[6,"button"],[9,"class","person-name"],[10,"style",[20,["model","escapedStyle"]],null],[3,"action",[[19,0,[]],"cancelAssociation",[20,["model"]]]],[7],[1,[20,["model","name"]],false],[8],[0,"\\n"]],"parameters":[]},{"statements":[[4,"if",[[20,["isSelectingAssociate"]]],null,{"statements":[[0,"    "],[6,"button"],[9,"class","person-name"],[10,"style",[20,["model","escapedStyle"]],null],[3,"action",[[19,0,[]],"selectAssociate",[20,["model"]]]],[7],[1,[20,["model","name"]],false],[8],[0,"\\n"]],"parameters":[]},{"statements":[[0,"    "],[6,"button"],[9,"class","person-name"],[10,"style",[20,["model","escapedStyle"]],null],[3,"action",[[19,0,[]],"selectPerson",[20,["model"]]]],[7],[1,[20,["model","name"]],false],[8],[0,"\\n"]],"parameters":[]}]],"parameters":[]}],[4,"if",[[20,["isSent"]]],null,{"statements":[[0,"  "],[6,"span"],[9,"class","sent-label"],[7],[0,"Sent"],[8],[0,"\\n"]],"parameters":[]},null],[6,"button"],[9,"class","btn btn-delete"],[3,"action",[[19,0,[]],"delete",[20,["model"]]]],[7],[0,"Delete"],[8],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"secret-santa/templates/components/person-show.hbs"}})}),define("secret-santa/templates/components/send-wishlist",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.HTMLBars.template({id:"ZibkH/hv",block:'{"symbols":[],"statements":[[6,"div"],[9,"id","actions"],[7],[0,"\\n\\n  "],[6,"span"],[9,"class","preview-label"],[7],[0,"Message Preview"],[8],[0,"\\n  "],[6,"p"],[9,"class","preview"],[7],[0,"Hi, your santee, without knowing who you are, has sent you this message…"],[8],[0,"\\n  "],[6,"div"],[9,"class","preview-block"],[7],[0,"\\n    "],[1,[25,"textarea",null,[["value","placeholder","class"],[[20,["message"]],"Write your message here…","form-control"]]],false],[0,"\\n  "],[8],[0,"\\n  "],[6,"button"],[9,"class","btn btn-primary"],[3,"action",[[19,0,[]],"send",[20,["message"]],[20,["model"]]]],[7],[0,"Send to your Secret Santa!"],[8],[0,"\\n"],[4,"if",[[20,["sent"]]],null,{"statements":[[0,"    "],[6,"span"],[9,"class","preview-label"],[7],[0,"Message Sent"],[8],[0,"  \\n"]],"parameters":[]},null],[8],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"secret-santa/templates/components/send-wishlist.hbs"}})}),define("secret-santa/templates/components/snow-fall",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.HTMLBars.template({id:"HtVa87f1",block:'{"symbols":[],"statements":[[6,"canvas"],[9,"id","snowfall"],[7],[8],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"secret-santa/templates/components/snow-fall.hbs"}})}),define("secret-santa/templates/index",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.HTMLBars.template({id:"AECv72rI",block:'{"symbols":[],"statements":[[1,[25,"people-list",null,[["model","savePerson"],[[20,["model"]],[25,"route-action",["savePerson"],null]]]],false],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"secret-santa/templates/index.hbs"}})}),define("secret-santa/templates/send-wishlist",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.HTMLBars.template({id:"Ri4RVHpz",block:'{"symbols":[],"statements":[[1,[25,"send-wishlist",null,[["model"],[[20,["model"]]]]],false],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"secret-santa/templates/send-wishlist.hbs"}})}),define("secret-santa/validators/alias",["exports","ember-cp-validations/validators/alias"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("secret-santa/validators/belongs-to",["exports","ember-cp-validations/validators/belongs-to"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("secret-santa/validators/collection",["exports","ember-cp-validations/validators/collection"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("secret-santa/validators/confirmation",["exports","ember-cp-validations/validators/confirmation"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("secret-santa/validators/date",["exports","ember-cp-validations/validators/date"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("secret-santa/validators/dependent",["exports","ember-cp-validations/validators/dependent"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("secret-santa/validators/ds-error",["exports","ember-cp-validations/validators/ds-error"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("secret-santa/validators/exclusion",["exports","ember-cp-validations/validators/exclusion"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("secret-santa/validators/format",["exports","ember-cp-validations/validators/format"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("secret-santa/validators/has-many",["exports","ember-cp-validations/validators/has-many"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("secret-santa/validators/inclusion",["exports","ember-cp-validations/validators/inclusion"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("secret-santa/validators/length",["exports","ember-cp-validations/validators/length"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("secret-santa/validators/messages",["exports","ember-cp-validations/validators/messages"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("secret-santa/validators/number",["exports","ember-cp-validations/validators/number"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("secret-santa/validators/presence",["exports","ember-cp-validations/validators/presence"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("secret-santa/config/environment",[],function(){try{var e="secret-santa/config/environment",t=document.querySelector('meta[name="'+e+'"]').getAttribute("content"),n={default:JSON.parse(unescape(t))}
return Object.defineProperty(n,"__esModule",{value:!0}),n}catch(t){throw new Error('Could not read config from meta tag with name "'+e+'".')}}),runningTests||require("secret-santa/app").default.create({name:"secret-santa",version:"0.0.0+77489302"})
