import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
const CityScreen = () => {
    const navigation = useNavigation();
    const [favorites, setFavorites] = useState([]);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.post(
                'http://3.7.81.243/projects/plie-api/public/api/events-listing',
                {},
                {
                    headers: {
                        'Authorization': 'Bearer 148|QwsMFixT9w9MgleAbukZtghUuKNZGxgR1SYDOVMk',
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log('API Response:', JSON.stringify(response.data, null, 2));

            if (response.data.success && response.data.data && Array.isArray(response.data.data.events)) {
                setEvents(response.data.data.events);
            } else {
                setEvents([]);
            }
        } catch (error) {
            console.error('Error fetching events:', error.response ? error.response.data : error.message);
            setEvents([]);
        } finally {
            setLoading(false);
        }
    };


    // const fetchEvents = async () => {
    //     try {
    //         const response = await axios.post(
    //             'http://3.7.81.243/projects/plie-api/public/api/events-listing',
    //             {},
    //             {
    //                 headers: {
    //                     'Authorization': 'Bearer 148|QwsMFixT9w9MgleAbukZtghUuKNZGxgR1SYDOVMk',
    //                     'Content-Type': 'application/json',
    //                 },
    //             }
    //         );

    //         console.log('API Response:', JSON.stringify(response.data, null, 2));

    //         if (response.data.success && response.data.data && Array.isArray(response.data.data.events)) {
    //             // Remove duplicates based on event_id + event_date_id
    //             const uniqueEvents = Array.from(
    //                 new Map(response.data.data.events.map(event => [`${event.event_id}-${event.event_date_id}`, event])).values()
    //             );

    //             setEvents(uniqueEvents);
    //         } else {
    //             setEvents([]);
    //         }
    //     } catch (error) {
    //         console.error('Error fetching events:', error.response ? error.response.data : error.message);
    //         setEvents([]);
    //     } finally {
    //         setLoading(false);
    //     }
    // };


    // const toggleFavorite = (festival) => {
    //     setFavorites((prev) => {
    //         const isAlreadyFavorite = prev.some((fav) => fav.event_id === festival.event_id);
    //         return isAlreadyFavorite
    //             ? prev.filter((fav) => fav.event_id !== festival.event_id)
    //             : [...prev, festival];
    //     });
    // };


    const toggleFavorite = (festival) => {
        setFavorites((prevFavorites) => {
            const updatedFavorites = prevFavorites.some((fav) => fav.event_id === festival.event_id)
                ? prevFavorites.filter((fav) => fav.event_id !== festival.event_id) 
                : [...prevFavorites, festival]; 

            return updatedFavorites;
        });
    };


    const renderFestival = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.event_profile_img }} style={styles.image} />
            <View style={styles.infoContainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.festivalName}>{item.event_name}</Text>
                    <Image style={{ height: 25, width: 25, marginHorizontal: 70 }} source={require('../assets/Image/arrow.png')} />
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


            <TouchableOpacity style={{ top: 35 }}>
                <Image source={require('../assets/Image/share.png')} />
            </TouchableOpacity>

            <TouchableOpacity style={{ top: 38, gap: 5 }} onPress={() => toggleFavorite(item)}>
                <Image
                    source={
                        favorites.some((fav) => fav.event_id === item.event_id)
                            ? require('../assets/Image/heart_fill.png') // Filled heart (selected)
                            : require('../assets/Image/heart.png') // Empty heart (not selected)
                    }
                    style={{ width: 25, height: 25 }} // Ensure proper size
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

            <TouchableOpacity
                style={styles.favoritesButton}
                onPress={() => navigation.navigate('Favourite', { favorites })}
            >
                <Text style={styles.buttonText}>View Favorites ({favorites.length})</Text>
            </TouchableOpacity>

            {loading ? (
                <ActivityIndicator size="large" color="#ff6347" style={{ marginTop: 20 }} />
            ) : events.length > 0 ? (
                <FlatList
                    data={events}
                    keyExtractor={(item) => `${item.event_id}-${item.event_date_id}`}
                    renderItem={renderFestival}
                    showsVerticalScrollIndicator={false}
                />

            ) : (
                <Text style={styles.noEventsText}>No events found</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8f8f8', padding: 10 },
    headerContainer: { height: 100, marginHorizontal: 20, justifyContent: 'center' },
    header: { fontSize: 24, fontWeight: 'bold', color: '#333' },
    subHeader: { color: 'gray', marginTop: 5 },
    favoritesButton: { backgroundColor: '#ff6347', padding: 10, borderRadius: 10, marginBottom: 10, alignItems: 'center' },
    buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
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
    noEventsText: { textAlign: 'center', color: 'gray', marginTop: 20, fontSize: 16 },
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

export default CityScreen;
