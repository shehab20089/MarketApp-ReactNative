import React, {Component} from 'react';
import {View, ImageBackground, Text, StyleSheet} from 'react-native';

export default class CategorieItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={style.itemContainer}>
        <ImageBackground
          source={{uri: this.props.image}}
          style={style.ImageBackground}>
          <Text style={style.TextStyle}>{this.props.text}</Text>
        </ImageBackground>
      </View>
    );
  }
}

const style = StyleSheet.create({
  ImageBackground: {
    width: '100%',
    height: 120,
    justifyContent: 'flex-end',
  },
  itemContainer: {padding: 2},
  TextStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
