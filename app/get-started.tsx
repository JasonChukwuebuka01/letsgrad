import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Platform,
    Image, // Keeping Image import in case you swap icon later
} from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons'; // Using FontAwesome5 for a graduation cap icon
import Constants from 'expo-constants'; // To get status bar height
import AsyncStorage from '@react-native-async-storage/async-storage'; // To eventually save onboarding status

// Get screen dimensions for styling adjustments
const { height, width } = Dimensions.get('window');

export default function OnboardingScreen() {
    const router = useRouter();

    const handleGetStarted = async () => {
        try {
            await AsyncStorage.setItem('@letsgrad_onboarding_complete', 'true');
            router.replace('/(tabs)/upload'); // Redirect to upload screen
        } catch (e) {
            console.error("Failed to save onboarding status:", e);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        // Main container
        <View style={styles.container}>

            {/* Icon Section */}
            <View style={styles.iconContainer}>
                <FontAwesome5 name="graduation-cap" size={height * 0.12} color="tomato" />
            </View>

            {/* Text Content Section */}
            <View style={styles.textContainer}>
                <Text style={styles.title}>
                    Welcome to LetsGrad!
                </Text>
                <Text style={styles.description}>
                    Turn your photos into cherished graduation memories. Upload a picture, and let our AI add the cap and gown!
                </Text>
            </View>

            {/* Button Section */}
            <TouchableOpacity
                activeOpacity={0.7} // Subtle feedback on press
                onPress={handleGetStarted}
                style={styles.button}
            >
                <Text style={styles.buttonText}>
                    Get Started
                </Text>
            </TouchableOpacity>

            {/* Optional: Add subtle footer text if needed */}
            {/* <Text style={styles.footerText}>Powered by AI Magic</Text> */}
        </View>
    );
}

// --- StyleSheet Definition ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // We use padding and justify content slightly differently for vertical centering
        // without justify-center, mainly using spacing elements (margins).
        backgroundColor: '#f9fafb', // bg-gray-50
        paddingHorizontal: 24, // p-6 horizontal equivalent
        paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight + 48 : 60, // pt-12 + status bar
        paddingBottom: 40, // Added padding at the bottom
    },
    iconContainer: {
        marginBottom: 40, // mb-10
        alignItems: 'center', // Center icon if container takes space
    },
    textContainer: {
        alignItems: 'center',
        paddingHorizontal: 16, // px-4 within this section
        marginBottom: 48, // mb-12 - Pushes button down
        flexShrink: 1, // Allows text to shrink if needed on small screens
    },
    title: {
        fontSize: 30, // text-3xl
        fontWeight: 'bold',
        color: '#1f2937', // text-gray-800
        marginBottom: 16, // mb-4
        textAlign: 'center',
    },
    description: {
        fontSize: 18, // text-lg
        color: '#4b5563', // text-gray-600
        textAlign: 'center',
        lineHeight: 27, // leading-relaxed approximation (1.5 * font size)
    },
    button: {
        backgroundColor: 'tomato', // bg-indigo-600
        width: '100%',
        maxWidth: 320, // max-w-xs approximation
        paddingVertical: 16, // py-4
        paddingHorizontal: 32, // px-8 (useful if text is short)
        borderRadius: 9999, // rounded-full
        alignItems: 'center', // Center text horizontally
        justifyContent: 'center', // Center text vertically
        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        // Elevation for Android
        elevation: 5, // shadow-md equivalent
        marginTop: 'auto', // Pushes the button towards the bottom if space allows
    },
    buttonText: {
        color: '#ffffff', // text-white
        fontSize: 18, // text-lg
        fontWeight: '600', // font-semibold
    },
    footerText: {
        position: 'absolute',
        bottom: 20, // Positioned near the bottom
        fontSize: 12, // text-xs
        color: '#9ca3af', // text-gray-400
    }
});