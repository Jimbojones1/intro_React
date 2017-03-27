var React    = require('react');
var ReactDOM = require('react-dom')

//creating our first component
var MainComponent = React.createClass({
  getInitialState: function(){
    return {name: 'bill'}
  },
  render: function(){
    return (
      <div>
        <h1>Hello World I am a React Component</h1>
        <HelloDog name={this.state.name}/>
      </div>
      )
  }
})



var HelloDog = React.createClass({
  render: function(){
    console.log(this.props)

    return (
      <div>
        <h2 id="blah"> Hellow Pup {this.props.name}</h2>
        <p className="dog-name"> Im hailey </p>
      </div>
      )
  }
})



ReactDOM.render(
  <MainComponent/>, document.getElementById('container')
  )
