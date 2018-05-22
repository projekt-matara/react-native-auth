import React, {Component} from 'react'
import { View, Text } from 'react-native'
import firebase from 'firebase'
import { Header, Button, Spinner } from './components/common'
import LoginForm from './components/LoginForm'

class App extends Component {
  state = { loggedIn: null }

  componentWillMount () {
    firebase.initializeApp({
      apiKey: "AIzaSyDsys3bgPhVKd-VSApJNk4hrrCBOSY1J4Y",
      authDomain: "authentication-dfe64.firebaseapp.com",
      databaseURL: "https://authentication-dfe64.firebaseio.com",
      projectId: "authentication-dfe64",
      storageBucket: "authentication-dfe64.appspot.com",
      messagingSenderId: "195281806462"
    })

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true })
      } else {
        this.setState({ loggedIn: false })
      }
    })
  }

  renderContent () {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Button
            onPress={ () => firebase.auth().signOut() }
          />
        )
      case false:
        return <LoginForm />
      default:
        return <Spinner />
    }
  }

  render () {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View> 
    )
  }
}

export default App