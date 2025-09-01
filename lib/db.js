import { sql } from '@vercel/postgres';

export async function ensureTable() {
  await sql`CREATE TABLE IF NOT EXISTS zakat_logs (
    id SERIAL PRIMARY KEY,
    gold NUMERIC, silver NUMERIC, cash NUMERIC, bank NUMERIC,
    business NUMERIC, investments NUMERIC, property NUMERIC, other NUMERIC,
    liabilities NUMERIC,
    total_assets NUMERIC, net_assets NUMERIC, zakaat NUMERIC,
    created TIMESTAMP DEFAULT NOW(),
    submitted_by VARCHAR(10)
  );`;
}

export async function insertZakat(entry) {
  await ensureTable();
  const r = await sql`
    INSERT INTO zakat_logs
    (gold, silver, cash, bank, business, investments, property, other, liabilities,
     total_assets, net_assets, zakaat, submitted_by)
    VALUES (${entry.gold}, ${entry.silver}, ${entry.cash}, ${entry.bank}, ${entry.business},
            ${entry.investments}, ${entry.property}, ${entry.other}, ${entry.liabilities},
            ${entry.total_assets}, ${entry.net_assets}, ${entry.zakaat}, ${entry.submitted_by})
    RETURNING *;`;
  return r.rows[0];
}

export async function fetchLogs({ minNetAssets, fromDate, toDate } = {}) {
  await ensureTable();
  let where = [];
  let params = [];
  if (minNetAssets != null) { where.push(`net_assets >= $${where.length+1}`); params.push(minNetAssets); }
  if (fromDate) { where.push(`created::date >= $${where.length+1}`); params.push(fromDate); }
  if (toDate) { where.push(`created::date <= $${where.length+1}`); params.push(toDate); }
  const clause = where.length ? `WHERE ${where.join(' AND ')}` : '';
  const q = `SELECT id, created, net_assets, zakaat, submitted_by, total_assets, liabilities
             FROM zakat_logs ${clause} ORDER BY created DESC`;
  const r = await sql.query(q, params);
  return r.rows;
}
