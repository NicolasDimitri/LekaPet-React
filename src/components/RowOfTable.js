import React, { useContext } from 'react';
import Context from '../context/Context';
import tabelaDePrecos from '../helpers/tabelaDePrecos';

export default function RowOfTable({ id, tamanho, quantidade }) {
  const { state, setState, conditional } = useContext(Context);
  return (
    <>
      <tr>
        <td
          onClick={() => {
            const copyState = [...state];
            const newState = copyState.filter((e) => e.id !== id);
            setState(newState);
          }}
        >
          X
        </td>
        <td>
          <select
            name="tamanho"
            id="tamanho"
            value={tamanho}
            onChange={({ target: { value } }) => {
              const copyState = [...state];
              const itemState = copyState.find((item) => item.id === id);
              itemState.tamanho = value;
              setState(copyState);
            }}
          >
            {tabelaDePrecos.varejo.map(({ tamanho }, i) => (
              <option key={i}>{tamanho}</option>
            ))}
          </select>
        </td>
        <td>
          <input
            type="number"
            value={quantidade}
            onChange={({ target: { value } }) => {
              const copyState = [...state];
              const itemState = copyState.find((item) => item.id === id);
              itemState.quantidade = value;
              setState(copyState);
            }}
          />
        </td>
        <td>
          {`R$ ${tabelaDePrecos[conditional]
            .find((e) => e.tamanho === tamanho)
            .preco.toFixed(2)}`}
        </td>
        <td>
          {`R$ ${(
            Number(quantidade) *
            tabelaDePrecos[conditional].find((e) => e.tamanho === tamanho)
              .preco
          ).toFixed(2)}`}
        </td>
      </tr>
    </>
  );
}
