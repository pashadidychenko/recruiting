import React from "react";
import { Table } from "react-bootstrap";
import ErrorMessage from "./ErrorMessage";
import { greatRow, checkHeader } from "./helpers";

function TableForm({ dataTable }) {
  let headerData = dataTable.data.map((el) => Object.keys(el))[0];
  return dataTable.data.length !== 0 ? (
    checkHeader(dataTable.data) ? (
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>ID</th>
            {headerData.map((data, inx) => (
              <th key={inx}>{data}</th>
            ))}
            <th>Duplicate with</th>
          </tr>
        </thead>
        <tbody>
          {dataTable.data.map((data, index) => {
            return (
              Object.keys(data).length > 3 &&
              greatRow(dataTable.data, data, index)
            );
          })}
        </tbody>
      </Table>
    ) : (
      <ErrorMessage error="Внутри файла обнаружена не правильная структура колонок. Поддерживается только корректные *.csv файлы." />
    )
  ) : (
    <ErrorMessage error="Выбран файла с некорректной структурой файла. Поддерживается только корректные *.csv файлы." />
  );
}

export default TableForm;
