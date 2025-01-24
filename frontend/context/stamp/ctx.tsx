import {
  AnimatedProp,
  DataSourceParam,
  type SkSize,
} from "@shopify/react-native-skia";
import { createContext, useCallback, useContext, useReducer } from "react";
import type { ReactNode, FC } from "react";
import {
  makeMutable,
  SharedValue,
  useSharedValue,
} from "react-native-reanimated";

export interface Stamp {
  size: number;
  x: SharedValue<number>;
  y: SharedValue<number>;
  imgSource: DataSourceParam;
}

type Stamps = Stamp[];

interface StampContext {
  stamps: Stamps;
  dispatch: (action: StampAction) => void;
}

const StampContext = createContext<StampContext | null>(null);
interface AddStampAction {
  action: "add";
  stamp: Stamp;
}

interface ResetStampsAction {
  action: "reset";
}

type StampAction = AddStampAction | ResetStampsAction;

const stickerReducer = (stamps: Stamps, action: StampAction) => {
  switch (action.action) {
    case "add":
      return [...stamps, action.stamp];
    case "reset":
      return [];
    default:
      return stamps;
  }
};

export const useStampContext = () => {
  const ctx = useContext(StampContext);
  if (ctx === null) {
    throw new Error("No Stamp context found");
  }
  const { stamps, dispatch } = ctx;
  const addStamp = useCallback(
    (stamp: Omit<Stamp, "x" | "y">) => {
      const x = makeMutable(0);
      const y = makeMutable(0);
      dispatch({ action: "add", stamp: { ...stamp, x, y } });
    },
    [dispatch]
  );
  const resetStamps = useCallback(() => {
    dispatch({ action: "reset" });
  }, [dispatch]);
  return {
    stamps,
    addStamp,
    resetStamps,
  };
};

interface StampProviderProps {
  children: ReactNode | ReactNode[];
}

export const StampProvider = ({ children }: StampProviderProps) => {
  const [stamps, dispatch] = useReducer(stickerReducer, []);
  return (
    <StampContext.Provider value={{ stamps, dispatch }}>
      {children}
    </StampContext.Provider>
  );
};
