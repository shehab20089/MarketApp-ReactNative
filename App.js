import React, {Fragment, Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
} from 'react-native';

import SplashScreen from 'react-native-splash-screen';
import AppIntroSlider from 'react-native-app-intro-slider';
import AppContainer from './app/categories';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRealApp: false,
    };
  }

  componentDidMount() {
    // SplashScreen.hide();
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }
  _renderItem = item => {
    console.log(item.item.title);
    return (
      <Fragment>
        <View
          style={{
            flex: 6,
          }}>
          <Image style={styles.images} source={item.item.image} />
        </View>
        <View style={{flex: 4}}>
          <View style={{flex: 2, justifyContent: 'center'}}>
            <Text style={styles.title}>{item.item.title}</Text>
            <Text style={styles.description}>{item.item.text}</Text>
          </View>
          <View style={{flex: 1}} />
        </View>
      </Fragment>
    );
  };

  _onDone = () => {
    //when finshing navigating in the intro screens
    this.setState({showRealApp: true});
  };

  render() {
    //first i will check if the user scaned all the intro screens if so then i will show him the home screen
    if (this.state.showRealApp) return <AppContainer />;
    else {
      return (
        <AppIntroSlider
          renderItem={this._renderItem}
          slides={slides}
          dotStyle={{borderWidth: 1}}
          activeDotStyle={styles.activeDot}
          onDone={this._onDone}
          buttonTextStyle={{color: 'rgba(255,102,102, 1)'}}
        />
      );
    }
  }
}

const styles = StyleSheet.create({
  pagination: {
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 3,
  },
  activeDot: {
    backgroundColor: 'rgba(255,102,102, 1)',
    borderWidth: 1,
  },
  images: {width: null, height: null, resizeMode: 'contain', flex: 1},
  title: {fontSize: 18, textAlign: 'center', fontWeight: 'bold'},
  description: {fontSize: 14, textAlign: 'center'},
});
const slides = [
  {
    key: 'somethun',
    title: 'Title1',
    text:
      "I'm already out of descriptions Lorem ipsum bla bla bla Description Say something cool Lorem ipsum bla bla bla Lorem ipsum bla bla bla Description Say ",
    image: require('./assets/3.png'),
  },
  {
    key: 'somethun-dos',
    title: 'Title 2',
    text:
      "I'm already out of descriptions Lorem ipsum bla bla bla Description Say something cool Lorem ipsum bla bla bla Lorem ipsum bla bla bla Description Say ",
    image: require('./assets/1.png'),
  },
  {
    key: 'somethun1',
    title: 'Rocket guy',
    text:
      "I'm already out of descriptions Lorem ipsum bla bla bla Description Say something cool Lorem ipsum bla bla bla Lorem ipsum bla bla bla Description Say ",
    image: require('./assets/2.png'),
  },
];

export default App;
