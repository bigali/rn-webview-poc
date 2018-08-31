import React from 'react';
import {StyleSheet, ScrollView, Keyboard, KeyboardAvoidingView} from 'react-native';
import FastoshWebView from "./FastoshWebView";

class Page extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            stack: [],
            initialRoute: `https://max-webview.fastoche.fr${this.props.url}`
        }
        this.onMessage = this.onMessage.bind(this)
        this._keyboardDidHide = this._keyboardDidHide.bind(this)
        this._keyboardDidShow = this._keyboardDidShow.bind(this)
    }

    componentDidMount () {
        console.log('mounted', this.state.initialRoute)
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
      }
    
      componentWillUnmount () {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
      }

      _keyboardDidShow (e) {
        this.child.sendPostMessage({type: 'keyboard', action: 'KEYBOARD_DID_SHOW', payload: {keyboardHeight: e.endCoordinates.height}})
      }
    
      _keyboardDidHide () {
        this.child.sendPostMessage({type: 'keyboard', action: 'KEYBOARD_DID_HIDE'})
      }
    

    onMessage = (event) => {
        console.log(event)
        var parsedEvent = null;
        try {
            parsedEvent = JSON.parse(event.nativeEvent.data)
            console.log('On Message', parsedEvent);
            console.log(this.state.stack)
            this.setState({stack: [...this.state.stack, JSON.parse(event.nativeEvent.data)]})
        } catch(e) {
            console.log(e.message)
        }
    }

    sendPostMessage = (data) => {
        this.child.sendPostMessage(data);
    }

    render() {
      return (
            <ScrollView contentContainerStyle={styles.container}>
                {this.props.children}
                
                <FastoshWebView
                    ref={ref => this.child = ref}
                    onMessage={this.onMessage}
                    uri={this.state.initialRoute}
                />
            </ScrollView>
        );
    }
  }

  const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

  export default Page;