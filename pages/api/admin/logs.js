import { fetchLogs, insertZakat } from '../../../lib/db';
function getAdminPassword(){ return process.env.ADMIN_PASSWORD || '123'; }

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const pwd = req.headers['x-admin-pass'] || '';
      if (pwd !== getAdminPassword()) return res.status(401).json({ error: 'Unauthorized' });
      const b = req.body || {};
      const toNum = v => isNaN(parseFloat(v)) ? 0 : parseFloat(v);
      const f = ['gold','silver','cash','bank','business','investments','property','other','liabilities'];
      const vals = Object.fromEntries(f.map(k => [k, toNum(b[k] || 0)]));
      const total = vals.gold + vals.silver + vals.cash + vals.bank + vals.business + vals.investments + vals.property + vals.other;
      const net = Math.max(0, total - vals.liabilities);
      const zakaat = +(net * 0.025).toFixed(2);
      const row = await insertZakat({ ...vals, total_assets: total, net_assets: net, zakaat, submitted_by: 'admin' });
      return res.status(200).json({ row });
    } catch (e) { console.error(e); return res.status(500).json({ error: 'Server error' }); }
  }
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const pwd = req.headers['x-admin-pass'] || '';
    if (pwd !== getAdminPassword()) return res.status(401).json({ error: 'Unauthorized' });

    const { minNetAssets, fromDate, toDate } = req.query || {};
    const rows = await fetchLogs({
      minNetAssets: minNetAssets ? parseFloat(minNetAssets) : undefined,
      fromDate: fromDate || undefined,
      toDate: toDate || undefined
    });
    return res.status(200).json({ rows });
  } catch (e) { console.error(e); return res.status(500).json({ error: 'Server error' }); }
}
