import React, { Component } from 'react';
import axios from 'axios';
import './JokesList.css';

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
         <div className="JokesList">
            <div className="JokesList-sidebar">
               <h1 className="JokesList-title"><span>Dad</span> Jokes</h1>
               <img src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg' />
               <button className="JokesList-getmore">New Jokes</button>
            </div>
            <div className="JokesList-jokes">
               {joke}
            </div>
         </div>
      );
   }
};