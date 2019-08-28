import React, {Component} from 'react';
import {View, Image, Text, ActivityIndicator} from 'react-native';
import {Card, Icon, Button} from 'react-native-elements';
export default class ProductItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      button: {Backcolor: 'lightgrey', icon: 'add'},
      image: props.image,
    };
  }

  render() {
    return (
      <View
        style={{
          width: '100%',
          height: 200,
          borderWidth: 0.5,
          borderColor: 'lightgrey',
        }}>
        <View
          style={{
            flex: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            style={{width: '100%', height: '100%'}}
            source={{
              uri: this.state.image,
            }}
            onError={() => {
              this.setState({
                image:
                  'https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png',
              }); //incase any image failed to load
            }}
          />
        </View>
        <View style={{flex: 3, padding: 5}}>
          <Text style={{fontSize: 18}}>{this.props.title}</Text>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',

              //   alignItems: 'center',
            }}>
            <View>
              <Text style={{fontSize: 10}}>{this.props.weight}</Text>
              <Text style={{fontSize: 10}}>{this.props.price}</Text>
            </View>

            <Button
              icon={
                <Icon name={this.state.button.icon} size={10} color="white" />
              }
              buttonStyle={{
                borderRadius: 200,
                backgroundColor: this.state.button.Backcolor,
              }}
              onPress={() => {
                if (this.state.button.icon == 'add') {
                  this.setState({button: {icon: 'done', Backcolor: '#ff6666'}});
                } else {
                  this.setState({
                    button: {icon: 'add', Backcolor: 'lightgrey'},
                  });
                }
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}
