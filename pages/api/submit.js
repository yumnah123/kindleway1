// pages/api/submit.js
import { insertZakat } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      gold = 0,
      silver = 0,
      cash = 0,
      bank = 0,
      business = 0,
      investments = 0,
      property = 0,
      other = 0,
      liabilities = 0,
      submitted_by = 'anonymous',
    } = req.body || {};

    // convert to numbers
    const toNum = (v) => (isNaN(parseFloat(v)) ? 0 : parseFloat(v));
    const vals = {
      gold: toNum(gold),
      silver: toNum(silver),
      cash: toNum(cash),
      bank: toNum(bank),
      business: toNum(business),
      investments: toNum(investments),
      property: toNum(property),
      other: toNum(other),
      liabilities: toNum(liabilities),
    };

    // compute totals
    const total_assets =
      vals.gold +
      vals.silver +
      vals.cash +
      vals.bank +
      vals.business +
      vals.investments +
      vals.property +
      vals.other;

    const net_assets = Math.max(0, total_assets - vals.liabilities);
    const zakaat = +(net_assets * 0.025).toFixed(2);

    // insert into DB
    const row = await insertZakat({
      ...vals,
      total_assets,
      net_assets,
      zakaat,
      submitted_by,
    });

    return res.status(200).json({ success: true, row });
  } catch (err) {
    console.error('Submit API error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
