import React, {Component} from 'react';
import {View, Image, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {Icon, ButtonGroup} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {Col, Row, Grid} from 'react-native-easy-grid';
import ProductItem from './productItem';
const styles = StyleSheet.create({
  headerRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 1,
  },
  buttonGroupContainer: {
    flex: 1,
    borderWidth: 0,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    marginLeft: 0,
    marginBottom: 0,
    marginTop: 0,
  },
  selectedButton: {
    backgroundColor: 'white',
    borderBottomColor: '#ff6666',
    borderBottomWidth: 1,
  },
  buttonGroupBorder: {borderWidth: 0, borderStyle: null},
  imageContainer: {flex: 3, alignItems: 'center', justifyContent: 'center'},
  footerContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ff6666',
  },
  footerItem: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default class Products extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTransparent: true,
      headerTintColor: 'white',
      headerTitle: (
        <Text style={{color: 'white', fontWeight: 'bold'}}>
          {navigation.getParam('categoie').name}
        </Text>
      ),
      headerRight: (
        <View style={styles.headerRight}>
          <Icon
            name="search"
            color="white"
            containerStyle={{margin: 6}}
            iconStyle={{fontWeight: 'bold'}}
          />
          <Icon
            name="shopping-cart"
            color="white"
            iconStyle={{fontWeight: 'bold'}}
            containerStyle={{margin: 10}}
          />
        </View>
      ),
    };
  };
  constructor(props) {
    super(props);
    this.params = props.navigation.state.params.categoie;
    console.log(this.params.category_img);
    this.state = {
      selectedIndex: 2,
    };
  }

  updateIndex = selectedIndex => {
    this.setState({selectedIndex});
  };
  naviagtetoProduct = item => {
    this.props.navigation.navigate('SingleProduct', {
      name: item.name,
    });
  };

  render() {
    const buttons = [this.params.name, 'To be implemented'];
    const {selectedIndex} = this.state;

    return (
      <View style={{flex: 1}}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: this.params.category_img,
            }}
            style={{height: '100%', width: '100%'}}
            PlaceholderContent={<ActivityIndicator />}
          />
        </View>
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          selectedIndexes={[0]}
          containerStyle={styles.buttonGroupContainer}
          selectedButtonStyle={styles.selectedButton}
          disabled={[1]}
          selectedTextStyle={{color: 'black'}}
          innerBorderStyle={{width: 0}}
          buttonStyle={styles.buttonGroupBorder}
        />
        <View style={{flex: 7}}>
          <ScrollView>
            <Grid>
              {this.params.products.map((item, index, arr) => {
                if (index % 2 == 0)
                  return (
                    <Row>
                      <Col
                        onPress={() => {
                          this.naviagtetoProduct(item);
                        }}>
                        <ProductItem
                          image={item.product_img}
                          title={item.name}
                          weight={item.weight}
                          price={item.price}
                        />
                      </Col>
                      <Col
                        onPress={() => {
                          this.naviagtetoProduct(arr[index + 1]);
                        }}>
                        <ProductItem
                          image={arr[index + 1].product_img}
                          title={arr[index + 1].name}
                          weight={arr[index + 1].weight}
                          price={arr[index + 1].price}
                        />
                      </Col>
                    </Row>
                  );
              })}
            </Grid>
          </ScrollView>
        </View>

        <View style={styles.footerContainer}>
          <View style={styles.footerItem}>
            <Text style={{color: 'white'}}>Sort by</Text>
          </View>

          <View style={styles.footerItem}>
            <Text style={{color: 'white'}}>Filter</Text>
          </View>
        </View>
      </View>
    );
  }
}
