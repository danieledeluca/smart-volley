import type { NeonDbError } from '@neondatabase/serverless';
import type { FormError } from '@nuxt/ui';
import type { DrizzleError } from 'drizzle-orm';
import type { H3Event } from 'h3';

export default function sendDbError(event: H3Event, error: DrizzleError) {
    const cause = error.cause as NeonDbError;

    if (cause.code === '23505') {
        const constrainMessages: Record<string, FormError> = {
            athlete_fiscalCode_unique: {
                name: 'fiscalCode',
                message: $t('form.field.fiscal_code.duplicate'),
            },
            athlete_phone_number_index: {
                name: 'phoneNumber',
                message: $t('form.field.phone_number.duplicate'),
            },
            athlete_email_index: {
                name: 'email',
                message: $t('form.field.email.duplicate'),
            },
            parent_fiscalCode_unique: {
                name: 'fiscalCode',
                message: $t('form.field.fiscal_code.duplicate'),
            },
            parent_phone_number_index: {
                name: 'phoneNumber',
                message: $t('form.field.phone_number.duplicate'),
            },
            parent_email_index: {
                name: 'email',
                message: $t('form.field.email.duplicate'),
            },
            activity_name_unique: {
                name: 'name',
                message: $t('form.field.activity_name.duplicate'),
            },
            course_name_unique: {
                name: 'name',
                message: $t('form.field.course_name.duplicate'),
            },
        };

        const statusMessages: Record<string, string> = {
            enrollment_athleteId_seasonId_activityId_courseId_unique: $t('form.field.enrollment.duplicate'),
            season_startYear_endYear_unique: $t('form.field.season.duplicate'),
        };

        const formError = constrainMessages[cause.constraint || ''];
        const statusMessage = statusMessages[cause.constraint || ''];

        return sendError(event, createError({
            statusCode: 409,
            statusMessage: statusMessage || 'Conflict',
            data: formError ? [formError] : undefined,
        }));
    }

    if (cause.code === '23503') {
        const constraintMessages: Record<string, FormError> = {
            athlete_parent_id_parent_id_fk: {
                name: 'parentId',
                message: $t('form.field.parent_id.not_found'),
            },
            enrollment_athlete_id_athlete_id_fk: {
                name: 'athleteId',
                message: $t('form.field.athlete_id.not_found'),
            },
            enrollment_season_id_season_id_fk: {
                name: 'seasonId',
                message: $t('form.field.season_id.not_found'),
            },
            enrollment_activity_id_activity_id_fk: {
                name: 'activityId',
                message: $t('form.field.activity_id.not_found'),
            },
            enrollment_course_id_course_id_fk: {
                name: 'courseId',
                message: $t('form.field.course_id.not_found'),
            },
        };

        const formError = constraintMessages[cause.constraint || ''];

        return sendError(event, createError({
            statusCode: 422,
            statusMessage: 'Unprocessable Entity',
            data: formError ? [formError] : undefined,
        }));
    }

    return sendError(event, createError({ statusCode: 500 }));
}
