import { ScrollView, StyleSheet, Text, View } from "react-native";

import { COLORS } from "@/constants/colors";
import { useGame } from "@/context/GameContext";

export default function AchievementsPanel() {
  const { gameState } = useGame();
  const allAchievements = [
    {
      id: "first_investment",
      name: "Primeiro Investimento",
      emoji: "🌱",
      description: "Guardou dinheiro pela primeira vez!",
      requirement: "Faça seu primeiro investimento",
    },

    {
      id: "pet_master",
      name: "Mestre dos Pets",
      emoji: "🏆",
      description: "Manteve seu pet com 100% de saúde!",
      requirement: "Pet com saúde máxima",
    },

    {
      id: "goal_setter",
      name: "Sonhador",
      emoji: "🎯",
      description: "Criou sua primeira meta!",
      requirement: "Defina uma meta pessoal",
    },

    {
      id: "saver",
      name: "Poupador Expert",
      emoji: "💎",
      description: "Economizou mais de R$ 100!",
      requirement: "Tenha R$ 100 guardados",
    },

    {
      id: "helper",
      name: "Anjinho Bondoso",
      emoji: "😇",
      description: "Ajudou alguém e ganhou dinheiro!",
      requirement: "Aceite uma oportunidade",
    },

    {
      id: "resist_temptation",
      name: "Resistente",
      emoji: "🛡️",
      description: "Resistiu a uma tentação!",
      requirement: "Recuse uma oferta",
    },

    {
      id: "goal_achiever",
      name: "Realizador",
      emoji: "🏅",
      description: "Conquistou sua meta!",
      requirement: "Complete sua meta",
    },

    {
      id: "pet_lover",
      name: "Amor de Pet",
      emoji: "💝",
      description: "Gastou mais de R$ 50 cuidando do pet!",
      requirement: "Invista no pet",
    },
  ];
  const unlockedCount = gameState.achievements.length;

  const totalCount = allAchievements.length;

  const progressPercentage = (unlockedCount / totalCount) * 100;
  return (
    <View style={styles.card}>
      <Text style={styles.title}>🏆 Painel de Conquistas 🏆</Text>

      <Text style={styles.progressText}>
        {unlockedCount} / {totalCount} Conquistadas
      </Text>

      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${progressPercentage}%`,
            },
          ]}
        />
      </View>

      <Text style={styles.percent}>
        {progressPercentage.toFixed(0)}% Completo
      </Text>

      <ScrollView style={styles.list} nestedScrollEnabled>
        {allAchievements.map((achievement) => {
          const isUnlocked = gameState.achievements.includes(achievement.id);

          return (
            <View
              key={achievement.id}
              style={[
                styles.achievement,
                isUnlocked ? styles.unlocked : styles.locked,
              ]}
            >
              <Text style={styles.emoji}>
                {isUnlocked ? achievement.emoji : "🔒"}
              </Text>

              <View style={styles.info}>
                <Text style={styles.name}>{achievement.name}</Text>

                <Text style={styles.description}>
                  {isUnlocked
                    ? achievement.description
                    : achievement.requirement}
                </Text>
              </View>

              {isUnlocked && <Text style={styles.check}>✓</Text>}
            </View>
          );
        })}
      </ScrollView>
      {unlockedCount === totalCount && (
        <View style={styles.masterBox}>
          <Text style={styles.masterTitle}>🎉 MESTRE SUPREMO!</Text>

          <Text style={styles.masterText}>
            Você desbloqueou todas as conquistas!
          </Text>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: "#FACC15",
  },

  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.dark,
  },

  progressText: {
    textAlign: "center",
    marginTop: 12,
    fontWeight: "bold",
  },

  progressBar: {
    height: 12,
    backgroundColor: "#E5E7EB",
    borderRadius: 999,
    marginTop: 10,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#EAB308",
  },

  percent: {
    textAlign: "center",
    marginTop: 8,
    color: COLORS.darkAccent,
  },

  list: {
    maxHeight: 400,
    marginTop: 16,
  },

  achievement: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },

  unlocked: {
    backgroundColor: "#FEF9C3",
  },

  locked: {
    backgroundColor: "#F3F4F6",
  },

  emoji: {
    fontSize: 28,
    marginRight: 12,
  },

  info: {
    flex: 1,
  },

  name: {
    fontWeight: "bold",
    color: COLORS.dark,
  },

  description: {
    fontSize: 12,
    color: COLORS.darkAccent,
    marginTop: 2,
  },

  check: {
    fontSize: 22,
    color: "#16A34A",
    fontWeight: "bold",
  },

  masterBox: {
    backgroundColor: "#FEF3C7",
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },

  masterTitle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    color: COLORS.dark,
  },

  masterText: {
    textAlign: "center",
    marginTop: 6,
    color: COLORS.dark,
  },
});
