import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Image,
  Platform,
} from "react-native";
import { Button, NativeBaseProvider} from "native-base";
import Constants from "expo-constants";
import styled from 'styled-components/native';

const baseUrl = "https://reqres.in";

function User({ userObject }) {

  return (
    <View>
      <Image
        source={{ uri: userObject.avatar }}
        style={{ width: 128, height: 128, borderRadius: 64 }}
      />
      <Text style={{ textAlign: "center", color: "white" }}>
        {`${userObject.first_name} ${userObject.last_name}`}
      </Text>
    </View>
  );
}
export default function App() {
  const [userId, setUserId] = useState(1);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setErrorFlag] = useState(false);
  const changeUserIdHandler = () => {
    setUserId((userId) => (userId === 3 ? 1 : userId + 1));
  };
  useEffect(() => {
    const source = axios.CancelToken.source();
    const url = `${baseUrl}/api/users/${userId}`;
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(url, { cancelToken: source.token });
        if (response.status === 200) {
          setUser(response.data.data);
          setIsLoading(false);
          return;
        } else {
          throw new Error("Failed to fetch users");
        }
      } catch (error) {
        if(axios.isCancel(error)){
          console.log('Data fetching cancelled');
        }else{
          setErrorFlag(true);
          setIsLoading(false);
        }
      }
    };
    fetchUsers();
    return () => source.cancel("Data fetching cancelled");
  }, [userId]);

  return (
    <NativeBaseProvider>
        <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.wrapperStyle}>
          {!isLoading && !hasError && user && <User userObject={user} />}
        </View>
        <View style={styles.wrapperStyle}>
          {isLoading && <Text> Loading </Text>}
          {!isLoading && hasError && <Text> An error has occurred </Text>}
        </View>
        <View>
          <Button style={styles.buttonStyles}
          onPress={changeUserIdHandler}
          disabled={isLoading}
          color= 'green'>
            Load User
          </Button>
          <Title>
            Hello
          </Title>
        </View>
      </ScrollView>
    </NativeBaseProvider>
    
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "dodgerblue",
    alignItems: "center",
    justifyContent: "center",
    marginTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
    zIndex: 1
  },
  wrapperStyle: {
    minHeight: 128,
  },
  buttonStyles: {
    padding: 100,
    backgroundColor: 'blue',
    borderColor: 'black',
    borderRadius: 10,
    zIndex: 2
  }
});

const Title = styled.Text`
  color: green;
  text-align: center;
  font-size: 16px;
`;