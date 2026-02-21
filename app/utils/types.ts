import type { AlertProps } from '@nuxt/ui';
import type { Activity, Athlete, Course, Parent, Season } from '~~/lib/db/generated/prisma/client';

export type Message = {
    title: string;
    color: AlertProps['color'];
    icon: string;
};

export type CertificateDateStatus = 'valid' | 'expired' | 'missing';

export type AuthFormFields = 'email' | 'password' | 'confirmPassword';

export type FullAthlete = Athlete & {
    activity: Activity;
    course: Course;
    parent: Parent;
    season: Season;
};
