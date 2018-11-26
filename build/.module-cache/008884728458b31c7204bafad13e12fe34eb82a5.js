const weatherUrl = "http://api.apixu.com/v1/current.json?";

class WeatherForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_search: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      current_search: e.target.value
    });
  }
  render() {
    return (
      React.createElement("form", null, 
        React.createElement("input", {
          value: this.state.current_search, 
          onChange: this.handleInputChange}
        ), 

        React.createElement("button", null, "Submit ")
      )
    );
  }
}
ReactDOM.render(React.createElement(WeatherForm, null), document.getElementById("root"));
