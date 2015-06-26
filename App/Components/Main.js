var React = require('react-native');
var api = require('../Utils/api');

var {
	View,
	Text,
	StyleSheet,
	TouchableHighlight
} = React;

var styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		padding: 30,
		marginTop: 65,
		flexDirection: 'column',
		justifyContent: 'center',
		backgroundColor: '#48BBEC'
	},
	title: {
		marginBottom: 20,
		fontSize: 25,
		textAlign: 'center',
		color: '#000'
	},
	buttonText: {
		fontSize: 18,
		color: '#111',
		alignSelf: 'center'
	},
	button: {
		height: 45,
		flexDirection: 'row',
		backgroundColor: 'white',
		borderColor: 'white',
		borderWidth: 1,
		borderRadius: 8,
		marginBottom: 10,
		marginTop: 10,
		alignSelf: 'stretch',
		justifyContent: 'center'
	},
});

var Main = React.createClass({
	getInitialState() {
		return {
			beer: ''
		}
	},
	getABeer() {
		api.getBeer()
			.then((res) => {
				console.log(res);
			});
	},
	render() {
		return (
			<View style={styles.mainContainer}>
				<Text style={styles.title}> Shake for a beer </Text>
				<TouchableHighlight
				style={styles.button}
				onPress={this.getABeer}
				underlayColor="white">
				<Text style={styles.buttonText}> BEER ME </Text>
				</TouchableHighlight>
			</View>
		);
	}
});

module.exports = Main;