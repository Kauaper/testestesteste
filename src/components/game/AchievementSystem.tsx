import { useEffect, useState } from "react";

import { StyleSheet, Text, View } from "react-native";

import { COLORS } from "@/constants/colors";
import { useGame } from "@/context/GameContext";

export default function AchievementSystem() {
  const { gameState, updateGameState } = useGame();

  const [showNewAchievement, setShowNewAchievement] = useState("");
  const achievements = [
    {
      id: "first_investment",
      name: "Primeira Semente",
      emoji: "🌱",
      description: "Guardou dinheiro pela primeira vez!",
    },

    {
      id: "pet_master",
      name: "Amigo dos Bichos",
      emoji: "🐾",
      description: "Manteve seu pet com 100% de saúde!",
    },

    {
      id: "goal_setter",
      name: "Sonhador",
      emoji: "🎯",
      description: "Criou sua primeira meta!",
    },

    {
      id: "saver",
      name: "Cofre de Ouro",
      emoji: "💎",
      description: "Juntou mais de R$100!",
    },

    {
      id: "helper",
      name: "Anjo da Guarda",
      emoji: "😇",
      description: "Ajudou alguém e ganhou dinheiro!",
    },

    {
      id: "resist_temptation",
      name: "Super Forte",
      emoji: "🛡️",
      description: "Resistiu a uma tentação!",
    },

    {
      id: "goal_achiever",
      name: "Conquistador",
      emoji: "🏅",
      description: "Realizou seu sonho!",
    },

    {
      id: "pet_lover",
      name: "Coração Animal",
      emoji: "💝",
      description: "Gastou mais de R$50 com pet!",
    },

    {
      id: "smart_spender",
      name: "Cérebro Financeiro",
      emoji: "🧠",
      description: "Gastou com inteligência!",
    },

    {
      id: "social_butterfly",
      name: "Amizade Dourada",
      emoji: "🦋",
      description: "Investiu nas amizades!",
    },

    {
      id: "emergency_prepared",
      name: "Sempre Pronto",
      emoji: "🚨",
      description: "Lidou com emergências!",
    },

    {
      id: "growth_expert",
      name: "Mago do Crescimento",
      emoji: "📈",
      description: "Dominou investimentos!",
    },

    {
      id: "balanced_life",
      name: "Mestre do Equilíbrio",
      emoji: "⚖️",
      description: "Equilibrou tudo!",
    },

    {
      id: "wise_chooser",
      name: "Sábio das Decisões",
      emoji: "🦉",
      description: "Tomou ótimas decisões!",
    },

    {
      id: "generous_heart",
      name: "Coração Gigante",
      emoji: "❤️",
      description: "Ajudou muitas pessoas!",
    },

    {
      id: "future_planner",
      name: "Vidente Financeiro",
      emoji: "🔮",
      description: "Pensou no futuro!",
    },
  ];
  const checkAchievements = () => {
    const newAchievements: string[] = [];

    if (
      !gameState.achievements.includes("pet_master") &&
      gameState.petHealth === 100 &&
      gameState.currentMonth > 1
    ) {
      newAchievements.push("pet_master");
    }

    if (
      !gameState.achievements.includes("goal_setter") &&
      gameState.personalGoal
    ) {
      newAchievements.push("goal_setter");
    }

    if (
      !gameState.achievements.includes("goal_achiever") &&
      gameState.personalGoal &&
      gameState.personalGoal.currentAmount >=
        gameState.personalGoal.targetAmount
    ) {
      newAchievements.push("goal_achiever");
    }

    if (
      !gameState.achievements.includes("emergency_prepared") &&
      gameState.parentLoan.amount > 0
    ) {
      newAchievements.push("emergency_prepared");
    }

    if (newAchievements.length > 0) {
      const updatedAchievements = [
        ...gameState.achievements,
        ...newAchievements,
      ];

      updateGameState({
        achievements: updatedAchievements,
      });

      setShowNewAchievement(newAchievements[0]);

      setTimeout(() => {
        setShowNewAchievement("");
      }, 3000);
    }
  };

  useEffect(() => {
    checkAchievements();
  }, [
    gameState.petHealth,
    gameState.personalGoal,
    gameState.parentLoan,
    gameState.balance,
    gameState.investmentBalance,
  ]);
  if (!showNewAchievement) {
    return null;
  }

  const achievement = achievements.find((a) => a.id === showNewAchievement);

  if (!achievement) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.emoji}>{achievement.emoji}</Text>

        <Text style={styles.title}>🏆 CONQUISTA!</Text>

        <Text style={styles.name}>{achievement.name}</Text>

        <Text style={styles.description}>{achievement.description}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    zIndex: 999,
  },

  card: {
    backgroundColor: "#FFF3B0",
    borderRadius: 16,
    padding: 16,
    borderWidth: 3,
    borderColor: "#F4C430",
    alignItems: "center",
    elevation: 8,
  },

  emoji: {
    fontSize: 48,
    marginBottom: 8,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.dark,
    marginBottom: 6,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.dark,
    textAlign: "center",
    marginBottom: 6,
  },

  description: {
    fontSize: 14,
    color: COLORS.darkAccent,
    textAlign: "center",
  },
});
