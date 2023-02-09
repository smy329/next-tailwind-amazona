import Order from '../../../models/Order';
import db from '../../../utils/db';

const handler = async (req, res) => {
  //check the authentication first
  //console.log(req.body.session);

  // const session = await getSession({ req });
  const session = req.body.session;

  console.log(session);
  if (!session) {
    console.log('session not available');
    return res.status(401).send('Signin required');
  }

  console.log('now session to user');
  const { user } = session;
  await db.connect();
  console.log('db connected');
  const newOrder = new Order({
    ...req.body,
    user: user._id,
  });
  console.log('created new order');

  const order = await newOrder.save();
  res.status(201).send(order);
};

export default handler;
