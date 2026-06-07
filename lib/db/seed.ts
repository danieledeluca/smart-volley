/* eslint-disable no-console */
import { Faker, it } from '@faker-js/faker';

import { formatPhoneNumber } from '../../app/utils/formatters';
import db from './';
import * as schema from './schema';

const faker = new Faker({
    locale: it,
});

function maybe<T>(callback: () => T) {
    return faker.helpers.maybe(callback, { probability: 0.6 });
}

function createRandomUser() {
    return {
        name: faker.person.fullName(),
        birthdate: faker.date.birthdate({ mode: 'age', min: 10, max: 65 }).toISOString().split('T')[0],
        birthplace: faker.location.city(),
        fiscalCode: generateFiscalCode(),
        city: faker.location.city(),
        address: faker.location.streetAddress(),
        phoneNumber: formatPhoneNumber(faker.phone.number({ style: 'international' })),
        email: faker.internet.email().toLowerCase(),
    };
}

function generateUsers(count: number) {
    return faker.helpers.multiple(createRandomUser, { count });
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
    await db.delete(schema.enrollment);
    await db.delete(schema.athlete);
    await db.delete(schema.parent);
    await db.delete(schema.season);
    await db.delete(schema.activity);
    await db.delete(schema.course);

    // Seasons
    const seasons: schema.InsertSeason[] = [
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

    const insertedSeasons = await db.insert(schema.season).values(seasons).returning();
    console.log('Seasons inserted successfully');

    // Activities
    const activities: schema.InsertActivity[] = [
        {
            name: 'Volley',
        },
        {
            name: 'Ginnastica',
        },
    ];

    const insertedActivities = await db.insert(schema.activity).values(activities).returning();
    console.log('Activities inserted successfully');

    // Courses
    const courses: schema.InsertCourse[] = [
        {
            name: 'M',
        },
        {
            name: 'U12',
            description: 'Under 12',
        },
        {
            name: 'U14',
            description: 'Under 14',
        },
        {
            name: 'U16',
            description: 'Under 16',
        },
        {
            name: '2D',
            description: 'Seconda divisione',
        },
        {
            name: 'TB',
        },
        {
            name: 'Z',
            description: 'Zumba',
        },
        {
            name: 'P',
        },
        {
            name: 'D',
        },
    ];

    const insertedCourses = await db.insert(schema.course).values(courses).returning();
    console.log('Courses inserted successfully');

    // Parents
    const parents: schema.InsertParent[] = generateUsers(50).map((user) => {
        return {
            name: user.name,
            fiscalCode: user.fiscalCode,
            phoneNumber: maybe(() => user.phoneNumber),
            email: maybe(() => user.email),
        };
    });

    const insertedParents = await db.insert(schema.parent).values(parents).returning();
    console.log('Parents inserted successfully');

    // Athletes
    const athletes: schema.InsertAthlete[] = generateUsers(200).map((user) => {
        return {
            name: user.name,
            birthdate: user.birthdate,
            birthplace: user.birthplace,
            fiscalCode: user.fiscalCode,
            city: user.city,
            address: user.address,
            phoneNumber: maybe(() => user.phoneNumber),
            email: maybe(() => user.email),
            parentId: maybe(() => insertedParents[Math.floor(Math.random() * insertedParents.length)].id),
        };
    });

    const insertedAthletes = await db.insert(schema.athlete).values(athletes).returning();
    console.log('Athletes inserted successfully');

    // Enrollments
    const usedCombinations = new Set<string>();
    const enrollments: schema.InsertEnrollment[] = (
        await Promise.all(insertedAthletes.flatMap((athlete) => {
            return Array.from({ length: 10 }, async () => {
                const season = insertedSeasons[Math.floor(Math.random() * insertedSeasons.length)];
                const activity = insertedActivities[Math.floor(Math.random() * insertedActivities.length)];
                const course = insertedCourses[Math.floor(Math.random() * insertedCourses.length)];

                const key = `${athlete.id}-${season.id}-${activity.id}-${course.id}`;

                if (usedCombinations.has(key)) {
                    return null;
                }

                usedCombinations.add(key);

                return {
                    athleteId: athlete.id,
                    seasonId: season.id,
                    activityId: activity.id,
                    courseId: course.id,
                    volleyAccount: maybe(() => generateDecimal(300, 700)),
                    volleyBalance: maybe(() => generateDecimal(50, 250)),
                    volleyBalanceSecondary: maybe(() => generateDecimal(0, 100)),
                    firstInstallment: maybe(() => generateDecimal(100, 250)),
                    secondInstallment: maybe(() => generateDecimal(100, 250)),
                    thirdInstallment: maybe(() => generateDecimal(100, 250)),
                    certificateExpirationDate:
                        maybe(() => generateDate(new Date(season.startYear, 0), new Date(season.endYear + 1, 0))),
                } satisfies schema.InsertEnrollment;
            });
        }))
    ).filter((enrollment) => enrollment !== null);

    await db.insert(schema.enrollment).values(enrollments.map((enrollment) => {
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
}); ;
