import { useState } from "react";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { COLORS } from "@/constants/colors";
import { useGame } from "@/context/GameContext";

interface SurpriseEvent {
  id: string;
  title: string;
  description: string;
  emoji: string;

  options: {
    id: string;
    text: string;
    consequence: string;
    moneyChange: number;
    petHealthChange?: number;
    petHappinessChange?: number;
    lesson: string;
  }[];
}

interface SurpriseCardEventProps {
  onEventComplete: (result: any) => void;
}

export default function SurpriseCardEvent({
  onEventComplete,
}: SurpriseCardEventProps) {
  const { gameState } = useGame();

  const [selectedOption, setSelectedOption] = useState("");

  const [showResult, setShowResult] = useState(false);
  const monthlyEvents: SurpriseEvent[] = [
    {
      id: "friend_help",

      title: "Amigo Precisa de Ajuda!",

      description:
        "Seu melhor amigo esqueceu o dinheiro do lanche em casa e está com muita fome.",

      emoji: "😢",

      options: [
        {
          id: "share_money",

          text: "Emprestar R$ 5 para ele",

          consequence: "Seu amigo ficou muito grato e prometeu devolver!",

          moneyChange: -5,

          petHappinessChange: 10,

          lesson: "Ajudar amigos fortalece as amizades!",
        },

        {
          id: "share_snack",

          text: "Dividir seu lanche com ele",

          consequence: "Vocês dividiram e foi muito divertido comer juntos!",

          moneyChange: 0,

          petHappinessChange: 5,

          lesson: "Dividir pode ser mais valioso que emprestar dinheiro!",
        },

        {
          id: "say_no",

          text: "Dizer que não pode ajudar",

          consequence: "Seu amigo ficou triste, mas entendeu sua situação.",

          moneyChange: 0,

          petHappinessChange: -5,

          lesson: "Às vezes precisamos dizer não, mas podemos ser gentis.",
        },
      ],
    },
    {
      id: "broken_toy",

      title: "Brinquedo Quebrou!",

      description:
        "Seu brinquedo favorito quebrou bem na hora que você mais queria brincar!",

      emoji: "😭",

      options: [
        {
          id: "buy_new",
          text: "Comprar um novo (R$ 25)",

          consequence: "Você tem um brinquedo novinho, mas gastou bastante!",

          moneyChange: -25,

          petHappinessChange: 5,

          lesson: "Nem sempre precisamos substituir algo imediatamente.",
        },

        {
          id: "try_fix",

          text: "Tentar consertar com ajuda",

          consequence: "Com criatividade, você conseguiu consertar! Que legal!",

          moneyChange: -2,

          petHappinessChange: 15,

          lesson: "Criatividade pode economizar muito dinheiro!",
        },

        {
          id: "wait_save",

          text: "Esperar e economizar para um melhor",

          consequence:
            "Foi difícil esperar, mas você está juntando para algo especial!",

          moneyChange: 0,

          petHappinessChange: -5,

          lesson: "Esperar por algo melhor às vezes vale mais a pena!",
        },
      ],
    },

    {
      id: "find_money",

      title: "Dinheiro Encontrado!",

      description:
        "Você encontrou R$ 10 no chão! Mas tem uma pessoa procurando algo por perto...",

      emoji: "💰",

      options: [
        {
          id: "return_money",

          text: "Devolver para a pessoa",

          consequence:
            "A pessoa ficou muito grata e te deu R$ 15 de recompensa!",

          moneyChange: 15,

          petHappinessChange: 20,

          lesson: "Honestidade sempre é recompensada!",
        },

        {
          id: "keep_money",

          text: "Ficar com o dinheiro",

          consequence: "Você ficou com R$ 10, mas se sentiu mal por isso...",

          moneyChange: 10,

          petHappinessChange: -10,

          lesson: "Dinheiro ganho de forma errada não traz felicidade real.",
        },

        {
          id: "give_charity",

          text: "Doar para caridade",

          consequence: "Você doou o dinheiro e se sentiu incrível!",

          moneyChange: 0,

          petHappinessChange: 25,

          lesson: "Generosidade nos faz mais felizes que guardar dinheiro!",
        },
      ],
    },
  ];
  const currentEvent =
    monthlyEvents[gameState.currentMonth % monthlyEvents.length];

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleConfirm = () => {
    const option = currentEvent.options.find(
      (opt) => opt.id === selectedOption,
    );

    if (!option) return;

    setShowResult(true);

    setTimeout(() => {
      onEventComplete({
        option,

        moneyChange: option.moneyChange,

        petHealthChange: option.petHealthChange || 0,

        petHappinessChange: option.petHappinessChange || 0,
      });
    }, 2000);
  };

  const selectedOptionData = currentEvent.options.find(
    (opt) => opt.id === selectedOption,
  );
  if (showResult && selectedOptionData) {
    return (
      <View style={styles.card}>
        <View style={styles.resultHeader}>
          <Text style={styles.resultEmoji}>✨</Text>

          <Text style={styles.resultTitle}>Resultado da Sua Escolha</Text>
        </View>

        <Text style={styles.resultText}>{selectedOptionData.consequence}</Text>

        <View style={styles.lessonBox}>
          <Text style={styles.lessonTitle}>📚 Você Aprendeu</Text>

          <Text style={styles.lessonText}>{selectedOptionData.lesson}</Text>
        </View>
        {selectedOptionData.moneyChange !== 0 && (
          <View
            style={[
              styles.changeBox,

              selectedOptionData.moneyChange > 0
                ? styles.positiveBox
                : styles.negativeBox,
            ]}
          >
            <Text style={styles.changeText}>
              💰 {selectedOptionData.moneyChange > 0 ? "+" : ""}
              R$
              {selectedOptionData.moneyChange}
            </Text>
          </View>
        )}

        {selectedOptionData.petHappinessChange !== 0 &&
          selectedOptionData.petHappinessChange !== undefined && (
            <View
              style={[
                styles.changeBox,

                selectedOptionData.petHappinessChange > 0
                  ? styles.happyBox
                  : styles.sadBox,
              ]}
            >
              <Text style={styles.changeText}>
                😊 {selectedOptionData.petHappinessChange > 0 ? "+" : ""}
                {selectedOptionData.petHappinessChange}%
              </Text>
            </View>
          )}

        <Text style={styles.continueText}>
          🎉 Continuando para o restante do mês...
        </Text>
      </View>
    );
  }
  return (
    <View style={styles.card}>
      <View style={styles.mainHeader}>
        <Text style={styles.mainEmoji}>🎴</Text>

        <Text style={styles.mainTitle}>CARTA SURPRESA!</Text>
      </View>

      <Text style={styles.eventEmoji}>{currentEvent.emoji}</Text>

      <Text style={styles.eventTitle}>{currentEvent.title}</Text>

      <Text style={styles.eventDescription}>{currentEvent.description}</Text>

      <Text style={styles.question}>🤔 O que você faria?</Text>
      {currentEvent.options.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={[
            styles.option,

            selectedOption === option.id && styles.selectedOption,
          ]}
          onPress={() => handleOptionSelect(option.id)}
        >
          <Text style={styles.optionTitle}>{option.text}</Text>

          <Text style={styles.optionSub}>
            {option.moneyChange !== 0 &&
              `💰 ${option.moneyChange > 0 ? "+" : ""}R$ ${option.moneyChange}`}
          </Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={[styles.confirmButton, !selectedOption && styles.disabledButton]}
        onPress={handleConfirm}
        disabled={!selectedOption}
      >
        <Text style={styles.confirmText}>Confirmar Escolha! ✨</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: COLORS.border,
  },

  resultHeader: {
    alignItems: "center",
    marginBottom: 16,
  },

  resultEmoji: {
    fontSize: 48,
  },

  resultTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.dark,
    textAlign: "center",
  },

  resultText: {
    textAlign: "center",
    fontSize: 16,
    color: COLORS.dark,
    marginBottom: 16,
  },

  lessonBox: {
    backgroundColor: "#DBEAFE",
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },

  lessonTitle: {
    fontWeight: "bold",
    textAlign: "center",
    color: COLORS.dark,
    marginBottom: 6,
  },

  lessonText: {
    textAlign: "center",
    color: COLORS.dark,
  },

  changeBox: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },

  positiveBox: {
    backgroundColor: "#DCFCE7",
  },

  negativeBox: {
    backgroundColor: "#FEE2E2",
  },

  happyBox: {
    backgroundColor: "#FEF3C7",
  },

  sadBox: {
    backgroundColor: "#FFEDD5",
  },

  changeText: {
    textAlign: "center",
    fontWeight: "bold",
    color: COLORS.dark,
  },

  continueText: {
    textAlign: "center",
    marginTop: 16,
    fontWeight: "bold",
    color: COLORS.primary,
  },

  mainHeader: {
    alignItems: "center",
    marginBottom: 16,
  },

  mainEmoji: {
    fontSize: 50,
  },

  mainTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.dark,
  },

  eventEmoji: {
    textAlign: "center",
    fontSize: 60,
  },

  eventTitle: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.dark,
    marginTop: 10,
  },

  eventDescription: {
    textAlign: "center",
    color: COLORS.darkAccent,
    marginVertical: 12,
    lineHeight: 22,
  },

  question: {
    textAlign: "center",
    fontWeight: "bold",
    color: COLORS.dark,
    marginBottom: 12,
  },

  option: {
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },

  selectedOption: {
    borderColor: COLORS.primary,
    backgroundColor: "#F0FDF4",
  },

  optionTitle: {
    fontWeight: "bold",
    color: COLORS.dark,
  },

  optionSub: {
    marginTop: 4,
    color: COLORS.darkAccent,
    fontSize: 12,
  },

  confirmButton: {
    backgroundColor: "#7C3AED",
    borderRadius: 12,
    padding: 16,
    marginTop: 10,
  },

  disabledButton: {
    opacity: 0.5,
  },

  confirmText: {
    color: COLORS.white,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
