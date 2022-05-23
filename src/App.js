import React from "react";

import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import Navigation from "./components/Navigation/Navigation";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import "tachyons";

// const particleOptions = {
//                  particles: {
//                     number: {
//                         value: 30,
//                         density: {
//                             enable: true,
//                             value_area: 800
//                         }
//                     }
//             }
//          }

const initialState = {
  route: "signIn",
  input: "",
  imageUrl:
    "https://en.wikipedia.org/wiki/Morgan_Freeman#/media/File:Morgan_Freeman_Deauville_2018.jpg",
  box: {},
  isSignedIn: true,
  user: {
    id: "",
    name: "",
    email: "",
    password: "",
    entries: 0,
    joined: "",
  },
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      route: "signIn",
      input: "",
      imageUrl: "",
      box: {},
      isSignedIn: false,
      user: {
        id: "",
        name: "",
        email: "",
        password: "",
        entries: 0,
        joined: "",
      },
    };
  }

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({ box: box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    fetch("https://salty-scrubland-21115.herokuapp.com/imageurl", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.displayFaceBox(this.calculateFaceLocation(data));
        if (data) {
          fetch("https://salty-scrubland-21115.herokuapp.com/image", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((entries) => {
              this.setState({
                user: {
                  ...this.state.user,
                  entries: entries,
                },
              });
            });
        }
      });
  };

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  render() {
    const { route, input, imageUrl, box, isSignedIn } = this.state;

    return (
      <div>
        <Navigation
          onRouteChange={this.onRouteChange}
          isSignedIn={isSignedIn}
        />

        {this.state.route === "home" ? (
          <>
            <Rank name={this.state.user.name} rank={this.state.user.entries} />
            <ImageLinkForm
              onSubmit={this.onSubmit}
              onInputChange={this.onInputChange}
            />
            <FaceRecognition box={box} image={imageUrl} />
          </>
        ) : route === "signIn" ? (
          <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        ) : (
          <Register
            onRouteChange={this.onRouteChange}
            loadUser={this.loadUser}
          />
        )}
      </div>
    );
  }
}

export default App;
