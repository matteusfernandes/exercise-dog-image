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
        <button onClick={this.fetchDogImage}>Mais um Doguinho</button>
      </div>
    );
  }

  componentDidMount() {
    this.fetchDogImage();
  }

  // shouldComponentUpdate({ muser }) {
  //   if (muser !== undefined) {
  //     console.log('oi')
  //     return muser.dob.age <= 50;
  //   }
  //   return true;
  // }

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

