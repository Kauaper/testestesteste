import { useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import ExtraTaskOpportunity from "@/components/game/ExtraTaskOpportunity";
import { COLORS } from "@/constants/colors";
import { useGame } from "@/context/GameContext";

interface MonthlyExpensesProps {
  currentMonth: number;
  balance: number;
  petCost: number;
  extraEarnings?: number;
  acceptedTemptation?: { cost: number } | null;
  acceptedSpecialAction?: { cost: number } | null;
  onExpensesConfirm: (
    expenses: Record<string, number>,
    extraEarnings?: number,
  ) => void;
}

export default function MonthlyExpenses({
  currentMonth,
  balance,
  petCost,
  extraEarnings = 0,
  acceptedTemptation = null,
  acceptedSpecialAction = null,
  onExpensesConfirm,
}: MonthlyExpensesProps) {
  const { gameState } = useGame();

  const [expenses, setExpenses] = useState<Record<string, number>>({
    pet: petCost,
  });

  const [showExtraTask, setShowExtraTask] = useState(false);

  const [currentExtraEarnings, setCurrentExtraEarnings] =
    useState(extraEarnings);

  const pets = {
    dog: {
      name: "Cachorrinho",
      emoji: "🐶",
      cost: 15,
    },
    cat: {
      name: "Gatinho",
      emoji: "🐱",
      cost: 12,
    },
    hamster: {
      name: "Hamster",
      emoji: "🐹",
      cost: 8,
    },
    fish: {
      name: "Peixinho",
      emoji: "🐠",
      cost: 5,
    },
    bird: {
      name: "Passarinho",
      emoji: "🐦",
      cost: 10,
    },
    turtle: {
      name: "Tartaruga",
      emoji: "🐢",
      cost: 7,
    },
  };

  const selectedPet = pets[gameState.selectedPet as keyof typeof pets];

  const realPetCost = selectedPet?.cost || 15;
  useEffect(() => {
    const newExpenses: Record<string, number> = {
      ...expenses,
      pet: realPetCost,
    };

    if (acceptedTemptation) {
      newExpenses.temptation = acceptedTemptation.cost;
    }

    if (acceptedSpecialAction) {
      newExpenses.specialAction = acceptedSpecialAction.cost;
    }

    setExpenses(newExpenses);
  }, [realPetCost, acceptedTemptation, acceptedSpecialAction]);

  useEffect(() => {
    setCurrentExtraEarnings(extraEarnings);
  }, [extraEarnings]);

  const simpleCategories = [
    {
      id: "necessities",
      name: "Coisas Importantes",
      emoji: "📚",
      description: "Material escolar, roupas e transporte",
    },
    {
      id: "wants",
      name: "Coisas Divertidas",
      emoji: "🎮",
      description: "Jogos, doces e brinquedos",
    },
    {
      id: "friends",
      name: "Diversão com Amigos",
      emoji: "👫",
      description: "Cinema, presentes e lanches",
    },
  ];

  const handleCategoryChange = (categoryId: string, amount: number) => {
    setExpenses((prev) => ({
      ...prev,
      [categoryId]: amount,
    }));
  };

  const getTotalSpent = () => {
    return Object.values(expenses).reduce((sum, amount) => sum + amount, 0);
  };

  const totalAvailable = balance + currentExtraEarnings;

  const totalSpent = getTotalSpent();

  const remainingBalance = totalAvailable - totalSpent;
  const handleExtraTaskAccept = (task: any) => {
    setCurrentExtraEarnings((prev) => prev + task.earning);

    setShowExtraTask(false);
  };

  const handleExtraTaskReject = () => {
    setShowExtraTask(false);
  };

  const handleConfirm = () => {
    if (remainingBalance < 0 && !showExtraTask) {
      setShowExtraTask(true);
      return;
    }

    if (remainingBalance < 0) {
      return;
    }

    onExpensesConfirm(expenses, currentExtraEarnings);
  };

  if (showExtraTask) {
    return (
      <ExtraTaskOpportunity
        currentMonth={currentMonth}
        deficit={Math.abs(remainingBalance)}
        onTaskAccept={handleExtraTaskAccept}
        onTaskReject={handleExtraTaskReject}
      />
    );
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* SALDO */}
        <View style={styles.card}>
          <Text style={styles.title}>
            💰 Meu Dinheiro do Mês {currentMonth}
          </Text>

          <View style={styles.moneyBox}>
            <Text style={styles.moneyLabel}>Tenho para gastar</Text>

            <Text style={styles.moneyValue}>
              R$ {totalAvailable.toFixed(0)}
            </Text>

            {currentExtraEarnings > 0 && (
              <Text style={styles.extraMoney}>
                +R$ {currentExtraEarnings} extras ✨
              </Text>
            )}
          </View>

          <View style={styles.summaryRow}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>Gastei</Text>

              <Text style={styles.summarySpent}>
                R$ {totalSpent.toFixed(0)}
              </Text>
            </View>

            <View style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>Sobra</Text>

              <Text
                style={[
                  styles.summaryRemaining,
                  {
                    color: remainingBalance >= 0 ? "green" : "red",
                  },
                ]}
              >
                R$ {remainingBalance.toFixed(0)}
              </Text>
            </View>
          </View>
        </View>

        {/* PET */}
        <View style={styles.card}>
          <View style={styles.petRow}>
            <Text style={styles.petEmoji}>{selectedPet?.emoji}</Text>

            <View style={{ flex: 1 }}>
              <Text style={styles.petTitle}>Meu {selectedPet?.name}</Text>

              <Text style={styles.petDescription}>
                Precisa de cuidados todos os meses
              </Text>

              <Text style={styles.petStats}>
                ❤️ {gameState.petHealth.toFixed(0)}%
              </Text>

              <Text style={styles.petStats}>
                😊 {gameState.petHappiness.toFixed(0)}%
              </Text>
            </View>

            <View style={styles.petCostBox}>
              <Text style={styles.petCost}>R$ {realPetCost}</Text>

              <Text style={styles.required}>OBRIGATÓRIO</Text>
            </View>
          </View>
        </View>
        {/* CATEGORIAS */}
        {simpleCategories.map((category) => {
          const currentAmount = expenses[category.id] || 0;

          const alreadyCommitted =
            realPetCost +
            (expenses.temptation || 0) +
            (expenses.specialAction || 0);

          const maxValue = Math.max(0, totalAvailable - alreadyCommitted);

          return (
            <View key={category.id} style={styles.card}>
              <Text style={styles.categoryTitle}>
                {category.emoji} {category.name}
              </Text>

              <Text style={styles.categoryDescription}>
                {category.description}
              </Text>

              <Text style={styles.currentValue}>R$ {currentAmount}</Text>

              <View style={styles.optionsRow}>
                {[0, 0.2, 0.4, 0.6, 0.8, 1].map((percentage) => {
                  const amount = Math.floor(maxValue * percentage);

                  const selected = currentAmount === amount;

                  return (
                    <TouchableOpacity
                      key={percentage}
                      style={[
                        styles.optionButton,
                        selected && styles.optionSelected,
                      ]}
                      onPress={() => handleCategoryChange(category.id, amount)}
                    >
                      <Text
                        style={{
                          color: selected ? "white" : COLORS.dark,
                          fontSize: 12,
                        }}
                      >
                        {amount}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          );
        })}
        <View style={styles.confirmCard}>
          <Text style={styles.confirmTitle}>
            {remainingBalance >= 0
              ? "✅ Planejamento do Mês"
              : "💪 Posso Ganhar Dinheiro Extra"}
          </Text>

          {remainingBalance < 0 && (
            <Text style={styles.warning}>
              Você gastou R$ {Math.abs(remainingBalance).toFixed(0)} a mais do
              que possui.
            </Text>
          )}

          <TouchableOpacity
            style={[
              styles.confirmButton,
              {
                backgroundColor: remainingBalance >= 0 ? "#16A34A" : "#EA580C",
              },
            ]}
            onPress={handleConfirm}
          >
            <Text style={styles.confirmButtonText}>
              {remainingBalance >= 0
                ? "Confirmar Gastos"
                : "Buscar Trabalho Extra"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
    padding: 16,
    marginBottom: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: COLORS.dark,
    marginBottom: 16,
  },

  moneyBox: {
    backgroundColor: "#FEF3C7",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 16,
  },

  moneyLabel: {
    fontSize: 14,
    color: COLORS.darkAccent,
  },

  moneyValue: {
    fontSize: 36,
    fontWeight: "bold",
    color: COLORS.dark,
  },

  extraMoney: {
    marginTop: 4,
    color: "#16A34A",
    fontWeight: "bold",
  },

  summaryRow: {
    flexDirection: "row",
    gap: 10,
  },

  summaryCard: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
  },

  summaryLabel: {
    fontSize: 12,
    color: COLORS.darkAccent,
  },

  summarySpent: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#DC2626",
  },

  summaryRemaining: {
    fontSize: 22,
    fontWeight: "bold",
  },

  petRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  petEmoji: {
    fontSize: 50,
    marginRight: 12,
  },

  petTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.dark,
  },

  petDescription: {
    color: COLORS.darkAccent,
    marginTop: 4,
  },

  petStats: {
    marginTop: 2,
    fontWeight: "600",
    color: COLORS.dark,
  },

  petCostBox: {
    alignItems: "center",
  },

  petCost: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#9333EA",
  },

  required: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#DC2626",
  },

  categoryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.dark,
  },

  categoryDescription: {
    color: COLORS.darkAccent,
    marginTop: 4,
    marginBottom: 10,
  },

  currentValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 12,
  },

  optionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },

  optionButton: {
    backgroundColor: "#E5E7EB",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },

  optionSelected: {
    backgroundColor: COLORS.dark,
  },

  confirmCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.secondary,
    padding: 20,
    marginBottom: 20,
  },

  confirmTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: COLORS.dark,
    marginBottom: 10,
  },

  warning: {
    textAlign: "center",
    color: "#EA580C",
    marginBottom: 15,
    fontWeight: "600",
  },

  confirmButton: {
    paddingVertical: 16,
    borderRadius: 12,
  },

  confirmButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
