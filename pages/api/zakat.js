import { insertZakat } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const body = req.body || {};
    const toNum = v => isNaN(parseFloat(v)) ? 0 : parseFloat(v);
    const vals = {
      gold: toNum(body.gold), silver: toNum(body.silver), cash: toNum(body.cash), bank: toNum(body.bank),
      business: toNum(body.business), investments: toNum(body.investments), property: toNum(body.property),
      other: toNum(body.other), liabilities: toNum(body.liabilities)
    };
    const total = vals.gold + vals.silver + vals.cash + vals.bank + vals.business + vals.investments + vals.property + vals.other;
    const net = Math.max(0, total - vals.liabilities);
    const zakaat = +(net * 0.025).toFixed(2);

    const row = await insertZakat({ ...vals, total_assets: total, net_assets: net, zakaat, submitted_by: 'user' });
    return res.status(200).json({ id: row.id, net_assets: row.net_assets, zakaat: row.zakaat });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Server error. Is POSTGRES_URL set?' });
  }
}
