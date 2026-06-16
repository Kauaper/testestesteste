import { router } from "expo-router";
import { useState } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { useGame } from "@/context/GameContext";

export default function CharacterSelectionScreen() {
  const { gameState, updateGameState } = useGame();

  const [selectedCharacter, setSelectedCharacter] = useState("");

  const characters = [
    {
      id: "girl1",
      emoji: "👧🏻",
      description: "Criativa e sonhadora",
    },
    {
      id: "boy1",
      emoji: "👦🏻",
      description: "Aventureiro e corajoso",
    },
    {
      id: "girl2",
      emoji: "👧🏽",
      description: "Inteligente e organizada",
    },
    {
      id: "boy2",
      emoji: "👦🏽",
      description: "Esportivo e determinado",
    },
    {
      id: "girl3",
      emoji: "👧🏿",
      description: "Artística e expressiva",
    },
    {
      id: "boy3",
      emoji: "👦🏿",
      description: "Tecnológico e inovador",
    },
  ];

  const handleConfirm = () => {
    if (!selectedCharacter) return;

    updateGameState({
      selectedCharacter,
    });

    router.push("/pet-selection");
  };

  const selectedCharacterData = characters.find(
    (character) => character.id === selectedCharacter,
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>Escolha seu Personagem!</Text>

          <Text style={styles.subtitle}>
            {gameState.playerName}, qual personagem representa você melhor?
          </Text>
        </View>

        <View style={styles.grid}>
          {characters.map((character) => (
            <TouchableOpacity
              key={character.id}
              style={[
                styles.characterCard,
                selectedCharacter === character.id && styles.selectedCharacter,
              ]}
              onPress={() => setSelectedCharacter(character.id)}
            >
              <Text style={styles.characterEmoji}>{character.emoji}</Text>

              <Text style={styles.characterDescription}>
                {character.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {selectedCharacterData && (
          <View style={styles.preview}>
            <Text style={styles.previewEmoji}>
              {selectedCharacterData.emoji}
            </Text>

            <Text style={styles.previewTitle}>
              Você escolheu este personagem!
            </Text>

            <Text style={styles.previewDescription}>
              {selectedCharacterData.description}
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={[styles.button, !selectedCharacter && styles.buttonDisabled]}
          disabled={!selectedCharacter}
          onPress={handleConfirm}
        >
          <Text style={styles.buttonText}>Confirmar Personagem!</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D5E72C",
    padding: 16,
  },

  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 4,
    borderColor: "#00353B",
    overflow: "hidden",
  },

  header: {
    backgroundColor: "#2FBFA0",
    padding: 20,
    alignItems: "center",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#00353B",
    textAlign: "center",
  },

  subtitle: {
    marginTop: 8,
    textAlign: "center",
    color: "#00353B",
    fontSize: 16,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 16,
  },

  characterCard: {
    width: "31%",
    backgroundColor: "#D5E72C",
    borderWidth: 3,
    borderColor: "#1A3D38",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: "center",
  },

  selectedCharacter: {
    borderColor: "#2FBFA0",
    borderWidth: 4,
  },

  characterEmoji: {
    fontSize: 42,
    marginBottom: 8,
  },

  characterDescription: {
    textAlign: "center",
    fontSize: 12,
    color: "#1A3D38",
    fontWeight: "600",
  },

  preview: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#7FC241",
    borderWidth: 3,
    borderColor: "#00353B",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },

  previewEmoji: {
    fontSize: 54,
    marginBottom: 8,
  },

  previewTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },

  previewDescription: {
    color: "#FFFFFF",
    marginTop: 8,
    textAlign: "center",
  },

  button: {
    backgroundColor: "#7FC241",
    margin: 16,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonDisabled: {
    opacity: 0.5,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
