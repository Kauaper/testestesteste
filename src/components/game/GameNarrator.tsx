import { useState } from "react";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { COLORS } from "@/constants/colors";
import { useGame } from "@/context/GameContext";

interface GameNarratorProps {
  onComplete: () => void;
}

export default function GameNarrator({ onComplete }: GameNarratorProps) {
  const { gameState } = useGame();

  const [currentDialogIndex, setCurrentDialogIndex] = useState(0);

  const pets = {
    dog: {
      name: "cachorrinho",
      emoji: "🐶",
    },

    cat: {
      name: "gatinho",
      emoji: "🐱",
    },

    hamster: {
      name: "hamster",
      emoji: "🐹",
    },

    fish: {
      name: "peixinho",
      emoji: "🐠",
    },

    bird: {
      name: "passarinho",
      emoji: "🐦",
    },

    turtle: {
      name: "tartaruga",
      emoji: "🐢",
    },
  };

  const pet = pets[gameState.selectedPet as keyof typeof pets];
  const getChapterStory = () => {
    const stories = [
      {
        title: "Capítulo 1: A Grande Aventura Começa! 🌟",

        narrator: "🎭",

        dialogs: [
          `Olá ${gameState.playerName}! Eu sou o Capitão Cofrinho, seu guia nesta aventura incrível!`,

          `Você acabou de adotar seu ${pet?.name} ${pet?.emoji} e ele está super animado para conhecer você!`,

          `Você ganhou R$ ${gameState.monthlyIncome} este mês. Agora vamos aprender os segredos do dinheiro juntos!`,

          `Lembre-se: seu bichinho conta com você todos os meses. Ele precisa de comida, carinho e cuidados!`,
        ],

        lesson:
          "Todo dinheiro que ganhamos tem responsabilidades que vêm junto!",
      },

      {
        title: "Capítulo 2: Primeiras Tentações 🍭",

        narrator: "🎭",

        dialogs: [
          `${gameState.playerName}, você está indo muito bem!`,

          `Mas olha só... apareceu algo muito tentador para comprar este mês!`,

          `Sempre pense duas vezes antes de gastar.`,

          `Às vezes é melhor esperar e guardar dinheiro.`,
        ],

        lesson: "Resistir às tentações nos torna mais fortes!",
      },

      {
        title: "Capítulo 3: Amizades e Decisões 👫",

        narrator: "🎭",

        dialogs: [
          `Uau! Você chegou ao terceiro mês!`,

          `Agora você vai aprender sobre equilibrar diversão e responsabilidades.`,

          `Seu ${pet?.name} também precisa de atenção.`,

          `Bons amigos entendem quando precisamos economizar.`,
        ],

        lesson: "Equilíbrio é a chave da felicidade!",
      },
      {
        title: "Capítulo 4: O Poder de Ajudar 😇",

        narrator: "🎭",

        dialogs: [
          `${gameState.playerName}, você está se tornando um expert em dinheiro!`,

          `Este mês você vai descobrir algo mágico: ajudar pessoas também pode gerar oportunidades.`,

          `Trabalhar e ajudar traz felicidade e aprendizado.`,

          `Seu ${pet?.name} fica orgulhoso quando você faz boas ações!`,
        ],

        lesson: "Ajudar os outros sempre vale a pena!",
      },

      {
        title: "Capítulo 5: Doces Tentações 🍬",

        narrator: "🎭",

        dialogs: [
          `Chegamos na metade da aventura!`,

          `Mas cuidado... existe uma tentação muito doce esperando por você.`,

          `Seu ${pet?.name} torce para que você tome a melhor decisão.`,

          `Nem tudo que queremos agora é o melhor para o futuro.`,
        ],

        lesson: "Prazer imediato nem sempre é a melhor escolha.",
      },

      {
        title: "Capítulo 6: Responsabilidades Crescem 👔",

        narrator: "🎭",

        dialogs: [
          `${gameState.playerName}, você está crescendo!`,

          `E junto com o crescimento vêm responsabilidades.`,

          `Alguns gastos são necessários, mesmo quando não queremos.`,

          `Seu ${pet?.name} entende isso muito bem.`,
        ],

        lesson: "Precisamos diferenciar necessidade de desejo.",
      },

      {
        title: "Capítulo 7: Talentos que Rendem 🎨",

        narrator: "🎭",

        dialogs: [
          `Você está dominando o mundo das finanças!`,

          `Agora vai descobrir como talentos podem gerar dinheiro.`,

          `Todo mundo possui habilidades especiais.`,

          `Seu ${pet?.name} adora ver você evoluindo!`,
        ],

        lesson: "Nossos talentos podem abrir oportunidades incríveis.",
      },

      {
        title: "Capítulo 8: Moda vs Necessidade 👗",

        narrator: "🎭",

        dialogs: [
          `${gameState.playerName}, você está quase virando um mestre financeiro!`,

          `Este mês o desafio é distinguir aparência de necessidade.`,

          `Será que precisamos de tudo que achamos bonito?`,

          `Seu ${pet?.name} gosta de você exatamente como é.`,
        ],

        lesson: "Autoestima vale mais que qualquer produto.",
      },
      {
        title: "Capítulo 9: Aventuras e Amizades 🚌",

        narrator: "🎭",

        dialogs: [
          `Uau! Você chegou ao nono mês!`,

          `Agora é hora de aprender sobre experiências e amizades.`,

          `Memórias felizes são tesouros que ninguém pode roubar.`,

          `Seu ${pet?.name} gosta quando você se diverte com responsabilidade.`,
        ],

        lesson: "Investir em experiências também é importante.",
      },

      {
        title: "Capítulo 10: Honestidade Recompensa 💎",

        narrator: "🎭",

        dialogs: [
          `${gameState.playerName}, você está quase terminando sua jornada!`,

          `Este mês você aprenderá sobre honestidade.`,

          `Fazer a coisa certa nem sempre é fácil.`,

          `Mas honestidade sempre vale a pena.`,
        ],

        lesson: "Honestidade é um dos maiores tesouros que existe.",
      },

      {
        title: "Capítulo 11: Generosidade 💝",

        narrator: "🎭",

        dialogs: [
          `Penúltimo capítulo da aventura!`,

          `Agora vamos falar sobre generosidade.`,

          `Dividir o que temos multiplica a felicidade.`,

          `Seu ${pet?.name} sente o amor que você espalha pelo mundo.`,
        ],

        lesson: "Generosidade é um superpoder.",
      },

      {
        title: "Capítulo 12: O Grande Final! 🏆",

        narrator: "🎭",

        dialogs: [
          `${gameState.playerName}, chegou o último mês!`,

          `Você se tornou um verdadeiro mestre financeiro.`,

          `É hora de celebrar tudo que aprendeu.`,

          `Seu ${pet?.name} está muito orgulhoso de você!`,
        ],

        lesson: "O maior tesouro é tudo que você aprendeu durante a jornada.",
      },
    ];

    return stories[gameState.currentMonth - 1] || stories[0];
  };
  const story = getChapterStory();

  const currentDialog = story.dialogs[currentDialogIndex];

  const handleNextDialog = () => {
    if (currentDialogIndex < story.dialogs.length - 1) {
      setCurrentDialogIndex(currentDialogIndex + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.narrator}>{story.narrator}</Text>

        <Text style={styles.title}>{story.title}</Text>

        <View style={styles.dialogBox}>
          <Text style={styles.dialogText}>{currentDialog}</Text>
        </View>

        <View style={styles.dotsContainer}>
          {story.dialogs.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,

                index === currentDialogIndex && styles.activeDot,

                index < currentDialogIndex && styles.completedDot,
              ]}
            />
          ))}
        </View>
        {currentDialogIndex === story.dialogs.length - 1 && (
          <View style={styles.lessonBox}>
            <Text style={styles.lessonTitle}>🎯 Lição do Capítulo</Text>

            <Text style={styles.lessonText}>{story.lesson}</Text>
          </View>
        )}
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.skipText}>Pular História</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNextDialog}
          >
            <Text style={styles.nextText}>
              {currentDialogIndex < story.dialogs.length - 1
                ? "Continuar"
                : "Começar Mês!"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.border,
    padding: 20,
  },

  narrator: {
    fontSize: 60,
    textAlign: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.dark,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
  },

  dialogBox: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    padding: 20,
    minHeight: 120,
    justifyContent: "center",
  },

  dialogText: {
    textAlign: "center",
    fontSize: 18,
    lineHeight: 28,
    color: COLORS.dark,
  },

  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },

  dot: {
    width: 12,
    height: 12,
    borderRadius: 20,
    backgroundColor: "#D1D5DB",
    marginHorizontal: 4,
  },

  activeDot: {
    backgroundColor: COLORS.primary,
    transform: [{ scale: 1.3 }],
  },

  completedDot: {
    backgroundColor: COLORS.secondary,
  },

  lessonBox: {
    backgroundColor: "#F3E8FF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },

  lessonTitle: {
    textAlign: "center",
    fontWeight: "bold",
    color: COLORS.dark,
    marginBottom: 8,
    fontSize: 18,
  },

  lessonText: {
    textAlign: "center",
    color: COLORS.darkAccent,
    lineHeight: 22,
  },

  buttons: {
    flexDirection: "row",
    gap: 12,
  },

  skipButton: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: "#9CA3AF",
    borderRadius: 12,
    padding: 14,
  },

  skipText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#6B7280",
  },

  nextButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 14,
  },

  nextText: {
    textAlign: "center",
    fontWeight: "bold",
    color: COLORS.white,
  },
});
