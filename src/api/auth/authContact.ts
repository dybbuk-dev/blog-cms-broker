import ApiResponseHandler from '../apiResponseHandler';

import AuthService from '../../services/auth/authService';

export default async (req, res, next) => {
  try {
    await AuthService.sendContact(
      req.language,
      req.body.name,
      req.body.email,
      req.body.subject,
      req.body.content,
    );

    const payload = true;

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
