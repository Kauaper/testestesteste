
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { COLORS } from "@/constants/colors";

interface SpecialAction {
  id: string;
  title: string;
  description: string;
  cost: number;
  emoji: string;
  consequence: string;
  isRequired?: boolean;
  deadline?: string;
}

interface SpecialActionsProps {
  balance: number;
  currentMonth: number;

  onActionAccept: (action: SpecialAction) => void;

  onActionReject: () => void;
}

export default function SpecialActions({
  balance,
  currentMonth,
  onActionAccept,
  onActionReject,
}: SpecialActionsProps) {
  const actionsByMonth: Record<number, SpecialAction> = {
    3: {
      id: "friend_birthday",

      title: "Aniversário do Melhor Amigo",

      description:
        "É aniversário do seu melhor amigo e você quer dar um presente especial!",

      cost: 25,

      emoji: "🎁",

      consequence: "Se não der presente, seu amigo pode ficar chateado...",

      deadline: "Só hoje",
    },

    6: {
      id: "school_uniform",

      title: "Uniforme Escolar Obrigatório",

      description: "A escola exige um novo uniforme e você PRECISA comprar!",

      cost: 40,

      emoji: "👔",

      consequence: "Se não comprar, você não pode ir à escola!",

      isRequired: true,

      deadline: "URGENTE",
    },

    9: {
      id: "school_trip",

      title: "Excursão da Escola",

      description:
        "A escola organizou uma viagem incrível e todos os seus amigos vão!",

      cost: 35,

      emoji: "🚌",

      consequence: "Se não for, vai ficar sozinho na escola...",

      deadline: "Próxima semana",
    },

    12: {
      id: "charity_donation",

      title: "Doação para Caridade",

      description:
        "A escola está arrecadando dinheiro para famílias necessitadas!",

      cost: 15,

      emoji: "❤️",

      consequence: "Você pode ajudar muitas pessoas com sua doação!",

      deadline: "Esta semana",
    },
  };
  let currentAction = actionsByMonth[currentMonth];

  if (!currentAction) {
    const genericActions: SpecialAction[] = [
      {
        id: "help_elderly",

        title: "Ajudar Pessoa Idosa",

        description: "Uma pessoa idosa precisa de ajuda para fazer compras!",

        cost: 0,

        emoji: "👵",

        consequence: "Fazer uma boa ação sempre traz alegria!",

        deadline: "Agora",
      },

      {
        id: "buy_medicine",

        title: "Remédio para Familiar",

        description: "Um familiar precisa de um remédio e você pode ajudar!",

        cost: 20,

        emoji: "💊",

        consequence: "Ajudar a família é sempre importante!",

        deadline: "Hoje",
      },

      {
        id: "environmental_action",

        title: "Ação Ambiental",

        description:
          "Há uma campanha de limpeza no bairro e você pode participar!",

        cost: 5,

        emoji: "🌱",

        consequence: "Cuidar do planeta é responsabilidade de todos!",

        deadline: "Este fim de semana",
      },
    ];

    const actionIndex = currentMonth % genericActions.length;

    currentAction = genericActions[actionIndex];
  }

  const canAfford = balance >= currentAction.cost;

  const handleAccept = () => {
    onActionAccept(currentAction);
  };

  const handleReject = () => {
    onActionReject();
  };
  return (
    <View style={styles.card}>
      <View
        style={[
          styles.header,
          currentAction.isRequired
            ? styles.headerRequired
            : styles.headerNormal,
        ]}
      >
        <Text style={styles.headerEmoji}>{currentAction.emoji}</Text>

        <Text style={styles.headerTitle}>
          {currentAction.isRequired ? "SITUAÇÃO URGENTE" : "AÇÃO ESPECIAL"}
        </Text>

        <Text style={styles.headerEmoji}>{currentAction.emoji}</Text>
      </View>

      <Text style={styles.title}>{currentAction.title}</Text>

      <Text style={styles.description}>{currentAction.description}</Text>

      <View style={styles.costBox}>
        <Text style={styles.costText}>
          {currentAction.cost === 0
            ? "GRÁTIS!"
            : `Custa R$ ${currentAction.cost}`}
        </Text>

        <Text style={styles.balanceText}>
          💰 Você tem R$ {balance.toFixed(0)}
        </Text>
      </View>
      <View
        style={[
          styles.consequenceBox,
          currentAction.isRequired ? styles.requiredBox : styles.optionalBox,
        ]}
      >
        <Text style={styles.consequenceText}>{currentAction.consequence}</Text>
      </View>

      <View style={styles.deadlineBox}>
        <Text style={styles.deadlineText}>
          ⏰ Prazo: {currentAction.deadline}
        </Text>
      </View>

      {!canAfford && currentAction.cost > 0 && (
        <View style={styles.errorBox}>
          <Text style={styles.errorTitle}>😰 Dinheiro insuficiente</Text>

          <Text style={styles.errorText}>
            Precisa de mais R$ {(currentAction.cost - balance).toFixed(0)}
          </Text>
        </View>
      )}
      <View style={styles.buttons}>
        <TouchableOpacity
          style={[
            styles.rejectButton,

            currentAction.isRequired &&
              currentAction.cost > 0 &&
              styles.disabledButton,
          ]}
          onPress={handleReject}
          disabled={currentAction.isRequired && currentAction.cost > 0}
        >
          <Text style={styles.rejectText}>
            {currentAction.isRequired ? "Não Posso 😔" : "Não Agora 🤔"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.acceptButton,

            !canAfford && currentAction.cost > 0 && styles.disabledButton,
          ]}
          onPress={handleAccept}
          disabled={!canAfford && currentAction.cost > 0}
        >
          <Text style={styles.acceptText}>
            {!canAfford && currentAction.cost > 0
              ? "Sem Dinheiro 😅"
              : "FAZER! ✨"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          💫{" "}
          {currentAction.isRequired
            ? "Esta ação é obrigatória e pode ter consequências!"
            : "Decisões especiais podem afetar suas amizades e felicidade!"}{" "}
          💫
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
    borderColor: COLORS.border,
  },

  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },

  headerRequired: {
    backgroundColor: "#FEE2E2",
  },

  headerNormal: {
    backgroundColor: "#FEF3C7",
  },

  headerEmoji: {
    fontSize: 28,
    marginHorizontal: 8,
  },

  headerTitle: {
    fontSize: 18,
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

  costBox: {
    backgroundColor: "#F9FAFB",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "center",
  },

  costText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#DC2626",
  },

  balanceText: {
    marginTop: 6,
    color: COLORS.dark,
  },

  consequenceBox: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },

  requiredBox: {
    backgroundColor: "#FEE2E2",
  },

  optionalBox: {
    backgroundColor: "#FEF3C7",
  },

  consequenceText: {
    textAlign: "center",
    fontWeight: "bold",
    color: COLORS.dark,
  },

  deadlineBox: {
    backgroundColor: "#F3F4F6",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },

  deadlineText: {
    textAlign: "center",
    color: COLORS.dark,
    fontWeight: "bold",
  },

  errorBox: {
    backgroundColor: "#FEE2E2",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },

  errorTitle: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#DC2626",
  },

  errorText: {
    textAlign: "center",
    color: "#DC2626",
    marginTop: 4,
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

  acceptButton: {
    flex: 1,
    backgroundColor: "#2563EB",
    borderRadius: 12,
    padding: 14,
  },

  disabledButton: {
    opacity: 0.5,
  },

  rejectText: {
    textAlign: "center",
    fontWeight: "bold",
    color: COLORS.dark,
  },

  acceptText: {
    textAlign: "center",
    fontWeight: "bold",
    color: COLORS.white,
  },

  footer: {
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
