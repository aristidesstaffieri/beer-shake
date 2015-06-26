/**
 * Beer Shake App
 */
'use strict';

var React = require('react-native');
var Main = require('./App/Components/Main');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
});

var beerShake = React.createClass({
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute = {{
        title: 'Beer Shake',
        component: Main
      }} />
    );
  }
});

AppRegistry.registerComponent('beerShake', () => beerShake);
