import { sql } from '@vercel/postgres';

async function seed() {
  try {
    await sql`
      INSERT INTO zakat_logs 
        (gold, silver, cash, bank, business, investments, property, other, liabilities, total_assets, net_assets, zakaat, submitted_by)
      VALUES
        (10, 20, 100, 200, 50, 0, 0, 0, 20, 360, 340, 8.5, 'alice@example.com'),
        (5, 10, 500, 1000, 100, 50, 0, 0, 100, 1665, 1565, 39.1, 'bob@example.com'),
        (0, 0, 2000, 500, 0, 0, 100, 50, 300, 2650, 2350, 58.75, 'carol@example.com')
    `;
    console.log('✅ Dummy data inserted successfully!');
  } catch (err) {
    console.error('❌ Error seeding data:', err);
  }
}

seed();
