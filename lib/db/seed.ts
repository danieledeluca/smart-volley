/* eslint-disable no-console */
// @ts-check
import { Faker, it } from '@faker-js/faker';
import crypto from 'node:crypto';

import type {
    InsertActivity,
    InsertAthlete,
    InsertCourse,
    InsertEnrollment,
    InsertParent,
    InsertSeason,
} from './schema';

import { formatPhoneNumber } from '../../app/utils/formatters';
import db from './';
import { activity, athlete, course, enrollment, enrollmentPaymentType, parent, season } from './schema';

const faker = new Faker({
    locale: it,
});

function maybe<T>(callback: () => T, probability = 0.5) {
    return faker.helpers.maybe(callback, { probability });
}

function createRandomUser() {
    return {
        name: faker.person.fullName(),
        birthdate: faker.date.birthdate({ mode: 'age', min: 10, max: 65 }).toISOString().split('T')[0],
        birthplace: generateBirthplace(),
        fiscalCode: generateFiscalCode(),
        address: generateAddress(),
        phoneNumber: formatPhoneNumber(faker.phone.number({ style: 'international' })),
        email: faker.internet.email().toLowerCase(),
    };
}

function generateUsers(count: number) {
    return faker.helpers.multiple(createRandomUser, { count });
}

function generateBirthplace() {
    const postalCode = faker.location.zipCode();
    const province = faker.location.state({ abbreviated: true });
    const city = faker.location.city();
    const region = faker.location.state();
    const country = faker.location.country();
    const formattedAddress = [postalCode, province, city, region, country].filter(String).join(', ');

    return {
        postalCode,
        province,
        city,
        region,
        country,
        formattedAddress,
        placeId: crypto.randomUUID(),
    };
}

function generateAddress() {
    const street = faker.location.streetAddress();
    const postalCode = faker.location.zipCode();
    const province = faker.location.state({ abbreviated: true });
    const city = faker.location.city();
    const region = faker.location.state();
    const country = faker.location.country();
    const formattedAddress = [street, postalCode, province, city, region, country].filter(String).join(', ');

    return {
        street,
        postalCode,
        province,
        city,
        region,
        country,
        formattedAddress,
        placeId: crypto.randomUUID(),
    };
}

function generateFiscalCode() {
    // Format: [A-Z]{6}\d{2}[A-EHLMPR-T](\d{2})[A-Z]\d{3}[A-Z]$
    let result = '';

    // 6 uppercase letters
    for (let i = 0; i < 6; i++) {
        result += String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    }

    // 2 digits
    result += Math.floor(Math.random() * 10);
    result += Math.floor(Math.random() * 10);

    // 1 letter from [A-EHLMPR-T]
    const validLetters = 'AEHLMPRT';
    result += validLetters.charAt(Math.floor(Math.random() * validLetters.length));

    // 2 digits
    result += Math.floor(Math.random() * 10);
    result += Math.floor(Math.random() * 10);

    // 1 letter
    result += String.fromCharCode(Math.floor(Math.random() * 26) + 65);

    // 3 digits
    result += Math.floor(Math.random() * 10);
    result += Math.floor(Math.random() * 10);
    result += Math.floor(Math.random() * 10);

    // 1 letter
    result += String.fromCharCode(Math.floor(Math.random() * 26) + 65);

    return result;
}

function generateDecimal(min: number, max: number) {
    return faker.number.float({ min, max, multipleOf: 10 }).toString();
}

function generateDate(start: Date, end: Date) {
    return faker.date.between({ from: start, to: end }).toISOString().split('T')[0];
}

async function main() {
    await db.delete(enrollment);
    await db.delete(athlete);
    await db.delete(parent);
    await db.delete(season);
    await db.delete(course);
    await db.delete(activity);

    // Seasons
    const seasons: InsertSeason[] = [
        {
            startYear: 2017,
            endYear: 2018,
        },
        {
            startYear: 2018,
            endYear: 2019,
        },
        {
            startYear: 2019,
            endYear: 2020,
        },
        {
            startYear: 2020,
            endYear: 2021,
        },
        {
            startYear: 2021,
            endYear: 2022,
        },
        {
            startYear: 2022,
            endYear: 2023,
        },
        {
            startYear: 2023,
            endYear: 2024,
        },
        {
            startYear: 2024,
            endYear: 2025,
        },
        {
            startYear: 2025,
            endYear: 2026,
        },
        {
            startYear: 2026,
            endYear: 2027,
        },
    ];

    const insertedSeasons = await db.insert(season).values(seasons).returning();
    console.log('Seasons inserted successfully');

    // Activities
    const activities: InsertActivity[] = [
        {
            name: 'Volley',
        },
        {
            name: 'Ginnastica',
        },
    ];

    const insertedActivities = await db.insert(activity).values(activities).returning();
    console.log('Activities inserted successfully');

    // Courses
    const volleyActivityId = insertedActivities.find((activity) => activity.name === 'Volley')?.id || 1;
    const gymnasticsActivityId = insertedActivities.find((activity) => activity.name === 'Ginnastica')?.id || 2;

    const courses: InsertCourse[] = [
        {
            code: 'M',
            name: 'Minivolley',
            activityId: volleyActivityId,
        },
        {
            code: 'SM',
            name: 'Super minivolley',
            activityId: volleyActivityId,
        },
        {
            code: 'U10',
            name: 'Under 10',
            activityId: volleyActivityId,
        },
        {
            code: 'U12',
            name: 'Under 12',
            activityId: volleyActivityId,
        },
        {
            code: 'U13',
            name: 'Under 13',
            activityId: volleyActivityId,
        },
        {
            code: 'U14',
            name: 'Under 14',
            activityId: volleyActivityId,
        },
        {
            code: 'U15',
            name: 'Under 15',
            activityId: volleyActivityId,
        },
        {
            code: 'U16',
            name: 'Under 16',
            activityId: volleyActivityId,
        },
        {
            code: '2D',
            name: 'Seconda divisione',
            activityId: volleyActivityId,
        },
        {
            code: 'PA',
            name: 'Pallavolo amatoriale',
            activityId: volleyActivityId,
        },
        {
            code: 'TB',
            name: 'Total body',
            activityId: gymnasticsActivityId,
        },
        {
            code: 'Z',
            name: 'Zumba',
            activityId: gymnasticsActivityId,
        },
        {
            code: 'P',
            name: 'Pilates',
            activityId: gymnasticsActivityId,
        },
        {
            code: 'D',
            name: 'Dolce',
            activityId: gymnasticsActivityId,
        },
        {
            code: 'NW',
            name: 'Nordic walking',
            activityId: gymnasticsActivityId,
        },
        {
            code: 'CSG',
            name: 'Corri salta gioca',
            activityId: gymnasticsActivityId,
        },
    ];

    const insertedCourses = await db.insert(course).values(courses).returning();
    console.log('Courses inserted successfully');

    // Parents
    const parents = generateUsers(50).map<InsertParent>((user) => {
        return {
            name: user.name,
            fiscalCode: user.fiscalCode,
            phoneNumber: maybe(() => user.phoneNumber),
            email: maybe(() => user.email),
        };
    });

    const insertedParents = await db.insert(parent).values(parents).returning();
    console.log('Parents inserted successfully');

    // Athletes
    const athletes = generateUsers(200).map<InsertAthlete>((user) => {
        return {
            name: user.name,
            birthdate: user.birthdate,
            birthplace: user.birthplace,
            fiscalCode: user.fiscalCode,
            address: user.address,
            phoneNumber: maybe(() => user.phoneNumber),
            email: maybe(() => user.email),
            parentId: maybe(() => insertedParents[Math.floor(Math.random() * insertedParents.length)].id),
        };
    });

    const insertedAthletes = await db.insert(athlete).values(athletes.map((athlete) => {
        const { birthplace, address, ...rest } = athlete;
        return {
            ...rest,
            birthplacePostalCode: athlete.birthplace.postalCode,
            birthplaceCity: athlete.birthplace.city,
            birthplaceProvince: athlete.birthplace.province,
            birthplaceRegion: athlete.birthplace.region,
            birthplaceCountry: athlete.birthplace.country,
            birthplaceFormattedAddress: athlete.birthplace.formattedAddress,
            birthplacePlaceId: athlete.birthplace.placeId,
            addressStreet: athlete.address.street,
            addressPostalCode: athlete.address.postalCode,
            addressCity: athlete.address.city,
            addressProvince: athlete.address.province,
            addressRegion: athlete.address.region,
            addressCountry: athlete.address.country,
            addressFormattedAddress: athlete.address.formattedAddress,
            addressPlaceId: athlete.address.placeId,
        };
    })).returning();
    console.log('Athletes inserted successfully');

    // Enrollments
    const usedCombinations = new Set<string>();
    const enrollments: InsertEnrollment[] = (
        await Promise.all(insertedAthletes.flatMap((athlete) => {
            return Array.from({ length: 10 }, async () => {
                const season = insertedSeasons[Math.floor(Math.random() * insertedSeasons.length)];
                const course = insertedCourses[Math.floor(Math.random() * insertedCourses.length)];

                const key = `${athlete.id}-${season.id}-${course.id}`;

                if (usedCombinations.has(key)) {
                    return null;
                }

                usedCombinations.add(key);

                const firstPayment = maybe(() => generateDecimal(300, 700));
                const firstPaymentProbability = firstPayment ? 1 : 0;

                const secondPayment = maybe(() => generateDecimal(300, 700));
                const secondPaymentProbability = secondPayment ? 1 : 0;

                const thirdPayment = maybe(() => generateDecimal(300, 700));
                const thirdPaymentProbability = thirdPayment ? 1 : 0;

                return {
                    athleteId: athlete.id,
                    seasonId: season.id,
                    courseId: course.id,
                    firstPayment,
                    firstPaymentDate: maybe(
                        () => generateDate(new Date(season.startYear, 0), new Date()),
                        firstPaymentProbability,
                    ),
                    firstPaymentType: maybe(
                        () => faker.helpers.arrayElement(enrollmentPaymentType.enumValues),
                        firstPaymentProbability,
                    ),
                    secondPayment,
                    secondPaymentDate: maybe(
                        () => generateDate(new Date(season.startYear, 0), new Date()),
                        secondPaymentProbability,
                    ),
                    secondPaymentType: maybe(
                        () => faker.helpers.arrayElement(enrollmentPaymentType.enumValues),
                        secondPaymentProbability,
                    ),
                    thirdPayment,
                    thirdPaymentDate: maybe(
                        () => generateDate(new Date(season.startYear, 0), new Date()),
                        thirdPaymentProbability,
                    ),
                    thirdPaymentType: maybe(
                        () => faker.helpers.arrayElement(enrollmentPaymentType.enumValues),
                        thirdPaymentProbability,
                    ),
                    certificateExpirationDate:
                        maybe(() => generateDate(new Date(season.startYear, 0), new Date(season.endYear + 1, 0))),
                } satisfies InsertEnrollment;
            });
        }))
    ).filter((enrollment) => enrollment !== null);

    await db.insert(enrollment).values(enrollments.map((enrollment) => {
        return {
            ...enrollment,
            certificateStorageKey: null,
        };
    }));
    console.log('Enrollments inserted successfully');
};

main().then(() => {
    console.log('Seed completed');
    process.exit(0);
}).catch((err) => {
    console.error(err);
    process.exit(1);
});
