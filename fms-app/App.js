import React, { useState } from 'react';
import { View, TextInput, Button, Text, Image, ScrollView } from 'react-native';
import axios from 'axios';
import {
  SafeAreaView,
  SafeAreaProvider,
} from 'react-native-safe-area-context';

const API_URL = 'https://glorious-lamp-r7pxpw7wp752xrj9-8000.app.github.dev';

const App = () => {
  const [videoId, setVideoId] = useState('');
  const [ingredients, setIngredients] = useState({});
  const [instructions, setInstructions] = useState({});
  const [showInstructions, setShowInstructions] = useState(false);

  const fetchIngredients = async () => {
    try {
      const response = await axios.post(`${API_URL}/get_ingredients/`, { video_id: videoId });
      setIngredients(response.data.ingredients);
    } catch (error) {
      console.error('Error fetching ingredients:', error);
    }
  };

  const fetchInstructions = async () => {
    try {
      const response = await axios.post(`${API_URL}/get_instructions/`, { video_id: videoId });
      setInstructions(response.data.steps);
      setShowInstructions(true);
    } catch (error) {
      console.error('Error fetching instructions:', error);
    }
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ padding: 20 }}>
          <TextInput
            placeholder="Enter YouTube Video ID"
            value={videoId}
            onChangeText={setVideoId}
            style={{ borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 20 }}
          />
          <Button title="Get Ingredients" onPress={fetchIngredients} />
          <View style={{ marginTop: 20 }}>
            {Object.keys(ingredients).map((ingredient) => (
              <Text key={ingredient}>
                {ingredient}: {ingredients[ingredient]}
              </Text>
            ))}
          </View>
          {Object.keys(ingredients).length > 0 && (
            <Button title="Show Instructions" onPress={fetchInstructions} />
          )}
          {showInstructions && (
            <View style={{ marginTop: 20 }}>
              {Object.keys(instructions).map((timestamp) => (
                <Text key={timestamp}>
                  {timestamp}: {instructions[timestamp]}
                </Text>
              ))}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
