"use strict";

var data = {Database: Database};
var I = 0;
var N = 100;

function getCountClassName(db) {
  var count = db.queries.length;
  var className = 'label';
  if (count >= 20) {
      className += ' label-important';
  }
  else if (count >= 10) {
      className += ' label-warning';
  }
  else {
      className += ' label-success';
  }
  return className;
}

function elapsedClassName(elapsed) {
  var className = 'Query elapsed';
  if (elapsed >= 10.0) {
      className += ' warn_long';
  }
  else if (elapsed >= 1.0) {
      className += ' warn';
  }
  else {
      className += ' short';
  }
  return className;
}

function formatElapsed(value) {
  if (!value) return '';
  var str = parseFloat(value).toFixed(2);
  if (value > 60) {
      var minutes = Math.floor(value / 60);
      var comps = (value % 60).toFixed(2).split('.');
      var seconds = comps[0].lpad('0', 2);
      var ms = comps[1];
      str = minutes + ":" + seconds + "." + ms;
  }
  return str;
}

t7.module(function(t7) {

  class App extends Inferno.Component {
    constructor() {
      super();
      this.dbs = [];
      this._updateDbs = this._updateDbs.bind(this)
      this._renderDatabase = this._renderDatabase.bind(this);
      this._renderQuery = this._renderQuery.bind(this);
      this._updateDbs();
    }
    _updateDbs() {
      this.dbs = [];
      for (var i = 0; i < N; i++) {
        this.dbs.push(new data.Database('cluster' + i));
        this.dbs.push(new data.Database('cluster' + i + 'slave'));
      }
      this.forceUpdate();
      Monitoring.renderRate.ping();
      setTimeout(this._updateDbs, 0);
    }
    render() {
      return ({dom: null, key: null, template: __0604707733, templateValue: this.dbs.map(this._renderDatabase), templateElements: null, templateTypes: null});
    }
    _renderDatabase(db) {
      return ({dom: null, key: null, template: __02119350376, templateValues: [db.name, db.queries.length, getCountClassName(db), db.getTopFiveQueries().map(this._renderQuery)], templateElements: Array(4), templateTypes: Array(4)});
    }
    _renderQuery(query) {
      return ({dom: null, key: null, template: __1523803376, templateValues: ['Query ' + elapsedClassName(query.elapsed), formatElapsed(query.elapsed), query.query], templateElements: Array(3), templateTypes: Array(3)});
    }
  };

  t7.assign("App", App);

  var app = document.getElementById("app");

  Inferno.render(
    ({dom: null, component: t7.loadComponent("App"), props:  {}, key: null, template: null}),
    app
  );
});

/*t7 precompiled templates*/
;function __1523803376(fragment, component){"use strict";var root = Inferno.dom.createElement('td');fragment.templateTypes[0] = Inferno.Type.ATTR_CLASS;fragment.templateElements[0] = root;Inferno.dom.addAttributes(root, {'class':fragment.templateValues[0]}, component);var n_0 = Inferno.dom.createElement('span');if(typeof fragment.templateValues[1] === 'string' || typeof fragment.templateValues[1] === 'number') {n_0.textContent=(fragment.templateValues[1] === '' ? ' ' : fragment.templateValues[1]);fragment.templateTypes[1] = Inferno.Type.TEXT;} else {fragment.templateTypes[1] = (fragment.templateValues[1].constructor === Array ? Inferno.Type.LIST : Inferno.Type.FRAGMENT);}fragment.templateElements[1] = n_0;Inferno.dom.addAttributes(n_0, {'class':'foo'}, component);root.appendChild(n_0);var n_1 = Inferno.dom.createElement('div');var n_1_0 = Inferno.dom.createElement('div');if(typeof fragment.templateValues[2] === 'string' || typeof fragment.templateValues[2] === 'number') {n_1_0.textContent=(fragment.templateValues[2] === '' ? ' ' : fragment.templateValues[2]);fragment.templateTypes[2] = Inferno.Type.TEXT;} else {fragment.templateTypes[2] = (fragment.templateValues[2].constructor === Array ? Inferno.Type.LIST : Inferno.Type.FRAGMENT);}fragment.templateElements[2] = n_1_0;Inferno.dom.addAttributes(n_1_0, {'class':'popover-content'}, component);n_1.appendChild(n_1_0);var n_1_1 = Inferno.dom.createElement('div');Inferno.dom.addAttributes(n_1_1, {'class':'arrow'}, component);n_1.appendChild(n_1_1);Inferno.dom.addAttributes(n_1, {'class':'popover left'}, component);root.appendChild(n_1);fragment.dom = root;};__1523803376.key=1523803376;
;function __0604707733(fragment, component){"use strict";var root = Inferno.dom.createElement('table');Inferno.dom.addAttributes(root, {'class':'table table-striped latest-data'}, component);var n_0 = Inferno.dom.createElement('tbody');if(typeof fragment.templateValue === 'string' || typeof fragment.templateValue === 'number') {n_0.textContent=(fragment.templateValue === '' ? ' ' : fragment.templateValue);fragment.templateType = Inferno.Type.TEXT;} else {fragment.templateType = (fragment.templateValue.constructor === Array ? Inferno.Type.LIST : Inferno.Type.FRAGMENT);}fragment.templateElement = n_0;root.appendChild(n_0);fragment.dom = root;};__0604707733.key=-604707733;
;function __02119350376(fragment, component){"use strict";var root = Inferno.dom.createElement('tr');var n_0 = Inferno.dom.createElement('td');if(typeof fragment.templateValues[0] === 'string' || typeof fragment.templateValues[0] === 'number') {n_0.textContent=(fragment.templateValues[0] === '' ? ' ' : fragment.templateValues[0]);fragment.templateTypes[0] = Inferno.Type.TEXT;} else {fragment.templateTypes[0] = (fragment.templateValues[0].constructor === Array ? Inferno.Type.LIST : Inferno.Type.FRAGMENT);}fragment.templateElements[0] = n_0;Inferno.dom.addAttributes(n_0, {'class':'dbname'}, component);root.appendChild(n_0);var n_1 = Inferno.dom.createElement('td');var n_1_0 = Inferno.dom.createElement('span');if(typeof fragment.templateValues[1] === 'string' || typeof fragment.templateValues[1] === 'number') {n_1_0.textContent=(fragment.templateValues[1] === '' ? ' ' : fragment.templateValues[1]);fragment.templateTypes[1] = Inferno.Type.TEXT;} else {fragment.templateTypes[1] = (fragment.templateValues[1].constructor === Array ? Inferno.Type.LIST : Inferno.Type.FRAGMENT);}fragment.templateElements[1] = n_1_0;fragment.templateTypes[2] = Inferno.Type.ATTR_CLASS;fragment.templateElements[2] = n_1_0;Inferno.dom.addAttributes(n_1_0, {'class':fragment.templateValues[2]}, component);n_1.appendChild(n_1_0);Inferno.dom.addAttributes(n_1, {'class':'query-count'}, component);root.appendChild(n_1);var n_2;if(typeof fragment.templateValues[3] === 'string' || typeof fragment.templateValues[3] === 'number') {n_2 = Inferno.dom.createText(fragment.templateValues[3]);fragment.templateTypes[3] = Inferno.Type.TEXT_DIRECT;} else {n_2 = Inferno.dom.createEmpty();fragment.templateTypes[3] = (fragment.templateValues[3].constructor === Array ? Inferno.Type.LIST_REPLACE : Inferno.Type.FRAGMENT_REPLACE);}fragment.templateElements[3] = n_2;root.appendChild(n_2);fragment.dom = root;};__02119350376.key=-2119350376;