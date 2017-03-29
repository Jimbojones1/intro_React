var React    = require('react');
var ReactDOM = require('react-dom');
var request  = require('superagent');

//creating our first component

var MainContainer = React.createClass({
  getInitialState: function(){
    return {loggedIn: false, username: '', mainPage: false, crimePage: false, taxiData: [], crimes: []}
  },
  componentDidMount: function(){
    var state = this.state;
    var self = this;

    request.get('https://data.cityofchicago.org/resource/wrvz-psew.json')
      .end(function(err, data){
        console.log(data.body)
        state.taxiData = data.body;
        // console.log(this, ' this is this or is that')
        self.setState(state);
         console.log(self.state, ' this is this.state')
      })

    request.get('https://data.cityofchicago.org/resource/c4ep-ee5m.json')
      .end(function(err, data){
        console.log(data)
        state.crimes = data.body;
        self.setState(state)

      })



  },
  getLoginInfo: function(isLoggedIn, username){
    console.log(isLoggedIn, username)
    var state = this.state;
    state.loggedIn = isLoggedIn;
    state.username = username;
    state.mainPage = true
    this.setState(state)
  },
  getPage: function(currentPage){
    // change the state of crimePage and mainPage
    if(currentPage === 'bannanssss'){
      var state = this.state;
      state.mainPage = false;
      state.crimePage = true;
      this.setState(state)
    }
  },
  render: function(){
             // {this.state.loggedIn && this.state.mainPage || this.state.loggedIn && this.state.crimePage ?  <MainPage username={this.state.username} getPage={this.getPage}/> : <LoginForm getLoginInfo={this.getLoginInfo} />}
    return (
       <div>
         {!this.state.loggedIn ? <LoginForm getLoginInfo={this.getLoginInfo}/> :  this.state.mainPage ?  <MainPage username={this.state.username} getPage={this.getPage} taxiData={this.state.taxiData}/> :  <CrimeComponent kittyCrimes={this.state.crimes}/>}
       </div>
      )
  }
})

var LoginForm = React.createClass({
  getInitialState: function(){
    return {username: ''}
  },
  handleInput: function(event){
    // manipulate state, we do that manipulating the whole state object
    var state = this.state;
    state.username = event.target.value;
    this.setState(state)

  },
  handleLoginSubmission: function(){
    this.props.getLoginInfo(true, this.state.username)
  },
  render: function(){
    return (
        <div>
          <input onChange={this.handleInput} type="text" name="username" placeholder="username" value={this.state.username}/>
          <button onClick={this.handleLoginSubmission}>login</button>
        </div>
      )
  }
})

var MainPage = React.createClass({
  changePage: function(){
    this.props.getPage('bannanssss')
  },
  render: function(){

      // map to llop through arrays creates a copy of the original
      var taxiInfo = this.props.taxiData.map(function(taxi, i){
        return <li key={i}> THe fare was {taxi.fare}, for this many miles {taxi.trip_miles}</li>
      })

   return (
      <div>
        <h1> Hey {this.props.username}</h1>
        <button onClick={this.changePage}>Show Me Crimes</button>
        <ul>{taxiInfo}</ul>
      </div>
      )
  }
})

var CrimeComponent = React.createClass({
  render: function(){
    var crimes = this.props.kittyCrimes.map(function(crime, i){
      return <li key={i}> {crime.description} happened at {crime.block}</li>
    })


    return (
      <div>
        <h1> Crimes</h1>
        <ul>
          {crimes}
        </ul>
      </div>
      )
  }
})

















ReactDOM.render(
  <MainContainer/>, document.getElementById('container')
  )
