import React, { useState, useEffect } from "react";
import ErrorMessage from "./ErrorMessage";
import TableForm from "./TableForm";
import Papa from "papaparse";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function InputForm() {
  const [csvfile, setCsvfile] = useState("");
  const [fileData, setFileData] = useState("");
  const [fileError, setFileError] = useState(false);

  // Проверка файла на правильности типа
  useEffect(() => {
    if (csvfile.type !== "text/csv") {
      setFileError(true);
    }
    if (csvfile.type === "text/csv" || csvfile.length === 0) {
      setFileError(false);
    }
  }, [csvfile]);

  const handleChange = (event) => setCsvfile(event.target.files[0]);

  // Получаем данные из файла
  const importCSV = () => {
    Papa.parse(csvfile, { complete: setFileData, header: true });
  };

  return (
    <>
      <div>
        <h2>Пожалуйста, добавте Ваш файл!</h2>
        <input type="file" name="file" onChange={handleChange} />
        <p />
        {csvfile.length !== 0 && (
          <Button onClick={importCSV} disabled={fileError}>
            Загрузить данные!
          </Button>
        )}
        <p />
      </div>
      {fileError && (
        <ErrorMessage error="Выбран не правильный формат файла. Поддерживается только *.csv файлы." />
      )}
      {fileData && <TableForm dataTable={fileData} />}
    </>
  );
}

export default InputForm;
