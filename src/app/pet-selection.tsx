import { router } from "expo-router";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { useGame } from "@/context/GameContext";

export default function PetSelectionScreen() {
  const { gameState, updateGameState } = useGame();

  const pets = [
    {
      id: "dog",
      name: "Cachorrinho",
      emoji: "🐶",
      cost: 15,
      care: "Precisa de ração, brinquedos e carinho!",
    },
    {
      id: "cat",
      name: "Gatinho",
      emoji: "🐱",
      cost: 12,
      care: "Ama petiscos, arranhador e sonecas!",
    },
    {
      id: "hamster",
      name: "Hamster",
      emoji: "🐹",
      cost: 8,
      care: "Gosta de sementes e rodinhas!",
    },
    {
      id: "fish",
      name: "Peixinho",
      emoji: "🐠",
      cost: 5,
      care: "Quer aquário limpo e comida especial!",
    },
    {
      id: "bird",
      name: "Passarinho",
      emoji: "🐦",
      cost: 10,
      care: "Precisa de gaiola, alpiste e música!",
    },
    {
      id: "turtle",
      name: "Tartaruga",
      emoji: "🐢",
      cost: 7,
      care: "Adora verduras e um cantinho tranquilo!",
    },
  ];

  const characters = {
    girl1: { emoji: "👧🏻" },
    boy1: { emoji: "👦🏻" },
    girl2: { emoji: "👧🏽" },
    boy2: { emoji: "👦🏽" },
    girl3: { emoji: "👧🏿" },
    boy3: { emoji: "👦🏿" },
  };

  const selectedCharacter =
    characters[gameState.selectedCharacter as keyof typeof characters];

  const handleSelectPet = (petId: string) => {
    updateGameState({
      selectedPet: petId,
    });

    router.push("/game");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.characterEmoji}>{selectedCharacter?.emoji}</Text>

          <Text style={styles.title}>Escolha seu Bichinho!</Text>

          <Text style={styles.characterEmoji}>{selectedCharacter?.emoji}</Text>
        </View>

        <Text style={styles.subtitle}>
          {gameState.playerName}, qual bichinho você quer cuidar?
        </Text>

        {pets.map((pet) => (
          <TouchableOpacity
            key={pet.id}
            style={styles.petCard}
            onPress={() => handleSelectPet(pet.id)}
          >
            <Text style={styles.petEmoji}>{pet.emoji}</Text>

            <Text style={styles.petName}>{pet.name}</Text>

            <View style={styles.costBox}>
              <Text style={styles.costText}>Custo mensal: R$ {pet.cost}</Text>
            </View>

            <View style={styles.careBox}>
              <Text style={styles.careText}>{pet.care}</Text>
            </View>
          </TouchableOpacity>
        ))}

        <Text style={styles.footerText}>
          Clique no bichinho que você escolher para começar sua aventura!
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D5E72C",
  },

  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
    paddingHorizontal: 16,
  },

  characterEmoji: {
    fontSize: 36,
    marginHorizontal: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00353B",
  },

  subtitle: {
    textAlign: "center",
    marginTop: 12,
    marginBottom: 20,
    fontSize: 16,
    color: "#00353B",
  },

  petCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: "#1A3D38",
    padding: 16,
    alignItems: "center",
  },

  petEmoji: {
    fontSize: 50,
    marginBottom: 10,
  },

  petName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#00353B",
    marginBottom: 10,
  },

  costBox: {
    backgroundColor: "#2FBFA0",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    width: "100%",
  },

  costText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  careBox: {
    backgroundColor: "#7FC241",
    borderRadius: 8,
    padding: 10,
    width: "100%",
  },

  careText: {
    textAlign: "center",
    color: "#FFFFFF",
  },

  footerText: {
    textAlign: "center",
    fontSize: 16,
    color: "#00353B",
    marginVertical: 20,
    paddingHorizontal: 20,
  },
});
