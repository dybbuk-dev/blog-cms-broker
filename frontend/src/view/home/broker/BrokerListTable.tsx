import { CardMedia, TableContainer } from '@mui/material';
import { i18n } from 'src/i18n';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import actions from 'src/modules/broker/home/brokerHomeActions';
import DataTableBodyCell from 'src/mui/examples/Tables/DataTable/DataTableBodyCell';
import DataTableHeadCell from 'src/mui/examples/Tables/DataTable/DataTableHeadCell';
import MaterialLink from '@mui/material/Link';
import MDBadgeDot from 'src/mui/components/MDBadgeDot';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import Pagination from 'src/view/shared/table/Pagination';
import selectors from 'src/modules/broker/home/brokerHomeSelectors';
import Spinner from 'src/view/shared/Spinner';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import RatingListItem from 'src/view/shared/table/RatingListItem';

function BrokerListTable(props) {
  const dispatch = useDispatch();

  const findLoading = useSelector(selectors.selectLoading);

  const loading = findLoading;

  const rows = useSelector(selectors.selectRows);
  const pagination = useSelector(
    selectors.selectPagination,
  );
  const hasRows = useSelector(selectors.selectHasRows);
  const sorter = useSelector(selectors.selectSorter);

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

  useEffect(() => {
    dispatch(
      actions.doFetch(
        {
          activated: true,
          category: props.category,
        },
        null,
        false,
      ),
    );
  }, [props.category]);

  return (
    <MDBox my={3}>
      <TableContainer sx={{ boxShadow: 'none' }}>
        <Table>
          <MDBox component="thead">
            <TableRow>
              <DataTableHeadCell sorted={false}>
                {' '}
              </DataTableHeadCell>
              <DataTableHeadCell sorted={false}>
                {i18n(
                  'entities.broker.fields.minimum_deposit',
                )}
              </DataTableHeadCell>
              <DataTableHeadCell sorted={false}>
                {i18n('entities.brokerPost.fields.review')}
              </DataTableHeadCell>
              <DataTableHeadCell sorted={false}>
                {i18n('entities.brokerPost.fields.rating')}
              </DataTableHeadCell>
              <DataTableHeadCell sorted={false}>
                {i18n('entities.broker.fields.regulation')}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() => doChangeSort('name')}
                sorted={
                  sorter.field === 'name'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n('entities.broker.fields.name')}
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
                  <DataTableBodyCell>
                    <CardMedia
                      component="img"
                      image={
                        row.broker_image_broker_logo[0]
                          ?.downloadUrl
                      }
                      alt={row.name}
                      sx={{
                        margin: 0,
                        borderRadius: 0,
                        width: 115,
                        height: 45,
                      }}
                    />
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.meta?.minimum_deposit}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.rating?.overall_reviews}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    <RatingListItem
                      precision={0.1}
                      value={
                        row.rating?.overall_rating ?? 0
                      }
                    />
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {(row.regulatory_authorities || [])
                      .map((v) => v.abbreviation)
                      .join(', ')}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    <MaterialLink
                      component={Link}
                      to={`/erfahrungsberichte/${row.name_normalized}`}
                      underline="hover"
                    >
                      {row.name}
                    </MaterialLink>
                  </DataTableBodyCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        onChange={doChangePagination}
        disabled={loading}
        pagination={pagination}
        entriesPerPage
        showTotalEntries
      />
    </MDBox>
  );
}

export default BrokerListTable;
