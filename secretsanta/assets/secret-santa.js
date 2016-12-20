"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('secret-santa/adapters/ls-adapter', ['exports', 'ember-localstorage-adapter/adapters/ls-adapter'], function (exports, _emberLocalstorageAdapterAdaptersLsAdapter) {
  exports['default'] = _emberLocalstorageAdapterAdaptersLsAdapter['default'];
});
define('secret-santa/adapters/person', ['exports', 'ember-localstorage-adapter/adapters/ls-adapter'], function (exports, _emberLocalstorageAdapterAdaptersLsAdapter) {
  exports['default'] = _emberLocalstorageAdapterAdaptersLsAdapter['default'].extend({});
});
define('secret-santa/app', ['exports', 'ember', 'secret-santa/resolver', 'ember-load-initializers', 'secret-santa/config/environment'], function (exports, _ember, _secretSantaResolver, _emberLoadInitializers, _secretSantaConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _secretSantaConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _secretSantaConfigEnvironment['default'].podModulePrefix,
    Resolver: _secretSantaResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _secretSantaConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('secret-santa/components/add-person', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    store: _ember['default'].inject.service('store'),
    actions: {
      newPerson: function newPerson() {
        var model = this.get('store').createRecord('person');
        this.set('model', model);
        this.set('addingPerson', true);
      },
      savePerson: function savePerson(person) {
        console.log('inovked');
        this.get('add-person')(person);
      }
    }
  });
});
define('secret-santa/components/people-list', ['exports', 'ember', 'npm:randomcolor'], function (exports, _ember, _npmRandomcolor) {
  var computed = _ember['default'].computed;
  var observer = _ember['default'].observer;
  exports['default'] = _ember['default'].Component.extend({
    classNames: ['people-list'],
    classNameBindings: ['isSelectingAssociate'],
    savedPeople: computed('model,model.@each', function () {
      return this.get('model').filterBy('name');
    }),
    actions: {
      savePerson: function savePerson(person) {
        if (person.get('isNew')) {
          this.store.createRecord('person');
        }
        person.save();
      },
      selectPerson: function selectPerson(person) {
        this.set('selectedPerson', person);
        this.set('isSelectingAssociate', true);
      },
      selectAssociate: function selectAssociate(associate) {
        this.set('isSelectingAssociate', false);
        var selectedPerson = this.get('selectedPerson');
        var color = (0, _npmRandomcolor['default'])();

        selectedPerson.setProperties({
          cantDraw: associate,
          color: color
        });
        selectedPerson.save();
        associate.setProperties({
          cantDraw: selectedPerson,
          color: color
        });
        associate.save();
      },
      deletePerson: function deletePerson(person) {
        person.destroyRecord();
      },
      randomize: function randomize(people) {
        this._randomize(people);
      },
      reset: function reset(people) {
        this._reset(people);
      }
    },
    _randomize: function _randomize(people) {
      var _this = this;

      this._reset(people);
      people.sortBy('sortId').forEach(function (person) {
        person.set('sent_status', false);
        person.get('cantDraw').then(function (cantDraw) {
          var randModel = _this._getRandomModel(people.filterBy('available').removeObject(person).removeObject(cantDraw));
          if (randModel !== undefined) {
            randModel.set('available', false);

            person.set('assigned', randModel.get('name'));
            person.save().then(function () {
              randModel.save().then(function () {
                var data = {};

                data["email"] = person.get('email');
                data["assigned"] = randModel.get('name');

                _ember['default'].$.ajax({
                  type: 'POST',
                  data: data,
                  url: "http://128.199.218.232:89/secretsanta/",
                  success: function success(data) {
                    person.set('sent_status', true);
                  },
                  error: function error(data) {
                    console.log(data);
                  }
                });
              });
            });
          } else {
            _this._randomize(people);
          }
        });
      });
    },
    _getRandomModel: function _getRandomModel(people) {
      var randNumber = Math.floor(Math.random() * (people.get('length') - 1));
      var randModel = people.objectAt(randNumber);
      return randModel;
    },
    _reset: function _reset(people) {
      people.forEach(function (person, index) {
        person.set('available', true);
        person.set('sortId', Math.floor(Math.random() * 500));
      });
    }
  });
});
define('secret-santa/components/person-form', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    classNames: ['person-form'],
    actions: {
      savePerson: function savePerson(person) {
        this.get('save-person')(person);
      }
    }
  });
});
define('secret-santa/components/person-show', ['exports', 'ember'], function (exports, _ember) {
  var get = _ember['default'].get;
  var computed = _ember['default'].computed;
  exports['default'] = _ember['default'].Component.extend({
    classNames: ['person-item'],
    classNameBindings: ['isSelectedPerson'],
    isSelectedPerson: computed('selectedPerson', function () {
      if (get(this, 'model') == get(this, 'selectedPerson')) {
        return true;
      } else {
        return false;
      }
    }),
    isSent: computed('model.sent_status', function () {
      if (get(this, 'model.sent_status')) {
        return true;
      } else {
        return false;
      }
    }),
    actions: {
      'delete': function _delete(model) {
        this.get('delete-person')(model);
      },
      edit: function edit() {
        this.set('isEditing', true);
      },
      savePerson: function savePerson(model) {
        this.set('isEditing', false);
        this.get('save-person')(model);
      },
      selectPerson: function selectPerson(person) {
        this.get('select-person')(person);
      },
      selectAssociate: function selectAssociate(person) {
        this.get('select-associate')(person);
      }
    }
  });
});
define("secret-santa/components/snow-fall", ["exports", "ember"], function (exports, _ember) {
    exports["default"] = _ember["default"].Component.extend({
        didInsertElement: function didInsertElement() {
            // lifted from https://codepen.io/loktar00/pen/CHpGo
            (function () {
                var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
                window.requestAnimationFrame = requestAnimationFrame;
            })();

            var flakes = [],
                canvas = document.getElementById("snowfall"),
                ctx = canvas.getContext("2d"),
                flakeCount = 100,
                mX = -10,
                mY = -10;

            canvas.width = window.innerWidth;
            canvas.height = 500;

            function snow() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                for (var i = 0; i < flakeCount; i++) {
                    var flake = flakes[i],
                        x = mX,
                        y = mY,
                        minDist = 100,
                        x2 = flake.x,
                        y2 = flake.y;

                    var dist = Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y)),
                        dx = x2 - x,
                        dy = y2 - y;

                    if (dist < minDist) {
                        var force = minDist / (dist * dist),
                            xcomp = (x - x2) / dist,
                            ycomp = (y - y2) / dist,
                            deltaV = force / 2;

                        flake.velX -= deltaV * xcomp;
                        flake.velY -= deltaV * ycomp;
                    } else {
                        flake.velX *= .18;
                        if (flake.velY <= flake.speed) {
                            flake.velY = flake.speed;
                        }
                        flake.velX += Math.cos(flake.step += .05) * flake.stepSize;
                    }

                    ctx.fillStyle = "rgba(255,255,255," + flake.opacity + ")";
                    flake.y += flake.velY;
                    flake.x += flake.velX;

                    if (flake.y >= canvas.height || flake.y <= 0) {
                        reset(flake);
                    }

                    if (flake.x >= canvas.width || flake.x <= 0) {
                        reset(flake);
                    }

                    ctx.beginPath();
                    ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
                    ctx.fill();
                }
                requestAnimationFrame(snow);
            };

            function reset(flake) {
                flake.x = Math.floor(Math.random() * canvas.width);
                flake.y = 0;
                flake.size = Math.random() * 3 + 1;
                flake.speed = Math.random() * 1 + 0.1;
                flake.velY = flake.speed;
                flake.velX = 0;
                flake.opacity = Math.random() * 0.5 + 0.3;
            }

            function init() {
                for (var i = 0; i < flakeCount; i++) {
                    var x = Math.floor(Math.random() * canvas.width),
                        y = Math.floor(Math.random() * canvas.height),
                        size = Math.random() * 0.1 + 1,
                        speed = Math.random() * 0.1 + 0.05,
                        opacity = Math.random() * 0.5 + 0.3;

                    flakes.push({
                        speed: speed,
                        velY: speed,
                        velX: 0,
                        x: x,
                        y: y,
                        size: size,
                        stepSize: Math.random() / 30,
                        step: 0,
                        opacity: opacity
                    });
                }

                snow();
            };

            canvas.addEventListener("mousemove", function (e) {
                mX = e.clientX, mY = e.clientY;
            });

            window.addEventListener("resize", function () {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            });

            init();
        }
    });
});
define('secret-santa/helpers/app-version', ['exports', 'ember', 'secret-santa/config/environment'], function (exports, _ember, _secretSantaConfigEnvironment) {
  exports.appVersion = appVersion;
  var version = _secretSantaConfigEnvironment['default'].APP.version;

  function appVersion() {
    return version;
  }

  exports['default'] = _ember['default'].Helper.helper(appVersion);
});
define('secret-santa/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('secret-santa/helpers/route-action', ['exports', 'ember-route-action-helper/helpers/route-action'], function (exports, _emberRouteActionHelperHelpersRouteAction) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberRouteActionHelperHelpersRouteAction['default'];
    }
  });
});
define('secret-santa/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('secret-santa/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'secret-santa/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _secretSantaConfigEnvironment) {
  var _config$APP = _secretSantaConfigEnvironment['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(name, version)
  };
});
define('secret-santa/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('secret-santa/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('secret-santa/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.Controller.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('secret-santa/initializers/export-application-global', ['exports', 'ember', 'secret-santa/config/environment'], function (exports, _ember, _secretSantaConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_secretSantaConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _secretSantaConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_secretSantaConfigEnvironment['default'].modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('secret-santa/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('secret-santa/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: _ember['default'].K
  };
});
define('secret-santa/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define("secret-santa/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('secret-santa/models/person', ['exports', 'ember-data', 'ember'], function (exports, _emberData, _ember) {
  var computed = _ember['default'].computed;
  exports['default'] = _emberData['default'].Model.extend({
    name: _emberData['default'].attr('string'),
    email: _emberData['default'].attr('string'),
    assigned: _emberData['default'].attr('string'),
    sortId: _emberData['default'].attr('number'),
    available: _emberData['default'].attr('boolean', { defaultValue: true }),
    cantDraw: _emberData['default'].belongsTo('person'),
    color: _emberData['default'].attr('string'),
    sent_status: _emberData['default'].attr('boolean', { defaultValue: false }),
    escapedStyle: computed('color', function () {
      var color = this.get('color');
      return _ember['default'].String.htmlSafe("color:" + color);
    })
  });
});
define('secret-santa/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('secret-santa/router', ['exports', 'ember', 'secret-santa/config/environment'], function (exports, _ember, _secretSantaConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _secretSantaConfigEnvironment['default'].locationType,
    rootURL: _secretSantaConfigEnvironment['default'].rootURL
  });

  Router.map(function () {
    this.route('index', { path: '/secretsanta' });
  });

  exports['default'] = Router;
});
define('secret-santa/routes/index', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      return this.store.findAll('person');
    },
    afterModel: function afterModel() {
      this.store.createRecord('person');
    },
    actions: {
      savePerson: function savePerson(person) {
        if (person.get('isNew')) {
          this.store.createRecord('person');
        }
        person.save();
      }
    }

  });
});
define('secret-santa/serializers/ls-serializer', ['exports', 'ember-localstorage-adapter/serializers/ls-serializer'], function (exports, _emberLocalstorageAdapterSerializersLsSerializer) {
  exports['default'] = _emberLocalstorageAdapterSerializersLsSerializer['default'];
});
define('secret-santa/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define("secret-santa/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.9.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 16,
            "column": 0
          }
        },
        "moduleName": "secret-santa/templates/application.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("header");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h1");
        dom.setAttribute(el2, "id", "main-title");
        var el3 = dom.createTextNode("Secret Santa by Hash Cookies");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "id", "trees");
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "id", "snow");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "outer-container");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "container");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [8, 1]), 1, 1);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "snow-fall", ["loc", [null, [1, 0], [1, 13]]], 0, 0, 0, 0], ["content", "outlet", ["loc", [null, [13, 4], [13, 14]]], 0, 0, 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("secret-santa/templates/assigned", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.9.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 0
          }
        },
        "moduleName": "secret-santa/templates/assigned.hbs"
      },
      isEmpty: true,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() {
        return [];
      },
      statements: [],
      locals: [],
      templates: []
    };
  })());
});
define("secret-santa/templates/components/add-person", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.9.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 0
          }
        },
        "moduleName": "secret-santa/templates/components/add-person.hbs"
      },
      isEmpty: true,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() {
        return [];
      },
      statements: [],
      locals: [],
      templates: []
    };
  })());
});
define("secret-santa/templates/components/people-list", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@2.9.1",
            "loc": {
              "source": null,
              "start": {
                "line": 2,
                "column": 2
              },
              "end": {
                "line": 4,
                "column": 2
              }
            },
            "moduleName": "secret-santa/templates/components/people-list.hbs"
          },
          isEmpty: false,
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("      ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["inline", "person-show", [], ["model", ["subexpr", "@mut", [["get", "person", ["loc", [null, [3, 26], [3, 32]]], 0, 0, 0, 0]], [], [], 0, 0], "save-person", ["subexpr", "action", ["savePerson"], [], ["loc", [null, [3, 45], [3, 66]]], 0, 0], "delete-person", ["subexpr", "action", ["deletePerson"], [], ["loc", [null, [3, 81], [3, 104]]], 0, 0], "select-person", ["subexpr", "action", ["selectPerson"], [], ["loc", [null, [3, 119], [3, 142]]], 0, 0], "isSelectingAssociate", ["subexpr", "@mut", [["get", "isSelectingAssociate", ["loc", [null, [3, 164], [3, 184]]], 0, 0, 0, 0]], [], [], 0, 0], "select-associate", ["subexpr", "action", ["selectAssociate"], [], ["loc", [null, [3, 202], [3, 228]]], 0, 0], "selectedPerson", ["subexpr", "@mut", [["get", "selectedPerson", ["loc", [null, [3, 244], [3, 258]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [3, 6], [3, 260]]], 0, 0]],
          locals: ["person"],
          templates: []
        };
      })();
      return {
        meta: {
          "revision": "Ember@2.9.1",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 6,
              "column": 0
            }
          },
          "moduleName": "secret-santa/templates/components/people-list.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          dom.setAttribute(el1, "class", "btn btn-primary");
          var el2 = dom.createTextNode("Randomize and Send");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [2]);
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          morphs[1] = dom.createElementMorph(element0);
          dom.insertBoundary(fragment, 0);
          return morphs;
        },
        statements: [["block", "each", [["get", "savedPeople", ["loc", [null, [2, 10], [2, 21]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [2, 2], [4, 11]]]], ["element", "action", ["randomize", ["get", "savedPeople", ["loc", [null, [5, 31], [5, 42]]], 0, 0, 0, 0]], [], ["loc", [null, [5, 10], [5, 44]]], 0, 0]],
        locals: [],
        templates: [child0]
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.1",
          "loc": {
            "source": null,
            "start": {
              "line": 6,
              "column": 0
            },
            "end": {
              "line": 8,
              "column": 0
            }
          },
          "moduleName": "secret-santa/templates/components/people-list.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("span");
          dom.setAttribute(el1, "class", "placeholder text-center");
          var el2 = dom.createTextNode("Your List is empty.");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.9.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 9,
            "column": 0
          }
        },
        "moduleName": "secret-santa/templates/components/people-list.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "savedPeople", ["loc", [null, [1, 6], [1, 17]]], 0, 0, 0, 0]], [], 0, 1, ["loc", [null, [1, 0], [8, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("secret-santa/templates/components/person-form", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.9.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 11,
            "column": 0
          }
        },
        "moduleName": "secret-santa/templates/components/person-form.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "form-group");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("label");
        var el3 = dom.createTextNode("Name");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "form-group");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("label");
        var el3 = dom.createTextNode("Email");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("button");
        var el2 = dom.createTextNode("Add To List");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [4]);
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 3, 3);
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [2]), 3, 3);
        morphs[2] = dom.createElementMorph(element0);
        return morphs;
      },
      statements: [["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "model.name", ["loc", [null, [3, 16], [3, 26]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [3, 2], [3, 28]]], 0, 0], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "model.email", ["loc", [null, [7, 16], [7, 27]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [7, 2], [7, 29]]], 0, 0], ["element", "action", ["savePerson", ["get", "model", ["loc", [null, [10, 30], [10, 35]]], 0, 0, 0, 0]], [], ["loc", [null, [10, 8], [10, 37]]], 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("secret-santa/templates/components/person-show", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.1",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 3,
              "column": 0
            }
          },
          "moduleName": "secret-santa/templates/components/person-show.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          dom.setAttribute(el1, "class", "person-name");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element1 = dom.childAt(fragment, [1]);
          var morphs = new Array(3);
          morphs[0] = dom.createAttrMorph(element1, 'style');
          morphs[1] = dom.createElementMorph(element1);
          morphs[2] = dom.createMorphAt(element1, 0, 0);
          return morphs;
        },
        statements: [["attribute", "style", ["get", "model.escapedStyle", ["loc", [null, [2, 73], [2, 91]]], 0, 0, 0, 0], 0, 0, 0, 0], ["element", "action", ["selectAssociate", ["get", "model", ["loc", [null, [2, 37], [2, 42]]], 0, 0, 0, 0]], [], ["loc", [null, [2, 10], [2, 44]]], 0, 0], ["content", "model.name", ["loc", [null, [2, 94], [2, 108]]], 0, 0, 0, 0]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.1",
          "loc": {
            "source": null,
            "start": {
              "line": 3,
              "column": 0
            },
            "end": {
              "line": 5,
              "column": 0
            }
          },
          "moduleName": "secret-santa/templates/components/person-show.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          dom.setAttribute(el1, "class", "person-name");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(3);
          morphs[0] = dom.createAttrMorph(element0, 'style');
          morphs[1] = dom.createElementMorph(element0);
          morphs[2] = dom.createMorphAt(element0, 0, 0);
          return morphs;
        },
        statements: [["attribute", "style", ["get", "model.escapedStyle", ["loc", [null, [4, 70], [4, 88]]], 0, 0, 0, 0], 0, 0, 0, 0], ["element", "action", ["selectPerson", ["get", "model", ["loc", [null, [4, 34], [4, 39]]], 0, 0, 0, 0]], [], ["loc", [null, [4, 10], [4, 41]]], 0, 0], ["content", "model.name", ["loc", [null, [4, 91], [4, 105]]], 0, 0, 0, 0]],
        locals: [],
        templates: []
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.1",
          "loc": {
            "source": null,
            "start": {
              "line": 6,
              "column": 0
            },
            "end": {
              "line": 8,
              "column": 0
            }
          },
          "moduleName": "secret-santa/templates/components/person-show.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("span");
          dom.setAttribute(el1, "class", "sent-label");
          var el2 = dom.createTextNode("Sent");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.9.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 10,
            "column": 0
          }
        },
        "moduleName": "secret-santa/templates/components/person-show.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("button");
        dom.setAttribute(el1, "class", "btn btn-delete");
        var el2 = dom.createTextNode("Delete");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element2 = dom.childAt(fragment, [2]);
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        morphs[2] = dom.createElementMorph(element2);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["block", "if", [["get", "isSelectingAssociate", ["loc", [null, [1, 6], [1, 26]]], 0, 0, 0, 0]], [], 0, 1, ["loc", [null, [1, 0], [5, 7]]]], ["block", "if", [["get", "isSent", ["loc", [null, [6, 6], [6, 12]]], 0, 0, 0, 0]], [], 2, null, ["loc", [null, [6, 0], [8, 7]]]], ["element", "action", ["delete", ["get", "model", ["loc", [null, [9, 26], [9, 31]]], 0, 0, 0, 0]], [], ["loc", [null, [9, 8], [9, 33]]], 0, 0]],
      locals: [],
      templates: [child0, child1, child2]
    };
  })());
});
define("secret-santa/templates/components/snow-fall", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.9.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "secret-santa/templates/components/snow-fall.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("canvas");
        dom.setAttribute(el1, "id", "snowfall");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() {
        return [];
      },
      statements: [],
      locals: [],
      templates: []
    };
  })());
});
define("secret-santa/templates/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.9.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 4,
            "column": 0
          }
        },
        "moduleName": "secret-santa/templates/index.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["inline", "people-list", [], ["model", ["subexpr", "@mut", [["get", "model", ["loc", [null, [1, 20], [1, 25]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [1, 0], [1, 27]]], 0, 0], ["inline", "person-form", [], ["model", ["subexpr", "@mut", [["get", "model.lastObject", ["loc", [null, [3, 20], [3, 36]]], 0, 0, 0, 0]], [], [], 0, 0], "save-person", ["subexpr", "route-action", ["savePerson"], [], ["loc", [null, [3, 49], [3, 76]]], 0, 0]], ["loc", [null, [3, 0], [3, 78]]], 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('secret-santa/config/environment', ['ember'], function(Ember) {
  var prefix = 'secret-santa';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("secret-santa/app")["default"].create({"name":"secret-santa","version":"0.0.0+53fffc9e"});
}

/* jshint ignore:end */
//# sourceMappingURL=secret-santa.map
