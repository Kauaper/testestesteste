import { router } from "expo-router";
import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS } from "@/constants/colors";
import { useGame } from "@/context/GameContext";

export default function WelcomeScreen() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const { updateGameState, resetGame } = useGame();

  const handleStart = () => {
    if (!name || !age || parseInt(age) < 6 || parseInt(age) > 17) {
      return;
    }

    resetGame();

    const playerAge = parseInt(age);
    const isChild = playerAge < 14;
    const monthlyIncome = isChild ? 50 : 300;

    updateGameState({
      playerName: name,
      playerAge,
      isChild,
      balance: monthlyIncome,
      monthlyIncome,
      currentMonth: 1,
    });

    router.push("/presentation");
  };

  const isValid =
    name.trim() !== "" &&
    age !== "" &&
    parseInt(age) >= 6 &&
    parseInt(age) <= 17;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>CooperAção Kids</Text>

          <Text style={styles.description}>
            Vamos aprender a cuidar do dinheiro de forma divertida!
          </Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.label}>Qual é o seu apelido?</Text>

          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Digite seu apelido aqui..."
            style={styles.input}
          />

          <Text style={styles.label}>Quantos anos você tem?</Text>

          <TextInput
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
            placeholder="Sua idade"
            style={styles.input}
          />

          <TouchableOpacity
            onPress={handleStart}
            disabled={!isValid}
            style={[styles.button, !isValid && styles.buttonDisabled]}
          >
            <Text style={styles.buttonText}>Começar Aventura!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    padding: 20,
  },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 4,
    borderColor: COLORS.dark,
    overflow: "hidden",
  },

  header: {
    backgroundColor: COLORS.primary,
    padding: 24,
    alignItems: "center",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: COLORS.dark,
    textAlign: "center",
  },

  description: {
    marginTop: 8,
    color: COLORS.dark,
    textAlign: "center",
    fontSize: 16,
  },

  content: {
    padding: 24,
  },

  label: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.dark,
    marginBottom: 8,
  },

  input: {
    borderWidth: 2,
    borderColor: COLORS.secondary,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 20,
  },

  button: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  buttonDisabled: {
    opacity: 0.5,
  },

  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
  },
});
