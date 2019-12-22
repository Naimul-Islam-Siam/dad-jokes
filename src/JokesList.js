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
      this.state = {
         //if local storage has jokes, fetch them, otherwise make jokes and empty array []
         jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]")
      };
      this.handleClick = this.handleClick.bind(this);
   }

   componentDidMount() {
      if (this.state.jokes.length === 0) {
         this.getJokes();
      }
   }

   async getJokes() {
      let jokes = [];
      while (jokes.length < this.props.numJokesToGet) {
         let response = await axios.get("https://icanhazdadjoke.com/", { headers: { Accept: "application/json" } });
         jokes.push({ id: uuid(), text: response.data.joke, votes: 0 });
      }
      this.setState(st => ({
         loading: false, jokes: [...st.jokes, ...jokes]
      }), () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
      );
   }

   handleClick() {
      this.setState({ loading: true }, this.getJokes);
   }

   handleVotes(id, delta) {
      this.setState(st => ({
         jokes: st.jokes.map(j => (
            j.id === id ? { ...j, votes: j.votes + delta } : j
         ))
      }), () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
      );
   }

   render() {
      let jokes = this.state.jokes.map(j => (
         <Joke
            key={j.id}
            text={j.text}
            votes={j.votes}
            upvote={() => this.handleVotes(j.id, 1)}
            downvote={() => this.handleVotes(j.id, -1)}
         />
      ));

      let spinner = <div className="JokesList-spinner">
         <i className="far fa-8x fa-laugh fa-spin" />
         <h1 className="JokesList-title">Loading...</h1>
      </div>;

      return (
         <div className="JokesList">
            <div className="JokesList-sidebar">
               <h1 className="JokesList-title"><span>Dad</span> Jokes</h1>
               <img src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg' alt="sidebar emoji" />
               <button className="JokesList-getmore" onClick={this.handleClick}>New Jokes</button>
            </div>
            <div className="JokesList-jokes">
               {this.state.loading ? (
                  <div className="JokesList-spinner-container">
                     {spinner}
                  </div>
               ) : (<div>{jokes}</div>)}

            </div>
         </div>
      );
   }
};