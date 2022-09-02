import { Box, TableContainer } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MaterialLink from '@mui/material/Link';
import { i18n } from 'src/i18n';
import brokerSelectors from 'src/modules/broker/brokerSelectors';
import destroyActions from 'src/modules/broker/destroy/brokerDestroyActions';
import destroySelectors from 'src/modules/broker/destroy/brokerDestroySelectors';
import actions from 'src/modules/broker/list/brokerListActions';
import selectors from 'src/modules/broker/list/brokerListSelectors';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import Pagination from 'src/view/shared/table/Pagination';
import Spinner from 'src/view/shared/Spinner';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import DataTableHeadCell from 'src/mui/examples/Tables/DataTable/DataTableHeadCell';
import DataTableBodyCell from 'src/mui/examples/Tables/DataTable/DataTableBodyCell';
import MDBadgeDot from 'src/mui/components/MDBadgeDot';

function BrokerListTable(props) {
  const { sidenavColor } = selectMuiSettings();
  const [recordIdToDestroy, setRecordIdToDestroy] =
    useState(null);
  const dispatch = useDispatch();

  const findLoading = useSelector(selectors.selectLoading);

  const destroyLoading = useSelector(
    destroySelectors.selectLoading,
  );

  const loading = findLoading || destroyLoading;

  const rows = useSelector(selectors.selectRows);
  const pagination = useSelector(
    selectors.selectPagination,
  );
  const selectedKeys = useSelector(
    selectors.selectSelectedKeys,
  );
  const hasRows = useSelector(selectors.selectHasRows);
  const sorter = useSelector(selectors.selectSorter);
  const isAllSelected = useSelector(
    selectors.selectIsAllSelected,
  );
  const hasPermissionToEdit = useSelector(
    brokerSelectors.selectPermissionToEdit,
  );
  const hasPermissionToDestroy = useSelector(
    brokerSelectors.selectPermissionToDestroy,
  );

  const doOpenDestroyConfirmModal = (id) => {
    setRecordIdToDestroy(id);
  };

  const doCloseDestroyConfirmModal = () => {
    setRecordIdToDestroy(null);
  };

  const doChangeSort = (field) => {
    const order =
      sorter.field === field && sorter.order === 'asc'
        ? 'desc'
        : 'asc';

    dispatch(
      actions.doChangeSort({
        field,
        order,
      }),
    );
  };

  const doChangePagination = (pagination) => {
    dispatch(actions.doChangePagination(pagination));
  };

  const doDestroy = (id) => {
    doCloseDestroyConfirmModal();

    dispatch(destroyActions.doDestroy(id));
  };

  const doToggleAllSelected = () => {
    dispatch(actions.doToggleAllSelected());
  };

  const doToggleOneSelected = (id) => {
    dispatch(actions.doToggleOneSelected(id));
  };

  return (
    <>
      <TableContainer sx={{ boxShadow: 'none' }}>
        <Table>
          <MDBox component="thead">
            <TableRow>
              <DataTableHeadCell
                padding="checkbox"
                width="0"
                sorted={false}
              >
                {hasRows && (
                  <Checkbox
                    checked={Boolean(isAllSelected)}
                    onChange={() => doToggleAllSelected()}
                    size="small"
                  />
                )}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() => doChangeSort('id')}
                sorted={
                  sorter.field === 'id'
                    ? sorter.order
                    : 'none'
                }
                align="right"
                width="0"
              >
                {i18n('entities.broker.fields.id')}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() => doChangeSort('name')}
                sorted={
                  sorter.field === 'name'
                    ? sorter.order
                    : 'none'
                }
                width="0"
              >
                {i18n('entities.broker.fields.name')}
              </DataTableHeadCell>
              <DataTableHeadCell sorted={false}>
                {i18n('entities.broker.fields.homepage')}
              </DataTableHeadCell>
              <DataTableHeadCell sorted={false} width="0">
                {i18n('entities.broker.fields.broker_type')}
              </DataTableHeadCell>
              <DataTableHeadCell sorted={false} width="0">
                {i18n('entities.broker.fields.activated')}
              </DataTableHeadCell>
              <DataTableHeadCell sorted={false} width="0">
                {' '}
              </DataTableHeadCell>
            </TableRow>
          </MDBox>
          <TableBody>
            {loading && (
              <TableRow>
                <DataTableBodyCell
                  align="center"
                  colSpan={100}
                >
                  <Spinner />
                </DataTableBodyCell>
              </TableRow>
            )}
            {!loading && !hasRows && (
              <TableRow>
                <DataTableBodyCell
                  align="center"
                  colSpan={100}
                >
                  <MDTypography align="center">
                    {i18n('table.noData')}
                  </MDTypography>
                </DataTableBodyCell>
              </TableRow>
            )}
            {!loading &&
              rows.map((row) => (
                <TableRow key={row.id}>
                  <DataTableBodyCell padding="checkbox">
                    <Checkbox
                      checked={selectedKeys.includes(
                        row.id,
                      )}
                      onChange={() =>
                        doToggleOneSelected(row.id)
                      }
                      size="small"
                    />
                  </DataTableBodyCell>
                  <DataTableBodyCell align="right">
                    {row.id}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.name}
                    <br />({row.name_normalized})
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    <MaterialLink
                      display="block"
                      href={row.meta?.homepage}
                      target="_blank"
                      width="300px"
                      whiteSpace="break-spaces"
                    >
                      {row.meta?.homepage}
                    </MaterialLink>
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.meta?.broker_type && (
                      <MDTypography
                        display="block"
                        variant="caption"
                        width="100px"
                        whiteSpace="break-spaces"
                        fontWeight="regular"
                        color="text"
                      >
                        {i18n(
                          `entities.broker.enumerators.meta.broker_type.${row.meta?.broker_type}`,
                        )}
                      </MDTypography>
                    )}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {[
                      'activated',
                      'is_broker',
                      'top_broker',
                    ].map((field) => (
                      <MDBadgeDot
                        key={field}
                        badgeContent={i18n(
                          `entities.broker.fields.${field}`,
                        )}
                        color={
                          Boolean(row[field])
                            ? 'info'
                            : 'error'
                        }
                        variant="contained"
                        container
                      />
                    ))}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    <MDBox
                      display="flex"
                      justifyContent="flex-end"
                    >
                      {/* <Tooltip title={i18n('common.view')}>
                        <IconButton
                          component={Link}
                          color={sidenavColor}
                          to={`/broker/${row.id}`}
                        >
                          <SearchIcon />
                        </IconButton>
                      </Tooltip> */}
                      {hasPermissionToEdit && (
                        <Tooltip
                          title={i18n('common.edit')}
                        >
                          <IconButton
                            color={sidenavColor}
                            component={Link}
                            to={`/broker/${row.id}/edit`}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                      {hasPermissionToDestroy && (
                        <Tooltip
                          title={i18n('common.destroy')}
                        >
                          <IconButton
                            color={sidenavColor}
                            onClick={() =>
                              doOpenDestroyConfirmModal(
                                row.id,
                              )
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                    </MDBox>
                  </DataTableBodyCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        <Pagination
          onChange={doChangePagination}
          disabled={loading}
          pagination={pagination}
          entriesPerPage
          showTotalEntries
        />
      </TableContainer>

      {recordIdToDestroy && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() => doDestroy(recordIdToDestroy)}
          onClose={() => doCloseDestroyConfirmModal()}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}
    </>
  );
}

export default BrokerListTable;