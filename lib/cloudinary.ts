import crypto from 'crypto';

export async function uploadToCloudinary(fileBuffer: Buffer, mimetype: string): Promise<{ secure_url: string, public_id: string }> {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error('Cloudinary environment variables are missing.');
  }

  const timestamp = Math.round(new Date().getTime() / 1000).toString();
  const folder = 'apna_cars_uploads';
  
  // Signature payload: sort params alphabetically
  const signatureStr = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
  const signature = crypto.createHash('sha1').update(signatureStr).digest('hex');

  const formData = new FormData();
  // Using a Blob to simulate a File since we're using native fetch
  formData.append('file', new Blob([fileBuffer], { type: mimetype }));
  formData.append('api_key', apiKey);
  formData.append('timestamp', timestamp);
  formData.append('signature', signature);
  formData.append('folder', folder);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error?.message || 'Cloudinary upload failed');
  }

  return {
    secure_url: data.secure_url,
    public_id: data.public_id,
  };
}

export async function deleteFromCloudinary(publicId: string) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) return; // Silent skip if local only
  if (publicId.startsWith('/')) return; // It's a local file

  const timestamp = Math.round(new Date().getTime() / 1000).toString();
  const signatureStr = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
  const signature = crypto.createHash('sha1').update(signatureStr).digest('hex');

  const formData = new URLSearchParams();
  formData.append('public_id', publicId);
  formData.append('api_key', apiKey);
  formData.append('timestamp', timestamp);
  formData.append('signature', signature);

  await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, {
    method: 'POST',
    body: formData,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  });
}
