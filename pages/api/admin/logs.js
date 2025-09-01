import { fetchLogs } from '../../../lib/db';

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || '123';
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const pwd = req.headers['x-admin-pass'] || '';
    if (pwd !== getAdminPassword()) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { minNetAssets, fromDate, toDate, submittedBy } = req.query || {};

    const rows = await fetchLogs({
      minNetAssets: minNetAssets ? parseFloat(minNetAssets) : undefined,
      fromDate: fromDate || undefined,
      toDate: toDate || undefined,
      submittedBy: submittedBy || undefined, // ✅ user filter
    });

    return res.status(200).json({ rows });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Server error' });
  }
}
