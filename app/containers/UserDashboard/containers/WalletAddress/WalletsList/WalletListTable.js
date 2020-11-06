import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'


export class WalletListTable extends Component {
    render() {
        const { headers, walletAddressesList, getWalletAddressesRequesting } = this.props;
        return (
            <div>
                <Table celled>
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
                    {!getWalletAddressesRequesting ? (
                        <Table.Body>
                            {walletAddressesList && walletAddressesList.length > 0 ?
                                (<>
                                    {walletAddressesList.map((item, index) => {
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

                        )}

                </Table>
            </div>
        )
    }
}

export default WalletListTable
