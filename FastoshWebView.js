import React, { Component } from 'react'
import { View, WebView, Dimensions, TouchableHighlight, Text } from 'react-native'
import WKWebView from 'react-native-wkwebview-reborn';

class FastoshWebView extends Component {
  constructor(props) {
    super(props);

    this.webView = null;
  }

  sendPostMessage = (data) => {
    console.log('Sending post message', JSON.stringify(data));
    this.webView.postMessage(JSON.stringify(data));
  }
  
  render() {
    return (
      <View style={{ flex: 1 }}>
        <WKWebView
          style={{ flex: 1, width: Dimensions.get('window').width }}
          source={{ uri: this.props.uri }}
          ref={(webView) => this.webView = webView}
          onMessage={this.props.onMessage}
        />
      </View>
    )
  }
}

export default FastoshWebView
