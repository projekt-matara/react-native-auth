import React, {Component} from 'react'
import { Text } from 'react-native'
import { Button, Card, CardSection, Input, Spinner } from './common'
import firebase from 'firebase'

class LoginForm extends Component {
  state = { email: '', password: '', error: '', loading: false } 

  onButtonPress () {
    const {email, password} = this.state

    this.setState({error: '', loading: true})

    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this))
          .catch(this.onLoginFail.bind(this))
      })
      .then(this.onLoginSuccess.bind(this))
  }

  onLoginFail () {
    this.setState({error: 'Authentication Failed.', loading: false})
  }

  onLoginSuccess () {
    this.setState({ 
      loading: false, 
      error: '', 
      email: '', 
      password: '' 
    })
  }

  renderButton () {
    if (this.state.loading) {
      return <Spinner size="small" />
    } else {
      return <Button onPress={this.onButtonPress.bind(this)} />
    }
  }

  render () {
    return (
      <Card>
        <CardSection>
          <Input 
            label="Email"
            placeholder="user@email.com"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
        </CardSection>

        <CardSection>
          <Input 
            label="Password"
            placeholder="password"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            secureTextEntry
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>{this.state.error}</Text>
        
        <CardSection>
          { this.renderButton() }
        </CardSection>
      </Card>
    )
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
}

export default LoginForm