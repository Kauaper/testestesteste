import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { COLORS } from "@/constants/colors";
import { useGame } from "@/context/GameContext";

export default function VisualPiggyBank() {
  const { gameState, updateGameState } = useGame();

  const [depositAmount, setDepositAmount] = useState("");
  const [showAnimation, setShowAnimation] = useState(false);

  const [showCreateGoal, setShowCreateGoal] = useState(false);

  const [goalName, setGoalName] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [goalDescription, setGoalDescription] = useState("");

  const handleCreateGoal = () => {
    if (!goalName || !goalAmount || parseFloat(goalAmount) <= 0) {
      return;
    }

    updateGameState({
      personalGoal: {
        name: goalName,
        targetAmount: parseFloat(goalAmount),
        currentAmount: 0,
        description: goalDescription,
      },
    });

    setShowCreateGoal(false);

    setGoalName("");
    setGoalAmount("");
    setGoalDescription("");
  };

  const handleDeposit = () => {
    const amount = parseFloat(depositAmount);

    if (
      !amount ||
      amount <= 0 ||
      amount > gameState.balance ||
      !gameState.personalGoal
    ) {
      return;
    }

    setShowAnimation(true);

    setTimeout(() => {
      const newGoalAmount = Math.min(
        gameState.personalGoal!.currentAmount + amount,
        gameState.personalGoal!.targetAmount,
      );

      updateGameState({
        balance: gameState.balance - amount,

        personalGoal: {
          ...gameState.personalGoal!,
          currentAmount: newGoalAmount,
        },

        currentMonthExtraExpenses: {
          ...gameState.currentMonthExtraExpenses,
          goalDeposits:
            gameState.currentMonthExtraExpenses.goalDeposits + amount,
        },
      });

      setDepositAmount("");
      setShowAnimation(false);
    }, 1000);
  };

  const suggestedGoals = [
    {
      name: "Bicicleta Nova",
      amount: 200,
      emoji: "🚲",
    },
    {
      name: "Videogame",
      amount: 300,
      emoji: "🎮",
    },
    {
      name: "Tablet",
      amount: 400,
      emoji: "📱",
    },
    {
      name: "Roupas Legais",
      amount: 150,
      emoji: "👕",
    },
    {
      name: "Kit de Arte",
      amount: 80,
      emoji: "🎨",
    },
  ];

  // SEM META CRIADA
  if (!gameState.personalGoal && !showCreateGoal) {
    return (
      <View style={styles.card}>
        <Text style={styles.mainTitle}>🎯 Minha Meta Pessoal 🎯</Text>

        <Text style={styles.bigEmoji}>💭</Text>

        <Text style={styles.goalTitle}>O que você quer conquistar?</Text>

        <Text style={styles.goalDescription}>
          Defina uma meta especial para economizar e realizar seus sonhos!
        </Text>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => setShowCreateGoal(true)}
        >
          <Text style={styles.buttonText}>Criar Minha Meta!</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // CRIANDO META
  if (showCreateGoal) {
    return (
      <ScrollView>
        <View style={styles.card}>
          <Text style={styles.mainTitle}>✨ Criar Minha Meta</Text>

          <Text style={styles.label}>O que você quer?</Text>

          <TextInput
            style={styles.input}
            value={goalName}
            onChangeText={setGoalName}
            placeholder="Ex: Bicicleta Nova"
          />

          <Text style={styles.label}>Quanto custa?</Text>

          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={goalAmount}
            onChangeText={setGoalAmount}
            placeholder="200"
          />

          <Text style={styles.label}>Por que é importante?</Text>

          <TextInput
            style={styles.input}
            value={goalDescription}
            onChangeText={setGoalDescription}
            placeholder="Para passear com os amigos"
          />

          <Text style={styles.sectionTitle}>Sugestões Populares</Text>

          {suggestedGoals.map((goal) => (
            <TouchableOpacity
              key={goal.name}
              style={styles.suggestionCard}
              onPress={() => {
                setGoalName(goal.name);
                setGoalAmount(goal.amount.toString());
              }}
            >
              <Text style={styles.suggestionText}>
                {goal.emoji} {goal.name} - R$ {goal.amount}
              </Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleCreateGoal}
          >
            <Text style={styles.buttonText}>Criar Meta!</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => setShowCreateGoal(false)}
          >
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  const goal = gameState.personalGoal;

  if (!goal) {
    return null;
  }

  const progress = (goal.currentAmount / goal.targetAmount) * 100;

  const isCompleted = progress >= 100;

  const remaining = goal.targetAmount - goal.currentAmount;

  const totalCoins = 20;

  const filledCoins = Math.floor((progress / 100) * totalCoins);

  return (
    <ScrollView>
      <View style={styles.card}>
        <Text style={styles.mainTitle}>🏦 Cofrinho: {goal.name}</Text>

        {isCompleted ? (
          <View style={styles.center}>
            <Text style={styles.trophy}>🏆</Text>

            <Text style={styles.completedTitle}>META CONQUISTADA!</Text>

            <Text style={styles.completedText}>
              Você conseguiu juntar
              {"\n"}
              R$ {goal.targetAmount}
            </Text>
          </View>
        ) : (
          <>
            <View style={styles.center}>
              <Text style={styles.pig}>🐷</Text>

              {showAnimation && <Text style={styles.moneyAnimation}>💰</Text>}

              <Text style={styles.savedMoney}>
                R$ {goal.currentAmount.toFixed(0)}
              </Text>

              <Text style={styles.progressText}>{progress.toFixed(0)}%</Text>
            </View>

            <View style={styles.progressBackground}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${Math.min(progress, 100)}%`,
                  },
                ]}
              />
            </View>

            <View style={styles.coinsContainer}>
              {Array.from({
                length: totalCoins,
              }).map((_, index) => (
                <Text
                  key={index}
                  style={{
                    fontSize: 20,
                    opacity: index < filledCoins ? 1 : 0.2,
                  }}
                >
                  🪙
                </Text>
              ))}
            </View>

            <Text style={styles.remaining}>
              Faltam R$ {remaining.toFixed(0)}
            </Text>

            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={depositAmount}
              onChangeText={setDepositAmount}
              placeholder="Quanto deseja guardar?"
            />

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleDeposit}
            >
              <Text style={styles.buttonText}>Depositar no Cofrinho</Text>
            </TouchableOpacity>

            <Text style={styles.availableMoney}>
              Disponível: R$ {gameState.balance.toFixed(0)}
            </Text>
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    margin: 16,
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#C084FC",
  },

  center: {
    alignItems: "center",
  },

  mainTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: COLORS.dark,
    marginBottom: 16,
  },

  bigEmoji: {
    fontSize: 70,
    textAlign: "center",
    marginBottom: 10,
  },

  goalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: COLORS.dark,
    marginBottom: 10,
  },

  goalDescription: {
    textAlign: "center",
    color: COLORS.darkAccent,
    marginBottom: 20,
  },

  label: {
    fontWeight: "bold",
    color: COLORS.dark,
    marginBottom: 6,
    marginTop: 10,
  },

  input: {
    borderWidth: 2,
    borderColor: "#C084FC",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 10,
    backgroundColor: COLORS.white,
  },

  sectionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: COLORS.dark,
    marginTop: 15,
    marginBottom: 10,
  },

  suggestionCard: {
    backgroundColor: "#F3E8FF",
    borderWidth: 1,
    borderColor: "#C084FC",
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },

  suggestionText: {
    color: "#6B21A8",
    fontWeight: "600",
  },

  primaryButton: {
    backgroundColor: "#9333EA",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
  },

  secondaryButton: {
    backgroundColor: "#6B7280",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 16,
  },

  pig: {
    fontSize: 80,
  },

  trophy: {
    fontSize: 90,
  },

  completedTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.success,
    textAlign: "center",
    marginVertical: 10,
  },

  completedText: {
    textAlign: "center",
    color: COLORS.dark,
    fontSize: 16,
  },

  moneyAnimation: {
    fontSize: 30,
    marginTop: 5,
  },

  savedMoney: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#9333EA",
    marginTop: 10,
  },

  progressText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.dark,
    marginTop: 5,
  },

  progressBackground: {
    height: 18,
    backgroundColor: "#E5E7EB",
    borderRadius: 20,
    overflow: "hidden",
    marginTop: 15,
    marginBottom: 15,
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#9333EA",
  },

  coinsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 4,
    marginBottom: 15,
  },

  remaining: {
    textAlign: "center",
    fontWeight: "bold",
    color: COLORS.dark,
    marginBottom: 15,
  },

  availableMoney: {
    textAlign: "center",
    marginTop: 10,
    color: COLORS.darkAccent,
  },
});
