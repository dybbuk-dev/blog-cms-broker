import BrokerAttrs from 'src/view/home/broker/shared/BrokerAttrs';
import CompareDetail from 'src/view/home/broker/comparisons/CompareDetail';
import CompareRegion from 'src/view/home/broker/comparisons/CompareRegion';
import CompareSection from 'src/view/home/broker/comparisons/CompareSection';
import PropTypes from 'prop-types';
import TableRow from '@mui/material/TableRow';

function CompareRegulation({ recordA, recordB }) {
  return (
    <>
      <CompareRegion name="region.regulationAndDepositInsurance" />
      <TableRow>
        <CompareSection
          name="regulation"
          tooltip="tooltip.regulation"
        />
        <CompareDetail
          childrenA={
            <BrokerAttrs
              records={recordA.regulatory_authorities}
            />
          }
          childrenB={
            <BrokerAttrs
              records={recordB.regulatory_authorities}
            />
          }
        />
      </TableRow>
      <TableRow>
        <CompareSection
          name="depositProtection"
          tooltip="tooltip.depositProtection"
        />
        <CompareDetail
          childrenA={
            <BrokerAttrs
              records={recordA.deposit_guarantees}
              renderFn={(v) => `${v.name} ${v.text}`}
            />
          }
          childrenB={
            <BrokerAttrs
              records={recordB.deposit_guarantees}
              renderFn={(v) => `${v.name} ${v.text}`}
            />
          }
        />
      </TableRow>
    </>
  );
}

CompareRegulation.propTypes = {
  recordA: PropTypes.any.isRequired,
  recordB: PropTypes.any.isRequired,
};

export default CompareRegulation;
