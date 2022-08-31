import BrokerBaseView from 'src/view/broker/view/components/BrokerBaseView';
import Spinner from 'src/view/shared/Spinner';

function BrokerView(props) {
  const renderView = () => {
    return <BrokerBaseView {...props} />;
  };

  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return renderView();
}

export default BrokerView;
