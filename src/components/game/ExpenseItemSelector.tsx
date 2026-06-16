import { useState } from "react";

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS } from "@/constants/colors";

interface ExpenseItem {
  id: string;
  name: string;
  price: number;
  description?: string;
}

interface ExpenseItemSelectorProps {
  category: string;
  maxAmount: number;

  onClose: () => void;

  onConfirm: (selectedItems: ExpenseItem[], totalValue: number) => void;
}

export default function ExpenseItemSelector({
  category,
  maxAmount,
  onClose,
  onConfirm,
}: ExpenseItemSelectorProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const itemsByCategory: Record<string, ExpenseItem[]> = {
    necessities: [
      {
        id: "school_supplies",
        name: "Material escolar",
        price: 15,
        description: "Cadernos, canetas e lápis",
      },

      {
        id: "clothes",
        name: "Roupas básicas",
        price: 25,
      },

      {
        id: "shoes",
        name: "Calçados",
        price: 30,
      },

      {
        id: "hygiene",
        name: "Produtos de higiene",
        price: 12,
      },

      {
        id: "transport",
        name: "Transporte",
        price: 20,
      },

      {
        id: "books",
        name: "Livros didáticos",
        price: 18,
      },
    ],

    wants: [
      {
        id: "videogame",
        name: "Jogo novo",
        price: 25,
      },

      {
        id: "candy",
        name: "Doces",
        price: 8,
      },

      {
        id: "toys",
        name: "Brinquedos",
        price: 20,
      },

      {
        id: "trendy_clothes",
        name: "Roupas da moda",
        price: 35,
      },

      {
        id: "gadgets",
        name: "Acessórios tech",
        price: 40,
      },
    ],

    friends: [
      {
        id: "birthday_gift",
        name: "Presente",
        price: 20,
      },

      {
        id: "cinema",
        name: "Cinema",
        price: 15,
      },

      {
        id: "snacks_out",
        name: "Lanche",
        price: 10,
      },

      {
        id: "outing",
        name: "Passeio",
        price: 18,
      },
    ],

    emergency: [
      {
        id: "broken_item",
        name: "Conserto",
        price: 15,
      },

      {
        id: "urgent_medicine",
        name: "Remédio",
        price: 12,
      },

      {
        id: "transport_extra",
        name: "Transporte",
        price: 8,
      },
    ],
  };
  const items = itemsByCategory[category as keyof typeof itemsByCategory] || [];

  const getTotalValue = () => {
    return selectedItems.reduce((total, itemId) => {
      const item = items.find((i) => i.id === itemId);

      return total + (item?.price || 0);
    }, 0);
  };

  const handleItemToggle = (itemId: string) => {
    const item = items.find((i) => i.id === itemId);

    if (!item) return;

    const currentTotal = getTotalValue();

    const isSelected = selectedItems.includes(itemId);

    if (isSelected) {
      setSelectedItems((prev) => prev.filter((id) => id !== itemId));

      return;
    }

    if (currentTotal + item.price <= maxAmount) {
      setSelectedItems((prev) => [...prev, itemId]);
    }
  };

  const handleConfirm = () => {
    const selectedItemsData = items.filter((item) =>
      selectedItems.includes(item.id),
    );

    onConfirm(selectedItemsData, getTotalValue());
  };

  const totalValue = getTotalValue();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Escolha os Itens</Text>

        <Text style={styles.subtitle}>Orçamento: R$ {maxAmount}</Text>

        <Text style={styles.subtitle}>Selecionado: R$ {totalValue}</Text>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {items.map((item) => {
          const isSelected = selectedItems.includes(item.id);

          const wouldExceedBudget =
            !isSelected && totalValue + item.price > maxAmount;

          return (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.itemCard,

                isSelected && styles.selectedCard,

                wouldExceedBudget && styles.disabledCard,
              ]}
              onPress={() => handleItemToggle(item.id)}
              disabled={wouldExceedBudget}
            >
              <View style={styles.itemHeader}>
                <Text style={styles.checkbox}>{isSelected ? "☑️" : "⬜"}</Text>

                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>

                  {!!item.description && (
                    <Text style={styles.itemDescription}>
                      {item.description}
                    </Text>
                  )}
                </View>

                <Text style={styles.price}>R$ {item.price}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.total}>Total: R$ {totalValue}</Text>

        <Text style={styles.remaining}>
          Restante: R$
          {(maxAmount - totalValue).toFixed(0)}
        </Text>

        <View style={styles.buttons}>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirm}
          >
            <Text style={styles.confirmText}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 16,
  },

  header: {
    marginBottom: 16,
    alignItems: "center",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.dark,
  },

  subtitle: {
    color: COLORS.darkAccent,
    marginTop: 4,
  },

  scroll: {
    flexGrow: 0,
  },

  itemCard: {
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },

  selectedCard: {
    borderColor: COLORS.secondary,
    backgroundColor: "rgba(127,194,65,0.15)",
  },

  disabledCard: {
    opacity: 0.4,
  },

  itemHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  checkbox: {
    fontSize: 24,
    marginRight: 10,
  },

  itemInfo: {
    flex: 1,
  },

  itemName: {
    fontWeight: "bold",
    color: COLORS.dark,
  },

  itemDescription: {
    fontSize: 12,
    color: COLORS.darkAccent,
    marginTop: 4,
  },

  price: {
    fontWeight: "bold",
    color: COLORS.secondary,
    fontSize: 16,
  },

  footer: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#DDD",
    paddingTop: 12,
  },

  total: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.dark,
  },

  remaining: {
    textAlign: "center",
    marginTop: 6,
    color: COLORS.primary,
    fontWeight: "bold",
  },

  buttons: {
    flexDirection: "row",
    marginTop: 16,
    gap: 12,
  },

  cancelButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: COLORS.border,
    padding: 14,
    borderRadius: 12,
  },

  cancelText: {
    textAlign: "center",
    color: COLORS.dark,
    fontWeight: "bold",
  },

  confirmButton: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    padding: 14,
    borderRadius: 12,
  },

  confirmText: {
    textAlign: "center",
    color: COLORS.white,
    fontWeight: "bold",
  },
});
