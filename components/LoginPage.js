import { NavigationContainer } from "@react-navigation/native";
import * as Progress from "react-native-progress";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState, useEffect } from "react";
import Constants from "expo-constants";
import * as FileSystem from "expo-file-system";
import { Feather } from "@expo/vector-icons";

export function LoginPage({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [showRLProgress, setShowRLProgress] = useState(false);
  const [showGuestProgress, setShowGuestProgress] = useState(false);
  const [error, setError] = useState('');
  const [modalOn, setModalOn] = useState(false);


  const continueAsGuest = () => {
    setShowGuestProgress(true);
    setTimeout(() => {
      navigation.navigate("Home", { username: "Guest" });
    }, 1500);
    setTimeout(() => {
      setShowGuestProgress(false);
    }, 2000);
    setEmail("")
    setPassword("")
    setCPassword("")
    setError("")
  };

  const goToHomePage = () => {
    if ((isRegistering == true) && (!email || !password || !cPassword)) {
      setError("Please fill in all fields.");
      setEmail("");
      setPassword("");
      setCPassword("");
      return;
    }

    if (isRegistering == false && (!email || !password)) {
      setError("Please fill in all fields.");
      setEmail("");
      setPassword("");
      setCPassword("");
      return;
    }

    if ((isRegistering == true) && (password !== cPassword)) {
      setError("Passwords do not match.");
      setEmail("");
      setPassword("");
      setCPassword("");
      return;
    }

    setShowRLProgress(true);
    setTimeout(() => {
       setModalOn(true);
    }, 1500);
    setTimeout(() => {
      setShowRLProgress(false);
    }, 2000);
    setEmail("");
    setPassword("");
    setCPassword("");
    setError("");
  };

  const NavBar = () => {
    return (
      <View style={styles.navBar}>
        <Text style={styles.title}>TF</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <NavBar />
      <View style={styles.pageTitleContainer}>
        <Text style={styles.pageTitle}>Welcome to Taste Finder</Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.subtitle}>
          {isRegistering ? "Register" : "Login"}
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="email/ username"
            onChangeText={setEmail}
            placeholderTextColor="#bab7b6"
            value={email}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="password"
            placeholderTextColor="#bab7b6"
            secureTextEntry
            onChangeText={setPassword}
            value={password}
          />
        </View>

        {isRegistering && (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="confirm password"
              placeholderTextColor="#bab7b6"
              secureTextEntry
              onChangeText={setCPassword}
              value={cPassword}
            />
          </View>
        )}

        {error ? <Text style={{ color: "red" }}>*{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={goToHomePage}>
          {showRLProgress && (
            <Progress.CircleSnail
              style={styles.progress}
              color={["#ffffff"]}
              progress={0}
            />
          )}
          <Text style={styles.buttonText}>
            {isRegistering ? "Register" : "Login"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.guestButton]}
          onPress={continueAsGuest}
        >
          {showGuestProgress && (
            <Progress.CircleSnail
              style={styles.progress}
              color={["#ff7c60"]}
              progress={0}
            />
          )}
          <Text style={[styles.buttonText, { color: "#ff7c60" }]}>
            Continue as a guest
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
          <Text style={styles.toggleText}>
            {isRegistering
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </Text>
        </TouchableOpacity>
      </View>
      <Modal visible={modalOn} animationType="fade" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Registration Successful!</Text>
            <Text style={styles.modalText}>Thank you for registering.</Text>
            <TouchableOpacity style={styles.modalButton} onPress={()=>{ navigation.navigate("Home", { username: email });
          setModalOn(false)}}>
              <Text style={styles.modalButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
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
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 30,
  },

  subtitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    color: "#ff7c60",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#ff7c60",
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  toggleText: {
    color: "#ff7c60",
    marginTop: 20,
    fontSize: 16,
    textAlign: "center",
  },
  progress: {
    alignSelf: "center",
    fill: "transparent",
  },
  guestButton: {
    backgroundColor: "transparent",
    borderColor: "#ff7c60",
    borderWidth: 2,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  pageTitleContainer: {
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: -10,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3B3A3A",
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
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
