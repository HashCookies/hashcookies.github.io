"use strict";define("secret-santa/adapters/ls-adapter",["exports","ember-localstorage-adapter/adapters/ls-adapter"],function(e,t){e.default=t.default}),define("secret-santa/adapters/person",["exports","ember-localstorage-adapter/adapters/ls-adapter"],function(e,t){e.default=t.default.extend({})}),define("secret-santa/app",["exports","ember","secret-santa/resolver","ember-load-initializers","secret-santa/config/environment"],function(e,t,n,a,r){var l=void 0;t.default.MODEL_FACTORY_INJECTIONS=!0,l=t.default.Application.extend({modulePrefix:r.default.modulePrefix,podModulePrefix:r.default.podModulePrefix,Resolver:n.default}),(0,a.default)(l,r.default.modulePrefix),e.default=l}),define("secret-santa/components/add-person",["exports","ember"],function(e,t){e.default=t.default.Component.extend({store:t.default.inject.service("store"),actions:{newPerson:function(){var e=this.get("store").createRecord("person");this.set("model",e),this.set("addingPerson",!0)},savePerson:function(e){console.log("inovked"),this.get("add-person")(e)}}})}),define("secret-santa/components/email-share",["exports","ember-social/components/email-share"],function(e,t){e.default=t.default}),define("secret-santa/components/facebook-like",["exports","ember-social/components/facebook-like"],function(e,t){e.default=t.default}),define("secret-santa/components/facebook-share",["exports","ember-social/components/facebook-share"],function(e,t){e.default=t.default}),define("secret-santa/components/form-control",["exports","ember-cli-html5-validation/components/form-control"],function(e,t){Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("secret-santa/components/linkedin-share",["exports","ember-social/components/linkedin-share"],function(e,t){e.default=t.default}),define("secret-santa/components/people-list",["exports","ember","npm:randomcolor"],function(e,t,n){var a=t.default.computed,r=(t.default.observer,t.default.get);e.default=t.default.Component.extend({classNames:["people-list"],classNameBindings:["isSelectingAssociate"],savedPeople:a("model,model.@each",function(){return this.get("model").filterBy("name")}),isSelectingAssociate:a("selectedPerson",function(){return!!r(this,"selectedPerson")}),actions:{savePerson:function(e){e.get("isNew")&&this.store.createRecord("person"),e.save()},selectPerson:function(e){this.set("selectedPerson",e)},selectAssociate:function(e){var t=this,a=this.get("selectedPerson"),r=(0,n.default)();a.setProperties({cantDraw:e,color:r}),a.save(),e.setProperties({cantDraw:a,color:r}),e.save().then(function(){t.set("selectedPerson",null)})},deletePerson:function(e){e.destroyRecord()},randomize:function(e){this._randomize(e)},reset:function(e){this._reset(e)},cancelAssociation:function(e){this.set("selectedPerson",null),e.get("cantDraw").then(function(t){t&&(t.set("cantDraw",null),t.set("color",null)),e.set("cantDraw",null),e.set("color",null)})}},_randomize:function(e){var n=this;this._reset(e),e.sortBy("sortId").forEach(function(a){a.set("sent_status",!1),a.get("cantDraw").then(function(r){var l=n._getRandomModel(e.filterBy("available").removeObject(a).removeObject(r));void 0!==l?(l.set("available",!1),a.set("assigned",l.get("name")),a.save().then(function(){l.save().then(function(){var e={};e.name=a.get("name"),e.email=a.get("email"),e.assigned=l.get("name"),t.default.$.ajax({type:"POST",data:e,url:"http://128.199.218.232:89/secretsanta/",success:function(e){a.set("sent_status",!0)},error:function(e){console.log(e)}})})})):n._randomize(e)})})},_getRandomModel:function(e){var t=Math.floor(Math.random()*(e.get("length")-1)),n=e.objectAt(t);return n},_reset:function(e){e.forEach(function(e,t){e.set("available",!0),e.set("sortId",Math.floor(500*Math.random()))})}})}),define("secret-santa/components/person-form",["exports","ember","ember-cp-validations"],function(e,t,n){var a=(0,n.buildValidations)({"model.email":[(0,n.validator)("presence",!0),(0,n.validator)("format",{type:"email",description:"Email"})],"model.name":[(0,n.validator)("presence",!0)]});e.default=t.default.Component.extend(a,{classNames:["person-form"],actions:{savePerson:function(e){this.get("save-person")(e)}}})}),define("secret-santa/components/person-show",["exports","ember"],function(e,t){var n=t.default.get,a=t.default.computed;e.default=t.default.Component.extend({classNames:["person-item"],classNameBindings:["isSelectedPerson"],isSelectedPerson:a("selectedPerson",function(){return n(this,"model")==n(this,"selectedPerson")}),isSent:a("model.sent_status",function(){return!!n(this,"model.sent_status")}),actions:{delete:function(e){this.get("delete-person")(e)},edit:function(){this.set("isEditing",!0)},savePerson:function(e){this.set("isEditing",!1),this.get("save-person")(e)},selectPerson:function(e){this.get("select-person")(e)},selectAssociate:function(e){this.get("select-associate")(e)},cancelAssociation:function(e){this.get("cancel-association")(e)}}})}),define("secret-santa/components/snow-fall",["exports","ember"],function(e,t){e.default=t.default.Component.extend({didInsertElement:function(){function e(){l.clearRect(0,0,r.width,r.height);for(var n=0;n<o;n++){var c=a[n],d=i,u=s,m=100,p=c.x,f=c.y,h=Math.sqrt((p-d)*(p-d)+(f-u)*(f-u));if(h<m){var v=m/(h*h),b=(d-p)/h,g=(u-f)/h,x=v/2;c.velX-=x*b,c.velY-=x*g}else c.velX*=.18,c.velY<=c.speed&&(c.velY=c.speed),c.velX+=Math.cos(c.step+=.05)*c.stepSize;l.fillStyle="rgba(255,255,255,"+c.opacity+")",c.y+=c.velY,c.x+=c.velX,(c.y>=r.height||c.y<=0)&&t(c),(c.x>=r.width||c.x<=0)&&t(c),l.beginPath(),l.arc(c.x,c.y,c.size,0,2*Math.PI),l.fill()}requestAnimationFrame(e)}function t(e){e.x=Math.floor(Math.random()*r.width),e.y=0,e.size=3*Math.random()+1,e.speed=1*Math.random()+.1,e.velY=e.speed,e.velX=0,e.opacity=.5*Math.random()+.3}function n(){for(var t=0;t<o;t++){var n=Math.floor(Math.random()*r.width),l=Math.floor(Math.random()*r.height),i=.1*Math.random()+1,s=.1*Math.random()+.05,c=.5*Math.random()+.3;a.push({speed:s,velY:s,velX:0,x:n,y:l,size:i,stepSize:Math.random()/30,step:0,opacity:c})}e()}!function(){var e=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)};window.requestAnimationFrame=e}();var a=[],r=document.getElementById("snowfall"),l=r.getContext("2d"),o=100,i=-10,s=-10;r.width=window.innerWidth,r.height=500,r.addEventListener("mousemove",function(e){i=e.clientX,s=e.clientY}),window.addEventListener("resize",function(){r.width=window.innerWidth,r.height=window.innerHeight}),n()}})}),define("secret-santa/components/social-widget",["exports","ember-social/components/social-widget"],function(e,t){Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("secret-santa/components/twitter-card",["exports","ember-social/components/twitter-card"],function(e,t){e.default=t.default}),define("secret-santa/components/twitter-share",["exports","ember-social/components/twitter-share"],function(e,t){e.default=t.default}),define("secret-santa/components/validatable-form",["exports","ember-cli-html5-validation/components/validatable-form"],function(e,t){Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("secret-santa/helpers/app-version",["exports","ember","secret-santa/config/environment"],function(e,t,n){function a(){return r}e.appVersion=a;var r=n.default.APP.version;e.default=t.default.Helper.helper(a)}),define("secret-santa/helpers/pluralize",["exports","ember-inflector/lib/helpers/pluralize"],function(e,t){e.default=t.default}),define("secret-santa/helpers/route-action",["exports","ember-route-action-helper/helpers/route-action"],function(e,t){Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("secret-santa/helpers/singularize",["exports","ember-inflector/lib/helpers/singularize"],function(e,t){e.default=t.default}),define("secret-santa/initializers/app-version",["exports","ember-cli-app-version/initializer-factory","secret-santa/config/environment"],function(e,t,n){var a=n.default.APP,r=a.name,l=a.version;e.default={name:"App Version",initialize:(0,t.default)(r,l)}}),define("secret-santa/initializers/container-debug-adapter",["exports","ember-resolver/container-debug-adapter"],function(e,t){e.default={name:"container-debug-adapter",initialize:function(){var e=arguments[1]||arguments[0];e.register("container-debug-adapter:main",t.default),e.inject("container-debug-adapter:main","namespace","application:main")}}}),define("secret-santa/initializers/data-adapter",["exports","ember"],function(e,t){e.default={name:"data-adapter",before:"store",initialize:t.default.K}}),define("secret-santa/initializers/ember-data",["exports","ember-data/setup-container","ember-data/-private/core"],function(e,t,n){e.default={name:"ember-data",initialize:t.default}}),define("secret-santa/initializers/export-application-global",["exports","ember","secret-santa/config/environment"],function(e,t,n){function a(){var e=arguments[1]||arguments[0];if(n.default.exportApplicationGlobal!==!1){var a;if("undefined"!=typeof window)a=window;else if("undefined"!=typeof global)a=global;else{if("undefined"==typeof self)return;a=self}var r,l=n.default.exportApplicationGlobal;r="string"==typeof l?l:t.default.String.classify(n.default.modulePrefix),a[r]||(a[r]=e,e.reopen({willDestroy:function(){this._super.apply(this,arguments),delete a[r]}}))}}e.initialize=a,e.default={name:"export-application-global",initialize:a}}),define("secret-santa/initializers/html5-validation",["exports","ember-cli-html5-validation/ext/checkbox","ember-cli-html5-validation/ext/text-area","ember-cli-html5-validation/ext/text-field"],function(e,t,n,a){e.default={name:"ember-cli-html5-validation",initialize:function(){}}}),define("secret-santa/initializers/injectStore",["exports","ember"],function(e,t){e.default={name:"injectStore",before:"store",initialize:t.default.K}}),define("secret-santa/initializers/store",["exports","ember"],function(e,t){e.default={name:"store",after:"ember-data",initialize:t.default.K}}),define("secret-santa/initializers/transforms",["exports","ember"],function(e,t){e.default={name:"transforms",before:"store",initialize:t.default.K}}),define("secret-santa/instance-initializers/ember-data",["exports","ember-data/-private/instance-initializers/initialize-store-service"],function(e,t){e.default={name:"ember-data",initialize:t.default}}),define("secret-santa/models/person",["exports","ember-data","ember"],function(e,t,n){var a=n.default.computed;e.default=t.default.Model.extend({name:t.default.attr("string"),email:t.default.attr("string"),assigned:t.default.attr("string"),sortId:t.default.attr("number"),available:t.default.attr("boolean",{defaultValue:!0}),cantDraw:t.default.belongsTo("person"),color:t.default.attr("string"),sent_status:t.default.attr("boolean",{defaultValue:!1}),escapedStyle:a("color",function(){var e=this.get("color");return n.default.String.htmlSafe("color:"+e)})})}),define("secret-santa/resolver",["exports","ember-resolver"],function(e,t){e.default=t.default}),define("secret-santa/router",["exports","ember","secret-santa/config/environment"],function(e,t,n){var a=t.default.Router.extend({location:n.default.locationType,rootURL:n.default.rootURL});a.map(function(){this.route("index",{path:"/"})}),e.default=a}),define("secret-santa/routes/index",["exports","ember"],function(e,t){e.default=t.default.Route.extend({model:function(){return this.store.findAll("person")},afterModel:function(){this.store.createRecord("person")},actions:{savePerson:function(e){e.get("isNew")&&this.store.createRecord("person"),e.save()}}})}),define("secret-santa/serializers/ls-serializer",["exports","ember-localstorage-adapter/serializers/ls-serializer"],function(e,t){e.default=t.default}),define("secret-santa/services/ajax",["exports","ember-ajax/services/ajax"],function(e,t){Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("secret-santa/services/facebook-api-client",["exports","ember-social/services/facebook-api-client"],function(e,t){e.default=t.default}),define("secret-santa/services/linkedin-api-client",["exports","ember-social/services/linkedin-api-client"],function(e,t){e.default=t.default}),define("secret-santa/services/twitter-api-client",["exports","ember-social/services/twitter-api-client"],function(e,t){e.default=t.default}),define("secret-santa/templates/application",["exports"],function(e){e.default=Ember.HTMLBars.template(function(){return{meta:{revision:"Ember@2.9.1",loc:{source:null,start:{line:1,column:0},end:{line:16,column:0}},moduleName:"secret-santa/templates/application.hbs"},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createComment("");e.appendChild(t,n);var n=e.createTextNode("\n");e.appendChild(t,n);var n=e.createElement("header"),a=e.createTextNode("\n  ");e.appendChild(n,a);var a=e.createElement("h1");e.setAttribute(a,"id","main-title");var r=e.createTextNode("Secret Santa by Hash Cookies");e.appendChild(a,r),e.appendChild(n,a);var a=e.createTextNode("\n");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n\n");e.appendChild(t,n);var n=e.createElement("div");e.setAttribute(n,"id","trees");var a=e.createTextNode("\n\n");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n");e.appendChild(t,n);var n=e.createElement("div");e.setAttribute(n,"id","snow");var a=e.createTextNode("\n");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n");e.appendChild(t,n);var n=e.createElement("div");e.setAttribute(n,"class","outer-container");var a=e.createTextNode("\n  ");e.appendChild(n,a);var a=e.createElement("div");e.setAttribute(a,"class","container");var r=e.createTextNode("\n    ");e.appendChild(a,r);var r=e.createComment("");e.appendChild(a,r);var r=e.createTextNode("\n  ");e.appendChild(a,r),e.appendChild(n,a);var a=e.createTextNode("\n");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var a=new Array(2);return a[0]=e.createMorphAt(t,0,0,n),a[1]=e.createMorphAt(e.childAt(t,[8,1]),1,1),e.insertBoundary(t,0),a},statements:[["content","snow-fall",["loc",[null,[1,0],[1,13]]],0,0,0,0],["content","outlet",["loc",[null,[13,4],[13,14]]],0,0,0,0]],locals:[],templates:[]}}())}),define("secret-santa/templates/assigned",["exports"],function(e){e.default=Ember.HTMLBars.template(function(){return{meta:{revision:"Ember@2.9.1",loc:{source:null,start:{line:1,column:0},end:{line:1,column:0}},moduleName:"secret-santa/templates/assigned.hbs"},isEmpty:!0,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment();return t},buildRenderNodes:function(){return[]},statements:[],locals:[],templates:[]}}())}),define("secret-santa/templates/components/add-person",["exports"],function(e){e.default=Ember.HTMLBars.template(function(){return{meta:{revision:"Ember@2.9.1",loc:{source:null,start:{line:1,column:0},end:{line:1,column:0}},moduleName:"secret-santa/templates/components/add-person.hbs"},isEmpty:!0,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment();return t},buildRenderNodes:function(){return[]},statements:[],locals:[],templates:[]}}())}),define("secret-santa/templates/components/people-list",["exports"],function(e){e.default=Ember.HTMLBars.template(function(){var e=function(){var e=function(){return{meta:{revision:"Ember@2.9.1",loc:{source:null,start:{line:2,column:2},end:{line:10,column:2}},moduleName:"secret-santa/templates/components/people-list.hbs"},isEmpty:!1,arity:1,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createTextNode("      ");e.appendChild(t,n);var n=e.createComment("");e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var a=new Array(1);return a[0]=e.createMorphAt(t,1,1,n),a},statements:[["inline","person-show",[],["model",["subexpr","@mut",[["get","person",["loc",[null,[3,26],[3,32]]],0,0,0,0]],[],[],0,0],"save-person",["subexpr","action",["savePerson"],[],["loc",[null,[3,45],[3,66]]],0,0],"delete-person",["subexpr","action",["deletePerson"],[],["loc",[null,[4,48],[4,71]]],0,0],"select-person",["subexpr","action",["selectPerson"],[],["loc",[null,[5,48],[5,71]]],0,0],"isSelectingAssociate",["subexpr","@mut",[["get","isSelectingAssociate",["loc",[null,[6,55],[6,75]]],0,0,0,0]],[],[],0,0],"select-associate",["subexpr","action",["selectAssociate"],[],["loc",[null,[7,51],[7,77]]],0,0],"cancel-association",["subexpr","action",["cancelAssociation"],[],["loc",[null,[8,53],[8,81]]],0,0],"selectedPerson",["subexpr","@mut",[["get","selectedPerson",["loc",[null,[9,49],[9,63]]],0,0,0,0]],[],[],0,0]],["loc",[null,[3,6],[9,65]]],0,0]],locals:["person"],templates:[]}}(),t=function(){return{meta:{revision:"Ember@2.9.1",loc:{source:null,start:{line:12,column:2},end:{line:14,column:2}},moduleName:"secret-santa/templates/components/people-list.hbs"},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createTextNode("    ");e.appendChild(t,n);var n=e.createElement("span");e.setAttribute(n,"class","placeholder text-center");var a=e.createTextNode("Select pair to prevent drawing. Tap again to cancel.");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(){return[]},statements:[],locals:[],templates:[]}}(),n=function(){return{meta:{revision:"Ember@2.9.1",loc:{source:null,start:{line:14,column:2},end:{line:16,column:2}},moduleName:"secret-santa/templates/components/people-list.hbs"},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createTextNode("    ");e.appendChild(t,n);var n=e.createElement("span");e.setAttribute(n,"class","placeholder text-center");var a=e.createTextNode("Tap pairs to prevent drawing each other.");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(){return[]},statements:[],locals:[],templates:[]}}();return{meta:{revision:"Ember@2.9.1",loc:{source:null,start:{line:1,column:0},end:{line:19,column:0}},moduleName:"secret-santa/templates/components/people-list.hbs"},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createComment("");e.appendChild(t,n);var n=e.createTextNode("\n");e.appendChild(t,n);var n=e.createComment("");e.appendChild(t,n);var n=e.createTextNode("\n  ");e.appendChild(t,n);var n=e.createElement("button");e.setAttribute(n,"class","btn btn-primary");var a=e.createTextNode("Randomize and Send");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var a=e.childAt(t,[4]),r=new Array(3);return r[0]=e.createMorphAt(t,0,0,n),r[1]=e.createMorphAt(t,2,2,n),r[2]=e.createElementMorph(a),e.insertBoundary(t,0),r},statements:[["block","each",[["get","savedPeople",["loc",[null,[2,10],[2,21]]],0,0,0,0]],[],0,null,["loc",[null,[2,2],[10,11]]]],["block","if",[["get","isSelectingAssociate",["loc",[null,[12,8],[12,28]]],0,0,0,0]],[],1,2,["loc",[null,[12,2],[16,9]]]],["element","action",["randomize",["get","savedPeople",["loc",[null,[18,31],[18,42]]],0,0,0,0]],[],["loc",[null,[18,10],[18,44]]],0,0]],locals:[],templates:[e,t,n]}}(),t=function(){return{meta:{revision:"Ember@2.9.1",loc:{source:null,start:{line:19,column:0},end:{line:21,column:0}},moduleName:"secret-santa/templates/components/people-list.hbs"},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createTextNode("  ");e.appendChild(t,n);var n=e.createElement("span");e.setAttribute(n,"class","placeholder text-center");var a=e.createTextNode("Your List is empty.");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(){return[]},statements:[],locals:[],templates:[]}}();return{meta:{revision:"Ember@2.9.1",loc:{source:null,start:{line:1,column:0},end:{line:22,column:0}},moduleName:"secret-santa/templates/components/people-list.hbs"},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createComment("");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var a=new Array(1);return a[0]=e.createMorphAt(t,0,0,n),e.insertBoundary(t,0),e.insertBoundary(t,null),a},statements:[["block","if",[["get","savedPeople",["loc",[null,[1,6],[1,17]]],0,0,0,0]],[],0,1,["loc",[null,[1,0],[21,7]]]]],locals:[],templates:[e,t]}}())}),define("secret-santa/templates/components/person-form",["exports"],function(e){e.default=Ember.HTMLBars.template(function(){return{meta:{revision:"Ember@2.9.1",loc:{source:null,start:{line:1,column:0},end:{line:14,column:0}},moduleName:"secret-santa/templates/components/person-form.hbs"},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createElement("form"),a=e.createTextNode("\n  ");e.appendChild(n,a);var a=e.createElement("div");e.setAttribute(a,"class","form-group");var r=e.createTextNode("\n    ");e.appendChild(a,r);var r=e.createElement("label"),l=e.createTextNode("Name");e.appendChild(r,l),e.appendChild(a,r);var r=e.createTextNode("\n    ");e.appendChild(a,r);var r=e.createComment("");e.appendChild(a,r);var r=e.createTextNode("\n  ");e.appendChild(a,r),e.appendChild(n,a);var a=e.createTextNode("\n  ");e.appendChild(n,a);var a=e.createElement("div");e.setAttribute(a,"class","form-group");var r=e.createTextNode("\n    ");e.appendChild(a,r);var r=e.createElement("label"),l=e.createTextNode("Email");e.appendChild(r,l),e.appendChild(a,r);var r=e.createTextNode("\n    ");e.appendChild(a,r);var r=e.createComment("");e.appendChild(a,r);var r=e.createTextNode("\n  ");e.appendChild(a,r),e.appendChild(n,a);var a=e.createTextNode("\n\n  ");e.appendChild(n,a);var a=e.createElement("button"),r=e.createTextNode("Add To List");e.appendChild(a,r),e.appendChild(n,a);var a=e.createTextNode("\n");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n");e.appendChild(t,n);var n=e.createComment("");e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var a=e.childAt(t,[0]),r=e.childAt(a,[5]),l=new Array(6);return l[0]=e.createElementMorph(a),l[1]=e.createMorphAt(e.childAt(a,[1]),3,3),l[2]=e.createMorphAt(e.childAt(a,[3]),3,3),l[3]=e.createAttrMorph(r,"disabled"),l[4]=e.createElementMorph(r),l[5]=e.createMorphAt(t,2,2,n),l},statements:[["element","action",["savePerson",["get","model",["loc",[null,[1,28],[1,33]]],0,0,0,0]],["on","submit"],["loc",[null,[1,6],[1,47]]],0,0],["inline","input",[],["value",["subexpr","@mut",[["get","model.name",["loc",[null,[4,18],[4,28]]],0,0,0,0]],[],[],0,0]],["loc",[null,[4,4],[4,30]]],0,0],["inline","input",[],["value",["subexpr","@mut",[["get","model.email",["loc",[null,[8,18],[8,29]]],0,0,0,0]],[],[],0,0]],["loc",[null,[8,4],[8,31]]],0,0],["attribute","disabled",["get","this.validations.isInvalid",["loc",[null,[11,51],[11,77]]],0,0,0,0],0,0,0,0],["element","action",["savePerson",["get","model",["loc",[null,[11,32],[11,37]]],0,0,0,0]],[],["loc",[null,[11,10],[11,39]]],0,0],["inline","facebook-like",[],["url","http://hashcooki.es/secret-santa/"],["loc",[null,[13,0],[13,57]]],0,0]],locals:[],templates:[]}}())}),define("secret-santa/templates/components/person-show",["exports"],function(e){e.default=Ember.HTMLBars.template(function(){var e=function(){return{meta:{revision:"Ember@2.9.1",loc:{source:null,start:{line:1,column:0},end:{line:3,column:0}},moduleName:"secret-santa/templates/components/person-show.hbs"},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createTextNode("  ");e.appendChild(t,n);var n=e.createElement("button");e.setAttribute(n,"class","person-name");var a=e.createComment("");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var a=e.childAt(t,[1]),r=new Array(3);return r[0]=e.createAttrMorph(a,"style"),r[1]=e.createElementMorph(a),r[2]=e.createMorphAt(a,0,0),r},statements:[["attribute","style",["get","model.escapedStyle",["loc",[null,[2,75],[2,93]]],0,0,0,0],0,0,0,0],["element","action",["cancelAssociation",["get","model",["loc",[null,[2,39],[2,44]]],0,0,0,0]],[],["loc",[null,[2,10],[2,46]]],0,0],["content","model.name",["loc",[null,[2,96],[2,110]]],0,0,0,0]],locals:[],templates:[]}}(),t=function(){var e=function(){return{meta:{revision:"Ember@2.9.1",loc:{source:null,start:{line:4,column:2},end:{line:6,column:2}},moduleName:"secret-santa/templates/components/person-show.hbs"},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createTextNode("    ");e.appendChild(t,n);var n=e.createElement("button");e.setAttribute(n,"class","person-name");var a=e.createComment("");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var a=e.childAt(t,[1]),r=new Array(3);return r[0]=e.createAttrMorph(a,"style"),r[1]=e.createElementMorph(a),r[2]=e.createMorphAt(a,0,0),r},statements:[["attribute","style",["get","model.escapedStyle",["loc",[null,[5,75],[5,93]]],0,0,0,0],0,0,0,0],["element","action",["selectAssociate",["get","model",["loc",[null,[5,39],[5,44]]],0,0,0,0]],[],["loc",[null,[5,12],[5,46]]],0,0],["content","model.name",["loc",[null,[5,96],[5,110]]],0,0,0,0]],locals:[],templates:[]}}(),t=function(){return{meta:{revision:"Ember@2.9.1",loc:{source:null,start:{line:6,column:2},end:{line:8,column:2}},moduleName:"secret-santa/templates/components/person-show.hbs"},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createTextNode("    ");e.appendChild(t,n);var n=e.createElement("button");e.setAttribute(n,"class","person-name");var a=e.createComment("");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var a=e.childAt(t,[1]),r=new Array(3);return r[0]=e.createAttrMorph(a,"style"),r[1]=e.createElementMorph(a),r[2]=e.createMorphAt(a,0,0),r},statements:[["attribute","style",["get","model.escapedStyle",["loc",[null,[7,72],[7,90]]],0,0,0,0],0,0,0,0],["element","action",["selectPerson",["get","model",["loc",[null,[7,36],[7,41]]],0,0,0,0]],[],["loc",[null,[7,12],[7,43]]],0,0],["content","model.name",["loc",[null,[7,93],[7,107]]],0,0,0,0]],locals:[],templates:[]}}();return{meta:{revision:"Ember@2.9.1",loc:{source:null,start:{line:3,column:0},end:{line:9,column:0}},moduleName:"secret-santa/templates/components/person-show.hbs"},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createComment("");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var a=new Array(1);return a[0]=e.createMorphAt(t,0,0,n),e.insertBoundary(t,0),e.insertBoundary(t,null),a},statements:[["block","if",[["get","isSelectingAssociate",["loc",[null,[4,8],[4,28]]],0,0,0,0]],[],0,1,["loc",[null,[4,2],[8,9]]]]],locals:[],templates:[e,t]}}(),n=function(){return{meta:{revision:"Ember@2.9.1",loc:{source:null,start:{line:10,column:0},end:{line:12,column:0}},moduleName:"secret-santa/templates/components/person-show.hbs"},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createTextNode("  ");e.appendChild(t,n);var n=e.createElement("span");e.setAttribute(n,"class","sent-label");var a=e.createTextNode("Sent");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(){return[]},statements:[],locals:[],templates:[]}}();return{meta:{revision:"Ember@2.9.1",loc:{source:null,start:{line:1,column:0},end:{line:14,column:0}},moduleName:"secret-santa/templates/components/person-show.hbs"},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createComment("");e.appendChild(t,n);var n=e.createComment("");e.appendChild(t,n);var n=e.createElement("button");e.setAttribute(n,"class","btn btn-delete");var a=e.createTextNode("Delete");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var a=e.childAt(t,[2]),r=new Array(3);return r[0]=e.createMorphAt(t,0,0,n),r[1]=e.createMorphAt(t,1,1,n),r[2]=e.createElementMorph(a),e.insertBoundary(t,0),r},statements:[["block","if",[["get","isSelectedPerson",["loc",[null,[1,6],[1,22]]],0,0,0,0]],[],0,1,["loc",[null,[1,0],[9,7]]]],["block","if",[["get","isSent",["loc",[null,[10,6],[10,12]]],0,0,0,0]],[],2,null,["loc",[null,[10,0],[12,7]]]],["element","action",["delete",["get","model",["loc",[null,[13,26],[13,31]]],0,0,0,0]],[],["loc",[null,[13,8],[13,33]]],0,0]],locals:[],templates:[e,t,n]}}())}),define("secret-santa/templates/components/snow-fall",["exports"],function(e){e.default=Ember.HTMLBars.template(function(){return{meta:{revision:"Ember@2.9.1",loc:{source:null,start:{line:1,column:0},end:{line:2,column:0}},moduleName:"secret-santa/templates/components/snow-fall.hbs"},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createElement("canvas");e.setAttribute(n,"id","snowfall"),e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(){return[]},statements:[],locals:[],templates:[]}}())}),define("secret-santa/templates/index",["exports"],function(e){e.default=Ember.HTMLBars.template(function(){return{meta:{revision:"Ember@2.9.1",loc:{source:null,start:{line:1,column:0},end:{line:3,column:0}},moduleName:"secret-santa/templates/index.hbs"},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createComment("");e.appendChild(t,n);var n=e.createTextNode("\n");e.appendChild(t,n);var n=e.createComment("");e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var a=new Array(2);return a[0]=e.createMorphAt(t,0,0,n),a[1]=e.createMorphAt(t,2,2,n),e.insertBoundary(t,0),a},statements:[["inline","people-list",[],["model",["subexpr","@mut",[["get","model",["loc",[null,[1,20],[1,25]]],0,0,0,0]],[],[],0,0]],["loc",[null,[1,0],[1,27]]],0,0],["inline","person-form",[],["model",["subexpr","@mut",[["get","model.lastObject",["loc",[null,[2,20],[2,36]]],0,0,0,0]],[],[],0,0],"save-person",["subexpr","route-action",["savePerson"],[],["loc",[null,[2,49],[2,76]]],0,0]],["loc",[null,[2,0],[2,78]]],0,0]],locals:[],templates:[]}}())}),define("secret-santa/validators/alias",["exports","ember-cp-validations/validators/alias"],function(e,t){Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("secret-santa/validators/belongs-to",["exports","ember-cp-validations/validators/belongs-to"],function(e,t){Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("secret-santa/validators/collection",["exports","ember-cp-validations/validators/collection"],function(e,t){Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("secret-santa/validators/confirmation",["exports","ember-cp-validations/validators/confirmation"],function(e,t){Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("secret-santa/validators/date",["exports","ember-cp-validations/validators/date"],function(e,t){Object.defineProperty(e,"default",{enumerable:!0,get:function(){
return t.default}})}),define("secret-santa/validators/dependent",["exports","ember-cp-validations/validators/dependent"],function(e,t){Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("secret-santa/validators/ds-error",["exports","ember-cp-validations/validators/ds-error"],function(e,t){Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("secret-santa/validators/exclusion",["exports","ember-cp-validations/validators/exclusion"],function(e,t){Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("secret-santa/validators/format",["exports","ember-cp-validations/validators/format"],function(e,t){Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("secret-santa/validators/has-many",["exports","ember-cp-validations/validators/has-many"],function(e,t){Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("secret-santa/validators/inclusion",["exports","ember-cp-validations/validators/inclusion"],function(e,t){Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("secret-santa/validators/length",["exports","ember-cp-validations/validators/length"],function(e,t){Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("secret-santa/validators/messages",["exports","ember-cp-validations/validators/messages"],function(e,t){Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("secret-santa/validators/number",["exports","ember-cp-validations/validators/number"],function(e,t){Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("secret-santa/validators/presence",["exports","ember-cp-validations/validators/presence"],function(e,t){Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("secret-santa/config/environment",["ember"],function(e){var t="secret-santa";try{var n=t+"/config/environment",a=document.querySelector('meta[name="'+n+'"]').getAttribute("content"),r=JSON.parse(unescape(a)),l={default:r};return Object.defineProperty(l,"__esModule",{value:!0}),l}catch(e){throw new Error('Could not read config from meta tag with name "'+n+'".')}}),runningTests||require("secret-santa/app").default.create({name:"secret-santa",version:"0.0.0+d561e6aa"});