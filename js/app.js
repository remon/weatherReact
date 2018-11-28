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
      <form onSubmit={this.props.onSubmit}>
        <div className="input-group input-group-lg city_name_wrapper">
          <input
            required={true}
            className="form-control"
            value={this.props.value}
            onChange={this.props.onChange}
          />
        </div>

        <div className="sub_cont">
          <input
            type="button"
            className="btn btn-lg btn-info resetBtn"
            value="Reset Form"
            onClick={this.props.onResetBtn}
          />
          <button className="btn btn-success btn-lg">Get Data</button>
        </div>
      </form>
    );
  }
}
class CityData extends React.Component {
  render() {
    const city = this.props.city;
    const location = this.props.location;

    return (
      <div className="city_container">
        <h3>
          {location.name} , {location.region} ,{location.country}
        </h3>
        <h4> Local Time : {location.localtime}</h4>

        <h5> Temperature (C) : {city.temp_c}</h5>
        <h5> Temperature (F) : {city.temp_f}</h5>
        <div>
          <span>{city.condition.text}</span>
          <img src={city.condition.icon} />
        </div>
      </div>
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
    this.resetForm = this.resetForm.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      current_search: e.target.value
    });
  }
  resetForm(e) {
    e.preventDefault();
    console.log(" I am Clicked");
    this.setState({
      current_search: "",
      error: false,
      loading: false,
      searchData: {}
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    let search = this.state.current_search;
    const that = this;

    this.setState({
      loading: true,
      searchData: {},
      error: false
    });

    axios
      .get(weatherUrl, {
        params: {
          q: search,
          key: api_key
        }
      })
      .then(function(response) {
        that.setState({
          searchData: response.data
        });
      })
      .catch(function(error) {
        that.setState({
          searchData: {},
          error: true
        });
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
    const isError = this.state.error;
    let subForm;
    let loadingGif = "";

    if (isLoading) {
      loadingGif = (
        <div className="loading_gif">
          <img src="images/loader.png" />
        </div>
      );
    }

    if (isEmpty(searchData)) {
      subForm = "";
    } else {
      const current_data = this.state.searchData.current;
      const location = this.state.searchData.location;
      subForm = (
        <div className="city_data">
          <CityData city={current_data} location={location} />
        </div>
      );
    }
    return (
      <div className="weathercontainer">
        <h1 className="weather_title"> Get Weather Info</h1>
        <div className="weather_cont">
          <h5>Enter the city name here</h5>
          <WeatherForm
            onSubmit={this.handleSubmit}
            onChange={this.handleInputChange}
            onResetBtn={this.resetForm}
            value={this.state.current_search}
          />
        </div>
        {subForm}
        {loadingGif}
        {isError && (
          <h3 className="error_msg">
            There is an error loading your search , Try again
          </h3>
        )}
      </div>
    );
  }
}
ReactDOM.render(<WeatherContainer />, document.getElementById("root"));
