import React, {Component} from 'react';
import {View, Text} from 'react-native';

export default class Singleproduct extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text> {this.props.navigation.state.params.name}</Text>
      </View>
    );
  }
}
