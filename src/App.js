import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      dog: '',
      storedDogImages: [],
    }

    this.fetchDogImage = this.fetchDogImage.bind(this);
    this.renderDogImage = this.renderDogImage.bind(this);
    this.saveImages = this.saveImages.bind(this);
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

  renderDogImage() {
    return (
      <div>
        <img className="Image" src={this.state.dog} alt="A cute dog" />
        <button onClick={this.saveImages}>Mais um Doguinho</button>
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

