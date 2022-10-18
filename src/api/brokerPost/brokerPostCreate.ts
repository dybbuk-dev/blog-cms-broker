import ApiResponseHandler from '../apiResponseHandler';
import BrokerPostService from '../../services/brokerPostService';
import ReCaptchaV2Service from '../../services/recaptcha/ReCaptchaV2Service';

export default async (req, res, next) => {
  try {
    const service = new BrokerPostService(req);
    const parent = await service.findById(
      req.body.data.parent_id,
    );

    if (!parent) {
      await ReCaptchaV2Service.verify(req);
    }

    const payload = await service.create({
      ...req.body.data,
      ...(parent ? { broker_id: parent.broker_id } : {}),
    });

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
