import React, { useContext, useState } from 'react';
import Context from '../context/Context';
import tabelaDePrecos from '../helpers/tabelaDePrecos';

export default function RowOfTable({ id }) {
  const { state, setState, conditional } = useContext(Context);
  const [item] = useState(state.find((e) => e.id === id));
  return (
    <>
      <tr>
        <td>X</td>
        <td>
          <select
            name="tamanho"
            id="tamanho"
            value={item.tamanho}
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
            value={item.quantidade}
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
            .find((e) => e.tamanho === item.tamanho)
            .preco.toFixed(2)}`}
        </td>
        <td>
          {`R$ ${(
            Number(item.quantidade) *
            tabelaDePrecos[conditional].find((e) => e.tamanho === item.tamanho)
              .preco
          ).toFixed(2)}`}
        </td>
      </tr>
    </>
  );
}
