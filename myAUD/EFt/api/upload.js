import formidable from "formidable";
import fs from "fs";

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: "Parse error" });
    const file = files.file;

    // For now, just pretend upload works (no Supabase yet)
    const fakeUrl = "/uploads/" + file.originalFilename;

    return res.json({ ok: true, url: fakeUrl });
  });
}
