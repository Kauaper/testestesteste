
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { COLORS } from "@/constants/colors";

interface TemptingOffer {
  id: string;
  title: string;
  description: string;
  cost: number;
  emoji: string;
  temptation: string;
  consequence: string;
}

interface TemptingOffersProps {
  balance: number;
  currentMonth: number;

  onOfferAccept: (offer: TemptingOffer) => void;

  onOfferReject: () => void;
}

export default function TemptingOffers({
  balance,
  currentMonth,
  onOfferAccept,
  onOfferReject,
}: TemptingOffersProps) {
  const offersByMonth: Record<number, TemptingOffer> = {
    2: {
      id: "super_toy",

      title: "Brinquedo Incrível",

      description:
        "O brinquedo mais legal da loja! Todos os seus amigos têm um!",

      cost: Math.floor(balance * 0.4),

      emoji: "🎮",

      temptation: "Você será o mais legal da turma!",

      consequence: "Mas vai sobrar menos dinheiro para outras coisas...",
    },

    5: {
      id: "candy_fest",

      title: "Festival de Doces",

      description: "Uma montanha de doces deliciosos!",

      cost: Math.floor(balance * 0.25),

      emoji: "🍭",

      temptation: "Será a festa mais doce do mundo!",

      consequence: "Mas depois você pode ficar sem dinheiro para o lanche...",
    },

    8: {
      id: "trendy_clothes",

      title: "Roupa da Moda",

      description: "A roupa mais estilosa que existe!",

      cost: Math.floor(balance * 0.5),

      emoji: "👕",

      temptation: "Você vai arrasar no visual!",

      consequence: "Mas talvez não sobre para outras necessidades...",
    },

    11: {
      id: "party_expense",

      title: "Festa de Fim de Ano",

      description: "Uma festa incrível com todos os amigos!",

      cost: Math.floor(balance * 0.35),

      emoji: "🎉",

      temptation: "Será a festa mais divertida do ano!",

      consequence: "Mas você pode acabar o ano sem dinheiro guardado...",
    },
  };
  let currentOffer = offersByMonth[currentMonth];

  if (!currentOffer) {
    const genericOffers: TemptingOffer[] = [
      {
        id: "electronics",

        title: "Gadget Tecnológico",

        description: "Um acessório tecnológico incrível!",

        cost: Math.floor(balance * 0.3),

        emoji: "📱",

        temptation: "Você ficará super moderno!",

        consequence: "Mas pode não sobrar para coisas importantes...",
      },

      {
        id: "collectible",

        title: "Item Colecionável",

        description: "Um item raro de coleção!",

        cost: Math.floor(balance * 0.4),

        emoji: "🎲",

        temptation: "Sua coleção ficará completa!",

        consequence: "Mas será que vale tanto dinheiro assim?",
      },

      {
        id: "entertainment",

        title: "Diversão Premium",

        description: "Uma experiência de diversão incrível!",

        cost: Math.floor(balance * 0.25),

        emoji: "🎪",

        temptation: "Você se divertirá como nunca!",

        consequence: "Mas a diversão passa rápido...",
      },
    ];

    const offerIndex = currentMonth % genericOffers.length;

    currentOffer = genericOffers[offerIndex];
  }

  const handleAccept = () => {
    onOfferAccept(currentOffer);
  };

  const handleReject = () => {
    onOfferReject();
  };
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.headerEmoji}>{currentOffer.emoji}</Text>

        <Text style={styles.headerTitle}>OFERTA ESPECIAL</Text>

        <Text style={styles.headerEmoji}>{currentOffer.emoji}</Text>
      </View>

      <Text style={styles.title}>{currentOffer.title}</Text>

      <Text style={styles.description}>{currentOffer.description}</Text>

      <View style={styles.priceBox}>
        <Text style={styles.priceText}>Só R$ {currentOffer.cost}</Text>

        <Text style={styles.percentText}>
          ({balance > 0 ? ((currentOffer.cost / balance) * 100).toFixed(0) : 0}%
          do seu dinheiro)
        </Text>
      </View>

      <View style={styles.temptationBox}>
        <Text style={styles.temptationText}>
          ✨ {currentOffer.temptation} ✨
        </Text>
      </View>

      <View style={styles.warningBox}>
        <Text style={styles.warningText}>⚠️ {currentOffer.consequence}</Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.rejectButton} onPress={handleReject}>
          <Text style={styles.rejectText}>Pensar Melhor 🤔</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
          <Text style={styles.acceptText}>QUERO AGORA! 🛒</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          ⏰ Esta oferta só aparece uma vez por mês!
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
    borderColor: "#FB923C",
  },

  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  headerEmoji: {
    fontSize: 28,
    marginHorizontal: 8,
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
    marginBottom: 10,
  },

  description: {
    textAlign: "center",
    color: COLORS.darkAccent,
    marginBottom: 16,
    lineHeight: 22,
  },

  priceBox: {
    backgroundColor: "#FFF7ED",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    alignItems: "center",
  },

  priceText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#EA580C",
  },

  percentText: {
    color: COLORS.darkAccent,
    marginTop: 4,
  },

  temptationBox: {
    backgroundColor: "#DCFCE7",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },

  temptationText: {
    textAlign: "center",
    fontWeight: "bold",
    color: COLORS.dark,
  },

  warningBox: {
    backgroundColor: "#FEF3C7",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },

  warningText: {
    textAlign: "center",
    color: COLORS.dark,
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
    backgroundColor: "#EA580C",
    borderRadius: 12,
    padding: 14,
  },

  acceptText: {
    textAlign: "center",
    fontWeight: "bold",
    color: COLORS.white,
  },

  footer: {
    backgroundColor: "#FEE2E2",
    borderRadius: 12,
    padding: 12,
  },

  footerText: {
    textAlign: "center",
    color: COLORS.dark,
    fontSize: 12,
  },
});
