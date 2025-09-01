import { sql } from '@vercel/postgres';

// Insert a zakat record
export async function insertZakat({
  gold,
  silver,
  cash,
  bank,
  business,
  investments,
  property,
  other,
  liabilities,
  total_assets,
  net_assets,
  zakaat,
  submitted_by,
}) {
  const result = await sql`
    INSERT INTO zakat_logs 
      (gold, silver, cash, bank, business, investments, property, other, liabilities, total_assets, net_assets, zakaat, submitted_by)
    VALUES 
      (${gold}, ${silver}, ${cash}, ${bank}, ${business}, ${investments}, ${property}, ${other}, ${liabilities}, ${total_assets}, ${net_assets}, ${zakaat}, ${submitted_by})
    RETURNING *;
  `;
  return result.rows[0];
}

// Fetch logs with optional filters
export async function fetchLogs({ minNetAssets, fromDate, toDate, submittedBy } = {}) {
  let conditions = [];
  let params = [];

  if (minNetAssets) {
    conditions.push(`net_assets >= $${params.length + 1}`);
    params.push(minNetAssets);
  }
  if (fromDate) {
    conditions.push(`created >= $${params.length + 1}`);
    params.push(fromDate);
  }
  if (toDate) {
    conditions.push(`created <= $${params.length + 1}`);
    params.push(toDate);
  }
  if (submittedBy) {
    conditions.push(`submitted_by = $${params.length + 1}`);
    params.push(submittedBy);
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const query = `
    SELECT * FROM zakat_logs
    ${where}
    ORDER BY created DESC
  `;

  const result = await sql.query(query, params);
  return result.rows;
}
