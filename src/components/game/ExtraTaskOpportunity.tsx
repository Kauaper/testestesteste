import { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { COLORS } from "@/constants/colors";

interface ExtraTask {
  id: string;
  title: string;
  description: string;
  earning: number;
  emoji: string;
  effort: string;
  timeRequired: string;
}

interface Props {
  currentMonth: number;
  deficit: number;
  onTaskAccept: (task: ExtraTask) => void;
  onTaskReject: () => void;
}

export default function ExtraTaskOpportunity({
  deficit,
  onTaskAccept,
  onTaskReject,
}: Props) {
  const extraTasks: ExtraTask[] = [
    {
      id: "wash_car",
      title: "Lavar o Carro dos Pais",
      description:
        "Seus pais precisam lavar o carro e podem te pagar por isso!",
      earning: Math.ceil(deficit * 1.2),
      emoji: "🚗",
      effort: "Vai molhar um pouco, mas é divertido!",
      timeRequired: "1 hora",
    },
    {
      id: "organize_room",
      title: "Organizar o Quarto dos Irmãos",
      description:
        "Seus irmãos mais novos bagunçaram tudo e precisam de ajuda!",
      earning: Math.ceil(deficit * 1.1),
      emoji: "🏠",
      effort: "Precisa de paciência!",
      timeRequired: "45 minutos",
    },
    {
      id: "walk_dogs",
      title: "Passear com os Cachorros da Vizinha",
      description:
        "Dona Rosa precisa de alguém para passear com seus cachorrinhos!",
      earning: Math.ceil(deficit * 1.3),
      emoji: "🐕",
      effort: "Os cachorros são muito fofos!",
      timeRequired: "30 minutos",
    },
  ];

  const selectedTask = useMemo(() => {
    return extraTasks[Math.floor(Math.random() * extraTasks.length)];
  }, []);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{selectedTask.emoji} Trabalho Extra</Text>

      <Text style={styles.deficit}>Você precisa de R$ {deficit}</Text>

      <Text style={styles.taskTitle}>{selectedTask.title}</Text>

      <Text style={styles.description}>{selectedTask.description}</Text>

      <View style={styles.moneyBox}>
        <Text style={styles.money}>+R$ {selectedTask.earning}</Text>
      </View>

      <Text style={styles.info}>⏰ {selectedTask.timeRequired}</Text>

      <Text style={styles.info}>💪 {selectedTask.effort}</Text>

      <TouchableOpacity
        style={styles.acceptButton}
        onPress={() => onTaskAccept(selectedTask)}
      >
        <Text style={styles.buttonText}>ACEITO O TRABALHO 💪</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.rejectButton} onPress={onTaskReject}>
        <Text style={styles.buttonText}>Reduzir Gastos 😅</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    margin: 16,
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: COLORS.dark,
    marginBottom: 12,
  },

  deficit: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#EA580C",
    marginBottom: 12,
  },

  taskTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: COLORS.dark,
  },

  description: {
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
  },

  moneyBox: {
    backgroundColor: "#DCFCE7",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },

  money: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#16A34A",
  },

  info: {
    textAlign: "center",
    marginBottom: 8,
    color: COLORS.darkAccent,
  },

  acceptButton: {
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: 10,
    marginTop: 15,
  },

  rejectButton: {
    backgroundColor: "#6B7280",
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
  },

  buttonText: {
    textAlign: "center",
    color: COLORS.white,
    fontWeight: "bold",
  },
});
