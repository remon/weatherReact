const weatherUrl = "http://api.apixu.com/v1/current.json?";
const api_key = " d757771d0163492ca9a192755182611";

class WeatherForm extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      React.createElement("form", {onSubmit: this.props.handleSubmit}, 
        React.createElement("div", {className: "input-group input-group-lg city_name_wrapper"}, 
          React.createElement("input", {
            required: true, 
            className: "form-control", 
            value: this.props.current_search, 
            onChange: this.handleInputChange}
          )
        ), 

        React.createElement("div", {className: "sub_cont"}, 
          React.createElement("button", {className: "btn btn-success btn-lg"}, " Get Data ")
        )
      )
    );
  }
}
class CityData extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return React.createElement("h1", null, "Data Returned");
  }
}
class WeatherContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current_search: "",
      error: false,
      loading: true,
      searchData: {}
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      current_search: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let search = this.state.current_search;
    const that = this;
    axios
      .get(weatherUrl, {
        params: {
          q: search,
          key: api_key
        }
      })
      .then(function(response) {
        //console.log(response.data);
        that.setState({
          searchData: response.data
        });

        console.log(that.state.searchData);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  render() {
    return (
      React.createElement("div", {className: "weathercontainer"}, 
        React.createElement("h1", {className: "weather_title"}, " Get Weather Info"), 
        React.createElement("div", {className: "weather_cont"}, 
          React.createElement("h5", null, "Enter the city name here"), 
          React.createElement(WeatherForm, null)
        ), 
        React.createElement("div", {className: "city_data"}, 
          React.createElement(CityData, null)
        )
      )
    );
  }
}
ReactDOM.render(React.createElement(WeatherContainer, null), document.getElementById("root"));
