import React, { Component } from 'react';
import axios from 'axios';

export default class JokesList extends Component {
   static defaultProps = {
      numJokesToGet: 10
   }

   constructor(props) {
      super(props);
      this.state = { jokes: [] };
   }

   async componentDidMount() {
      let jokes = [];
      while (jokes.length < this.props.numJokesToGet) {
         let response = await axios.get("https://icanhazdadjoke.com/", { headers: { Accept: "application/json" } });
         jokes.push(response.data.joke);
      }
      this.setState({ jokes: jokes });
   }

   render() {
      let joke = this.state.jokes.map(j => (
         <div>{j}</div>
      ));

      return (
         <div>
            <h1>Dad Jokes</h1>
            {joke}
         </div>
      );
   }
};