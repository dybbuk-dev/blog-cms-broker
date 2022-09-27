import ApiResponseHandler from '../apiResponseHandler';
import BlogCommentService from '../../services/blogCommentService';

export default async (req, res, next) => {
  try {
    const payload = await new BlogCommentService(
      req,
    ).create(req.body.data);

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
