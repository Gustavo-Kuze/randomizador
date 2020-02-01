import React from 'react';

const MyListsResult = props => {
  return (
    <table className="table table-striped table-borderless text-center">
      <thead>
        <tr>
          <th>Posição</th>
          <th>Item sorteado</th>
        </tr>
      </thead>
      <tbody>
        {props.items.map((di, i) => (
          <tr key={`${di}--${i}`}>
            <td>{i + 1}</td>
            <td>{di}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MyListsResult;
