import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  TextInput,
  Modal,
} from "react-native";
import { Feather } from "@expo/vector-icons";

export function ProfilePage({ navigation }) {
  const [username, setUsername] = useState("username");
  const [email, setEmail] = useState("email");
  const [bio, setBio] = useState("bio");
  const [editable, setEditable] = useState(false);
  const [modalOn, setModalOn] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const editForm = () => {
    setEditable(true);
    setModalOn(true);
  };

   const circleLeft = animation.interpolate({
     inputRange: [0, 1],
     outputRange: [0, 50],
   });

   useEffect(() => {
     Animated.timing(animation, {
       toValue: 1,
       duration: 1000,
       useNativeDriver: true,
     }).start(
       Animated.timing(animation, {
         toValue: 0,
         duration: 1000,
         useNativeDriver: true,
       }).start
     );
   }, []);

  return (
    <View>
      <View style={styles.navBar}>
        <Text style={styles.title}>Profile Page</Text>
      </View>
      <Animated.View
        style={[styles.circle, { transform: [{ translateX: circleLeft }] }]}
      ></Animated.View>
      <TouchableOpacity>
        <Text
          style={{
            color: "#ff7c60",
            alignSelf: "center",
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          + Upload your photo
        </Text>
      </TouchableOpacity>
      <View style={{ backgroundColor: "#ff7c60", borderRadius: 14 }}>
        <TouchableOpacity style={{ position: "relative" }}>
          <Feather
            style={{ position: "absolute", top: 20, right: 20 }}
            name="edit"
            size={24}
            color="white"
            onPress={editForm}
          />
        </TouchableOpacity>
        <Text style={styles.info}>{username}</Text>
        <Text style={styles.info}>{email}</Text>
        <Text style={styles.info}>{bio}</Text>
      </View>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Login");
        }}
      >
        <View style={styles.logOut}>Log out</View>
      </TouchableOpacity>
      <Modal visible={modalOn} animationType="fade" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={[styles.input, { marginTop: 40 }]}
              editable={editable}
              placeholderTextColor="#cccccc"
              placeholder="enter username"
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              style={styles.input}
              editable={editable}
              placeholderTextColor="#cccccc"
              placeholder="enter email"
              value={email}
              onChangeText={setEmail}
            />

            <TextInput
              style={styles.input}
              editable={editable}
              placeholderTextColor="#cccccc"
              placeholder="write your bio"
              value={bio}
              onChangeText={setBio}
            />

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setModalOn(false);
              }}
            >
              <Text style={styles.modalButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    backgroundColor: "white",
    borderColor: "#ff7c60",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  navBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ff7c60",
    height: 60,
    paddingHorizontal: 10,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "80%",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ff7c60",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#ff7c60",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    paddingTop:20
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,

  },
  input: {
    alignSelf: "center",
    textAlign: "center",
    borderBottomColor: "white",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    fontSize: 20,
    marginTop: 10,
  },
  logOut: {
    borderRadius: 12,
    borderColor: "#ff7c60",
    backgroundColor: "white",
    color: "#ff7c60",
    borderWidth: 3,
    padding: 5,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
    width: 100,
    alignSelf: "center",
    marginTop: 60,
  },
  info: {
    padding: 10,
    alignSelf: "center",
    textAlign: "center",
    fontSize: 20,
    marginTop: 5,
    color: "white",
  },
});
