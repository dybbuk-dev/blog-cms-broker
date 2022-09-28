import { i18n } from 'src/i18n';
import BrokerCheckbox from 'src/view/home/broker/shared/BrokerCheckbox';
import CompareDetail from 'src/view/home/broker/comparisons/CompareDetail';
import CompareSection from 'src/view/home/broker/comparisons/CompareSection';
import PropTypes from 'prop-types';
import TableRow from '@mui/material/TableRow';

function CompareCheckbox({ recordA, recordB, fields }) {
  return (
    <>
      {(fields || []).map((field) => {
        const tooltipKey = `entities.broker.comparison.checkbox.tooltip.${field.toUpperCase()}`;
        const tooltip = i18n(tooltipKey);

        return (
          <TableRow key={field}>
            <CompareSection
              tooltip={
                tooltip === tooltipKey ? null : (
                  <>{tooltip}</>
                )
              }
            >
              {i18n(
                `entities.broker.comparison.checkbox.name.${field.toUpperCase()}`,
              )}
            </CompareSection>
            <CompareDetail
              childrenA={
                <BrokerCheckbox
                  record={recordA}
                  field={field}
                />
              }
              childrenB={
                <BrokerCheckbox
                  record={recordB}
                  field={field}
                />
              }
            />
          </TableRow>
        );
      })}
    </>
  );
}

CompareCheckbox.propTypes = {
  recordA: PropTypes.any.isRequired,
  recordB: PropTypes.any.isRequired,
  fields: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CompareCheckbox;
