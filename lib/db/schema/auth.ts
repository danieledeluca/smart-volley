import { relations } from 'drizzle-orm';
import { boolean, index, integer, pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const userRole = pgEnum('user_role', ['admin', 'manager', 'viewer']);

export const user = pgTable('user', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: text().notNull(),
    email: text().notNull().unique(),
    emailVerified: boolean().default(false).notNull(),
    image: text(),
    role: userRole(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().$onUpdate(() => new Date()).notNull(),
});

export const session = pgTable('session', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    expiresAt: timestamp().notNull(),
    token: text().notNull().unique(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().$onUpdate(() => new Date()).notNull(),
    ipAddress: text(),
    userAgent: text(),
    userId: integer().notNull().references(() => user.id, { onDelete: 'cascade' }),
}, (table) => [
    index().on(table.userId),
]);

export const account = pgTable('account', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    accountId: text().notNull(),
    providerId: text().notNull(),
    userId: integer().notNull().references(() => user.id, { onDelete: 'cascade' }),
    accessToken: text(),
    refreshToken: text(),
    idToken: text(),
    accessTokenExpiresAt: timestamp(),
    refreshTokenExpiresAt: timestamp(),
    scope: text(),
    password: text(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().$onUpdate(() => new Date()).notNull(),
}, (table) => [
    index().on(table.userId),
]);

export const verification = pgTable('verification', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    identifier: text().notNull(),
    value: text().notNull(),
    expiresAt: timestamp().notNull(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().$onUpdate(() => new Date()).notNull(),
}, (table) => [
    index().on(table.identifier),
]);

export const userRelations = relations(user, ({ many }) => {
    return {
        sessions: many(session),
        accounts: many(account),
    };
});

export const sessionRelations = relations(session, ({ one }) => {
    return {
        user: one(user, {
            fields: [session.userId],
            references: [user.id],
        }),
    };
});

export const accountRelations = relations(account, ({ one }) => {
    return {
        user: one(user, {
            fields: [account.userId],
            references: [user.id],
        }),
    };
});
