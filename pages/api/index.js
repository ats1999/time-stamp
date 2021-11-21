import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });
  res.status(200).send(session);
}
