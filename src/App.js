import React, { Component } from "react";
import CharacterCard from "./components/CharacterCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import characters from "./characters.json";
import "./App.css"
import { log } from "util";

class App extends Component {
  // Setting this.state.characters to the characters json array


  handleFail = () => {
    alert("You already guessed that card - Game Over");
    let newCharacters = [...characters];
    newCharacters = this.shuffle(newCharacters);
    newCharacters.forEach(element => {
      element.chosen = false
    });
    // console.log(newCharacters);
    this.setState({ characters: newCharacters, currentScore: 0 })
  };

  shuffle = array => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    };
    return array;
  };

  playGuess = id => {
    let characterList = [...this.state.characters];
    // console.log(characterList);
    const index = characterList.map(function (x) { return x.id; }).indexOf(id);
    // console.log(index);

    let currentScore = this.state.currentScore;
    let bestScore = this.state.bestScore;
    if (characterList[index].chosen === true) {
      this.handleFail();
    } else {
      characterList[index].chosen = true;
      currentScore++;
      if (currentScore > bestScore) { bestScore = currentScore };
      characterList = this.shuffle(characterList);
      let audio = new Audio();
      audio.src = characterList[index].sound;
      audio.play();
      this.setState({ characters: characterList, currentScore, bestScore });
    }
  };

  changeSound = () => {
    if (this.state.audio) this.setState({audio: false})
    else this.setState({audio: true})
  }

  state = {
    characters: this.shuffle(characters),
    currentScore: 0,
    bestScore: 0,
    audio: true,
    backgroundMusic: "resources/sounds/DragonTheme.mp3"
  };

  


  // Map over this.state.characters and render a FriendCard component for each friend object
  render() {
    // console.log(this.state);

    return (
      <Wrapper>
        {this.state.audio && <audio src="resources/sounds/DragonTheme.mp3" loop autoPlay />}
        {console.log(this.state.backgroundMusic)}
        <Title
          currentScore={this.state.currentScore}
          bestScore={this.state.bestScore}
          audio={this.state.audio}
          changeSound={this.changeSound}
        >Legend of Zelda Guessing Game</Title>
        <div className="cards d-flex justify-content-center">
          {this.state.characters.map(characters => (
            <CharacterCard
              playGuess={this.playGuess}
              id={characters.id}
              key={characters.id}
              name={characters.name}
              image={characters.image}
            />
          ))}
        </div>
      </Wrapper >
    );
  }
}

export default App;
