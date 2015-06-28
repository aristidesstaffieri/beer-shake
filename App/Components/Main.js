var React = require('react-native');
var api = require('../Utils/api');

var {
	View,
	Text,
	StyleSheet,
	TouchableHighlight,
	ActivityIndicatorIOS
} = React;

var styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		marginTop: 65,
		flexDirection: 'column',
		justifyContent: 'center',
		backgroundColor: '#1DE9B6'
	},
	title: {
		fontSize: 12,
		textAlign: 'center',
		color: 'white',
		padding: 10
	},
	buttonText: {
		fontSize: 18,
		color: '#111',
		alignSelf: 'center'
	},
	button: {
		height: 75,
		flexDirection: 'row',
		backgroundColor: 'white',
		borderColor: 'white',
		borderWidth: 1,
		alignSelf: 'stretch',
		justifyContent: 'center'
	},
	beersContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	beers: {
		fontSize: 12,
		color: 'white',
		alignSelf: 'center'
	},
	beer1: {
		height: 30,
		paddingLeft: 10
	},
	beer2: {
		height: 30,
		paddingRight: 10
	},
	answer: {
		fontSize: 12,
		marginBottom: 20,
		color: 'white',
		alignSelf: 'center'
	}
});

var Main = React.createClass({
	getInitialState() {
		return {
			description: '',
			beer1: '',
			beer2: '',
			loading: false,
			answer: ''
		}
	},
	getABeer() {
		this.setState({
			loading: true
		});
		api.getBeer()
			.then((res) => {
				console.log('correct beer', res);
				var correctBeer = res;
				api.getBeer()
					.then((res) => {
						console.log('wrong beer', res);
						var wrongBeer = res;
						var randomNumber = Math.floor((Math.random() * 1000000000000) + 1);
						if (randomNumber % 2 === 0) {
							this.setState({
								description: correctBeer.data.style.description,
								beer1: correctBeer.data,
								beer2: wrongBeer.data,
								loading: false,
								answer: ''
							});
						} else {
							this.setState({
								description: correctBeer.data.style.description,
								beer1: wrongBeer.data,
								beer2: correctBeer.data,
								loading: false,
								answer: ''
							});
						}
					});
			});
	},
	checkAnswer(beer) {
		console.log(beer);
		if (!beer.style) this.setState({
			answer: 'Wrong Beer!'
		});

		if (beer.style.description === this.state.description) {
			this.setState({
				answer: 'Correct!'
			});
		} else {
			this.setState({
				answer: 'Wrong Beer'
			});
		}
	},
	render() {
		return (
			<View style={styles.mainContainer}>
				<Text style={styles.title}>{this.state.description || "How snobby are you?"}</Text>
				<ActivityIndicatorIOS
				animating={this.state.loading}
				color="#000"
				size="large">
				</ActivityIndicatorIOS>
				<Text style={styles.answer}>{this.state.answer}</Text>
				<View style={styles.beersContainer}>
					<TouchableHighlight
					style={styles.beer1}
					onPress={this.checkAnswer.bind(this, this.state.beer1)}
					underlayColor='#1DE9B6'>
					<Text style={styles.beers}> {this.state.beer1.name} </Text>
					</TouchableHighlight>
					<TouchableHighlight
					style={styles.beer2}
					onPress={this.checkAnswer.bind(this, this.state.beer2)}
					underlayColor='#1DE9B6'>
					<Text style={styles.beers}> {this.state.beer2.name} </Text>
					</TouchableHighlight>
				</View>
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