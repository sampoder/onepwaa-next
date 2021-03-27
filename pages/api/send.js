export default async (req, res) => {
  const Pusher = require("pusher");

  const pusher = new Pusher({
    appId: "1167783",
    key: process.env.key,
    secret: process.env.secret,
    cluster: "ap1",
    useTLS: true,
  });

  let result = await fetch(
    `https://onepwaa-next-sampoder.vercel.app/api/index?country=${req.query.country}&number=1`,
  ).then(res => res.json())

  await pusher.trigger("pwaa", "incoming", {
    long: result[0][0],
    lat: result[0][1],
  });
  res.statusCode = 200;
  res.send("Success");
};