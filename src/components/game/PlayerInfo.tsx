import { StyleSheet, Text, View } from "react-native";

import { COLORS } from "@/constants/colors";
import { useGame } from "@/context/GameContext";

export default function PlayerInfo() {
  const { gameState } = useGame();

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

  const progressPercentage = (gameState.currentMonth / 12) * 100;
  const ProgressBar = ({ value }: { value: number }) => (
    <View style={styles.progressBackground}>
      <View
        style={[
          styles.progressFill,
          {
            width: `${Math.max(0, Math.min(100, value))}%`,
          },
        ]}
      />
    </View>
  );
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{selectedPet?.emoji} Meu Dinheiro</Text>

        <Text style={styles.playerInfo}>{gameState.playerName}</Text>

        <Text style={styles.playerSubInfo}>
          cuidando do {selectedPet?.name}
        </Text>

        <Text style={styles.playerSubInfo}>
          Custo mensal: R$ {selectedPet?.cost}
        </Text>

        <View style={styles.moneyBox}>
          <Text style={styles.moneyLabel}>💰 Na Carteira</Text>

          <Text style={styles.moneyValue}>
            R$
            {gameState.balance.toFixed(0)}
          </Text>
        </View>

        <View style={styles.moneyBox}>
          <Text style={styles.moneyLabel}>🌱 Guardado</Text>

          <Text style={styles.investmentValue}>
            R$
            {gameState.investmentBalance.toFixed(0)}
          </Text>
        </View>

        <View style={styles.totalBox}>
          <Text style={styles.totalLabel}>⭐ TOTAL</Text>

          <Text style={styles.totalValue}>
            R$
            {(gameState.balance + gameState.investmentBalance).toFixed(0)}
          </Text>
        </View>
        {gameState.personalGoal && (
          <View style={styles.goalBox}>
            <Text style={styles.goalTitle}>
              🎯 Meta: {gameState.personalGoal.name}
            </Text>

            <Text style={styles.goalValue}>
              R$
              {gameState.personalGoal.currentAmount.toFixed(0)}
              {" / "}
              R$
              {gameState.personalGoal.targetAmount}
            </Text>

            <ProgressBar
              value={
                (gameState.personalGoal.currentAmount /
                  gameState.personalGoal.targetAmount) *
                100
              }
            />
          </View>
        )}
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{selectedPet?.emoji} Status do Pet</Text>

        <Text style={styles.petEmoji}>{selectedPet?.emoji}</Text>

        <Text style={styles.petLevel}>
          Nível {Math.floor(gameState.petLevel)}
        </Text>

        <View style={styles.statusSection}>
          <Text style={styles.statusLabel}>❤️ Saúde</Text>

          <Text style={styles.statusValue}>
            {gameState.petHealth.toFixed(0)}%
          </Text>

          <ProgressBar value={gameState.petHealth} />
        </View>

        <View style={styles.statusSection}>
          <Text style={styles.statusLabel}>😊 Felicidade</Text>

          <Text style={styles.statusValue}>
            {gameState.petHappiness.toFixed(0)}%
          </Text>

          <ProgressBar value={gameState.petHappiness} />
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🗓️ Progresso da Aventura</Text>

        <Text style={styles.monthText}>Mês {gameState.currentMonth} de 12</Text>

        <Text style={styles.progressText}>
          {progressPercentage.toFixed(0)}% da jornada completa
        </Text>

        <ProgressBar value={progressPercentage} />

        <Text style={styles.remainingText}>
          {12 - gameState.currentMonth + 1} meses restantes!
        </Text>

        {gameState.achievements.length > 0 && (
          <View style={styles.achievementBox}>
            <Text style={styles.achievementTitle}>🏅 Conquistas</Text>

            <Text style={styles.achievementCount}>
              {gameState.achievements.length}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    gap: 16,
  },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: COLORS.border,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.dark,
    textAlign: "center",
    marginBottom: 16,
  },

  playerInfo: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.dark,
  },

  playerSubInfo: {
    textAlign: "center",
    color: COLORS.darkAccent,
    marginTop: 4,
  },

  moneyBox: {
    marginTop: 12,
    backgroundColor: "#F8F8F8",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  moneyLabel: {
    color: COLORS.darkAccent,
  },

  moneyValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.secondary,
  },

  investmentValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.primary,
  },

  totalBox: {
    marginTop: 12,
    backgroundColor: COLORS.background,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  totalLabel: {
    fontWeight: "bold",
    color: COLORS.dark,
  },

  totalValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.dark,
  },

  goalBox: {
    marginTop: 12,
  },

  goalTitle: {
    fontWeight: "bold",
    color: COLORS.dark,
  },

  goalValue: {
    marginVertical: 6,
    color: COLORS.darkAccent,
  },

  petEmoji: {
    textAlign: "center",
    fontSize: 50,
  },

  petLevel: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 16,
    color: COLORS.dark,
  },

  statusSection: {
    marginBottom: 16,
  },

  statusLabel: {
    color: COLORS.dark,
    fontWeight: "600",
  },

  statusValue: {
    color: COLORS.darkAccent,
    marginBottom: 4,
  },

  progressBackground: {
    height: 10,
    backgroundColor: "#DDD",
    borderRadius: 20,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: COLORS.primary,
  },

  monthText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    color: COLORS.dark,
  },

  progressText: {
    textAlign: "center",
    color: COLORS.darkAccent,
    marginVertical: 8,
  },

  remainingText: {
    textAlign: "center",
    marginTop: 8,
    color: COLORS.primary,
    fontWeight: "bold",
  },

  achievementBox: {
    marginTop: 12,
    backgroundColor: "#FFF3B0",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
  },

  achievementTitle: {
    fontWeight: "bold",
    color: COLORS.dark,
  },

  achievementCount: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.dark,
  },
});
