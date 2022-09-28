import ApiResponseHandler from '../apiResponseHandler';
import BrokerArticleService from '../../services/brokerArticleService';

export default async (req, res, next) => {
  try {
    const payload = await new BrokerArticleService(
      req,
    ).findByFilter(req.body);

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
