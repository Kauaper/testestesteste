import { useState } from "react";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { COLORS } from "@/constants/colors";

interface EventOption {
  id: string;
  text: string;
  consequence: string;
  moneyChange: number;
  extraEarnings?: number;
  petHappinessChange?: number;
  lesson: string;
  achievement?: string;
}

interface ChapterEvent {
  id: string;
  type: "help" | "temptation" | "responsibility" | "opportunity";

  title: string;
  description: string;
  emoji: string;

  options: EventOption[];
}

interface ChapterSpecialEventProps {
  currentMonth: number;
  balance: number;
  petCost: number;

  onEventComplete: (result: any) => void;
}

export default function ChapterSpecialEvent({
  currentMonth,
  balance,
  petCost,
  onEventComplete,
}: ChapterSpecialEventProps) {
  const [selectedOption, setSelectedOption] = useState("");

  const [showResult, setShowResult] = useState(false);

  const chapterEvents: Record<number, ChapterEvent> = {
    1: {
      id: "first_help",
      type: "help",

      title: "Primeira Oportunidade de Ajuda!",

      description: "Dona Rosa precisa de ajuda para carregar as compras.",

      emoji: "👵",

      options: [
        {
          id: "help_enthusiastic",

          text: "Ajudar com muito prazer!",

          consequence: "Dona Rosa ficou emocionada e te deu R$15.",

          moneyChange: 0,

          extraEarnings: 15,

          petHappinessChange: 15,

          lesson: "Ajudar outros sempre traz recompensas.",

          achievement: "helper",
        },

        {
          id: "help_hesitant",

          text: "Ajudar, mas com pressa",

          consequence: "Você ajudou rapidamente e ganhou R$8.",

          moneyChange: 0,

          extraEarnings: 8,

          petHappinessChange: 5,

          lesson: "Ajudar sempre vale a pena.",
        },

        {
          id: "dont_help",

          text: "Dizer que está ocupado",

          consequence: "Você se sentiu mal por não ajudar.",

          moneyChange: 0,

          petHappinessChange: -10,

          lesson: "Perdemos oportunidades quando não ajudamos.",
        },
      ],
    },

    2: {
      id: "first_temptation",

      type: "temptation",

      title: "Primeira Grande Tentação!",

      description: "Seu doce favorito está em promoção.",

      emoji: "🍭",

      options: [
        {
          id: "buy_all",

          text: "Comprar tudo (R$18)",

          consequence: "Você gastou bastante.",

          moneyChange: -18,

          petHappinessChange: 10,

          lesson: "Promoções podem enganar.",
        },

        {
          id: "buy_little",

          text: "Comprar só um pouco (R$8)",

          consequence: "Você se controlou.",

          moneyChange: -8,

          petHappinessChange: 5,

          lesson: "Moderação é importante.",

          achievement: "smart_spender",
        },

        {
          id: "resist",

          text: "Resistir",

          consequence: "Você venceu a tentação.",

          moneyChange: 0,

          petHappinessChange: 20,

          lesson: "Força de vontade é valiosa.",

          achievement: "resist_temptation",
        },
      ],
    },
    4: {
      id: "talent_opportunity",

      type: "opportunity",

      title: "Descobrindo Seus Talentos!",

      description: "A escola está organizando uma feira de talentos.",

      emoji: "🎨",

      options: [
        {
          id: "participate_art",

          text: "Vender desenhos (R$5)",

          consequence: "Você ganhou R$25 com seus desenhos.",

          moneyChange: -5,

          extraEarnings: 25,

          petHappinessChange: 20,

          lesson: "Investir nos seus talentos vale a pena.",

          achievement: "helper",
        },

        {
          id: "participate_music",

          text: "Tocar música",

          consequence: "Você ganhou R$12 de gorjetas.",

          moneyChange: 0,

          extraEarnings: 12,

          petHappinessChange: 15,

          lesson: "Talentos podem gerar renda.",
        },

        {
          id: "not_participate",

          text: "Não participar",

          consequence: "Você perdeu uma oportunidade.",

          moneyChange: 0,

          petHappinessChange: -5,

          lesson: "A timidez pode nos impedir de crescer.",
        },
      ],
    },

    5: {
      id: "sweet_temptation",

      type: "temptation",

      title: "Festival de Doces!",

      description: "A cidade inteira está participando.",

      emoji: "🍬",

      options: [
        {
          id: "go_crazy",

          text: "Comer tudo (R$30)",

          consequence: "Você exagerou nos doces.",

          moneyChange: -30,

          petHappinessChange: 5,

          lesson: "Exageros têm consequências.",
        },

        {
          id: "enjoy_moderately",

          text: "Comer com moderação (R$12)",

          consequence: "Você se divertiu sem exagerar.",

          moneyChange: -12,

          petHappinessChange: 15,

          lesson: "Moderação é sabedoria.",

          achievement: "smart_spender",
        },

        {
          id: "resist_festival",

          text: "Resistir",

          consequence: "Você mostrou força de vontade.",

          moneyChange: 0,

          petHappinessChange: 25,

          lesson: "Disciplina gera crescimento.",

          achievement: "resist_temptation",
        },
      ],
    },

    6: {
      id: "school_uniform",

      type: "responsibility",

      title: "Uniforme Escolar!",

      description: "A escola exige um uniforme novo.",

      emoji: "👔",

      options: [
        {
          id: "buy_new",

          text: "Comprar novo (R$45)",

          consequence: "Você comprou o uniforme oficial.",

          moneyChange: -45,

          petHappinessChange: 5,

          lesson: "Alguns gastos são obrigatórios.",

          achievement: "emergency_prepared",
        },

        {
          id: "ask_help",

          text: "Pedir ajuda aos pais",

          consequence: "Seus pais ajudaram você.",

          moneyChange: 0,

          extraEarnings: 45,

          lesson: "Pedir ajuda é normal.",
        },

        {
          id: "try_used",

          text: "Comprar usado (R$25)",

          consequence: "Você economizou bastante.",

          moneyChange: -25,

          petHappinessChange: 10,

          lesson: "Pesquisar antes economiza dinheiro.",

          achievement: "smart_spender",
        },
      ],
    },
    7: {
      id: "pet_emergency",

      type: "responsibility",

      title: "Emergência do Pet!",

      description: "Seu bichinho ficou doente e precisa de cuidados.",

      emoji: "🏥",

      options: [
        {
          id: "vet_now",

          text: "Levar ao veterinário (R$35)",

          consequence: "Seu pet se recuperou rapidamente.",

          moneyChange: -35,

          petHappinessChange: 30,

          lesson: "Precisamos estar preparados para emergências.",

          achievement: "pet_lover",
        },

        {
          id: "basic_care",

          text: "Cuidar em casa (R$10)",

          consequence: "Seu pet melhorou devagar.",

          moneyChange: -10,

          petHappinessChange: 10,

          lesson: "Nem sempre a solução mais barata é a melhor.",
        },

        {
          id: "ignore",

          text: "Esperar passar",

          consequence: "Seu pet ficou triste e piorou.",

          moneyChange: 0,

          petHappinessChange: -25,

          lesson: "Responsabilidade exige ação.",
        },
      ],
    },

    8: {
      id: "community_event",

      type: "help",

      title: "Mutirão da Comunidade!",

      description: "O bairro está organizando uma ação voluntária.",

      emoji: "🤝",

      options: [
        {
          id: "help_all_day",

          text: "Participar o dia inteiro",

          consequence: "Você recebeu reconhecimento da comunidade.",

          moneyChange: 0,

          extraEarnings: 20,

          petHappinessChange: 20,

          lesson: "Ajudar gera valor para todos.",

          achievement: "generous_heart",
        },

        {
          id: "help_some_hours",

          text: "Participar algumas horas",

          consequence: "Você colaborou e aprendeu bastante.",

          moneyChange: 0,

          extraEarnings: 10,

          petHappinessChange: 10,

          lesson: "Toda ajuda faz diferença.",
        },

        {
          id: "stay_home",

          text: "Ficar em casa",

          consequence: "Você perdeu uma experiência importante.",

          moneyChange: 0,

          petHappinessChange: -5,

          lesson: "Participar da comunidade é valioso.",
        },
      ],
    },

    9: {
      id: "investment_opportunity",

      type: "opportunity",

      title: "Oportunidade de Crescimento!",

      description: "Você encontrou uma forma de fazer seu dinheiro render.",

      emoji: "📈",

      options: [
        {
          id: "invest_big",

          text: "Investir bastante (R$30)",

          consequence: "Seu dinheiro começou a crescer.",

          moneyChange: -30,

          extraEarnings: 45,

          petHappinessChange: 10,

          lesson: "Investimentos podem gerar retorno.",

          achievement: "growth_expert",
        },

        {
          id: "invest_little",

          text: "Investir pouco (R$10)",

          consequence: "Você teve um retorno moderado.",

          moneyChange: -10,

          extraEarnings: 15,

          petHappinessChange: 5,

          lesson: "Começar pequeno também funciona.",
        },

        {
          id: "dont_invest",

          text: "Não investir",

          consequence: "Você perdeu a oportunidade.",

          moneyChange: 0,

          lesson: "Oportunidades precisam ser aproveitadas.",
        },
      ],
    },
    10: {
      id: "friend_needs_help",

      type: "help",

      title: "Um Amigo Precisa de Você",

      description:
        "Seu amigo está arrecadando dinheiro para uma causa importante.",

      emoji: "❤️",

      options: [
        {
          id: "donate_generously",

          text: "Doar R$20",

          consequence: "Seu amigo ficou muito feliz.",

          moneyChange: -20,

          petHappinessChange: 15,

          lesson: "Generosidade transforma vidas.",

          achievement: "generous_heart",
        },

        {
          id: "donate_little",

          text: "Doar R$10",

          consequence: "Você ajudou dentro das suas possibilidades.",

          moneyChange: -10,

          petHappinessChange: 10,

          lesson: "Toda ajuda importa.",
        },

        {
          id: "dont_donate",

          text: "Não ajudar",

          consequence: "Você guardou seu dinheiro.",

          moneyChange: 0,

          petHappinessChange: -5,

          lesson: "Às vezes precisamos pensar nos outros também.",
        },
      ],
    },

    11: {
      id: "holiday_shopping",

      type: "temptation",

      title: "Promoção Imperdível!",

      description: "Uma grande loja lançou descontos incríveis.",

      emoji: "🛍️",

      options: [
        {
          id: "buy_everything",

          text: "Comprar muitas coisas (R$40)",

          consequence: "Você gastou bastante dinheiro.",

          moneyChange: -40,

          petHappinessChange: 5,

          lesson: "Nem toda promoção vale a pena.",
        },

        {
          id: "buy_needed",

          text: "Comprar apenas o necessário (R$15)",

          consequence: "Você fez compras conscientes.",

          moneyChange: -15,

          petHappinessChange: 10,

          lesson: "Planejamento evita desperdícios.",

          achievement: "smart_spender",
        },

        {
          id: "skip_sale",

          text: "Não comprar",

          consequence: "Você economizou dinheiro.",

          moneyChange: 0,

          petHappinessChange: 15,

          lesson: "Resistir também é uma escolha inteligente.",

          achievement: "resist_temptation",
        },
      ],
    },

    12: {
      id: "final_challenge",

      type: "opportunity",

      title: "Grande Desafio Final!",

      description: "Chegou a última oportunidade da sua jornada.",

      emoji: "🏆",

      options: [
        {
          id: "take_risk",

          text: "Aceitar o desafio",

          consequence: "Você mostrou coragem e ganhou uma recompensa.",

          moneyChange: 0,

          extraEarnings: 50,

          petHappinessChange: 20,

          lesson: "Grandes conquistas exigem coragem.",

          achievement: "future_planner",
        },

        {
          id: "play_safe",

          text: "Seguir com segurança",

          consequence: "Você manteve estabilidade financeira.",

          moneyChange: 0,

          extraEarnings: 20,

          petHappinessChange: 10,

          lesson: "Segurança também é importante.",
        },

        {
          id: "do_nothing",

          text: "Não participar",

          consequence: "Você encerrou o ano sem mudanças.",

          moneyChange: 0,

          lesson: "Oportunidades não voltam para sempre.",
        },
      ],
    },
  };
  const currentEvent = chapterEvents[currentMonth];

  if (!currentEvent) {
    return null;
  }
  const selectedEventOption = currentEvent.options.find(
    (option) => option.id === selectedOption,
  );

  const handleSelectOption = (optionId: string) => {
    setSelectedOption(optionId);
    setShowResult(true);
  };

  const handleContinue = () => {
    if (!selectedEventOption) {
      return;
    }

    onEventComplete({
      moneyChange: selectedEventOption.moneyChange,

      extraEarnings: selectedEventOption.extraEarnings || 0,

      petHappinessChange: selectedEventOption.petHappinessChange || 0,

      achievement: selectedEventOption.achievement,

      lesson: selectedEventOption.lesson,
    });
  };
  if (!showResult) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.emoji}>{currentEvent.emoji}</Text>

          <Text style={styles.title}>{currentEvent.title}</Text>

          <Text style={styles.description}>{currentEvent.description}</Text>
        </View>

        <View style={styles.optionsContainer}>
          {currentEvent.options.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.optionButton}
              onPress={() => handleSelectOption(option.id)}
            >
              <Text style={styles.optionText}>{option.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.resultCard}>
        <Text style={styles.resultEmoji}>{currentEvent.emoji}</Text>

        <Text style={styles.resultTitle}>Resultado da Sua Escolha</Text>

        <Text style={styles.resultDescription}>
          {selectedEventOption?.consequence}
        </Text>

        <View style={styles.lessonBox}>
          <Text style={styles.lessonTitle}>📚 Lição Aprendida</Text>

          <Text style={styles.lessonText}>{selectedEventOption?.lesson}</Text>
        </View>

        {selectedEventOption?.moneyChange !== 0 && (
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              💰 Dinheiro: R$
              {selectedEventOption?.moneyChange}
            </Text>
          </View>
        )}

        {selectedEventOption?.extraEarnings && (
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              ✨ Ganhos Extras: R$
              {selectedEventOption.extraEarnings}
            </Text>
          </View>
        )}

        {selectedEventOption?.achievement && (
          <View style={styles.achievementBox}>
            <Text style={styles.achievementText}>
              🏅 Conquista Desbloqueada!
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>Continuar ➜</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: COLORS.border,
  },

  header: {
    alignItems: "center",
  },

  emoji: {
    fontSize: 70,
    marginBottom: 12,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.dark,
    textAlign: "center",
    marginBottom: 10,
  },

  description: {
    fontSize: 16,
    color: COLORS.darkAccent,
    textAlign: "center",
    marginBottom: 20,
  },

  optionsContainer: {
    gap: 12,
  },

  optionButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
  },

  optionText: {
    color: COLORS.white,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },

  resultCard: {
    alignItems: "center",
  },

  resultEmoji: {
    fontSize: 80,
    marginBottom: 12,
  },

  resultTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.dark,
    textAlign: "center",
    marginBottom: 12,
  },

  resultDescription: {
    fontSize: 16,
    textAlign: "center",
    color: COLORS.darkAccent,
    marginBottom: 20,
  },

  lessonBox: {
    width: "100%",
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },

  lessonTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.dark,
    marginBottom: 8,
  },

  lessonText: {
    color: COLORS.darkAccent,
    lineHeight: 22,
  },

  infoBox: {
    width: "100%",
    padding: 12,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    marginBottom: 10,
  },

  infoText: {
    textAlign: "center",
    fontWeight: "600",
    color: COLORS.dark,
  },

  achievementBox: {
    width: "100%",
    padding: 14,
    borderRadius: 12,
    backgroundColor: COLORS.secondary,
    marginBottom: 16,
  },

  achievementText: {
    color: COLORS.white,
    textAlign: "center",
    fontWeight: "bold",
  },

  continueButton: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginTop: 10,
  },

  continueButtonText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 18,
  },
});
