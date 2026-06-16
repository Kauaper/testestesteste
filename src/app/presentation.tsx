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

export default function PresentationScreen() {
  const { gameState } = useGame();
  const [currentStep, setCurrentStep] = useState(0);

  const childContent = [
    {
      title: `Oi, ${gameState.playerName}!`,
      content: `Que incrível ter você no CooperAção Kids! Você tem ${gameState.playerAge} anos e está na idade perfeita para começar a aprender sobre dinheiro de uma forma super divertida!`,
      emoji: "😊",
    },
    {
      title: "Sua Mesada Especial",
      content: `Como você ainda é uma criança, seus pais te dão uma mesada de R$ ${gameState.monthlyIncome} por mês. Isso é seu tesouro! Vamos aprender a usar esse dinheiro de forma inteligente e divertida!`,
      emoji: "👨‍👩‍👧‍👦",
    },
    {
      title: "Aventura do Aprendizado!",
      content:
        "No CooperAção Kids você vai descobrir como poupar, gastar com sabedoria e fazer seu dinheiro crescer como mágica! E o mais legal: vai cuidar de um bichinho virtual super fofo!",
      emoji: "🎮",
    },
  ];

  const teenContent = [
    {
      title: `Fala, ${gameState.playerName}!`,
      content: `Show de bola te conhecer no CooperAção Kids! Você tem ${gameState.playerAge} anos e já está pronto(a) para encarar o mundo financeiro como um verdadeiro jovem empreendedor!`,
      emoji: "😎",
    },
    {
      title: "Salário de Jovem Aprendiz",
      content: `Como jovem aprendiz, você ganha R$ ${gameState.monthlyIncome} por mês! Agora você tem uma grana própria e pode aprender a administrar como um chefe!`,
      emoji: "💪",
    },
    {
      title: "Sua Missão Financeira",
      content:
        "No CooperAção Kids você vai dominar orçamento, poupança, investimentos e responsabilidades. E ainda vai cuidar de um pet virtual que vai depender das suas decisões financeiras!",
      emoji: "🎯",
    },
  ];

  const content = gameState.isChild ? childContent : teenContent;

  const handleNext = () => {
    if (currentStep < content.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push("/character-selection");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.emoji}>{content[currentStep].emoji}</Text>

          <Text style={styles.title}>{content[currentStep].title}</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.messageBox}>
            <Text style={styles.message}>{content[currentStep].content}</Text>
          </View>

          <View style={styles.dots}>
            {content.map((_, index) => (
              <View
                key={index}
                style={[styles.dot, index === currentStep && styles.activeDot]}
              />
            ))}
          </View>

          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>
              {currentStep < content.length - 1
                ? "Continuar"
                : "Escolher Personagem!"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D5E72C",
    justifyContent: "center",
    padding: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 4,
    borderColor: "#00353B",
    overflow: "hidden",
  },

  header: {
    backgroundColor: "#2FBFA0",
    padding: 24,
    alignItems: "center",
  },

  emoji: {
    fontSize: 72,
    marginBottom: 12,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },

  content: {
    padding: 24,
  },

  messageBox: {
    backgroundColor: "#D5E72C",
    borderWidth: 2,
    borderColor: "#00353B",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },

  message: {
    fontSize: 18,
    textAlign: "center",
    color: "#00353B",
    lineHeight: 28,
  },

  dots: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24,
  },

  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#D1D5DB",
    marginHorizontal: 6,
  },

  activeDot: {
    backgroundColor: "#2FBFA0",
  },

  button: {
    backgroundColor: "#7FC241",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
