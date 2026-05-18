// Upload sản phẩm: nhận ảnh + thông tin → đẩy lên GitHub
exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const TOKEN = process.env.GITHUB_TOKEN;
  if (!TOKEN) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Server chưa cài đặt GITHUB_TOKEN' }) };
  }

  const REPO = 'vobaduytu/pqvilla';
  const BRANCH = 'main';

  try {
    const { action, name, category, description, image, filename, index } = JSON.parse(event.body);

    if (action === 'upload') {
      // 1. Upload image to GitHub
      const imgPath = `images/products/${filename}`;
      await githubPut(`https://api.github.com/repos/${REPO}/contents/${imgPath}`, {
        message: `Thêm ảnh: ${filename}`,
        content: image,
        branch: BRANCH
      }, TOKEN);

      // 2. Get current products-data.json
      const dataRes = await githubGet(`https://api.github.com/repos/${REPO}/contents/products-data.json`, TOKEN);
      const currentData = JSON.parse(Buffer.from(dataRes.content, 'base64').toString('utf-8'));

      // 3. Add new product
      currentData.products.push({ name, category, description, image: imgPath });

      // 4. Update products-data.json
      const newContent = Buffer.from(JSON.stringify(currentData, null, 2), 'utf-8').toString('base64');
      await githubPut(`https://api.github.com/repos/${REPO}/contents/products-data.json`, {
        message: `Thêm sản phẩm: ${name}`,
        content: newContent,
        sha: dataRes.sha,
        branch: BRANCH
      }, TOKEN);

      return { statusCode: 200, body: JSON.stringify({ success: true, message: `Đã thêm: ${name}` }) };

    } else if (action === 'delete') {
      // Get current data
      const dataRes = await githubGet(`https://api.github.com/repos/${REPO}/contents/products-data.json`, TOKEN);
      const currentData = JSON.parse(Buffer.from(dataRes.content, 'base64').toString('utf-8'));

      if (index < 0 || index >= currentData.products.length) {
        return { statusCode: 400, body: JSON.stringify({ error: 'Index không hợp lệ' }) };
      }

      const removed = currentData.products.splice(index, 1)[0];
      const newContent = Buffer.from(JSON.stringify(currentData, null, 2), 'utf-8').toString('base64');

      await githubPut(`https://api.github.com/repos/${REPO}/contents/products-data.json`, {
        message: `Xóa sản phẩm: ${removed.name}`,
        content: newContent,
        sha: dataRes.sha,
        branch: BRANCH
      }, TOKEN);

      return { statusCode: 200, body: JSON.stringify({ success: true, message: `Đã xóa: ${removed.name}` }) };

    } else {
      return { statusCode: 400, body: JSON.stringify({ error: 'Action không hợp lệ' }) };
    }

  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
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
