import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Modal,
  Animated,
  TouchableOpacity,
  SafeAreaView,
  StatusBar
} from "react-native";
import * as React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState, useEffect, useRef } from "react";
import { Card } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Increment } from "../redux/actions/index";
import { connect } from "react-redux";

const mapStateToProps = (state) => { return { count: state.addReducer.count } }
const mapDispatchToProps = { Increment }

// Specific food page
export function DishPage({ route, count, Increment }) {
  const [specificFood, setSpecificFood] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantAddress, setRestaurantAddress] = useState("");
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(false);
  // Use a state variable to track whether the modal is open or closed
  const [showModal, setShowModal] = useState(false);
  const [isInputFocused, setInputFocused] = React.useState({
    input1: false,
    input2: false,
    input3: false,
    input4: false,
    input5: false,
  });

  const handleAddReviewPress = () => {
    setShowModal(true);
  };
  const animatedModalOpacity = useRef(new Animated.Value(0)).current;
  const animatedModalScale = useRef(new Animated.Value(0)).current;
  const [submitAnimation] = useState(new Animated.Value(0));

  const handleShowModal = () => {
    setShowModal(true);
    Animated.parallel([
      Animated.timing(animatedModalOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(animatedModalScale, {
        toValue: 1,
        bounciness: 10,
        useNativeDriver: true,
      }),
    ]).start();
  };
  const submitAnimationSequence = Animated.sequence([
    Animated.timing(submitAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }),
    Animated.timing(submitAnimation, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }),
  ]);

  const handleCloseModal = () => {
    Animated.parallel([
      Animated.timing(animatedModalOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(animatedModalScale, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => setShowModal(false));
  };
  const addReview = (review) => {
    const updatedFood = { ...specificFood };
    updatedFood.reviews.push(review);
    setSpecificFood(updatedFood);

    // Update the food item in the database
    const url = "http://localhost:8000/food/" + updatedFood._id;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFood),
    })
      .then((response) => response.json())
      .then((json) => console.log(json))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    const url = "http://localhost:8000/";
    fetch(url)
      .then((x) => x.json())
      .then((json) => {
        setSpecificFood(
          json.find((f) => f._id === route.params.paramkey)
        ),
          console.log(specificFood);
      });
  }, []);

  if (!specificFood) {
    return <Text style={styles.noFoodText}>No food item found</Text>;
  }

   // Increase the count for the food by 1
   specificFood.count += 1



  const averageRating =
    specificFood.reviews.reduce((sum, review) => sum + review.rating, 0) /
    specificFood.reviews.length;

  const numFullStars = Math.floor(averageRating);
  const decimal = averageRating - numFullStars;

  let starRating = "⭐️".repeat(numFullStars);

  if (decimal === 0.5) {
    starRating += "⭐️½";
  } else if (decimal > 0 && decimal < 0.5) {
    starRating += "⭐️";
  }

  starRating += "☆️".repeat(5 - numFullStars - (decimal >= 0.5 ? 1 : 0));
  starRating += `\n(${averageRating.toFixed(1)} out of 5)`;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.foodNameText}>{specificFood.food_name}</Text>
        </View>

        {specificFood.reviews.map((review, index) => (
          <Card elevation={2} style={{ borderRadius: 18, marginBottom: 16 }}>
            <View key={index} style={styles.reviewContainer}>
              <Text style={styles.restaurantNameText}>
                {review.restaurant_name}
              </Text>
              <Text style={styles.addressText}>
                Address: {review.restaurant_address}
              </Text>
              <Text style={styles.ratingText}>{starRating}</Text>
              <Text style={styles.descriptionText}>{review.description}</Text>
            </View>
          </Card>
        ))}


        <Modal visible={showModal} transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.blurBackground} blurRadius={5} />
            <Animated.View
              style={[
                styles.modalInputContainer,
                {
                  height: "80%",
                  width: "80%",
                  opacity: animatedModalOpacity,
                  transform: [{ scale: animatedModalScale }],
                },
              ]}
            >
              <Text style={{ color: "#ff7c60", fontSize: 25, fontWeight: "bold" }}>Add Review</Text>
              <TextInput
                style={[styles.textBox, isInputFocused.input4 ? styles.inputFocused : styles.input]}
                placeholder="Restaurant Name"
                onChangeText={(text) => setRestaurantName(text)}
                onFocus={() => setInputFocused((prev) => ({ ...prev, input4: true }))}
                onBlur={() => setInputFocused((prev) => ({ ...prev, input4: false }))}
                selectionColor={'#FF7C60'}
                placeholderTextColor="silver"
              />
              <TextInput
                style={[styles.textBox, isInputFocused.input1 ? styles.inputFocused : styles.input]}
                placeholder="Restaurant Address"
                onChangeText={(text) => setRestaurantAddress(text)}
                onFocus={() => setInputFocused((prev) => ({ ...prev, input1: true }))}
                onBlur={() => setInputFocused((prev) => ({ ...prev, input1: false }))}
                selectionColor={'#FF7C60'}
                placeholderTextColor="silver"
              />
              <TextInput
                style={[styles.textBox, isInputFocused.input2 ? styles.inputFocused : styles.input]}
                placeholder="Rating (1-5)"
                keyboardType="numeric"
                onChangeText={(text) => setRating(parseInt(text))}
                onFocus={() => setInputFocused((prev) => ({ ...prev, input2: true }))}
                onBlur={() => setInputFocused((prev) => ({ ...prev, input2: false }))}
                selectionColor={'#FF7C60'}
                placeholderTextColor="silver"
              />
              <TextInput
                style={[styles.textBox, isInputFocused.input5 ? styles.inputMultiFocused : styles.inputMulti]}
                placeholder="Description"
                onChangeText={(text) => setDescription(text)}
                onFocus={() => setInputFocused((prev) => ({ ...prev, input5: true }))}
                onBlur={() => setInputFocused((prev) => ({ ...prev, input5: false }))}
                selectionColor={'#FF7C60'}
                multiline={true}
                placeholderTextColor="silver"
              />
              <View style={styles.submitButtonContainer}>
                <View>
                  <Button
                    title="Submit"
                    onPress={() => {
                      const newReview = {
                        restaurant_name: restaurantName,
                        restaurant_address: restaurantAddress,
                        rating: rating,
                        description: description,
                      };
                      addReview(newReview);
                      handleCloseModal();
                      submitAnimationSequence.start();
                    }}
                    color="#ff7c60"
                  />
                </View>
                <View style={{ right: 8 }}>
                  <Button
                    title="Close"
                    onPress={handleCloseModal}
                    buttonStyle={styles.closeButton}

                  />
                </View>
              </View>
            </Animated.View>

          </View>
        </Modal>
        <View style={{ alignItems: "center" }}>
          <Animated.View
            style={{
              opacity: submitAnimation,
              transform: [
                {
                  translateY: submitAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [100, 0],
                  }),
                },
              ],
            }}
          >
            <View style={styles.successContainer}>
              <Icon name="check-circle" size={34} color="white" />
              <Text style={styles.successText}>Review Submitted!</Text>
            </View>
          </Animated.View>
        </View>
      </ScrollView>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleShowModal}
        style={styles.touchableOpacityStyle}>
        <MaterialCommunityIcons
          name="plus"
          size={30}
          color="#fff"
        />
      </TouchableOpacity>

    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  foodNameText: {
    fontSize: 24,
    paddingLeft: 6,
    paddingTop: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  reviewContainer: {
    padding: 14,
    marginBottom: 20,
  },
  restaurantNameText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 5,
  },
  addressText: {
    marginBottom: 3,
  },
  ratingText: {
    marginTop: 10,
    marginBottom: 4,
  },
  descriptionText: {
    fontSize: 17,
    marginTop: 10,
  },
  noFoodText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 50,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  textBox: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    borderWidth: 2,
    borderColor: "lightgreen",
    borderRadius: 5,
    textAlign: "center",
    marginTop: 5,
    marginBottom: 10,
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  buttonContainer: {
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 10,
    marginRight: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  itemNameContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 17,
    fontWeight: "bold",
    marginLeft: 16,
  },
  itemRankingContainer: {
    width: 60,
    alignItems: "center",
  },
  itemRanking: {
    fontSize: 17,
    fontWeight: "bold",
  },
  containerResult: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  searchTextResult: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  noResultText: {
    fontSize: 18,
    color: "red",
    marginBottom: 10,
  },
  resultText: {
    fontSize: 18,
    marginBottom: 10,
  },
  itemsResult: {
    flex: 1,
    flexDirection: "column",
    marginBottom: 10,
  },
  foodNameContainer: {
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 5,
  },
  foodNameTextResult: {
    fontSize: 16,
    fontWeight: "bold",
  },
  foodNameContainerHover: {
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 5,
  },
  foodNameTextResultHover: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },

  reviewsContainerResult: {
    marginTop: 5,
  },
  searchAgainText: {
    marginTop: 10,
    color: "#999",
  },
  detailsText: {
    marginTop: 10,
    fontWeight: "bold",
  },
  reviewButtonContainer: {
    alignItems: "left",
    marginBottom: 10,
    justifyContent: "left",
    width: 100,
  },
  reviewButton: {
    backgroundColor: "#008080",
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  modalContainer: {
    blurBackground: 0.5,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  ModalinputContainer: {
    blurBackground: 0.5,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  submitButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  submitButton: {
    flex: 1,
    marginRight: 10,
    backgroundColor: "green",
    borderRadius: 5,
    paddingVertical: 10,
  },
  closeButton: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: "red",
    borderRadius: 5,
    paddingVertical: 10,
  },
  // New style for the blurred background
  blurBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    backgroundColor: "white",
  },
  successContainer: {
    backgroundColor: "#00cc00",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    width: 400,
    height: 100
  },
  successText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 8,
  },
  label: {
    marginTop: 5,
    marginLeft: 12,
  },
  input: {
    borderColor: 'silver',
    borderRadius: 15,
    height: 40,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 6,
    marginBottom: 8,
    borderWidth: 1,
    padding: 10,
  },
  inputMulti: {
    borderColor: 'silver',
    textAlignVertical: 'top',
    borderRadius: 15,
    height: 90,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 6,
    marginBottom: 8,
    borderWidth: 1,
    padding: 10,
  },
  inputMultiFocused: {
    borderColor: '#FF7C60',
    borderRadius: 15,
    height: 90,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 6,
    marginBottom: 8,
    borderWidth: 1,
    padding: 10,
  },
  inputFocused: {
    borderRadius: 15,
    height: 40,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 6,
    marginBottom: 8,
    borderWidth: 1,
    padding: 10,
    borderColor: '#FF7C60',
  },
  touchableOpacityStyle: {
    backgroundColor: '#FF7C60',
    width: 56,
    height: 56,
    borderRadius: 33,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
    shadowColor: 'rgba(0,0,0, .1)', // IOS
    shadowOffset: { height:0, width: 0 }, // IOS
    shadowOpacity: 3, // IOiS
    shadowRadius: 1, //IOS
    elevation: 2,
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DishPage);