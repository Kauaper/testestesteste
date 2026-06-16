import { useState } from "react";

import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { COLORS } from "@/constants/colors";
import { useGame } from "@/context/GameContext";

interface Product {
  id: string;
  name: string;
  emoji: string;

  stores: {
    name: string;
    price: number;
    quality: "baixa" | "média" | "alta";

    distance: string;
  }[];
}

interface ShoppingMiniGameProps {
  onComplete: (savings: number, lesson: string) => void;
}

export default function ShoppingMiniGame({
  onComplete,
}: ShoppingMiniGameProps) {
  const { gameState } = useGame();

  const [selectedStore, setSelectedStore] = useState("");

  const [showResult, setShowResult] = useState(false);
  const products: Product[] = [
    {
      id: "school_supplies",

      name: "Kit Escolar",

      emoji: "📚",

      stores: [
        {
          name: "Loja Cara",
          price: 45,
          quality: "alta",
          distance: "Perto",
        },

        {
          name: "Loja Média",
          price: 30,
          quality: "média",
          distance: "Médio",
        },

        {
          name: "Loja Barata",
          price: 18,
          quality: "baixa",
          distance: "Longe",
        },

        {
          name: "Promoção",
          price: 25,
          quality: "alta",
          distance: "Perto",
        },
      ],
    },

    {
      id: "pet_food",

      name: "Ração do Pet",

      emoji: "🍖",

      stores: [
        {
          name: "Pet Shop Premium",
          price: 35,
          quality: "alta",
          distance: "Médio",
        },

        {
          name: "Supermercado",
          price: 22,
          quality: "média",
          distance: "Perto",
        },

        {
          name: "Atacado",
          price: 15,
          quality: "baixa",
          distance: "Longe",
        },

        {
          name: "Oferta Online",
          price: 20,
          quality: "alta",
          distance: "Entrega",
        },
      ],
    },

    {
      id: "birthday_gift",

      name: "Presente de Aniversário",

      emoji: "🎁",

      stores: [
        {
          name: "Loja de Brinquedos",
          price: 50,
          quality: "alta",
          distance: "Perto",
        },

        {
          name: "Loja Popular",
          price: 30,
          quality: "média",
          distance: "Médio",
        },

        {
          name: "Bazar",
          price: 15,
          quality: "baixa",
          distance: "Longe",
        },

        {
          name: "Feira de Usados",
          price: 12,
          quality: "média",
          distance: "Longe",
        },
      ],
    },
  ];
  const currentProduct = products[gameState.currentMonth % products.length];

  const bestValue =
    currentProduct.stores.find(
      (store) =>
        store.quality === "alta" &&
        store.price <=
          Math.min(...currentProduct.stores.map((s) => s.price)) + 10,
    ) ||
    currentProduct.stores.reduce((best, current) =>
      current.price /
        (current.quality === "alta" ? 3 : current.quality === "média" ? 2 : 1) <
      best.price /
        (best.quality === "alta" ? 3 : best.quality === "média" ? 2 : 1)
        ? current
        : best,
    );

  const handleStoreSelect = (storeName: string) => {
    setSelectedStore(storeName);
  };

  const handleConfirm = () => {
    const selectedStoreData = currentProduct.stores.find(
      (s) => s.name === selectedStore,
    );

    if (!selectedStoreData) {
      return;
    }

    setShowResult(true);

    const savings = Math.max(0, bestValue.price - selectedStoreData.price);

    const isGoodChoice =
      selectedStoreData === bestValue ||
      (selectedStoreData.quality === "alta" &&
        selectedStoreData.price <= bestValue.price + 5);

    const lesson = isGoodChoice
      ? "Excelente escolha! Você encontrou a melhor relação custo-benefício!"
      : savings > 0
        ? "Boa economia! Às vezes vale a pena pagar um pouco mais pela qualidade."
        : "Aprendizado importante: sempre compare preços e qualidade antes de comprar!";

    setTimeout(() => {
      onComplete(savings, lesson);
    }, 3000);
  };

  const selectedStoreData = currentProduct.stores.find(
    (s) => s.name === selectedStore,
  );
  if (!showResult) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerEmoji}>🛒</Text>

          <Text style={styles.title}>MINI-GAME:</Text>

          <Text style={styles.subtitle}>COMPRA INTELIGENTE</Text>

          <Text style={styles.description}>
            Compare preços e escolha a melhor opção!
          </Text>
        </View>

        <View style={styles.productCard}>
          <Text style={styles.productEmoji}>{currentProduct.emoji}</Text>

          <Text style={styles.productTitle}>Você precisa comprar:</Text>

          <Text style={styles.productName}>{currentProduct.name}</Text>

          <Text style={styles.productText}>Onde você vai comprar?</Text>
        </View>
        {currentProduct.stores.map((store) => (
          <TouchableOpacity
            key={store.name}
            style={[
              styles.storeCard,

              selectedStore === store.name && styles.storeSelected,
            ]}
            onPress={() => handleStoreSelect(store.name)}
          >
            <View style={styles.storeRow}>
              <Text style={styles.storeName}>{store.name}</Text>

              <Text style={styles.storePrice}>R$ {store.price}</Text>
            </View>

            <View style={styles.storeInfoRow}>
              <Text style={styles.storeInfo}>⭐ {store.quality}</Text>

              <Text style={styles.storeInfo}>📍 {store.distance}</Text>
            </View>
          </TouchableOpacity>
        ))}
        <View style={styles.tipBox}>
          <Text style={styles.tipTitle}>🤔 Dicas</Text>

          <Text style={styles.tipText}>
            • Preço mais baixo nem sempre é melhor
          </Text>

          <Text style={styles.tipText}>• Qualidade alta dura mais tempo</Text>

          <Text style={styles.tipText}>• Compare antes de comprar</Text>
        </View>

        <TouchableOpacity
          style={[
            styles.confirmButton,

            !selectedStore && styles.disabledButton,
          ]}
          disabled={!selectedStore}
          onPress={handleConfirm}
        >
          <Text style={styles.confirmButtonText}>Confirmar Compra! 🛍️</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
  return (
    <View style={styles.resultContainer}>
      <Text style={styles.resultEmoji}>🎉</Text>

      <Text style={styles.resultTitle}>Compra Realizada!</Text>

      <View style={styles.resultCard}>
        <Text style={styles.resultLabel}>Loja Escolhida:</Text>

        <Text style={styles.resultValue}>{selectedStoreData?.name}</Text>

        <Text style={styles.resultPrice}>R$ {selectedStoreData?.price}</Text>
      </View>

      <View style={styles.lessonCard}>
        <Text style={styles.lessonTitle}>📚 O que aprendemos?</Text>

        <Text style={styles.lessonText}>
          {selectedStoreData === bestValue
            ? "Excelente! Você encontrou a melhor opção disponível."
            : "Comparar preços e qualidade ajuda a tomar decisões melhores."}
        </Text>
      </View>

      {selectedStoreData === bestValue && (
        <View style={styles.successCard}>
          <Text style={styles.successText}>🏆 Melhor Escolha!</Text>
        </View>
      )}

      <Text style={styles.waitText}>Continuando...</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },

  header: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: "center",
  },

  headerEmoji: {
    fontSize: 60,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.dark,
    marginTop: 10,
  },

  subtitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
    marginTop: 4,
  },

  description: {
    marginTop: 10,
    textAlign: "center",
    color: COLORS.darkAccent,
  },

  productCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: "center",
  },

  productEmoji: {
    fontSize: 60,
  },

  productTitle: {
    marginTop: 10,
    fontSize: 16,
    color: COLORS.darkAccent,
  },

  productName: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.dark,
    marginTop: 6,
  },

  productText: {
    marginTop: 8,
    color: COLORS.darkAccent,
  },

  storeCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 2,
    borderColor: COLORS.border,
  },

  storeSelected: {
    borderColor: COLORS.primary,
    borderWidth: 4,
  },

  storeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  storeName: {
    fontWeight: "bold",
    color: COLORS.dark,
    fontSize: 16,
  },

  storePrice: {
    fontWeight: "bold",
    color: COLORS.secondary,
    fontSize: 18,
  },

  storeInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },

  storeInfo: {
    color: COLORS.darkAccent,
    fontSize: 13,
  },

  tipBox: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 16,
  },

  tipTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
    color: COLORS.dark,
  },

  tipText: {
    color: COLORS.darkAccent,
    marginBottom: 4,
  },

  confirmButton: {
    backgroundColor: COLORS.secondary,
    padding: 18,
    borderRadius: 12,
  },

  disabledButton: {
    opacity: 0.5,
  },

  confirmButtonText: {
    color: COLORS.white,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },

  resultContainer: {
    padding: 20,
    alignItems: "center",
  },

  resultEmoji: {
    fontSize: 80,
  },

  resultTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.dark,
    marginVertical: 16,
  },

  resultCard: {
    width: "100%",
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: "center",
  },

  resultLabel: {
    color: COLORS.darkAccent,
  },

  resultValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.dark,
    marginTop: 6,
  },

  resultPrice: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.secondary,
    marginTop: 10,
  },

  lessonCard: {
    marginTop: 16,
    width: "100%",
    backgroundColor: COLORS.background,
    padding: 16,
    borderRadius: 14,
  },

  lessonTitle: {
    fontWeight: "bold",
    color: COLORS.dark,
    marginBottom: 8,
  },

  lessonText: {
    color: COLORS.darkAccent,
  },

  successCard: {
    marginTop: 16,
    backgroundColor: COLORS.secondary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },

  successText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 18,
  },

  waitText: {
    marginTop: 20,
    color: COLORS.darkAccent,
    fontStyle: "italic",
  },
});
