import React, { Component } from 'react';
import './App.css';

const NAMES_OF_DOGS = [];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      dog: '',
      storedDogImages: [],
      name: '',
    }

    this.fetchDogImage = this.fetchDogImage.bind(this);
    this.renderDogImage = this.renderDogImage.bind(this);
    this.saveImages = this.saveImages.bind(this);
    this.saveNames = this.saveNames.bind(this);
  }

  fetchDogImage = () => {
    this.setState({ loading: true }, () => {
      fetch('https://dog.ceo/api/breeds/image/random')
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          loading: false,
          dog: data.message,
        })
      })
    })
  }

  saveNames() {
    const { dog, name } = this.state;

    NAMES_OF_DOGS.push([name, dog]);
    console.log(NAMES_OF_DOGS)
  }

  renderDogImage() {
    return (
      <div>
        <img className="Image" src={this.state.dog} alt="A cute dog" />
        <div>
          <label htmlFor="dog-name">
            Dê um nome para o doguinho:
            <input
              type="text"
              name="dog-name"
              onChange={e => this.setState({name: e.target.value})}
            />
          </label>
          <div>
            <button onClick={ this.saveNames }>Salvar Nome</button>
            <button onClick={ this.saveImages }>Mais um Doguinho</button>
          </div>
        </div>
      </div>
    );
  }

  saveImages() {
    this.setState(({ storedDogImages, dog }) => ({
      storedDogImages: [...storedDogImages, dog]
    }));

    this.fetchDogImage();
  }

  componentDidMount() {
    this.fetchDogImage();
  }

  shouldComponentUpdate() {
    const { dog } = this.state;

    if (dog !== '' && dog.includes('terrier')) {
      return false;
    }

    return true;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.dog !== this.state.dog) {
      const dogName = this.state.dog.split("/")[4];
      alert(dogName);
    }
  }

  render() {
    const { loading } = this.state;
    const loadingElement = <span>Loading...</span>;

    return (
      <div>
        <p>{loading ? loadingElement : this.renderDogImage()}</p>
      </div>
    );
  }
}

export default App;

