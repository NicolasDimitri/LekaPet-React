import React, { useCallback, useEffect, useState } from 'react';
import tabelaDePrecos from '../helpers/tabelaDePrecos';
import Context from './Context';

export default function Provider({ children }) {
  const [state, setState] = useState([
    {
      id: 0,
      tamanho: '00',
      quantidade: '1',
      valoresDasPecas: 0,
    },
  ]);

  const [copyOfState, setCopyOfState] = useState([]);

  const [conditional, setConditional] = useState('varejo');

  const [checkBox, setCheckbox] = useState(false);

  const setPrice = useCallback(() => {
    let conditionalLet = 'varejo';
    if (
      state.reduce(
        (previousValue, currentValue) =>
          previousValue + Number(currentValue.quantidade),
        0
      ) >= 30
    ) {
      conditionalLet = 'atacado30pç';
      setConditional('atacado30pç');
    } else if (
      state.reduce(
        (previousValue, currentValue) =>
          previousValue + Number(currentValue.quantidade),
        0
      ) >= 8
    ) {
      conditionalLet = 'atacado8pç';
      setConditional('atacado8pç');
    } else {
      conditionalLet = 'varejo';
      setConditional('varejo');
    }
    const copyState = [...state];
    copyState.forEach((item) => {
      item.valoresDasPecas = (
        Number(item.quantidade) *
        tabelaDePrecos[conditionalLet].find((e) => e.tamanho === item.tamanho)
          .preco
      ).toFixed(2);
    });
    setCopyOfState(copyState);
  }, [state]);

  useEffect(() => {
    setPrice();
  }, [setPrice]);

  return (
    <Context.Provider
      value={{
        state,
        setState,
        conditional,
        setConditional,
        setPrice,
        copyOfState,
        checkBox,
        setCheckbox,
      }}
    >
      {children}
    </Context.Provider>
  );
}
