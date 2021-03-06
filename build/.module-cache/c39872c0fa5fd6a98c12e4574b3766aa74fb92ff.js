const weatherUrl = "http://api.apixu.com/v1/current.json?";
const api_key = " d757771d0163492ca9a192755182611";

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}
class WeatherForm extends React.Component {
  render() {
    return (
      React.createElement("form", {onSubmit: this.props.onSubmit}, 
        React.createElement("div", {className: "input-group input-group-lg city_name_wrapper"}, 
          React.createElement("input", {
            required: true, 
            className: "form-control", 
            value: this.props.value, 
            onChange: this.props.onChange}
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
  render() {
    const city = this.props.city;
    const location = this.props.location;
    console.log(city);
    console.log(location);
    return (
      React.createElement("div", {className: "city_container"}, 
        React.createElement("h3", null, 
          location.name, " , ", location.region, " ,", location.country
        )
      )
    );
  }
}
class WeatherContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current_search: "",
      error: false,
      loading: false,
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
    this.setState({
      loading: true
    });
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
      })
      .then(function() {
        that.setState({
          loading: false
        });
      });
  }
  render() {
    const searchData = this.state.searchData;
    const isLoading = this.state.loading;
    let subForm;
    let loadingGif = "";

    if (isLoading) {
      loadingGif = (
        React.createElement("div", {className: "loading_gif"}, 
          React.createElement("img", {src: "images/loader.png"})
        )
      );
    }

    if (isEmpty(searchData)) {
      subForm = "";
    } else {
      const current_data = this.state.searchData.current;
      const location = this.state.searchData.location;
      subForm = (
        React.createElement("div", {className: "city_data"}, 
          React.createElement(CityData, {city: current_data, location: location})
        )
      );
    }
    return (
      React.createElement("div", {className: "weathercontainer"}, 
        React.createElement("h1", {className: "weather_title"}, " Get Weather Info"), 
        React.createElement("div", {className: "weather_cont"}, 
          React.createElement("h5", null, "Enter the city name here"), 
          React.createElement(WeatherForm, {
            onSubmit: this.handleSubmit, 
            onChange: this.handleInputChange, 
            value: this.state.current_search}
          )
        ), 
        subForm, 
        loadingGif
      )
    );
  }
}
ReactDOM.render(React.createElement(WeatherContainer, null), document.getElementById("root"));
