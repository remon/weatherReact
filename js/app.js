const weatherUrl = "http://api.apixu.com/v1/current.json?";
const api_key = " d757771d0163492ca9a192755182611";

class WeatherForm extends React.Component {
  constructor(props) {
    super(props);
  }
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
          <button className="btn btn-success btn-lg"> Get Data </button>
        </div>
      </form>
    );
  }
}
class CityData extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <h1>Data Returned</h1>;
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
      <div className="weathercontainer">
        <h1 className="weather_title"> Get Weather Info</h1>
        <div className="weather_cont">
          <h5>Enter the city name here</h5>
          <WeatherForm
            onSubmit={this.handleSubmit}
            onChange={this.handleInputChange}
            value={this.state.current_search}
          />
        </div>
        <div className="city_data">
          <CityData />
        </div>
      </div>
    );
  }
}
ReactDOM.render(<WeatherContainer />, document.getElementById("root"));
