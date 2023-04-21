import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar
} from 'react-native';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Constants from 'expo-constants';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export function Result({ navigation, route }) {
  const [food, setFood] = useState([""]);
  //value sent form the home page
  let findvalue = route.params.paramkey;
  console.log(findvalue)
  useEffect(() => {
    const url = "http://localhost:8000/"
    fetch(url)
      .then(x => x.json())
      .then(json => {
        setFood(json.filter((data) =>
          data.food_name.toLowerCase().includes(findvalue.toLowerCase()))
        )
      })
  }, []);

  return (
    <View style={styles.containerResult}>
      <Text style={styles.searchTextResult}>
        Searched for {route.params.paramkey}
      </Text>
      {food.length == 0 ? (
        <Text style={styles.noResultText}>No food found</Text>
      ) : (
        <Text style={styles.resultText}>Here are the search results</Text>
      )}
      <FlatList
        data={food}
        renderItem={({ item }) => (
          <View style={styles.itemsResult}>
            <TouchableOpacity
              style={styles.itemsbox}
              onPress={() => {
                navigation.navigate('Food', { paramkey: item._id });
              }}>
              <MaterialCommunityIcons
                name="rice"
                size={24}
                color="#FF7C60"
                style={{ marginRight: 18, marginLeft: 12 }}
              />

              <Text style={styles.foodNameTextResult}>{item.food_name}</Text>
              <Feather
                name="arrow-right"
                color={'#FF7C60'}
                size={26}
                style={{ position: 'absolute', right: 10 }}
              />
            </TouchableOpacity>

            <View style={styles.reviewsContainerResult}>
              {/* Add code to display reviews here */}
            </View>
          </View>
        )}
      />
      {food.length == 0 ? (
        <Text style={styles.searchAgainText}>
          Please search for another food
        </Text>
      ) : (
        <Text style={styles.detailsText}>
          Click on a food item to see details
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  containerResult: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  searchTextResult: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noResultText: {
    fontSize: 18,
    color: 'red',
    marginBottom: 10,
  },
  resultText: {
    fontSize: 18,
    marginBottom: 10,
  },
  itemsResult: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 10,
  },
  foodNameContainer: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 5,
  },
  foodNameTextResult: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 15,
  },
  reviewsContainerResult: {
    marginTop: 5,
  },
  searchAgainText: {
    marginTop: 10,
    color: '#999',
  },
  detailsText: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  itemsbox: {
    shadowColor: 'rgba(0,0,0, .1)', // IOS
    shadowOffset: { height:0, width: 0 }, // IOS
    shadowOpacity: 3, // IOiS
    shadowRadius: 1, //IOS
    backgroundColor: '#FFF9F8',
    elevation: 2,
    paddingLeft: 8,
    padding: 20,
    borderRadius: 15,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
 
});
