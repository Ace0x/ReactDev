
export default function Table(values, tableRows) {
    if(values.length === 0 || tableRows.length === 0) return 0;
    return (
        <div>
          {/* Table */}
          <table>
            <thead>
              <tr>
                {tableRows.map((rows, index) => {
                  return <th key={index}>{rows}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {values.map((value, index) => {
                return (
                  <tr key={index}>
                    {value.map((val, i) => {
                      return <td key={i}>{val}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
}