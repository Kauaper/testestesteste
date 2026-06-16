import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

export interface GameState {
  playerName: string;
  playerAge: number;
  isChild: boolean;
  selectedPet: string;
  selectedCharacter: string;
  currentMonth: number;
  balance: number;
  investmentBalance: number;
  monthlyIncome: number;

  monthlyExpenses: {
    pet: number;
    personal: number;
    friends: number;
    investments: number;
    emergencies: number;
  }[];

  personalGoal?: {
    name: string;
    targetAmount: number;
    currentAmount: number;
    description: string;
  };

  petHappiness: number;
  petHealth: number;
  petLevel: number;

  currentMonthExtraExpenses: {
    goalDeposits: number;
    petCare: number;
  };

  parentLoan: {
    amount: number;
    reason: string;
  };

  achievements: string[];
  usedActions: string[];
  totalScore: number;
}

interface GameContextType {
  gameState: GameState;
  updateGameState: (updates: Partial<GameState>) => void;
  resetGame: () => void;
}

const STORAGE_KEY = "cooperacaoKidsGameState";

const initialGameState: GameState = {
  playerName: "",
  playerAge: 0,
  isChild: true,
  selectedPet: "",
  selectedCharacter: "",
  currentMonth: 1,
  balance: 0,
  investmentBalance: 0,
  monthlyIncome: 0,
  monthlyExpenses: [],

  petHappiness: 100,
  petHealth: 100,
  petLevel: 1,

  currentMonthExtraExpenses: {
    goalDeposits: 0,
    petCare: 0,
  },

  parentLoan: {
    amount: 0,
    reason: "",
  },

  achievements: [],
  usedActions: [],
  totalScore: 0,
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  useEffect(() => {
    const loadGame = async () => {
      try {
        const savedState = await AsyncStorage.getItem(STORAGE_KEY);

        if (savedState) {
          const parsedState = JSON.parse(savedState);

          if (parsedState.playerName !== undefined) {
            setGameState(parsedState);
          }
        }
      } catch (error) {
        console.log("Erro ao carregar jogo", error);
      }
    };

    loadGame();
  }, []);

  useEffect(() => {
    const saveGame = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
      } catch (error) {
        console.log("Erro ao salvar jogo", error);
      }
    };

    saveGame();
  }, [gameState]);

  const updateGameState = useCallback((updates: Partial<GameState>) => {
    setGameState((prev) => ({
      ...prev,
      ...updates,
    }));
  }, []);

  const resetGame = useCallback(() => {
    setGameState(initialGameState);
  }, []);

  const value = useMemo(
    () => ({
      gameState,
      updateGameState,
      resetGame,
    }),
    [gameState, updateGameState, resetGame],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }

  return context;
}
