import React from "react";
import { ScrollView, Text, View } from "react-native";

import AchievementSystem from "@/components/game/AchievementSystem";
import GameNarrator from "@/components/game/GameNarrator";
import MonthlyActions from "@/components/game/MonthlyActions";
import { useGame } from "@/context/GameContext";

export default function GameScreen() {
  const { gameState } = useGame();

  const [showNarrator, setShowNarrator] = React.useState(true);

  const pets = {
    dog: {
      name: "Cachorrinho",
      emoji: "🐶",
      cost: 15,
    },

    cat: {
      name: "Gatinho",
      emoji: "🐱",
      cost: 12,
    },

    hamster: {
      name: "Hamster",
      emoji: "🐹",
      cost: 8,
    },

    fish: {
      name: "Peixinho",
      emoji: "🐠",
      cost: 5,
    },

    bird: {
      name: "Passarinho",
      emoji: "🐦",
      cost: 10,
    },

    turtle: {
      name: "Tartaruga",
      emoji: "🐢",
      cost: 7,
    },
  };

  const characters = {
    girl1: {
      name: "Luna",
      emoji: "👧🏻",
    },

    boy1: {
      name: "Max",
      emoji: "👦🏻",
    },

    girl2: {
      name: "Sofia",
      emoji: "👧🏽",
    },

    boy2: {
      name: "Diego",
      emoji: "👦🏽",
    },

    girl3: {
      name: "Zara",
      emoji: "👧🏿",
    },

    boy3: {
      name: "Kael",
      emoji: "👦🏿",
    },
  };

  const selectedPet = pets[gameState.selectedPet as keyof typeof pets];

  const selectedCharacter =
    characters[gameState.selectedCharacter as keyof typeof characters];

  const gameEnded = gameState.currentMonth > 12;

  React.useEffect(() => {
    if (!gameEnded) {
      setShowNarrator(true);
    }
  }, [gameState.currentMonth, gameEnded]);

  const handleNarratorComplete = () => {
    setShowNarrator(false);
  };

  if (showNarrator && !gameEnded) {
    return (
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: 16,
        }}
      >
        <AchievementSystem />

        <View
          style={{
            backgroundColor: "#F3F6FA",
            borderWidth: 3,
            borderColor: "#003B49",
            padding: 20,
            borderRadius: 16,
            marginBottom: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 16,
              marginBottom: 16,
            }}
          >
            <Text
              style={{
                fontSize: 48,
              }}
            >
              {selectedCharacter?.emoji}
            </Text>

            <Text
              style={{
                fontSize: 32,
              }}
            >
              ❤️
            </Text>

            <Text
              style={{
                fontSize: 48,
              }}
            >
              {selectedPet?.emoji}
            </Text>
          </View>

          <Text
            style={{
              fontSize: 28,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Capítulo {gameState.currentMonth}
          </Text>

          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              marginTop: 8,
            }}
          >
            {gameState.playerName}
            {" & "}
            {selectedPet?.name}
          </Text>
        </View>

        <GameNarrator onComplete={handleNarratorComplete} />
      </ScrollView>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        padding: 16,
        gap: 16,
      }}
    >
      <AchievementSystem />

      {!gameEnded && (
        <View
          style={{
            backgroundColor: "#F3F6FA",
            borderWidth: 3,
            borderColor: "#003B49",
            padding: 20,
            borderRadius: 16,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 16,
              marginBottom: 16,
            }}
          >
            <Text
              style={{
                fontSize: 48,
              }}
            >
              {selectedCharacter?.emoji}
            </Text>

            <Text
              style={{
                fontSize: 32,
              }}
            >
              ❤️
            </Text>

            <Text
              style={{
                fontSize: 48,
              }}
            >
              {selectedPet?.emoji}
            </Text>
          </View>

          <Text
            style={{
              fontSize: 28,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Capítulo {gameState.currentMonth}
            {" de 12"}
          </Text>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 12,
              marginTop: 20,
            }}
          >
            <View
              style={{
                backgroundColor: "#57D86D",
                borderRadius: 12,
                paddingVertical: 12,
                paddingHorizontal: 20,
                minWidth: 120,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#FFF",
                  fontSize: 14,
                }}
              >
                💰 Carteira
              </Text>

              <Text
                style={{
                  color: "#FFF",
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                R$ {gameState.balance.toFixed(0)}
              </Text>
            </View>

            <View
              style={{
                backgroundColor: "#55B6FF",
                borderRadius: 12,
                paddingVertical: 12,
                paddingHorizontal: 20,
                minWidth: 120,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#FFF",
                  fontSize: 14,
                }}
              >
                🌱 Guardado
              </Text>

              <Text
                style={{
                  color: "#FFF",
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                R$ {gameState.investmentBalance.toFixed(0)}
              </Text>
            </View>

            <View
              style={{
                backgroundColor: "#FF6BA6",
                borderRadius: 12,
                paddingVertical: 12,
                paddingHorizontal: 20,
                minWidth: 120,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#FFF",
                  fontSize: 14,
                }}
              >
                ❤️ Pet
              </Text>

              <Text
                style={{
                  color: "#FFF",
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                {gameState.petHealth.toFixed(0)}%
              </Text>
            </View>

            <View
              style={{
                backgroundColor: "#FFA233",
                borderRadius: 12,
                paddingVertical: 12,
                paddingHorizontal: 20,
                minWidth: 120,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#FFF",
                  fontSize: 14,
                }}
              >
                🏅 Selos
              </Text>

              <Text
                style={{
                  color: "#FFF",
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                {gameState.achievements.length}
              </Text>
            </View>
          </View>

          {gameState.personalGoal && (
            <View
              style={{
                marginTop: 16,
              }}
            >
              <Text>🎯 Meta: {gameState.personalGoal.name}</Text>

              <Text>
                R$ {gameState.personalGoal.currentAmount.toFixed(0)}
                {" / R$ "}
                {gameState.personalGoal.targetAmount}
              </Text>
            </View>
          )}
        </View>
      )}

      <MonthlyActions />
    </ScrollView>
  );
}
