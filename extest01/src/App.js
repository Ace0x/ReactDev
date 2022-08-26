import { useState } from "react";
import Papa from "papaparse";
import Table from "./list";
import evaluate_entry from "./MxSystem";
import FileUpload from "./FileUpload";

function App() {
  // State to store parsed data
  const [parsedData, setParsedData] = useState([]);

  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);

  //State to store the values
  const [values, setValues] = useState([]);

  //State to store changed values
  const [mxValues, setMx] = useState([]);

  const changeHandler = (event) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];

        // Iterating data to get column name and their values
        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        // Parsed Data Response in array format
        setParsedData(results.data);

        // Filtered Column Names
        setTableRows(rowsArray[0]);
        console.log("SETTING: " + tableRows);

        // Filtered Values
        setValues(valuesArray);

        let mxArray = [];
        console.log(valuesArray.length);
        console.log("Values:  " + valuesArray);
        for (let i = 0; i < valuesArray.length; i++) {
          console.log(valuesArray[i]);
          mxArray.push(evaluate_entry(valuesArray[i]));
        }
        setMx(mxArray);
      },
    });
    //Convert Values
  };

  return (
    <div>
      {/* File Uploader */}
      <FileUpload onChange={changeHandler} />
      <br />
      <br />
      {/* Table */}
      <Table values={values} tableRows={tableRows} />
      <br />
      <Table values={mxValues} tableRows={tableRows} />
    </div>
  );
}

export default App;
