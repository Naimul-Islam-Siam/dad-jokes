import React, { Component } from 'react';
import axios from 'axios';
import uuid from 'uuid/v4';
import './JokesList.css';
import Joke from './Joke';

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
         jokes.push({ id: uuid(), text: response.data.joke, votes: 0 });
      }
      this.setState({ jokes: jokes });
   }

   handleVotes(id, delta) {
      this.setState(st => ({
         jokes: st.jokes.map(j => (
            j.id === id ? { ...j, votes: j.votes + delta } : j
         ))
      }))
   }

   render() {
      let joke = this.state.jokes.map(j => (
         <Joke
            key={j.id}
            text={j.text}
            votes={j.votes}
            upvote={() => this.handleVotes(j.id, 1)}
            downvote={() => this.handleVotes(j.id, -1)}
         />
      ));

      return (
         <div className="JokesList">
            <div className="JokesList-sidebar">
               <h1 className="JokesList-title"><span>Dad</span> Jokes</h1>
               <img src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg' alt="sidebar emoji" />
               <button className="JokesList-getmore">New Jokes</button>
            </div>
            <div className="JokesList-jokes">
               {joke}
            </div>
         </div>
      );
   }
};