const https = require('https');
const fs = require('fs');
const path = require('path');

const destinations = [
  { id: 1, name: 'Vijayawada', file: 'vijayawada.jpg', q: 'Prakasam_Barrage' },
  { id: 2, name: 'Bhadrachalam', file: 'bhadrachalam.jpg', q: 'Bhadrachalam' },
  { id: 3, name: 'Guntur', file: 'guntur.jpg', q: 'Guntur' },
  { id: 4, name: 'Vemulawada', file: 'vemulawada.jpg', q: 'Rajanna_Siricilla_district' },
  { id: 5, name: 'Visakhapatnam (Vizag)', file: 'visakhapatnam.jpg', q: 'Visakhapatnam' },
  { id: 6, name: 'Warangal — Thousand Pillar Temple', file: 'warangal.jpg', q: 'Thousand_Pillar_Temple' },
  { id: 7, name: 'Rajahmundry', file: 'rajahmundry.jpg', q: 'Godavari_Bridge' },
  { id: 8, name: 'Wargal Saraswati Temple', file: 'wargal.jpg', q: 'Medak' },
  { id: 9, name: 'Amalapuram', file: 'amalapuram.jpg', q: 'Konaseema' },
  { id: 10, name: 'Yadagirigutta', file: 'yadagirigutta.jpg', q: 'Yadadri_Bhuvanagiri_district' },
  { id: 11, name: 'Kakinada', file: 'kakinada.jpg', q: 'Kakinada' },
  { id: 12, name: 'Swarnagiri', file: 'swarnagiri.jpg', q: 'Bhongir_Fort' },
  { id: 13, name: 'Tirupati', file: 'tirupati.jpg', q: 'Tirupati' },
  { id: 14, name: 'Nellore', file: 'nellore.jpg', q: 'Nellore' },
  { id: 15, name: 'Mantralayam', file: 'mantralayam.jpg', q: 'Mantralayam' },
  { id: 16, name: 'Bengaluru', file: 'bengaluru.jpg', q: 'Bangalore' },
  { id: 17, name: 'Chennai', file: 'chennai.jpg', q: 'Marina_Beach' },
  { id: 18, name: 'Shirdi', file: 'shirdi.jpg', q: 'Shirdi' },
  { id: 19, name: 'Goa', file: 'goa.jpg', q: 'Goa' },
  { id: 20, name: 'Pune', file: 'pune.jpg', q: 'Shaniwar_Wada' },
  { id: 21, name: 'Mysuru', file: 'mysuru.jpg', q: 'Mysore_Palace' },
  { id: 22, name: 'Udupi', file: 'udupi.jpg', q: 'Udupi' },
  { id: 23, name: 'Ooty', file: 'ooty.jpg', q: 'Ooty' },
  { id: 24, name: 'Munnar', file: 'munnar.jpg', q: 'Munnar' },
  { id: 25, name: 'Coorg', file: 'coorg.jpg', q: 'Kodagu_district' },
  { id: 26, name: 'Coimbatore', file: 'coimbatore.jpg', q: 'Coimbatore' },
  { id: 27, name: 'Rameswaram', file: 'rameswaram.jpg', q: 'Ramanathaswamy_Temple' },
  { id: 28, name: 'Mahanandi', file: 'mahanandi.jpg', q: 'Mahanandi' },
  { id: 29, name: 'Vellore', file: 'vellore.jpg', q: 'Vellore_Fort' },
  { id: 30, name: 'Tiruvannamalai', file: 'tiruvannamalai.jpg', q: 'Annamalaiyar_Temple' },
  { id: 31, name: 'Kashi', file: 'kashi.jpg', q: 'Varanasi' },
  { id: 32, name: 'Ayodhya', file: 'ayodhya.jpg', q: 'Ayodhya' },
  { id: 33, name: 'Triveni Sangam', file: 'triveni-sangam.jpg', q: 'Triveni_Sangam' },
  { id: 34, name: 'Gokarna', file: 'gokarna.jpg', q: 'Gokarna,_India' },
  { id: 35, name: 'Murudeshwar', file: 'murudeshwar.jpg', q: 'Murudeshwara' },
  { id: 36, name: 'Nashik', file: 'nashik.jpg', q: 'Nashik' },
  { id: 37, name: 'Dharmasthala', file: 'dharmasthala.jpg', q: 'Dharmasthala' },
  { id: 38, name: 'Madurai', file: 'madurai.jpg', q: 'Meenakshi_Temple' },
  { id: 39, name: 'Palani', file: 'palani.jpg', q: 'Palani_Murugan_temple' },
  { id: 40, name: 'Sabarimala', file: 'sabarimala.jpg', q: 'Sabarimala' },
  { id: 41, name: 'Kanchipuram', file: 'kanchipuram.jpg', q: 'Kanchipuram' },
  { id: 42, name: 'Velankanni', file: 'velankanni.jpg', q: 'Basilica_of_Our_Lady_of_Good_Health' }
];

async function fetchWikiThumb(q) {
  return new Promise(resolve => {
    const url = 'https://en.wikipedia.org/w/api.php?action=query&titles=' + encodeURIComponent(q) + '&prop=pageimages&format=json&pithumbsize=600';
    https.get(url, { headers: { 'User-Agent': 'ApnaCabsBot/1.0 (contact@apnacarrental.com)' } }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const p = Object.values(json.query.pages)[0];
          resolve(p && p.thumbnail ? p.thumbnail.source : null);
        } catch(e) { resolve(null); }
      });
    }).on('error', () => resolve(null));
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const follow = (u) => {
      https.get(u, { headers: { 'User-Agent': 'ApnaCabsBot/1.0 (contact@apnacarrental.com)' } }, res => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return follow(res.headers.location);
        }
        if (res.statusCode !== 200) return reject(new Error('Status ' + res.statusCode));
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => { file.close(); resolve(); });
      }).on('error', reject);
    };
    follow(url);
  });
}

(async () => {
  const dir = path.join('frontend', 'public', 'images', 'outstation');
  console.log('Starting download for 42 destinations...');
  let count = 0;
  for (const item of destinations) {
    const destPath = path.join(dir, item.file);
    if (fs.existsSync(destPath)) {
      count++;
      continue;
    }
    const thumb = await fetchWikiThumb(item.q);
    if (thumb) {
      try {
        await downloadFile(thumb, destPath);
        console.log('[' + item.id + '/42] Downloaded: ' + item.name);
        count++;
      } catch (err) {
        console.log('[' + item.id + '/42] Download error ' + item.name + ': ' + err.message);
      }
    } else {
      console.log('[' + item.id + '/42] No thumb found for ' + item.name);
    }
  }
  console.log('Complete: ' + count + '/' + destinations.length);
})();
