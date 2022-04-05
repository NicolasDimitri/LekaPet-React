import React, { useCallback, useEffect, useState } from 'react';
import Context from './Context';

export default function Provider({ children }) {
  const [state, setState] = useState([
    {
      id: 0,
      tamanho: '00',
      quantidade: '1',
    },
  ]);

  const [conditional, setConditional] = useState('varejo');

  const setPrice = useCallback(() => {
    if (
      state.reduce(
        (previousValue, currentValue) =>
          previousValue + Number(currentValue.quantidade),
        0
      ) >= 30
    ) {
      setConditional('atacado30pç');
    } else if (
      state.reduce(
        (previousValue, currentValue) =>
          previousValue + Number(currentValue.quantidade),
        0
      ) >= 8
    ) {
      setConditional('atacado8pç');
    } else {
      setConditional('varejo');
    }
  }, [state]);

  useEffect(() => {
    setPrice();
  }, [state, setPrice]);

  return (
    <Context.Provider
      value={{
        state,
        setState,
        conditional,
        setConditional,
        setPrice,
      }}
    >
      {children}
    </Context.Provider>
  );
}
