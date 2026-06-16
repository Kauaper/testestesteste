import { useEffect, useState } from "react";

import { Text, View } from "react-native";

import { useGame } from "@/context/GameContext";

import ChapterSpecialEvent from "./ChapterSpecialEvent";
import CollectibleStickers from "./CollectibleStickers";
import GameEnding from "./GameEnding";
import MonthlyExpenses from "./MonthlyExpenses";
import PetInteraction from "./PetInteraction";
import ShoppingMiniGame from "./ShoppingMiniGame";
import VisualPiggyBank from "./VisualPiggyBank";

export default function MonthlyActions() {
  const { gameState, updateGameState } = useGame();

  const [currentStep, setCurrentStep] = useState("expenses");

  const [monthlyExpenses, setMonthlyExpenses] = useState<
    Record<string, number>
  >({});

  const [extraEarnings, setExtraEarnings] = useState(0);

  const [investmentAmount, setInvestmentAmount] = useState("");

  const [activeTab, setActiveTab] = useState("expenses");

  const [showChapterEvent, setShowChapterEvent] = useState(false);

  const [showShoppingGame, setShowShoppingGame] = useState(false);
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

  const petCost = selectedPet?.cost || 15;
  useEffect(() => {
    if (gameState.currentMonth > 1) {
      updateGameState({
        currentMonthExtraExpenses: {
          goalDeposits: 0,
          petCare: 0,
        },
      });

      setShowChapterEvent(false);

      setShowShoppingGame(false);

      const healthDecrease = Math.random() * 15 + 5;

      const happinessDecrease = Math.random() * 10 + 5;

      updateGameState({
        petHealth: Math.max(0, gameState.petHealth - healthDecrease),

        petHappiness: Math.max(0, gameState.petHappiness - happinessDecrease),
      });

      setTimeout(() => {
        if (gameState.currentMonth === 3) {
          setShowShoppingGame(true);
        } else {
          setShowChapterEvent(true);
        }
      }, 500);
    }
  }, [gameState.currentMonth]);
  const needsVet = gameState.petHealth <= 0;

  if (gameState.currentMonth > 12) {
    return <GameEnding />;
  }

  const handleChapterEventComplete = (result: any) => {
    if (result.moneyChange !== 0) {
      updateGameState({
        balance: gameState.balance + result.moneyChange,
      });
    }

    if (result.petHappinessChange !== 0) {
      updateGameState({
        petHappiness: Math.min(
          100,
          Math.max(0, gameState.petHappiness + result.petHappinessChange),
        ),
      });
    }

    if (result.extraEarnings > 0) {
      setExtraEarnings((prev) => prev + result.extraEarnings);
    }

    if (result.achievement) {
      if (!gameState.achievements.includes(result.achievement)) {
        updateGameState({
          achievements: [...gameState.achievements, result.achievement],
        });
      }
    }

    setShowChapterEvent(false);
  };
  const handleShoppingGameComplete = (savings: number) => {
    if (savings > 0) {
      setExtraEarnings((prev) => prev + savings);

      if (!gameState.achievements.includes("smart_spender")) {
        updateGameState({
          achievements: [...gameState.achievements, "smart_spender"],
        });
      }
    }

    setShowShoppingGame(false);
  };

  const handleExpensesConfirm = (
    expenses: Record<string, number>,
    earnings = 0,
  ) => {
    const expensesWithExtras = {
      ...expenses,

      goalDeposit: gameState.currentMonthExtraExpenses.goalDeposits,

      petCareExtra: gameState.currentMonthExtraExpenses.petCare,
    };

    setMonthlyExpenses(expensesWithExtras);

    setExtraEarnings(earnings);

    setCurrentStep("investment");
  };

  const calculateRemainingAfterExpenses = () => {
    const totalExpenses = Object.values(monthlyExpenses).reduce(
      (sum, amount) => sum + amount,
      0,
    );

    return gameState.balance + extraEarnings - totalExpenses;
  };

  const handleInvestmentConfirm = () => {
    const investAmount = parseFloat(investmentAmount) || 0;

    let newBalance = calculateRemainingAfterExpenses() - investAmount;

    let newInvestmentBalance = gameState.investmentBalance + investAmount;

    newInvestmentBalance *= 1.01;

    const newMonth = gameState.currentMonth + 1;
    let parentLoanDeduction = 0;

    let updatedParentLoan = gameState.parentLoan;

    if (gameState.parentLoan.amount > 0) {
      parentLoanDeduction = gameState.parentLoan.amount;

      newBalance -= parentLoanDeduction;

      updatedParentLoan = {
        amount: 0,
        reason: "",
      };
    }

    if (newMonth <= 12) {
      newBalance += gameState.monthlyIncome;
    }
    const newMonthlyExpenses = [
      ...gameState.monthlyExpenses,

      {
        pet: monthlyExpenses.pet || 0,

        personal:
          (monthlyExpenses.necessities || 0) +
          (monthlyExpenses.wants || 0) +
          (monthlyExpenses.temptation || 0) +
          (monthlyExpenses.specialAction || 0) +
          (monthlyExpenses.goalDeposit || 0) +
          (monthlyExpenses.petCareExtra || 0),

        friends: monthlyExpenses.friends || 0,

        investments: investAmount,

        emergencies: parentLoanDeduction,
      },
    ];
    const newAchievements = [...gameState.achievements];

    if (investAmount > 0 && !newAchievements.includes("first_investment")) {
      newAchievements.push("first_investment");
    }

    const monthsWithInvestments = newMonthlyExpenses.filter(
      (month) => month.investments > 0,
    ).length;

    if (
      monthsWithInvestments >= 3 &&
      !newAchievements.includes("future_planner")
    ) {
      newAchievements.push("future_planner");
    }

    if (
      newBalance + newInvestmentBalance >= 100 &&
      gameState.currentMonth >= 3 &&
      !newAchievements.includes("saver")
    ) {
      newAchievements.push("saver");
    }
    const totalPetCare =
      newMonthlyExpenses.reduce((sum, month) => sum + month.pet, 0) +
      gameState.currentMonthExtraExpenses.petCare;

    const totalFriends = newMonthlyExpenses.reduce(
      (sum, month) => sum + month.friends,
      0,
    );

    if (
      gameState.petHealth >= 70 &&
      gameState.personalGoal &&
      totalFriends >= 20 &&
      gameState.currentMonth >= 4 &&
      !newAchievements.includes("balanced_life")
    ) {
      newAchievements.push("balanced_life");
    }

    if (totalPetCare >= 50 && !newAchievements.includes("pet_lover")) {
      newAchievements.push("pet_lover");
    }

    if (
      totalFriends >= 30 &&
      totalFriends <= 100 &&
      !newAchievements.includes("social_butterfly")
    ) {
      newAchievements.push("social_butterfly");
    }
    updateGameState({
      currentMonth: newMonth,

      balance: Math.max(0, newBalance),

      investmentBalance: newInvestmentBalance,

      monthlyExpenses: newMonthlyExpenses,

      parentLoan: updatedParentLoan,

      achievements: newAchievements,
    });

    setCurrentStep("results");
  };

  const resetForNextMonth = () => {
    setCurrentStep("expenses");

    setActiveTab("expenses");

    setMonthlyExpenses({});

    setExtraEarnings(0);

    setInvestmentAmount("");
  };

  if (currentStep === "expenses") {
    if (showChapterEvent) {
      return (
        <ChapterSpecialEvent
          currentMonth={gameState.currentMonth}
          balance={gameState.balance + extraEarnings}
          petCost={petCost}
          onEventComplete={handleChapterEventComplete}
        />
      );
    }

    if (showShoppingGame) {
      return <ShoppingMiniGame onComplete={handleShoppingGameComplete} />;
    }
    if (needsVet && activeTab !== "pet") {
      setActiveTab("pet");
    }
    const tabs = [
      {
        id: "expenses",
        name: "Gastos",
        emoji: "💰",
      },

      {
        id: "pet",
        name: needsVet ? "VET!" : "Pet",

        emoji: needsVet ? "🚨" : selectedPet?.emoji || "🐾",
      },

      {
        id: "goal",
        name: "Meta",
        emoji: "🎯",
      },

      {
        id: "stickers",
        name: "Selos",
        emoji: "🏷️",
      },
    ];
    return (
      <View
        style={{
          gap: 16,
        }}
      >
        {needsVet && (
          <View>
            <Text>🚨 EMERGÊNCIA VETERINÁRIA</Text>

            <Text>Seu pet precisa de ajuda!</Text>
          </View>
        )}

        {gameState.parentLoan.amount > 0 && (
          <View>
            <Text>💳 Empréstimo: R$ {gameState.parentLoan.amount}</Text>
          </View>
        )}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "#FFFFFF",
            borderRadius: 16,
            padding: 8,
            borderWidth: 2,
            borderColor: "#D8D8D8",
          }}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <Text
                key={tab.id}
                onPress={() => setActiveTab(tab.id)}
                style={{
                  flex: 1,
                  textAlign: "center",
                  paddingVertical: 14,
                  borderRadius: 12,
                  overflow: "hidden",

                  backgroundColor: isActive ? "#3267E3" : "#F1F1F1",

                  color: isActive ? "#FFFFFF" : "#333333",

                  fontWeight: "bold",
                }}
              >
                {tab.emoji}
                {"\n"}
                {tab.name}
              </Text>
            );
          })}
        </View>
        {activeTab === "expenses" && !needsVet && (
          <MonthlyExpenses
            currentMonth={gameState.currentMonth}
            balance={gameState.balance}
            petCost={petCost}
            onExpensesConfirm={handleExpensesConfirm}
            extraEarnings={extraEarnings}
            acceptedTemptation={
              monthlyExpenses.temptation
                ? {
                    cost: monthlyExpenses.temptation,
                  }
                : null
            }
            acceptedSpecialAction={
              monthlyExpenses.specialAction
                ? {
                    cost: monthlyExpenses.specialAction,
                  }
                : null
            }
          />
        )}

        {activeTab === "pet" && <PetInteraction />}

        {activeTab === "goal" && <VisualPiggyBank />}

        {activeTab === "stickers" && <CollectibleStickers />}
      </View>
    );
  }
  if (currentStep === "investment") {
    const availableForInvestment = calculateRemainingAfterExpenses();

    if (availableForInvestment < 10) {
      return (
        <View
          style={{
            backgroundColor: "#FFFFFF",
            padding: 20,
            borderRadius: 16,
            borderWidth: 2,
            borderColor: "#FFD166",
          }}
        >
          <Text
            style={{
              fontSize: 24,
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            😅
          </Text>

          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            Saldo Baixo
          </Text>

          <Text
            style={{
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            Sobrou apenas R$ {availableForInvestment.toFixed(0)}
          </Text>

          <Text
            style={{
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            É melhor guardar dinheiro no próximo mês.
          </Text>

          <Text
            onPress={handleInvestmentConfirm}
            style={{
              backgroundColor: "#69D17D",
              color: "#FFF",
              textAlign: "center",
              padding: 14,
              borderRadius: 10,
              fontWeight: "bold",
            }}
          >
            Próximo Mês
          </Text>
        </View>
      );
    }

    const investmentOptions = [
      {
        amount: 0,
        label: "Não Guardar",
        emoji: "🛍️",
      },
      {
        amount: Math.floor(availableForInvestment * 0.3),
        label: "Pouco",
        emoji: "🌱",
      },
      {
        amount: Math.floor(availableForInvestment * 0.5),
        label: "Médio",
        emoji: "🌿",
      },
      {
        amount: Math.floor(availableForInvestment * 0.7),
        label: "Muito",
        emoji: "🌳",
      },
    ].filter((option) => option.amount <= availableForInvestment);

    return (
      <View
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: 16,
          borderWidth: 2,
          borderColor: "#BFD7FF",
          overflow: "hidden",
        }}
      >
        <View
          style={{
            backgroundColor: "#DCE8F8",
            padding: 16,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#003B49",
            }}
          >
            🌱 Vamos Fazer o Dinheiro Crescer
          </Text>
        </View>

        <View
          style={{
            padding: 16,
          }}
        >
          <View
            style={{
              backgroundColor: "#FFFBE8",
              borderWidth: 1,
              borderColor: "#F2C94C",
              borderRadius: 12,
              padding: 16,
              marginBottom: 16,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                marginBottom: 8,
              }}
            >
              Como Funciona?
            </Text>

            <Text
              style={{
                textAlign: "center",
              }}
            >
              É como plantar uma sementinha.
            </Text>

            <Text
              style={{
                textAlign: "center",
              }}
            >
              Quanto mais tempo ela fica guardada,
            </Text>

            <Text
              style={{
                textAlign: "center",
              }}
            >
              mais dinheiro ela produz.
            </Text>
          </View>

          <View
            style={{
              backgroundColor: "#EAF8EF",
              borderWidth: 1,
              borderColor: "#69D17D",
              borderRadius: 12,
              padding: 16,
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Text
              style={{
                fontSize: 18,
              }}
            >
              Você Tem Disponível
            </Text>

            <Text
              style={{
                fontSize: 34,
                fontWeight: "bold",
                color: "#1EA84A",
              }}
            >
              R$ {availableForInvestment.toFixed(0)}
            </Text>

            {extraEarnings > 0 && (
              <Text
                style={{
                  color: "#1EA84A",
                }}
              >
                +R$ {extraEarnings} extras
              </Text>
            )}
          </View>

          <Text
            style={{
              textAlign: "center",
              fontSize: 18,
              fontWeight: "bold",
              marginBottom: 16,
            }}
          >
            Quanto Quer Guardar?
          </Text>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {investmentOptions.map((option) => {
              const selected = investmentAmount === option.amount.toString();

              return (
                <View
                  key={option.amount}
                  style={{
                    width: "48%",
                    backgroundColor: selected ? "#DFF7E5" : "#F8F8F8",
                    borderWidth: 2,
                    borderColor: selected ? "#1EA84A" : "#DDD",
                    borderRadius: 12,
                    padding: 12,
                    marginBottom: 12,
                  }}
                >
                  <Text
                    onPress={() =>
                      setInvestmentAmount(option.amount.toString())
                    }
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {option.emoji}
                    {"\n"}
                    {option.label}
                    {"\n"}
                    R$ {option.amount}
                    {"\n"}
                    {option.label === "Não Guardar"
                      ? "Deixar tudo na carteira"
                      : option.label === "Pouco"
                        ? "Guardar um pouquinho"
                        : option.label === "Médio"
                          ? "Guardar uma parte"
                          : "Guardar bastante"}
                    {"\n"}
                    Em 1 ano: R$ {Math.floor(option.amount * 1.15)}
                  </Text>

                  <View
                    style={{
                      height: 8,
                      backgroundColor: "#19A84A",
                      borderRadius: 4,
                      marginTop: 8,
                    }}
                  />
                </View>
              );
            })}
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Text
              onPress={() => setCurrentStep("expenses")}
              style={{
                backgroundColor: "#3267E3",
                color: "#FFF",
                padding: 12,
                borderRadius: 10,
                fontWeight: "bold",
                width: "48%",
                textAlign: "center",
              }}
            >
              Voltar
            </Text>

            <Text
              onPress={handleInvestmentConfirm}
              style={{
                backgroundColor: "#69D17D",
                color: "#FFF",
                padding: 12,
                borderRadius: 10,
                fontWeight: "bold",
                width: "48%",
                textAlign: "center",
              }}
            >
              Confirmar Escolha
            </Text>
          </View>
        </View>
      </View>
    );
  }
  if (currentStep === "results") {
    return (
      <View
        style={{
          gap: 16,
        }}
      >
        <Text>Resumo do Capítulo {gameState.currentMonth - 1}</Text>

        <Text>O que aconteceu neste capítulo</Text>
        <View>
          {Object.entries(monthlyExpenses).map(([category, amount]) =>
            amount > 0 ? (
              <Text key={category}>
                {category} - R$ {amount.toFixed(0)}
              </Text>
            ) : null,
          )}
        </View>
        {extraEarnings > 0 && (
          <Text>Ganhos Extras: +R$ {extraEarnings.toFixed(0)}</Text>
        )}
        <View>
          <Text>Carteira: R$ {gameState.balance.toFixed(0)}</Text>

          <Text>
            Investimentos: R$ {gameState.investmentBalance.toFixed(0)}
          </Text>

          <Text>
            Total: R${" "}
            {(gameState.balance + gameState.investmentBalance).toFixed(0)}
          </Text>
        </View>
        <Text onPress={resetForNextMonth}>
          {gameState.currentMonth > 12
            ? "Finalizar Jornada"
            : "Próximo Capítulo"}
        </Text>
      </View>
    );
  }

  return null;
}
