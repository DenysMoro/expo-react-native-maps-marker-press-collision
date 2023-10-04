import {useRef} from "react";
import {Alert, PixelRatio, StyleSheet, Text, View} from 'react-native';
import RNM, { Marker } from 'react-native-maps'
import {FIT_TO_COORDINATES, INITIAL_REGION, POSITIONS} from "./mock";

const edgePaddingValue = PixelRatio.getPixelSizeForLayoutSize(5)
const fitToCoordinatesOptions = {
  edgePadding: {
    top: edgePaddingValue,
    right: edgePaddingValue,
    bottom: edgePaddingValue,
    left: edgePaddingValue,
  },
  animated: true,
}

export default function App() {
  const mapRef = useRef();

  const onMapReady = () => {
    if (mapRef.current) {
      mapRef.current.fitToCoordinates(FIT_TO_COORDINATES, fitToCoordinatesOptions)
    }
  }

  const onImageMarkerPress = (index) => {
    Alert.alert('Image marker', `Image with index = ${index}`)
  }

  const onNoteMarkerPress = (index) => {
    Alert.alert('Note marker', `Note with index = ${index}`)
  }

  return (
    <View style={styles.container}>
      <RNM
        ref={mapRef}
        showsMyLocationButton={false}
        showsUserLocation
        initialRegion={INITIAL_REGION}
        provider={undefined}
        style={styles.map}
        radius={30}
        showsCompass={false}
        showsScale={false}
        showsBuildings={false}
        showsTraffic={false}
        showsIndoors={false}
        onMapReady={onMapReady}
      >
        {POSITIONS.map((pos, index) => {
          return (
            <Marker
              coordinate={pos}
              key={index}
              stopPropagation
              tracksViewChanges={false}
              onPress={() => onImageMarkerPress(index)}
              zIndex={50}
            >
              <View style={styles.imageMarker}></View>
            </Marker>
          )
        })}
        {POSITIONS.slice(0, 100).map((pos, index) => {
          return (
            <Marker
              coordinate={pos}
              key={index}
              stopPropagation
              tracksViewChanges={false}
              onPress={() => onNoteMarkerPress(index)}
              zIndex={100}
            >
              <View style={styles.noteMarker}></View>
            </Marker>
          )
        })}
      </RNM>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  imageMarker: {
    width: 17,
    height: 17,
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  noteMarker: {
    width: 18,
    height: 18,
    borderRadius: 2,
    backgroundColor: 'green',
  },
});
