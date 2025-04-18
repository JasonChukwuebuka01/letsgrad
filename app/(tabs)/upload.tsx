import React, { useState } from 'react';
import { cloudinaryAIService } from '@/services/cloudinaryService';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView, // Use ScrollView to prevent overflow on small screens
} from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome5 } from '@expo/vector-icons'; // Using FontAwesome5 for icons
import * as FileSystem from 'expo-file-system';

export default function UploadScreen() {

  const router = useRouter();
  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to handle selecting a photo
  const handleSelectPhoto = async () => {
    setError(null); // Clear previous errors

    // Request permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Sorry, we need camera roll permissions to make this work!',
        [{ text: 'OK' }]
      );
      return;
    }

    // Launch image library
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true, // Allows user to crop/rotate
        aspect: [3, 4], // Suggest an aspect ratio (optional)
        quality: 0.8, // Reduce quality slightly for faster uploads (0 to 1)
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setSelectedImageUri(result.assets[0].uri);
        console.log('Selected Image URI:', result.assets[0].uri);

        const base64Image = await FileSystem.readAsStringAsync(result.assets[0].uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        setBase64Image(base64Image);
      }
    } catch (e) {
      console.error("ImagePicker Error: ", e);
      setError("Could not select image. Please try again.");
      Alert.alert("Error", "Could not select image.");
    }
  };

  // Function to handle triggering the AI generation (placeholder)
  const handleGeneratePhoto = async () => {
    if (!selectedImageUri) {
      setError("Please select an image first");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      // Properly format the transformations
      const transformationOptions = [
        { prompt: "a professional graduation photo with formal academic attire, graduation cap and gown, professional lighting, studio background" },
        { model: "cloudinary_ai" },
        { quality: "auto" },
        { format: "auto" },
        { crop: "fill" },
        { gravity: "auto" }
      ];

      const result = await cloudinaryAIService.applyTransformation(selectedImageUri, transformationOptions);
        console.log(result);
      if (result && result.secure_url) {  // Check for secure_url instead of success
        router.push({
          pathname: '/result',
          params: { url: result.secure_url }  // Use secure_url from the response
        });

        console.log('Generated Image URL:', result.secure_url);
      } else {
        setError('Failed to generate photo. Please try again.');
        Alert.alert('Error', 'Failed to generate photo. Please try again.');
      }
    } catch (error: any) {
      console.error('Generation Error:', error);
      setError(error.message || 'An unexpected error occurred. Please try again');
      Alert.alert('Error', error.message || 'An unexpected error occurred. Please try again.');
    }

    setIsLoading(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {/* Image Preview Area */}
          <View style={styles.previewContainer}>
            {selectedImageUri ? (
              <Image source={{ uri: selectedImageUri }} style={styles.previewImage} resizeMode="contain" />
            ) : (
              <View style={styles.placeholder}>
                <FontAwesome5 name="image" size={60} color="#9CA3AF" />
                <Text style={styles.placeholderText}>Your photo will appear here</Text>
              </View>
            )}
          </View>

          {/* Action Buttons */}
          <TouchableOpacity onPress={handleSelectPhoto} style={styles.selectButton} disabled={isLoading}>
            <FontAwesome5 name="photo-video" size={18} color="#FFF" style={{ marginRight: 10 }} />
            <Text style={styles.selectButtonText}>Select Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleGeneratePhoto}
            style={[styles.generateButton, (!selectedImageUri || isLoading) ? styles.buttonDisabled : {}]}
            disabled={!selectedImageUri || isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <>
                <FontAwesome5 name="magic" size={18} color="#FFF" style={{ marginRight: 10 }} />
                <Text style={styles.generateButtonText}>Generate Grad Photo</Text>
              </>
            )}
          </TouchableOpacity>

          {/* Error Message Area */}
          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// --- StyleSheet Definition ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9FAFB', // Light gray background
  },
  scrollContainer: {
    flexGrow: 1, // Ensures content can scroll if needed but doesn't force scroll view height
    justifyContent: 'center', // Center content vertically if it doesn't fill screen
  },
  container: {
    flex: 1, // Take up available space within ScrollView
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 30, // Padding top and bottom
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937', // Dark Gray
    marginBottom: 8,
    textAlign: 'center',
  },
  instructions: {
    fontSize: 16,
    color: '#4B5563', // Medium Gray
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 24,
  },
  previewContainer: {
    width: '100%',
    aspectRatio: 3 / 4, // Maintain a portrait aspect ratio
    backgroundColor: '#E5E7EB', // Placeholder background (gray-200)
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    overflow: 'hidden', // Ensure image stays within bounds
    borderWidth: 1,
    borderColor: '#D1D5DB', // gray-300
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  placeholderText: {
    marginTop: 15,
    fontSize: 15,
    color: '#6B7280', // gray-500
    textAlign: 'center',
  },
  selectButton: {
    flexDirection: 'row',
    backgroundColor: '#3B82F6', // Blue-500
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30, // Pill shape
    width: '100%',
    maxWidth: 350,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  selectButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },
  generateButton: {
    flexDirection: 'row',
    backgroundColor: '#4F46E5', // Primary Indigo
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 30, // Pill shape
    width: '100%',
    maxWidth: 350,
    minHeight: 55, // Ensure consistent height during loading
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 7,
  },
  generateButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },
  buttonDisabled: {
    backgroundColor: '#9CA3AF', // Gray-400 for disabled state
    shadowColor: 'transparent', // Remove shadow when disabled
    elevation: 0,
  },
  errorContainer: {
    marginTop: 20,
    width: '100%',
    maxWidth: 350,
    padding: 15,
    backgroundColor: '#FEE2E2', // Red-100
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444', // Red-500
  },
  errorText: {
    color: '#B91C1C', // Red-700
    fontSize: 14,
    textAlign: 'center',
  },
});