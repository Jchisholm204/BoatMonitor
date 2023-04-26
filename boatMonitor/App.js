import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ReactDOM, React, useState, useEffect } from 'react';
// const io = require('socket.io-client');
// const socket = io('10.216.75.65:5566');


export default function App() {

  const [data, setMessage] = useState("");

  useEffect(() => {
    var timer = setInterval(() => {
      fetch("http://192.168.137.127:8000/message")
      .then((res) => res.json())
      .then((data) => setMessage(data));
    }, 300);
  }, []);

  // useEffect(() => {
  //   fetch("http://10.216.75.65:8000")
  //     .then((res) => JSON.parse(res))
  //     .then((data) => setMessage(data.data));

  //     // const client = TcpSocket.createConnection(options, () =>{
  //     //   client.write("App");
  //     //   client.destroy();
  //     // })
    
  //     // client.on('data', function(data) {
  //     //   setMessage(data);
  //     // })

  //   // setMessage("hellp")
  // }, []);


  return (
    <View style={mainStyle.container}>
      <StatusBar style={headerStyle.container} />
      <View style={headerStyle.container}>
        <Text style={{color:'white', fontSize:20,marginTop: 15,}}>Boat Monitor</Text>
      </View>
      <View style={CamStyle.container}>
        <Text style={{color:'white', fontSize:20,}}>{data.video}</Text>
      </View>
      <View style={SensorStyle.container}>
        <Text style={IdentifierText.container}>Cabin</Text>
        <View style={ReadoutStyle.container}>
          <Text style={IdentifierText.container}>Humidity:</Text>
          <Text id='CabinHumid' style={IdentifierText.container}>{data.topHumidity} %</Text>
        </View>
        <View style={ReadoutStyle.container}>
          <Text style={IdentifierText.container}>Temperature:</Text>
          <Text id='CabinTemp' style={IdentifierText.container}>{parseFloat(data.topTemperature).toPrecision(4)} °C</Text>
        </View>
      </View>
      <View style={SensorStyle.container}>
      <Text style={IdentifierText.container}>Engine</Text>
      <View style={ReadoutStyle.container}>
          <Text style={IdentifierText.container}>Humidity:</Text>
          <Text id='EngineHumid' style={IdentifierText.container}>{data.BottomHumidity} %</Text>
        </View>
        <View style={ReadoutStyle.container}>
          <Text style={IdentifierText.container}>Temperature:</Text>
          <Text id='EngineTemp' style={IdentifierText.container}>{parseFloat(data.bottomTemperature).toPrecision(4)} °C</Text>
        </View>
      </View>
    </View>
  );
}

const mainStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
  }
});

const headerStyle = StyleSheet.create({
  container: {
    backgroundColor: '#00C2FF',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
    marginTop: 0,
    borderRadius: 0,
    height: 80,
  }
});

const CamStyle = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 30,
    borderRadius: 16,
    color: 'white',
    minHeight: 120,
  }
});

const SensorStyle = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'column',
    backgroundColor: '#6ADBFF',
    margin: 30,
    marginTop: 0,
    borderRadius: 16,
    color: 'white',
    alignItems: 'center',
  }
});

const IdentifierText = StyleSheet.create({
  container: {
    color: 'black',
    fontSize: 20,
    padding: 10,
  }
});

const ReadoutStyle = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'white',
    flexDirection: 'row',
    margin: 25,
    marginTop: 5,
    marginBottom: 25,
    borderRadius: 33,
    justifyContent: 'space-between',
    alignSelf: 'stretch',
  }
});
