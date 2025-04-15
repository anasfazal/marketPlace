
import { HTTP_STATUS_CODES } from '../utils/statusCodes.js';

const errorHandler = (err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(HTTP_STATUS_CODES.InternalServerError).json({ message: 'Something went wrong' });
  };
  
  export { errorHandler }; 
  