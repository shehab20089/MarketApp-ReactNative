import React, {Component, Fragment} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Platform,
  ScrollView,
  Text,
  Button,
} from 'react-native';
import {Header, Icon} from 'react-native-elements';
import {SliderBox} from 'react-native-image-slider-box';
import {Col, Row, Grid} from 'react-native-easy-grid';
import CategorieItem from './CategorieItem';
import Products from './products';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import ProductItem from './productItem';
import Singleproduct from './singleproduct';
const styles = StyleSheet.create({
  headerRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 1,
  },
  Container: {
    flex: 1,
  },
  SliderBox: {flex: 20},
  headerContainer: {
    backgroundColor: 'white',
    //to fix the react native elemntes lib header bug in android
    marginTop: Platform.OS === 'ios' ? 0 : -30,
  },
});

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        'https://images.freekaamaal.com/post_images/1547618037.png',
        'https://www.myfavouritemagazines.co.uk/out/pictures/landingpageimages/offers-page2.jpg',
        'https://poseidonhotel.com.gr/uploads/nr_photos/offers_3433.jpg',
      ],
      CategorieItems: [],
    };
  }
  navigatetoproduct = item => {
    if (item.name == 'Vegetables')
      item.category_img =
        'https://img1.mashed.com/img/uploads/2017/07/vegetables.jpg';

    this.props.navigation.navigate('Product', {
      categoie: item,
    });
  };
  async componentDidMount() {
    await fetch('https://5bcce576cf2e850013874767.mockapi.io/task/categories')
      .then(result => {
        return result.json();
      })
      .then(data => {
        this.setState({CategorieItems: data});

        // console.log(data);
      });
    console.log(this.state.CategorieItems);
  }
  static navigationOptions = {
    headerTitle: (
      <Icon name="menu" color="black" containerStyle={{margin: 10}} />
    ),
    headerRight: (
      <View style={styles.headerRight}>
        <Icon name="search" color="black" containerStyle={{margin: 6}} />
        <Icon
          name="shopping-cart"
          color="black"
          containerStyle={{margin: 10}}
        />
      </View>
    ),
  };

  render() {
    return (
      <Fragment>
        <ScrollView style={styles.Container}>
          <View>
            <SliderBox images={this.state.images} />
          </View>
          <Grid>
            {this.state.CategorieItems.map((item, index, arr) => {
              if (index % 2 == 0) {
                return (
                  <Row>
                    <Col
                      onPress={() => {
                        this.navigatetoproduct(item);
                      }}>
                      <CategorieItem
                        text={item.name}
                        image={
                          (item.name == 'Vegetables' &&
                            'https://img1.mashed.com/img/uploads/2017/07/vegetables.jpg') || //there is an error with vegitables image
                          item.category_img
                        }
                      />
                    </Col>
                    <Col
                      onPress={() => {
                        this.navigatetoproduct(arr[index + 1]);
                      }}>
                      <CategorieItem
                        text={arr[index + 1].name}
                        image={arr[index + 1].category_img}
                      />
                    </Col>
                  </Row>
                );
              } else
                return (
                  <Row>
                    <Col>
                      <CategorieItem
                        text={''}
                        image={
                          'http://www.simplefitliving.com/wp-content/uploads/2018/04/14dayscucumberdiet.jpg'
                        }
                      />
                    </Col>
                  </Row>
                );
            })}
          </Grid>
        </ScrollView>
      </Fragment>
    );
  }
}
const AppNavigator = createStackNavigator({
  //add all the screens i want to navigate in a stack based nav
  Home: {
    screen: Categories,
  },
  Product: {
    screen: Products,
  },
  SingleProduct: {
    screen: Singleproduct,
  },
});

const AppContainer = createAppContainer(AppNavigator);
export default AppContainer;
