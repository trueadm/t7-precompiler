"use strict";

t7.module(function(t7) {

  class InfernoExample extends Inferno.Component {
      constructor(props) {
        super(props);
        this.state = {
          visible: true,
          counter: 0,
          formShow: true,
          foo: "single!",
          isOn: false,
          className: "foo",
          name: "test",
          textFieldValue: "Text!"
        };
        this.handleCounter();
      }
      render() {
        if(this.state.visible) {
          return ({dom: null, key: null, template: __t7__$292331807, templateValues: [
                  this.hide,
                  this.state.counter,
                  this.state.name,
                  this.props.time.toString(),
                  this.renderForm(),
                  this.state.name,
                  (this.state.isOn === false ? ({dom: null, key: null, template: __t7__1149231429, }) : ({dom: null, key: null, template: __t7__944087704, templateValue: this.props.time.toString(), templateElements: null, templateTypes: null})),
                  this.clickSwitch,
                  ({dom: null, key: null, template: __t7__1024510217, templateValue: this.state.foo, templateElements: null, templateTypes: null}),
                  this.props.people != null ? this.props.people.map(this.renderPerson.bind(this)) : null,
                  this.state.className
          ], templateElements: Array(11), templateTypes: Array(11)});
        } else {
          return ({dom: null, key: null, template: __t7__1417139913, templateValue: this.show, templateElements: null, templateTypes: null});
        }
      }
      renderPerson(person) {
        if(this.state.counter % 3 === 1) {
          return ({dom: null, key: null, template: __t7__1630775210, templateValues: [person, this.state.counter], templateElements: Array(2), templateTypes: Array(2)});
        } else {
          return ({dom: null, key: null, template: __t7__1505306658, templateValues: [person, this.state.counter], templateElements: Array(2), templateTypes: Array(2)});
        }
      }
      renderForm() {
        if(this.state.formShow) {
          return ({dom: null, key: null, template: __t7__1647030613, templateValues: [this.state.textFieldValue, this.turnOffForm], templateElements: Array(2), templateTypes: Array(2)});
        } else {
          return ({dom: null, key: null, template: __t7__1788624329, templateValue: this.turnOnForm, templateElements: null, templateTypes: null});
        }
      }
      turnOffForm(e) {
        this.setState({
          formShow: false
        });
        e.preventDefault();
      }
      turnOnForm(e) {
        this.setState({
          formShow: true
        });
        e.preventDefault();
      }
      hide(e) {
        this.setState({
          visible: false
        });
      }
      show(e) {
        this.setState({
          visible: true
        });
      }
      clickSwitch(e) {
        this.setState({
          isOn: !this.state.isOn
        });
      }
      handleCounter() {
        this.setState({
          counter: this.state.counter + 1
        });
        setTimeout(this.handleCounter.bind(this), 2000);
      }
  }

  t7.assign("App", InfernoExample);

  var odd = true;

  function update() {
    var date = new Date();
    var people = [];
    odd = !odd;
    if(!odd) {
      people = [
        "Bob",
        "Dominic",
        "John",
        "Edward"
      ]
    } else {
      people = [
        "Jemma",
        "Charlie",
        "Harry",
        "Kieria",
        "Paul",
        "Ken"
      ]
    }

    Inferno.render(
      ({dom: null, component: __$components__.App, props:  {'time':date,'people':people}, key: null, template: null}),
      document.getElementById("app")
    );
    setTimeout(update, 1000);
  }

  update();

});
