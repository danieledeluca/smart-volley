import type { MultipleDeleteSchema } from '~~/shared/utils/zod-schema';

import { and, desc, eq, inArray, isNull } from 'drizzle-orm';

import type { InsertAthlete } from '../schema';

import db from '..';
import { athlete, enrollment } from '../schema';

function mapBirthplaceToColumns(birthplace: InsertAthlete['birthplace']) {
    return {
        birthplacePostalCode: birthplace.postalCode || null,
        birthplaceCity: birthplace.city || null,
        birthplaceProvince: birthplace.province || null,
        birthplaceRegion: birthplace.region || null,
        birthplaceCountry: birthplace.country,
        birthplaceFormattedAddress: birthplace.formattedAddress,
        birthplacePlaceId: birthplace.placeId,
    };
}

function mapAddressToColumns(address: InsertAthlete['address']) {
    return {
        addressStreet: address.street,
        addressPostalCode: address.postalCode,
        addressCity: address.city,
        addressProvince: address.province,
        addressRegion: address.region,
        addressCountry: address.country,
        addressFormattedAddress: address.formattedAddress,
        addressPlaceId: address.placeId,
    };
}

export async function findAthletes() {
    return await db.query.athlete.findMany({
        where: isNull(athlete.deletedAt),
        columns: {
            id: true,
            name: true,
            fiscalCode: true,
            phoneNumber: true,
            email: true,
        },
        orderBy: desc(athlete.id),
    });
}

export async function findAthlete(athleteId: number) {
    const result = await db.query.athlete.findFirst({
        where: and(
            eq(athlete.id, athleteId),
            isNull(athlete.deletedAt),
        ),
        with: {
            parent: true,
            enrollments: {
                where: isNull(enrollment.deletedAt),
                with: {
                    season: true,
                    course: {
                        with: {
                            activity: true,
                        },
                    },
                },
            },
        },
    });

    if (!result) {
        return result;
    }

    const enrollments = result.enrollments
        .toSorted((athleteA, athleteB) => athleteB.season.endYear - athleteA.season.endYear)
        .map((enrollment) => {
            return {
                ...enrollment,
                activity: enrollment.course.activity,
            };
        });

    return {
        ...result,
        enrollments,
    };
}

export async function insertAthlete(data: InsertAthlete) {
    const { birthplace, address, phoneNumber = null, email = null, parentId = null, ...rest } = data;

    const [created] = await db.insert(athlete)
        .values({
            ...rest,
            ...mapBirthplaceToColumns(birthplace),
            ...mapAddressToColumns(address),
            phoneNumber,
            email,
            parentId,
        })
        .returning();

    return created;
}

export async function updateAthlete(data: InsertAthlete, athleteId: number) {
    const { birthplace, address, phoneNumber = null, email = null, parentId = null, ...rest } = data;

    const [updated] = await db.update(athlete)
        .set({
            ...rest,
            ...mapBirthplaceToColumns(birthplace),
            ...mapAddressToColumns(address),
            phoneNumber,
            email,
            parentId,
        })
        .where(eq(athlete.id, athleteId))
        .returning();

    return updated;
}

export async function deleteAthletes(data: MultipleDeleteSchema) {
    if (!data.ids.length) {
        return [];
    }

    const deleted = await db.update(athlete)
        .set({ deletedAt: new Date() })
        .where(inArray(athlete.id, data.ids))
        .returning();

    return deleted;
}

export async function deleteAthlete(athleteId: number) {
    const [deleted] = await db.update(athlete)
        .set({ deletedAt: new Date() })
        .where(eq(athlete.id, athleteId))
        .returning();

    return deleted;
}
