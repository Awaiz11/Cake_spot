import { boolean, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

/**
 * Cake ideas captured by the "Send Your Cake Idea" form.
 * The customer is always sent to WhatsApp — this table keeps a copy of the
 * enquiry so the bakery queue and the website never disagree.
 */
export const cakeInquiries = pgTable("cake_inquiries", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  phone: text("phone").notNull(),
  occasion: text("occasion"),
  size: text("size"),
  flavour: text("flavour"),
  requiredDate: text("required_date"),
  message: text("message"),
  deliveryMode: text("delivery_mode"),
  deliveryArea: text("delivery_area"),
  referenceFileName: text("reference_file_name"),
  styleReferenced: text("style_referenced"),
  sentToWhatsapp: boolean("sent_to_whatsapp").default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type CakeInquiryInsert = typeof cakeInquiries.$inferInsert;
