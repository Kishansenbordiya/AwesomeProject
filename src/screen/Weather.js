import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Weather = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { favorites: initialFavorites = [] } = route.params || {}; // Get favorites from navigation params
  const [favorites, setFavorites] = useState(initialFavorites); // Store favorites in state

  // Function to remove an item from favorites
  const removeFavorite = (eventId) => {
    const updatedFavorites = favorites.filter(item => item.event_id !== eventId);
    setFavorites(updatedFavorites);
  };

  const renderFavoriteItem = ({ item }) => (
 <View style={styles.card}>
            <Image source={{ uri: item.event_profile_img }} style={styles.image} />
            <View style={styles.infoContainer}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                <Text style={styles.festivalName}>{item.event_name}</Text>
                                <Image style={{height:25,width:25,marginHorizontal:70}} source={require('../assets/Image/arrow.png')}/>
                                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.cityDate, { color: 'green' }]}>{item.readable_from_date || ''} to </Text>
                        <Text style={[styles.cityDate, { color: 'green' }]}>{item.readable_from_date || ''}</Text>
                    </View>
                    <Text style={[styles.cityDate, { marginHorizontal: 20 }]}>{item.city || 'Location N/A'}</Text>
                    <Text style={[styles.cityDate,]}>{item.country || 'Location N/A'}</Text>
                </View>

                <View style={styles.danceContainer}>
                    {item.danceStyles?.map((dance, index) => (
                        <View key={index} style={styles.danceItem}>
                            <Text style={styles.danceName}>{dance.ds_name}</Text>
                        </View>
                    ))}
                </View>
            </View>
          

            <TouchableOpacity style={{top:35}}>
                 <Image source={require('../assets/Image/share.png')}/>
            </TouchableOpacity>
            <TouchableOpacity style={{top:38,gap:5}}
            onPress={() => removeFavorite(item.event_id)}
            // onPress={() => toggleFavorite(item)}
            >
                <Image
                    source={
                        favorites.some((fav) => fav.event_id === item.event_id)
                            ? require('../assets/Image/heart_fill.png') // Eye open image
                            : require('../assets/Image/heart_outline.png') // Eye closed image
                    }
                    style={styles.eyeIcon}
                />
            </TouchableOpacity>
        </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Hello Renzo!</Text>
        <Text style={styles.subHeader}>Are you ready to dance?</Text>
      </View>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item, index) => (item.event_id ? item.event_id.toString() : index.toString())}
          renderItem={renderFavoriteItem}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text style={styles.noFavoritesText}>No favorites added</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8', padding: 10 },
  header: { fontSize: 22, fontWeight: 'bold', color: '#333', textAlign: 'center', marginBottom: 10 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 12,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  image: { width: 80, height: 80, borderRadius: 8 },
  infoContainer: { flex: 1, marginLeft: 10 },
  festivalName: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  danceName: { fontSize: 14, color: '#777', marginTop: 2 },
  cityDate: { fontSize: 12, color: '#555', marginTop: 4 },
  heartIcon: { padding: 5 },
  noFavoritesText: { textAlign: 'center', color: 'gray', marginTop: 20, fontSize: 16 },
  headerContainer: { height: 100, marginHorizontal: 20, justifyContent: 'center' },
  header: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  subHeader: { color: 'gray', marginTop: 5 },
  danceContainer: {
    flexDirection: 'row', // Items will be in a row
    flexWrap: 'wrap', // Wrap to next line if needed
    gap: 2, // Space between items (Alternative to marginRight),

},
danceItem: {
  backgroundColor: '#f5f7fc', // Background color for each item
  paddingVertical: 6,
  paddingHorizontal: 5,
  borderRadius: 20, // Rounded corners
  marginTop: 10
},
danceName: {
  color: 'black', // White text color
  fontWeight: '400',
}
});

export default Weather;
