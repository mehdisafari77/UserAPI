import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  Image, 
  ActivityIndicator
 } from 'react-native';
 import { Card, CardItem } from 'native-base'

export default class App extends component {

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      dataSource: []
    };
  }

  getUserFromApi = () => {
    return(
      fetch("https://randomuser.me/api/?result=50")
        .then(response => response.json())
        .then(responseJson => {
          this.setState({
            isLoading: false,
            dataSource: this.state.dataSource.concat(responseJson.results)
          })
        })
        .catch(error => console.log(error))
    )
 }
 componentDidMount() {
   this.getUserFromApi();
 }  
 
 render() {
    if(this.state.isLoading) {
      return(
        <View>
          <ActivityIndicator size="larger" color="#01CBC6" />
        </View>
      )
    }
      return (
        <View style={styles.container}>
          <Text>Open up App.js to start working on your app!</Text>
          <StatusBar style="auto" />
        </View>
      );
    }
 }
 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
