import React, {Component, Fragment} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Platform,
  ScrollView,
  Text,
} from 'react-native';
import {Header, Icon} from 'react-native-elements';
import {SliderBox} from 'react-native-image-slider-box';
import {Col, Row, Grid} from 'react-native-easy-grid';
import Categorie from './models/Categorie';
import CategorieItem from './CategorieItem';
import Product from './models/Product';

const data = ['a', 'b', 'c', 'd', 'e'];
export default class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        'https://www.myfavouritemagazines.co.uk/out/pictures/landingpageimages/offers-page2.jpg',
        'https://poseidonhotel.com.gr/uploads/nr_photos/offers_3433.jpg',
        'https://images.freekaamaal.com/post_images/1547618037.png',
      ],
      CategorieItems: [],
    };
  }

  async componentDidMount() {
    await fetch('https://5bcce576cf2e850013874767.mockapi.io/task/categories')
      .then(result => {
        return result.json();
      })
      .then(data => {
        // const newData = data.map(item => {
        //   return new Categorie(
        //     item.id,
        //     item.name,
        //     item.category_img,
        //     item.products.map(proditem => {
        //       return new Product(
        //         proditem.id,
        //         proditem.name,
        //         proditem.weight,
        //         proditem.price,
        //         proditem.product_img,
        //       );
        //     }),
        //   );
        // });
        // console.log(newData);
        this.setState({CategorieItems: data});

        // console.log(data);
      });
    console.log(this.state.CategorieItems);
  }

  render() {
    return (
      <Fragment>
        <Header
          leftComponent={{icon: 'menu', color: 'black'}}
          containerStyle={styles.headerContainer}
          centerComponent={{text: 'MY TITLE', style: {color: 'black'}}}
          rightComponent={() => {
            return (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon name="search" color="black" />
                <Icon name="shopping-cart" color="black" />
              </View>
            );
          }}
        />
        <ScrollView style={styles.Container}>
          <View>
            <SliderBox images={this.state.images} />
          </View>
          <Grid>
            {this.state.CategorieItems.map((item, index, arr) => {
              if (index % 2 == 0) {
                return (
                  <Row>
                    <Col>
                      <CategorieItem
                        text={item.name}
                        image={
                          (item.name == 'Vegetables' &&
                            'https://img1.mashed.com/img/uploads/2017/07/vegetables.jpg') || //there is an error with vegitables image
                          item.category_img
                        }
                      />
                    </Col>
                    <Col>
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
const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  SliderBox: {flex: 20},
  headerContainer: {
    backgroundColor: 'white',
    //to fix the react native elemntes lib header bug in android
    height: Platform.select({
      android: 56,
      default: 44,
    }),
  },
});
