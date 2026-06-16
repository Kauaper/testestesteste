import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { COLORS } from "@/constants/colors";

interface EarningOpportunity {
  id: string;
  title: string;
  description: string;
  earning: number;
  emoji: string;
  effort: string;
  lesson: string;
}

interface EarningOpportunitiesProps {
  currentMonth: number;

  onEarningAccept: (opportunity: EarningOpportunity) => void;

  onEarningReject: () => void;
}

export default function EarningOpportunities({
  currentMonth,
  onEarningAccept,
  onEarningReject,
}: EarningOpportunitiesProps) {
  const opportunitiesByMonth: Record<number, EarningOpportunity> = {
    1: {
      id: "help_neighbor",
      title: "Ajudar Dona Maria",
      description:
        "Dona Maria precisa de ajuda para carregar as compras até em casa!",

      earning: 10,

      emoji: "👵",

      effort: "Vai ser um pouco cansativo, mas ela ficará muito feliz!",

      lesson: "Ajudar os outros sempre traz boas recompensas!",
    },

    4: {
      id: "clean_yard",
      title: "Limpar o Quintal",

      description:
        "Seus pais ofereceram dinheiro para você ajudar a limpar o quintal!",

      earning: 15,

      emoji: "🧹",

      effort: "Vai sujar as mãos, mas é um trabalho honesto!",

      lesson: "Trabalhar em casa ajuda toda a família!",
    },

    7: {
      id: "sell_drawings",
      title: "Vender Seus Desenhos",

      description: "Você pode vender seus desenhos incríveis para os amigos!",

      earning: 12,

      emoji: "🎨",

      effort: "Precisa caprichar bem nos desenhos!",

      lesson: "Usar seus talentos pode gerar dinheiro!",
    },

    10: {
      id: "return_wallet",
      title: "Devolver Carteira Perdida",

      description:
        "Você achou uma carteira na rua! O dono quer te dar uma recompensa!",

      earning: 20,

      emoji: "💳",

      effort: "Fazer a coisa certa às vezes demora, mas vale a pena!",

      lesson: "Honestidade sempre é recompensada!",
    },
  };
  let currentOpportunity = opportunitiesByMonth[currentMonth];

  if (!currentOpportunity) {
    const genericOpportunities: EarningOpportunity[] = [
      {
        id: "walk_dogs",

        title: "Passear com Cachorros",

        description:
          "Dona Rosa precisa de alguém para passear com seus cachorrinhos!",

        earning: 8,

        emoji: "🐕",

        effort: "Os cachorros são fofos e obedientes!",

        lesson: "Cuidar de animais é uma responsabilidade!",
      },

      {
        id: "help_library",

        title: "Organizar Biblioteca",

        description:
          "A biblioteca da escola precisa de ajuda para organizar os livros!",

        earning: 12,

        emoji: "📚",

        effort: "É um trabalho calmo e você aprende coisas novas!",

        lesson: "Ajudar a comunidade sempre vale a pena!",
      },

      {
        id: "wash_car",

        title: "Lavar Carros",

        description: "Seus vizinhos querem lavar os carros e podem te pagar!",

        earning: 18,

        emoji: "🚗",

        effort: "Vai molhar um pouco, mas é divertido!",

        lesson: "Trabalho duro sempre é recompensado!",
      },
    ];

    const opportunityIndex = currentMonth % genericOpportunities.length;

    currentOpportunity = genericOpportunities[opportunityIndex];
  }

  const handleAccept = () => {
    onEarningAccept(currentOpportunity);
  };

  const handleReject = () => {
    onEarningReject();
  };
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.headerEmoji}>{currentOpportunity.emoji}</Text>

        <Text style={styles.headerTitle}>OPORTUNIDADE ESPECIAL</Text>

        <Text style={styles.headerEmoji}>{currentOpportunity.emoji}</Text>
      </View>

      <Text style={styles.title}>{currentOpportunity.title}</Text>

      <Text style={styles.description}>{currentOpportunity.description}</Text>

      <View style={styles.rewardBox}>
        <Text style={styles.rewardValue}>
          + R$ {currentOpportunity.earning}
        </Text>

        <Text style={styles.rewardLabel}>✨ Dinheiro extra para você ✨</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>{currentOpportunity.effort}</Text>
      </View>

      <View style={styles.lessonBox}>
        <Text style={styles.lessonText}>{currentOpportunity.lesson}</Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.rejectButton} onPress={handleReject}>
          <Text style={styles.rejectText}>Agora Não</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
          <Text style={styles.acceptText}>ACEITO O DESAFIO! 🚀</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footerBox}>
        <Text style={styles.footerText}>
          ✨ Fazer boas ações sempre traz recompensas ✨
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: COLORS.secondary,
  },

  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
  },

  headerEmoji: {
    fontSize: 30,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.dark,
  },

  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.dark,
    marginBottom: 12,
  },

  description: {
    textAlign: "center",
    color: COLORS.darkAccent,
    marginBottom: 16,
    lineHeight: 22,
  },

  rewardBox: {
    backgroundColor: "#DCFCE7",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 12,
  },

  rewardValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.secondary,
  },

  rewardLabel: {
    color: COLORS.dark,
    marginTop: 4,
  },

  infoBox: {
    backgroundColor: "#DBEAFE",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },

  infoText: {
    textAlign: "center",
    color: COLORS.dark,
    fontWeight: "600",
  },

  lessonBox: {
    backgroundColor: "#FEF3C7",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },

  lessonText: {
    textAlign: "center",
    color: COLORS.dark,
    fontWeight: "600",
  },

  buttons: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },

  rejectButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 14,
  },

  rejectText: {
    textAlign: "center",
    fontWeight: "bold",
    color: COLORS.dark,
  },

  acceptButton: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    borderRadius: 12,
    padding: 14,
  },

  acceptText: {
    textAlign: "center",
    fontWeight: "bold",
    color: COLORS.white,
  },

  footerBox: {
    backgroundColor: "#F3E8FF",
    borderRadius: 12,
    padding: 12,
  },

  footerText: {
    textAlign: "center",
    color: COLORS.dark,
    fontSize: 12,
  },
});
