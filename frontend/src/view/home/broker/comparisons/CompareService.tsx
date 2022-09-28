import { i18n } from 'src/i18n';
import BrokerImages from 'src/view/home/broker/shared/BrokerImages';
import CompareCheckbox from 'src/view/home/broker/comparisons/CompareCheckbox';
import CompareDetail from 'src/view/home/broker/comparisons/CompareDetail';
import CompareRegion from 'src/view/home/broker/comparisons/CompareRegion';
import CompareSection from 'src/view/home/broker/comparisons/CompareSection';
import PropTypes from 'prop-types';
import TableRow from '@mui/material/TableRow';

function CompareService({ recordA, recordB }) {
  return (
    <>
      <CompareRegion>
        {i18n(
          'entities.broker.comparison.region.service',
          recordA.name,
          recordB.name,
        )}
      </CompareRegion>
      <CompareCheckbox
        recordA={recordA}
        recordB={recordB}
        fields={[
          'GERMAN_SUPPORT',
          'CONTACT',
          'DAILY_TRADE_HELP',
          'GERMAN_WEBINAR',
          'GERMAN_SEMINAR',
          'COACHINGS_AVAILABLE',
          'KNOWLEDGE_BASE',
        ]}
      />
      <TableRow>
        <CompareSection name="awards" />
        <CompareDetail
          childrenA={
            <BrokerImages records={recordA.certificates} />
          }
          childrenB={
            <BrokerImages records={recordB.certificates} />
          }
        />
      </TableRow>
    </>
  );
}

CompareService.propTypes = {
  recordA: PropTypes.any.isRequired,
  recordB: PropTypes.any.isRequired,
};

export default CompareService;
