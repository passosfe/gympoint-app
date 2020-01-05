import jsw from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(400).json({ error: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decode = await promisify(jsw.verify)(token, authConfig.secret);

    req.userId = decode.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token not valid' });
  }
};
