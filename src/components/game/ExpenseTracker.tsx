
import { StyleSheet, Text, View } from "react-native";

import { COLORS } from "@/constants/colors";

interface ExpenseTrackerProps {
  currentMonth: number;

  monthlyExpenses: {
    pet: number;
    personal: number;
    friends: number;
    investments: number;
    emergencies: number;
  }[];
}

export default function ExpenseTracker({
  currentMonth,
  monthlyExpenses,
}: ExpenseTrackerProps) {
  if (currentMonth <= 1) {
    return null;
  }

  const currentExpenses = monthlyExpenses[currentMonth - 2];

  const previousExpenses = monthlyExpenses[currentMonth - 3];

  if (!currentExpenses && !previousExpenses) {
    return null;
  }
  const categories = [
    {
      key: "pet",
      label: "Cuidados Pet",
      color: COLORS.secondary,
    },

    {
      key: "personal",
      label: "Pessoais",
      color: COLORS.primary,
    },

    {
      key: "friends",
      label: "Social",
      color: COLORS.background,
    },

    {
      key: "investments",
      label: "Investimentos",
      color: COLORS.dark,
    },

    {
      key: "emergencies",
      label: "Emergências",
      color: COLORS.darkAccent,
    },
  ];

  const getMaxValue = () => {
    const allValues = monthlyExpenses.flatMap((month) => Object.values(month));

    return Math.max(...allValues, 50);
  };

  const maxValue = getMaxValue();
  return (
    <View style={styles.card}>
      <Text style={styles.title}>📊 Histórico de Gastos</Text>

      {categories.map((category) => {
        const currentValue =
          currentExpenses?.[category.key as keyof typeof currentExpenses] || 0;

        const previousValue =
          previousExpenses?.[category.key as keyof typeof previousExpenses] ||
          0;

        const currentPercent = (currentValue / maxValue) * 100;

        const previousPercent = (previousValue / maxValue) * 100;

        const change = currentValue - previousValue;

        return (
          <View key={category.key} style={styles.categoryContainer}>
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryName}>{category.label}</Text>

              <View>
                <Text style={styles.currentValue}>
                  R$ {currentValue.toFixed(0)}
                </Text>

                {change !== 0 && previousExpenses && (
                  <Text
                    style={[
                      styles.changeText,
                      {
                        color: change > 0 ? "#DC2626" : COLORS.secondary,
                      },
                    ]}
                  >
                    ({change > 0 ? "+" : ""}
                    R$ {change.toFixed(0)})
                  </Text>
                )}
              </View>
            </View>

            <View style={styles.barContainer}>
              {previousValue > 0 && (
                <View
                  style={[
                    styles.previousBar,
                    {
                      width: `${previousPercent}%`,
                    },
                  ]}
                />
              )}

              <View
                style={[
                  styles.currentBar,
                  {
                    width: `${currentPercent}%`,
                    backgroundColor: category.color,
                  },
                ]}
              >
                {currentValue > 0 && (
                  <Text style={styles.barText}>{currentValue.toFixed(0)}</Text>
                )}
              </View>
            </View>
          </View>
        );
      })}
      <View style={styles.totalBox}>
        <Text style={styles.totalLabel}>Total do Mês</Text>

        <Text style={styles.totalValue}>
          R$
          {currentExpenses
            ? Object.values(currentExpenses)
                .reduce((sum, value) => sum + value, 0)
                .toFixed(0)
            : "0"}
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

  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: COLORS.dark,
    marginBottom: 20,
  },

  categoryContainer: {
    marginBottom: 16,
  },

  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },

  categoryName: {
    fontWeight: "bold",
    color: COLORS.dark,
  },

  currentValue: {
    textAlign: "right",
    fontWeight: "bold",
    color: COLORS.dark,
  },

  changeText: {
    fontSize: 12,
    textAlign: "right",
  },

  barContainer: {
    height: 26,
    justifyContent: "center",
  },

  previousBar: {
    position: "absolute",
    height: 26,
    backgroundColor: "#D1D5DB",
    borderRadius: 8,
    opacity: 0.6,
  },

  currentBar: {
    height: 26,
    borderRadius: 8,
    justifyContent: "center",
    paddingHorizontal: 8,
  },

  barText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 12,
  },

  totalBox: {
    marginTop: 20,
    borderTopWidth: 2,
    borderTopColor: COLORS.border,
    paddingTop: 16,
    alignItems: "center",
  },

  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.dark,
  },

  totalValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.dark,
    marginTop: 6,
  },
});
