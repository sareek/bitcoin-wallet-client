import React from 'react';
import { Menu, Table, Dropdown } from 'semantic-ui-react';
import Spinner from 'components/common/Spinner';

const customFormatter = (data, customFormat = d => d) => customFormat(data);

const defaultFormatter = (data, key) => data.key;

const TableComponent = props => {
  const { headers, loading, tableData, pager, setPerPage, onPaginate } = props;
  const dataList = tableData.get('dataList').toJS();

  return (
    <Table celled>
      {headers.length > 0 && (
        <Table.Header>
          <Table.Row>
            {headers.map(header => (
              <Table.HeaderCell key={`table_header_${header.key}`}>
                {header.name || ''}
              </Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
      )}
      {/* Here i am assuming tableData props is a map with dataList list always there */}
      {dataList.length === 0 ? (
        <Table.Body>
          <Table.Row>
            <Table.Cell>{loading ? <Spinner /> : 'No data'}</Table.Cell>
          </Table.Row>
        </Table.Body>
      ) : (
        <Table.Body>
          {dataList.map(tData => {
            const uniqueVal = JSON.stringify(tData);
            return (
              <Table.Row
                key={`table_row_${uniqueVal}`}
                className={loading ? 'table_row_loading' : ''}
              >
                {headers.map(header => {
                  header.format = header.format
                    ? header.format
                    : data => data[header.field];
                  return (
                    <Table.Cell key={`table_cell_${header.key}_${uniqueVal}`}>
                      {customFormatter(tData, header.format)}
                    </Table.Cell>
                  );
                })}
              </Table.Row>
            );
          })}
        </Table.Body>
      )}
      {onPaginate && (
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell>
              <Dropdown
                upward
                selection
                value={pager.pageSize}
                onChange={setPerPage}
                options={[
                  { key: '10', value: 10, text: '10 Rows' },
                  { key: '20', value: 20, text: '20 Rows' },
                  { key: '50', value: 50, text: '50 Rows' },
                  { key: '100', value: 100, text: '100 Rows' },
                ]}
              />
            </Table.HeaderCell>
            <Table.HeaderCell colSpan={headers.length + 1}>
              <Menu floated="right" pagination>
                <Menu.Item
                  as="a"
                  icon
                  className={pager.currentPage === 1 ? 'disabled' : ''}
                  value={pager.currentPage - 1}
                  onClick={pager.currentPage === 1 ? () => null : props.setPage}
                >
                  <i className="icon-chevron-left" />
                </Menu.Item>
                {pager.pages.map(page => (
                  <Menu.Item
                    key={`table_pager_${page}`}
                    active={pager.currentPage === page}
                    value={page}
                    onClick={
                      pager.currentPage !== page ? props.setPage : () => null
                    }
                  >
                    {page}
                  </Menu.Item>
                ))}
                <Menu.Item
                  as="a"
                  icon
                  className={
                    pager.currentPage === pager.totalPages ? 'disabled' : ''
                  }
                  value={pager.currentPage + 1}
                  onClick={
                    pager.currentPage === pager.totalPages
                      ? () => null
                      : props.setPage
                  }
                >
                  <i className="icon-chevron-right" />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      )}
    </Table>
  );
};

export default TableComponent;
