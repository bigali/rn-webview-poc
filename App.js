import React from 'react';
import {View, AsyncStorage} from 'react-native';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import Page from "./Page";  
import { FormInput, Button } from "react-native-elements";

GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;

class LoginScreen extends React.Component {
    static navigationOptions = {
        title: 'Login',
      };

      constructor(props) {
          super(props);
          this.state = {
              token: ''
          }
          this.login = this.login.bind(this)
      }

      async componentDidMount() {
          try {
            let token = await AsyncStorage.getItem('token')
            this.setState({token})
           } catch(e) {
                console.log(e)
          }
        
        // if (token) {
        //     this.props.navigation.navigate('Gauge', {token: token})
        // }      
      }

      async login() {
        console.log('login with', this.state.token)
        try {
            AsyncStorage.setItem("token", this.state.token);
            this.props.navigation.navigate('Gauge', {token: this.state.token})
        } catch(e) {
            console.log(e)
        }
        
      }
    
      render () {
        return (
            <View style={{flex: 1}}>
                <FormInput
                            placeholderTextColor="gray"
                            placeholder="Token"
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={(token) => this.setState({ token })}
                            onSubmitEditing={this.login}
                            inputStyle={{fontSize: 18}}
                            containerStyle={{marginTop: 20}}
                            defaultValue={this.state.token}
                        />

                <Button
                    title='Login'
                    onPress={this.login} />        
            </View>
        )      
      }
}

class GaugeScreen extends React.Component {
    static navigationOptions = {
      title: 'Gauge',
      header: null,
    };

    render() {
      const { navigate } = this.props.navigation;
      const token = this.props.navigation.getParam('token', null);
      return (
            <Page url={`/budget/gauge/${token}`} ref={ref => this.child = ref}>
                <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'flex-start'}} >
                    <Button onPress={() => this.child.sendPostMessage({action: 'POP', type: 'navigation'})} title="back"
                            color="#841584"/>
                    <Button onPress={() => navigate('Coach', {token: token})} title="Go to coach"
                            color="#841584"/>
                    <Button onPress={() => navigate('Calendar', {token: token})} title="Go to calendar"
                            color="#841584"/>
                </View>
            </Page>
        );
    }
  }

class CalendarScreen extends React.Component {
    static navigationOptions = {
      title: 'Calendar',
      header: null,
    };

    render() {
      const { navigate } = this.props.navigation;
      const token = this.props.navigation.getParam('token', null);
      return (
            <Page url={`/budget/calendar/${token}`} ref={ref => this.child = ref}>
                <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'flex-start'}} >
                    <Button onPress={() => this.child.sendPostMessage({action: 'POP', type: 'navigation'})} title="back"
                            color="#841584"/>
                    <Button onPress={() => navigate('Coach', {token: token})} title="Go to coach"
                            color="#841584"/>
                    <Button onPress={() => navigate('Gauge', {token: token})} title="Go to gauge"
                            color="#841584"/>
                </View>
            </Page>
        );
    }
  }  

  class CoachScreen extends React.Component {
    static navigationOptions = {
      title: 'Coach',
      header: null,
    };

    render() {
      const { navigate } = this.props.navigation;
      const token = this.props.navigation.getParam('token', null);
      return (
            <Page url={`/coach/${token}`} ref={ref => this.child = ref}>
                <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'flex-start'}} >
                    <Button onPress={() => navigate('CoachRestartBudget', {token: token})} title="restart buget"
                            color="#841584"/>
                    <Button onPress={() => navigate('Gauge', {token: token})} title="Go to gauge"
                            color="#841584"/>
                    <Button onPress={() => navigate('Calendar', {token: token})} title="Go to calendar"
                            color="#841584"/>
                </View>
            </Page>
        );
    }
  }  

  class CoachRestartBudgetScreen extends React.Component {
    static navigationOptions = {
      title: 'Coach',
      header: null,
    };

    render() {
      const { navigate } = this.props.navigation;
      const token = this.props.navigation.getParam('token', null);
      return (
            <Page url={`/coach/restart-budget/${token}`} ref={ref => this.child = ref}>
                <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'flex-start'}} >
                    <Button onPress={() => navigate('Coach', {token: token})} title="Go to coach"
                            color="#841584"/>
                    <Button onPress={() => navigate('Gauge', {token: token})} title="Go to gauge"
                            color="#841584"/>
                    <Button onPress={() => navigate('Calendar', {token: token})} title="Go to calendar"
                            color="#841584"/>
                </View>

            </Page>
        );
    }
  }  

const App = createSwitchNavigator({
    Login: { screen : LoginScreen },
    Gauge: { screen: GaugeScreen },
    Calendar: { screen: CalendarScreen },
    CoachRestartBudget: { screen: CoachRestartBudgetScreen },
    Coach: { screen: CoachScreen },
},{
    initialRouteName: 'Login'
});

export default App;