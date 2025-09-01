import formidable from "formidable";
import fs from "fs";
import { createClient } from "@supabase/supabase-js";

export const config = { api: { bodyParser: false } };

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: "Parse error" });

    const file = files.file;
    const filePath = file.filepath;
    const fileName = file.originalFilename;

    // Upload to Supabase bucket
    const { data, error } = await supabase.storage
      .from("uploads")
      .upload(fileName, fs.createReadStream(filePath), {
        cacheControl: "3600",
        upsert: false,
        contentType: file.mimetype,
      });

    if (error) return res.status(500).json({ error: error.message });

    // Get public URL
    const { data: publicUrl } = supabase.storage
      .from("uploads")
      .getPublicUrl(fileName);

    return res.json({ ok: true, url: publicUrl.publicUrl });
  });
}
