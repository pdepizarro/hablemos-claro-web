import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { DatabaseSync } from "node:sqlite";

type DonationRecordInput = {
  checkoutSessionId: string;
  donationType: "one_time" | "monthly";
  amountCents: number | null;
  currency: string | null;
  customerId: string | null;
  customerEmail: string | null;
  subscriptionId: string | null;
  paymentIntentId: string | null;
  status: string;
  sourceEventId: string | null;
  sourceEventType: string | null;
  occurredAt: string;
};

type SubscriptionEventInput = {
  subscriptionId: string;
  customerId: string | null;
  customerEmail: string | null;
  status: string;
  amountCents: number | null;
  currency: string | null;
  sourceEventId: string;
  sourceEventType: string;
  occurredAt: string;
};

let db: DatabaseSync | null = null;

function getDbPath(): string {
  const configured = process.env["DONATIONS_DB_PATH"]?.trim();
  if (configured) return configured;
  return join(process.cwd(), ".data", "donations.sqlite");
}

function getDb(): DatabaseSync {
  if (db) return db;

  const dbPath = getDbPath();
  mkdirSync(dirname(dbPath), { recursive: true });
  db = new DatabaseSync(dbPath);
  db.exec(`
    CREATE TABLE IF NOT EXISTS donation_records (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      checkout_session_id TEXT NOT NULL,
      donation_type TEXT NOT NULL,
      amount_cents INTEGER,
      currency TEXT,
      customer_id TEXT,
      customer_email TEXT,
      subscription_id TEXT,
      payment_intent_id TEXT,
      status TEXT NOT NULL,
      source_event_id TEXT,
      source_event_type TEXT,
      occurred_at TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE UNIQUE INDEX IF NOT EXISTS idx_donation_records_checkout_session_id
    ON donation_records (checkout_session_id);

    CREATE TABLE IF NOT EXISTS subscription_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      subscription_id TEXT NOT NULL,
      customer_id TEXT,
      customer_email TEXT,
      status TEXT NOT NULL,
      amount_cents INTEGER,
      currency TEXT,
      source_event_id TEXT NOT NULL,
      source_event_type TEXT NOT NULL,
      occurred_at TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE UNIQUE INDEX IF NOT EXISTS idx_subscription_events_source_event_id
    ON subscription_events (source_event_id);
  `);

  return db;
}

export function upsertDonationRecord(input: DonationRecordInput): void {
  const database = getDb();
  const statement = database.prepare(`
    INSERT INTO donation_records (
      checkout_session_id, donation_type, amount_cents, currency, customer_id, customer_email,
      subscription_id, payment_intent_id, status, source_event_id, source_event_type, occurred_at
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(checkout_session_id) DO UPDATE SET
      donation_type = excluded.donation_type,
      amount_cents = excluded.amount_cents,
      currency = excluded.currency,
      customer_id = excluded.customer_id,
      customer_email = excluded.customer_email,
      subscription_id = excluded.subscription_id,
      payment_intent_id = excluded.payment_intent_id,
      status = excluded.status,
      source_event_id = excluded.source_event_id,
      source_event_type = excluded.source_event_type,
      occurred_at = excluded.occurred_at,
      updated_at = CURRENT_TIMESTAMP
  `);

  statement.run(
    input.checkoutSessionId,
    input.donationType,
    input.amountCents,
    input.currency,
    input.customerId,
    input.customerEmail,
    input.subscriptionId,
    input.paymentIntentId,
    input.status,
    input.sourceEventId,
    input.sourceEventType,
    input.occurredAt
  );
}

export function insertSubscriptionEvent(input: SubscriptionEventInput): void {
  const database = getDb();
  const statement = database.prepare(`
    INSERT OR IGNORE INTO subscription_events (
      subscription_id, customer_id, customer_email, status, amount_cents, currency,
      source_event_id, source_event_type, occurred_at
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  statement.run(
    input.subscriptionId,
    input.customerId,
    input.customerEmail,
    input.status,
    input.amountCents,
    input.currency,
    input.sourceEventId,
    input.sourceEventType,
    input.occurredAt
  );
}
