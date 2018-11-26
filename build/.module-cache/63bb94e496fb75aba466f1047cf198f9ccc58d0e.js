const weatherUrl = "http://api.apixu.com/v1/current.json?";
const api_key = " d757771d0163492ca9a192755182611";

class WeatherForm extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      React.createElement("form", null, 
        React.createElement("input", {value: "", onChange: this.props.onChange}), 

        React.createElement("button", null, "Submit ")
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
    const current_search = this.state.current_search;
    return React.createElement(WeatherForm, {current_search: current_search});
  }
}
ReactDOM.render(WeatherContainer, document.getElementById("root"));
