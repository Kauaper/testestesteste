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
    3: {
      id: "friends_outing",
      type: "temptation",

      title: "Passeio com os Amigos!",

      description: "Seus amigos querem ir a um parque de diversões.",

      emoji: "🎡",

      options: [
        {
          id: "spend_all",
          text: "Gastar R$25 para acompanhar todos",
          consequence: "Você se divertiu, mas ficou com pouco dinheiro.",
          moneyChange: -25,
          petHappinessChange: 10,
          lesson: "Nem sempre precisamos gastar para pertencer.",
        },

        {
          id: "spend_little",
          text: "Levar apenas R$10",
          consequence: "Você se divertiu e controlou seus gastos.",
          moneyChange: -10,
          petHappinessChange: 15,
          lesson: "Planejar gastos ajuda a aproveitar melhor.",

          achievement: "smart_spender",
        },

        {
          id: "free_activity",
          text: "Sugerir uma atividade gratuita",
          consequence: "Todos gostaram da ideia.",
          moneyChange: 0,
          petHappinessChange: 20,
          lesson: "Boas escolhas não dependem de dinheiro.",
        },
      ],
    },

    4: {
      id: "help_neighbor",
      type: "help",

      title: "Hora de Ajudar!",

      description: "Sua vizinha precisa de ajuda para organizar a feira.",

      emoji: "🤝",

      options: [
        {
          id: "help_all_day",
          text: "Ajudar o dia inteiro",
          consequence: "Ela agradeceu e te deu R$20.",
          moneyChange: 0,
          extraEarnings: 20,
          petHappinessChange: 20,
          lesson: "Ajudar os outros gera valor.",

          achievement: "helper",
        },

        {
          id: "help_some",
          text: "Ajudar um pouco",
          consequence: "Você ajudou e aprendeu bastante.",
          moneyChange: 0,
          petHappinessChange: 10,
          lesson: "Toda ajuda faz diferença.",
        },

        {
          id: "dont_help",
          text: "Não ajudar",
          consequence: "Você perdeu a chance de fazer a diferença.",
          moneyChange: 0,
          petHappinessChange: -10,
          lesson: "Pequenas ações podem transformar vidas.",
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
          text: "Comprar vários doces (R$30)",
          consequence: "Você exagerou nos gastos.",
          moneyChange: -30,
          lesson: "Exageros têm consequências.",
        },

        {
          id: "moderation",
          text: "Comprar alguns doces (R$12)",
          consequence: "Você aproveitou com equilíbrio.",
          moneyChange: -12,
          lesson: "Moderação é importante.",

          achievement: "smart_spender",
        },

        {
          id: "resist",
          text: "Resistir",
          consequence: "Você economizou e se orgulhou da decisão.",
          moneyChange: 0,
          lesson: "Saber dizer não também é uma vitória.",

          achievement: "resist_temptation",
        },
      ],
    },

    6: {
      id: "school_supplies",
      type: "responsibility",

      title: "Material Escolar Novo!",

      description: "Você precisa comprar materiais para as aulas.",

      emoji: "📚",

      options: [
        {
          id: "buy_expensive",
          text: "Comprar tudo novo (R$40)",
          consequence: "Você gastou bastante.",
          moneyChange: -40,
          lesson: "Precisamos priorizar nossos gastos.",
        },

        {
          id: "search_prices",
          text: "Pesquisar preços (R$25)",
          consequence: "Você economizou dinheiro.",
          moneyChange: -25,
          lesson: "Pesquisar antes de comprar vale a pena.",

          achievement: "smart_spender",
        },

        {
          id: "buy_used",
          text: "Comprar usado (R$15)",
          consequence: "Você economizou bastante.",
          moneyChange: -15,
          lesson: "Nem sempre o novo é a melhor opção.",
        },
      ],
    },

    7: {
      id: "talent_fair",
      type: "opportunity",

      title: "Feira de Talentos!",

      description: "Você pode usar seus talentos para ganhar dinheiro.",

      emoji: "🎨",

      options: [
        {
          id: "sell_drawings",
          text: "Vender desenhos",
          consequence: "Você ganhou R$25.",
          moneyChange: 0,
          extraEarnings: 25,
          lesson: "Talentos podem gerar renda.",

          achievement: "growth_expert",
        },

        {
          id: "play_music",
          text: "Tocar música",
          consequence: "Você recebeu R$15 de gorjetas.",
          moneyChange: 0,
          extraEarnings: 15,
          lesson: "Suas habilidades têm valor.",
        },

        {
          id: "dont_participate",
          text: "Não participar",
          consequence: "Você perdeu uma oportunidade.",
          moneyChange: 0,
          lesson: "Às vezes precisamos acreditar em nós mesmos.",
        },
      ],
    },

    8: {
      id: "fashion_vs_need",
      type: "temptation",

      title: "O Tênis da Moda!",

      description: "Todos estão usando um tênis muito caro.",

      emoji: "👟",

      options: [
        {
          id: "buy_fashion",
          text: "Comprar por R$50",
          consequence: "Você ficou sem muito dinheiro.",
          moneyChange: -50,
          lesson: "Desejo e necessidade são coisas diferentes.",
        },

        {
          id: "look_discount",
          text: "Procurar promoção",
          consequence: "Você economizou bastante.",
          moneyChange: -25,
          lesson: "Pesquisar pode fazer toda diferença.",

          achievement: "smart_spender",
        },

        {
          id: "keep_old",
          text: "Continuar com o atual",
          consequence: "Você economizou dinheiro.",
          moneyChange: 0,
          lesson: "Não precisamos seguir todas as modas.",
        },
      ],
    },

    9: {
      id: "class_trip",
      type: "opportunity",

      title: "Viagem da Turma!",

      description: "Sua turma vai fazer uma excursão.",

      emoji: "🎢",

      options: [
        {
          id: "pay_trip",
          text: "Pagar R$30",
          consequence: "Você se divertiu muito.",
          moneyChange: -30,
          petHappinessChange: 20,
          lesson: "Planejar permite aproveitar oportunidades.",
        },

        {
          id: "save_before",
          text: "Economizar e ir depois",
          consequence: "Você se organizou e conseguiu participar.",
          moneyChange: -15,
          petHappinessChange: 15,
          lesson: "Metas exigem planejamento.",

          achievement: "future_planner",
        },

        {
          id: "dont_go",
          text: "Não participar",
          consequence: "Você preferiu guardar dinheiro.",
          moneyChange: 0,
          lesson: "Toda escolha possui consequências.",
        },
      ],
    },

    10: {
      id: "lost_wallet",
      type: "help",

      title: "Carteira Encontrada!",

      description: "Você encontrou uma carteira cheia de dinheiro.",

      emoji: "💰",

      options: [
        {
          id: "return_wallet",
          text: "Devolver a carteira",
          consequence: "O dono te agradeceu e deu R$20.",
          moneyChange: 0,
          extraEarnings: 20,
          lesson: "A honestidade sempre vale a pena.",

          achievement: "honest_hero",
        },

        {
          id: "ignore",
          text: "Ignorar",
          consequence: "Outra pessoa devolveu a carteira.",
          moneyChange: 0,
          lesson: "Podemos perder oportunidades de fazer o bem.",
        },

        {
          id: "keep_money",
          text: "Ficar com o dinheiro",
          consequence: "Você se sentiu mal pela escolha.",
          moneyChange: 50,
          petHappinessChange: -30,
          lesson: "Ganhos desonestos não trazem felicidade.",
        },
      ],
    },

    11: {
      id: "charity_campaign",
      type: "help",

      title: "Campanha Solidária!",

      description: "Sua escola está arrecadando recursos para ajudar famílias.",

      emoji: "❤️",

      options: [
        {
          id: "donate_money",
          text: "Doar R$20",
          consequence: "Você ajudou muitas pessoas.",
          moneyChange: -20,
          petHappinessChange: 20,
          lesson: "Generosidade transforma vidas.",

          achievement: "generous_heart",
        },

        {
          id: "donate_time",
          text: "Ajudar como voluntário",
          consequence: "Você ajudou sem gastar dinheiro.",
          moneyChange: 0,
          petHappinessChange: 15,
          lesson: "Podemos ajudar de várias formas.",
        },

        {
          id: "dont_participate",
          text: "Não participar",
          consequence: "Você perdeu uma oportunidade de ajudar.",
          moneyChange: 0,
          petHappinessChange: -5,
          lesson: "Pequenas ações fazem diferença.",
        },
      ],
    },
    12: {
      id: "dream_of_the_future",

      type: "opportunity",

      title: "🌟 O Grande Sonho!",

      description:
        "Depois de um ano inteiro aprendendo, você recebe a chance de realizar um grande sonho. O que você fará?",

      emoji: "🌟",

      options: [
        {
          id: "invest_in_dream",

          text: "Investir R$40 no seu sonho",

          consequence:
            "Você se dedicou, trabalhou duro e seu sonho começou a dar frutos!",

          moneyChange: -40,

          extraEarnings: 80,

          petHappinessChange: 30,

          lesson:
            "Planejamento, coragem e persistência transformam sonhos em realidade.",

          achievement: "future_planner",
        },

        {
          id: "save_and_plan",

          text: "Guardar dinheiro e planejar melhor",

          consequence:
            "Você preferiu crescer com segurança e construiu uma base sólida.",

          moneyChange: 0,

          extraEarnings: 30,

          petHappinessChange: 20,

          lesson:
            "Grandes conquistas também podem ser alcançadas com paciência.",
        },

        {
          id: "give_up",

          text: "Desistir do sonho",

          consequence:
            "Você decidiu não arriscar e ficou imaginando o que poderia ter acontecido.",

          moneyChange: 0,

          petHappinessChange: -10,

          lesson: "Às vezes, o maior risco é nunca tentar.",
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
