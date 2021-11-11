import { useEffect, useRef } from "react";
import Typed, { TypedOptions } from "typed.js";

interface ParamsInterface {
  element: string;
  options: TypedOptions;
}

function useTyped(params: ParamsInterface) {
  const typed = useRef<Typed>();
  useEffect(() => {
    typed.current = new Typed(params.element, params.options);
    return () => {
      typed.current?.destroy();
    };
  }, []);
  return typed;
}

export default useTyped;
