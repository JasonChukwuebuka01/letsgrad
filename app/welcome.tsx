import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Platform,
    SafeAreaView,
    StatusBar, // Import StatusBar
} from 'react-native';
import { useRouter } from 'expo-router'; // Keep import for eventual use
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient

// Get screen dimensions
const { height, width } = Dimensions.get('window');

export default function WelcomeScreen() { // Renamed for clarity
    const router = useRouter(); // Keep router instance

    // Placeholder function - NO LOGIC IMPLEMENTED HERE
    const handleGetStarted = () => {

        router.replace('/get-started'); // Redirect to get-started screen
        
    };

    
    return (
        <LinearGradient
            colors={['#FF6B6B', '#FF8787', '#FFA5A5']} // Bright tomato -> Lighter tomato -> Soft pink-tomato
            style={styles.gradientContainer}
            start={{ x: 0, y: 0 }} // Gradient starts top-left
            end={{ x: 0.5, y: 1 }} // Gradient ends bottom-center
        >
            {/* Set status bar style for light background */}
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>

                    {/* Top Section: App Name & Icon */}
                    <View style={styles.header}>
                        <Text style={styles.appName}>LetsGrad</Text>
                        <FontAwesome5 name="graduation-cap" size={28} color="#000" style={styles.headerIcon} />
                    </View>

                    {/* Middle Section: Main Content */}
                    <View style={styles.content}>
                        <View style={styles.illustrationPlaceholder}>
                            {/* You could place a more complex illustration or Image here */}
                            <FontAwesome5 name="user-graduate" size={height * 0.18} color="#000" />
                        </View>
                        <Text style={styles.title}>
                            Your Graduation Moment, Reimagined.
                        </Text>
                        <Text style={styles.description}>
                            Celebrate your achievement! Simply upload a clear photo of yourself, and our AI will magically add the cap and gown, creating a professional-looking graduation portrait you'll treasure.
                        </Text>
                    </View>

                    {/* Bottom Section: Action and Attribution */}
                    <View style={styles.footer}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={handleGetStarted} // Still points to the placeholder
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>
                                Create My Grad Photo
                            </Text>
                        </TouchableOpacity>
                        <Text style={styles.attributionText}>
                            Built by Jason (Mayicodes)
                        </Text>
                    </View>

                </View>
            </SafeAreaView>
        </LinearGradient>
    );
}

// --- StyleSheet Definition ---
const styles = StyleSheet.create({
    gradientContainer: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
        // No background color needed here as the gradient provides it
    },
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 20 : 20, // Adjust for status bar
        paddingBottom: 30,
        justifyContent: 'space-between', // Pushes header up, footer down
        alignItems: 'center',
    },
    header: {
        width: '100%',
        flexDirection: 'row', // Align app name and icon horizontally
        justifyContent: 'center', // Center the header content
        alignItems: 'center',
        marginBottom: 10, // Space below header
        // Optional: Add padding if needed, but center usually works
    },
    appName: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000', // 
        marginRight: 8, // Space between name and icon
    },
    headerIcon: {
        opacity: 0.8, // Make icon slightly less prominent than name
    },
    content: {
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 10, // Constrain text width slightly
        flex: 1, // Allow content to take available space in middle
        justifyContent: 'center', // Center content vertically in its space
        marginTop: -20, // Pull content up slightly if header takes space
    },
    illustrationPlaceholder: {
        // Style this view if you add a background or border to an illustration
        marginBottom: 40,
        alignItems: 'center', // Ensure icon inside is centered
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1E1B4B', // Very Dark Indigo/ quase black
        textAlign: 'center',
        marginBottom: 16,
        lineHeight: 40,
    },
    description: {
        fontSize: 16,
        color: '#4B5563', // Medium Gray
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 30, // Space before footer starts pushing up
    },
    footer: {
        width: '100%',
        alignItems: 'center',
        paddingBottom: 10, // Ensure some space from bottom edge
    },
    button: {
        backgroundColor: '#000', // 
        borderRadius: 30, // Pill shape
        paddingVertical: 16,
        paddingHorizontal: 40, // Generous horizontal padding
        width: '100%',
        maxWidth: 360,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 25, // More space before attribution
        // Enhanced Shadow
        shadowColor: '#4338CA',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
        shadowRadius: 8,
        elevation: 10,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    },
    attributionText: {
        fontSize: 13,
        color: '#6B7280', // Gray
        textAlign: 'center',
    },
});