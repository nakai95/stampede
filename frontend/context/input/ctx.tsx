import { createContext, useCallback, useContext, useReducer } from "react";
import type { ReactNode, FC } from "react";
import {
  makeMutable,
  SharedValue,
  useSharedValue,
} from "react-native-reanimated";

export interface Input {
  fontSize: number;
  length: number;
  x: SharedValue<number>;
  y: SharedValue<number>;
  text: SharedValue<string>;
}

type Inputs = Input[];

interface InputContext {
  inputs: Inputs;
  dispatch: (action: InputAction) => void;
}

const InputContext = createContext<InputContext | null>(null);
interface AddInputAction {
  action: "add";
  input: Input;
}

interface ResetInputsAction {
  action: "reset";
}

type InputAction = AddInputAction | ResetInputsAction;

const inputReducer = (inputs: Inputs, action: InputAction) => {
  switch (action.action) {
    case "add":
      return [...inputs, action.input];
    case "reset":
      return [];
    default:
      return inputs;
  }
};

export const useInputContext = () => {
  const ctx = useContext(InputContext);
  if (ctx === null) {
    throw new Error("No Input context found");
  }
  const { inputs, dispatch } = ctx;
  const addInput = useCallback(
    (input: Omit<Input, "x" | "y" | "width" | "text">) => {
      const x = makeMutable(0);
      const y = makeMutable(0);
      const text = makeMutable("Enter text here");
      dispatch({ action: "add", input: { ...input, x, y, text } });
    },
    [dispatch]
  );
  const resetInputs = useCallback(() => {
    dispatch({ action: "reset" });
  }, [dispatch]);
  return {
    inputs,
    addInput,
    resetInputs,
  };
};

interface InputProviderProps {
  children: ReactNode | ReactNode[];
}

export const InputProvider = ({ children }: InputProviderProps) => {
  const [inputs, dispatch] = useReducer(inputReducer, []);
  return (
    <InputContext.Provider value={{ inputs, dispatch }}>
      {children}
    </InputContext.Provider>
  );
};
