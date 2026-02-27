import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import process from 'node:process';
import { Pool } from 'pg';

import type {
    AthleteCreateManyInput,
    EnrollmentCreateManyInput,
    ParentCreateManyInput,
} from '../lib/db/generated/prisma/models';

import { PrismaClient } from '../lib/db/generated/prisma/client';
import env from '../lib/env';

const connectionString = `${env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

type DummyJsonUser = {
    firstName: string;
    lastName: string;
    email: string;
    birthDate: string;
    phone: string;
    address: {
        address: string;
        city: string;
    };
};

async function fetchUsers(limit: number) {
    const response = await fetch(`https://dummyjson.com/users?limit=${limit}`);
    const result = await response.json();

    return result.users as DummyJsonUser[];
}

function random(callback: () => any) {
    if (Math.random() < 0.4) {
        return null;
    }

    return callback();
}

function generateTaxCode() {
    let result = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    for (let i = 0; i < 16; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return result;
}

function generateDecimal(min: number, max: number) {
    return (Math.random() * (max - min) + min).toFixed(2);
}

function generateDate(start: Date, end: Date) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

async function main() {
    await prisma.enrollment.deleteMany({});
    await prisma.athlete.deleteMany({});
    await prisma.parent.deleteMany({});
    await prisma.course.deleteMany({});
    await prisma.season.deleteMany({});
    await prisma.activity.deleteMany({});

    // Activities
    const activities = await prisma.activity.createManyAndReturn({
        data: [
            {
                name: 'Volley',
            },
            {
                name: 'Ginnastica',
            },
        ],
    });

    // Seasons
    const seasons = await prisma.season.createManyAndReturn({
        data: [
            {
                starter_year: 2017,
                end_year: 2018,
            },
            {
                starter_year: 2018,
                end_year: 2019,
            },
            {
                starter_year: 2019,
                end_year: 2020,
            },
            {
                starter_year: 2020,
                end_year: 2021,
            },
            {
                starter_year: 2021,
                end_year: 2022,
            },
            {
                starter_year: 2022,
                end_year: 2023,
            },
            {
                starter_year: 2023,
                end_year: 2024,
            },
            {
                starter_year: 2024,
                end_year: 2025,
            },
            {
                starter_year: 2025,
                end_year: 2026,
            },
            {
                starter_year: 2026,
                end_year: 2027,
            },
        ],
    });

    // Courses
    const courses = await prisma.course.createManyAndReturn({
        data: [
            {
                name: 'M',
            },
            {
                name: 'U12',
            },
            {
                name: 'U14',
            },
            {
                name: 'U16',
            },
            {
                name: '2D',
            },
            {
                name: 'TB',
            },
            {
                name: 'Z',
            },
            {
                name: 'P',
            },
            {
                name: 'D',
            },
        ],
    });

    // Parents
    const parentUsers = await fetchUsers(50);
    const parents = await prisma.parent.createManyAndReturn({
        data: parentUsers.map<ParentCreateManyInput>((user) => {
            return {
                name: `${user.firstName} ${user.lastName}`,
                email: random(() => user.email),
                tax_code: generateTaxCode(),
            };
        }),
    });

    // Athletes
    const athleteUsers = await fetchUsers(200);
    const athletes = await prisma.athlete.createManyAndReturn({
        data: athleteUsers.map<AthleteCreateManyInput>((user) => {
            return {
                name: `${user.firstName} ${user.lastName}`,
                birthday: new Date('1996-5-30'),
                birthplace: user.address.city,
                tax_code: generateTaxCode(),
                city: user.address.city,
                address: user.address.address,
                phone_number: user.phone,
                email: random(() => user.email),
                parent_id: random(() => parents[Math.floor(Math.random() * parents.length)].id),
            };
        }),
    });

    // Enrollments
    await prisma.enrollment.createMany({
        data: athletes.map<EnrollmentCreateManyInput>((athlete) => {
            const season = seasons[Math.floor(Math.random() * seasons.length)];

            return {
                athlete_id: athlete.id,
                season_id: season.id,
                activity_id: activities[Math.floor(Math.random() * activities.length)].id,
                course_id: courses[Math.floor(Math.random() * courses.length)].id,
                volley_account: random(() => generateDecimal(300, 700)),
                volley_balance: random(() => generateDecimal(50, 250)),
                volley_balance_secondary: random(() => generateDecimal(0, 100)),
                first_installment: random(() => generateDecimal(100, 250)),
                second_installment: random(() => generateDecimal(100, 250)),
                third_installment: random(() => generateDecimal(100, 250)),
                certificate_expiration_date: random(() =>
                    generateDate(new Date(season.starter_year, 0), new Date(season.end_year + 1, 0)),
                ),
                certificate_download_url: null,
            };
        }),
    });
}
main()
    .then(async () => {
        await prisma.$disconnect();
        await pool.end();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        await pool.end();
        process.exit(1);
    });
