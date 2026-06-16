import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { COLORS } from "@/constants/colors";
import { useGame } from "@/context/GameContext";

export default function PetInteraction() {
  const { gameState, updateGameState } = useGame();

  const [lastInteraction, setLastInteraction] = useState("");
  const [interactionMessage, setInteractionMessage] = useState("");

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

  const selectedPet = pets[gameState.selectedPet as keyof typeof pets];

  const needsVet = gameState.petHealth <= 0;

  const interactions = [
    {
      id: "feed",
      name: "Alimentar",
      emoji: "🍖",
      cost: 3,
      healthBonus: 10,
      happinessBonus: 5,
      message: `${selectedPet?.name} adorou a comida! Está mais forte e feliz!`,
    },
    {
      id: "play",
      name: "Brincar",
      emoji: "🎾",
      cost: 2,
      healthBonus: 5,
      happinessBonus: 15,
      message: `Que divertido! ${selectedPet?.name} adora brincar com você!`,
    },
    {
      id: "groom",
      name: "Cuidar",
      emoji: "🧼",
      cost: 4,
      healthBonus: 15,
      happinessBonus: 8,
      message: `${selectedPet?.name} está limpinho e cheiroso!`,
    },
    {
      id: "train",
      name: "Treinar",
      emoji: "🎯",
      cost: 5,
      healthBonus: 8,
      happinessBonus: 12,
      levelBonus: 0.1,
      message: `${selectedPet?.name} aprendeu algo novo!`,
    },
    {
      id: "cuddle",
      name: "Carinho",
      emoji: "💝",
      cost: 0,
      healthBonus: 3,
      happinessBonus: 10,
      message: `${selectedPet?.name} se sente muito amado!`,
    },
  ];

  const vetAction = {
    id: "vet",
    name: "Veterinário",
    emoji: "🏥",
    cost: 40,
    healthBonus: 50,
    happinessBonus: 20,
  };

  const handleInteraction = (interaction: any) => {
    if (interaction.cost > gameState.balance) {
      return;
    }

    let newHealth = Math.min(
      100,
      gameState.petHealth + interaction.healthBonus,
    );

    let newHappiness = Math.min(
      100,
      gameState.petHappiness + interaction.happinessBonus,
    );

    const levelIncrease = interaction.levelBonus || 0;

    const newLevel = gameState.petLevel + levelIncrease;

    if (interaction.id === "vet" && gameState.petHealth <= 0) {
      newHealth = Math.max(50, newHealth);
    }

    const newAchievements = [...gameState.achievements];

    if (
      newHealth === 100 &&
      gameState.currentMonth > 1 &&
      !newAchievements.includes("pet_master")
    ) {
      newAchievements.push("pet_master");
    }

    updateGameState({
      balance: gameState.balance - interaction.cost,

      petHealth: newHealth,

      petHappiness: newHappiness,

      petLevel: newLevel,

      achievements: newAchievements,

      currentMonthExtraExpenses: {
        ...gameState.currentMonthExtraExpenses,
        petCare: gameState.currentMonthExtraExpenses.petCare + interaction.cost,
      },
    });

    setLastInteraction(interaction.id);
    setInteractionMessage(interaction.message || "Interação realizada!");

    setTimeout(() => {
      setLastInteraction("");
      setInteractionMessage("");
    }, 3000);
  };

  const handleParentLoan = () => {
    updateGameState({
      balance: gameState.balance + 40,

      parentLoan: {
        amount: 40,
        reason: `Veterinário para ${selectedPet?.name}`,
      },
    });

    setInteractionMessage("Seus pais emprestaram R$ 40 para ajudar!");
  };

  const getPetMood = () => {
    const avg = (gameState.petHealth + gameState.petHappiness) / 2;

    if (gameState.petHealth <= 0) {
      return {
        emoji: "🚨",
        mood: "Muito Doente",
      };
    }

    if (avg >= 80) {
      return {
        emoji: "😍",
        mood: "Muito Feliz",
      };
    }

    if (avg >= 60) {
      return {
        emoji: "😊",
        mood: "Feliz",
      };
    }

    if (avg >= 40) {
      return {
        emoji: "😐",
        mood: "Normal",
      };
    }

    if (avg >= 20) {
      return {
        emoji: "😟",
        mood: "Triste",
      };
    }

    return {
      emoji: "😢",
      mood: "Muito Triste",
    };
  };

  const petMood = getPetMood();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>
          {needsVet
            ? "🚨 EMERGÊNCIA VETERINÁRIA 🚨"
            : `Cuidar do ${selectedPet?.name}`}
        </Text>

        <View style={styles.petBox}>
          <Text style={styles.petEmoji}>{selectedPet?.emoji}</Text>

          <Text style={styles.petName}>{selectedPet?.name}</Text>

          <Text style={styles.petLevel}>
            Nível {Math.floor(gameState.petLevel)}
          </Text>

          <View style={styles.moodBox}>
            <Text style={styles.moodText}>
              {petMood.emoji} {petMood.mood}
            </Text>
          </View>
        </View>

        <View style={styles.statusContainer}>
          <View style={styles.statusCard}>
            <Text style={styles.statusLabel}>❤️ Saúde</Text>

            <Text style={styles.statusValue}>
              {gameState.petHealth.toFixed(0)}%
            </Text>
          </View>

          <View style={styles.statusCard}>
            <Text style={styles.statusLabel}>😊 Felicidade</Text>

            <Text style={styles.statusValue}>
              {gameState.petHappiness.toFixed(0)}%
            </Text>
          </View>
        </View>

        {interactionMessage !== "" && (
          <View style={styles.messageBox}>
            <Text style={styles.messageText}>{interactionMessage}</Text>
          </View>
        )}

        {needsVet && (
          <View style={styles.emergencyBox}>
            <Text style={styles.emergencyTitle}>
              🚨 Seu pet precisa de veterinário!
            </Text>

            <Text style={styles.emergencyText}>Custo: R$ 40</Text>

            <Text style={styles.emergencyText}>
              Seu saldo: R$ {gameState.balance}
            </Text>

            {gameState.balance >= 40 ? (
              <TouchableOpacity
                style={styles.vetButton}
                onPress={() => handleInteraction(vetAction)}
              >
                <Text style={styles.buttonText}>🏥 Levar ao Veterinário</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.loanButton}
                onPress={handleParentLoan}
              >
                <Text style={styles.buttonText}>🆘 Pedir ajuda aos pais</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {!needsVet && (
          <>
            <Text style={styles.sectionTitle}>Como deseja cuidar do pet?</Text>

            {interactions.map((interaction) => {
              const canAfford = interaction.cost <= gameState.balance;

              return (
                <TouchableOpacity
                  key={interaction.id}
                  disabled={!canAfford}
                  style={[
                    styles.actionButton,
                    !canAfford && styles.actionButtonDisabled,
                  ]}
                  onPress={() => handleInteraction(interaction)}
                >
                  <Text style={styles.actionEmoji}>{interaction.emoji}</Text>

                  <View style={{ flex: 1 }}>
                    <Text style={styles.actionTitle}>{interaction.name}</Text>

                    <Text style={styles.actionCost}>
                      {interaction.cost === 0
                        ? "Grátis"
                        : `R$ ${interaction.cost}`}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: COLORS.border,
    padding: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: COLORS.dark,
    marginBottom: 20,
  },

  petBox: {
    alignItems: "center",
    marginBottom: 20,
  },

  petEmoji: {
    fontSize: 64,
  },

  petName: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.dark,
    marginTop: 8,
  },

  petLevel: {
    fontSize: 16,
    color: COLORS.darkAccent,
    marginTop: 4,
  },

  moodBox: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    marginTop: 10,
  },

  moodText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.dark,
  },

  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 10,
  },

  statusCard: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  statusLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.dark,
  },

  statusValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.primary,
    marginTop: 4,
  },

  messageBox: {
    backgroundColor: "#E8F8E8",
    borderWidth: 2,
    borderColor: COLORS.secondary,
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
  },

  messageText: {
    textAlign: "center",
    color: COLORS.dark,
    fontWeight: "600",
  },

  emergencyBox: {
    backgroundColor: "#FFE5E5",
    borderWidth: 2,
    borderColor: "#FF4444",
    borderRadius: 10,
    padding: 16,
  },

  emergencyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#CC0000",
    marginBottom: 10,
  },

  emergencyText: {
    textAlign: "center",
    marginBottom: 8,
    color: COLORS.dark,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: COLORS.dark,
    marginBottom: 15,
  },

  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.background,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },

  actionButtonDisabled: {
    opacity: 0.4,
  },

  actionEmoji: {
    fontSize: 32,
    marginRight: 12,
  },

  actionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.dark,
  },

  actionCost: {
    fontSize: 14,
    color: COLORS.darkAccent,
    marginTop: 2,
  },

  vetButton: {
    backgroundColor: "#D32F2F",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 12,
  },

  loanButton: {
    backgroundColor: "#FF9800",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 12,
  },

  buttonText: {
    color: COLORS.white,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
