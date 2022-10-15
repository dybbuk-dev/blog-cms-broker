import { i18n } from 'src/i18n';
import AttrTypography from 'src/view/home/broker/shared/AttrTypography';
import BrokerAttrs from 'src/view/home/broker/shared/BrokerAttrs';
import BrokerLinks from 'src/view/home/broker/shared/BrokerLinks';
import BrokerUpsides from 'src/view/home/broker/shared/BrokerUpsides';
import CheckboxViewItem from 'src/view/shared/view/CheckboxViewItem';
import CompareDetail from 'src/view/home/broker/comparisons/CompareDetail';
import CompareSection from 'src/view/home/broker/comparisons/CompareSection';
import ImageView from 'src/view/home/ImageView';
import MaterialLink from '@mui/material/Link';
import MDBox from 'src/mui/components/MDBox';
import OverallRating from 'src/view/home/broker/shared/OverallRating';
import PropTypes from 'prop-types';
import TableRow from '@mui/material/TableRow';

function CompareOverview({ recordA, recordB }) {
  return (
    <>
      <TableRow>
        <CompareSection name="logo" />
        <CompareDetail
          childrenA={
            <ImageView
              value={
                recordA.broker_image_broker_detail_logo
              }
              alt={recordA.name}
            />
          }
          childrenB={
            <ImageView
              value={
                recordB.broker_image_broker_detail_logo
              }
              alt={recordA.name}
            />
          }
        />
      </TableRow>
      <TableRow>
        <CompareSection name="brokerType" />
        <CompareDetail
          childrenA={
            <AttrTypography>
              {i18n(
                `entities.broker.enumerators.meta.broker_type.${recordA.meta?.broker_type}`,
              )}
            </AttrTypography>
          }
          childrenB={
            <AttrTypography>
              {i18n(
                `entities.broker.enumerators.meta.broker_type.${recordB.meta?.broker_type}`,
              )}
            </AttrTypography>
          }
        />
      </TableRow>
      <TableRow>
        <CompareSection name="overallRating" />
        <CompareDetail
          childrenA={
            <OverallRating
              record={recordA}
              size={30}
              gap={1}
            />
          }
          childrenB={
            <OverallRating
              record={recordB}
              size={30}
              gap={1}
            />
          }
        />
      </TableRow>
      <TableRow>
        <CompareSection name="customerReviews" />
        <CompareDetail
          childrenA={
            <AttrTypography>
              <MaterialLink
                href={`/erfahrungsberichte/${recordA.name_normalized}`}
                target="_blank"
                underline="hover"
              >
                {recordA.name}
              </MaterialLink>
            </AttrTypography>
          }
          childrenB={
            <AttrTypography>
              <MaterialLink
                href={`/erfahrungsberichte/${recordB.name_normalized}`}
                target="_blank"
                underline="hover"
              >
                {recordB.name}
              </MaterialLink>
            </AttrTypography>
          }
        />
      </TableRow>
      <TableRow>
        <CompareSection name="links" />
        <CompareDetail
          childrenA={<BrokerLinks record={recordA} />}
          childrenB={<BrokerLinks record={recordB} />}
        />
      </TableRow>
      <TableRow>
        <CompareSection name="brokerFeature" />
        <CompareDetail
          childrenA={
            <BrokerAttrs
              records={recordA.features}
              attrs={{
                link: 'url',
                title: 'feature',
              }}
            />
          }
          childrenB={
            <BrokerAttrs
              records={recordB.features}
              attrs={{
                link: 'url',
                title: 'feature',
              }}
            />
          }
        />
      </TableRow>
      <TableRow>
        <CompareSection name="customerReviews" />
        <CompareDetail
          childrenA={<BrokerUpsides record={recordA} />}
          childrenB={<BrokerUpsides record={recordB} />}
        />
      </TableRow>
      <TableRow>
        <CompareSection name="scalping" />
        <CompareDetail
          childrenA={
            <MDBox position="relative" my={1} pl={3}>
              <CheckboxViewItem
                checked={recordA.meta?.scalping_allowed}
              />
            </MDBox>
          }
          childrenB={
            <MDBox position="relative" my={1} pl={3}>
              <CheckboxViewItem
                checked={recordB.meta?.scalping_allowed}
              />
            </MDBox>
          }
        />
      </TableRow>
    </>
  );
}

CompareOverview.propTypes = {
  recordA: PropTypes.any.isRequired,
  recordB: PropTypes.any.isRequired,
};

export default CompareOverview;
