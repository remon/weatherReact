const weatherUrl = "http://api.apixu.com/v1/current.json?";
const api_key = " d757771d0163492ca9a192755182611";

class WeatherForm extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      React.createElement("form", {onSubmit: this.handleSubmit}, 
        React.createElement("input", {
          value: this.state.current_search, 
          onChange: this.handleInputChange}
        ), 

        React.createElement("button", null, "Submit ")
      )
    );
  }
}

class WeatherContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      React.createElement("div", {className: "weathercontainer"}, 
        React.createElement(WeatherForm, null)
      )
    );
  }
}
ReactDOM.render(WeatherContainer, document.getElementById("root"));
