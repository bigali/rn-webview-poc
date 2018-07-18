import React, { Component } from 'react'
import { View, WebView, Dimensions, TouchableHighlight, Text } from 'react-native'

class FastoshWebView extends Component {
  constructor(props) {
    super(props);

    this.webView = null;
  }

  onMessage = (event) => {
    console.log('On Message', JSON.parse(event.nativeEvent.data));
  }

  sendPostMessage = (data) => {
    console.log('Sending post message');
    this.webView.postMessage(JSON.stringify(data));
  }


  render() {
    return (
      <View style={{ flex: 1 }}>
        <WebView
          style={{ flex: 1, width: Dimensions.get('window').width - 40, height: 300 }}
          source={{ uri: this.props.uri }}
          ref={(webView) => this.webView = webView}
          onMessage={this.props.onMessage}
        />
      </View>
    )
  }
}

export default FastoshWebView
