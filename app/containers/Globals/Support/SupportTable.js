import React from 'react';
import { Button } from 'semantic-ui-react';
import AppTable from 'components/common/XcelPayTable';

const SupportTable = (props) => {
  const {
    headers, tableData, loading, page, perPage, onPaginate,
    query, onQueryChange, doSearch, showClosedTableFilterForm
  } = props;
  return (
    <div>
      <div className="segment form">
        <h4>Closed Tickets</h4>
        {showClosedTableFilterForm &&
        <div className="flex">
          <div className="field">
            <input
              name="subject"
              type="search" placeholder="Subject"
              value={query.subject || ''} onChange={onQueryChange}
            />
          </div>
          <Button secondary onClick={doSearch}>Search</Button>
        </div>}
        <AppTable
          headers={headers} tableData={tableData} loading={loading}
          page={page} perPage={perPage} onPaginate={onPaginate}
        />
      </div>
    </div>
  );
};

export default SupportTable;
