import { useEffect, useState } from "react";

import { StyleSheet, Text, View } from "react-native";

import { COLORS } from "@/constants/colors";
import { useGame } from "@/context/GameContext";

interface Sticker {
  id: string;
  name: string;
  emoji: string;
  description: string;
  category: "bronze" | "silver" | "gold" | "special";
  requirement: string;
}

export default function CollectibleStickers() {
  const { gameState } = useGame();

  const [newSticker, setNewSticker] = useState("");

  const allStickers: Sticker[] = [
    {
      id: "first_investment",
      name: "Primeira Semente",
      emoji: "🌱",
      description: "Plantou sua primeira semente financeira!",
      category: "bronze",
      requirement: "Faça primeiro investimento",
    },

    {
      id: "pet_master",
      name: "Amigo dos Bichos",
      emoji: "🐾",
      description: "Cuidou super bem do seu pet!",
      category: "silver",
      requirement: "Pet com 100% saúde",
    },

    {
      id: "goal_setter",
      name: "Sonhador",
      emoji: "🎯",
      description: "Criou um sonho para alcançar!",
      category: "bronze",
      requirement: "Crie uma meta",
    },

    {
      id: "saver",
      name: "Cofre de Ouro",
      emoji: "💎",
      description: "Juntou uma fortuna incrível!",
      category: "gold",
      requirement: "Tenha R$ 100 total",
    },

    {
      id: "helper",
      name: "Anjo da Guarda",
      emoji: "😇",
      description: "Ajudou alguém em necessidade!",
      category: "special",
      requirement: "Aceite oportunidade de ajuda",
    },
    {
      id: "resist_temptation",
      name: "Super Forte",
      emoji: "🛡️",
      description: "Resistiu a uma tentação difícil!",
      category: "gold",
      requirement: "Recuse oferta tentadora",
    },

    {
      id: "goal_achiever",
      name: "Conquistador",
      emoji: "🏅",
      description: "Realizou seu sonho!",
      category: "gold",
      requirement: "Complete sua meta",
    },

    {
      id: "pet_lover",
      name: "Coração Animal",
      emoji: "💝",
      description: "Ama muito seu bichinho!",
      category: "silver",
      requirement: "Gaste R$ 50+ com pet",
    },

    {
      id: "smart_spender",
      name: "Cérebro Financeiro",
      emoji: "🧠",
      description: "Gastou com muita inteligência!",
      category: "gold",
      requirement: "Balance gastos bem",
    },

    {
      id: "social_butterfly",
      name: "Amizade Dourada",
      emoji: "🦋",
      description: "Investiu nas amizades com sabedoria!",
      category: "silver",
      requirement: "Gaste R$ 30-80 com amigos",
    },

    {
      id: "emergency_prepared",
      name: "Sempre Pronto",
      emoji: "🚨",
      description: "Enfrentou uma emergência!",
      category: "silver",
      requirement: "Lide com emergência",
    },

    {
      id: "growth_expert",
      name: "Mago do Crescimento",
      emoji: "📈",
      description: "Fez o dinheiro crescer magicamente!",
      category: "gold",
      requirement: "Investimento cresceu 20%",
    },

    {
      id: "balanced_life",
      name: "Mestre do Equilíbrio",
      emoji: "⚖️",
      description: "Equilibrou tudo perfeitamente!",
      category: "special",
      requirement: "Pet saudável + meta + amigos",
    },

    {
      id: "wise_chooser",
      name: "Sábio das Decisões",
      emoji: "🦉",
      description: "Tomou decisões super inteligentes!",
      category: "special",
      requirement: "4+ escolhas sábias",
    },

    {
      id: "generous_heart",
      name: "Coração Gigante",
      emoji: "❤️",
      description: "Ajudou muitas pessoas!",
      category: "special",
      requirement: "Ajude 2+ vezes",
    },

    {
      id: "future_planner",
      name: "Vidente Financeiro",
      emoji: "🔮",
      description: "Sempre pensou no futuro!",
      category: "special",
      requirement: "Invista consistentemente",
    },
  ];
  const unlockedStickers = allStickers.filter((sticker) =>
    gameState.achievements.includes(sticker.id),
  );

  const stickersByCategory = {
    bronze: unlockedStickers.filter((s) => s.category === "bronze"),

    silver: unlockedStickers.filter((s) => s.category === "silver"),

    gold: unlockedStickers.filter((s) => s.category === "gold"),

    special: unlockedStickers.filter((s) => s.category === "special"),
  };

  useEffect(() => {
    const lastCount = newSticker
      ? unlockedStickers.length - 1
      : unlockedStickers.length;

    if (unlockedStickers.length > lastCount) {
      const newest = unlockedStickers[unlockedStickers.length - 1];

      setNewSticker(newest.id);

      setTimeout(() => {
        setNewSticker("");
      }, 4000);
    }
  }, [gameState.achievements]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏷️ Coleção de Selos</Text>

      <Text style={styles.progressText}>
        {unlockedStickers.length} / {allStickers.length} Selos Coletados
      </Text>

      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${(unlockedStickers.length / allStickers.length) * 100}%`,
            },
          ]}
        />
      </View>
      {newSticker !== "" && (
        <View style={styles.newStickerBox}>
          <Text style={styles.newStickerTitle}>🎉 NOVO SELO!</Text>

          <Text style={styles.newStickerEmoji}>
            {allStickers.find((s) => s.id === newSticker)?.emoji}
          </Text>
        </View>
      )}
      {Object.entries(stickersByCategory).map(([category, stickers]) => (
        <View key={category} style={styles.categoryBox}>
          <Text style={styles.categoryTitle}>{category.toUpperCase()}</Text>

          {stickers.length > 0 ? (
            <View style={styles.stickerGrid}>
              {stickers.map((sticker) => (
                <View key={sticker.id} style={styles.stickerCard}>
                  <Text style={styles.stickerEmoji}>{sticker.emoji}</Text>

                  <Text style={styles.stickerName}>{sticker.name}</Text>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>🔒 Nenhum selo ainda</Text>
            </View>
          )}
        </View>
      ))}
      {unlockedStickers.length === allStickers.length && (
        <View style={styles.masterBox}>
          <Text style={styles.masterEmoji}>👑</Text>

          <Text style={styles.masterTitle}>COLECIONADOR SUPREMO</Text>

          <Text style={styles.masterText}>Você coletou todos os selos!</Text>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: COLORS.border,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.dark,
    textAlign: "center",
    marginBottom: 10,
  },

  progressText: {
    textAlign: "center",
    marginBottom: 10,
    color: COLORS.darkAccent,
    fontWeight: "600",
  },

  progressBar: {
    height: 10,
    backgroundColor: "#ddd",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 20,
  },

  progressFill: {
    height: "100%",
    backgroundColor: COLORS.primary,
  },

  newStickerBox: {
    backgroundColor: "#FFF6CC",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    alignItems: "center",
  },

  newStickerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },

  newStickerEmoji: {
    fontSize: 50,
    marginTop: 10,
  },

  categoryBox: {
    marginBottom: 20,
  },

  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: COLORS.dark,
  },

  stickerGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  stickerCard: {
    width: 90,
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: COLORS.background,
  },

  stickerEmoji: {
    fontSize: 30,
  },

  stickerName: {
    fontSize: 11,
    textAlign: "center",
    marginTop: 4,
  },

  emptyBox: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
  },

  emptyText: {
    textAlign: "center",
    color: "#666",
  },

  masterBox: {
    marginTop: 20,
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    backgroundColor: "#FFF7C2",
  },

  masterEmoji: {
    fontSize: 60,
  },

  masterTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
    color: COLORS.dark,
  },

  masterText: {
    marginTop: 6,
    color: COLORS.darkAccent,
  },
});
