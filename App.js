import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import FastoshWebView from "./FastoshWebView";

export default class App extends React.Component {
    onMessage = (event) => {
        console.log('On Message', JSON.parse(event.nativeEvent.data));
    }
    render() {
        return (
            <View style={styles.container}>
                <Button onPress={() => this.child.sendPostMessage({hello: 'react native'})} title="send to webview"
                        color="#841584"/>

                <FastoshWebView
                    ref={ref => this.child = ref}
                    onMessage={this.onMessage}
                    uri={'https://cdn.rawgit.com/bigali/staticfilesserve/8560c116/communication.html'}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
