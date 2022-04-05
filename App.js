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
 _keyExtractor = (datasource, index) => datasource.email;

 componentDidMount() {
   this.getUserFromApi();
 }  
 
 render() {
    if(this.state.isLoading) {
      return(
        <FlatList>
          data={rhis.state.dataSource}
          keyExtractor={this._keyExtractor}
          renderItem={(item) => (
            <Card>
              <CardItem>
                <View style={styles.container}>
                    <Image 
                      style={styles.profilepic}
                      source={{
                        uri: item.picture.medium
                      }}
                    />
                </View>
                <View style={styles.userinfo}>
                    <Text>
                      Name: {item.name.title} {item.name.first} {item.name.last}
                    </Text>
                    <Text>
                      Email: {item.email}
                    </Text>
                    <Text>
                      City: {item.location.city}
                    </Text>
                    <Text>
                      City: {item.phone}
                    </Text>
                </View>
              </CardItem>
            </Card>
          )}
        </FlatList>
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

  profilepic: {},
  userinfo: {},
});
