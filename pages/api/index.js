export default function handler(req, res) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const uri = process.env.MONGO_URI;
  const url = process.env.NEXTAUTH_URL;
  res.status(200).send({
    GOOGLE_CLIENT_ID: clientId,
    GOOGLE_CLIENT_SECRET: clientSecret,
    MONGO_URI: uri,
    NEXTAUTH_URL: url,
  });
}
