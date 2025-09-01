export default async function handler(req, res) {
  res.json({
    uploads: [
      { filename: "test1.pdf", size: 12345, uploaded_at: "2025-08-31" }
    ],
    otp_logs: [
      { otp: "123456", success: true, created_at: "2025-08-31" }
    ]
  });
}
