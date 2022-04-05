import React, { useContext } from 'react';
import Context from '../context/Context';
import RowOfTable from './RowOfTable';

export default function Table() {
  const { state, setState, copyOfState, checkBox, setCheckbox } =
    useContext(Context);
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Deletar</th>
            <th>Tamanho:</th>
            <th>Quantidade:</th>
            <th>Valor Unitario:</th>
            <th>Valor das Peças:</th>
          </tr>
        </thead>
        <tbody>
          {state.map((e, i) => (
            <RowOfTable key={i} {...e} />
          ))}
        </tbody>
      </table>
      <button
        onClick={() =>
          setState((prevState) => [
            ...prevState,
            {
              id: prevState[prevState.length - 1].id + 1,
              tamanho: '00',
              quantidade: '1',
            },
          ])
        }
      >
        FODA
      </button>
      <input
        type="checkbox"
        id="checkbox"
        onClick={({ target: { checked } }) => setCheckbox(checked)}
      />
      <label htmlFor="checkbox">Clica aki</label>
      <h1>
        {`valor total: ${
          checkBox
            ? (
                copyOfState.reduce(
                  (prev, current) => prev + Number(current.valoresDasPecas),
                  0
                ) +
                2 *
                  copyOfState.reduce(
                    (prev, current) => prev + Number(current.quantidade),
                    0
                  )
              ).toFixed(2)
            : copyOfState
                .reduce(
                  (prev, current) => prev + Number(current.valoresDasPecas),
                  0
                )
                .toFixed(2)
        }`}
      </h1>
    </>
  );
}
