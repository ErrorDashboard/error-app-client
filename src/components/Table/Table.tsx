type withID = {
  id: string;
};

type ColumnType = {
  key: string;
  label: string;
};

interface TableProps<T> {
  columns: ColumnType[];
  data: T[];
}

const Table = <T extends withID>({ columns, data }: TableProps<T>) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key}>{column.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            {columns.map((column) => (
              <td key={column.key}>{row[column.key as keyof T]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
