import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'


export class TableComponent extends Component {
    render() {
        const customFormatter = (data, customFormat = (d) => d) => customFormat(data);
        const { headers, tableData, requesting } = this.props;
        return (
            <div>
                <Table celled striped size='large'>
                    {headers.length > 0 && (
                        <Table.Header>
                            <Table.Row>
                                {headers.map(header => (
                                    <Table.HeaderCell
                                        key={`table_header_${header.key}`}
                                        className={`${header.className || ''}`}
                                    >
                                        {header.name || ''}
                                    </Table.HeaderCell>
                                ))}
                            </Table.Row>
                        </Table.Header>
                    )}
                              {tableData.length === 0 ? (
            <tbody>
              {requesting ? (
                <>
                  <tr>
                      <td>
                        <p className="loader_wallet"></p>
                      </td>
                  </tr>
                </>
              ) : (
                <tr>
                  <td colSpan={headers.length + 1}>No Data</td>
                </tr>
              )}
            </tbody>
          ) : (
            <tbody>
              {tableData?.map((eachData, index) => {
                const uniqueVal = JSON.stringify(eachData + index);
                return (
                  <tr key={`header-${uniqueVal}`}>
                    {headers?.map((eachHeader, headerIndex) => (
                      <td key={`table-cell-${headerIndex}-${uniqueVal}`}>
                        {customFormatter(
                          eachData,
                          eachHeader?.format
                            ? eachHeader?.format
                            : (data) =>
                                data?.[eachHeader?.field] ? data?.[eachHeader?.field] : '-',
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          )}
                    {/* {!requesting ? (
                        <Table.Body>
                            {tableData && tableData.length > 0 ?
                                (<>
                                    {tableData.map((item, index) => {
                                        return (
                                            <Table.Row key={index}>
                                                <Table.Cell>{item.label}</Table.Cell>
                                                <Table.Cell>{item.balance}</Table.Cell>
                                            </Table.Row>
                                        )
                                    })}
                                </>
                                ) : (
                                    <Table.Row>
                                        <Table.Cell>No Data</Table.Cell>
                                    </Table.Row>
                                )}
                        </Table.Body>
                    ) : (
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>  <p className="loader_wallet"></p></Table.Cell>
                                </Table.Row>
                            </Table.Body>

                        )} */}

                </Table>
            </div>
        )
    }
}

export default TableComponent
