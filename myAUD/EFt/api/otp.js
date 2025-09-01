export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { otp } = req.body;
  const success = otp === "123456"; // Demo OTP

  if (!success) {
    return res.status(400).json({ ok: false, message: "Invalid OTP" });
  }
  return res.json({ ok: true, message: "OTP accepted" });
}
