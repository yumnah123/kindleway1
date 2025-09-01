import { fetchLogs } from '../../../lib/db';

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || '123';
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const pwd = req.headers['x-admin-pass'] || '';
    if (pwd !== getAdminPassword()) return res.status(401).json({ error: 'Unauthorized' });

    const { minNetAssets, fromDate, toDate, submittedBy } = req.query || {};

    const rows = await fetchLogs({
      minNetAssets: minNetAssets ? parseFloat(minNetAssets) : undefined,
      fromDate: fromDate || undefined,
      toDate: toDate || undefined,
      submittedBy: submittedBy || undefined,   // ✅ pass filter
    });

    const headers = ['id', 'created', 'total_assets', 'liabilities', 'net_assets', 'zakaat', 'submitted_by'];
    const lines = [headers.join(',')];

    for (const r of rows) {
      lines.push([
        r.id,
        new Date(r.created).toISOString(),
        r.total_assets,
        r.liabilities,
        r.net_assets,
        r.zakaat,
        r.submitted_by,
      ].join(','));
    }

    const csv = lines.join('\n');

    // ✅ Make filename dynamic if a user filter is applied
    const safeName = submittedBy ? submittedBy.replace(/[^a-z0-9_-]/gi, '_') : 'all';
    const filename = `zakat_logs_${safeName}.csv`;

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    return res.status(200).send(csv);

  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Server error' });
  }
}
