const weatherUrl = "http://api.apixu.com/v1/current.json?";

class WeatherForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_search: ""
    };
  }
  render() {
    return (
      React.createElement("form", null, 
        React.createElement("input", {value: this.state.current_search}), 

        React.createElement("button", null, "Submit ")
      )
    );
  }
}
ReactDOM.render(React.createElement(WeatherForm, null), document.getElementById("root"));
