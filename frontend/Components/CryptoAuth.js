import React, { useState, createRef, useRef, useEffect } from "react";
import {
  StyleSheet,
  // TextInput,
  View,
  Text,
  ScrollView,
  Image,
  // Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  // Linking,
  // Animated,
  Dimensions,
  // ImageBackground,
} from "react-native";
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  Provider,
  ActivityIndicator,
} from "react-native-paper";
import * as Linking from 'expo-linking';

import {
  useMoralis,
  // useMoralisWeb3Api,
  // useMoralisWeb3ApiCall,
} from "react-moralis";
import { useWalletConnect } from "../WalletConnect";
// import LottieView from "lottie-react-native";

// import AsyncStorage from "@react-native-async-storage/async-storage";
// import Animation from "../splashLottie.json";

// import Loader from './Components/Loader';

const prefix = Linking.createURL('/some-shoes-here?color=blue&some=red');
console.log(prefix, 'PREFIX HERE');


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const CryptoAuth = ({ navigation }) => {
  const connector = useWalletConnect();
  const {
    authenticate,
    authError,
    isAuthenticating,
    isAuthenticated,
    logout,
    Moralis,
  } = useMoralis();

  const [data, setData] = useState({});
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const passwordInputRef = createRef();

  const handleCryptoLogin = () => {
    authenticate({ connector })
      .then(() => {
        if (authError) {
          setErrortext(authError.message);
          setVisible(true);
        } else {
          if (isAuthenticated) {
            navigation.replace("DrawerNavigationRoutes");
          }
        }
      })
      .catch(() => {});
  };

  const handleDeepLink = (event) => {
    console.log('HERE BEING CALLED', event);
    let data = Linking.parse(event.url);
    console.log(JSON.stringify(data), 'SETTING DATA HERE');
    setData(data);
  }

  async function getInitialURL() {
    const initialURL = await Linking.getInitialURL();
    if (initialURL) {
      setData(Linking.parse(initialURL));
      setIsInitial(true);
    }
    console.log('initialURL', initialURL);
  }

  useEffect(() => {
    const subscription = Linking.addEventListener('url', handleDeepLink);

    if (!Object.keys(data).length) {
      getInitialURL();
    }

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    isAuthenticated && navigation.replace("DrawerNavigationRoutes");
  }, [isAuthenticated]);

  return (
    <Provider>
      <View style={styles.mainBody}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flex: 1,
            justifyContent: "center",
            alignContent: "center",
          }}>
          <View style={{ flex: 1 }}>
            <KeyboardAvoidingView enabled>
              <View style={{ alignItems: "center" }}>
                {/* <LottieView source={Animation} loop autoPlay /> */}
                <Image
                  source={require("../moralis-logo.png")}
                  style={{
                    width: "50%",
                    height: 100,
                    resizeMode: "contain",
                    margin: 30,
                  }}
                />
              </View>

              <View>
                {authError && (
                  <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>
                      <Dialog.Title>Authentication error:</Dialog.Title>
                      <Dialog.Content>
                        <Paragraph>
                          {authError ? authError.message : ""}
                        </Paragraph>
                      </Dialog.Content>
                      <Dialog.Actions>
                        <Button onPress={hideDialog}>Done</Button>
                      </Dialog.Actions>
                    </Dialog>
                  </Portal>
                )}
                {isAuthenticating && (
                  <ActivityIndicator animating={true} color={"white"} />
                )}
              </View>

              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={handleCryptoLogin}>
                <Text style={styles.buttonTextStyle}>Crypto Wallet Login</Text>
              </TouchableOpacity>
              <Text
                style={styles.registerTextStyle}
                onPress={() =>
                  Linking.openURL("https://ethereum.org/en/wallets/")
                }>
                What are wallets?
              </Text>
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </View>
    </Provider>
  );
};
export default CryptoAuth;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    alignContent: "center",
  },
  SectionStyle: {
    flexDirection: "row",
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: "#7DE24E",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#7DE24E",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: "600",
  },
  inputStyle: {
    flex: 1,
    color: "white",
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#dadae8",
  },
  registerTextStyle: {
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    alignSelf: "center",
    padding: 10,
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },
});
