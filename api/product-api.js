// Vercel API Route — Quản lý sản phẩm + dự án
module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const TOKEN = process.env.GITHUB_TOKEN;
  if (!TOKEN) {
    return res.status(500).json({ error: 'Server chưa cài đặt GITHUB_TOKEN' });
  }

  const REPO = 'vobaduytu/pqvilla';
  const BRANCH = 'main';

  try {
    const body = req.body;
    const { action, type } = body;
    const dataFile = type === 'project' ? 'projects-data.json' : 'products-data.json';
    const dataKey = type === 'project' ? 'projects' : 'products';
    const imgFolder = type === 'project' ? 'images/projects' : 'images/products';

    if (action === 'upload') {
      const { name, category, description, location, image, filename } = body;

      // 1. Upload image to GitHub
      const imgPath = `${imgFolder}/${filename}`;
      await githubPut(`https://api.github.com/repos/${REPO}/contents/${imgPath}`, {
        message: `Thêm ảnh: ${filename}`,
        content: image,
        branch: BRANCH
      }, TOKEN);

      // 2. Get current data
      const dataRes = await githubGet(`https://api.github.com/repos/${REPO}/contents/${dataFile}`, TOKEN);
      const currentData = JSON.parse(Buffer.from(dataRes.content, 'base64').toString('utf-8'));

      // 3. Add new item
      if (type === 'project') {
        currentData[dataKey].push({
          name,
          location: location || '',
          category: category || 'khac',
          image: imgPath
        });
      } else {
        currentData[dataKey].push({
          name,
          category: category || 'KHÁC',
          description: description || 'Sản phẩm nhôm kính cao cấp.',
          image: imgPath
        });
      }

      // 4. Update data file
      const newContent = Buffer.from(JSON.stringify(currentData, null, 2), 'utf-8').toString('base64');
      await githubPut(`https://api.github.com/repos/${REPO}/contents/${dataFile}`, {
        message: `Thêm ${type === 'project' ? 'dự án' : 'sản phẩm'}: ${name}`,
        content: newContent,
        sha: dataRes.sha,
        branch: BRANCH
      }, TOKEN);

      return res.status(200).json({ success: true, message: `Đã thêm: ${name}` });

    } else if (action === 'delete') {
      const { index } = body;

      const dataRes = await githubGet(`https://api.github.com/repos/${REPO}/contents/${dataFile}`, TOKEN);
      const currentData = JSON.parse(Buffer.from(dataRes.content, 'base64').toString('utf-8'));

      if (index < 0 || index >= currentData[dataKey].length) {
        return res.status(400).json({ error: 'Index không hợp lệ' });
      }

      const removed = currentData[dataKey].splice(index, 1)[0];
      const newContent = Buffer.from(JSON.stringify(currentData, null, 2), 'utf-8').toString('base64');

      await githubPut(`https://api.github.com/repos/${REPO}/contents/${dataFile}`, {
        message: `Xóa ${type === 'project' ? 'dự án' : 'sản phẩm'}: ${removed.name}`,
        content: newContent,
        sha: dataRes.sha,
        branch: BRANCH
      }, TOKEN);

      return res.status(200).json({ success: true, message: `Đã xóa: ${removed.name}` });

    } else {
      return res.status(400).json({ error: 'Action không hợp lệ' });
    }

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

async function githubGet(url, token) {
  const res = await fetch(url, {
    headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/vnd.github.v3+json' }
  });
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  return res.json();
}

async function githubPut(url, body, token) {
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.github.v3+json'
    },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || `GitHub API error: ${res.status}`);
  }
  return res.json();
}
