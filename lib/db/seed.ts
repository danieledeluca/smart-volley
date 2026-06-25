/* eslint-disable no-console */
// @ts-check
import { Faker, it } from '@faker-js/faker';

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
            key: 'volley',
            name: 'Volley',
        },
        {
            key: 'gymnastics',
            name: 'Ginnastica',
        },
    ];

    const insertedActivities = await db.insert(activity).values(activities).returning();
    console.log('Activities inserted successfully');

    // Courses
    const courses: InsertCourse[] = [
        {
            name: 'M',
            activityId: insertedActivities[Math.floor(Math.random() * insertedActivities.length)].id,
        },
        {
            name: 'U12',
            description: 'Under 12',
            activityId: insertedActivities[Math.floor(Math.random() * insertedActivities.length)].id,
        },
        {
            name: 'U14',
            description: 'Under 14',
            activityId: insertedActivities[Math.floor(Math.random() * insertedActivities.length)].id,
        },
        {
            name: 'U16',
            description: 'Under 16',
            activityId: insertedActivities[Math.floor(Math.random() * insertedActivities.length)].id,
        },
        {
            name: '2D',
            description: 'Seconda divisione',
            activityId: insertedActivities[Math.floor(Math.random() * insertedActivities.length)].id,
        },
        {
            name: 'TB',
            activityId: insertedActivities[Math.floor(Math.random() * insertedActivities.length)].id,
        },
        {
            name: 'Z',
            description: 'Zumba',
            activityId: insertedActivities[Math.floor(Math.random() * insertedActivities.length)].id,
        },
        {
            name: 'P',
            activityId: insertedActivities[Math.floor(Math.random() * insertedActivities.length)].id,
        },
        {
            name: 'D',
            activityId: insertedActivities[Math.floor(Math.random() * insertedActivities.length)].id,
        },
    ];

    const insertedCourses = await db.insert(course).values(courses).returning();
    console.log('Courses inserted successfully');

    // Parents
    const parents: InsertParent[] = generateUsers(50).map((user) => {
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
    const athletes: InsertAthlete[] = generateUsers(200).map((user) => {
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

    const insertedAthletes = await db.insert(athlete).values(athletes).returning();
    console.log('Athletes inserted successfully');

    // Enrollments
    const usedCombinations = new Set<string>();
    const enrollments: InsertEnrollment[] = (
        await Promise.all(insertedAthletes.flatMap((athlete) => {
            return Array.from({ length: 10 }, async () => {
                const season = insertedSeasons[Math.floor(Math.random() * insertedSeasons.length)];
                const course = insertedCourses[Math.floor(Math.random() * insertedCourses.length)];
                const activity = insertedActivities.find((activity) => activity.id === course.activityId);

                const key = `${athlete.id}-${season.id}-${course.id}`;

                if (usedCombinations.has(key)) {
                    return null;
                }

                usedCombinations.add(key);

                const isVolley = activity?.key === 'volley';
                const isGymnastics = activity?.key === 'gymnastics';

                const volleyProbability = Number(isVolley) / 2;
                const gymnasticsProbability = Number(isGymnastics) / 2;

                const volleyAccount = maybe(() => generateDecimal(300, 700), volleyProbability);
                const volleyAccountProbability = volleyAccount ? 1 : 0;

                const volleyBalance = maybe(() => generateDecimal(50, 250), volleyProbability);
                const volleyBalanceProbability = volleyBalance ? 1 : 0;

                const volleySecondBalance = maybe(() => generateDecimal(0, 100), volleyProbability);
                const volleySecondBalanceProbability = volleySecondBalance ? 1 : 0;

                const gymnasticsFirstInstallment = maybe(() => generateDecimal(100, 250), gymnasticsProbability);
                const gymnasticsFirstInstallmentProbability = gymnasticsFirstInstallment ? 1 : 0;

                const gymnasticsSecondInstallment = maybe(() => generateDecimal(100, 250), gymnasticsProbability);
                const gymnasticsSecondInstallmentProbability = gymnasticsSecondInstallment ? 1 : 0;

                const gymnasticsThirdInstallment = maybe(() => generateDecimal(100, 250), gymnasticsProbability);
                const gymnasticsThirdInstallmentProbability = gymnasticsThirdInstallment ? 1 : 0;

                return {
                    athleteId: athlete.id,
                    seasonId: season.id,
                    courseId: course.id,
                    volleyAccount,
                    volleyAccountDate: maybe(
                        () => generateDate(new Date(season.startYear, 0), new Date()),
                        volleyAccountProbability,
                    ),
                    volleyAccountType: maybe(
                        () => faker.helpers.arrayElement(enrollmentPaymentType.enumValues),
                        volleyAccountProbability,
                    ),
                    volleyBalance,
                    volleyBalanceDate: maybe(
                        () => generateDate(new Date(season.startYear, 0), new Date()),
                        volleyBalanceProbability,
                    ),
                    volleyBalanceType: maybe(
                        () => faker.helpers.arrayElement(enrollmentPaymentType.enumValues),
                        volleyBalanceProbability,
                    ),
                    volleySecondBalance,
                    volleySecondBalanceDate: maybe(
                        () => generateDate(new Date(season.startYear, 0), new Date()),
                        volleySecondBalanceProbability,
                    ),
                    volleySecondBalanceType: maybe(
                        () => faker.helpers.arrayElement(enrollmentPaymentType.enumValues),
                        volleySecondBalanceProbability,
                    ),
                    gymnasticsFirstInstallment,
                    gymnasticsFirstInstallmentDate: maybe(
                        () => generateDate(new Date(season.startYear, 0), new Date()),
                        gymnasticsFirstInstallmentProbability,
                    ),
                    gymnasticsFirstInstallmentType: maybe(
                        () => faker.helpers.arrayElement(enrollmentPaymentType.enumValues),
                        gymnasticsFirstInstallmentProbability,
                    ),
                    gymnasticsSecondInstallment,
                    gymnasticsSecondInstallmentDate: maybe(
                        () => generateDate(new Date(season.startYear, 0), new Date()),
                        gymnasticsSecondInstallmentProbability,
                    ),
                    gymnasticsSecondInstallmentType: maybe(
                        () => faker.helpers.arrayElement(enrollmentPaymentType.enumValues),
                        gymnasticsSecondInstallmentProbability,
                    ),
                    gymnasticsThirdInstallment,
                    gymnasticsThirdInstallmentDate: maybe(
                        () => generateDate(new Date(season.startYear, 0), new Date()),
                        gymnasticsThirdInstallmentProbability,
                    ),
                    gymnasticsThirdInstallmentType: maybe(
                        () => faker.helpers.arrayElement(enrollmentPaymentType.enumValues),
                        gymnasticsThirdInstallmentProbability,
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
}); ;
