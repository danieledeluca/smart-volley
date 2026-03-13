import { z } from 'zod';
import type { Prisma } from '../prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const SeasonScalarFieldEnumSchema = z.enum(['id','starter_year','end_year']);

export const ActivityScalarFieldEnumSchema = z.enum(['id','name']);

export const CourseScalarFieldEnumSchema = z.enum(['id','name']);

export const ParentScalarFieldEnumSchema = z.enum(['id','name','phone_number','email','tax_code']);

export const AthleteScalarFieldEnumSchema = z.enum(['id','name','birthday','birthplace','tax_code','city','address','phone_number','email','parent_id']);

export const EnrollmentScalarFieldEnumSchema = z.enum(['id','athlete_id','season_id','activity_id','course_id','volley_account','volley_balance','volley_balance_secondary','first_installment','second_installment','third_installment','certificate_expiration_date','certificate_download_url']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// SEASON SCHEMA
/////////////////////////////////////////

export const SeasonSchema = z.object({
  id: z.number().int(),
  starter_year: z.number().int(),
  end_year: z.number().int(),
})

export type Season = z.infer<typeof SeasonSchema>

// SEASON OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const SeasonOptionalDefaultsSchema = SeasonSchema.merge(z.object({
  id: z.number().int().optional(),
}))

export type SeasonOptionalDefaults = z.infer<typeof SeasonOptionalDefaultsSchema>

/////////////////////////////////////////
// ACTIVITY SCHEMA
/////////////////////////////////////////

export const ActivitySchema = z.object({
  id: z.number().int(),
  name: z.string(),
})

export type Activity = z.infer<typeof ActivitySchema>

// ACTIVITY OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const ActivityOptionalDefaultsSchema = ActivitySchema.merge(z.object({
  id: z.number().int().optional(),
}))

export type ActivityOptionalDefaults = z.infer<typeof ActivityOptionalDefaultsSchema>

/////////////////////////////////////////
// COURSE SCHEMA
/////////////////////////////////////////

export const CourseSchema = z.object({
  id: z.number().int(),
  name: z.string(),
})

export type Course = z.infer<typeof CourseSchema>

// COURSE OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const CourseOptionalDefaultsSchema = CourseSchema.merge(z.object({
  id: z.number().int().optional(),
}))

export type CourseOptionalDefaults = z.infer<typeof CourseOptionalDefaultsSchema>

/////////////////////////////////////////
// PARENT SCHEMA
/////////////////////////////////////////

export const ParentSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  phone_number: z.string(),
  email: z.string().nullable(),
  tax_code: z.string(),
})

export type Parent = z.infer<typeof ParentSchema>

// PARENT OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const ParentOptionalDefaultsSchema = ParentSchema.merge(z.object({
  id: z.number().int().optional(),
}))

export type ParentOptionalDefaults = z.infer<typeof ParentOptionalDefaultsSchema>

/////////////////////////////////////////
// ATHLETE SCHEMA
/////////////////////////////////////////

export const AthleteSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  birthday: z.coerce.date(),
  birthplace: z.string(),
  tax_code: z.string(),
  city: z.string(),
  address: z.string(),
  phone_number: z.string(),
  email: z.string().nullable(),
  parent_id: z.number().int().nullable(),
})

export type Athlete = z.infer<typeof AthleteSchema>

// ATHLETE OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const AthleteOptionalDefaultsSchema = AthleteSchema.merge(z.object({
  id: z.number().int().optional(),
}))

export type AthleteOptionalDefaults = z.infer<typeof AthleteOptionalDefaultsSchema>

/////////////////////////////////////////
// ENROLLMENT SCHEMA
/////////////////////////////////////////

export const EnrollmentSchema = z.object({
  id: z.number().int(),
  athlete_id: z.number().int(),
  season_id: z.number().int(),
  activity_id: z.number().int(),
  course_id: z.number().int(),
  volley_account: z.number().nullable(),
  volley_balance: z.number().nullable(),
  volley_balance_secondary: z.number().nullable(),
  first_installment: z.number().nullable(),
  second_installment: z.number().nullable(),
  third_installment: z.number().nullable(),
  certificate_expiration_date: z.coerce.date().nullable(),
  certificate_download_url: z.string().nullable(),
})

export type Enrollment = z.infer<typeof EnrollmentSchema>

// ENROLLMENT OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const EnrollmentOptionalDefaultsSchema = EnrollmentSchema.merge(z.object({
  id: z.number().int().optional(),
}))

export type EnrollmentOptionalDefaults = z.infer<typeof EnrollmentOptionalDefaultsSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// SEASON
//------------------------------------------------------

export const SeasonIncludeSchema: z.ZodType<Prisma.SeasonInclude> = z.object({
  enrollments: z.union([z.boolean(),z.lazy(() => EnrollmentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => SeasonCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const SeasonArgsSchema: z.ZodType<Prisma.SeasonDefaultArgs> = z.object({
  select: z.lazy(() => SeasonSelectSchema).optional(),
  include: z.lazy(() => SeasonIncludeSchema).optional(),
}).strict();

export const SeasonCountOutputTypeArgsSchema: z.ZodType<Prisma.SeasonCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => SeasonCountOutputTypeSelectSchema).nullish(),
}).strict();

export const SeasonCountOutputTypeSelectSchema: z.ZodType<Prisma.SeasonCountOutputTypeSelect> = z.object({
  enrollments: z.boolean().optional(),
}).strict();

export const SeasonSelectSchema: z.ZodType<Prisma.SeasonSelect> = z.object({
  id: z.boolean().optional(),
  starter_year: z.boolean().optional(),
  end_year: z.boolean().optional(),
  enrollments: z.union([z.boolean(),z.lazy(() => EnrollmentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => SeasonCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ACTIVITY
//------------------------------------------------------

export const ActivityIncludeSchema: z.ZodType<Prisma.ActivityInclude> = z.object({
  enrollments: z.union([z.boolean(),z.lazy(() => EnrollmentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ActivityCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const ActivityArgsSchema: z.ZodType<Prisma.ActivityDefaultArgs> = z.object({
  select: z.lazy(() => ActivitySelectSchema).optional(),
  include: z.lazy(() => ActivityIncludeSchema).optional(),
}).strict();

export const ActivityCountOutputTypeArgsSchema: z.ZodType<Prisma.ActivityCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ActivityCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ActivityCountOutputTypeSelectSchema: z.ZodType<Prisma.ActivityCountOutputTypeSelect> = z.object({
  enrollments: z.boolean().optional(),
}).strict();

export const ActivitySelectSchema: z.ZodType<Prisma.ActivitySelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  enrollments: z.union([z.boolean(),z.lazy(() => EnrollmentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ActivityCountOutputTypeArgsSchema)]).optional(),
}).strict()

// COURSE
//------------------------------------------------------

export const CourseIncludeSchema: z.ZodType<Prisma.CourseInclude> = z.object({
  enrollments: z.union([z.boolean(),z.lazy(() => EnrollmentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CourseCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const CourseArgsSchema: z.ZodType<Prisma.CourseDefaultArgs> = z.object({
  select: z.lazy(() => CourseSelectSchema).optional(),
  include: z.lazy(() => CourseIncludeSchema).optional(),
}).strict();

export const CourseCountOutputTypeArgsSchema: z.ZodType<Prisma.CourseCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CourseCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CourseCountOutputTypeSelectSchema: z.ZodType<Prisma.CourseCountOutputTypeSelect> = z.object({
  enrollments: z.boolean().optional(),
}).strict();

export const CourseSelectSchema: z.ZodType<Prisma.CourseSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  enrollments: z.union([z.boolean(),z.lazy(() => EnrollmentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CourseCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PARENT
//------------------------------------------------------

export const ParentIncludeSchema: z.ZodType<Prisma.ParentInclude> = z.object({
  athletes: z.union([z.boolean(),z.lazy(() => AthleteFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ParentCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const ParentArgsSchema: z.ZodType<Prisma.ParentDefaultArgs> = z.object({
  select: z.lazy(() => ParentSelectSchema).optional(),
  include: z.lazy(() => ParentIncludeSchema).optional(),
}).strict();

export const ParentCountOutputTypeArgsSchema: z.ZodType<Prisma.ParentCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ParentCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ParentCountOutputTypeSelectSchema: z.ZodType<Prisma.ParentCountOutputTypeSelect> = z.object({
  athletes: z.boolean().optional(),
}).strict();

export const ParentSelectSchema: z.ZodType<Prisma.ParentSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  phone_number: z.boolean().optional(),
  email: z.boolean().optional(),
  tax_code: z.boolean().optional(),
  athletes: z.union([z.boolean(),z.lazy(() => AthleteFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ParentCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ATHLETE
//------------------------------------------------------

export const AthleteIncludeSchema: z.ZodType<Prisma.AthleteInclude> = z.object({
  parent: z.union([z.boolean(),z.lazy(() => ParentArgsSchema)]).optional(),
  enrollments: z.union([z.boolean(),z.lazy(() => EnrollmentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AthleteCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const AthleteArgsSchema: z.ZodType<Prisma.AthleteDefaultArgs> = z.object({
  select: z.lazy(() => AthleteSelectSchema).optional(),
  include: z.lazy(() => AthleteIncludeSchema).optional(),
}).strict();

export const AthleteCountOutputTypeArgsSchema: z.ZodType<Prisma.AthleteCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => AthleteCountOutputTypeSelectSchema).nullish(),
}).strict();

export const AthleteCountOutputTypeSelectSchema: z.ZodType<Prisma.AthleteCountOutputTypeSelect> = z.object({
  enrollments: z.boolean().optional(),
}).strict();

export const AthleteSelectSchema: z.ZodType<Prisma.AthleteSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  birthday: z.boolean().optional(),
  birthplace: z.boolean().optional(),
  tax_code: z.boolean().optional(),
  city: z.boolean().optional(),
  address: z.boolean().optional(),
  phone_number: z.boolean().optional(),
  email: z.boolean().optional(),
  parent_id: z.boolean().optional(),
  parent: z.union([z.boolean(),z.lazy(() => ParentArgsSchema)]).optional(),
  enrollments: z.union([z.boolean(),z.lazy(() => EnrollmentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AthleteCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ENROLLMENT
//------------------------------------------------------

export const EnrollmentIncludeSchema: z.ZodType<Prisma.EnrollmentInclude> = z.object({
  athlete: z.union([z.boolean(),z.lazy(() => AthleteArgsSchema)]).optional(),
  season: z.union([z.boolean(),z.lazy(() => SeasonArgsSchema)]).optional(),
  activity: z.union([z.boolean(),z.lazy(() => ActivityArgsSchema)]).optional(),
  course: z.union([z.boolean(),z.lazy(() => CourseArgsSchema)]).optional(),
}).strict();

export const EnrollmentArgsSchema: z.ZodType<Prisma.EnrollmentDefaultArgs> = z.object({
  select: z.lazy(() => EnrollmentSelectSchema).optional(),
  include: z.lazy(() => EnrollmentIncludeSchema).optional(),
}).strict();

export const EnrollmentSelectSchema: z.ZodType<Prisma.EnrollmentSelect> = z.object({
  id: z.boolean().optional(),
  athlete_id: z.boolean().optional(),
  season_id: z.boolean().optional(),
  activity_id: z.boolean().optional(),
  course_id: z.boolean().optional(),
  volley_account: z.boolean().optional(),
  volley_balance: z.boolean().optional(),
  volley_balance_secondary: z.boolean().optional(),
  first_installment: z.boolean().optional(),
  second_installment: z.boolean().optional(),
  third_installment: z.boolean().optional(),
  certificate_expiration_date: z.boolean().optional(),
  certificate_download_url: z.boolean().optional(),
  athlete: z.union([z.boolean(),z.lazy(() => AthleteArgsSchema)]).optional(),
  season: z.union([z.boolean(),z.lazy(() => SeasonArgsSchema)]).optional(),
  activity: z.union([z.boolean(),z.lazy(() => ActivityArgsSchema)]).optional(),
  course: z.union([z.boolean(),z.lazy(() => CourseArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const SeasonWhereInputSchema: z.ZodType<Prisma.SeasonWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => SeasonWhereInputSchema), z.lazy(() => SeasonWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SeasonWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SeasonWhereInputSchema), z.lazy(() => SeasonWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  starter_year: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  end_year: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  enrollments: z.lazy(() => EnrollmentListRelationFilterSchema).optional(),
});

export const SeasonOrderByWithRelationInputSchema: z.ZodType<Prisma.SeasonOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  starter_year: z.lazy(() => SortOrderSchema).optional(),
  end_year: z.lazy(() => SortOrderSchema).optional(),
  enrollments: z.lazy(() => EnrollmentOrderByRelationAggregateInputSchema).optional(),
});

export const SeasonWhereUniqueInputSchema: z.ZodType<Prisma.SeasonWhereUniqueInput> = z.union([
  z.object({
    id: z.number(),
    starter_year_end_year: z.lazy(() => SeasonStarter_yearEnd_yearCompoundUniqueInputSchema),
  }),
  z.object({
    id: z.number(),
  }),
  z.object({
    starter_year_end_year: z.lazy(() => SeasonStarter_yearEnd_yearCompoundUniqueInputSchema),
  }),
])
.and(z.strictObject({
  id: z.number().optional(),
  starter_year_end_year: z.lazy(() => SeasonStarter_yearEnd_yearCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => SeasonWhereInputSchema), z.lazy(() => SeasonWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SeasonWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SeasonWhereInputSchema), z.lazy(() => SeasonWhereInputSchema).array() ]).optional(),
  starter_year: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  end_year: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  enrollments: z.lazy(() => EnrollmentListRelationFilterSchema).optional(),
}));

export const SeasonOrderByWithAggregationInputSchema: z.ZodType<Prisma.SeasonOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  starter_year: z.lazy(() => SortOrderSchema).optional(),
  end_year: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SeasonCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => SeasonAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SeasonMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SeasonMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => SeasonSumOrderByAggregateInputSchema).optional(),
});

export const SeasonScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SeasonScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => SeasonScalarWhereWithAggregatesInputSchema), z.lazy(() => SeasonScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SeasonScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SeasonScalarWhereWithAggregatesInputSchema), z.lazy(() => SeasonScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  starter_year: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  end_year: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
});

export const ActivityWhereInputSchema: z.ZodType<Prisma.ActivityWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => ActivityWhereInputSchema), z.lazy(() => ActivityWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ActivityWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ActivityWhereInputSchema), z.lazy(() => ActivityWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  enrollments: z.lazy(() => EnrollmentListRelationFilterSchema).optional(),
});

export const ActivityOrderByWithRelationInputSchema: z.ZodType<Prisma.ActivityOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  enrollments: z.lazy(() => EnrollmentOrderByRelationAggregateInputSchema).optional(),
});

export const ActivityWhereUniqueInputSchema: z.ZodType<Prisma.ActivityWhereUniqueInput> = z.union([
  z.object({
    id: z.number(),
    name: z.string(),
  }),
  z.object({
    id: z.number(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.strictObject({
  id: z.number().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => ActivityWhereInputSchema), z.lazy(() => ActivityWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ActivityWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ActivityWhereInputSchema), z.lazy(() => ActivityWhereInputSchema).array() ]).optional(),
  enrollments: z.lazy(() => EnrollmentListRelationFilterSchema).optional(),
}));

export const ActivityOrderByWithAggregationInputSchema: z.ZodType<Prisma.ActivityOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ActivityCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ActivityAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ActivityMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ActivityMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ActivitySumOrderByAggregateInputSchema).optional(),
});

export const ActivityScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ActivityScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => ActivityScalarWhereWithAggregatesInputSchema), z.lazy(() => ActivityScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ActivityScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ActivityScalarWhereWithAggregatesInputSchema), z.lazy(() => ActivityScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
});

export const CourseWhereInputSchema: z.ZodType<Prisma.CourseWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => CourseWhereInputSchema), z.lazy(() => CourseWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CourseWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CourseWhereInputSchema), z.lazy(() => CourseWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  enrollments: z.lazy(() => EnrollmentListRelationFilterSchema).optional(),
});

export const CourseOrderByWithRelationInputSchema: z.ZodType<Prisma.CourseOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  enrollments: z.lazy(() => EnrollmentOrderByRelationAggregateInputSchema).optional(),
});

export const CourseWhereUniqueInputSchema: z.ZodType<Prisma.CourseWhereUniqueInput> = z.union([
  z.object({
    id: z.number(),
    name: z.string(),
  }),
  z.object({
    id: z.number(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.strictObject({
  id: z.number().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => CourseWhereInputSchema), z.lazy(() => CourseWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CourseWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CourseWhereInputSchema), z.lazy(() => CourseWhereInputSchema).array() ]).optional(),
  enrollments: z.lazy(() => EnrollmentListRelationFilterSchema).optional(),
}));

export const CourseOrderByWithAggregationInputSchema: z.ZodType<Prisma.CourseOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CourseCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => CourseAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CourseMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CourseMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => CourseSumOrderByAggregateInputSchema).optional(),
});

export const CourseScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CourseScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => CourseScalarWhereWithAggregatesInputSchema), z.lazy(() => CourseScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CourseScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CourseScalarWhereWithAggregatesInputSchema), z.lazy(() => CourseScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
});

export const ParentWhereInputSchema: z.ZodType<Prisma.ParentWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => ParentWhereInputSchema), z.lazy(() => ParentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ParentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ParentWhereInputSchema), z.lazy(() => ParentWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  phone_number: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  tax_code: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  athletes: z.lazy(() => AthleteListRelationFilterSchema).optional(),
});

export const ParentOrderByWithRelationInputSchema: z.ZodType<Prisma.ParentOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  phone_number: z.lazy(() => SortOrderSchema).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  tax_code: z.lazy(() => SortOrderSchema).optional(),
  athletes: z.lazy(() => AthleteOrderByRelationAggregateInputSchema).optional(),
});

export const ParentWhereUniqueInputSchema: z.ZodType<Prisma.ParentWhereUniqueInput> = z.union([
  z.object({
    id: z.number(),
    tax_code: z.string(),
  }),
  z.object({
    id: z.number(),
  }),
  z.object({
    tax_code: z.string(),
  }),
])
.and(z.strictObject({
  id: z.number().optional(),
  tax_code: z.string().optional(),
  AND: z.union([ z.lazy(() => ParentWhereInputSchema), z.lazy(() => ParentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ParentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ParentWhereInputSchema), z.lazy(() => ParentWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  phone_number: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  athletes: z.lazy(() => AthleteListRelationFilterSchema).optional(),
}));

export const ParentOrderByWithAggregationInputSchema: z.ZodType<Prisma.ParentOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  phone_number: z.lazy(() => SortOrderSchema).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  tax_code: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ParentCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ParentAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ParentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ParentMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ParentSumOrderByAggregateInputSchema).optional(),
});

export const ParentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ParentScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => ParentScalarWhereWithAggregatesInputSchema), z.lazy(() => ParentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ParentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ParentScalarWhereWithAggregatesInputSchema), z.lazy(() => ParentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  phone_number: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  tax_code: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
});

export const AthleteWhereInputSchema: z.ZodType<Prisma.AthleteWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => AthleteWhereInputSchema), z.lazy(() => AthleteWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AthleteWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AthleteWhereInputSchema), z.lazy(() => AthleteWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  birthday: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  birthplace: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  tax_code: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  city: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  address: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  phone_number: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  parent_id: z.union([ z.lazy(() => IntNullableFilterSchema), z.number() ]).optional().nullable(),
  parent: z.union([ z.lazy(() => ParentNullableScalarRelationFilterSchema), z.lazy(() => ParentWhereInputSchema) ]).optional().nullable(),
  enrollments: z.lazy(() => EnrollmentListRelationFilterSchema).optional(),
});

export const AthleteOrderByWithRelationInputSchema: z.ZodType<Prisma.AthleteOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  birthday: z.lazy(() => SortOrderSchema).optional(),
  birthplace: z.lazy(() => SortOrderSchema).optional(),
  tax_code: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  phone_number: z.lazy(() => SortOrderSchema).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  parent_id: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  parent: z.lazy(() => ParentOrderByWithRelationInputSchema).optional(),
  enrollments: z.lazy(() => EnrollmentOrderByRelationAggregateInputSchema).optional(),
});

export const AthleteWhereUniqueInputSchema: z.ZodType<Prisma.AthleteWhereUniqueInput> = z.union([
  z.object({
    id: z.number(),
    tax_code: z.string(),
  }),
  z.object({
    id: z.number(),
  }),
  z.object({
    tax_code: z.string(),
  }),
])
.and(z.strictObject({
  id: z.number().optional(),
  tax_code: z.string().optional(),
  AND: z.union([ z.lazy(() => AthleteWhereInputSchema), z.lazy(() => AthleteWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AthleteWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AthleteWhereInputSchema), z.lazy(() => AthleteWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  birthday: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  birthplace: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  city: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  address: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  phone_number: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  parent_id: z.union([ z.lazy(() => IntNullableFilterSchema), z.number() ]).optional().nullable(),
  parent: z.union([ z.lazy(() => ParentNullableScalarRelationFilterSchema), z.lazy(() => ParentWhereInputSchema) ]).optional().nullable(),
  enrollments: z.lazy(() => EnrollmentListRelationFilterSchema).optional(),
}));

export const AthleteOrderByWithAggregationInputSchema: z.ZodType<Prisma.AthleteOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  birthday: z.lazy(() => SortOrderSchema).optional(),
  birthplace: z.lazy(() => SortOrderSchema).optional(),
  tax_code: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  phone_number: z.lazy(() => SortOrderSchema).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  parent_id: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => AthleteCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AthleteAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AthleteMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AthleteMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AthleteSumOrderByAggregateInputSchema).optional(),
});

export const AthleteScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AthleteScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => AthleteScalarWhereWithAggregatesInputSchema), z.lazy(() => AthleteScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AthleteScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AthleteScalarWhereWithAggregatesInputSchema), z.lazy(() => AthleteScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  birthday: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  birthplace: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  tax_code: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  city: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  address: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  phone_number: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  parent_id: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema), z.number() ]).optional().nullable(),
});

export const EnrollmentWhereInputSchema: z.ZodType<Prisma.EnrollmentWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => EnrollmentWhereInputSchema), z.lazy(() => EnrollmentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EnrollmentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EnrollmentWhereInputSchema), z.lazy(() => EnrollmentWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  athlete_id: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  season_id: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  activity_id: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  course_id: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  volley_account: z.union([ z.lazy(() => FloatNullableFilterSchema), z.number() ]).optional().nullable(),
  volley_balance: z.union([ z.lazy(() => FloatNullableFilterSchema), z.number() ]).optional().nullable(),
  volley_balance_secondary: z.union([ z.lazy(() => FloatNullableFilterSchema), z.number() ]).optional().nullable(),
  first_installment: z.union([ z.lazy(() => FloatNullableFilterSchema), z.number() ]).optional().nullable(),
  second_installment: z.union([ z.lazy(() => FloatNullableFilterSchema), z.number() ]).optional().nullable(),
  third_installment: z.union([ z.lazy(() => FloatNullableFilterSchema), z.number() ]).optional().nullable(),
  certificate_expiration_date: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  certificate_download_url: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  athlete: z.union([ z.lazy(() => AthleteScalarRelationFilterSchema), z.lazy(() => AthleteWhereInputSchema) ]).optional(),
  season: z.union([ z.lazy(() => SeasonScalarRelationFilterSchema), z.lazy(() => SeasonWhereInputSchema) ]).optional(),
  activity: z.union([ z.lazy(() => ActivityScalarRelationFilterSchema), z.lazy(() => ActivityWhereInputSchema) ]).optional(),
  course: z.union([ z.lazy(() => CourseScalarRelationFilterSchema), z.lazy(() => CourseWhereInputSchema) ]).optional(),
});

export const EnrollmentOrderByWithRelationInputSchema: z.ZodType<Prisma.EnrollmentOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  athlete_id: z.lazy(() => SortOrderSchema).optional(),
  season_id: z.lazy(() => SortOrderSchema).optional(),
  activity_id: z.lazy(() => SortOrderSchema).optional(),
  course_id: z.lazy(() => SortOrderSchema).optional(),
  volley_account: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  volley_balance: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  volley_balance_secondary: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  first_installment: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  second_installment: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  third_installment: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  certificate_expiration_date: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  certificate_download_url: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  athlete: z.lazy(() => AthleteOrderByWithRelationInputSchema).optional(),
  season: z.lazy(() => SeasonOrderByWithRelationInputSchema).optional(),
  activity: z.lazy(() => ActivityOrderByWithRelationInputSchema).optional(),
  course: z.lazy(() => CourseOrderByWithRelationInputSchema).optional(),
});

export const EnrollmentWhereUniqueInputSchema: z.ZodType<Prisma.EnrollmentWhereUniqueInput> = z.union([
  z.object({
    id: z.number(),
    athlete_id_season_id_activity_id_course_id: z.lazy(() => EnrollmentAthlete_idSeason_idActivity_idCourse_idCompoundUniqueInputSchema),
  }),
  z.object({
    id: z.number(),
  }),
  z.object({
    athlete_id_season_id_activity_id_course_id: z.lazy(() => EnrollmentAthlete_idSeason_idActivity_idCourse_idCompoundUniqueInputSchema),
  }),
])
.and(z.strictObject({
  id: z.number().optional(),
  athlete_id_season_id_activity_id_course_id: z.lazy(() => EnrollmentAthlete_idSeason_idActivity_idCourse_idCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => EnrollmentWhereInputSchema), z.lazy(() => EnrollmentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EnrollmentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EnrollmentWhereInputSchema), z.lazy(() => EnrollmentWhereInputSchema).array() ]).optional(),
  athlete_id: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  season_id: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  activity_id: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  course_id: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  volley_account: z.union([ z.lazy(() => FloatNullableFilterSchema), z.number() ]).optional().nullable(),
  volley_balance: z.union([ z.lazy(() => FloatNullableFilterSchema), z.number() ]).optional().nullable(),
  volley_balance_secondary: z.union([ z.lazy(() => FloatNullableFilterSchema), z.number() ]).optional().nullable(),
  first_installment: z.union([ z.lazy(() => FloatNullableFilterSchema), z.number() ]).optional().nullable(),
  second_installment: z.union([ z.lazy(() => FloatNullableFilterSchema), z.number() ]).optional().nullable(),
  third_installment: z.union([ z.lazy(() => FloatNullableFilterSchema), z.number() ]).optional().nullable(),
  certificate_expiration_date: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  certificate_download_url: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  athlete: z.union([ z.lazy(() => AthleteScalarRelationFilterSchema), z.lazy(() => AthleteWhereInputSchema) ]).optional(),
  season: z.union([ z.lazy(() => SeasonScalarRelationFilterSchema), z.lazy(() => SeasonWhereInputSchema) ]).optional(),
  activity: z.union([ z.lazy(() => ActivityScalarRelationFilterSchema), z.lazy(() => ActivityWhereInputSchema) ]).optional(),
  course: z.union([ z.lazy(() => CourseScalarRelationFilterSchema), z.lazy(() => CourseWhereInputSchema) ]).optional(),
}));

export const EnrollmentOrderByWithAggregationInputSchema: z.ZodType<Prisma.EnrollmentOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  athlete_id: z.lazy(() => SortOrderSchema).optional(),
  season_id: z.lazy(() => SortOrderSchema).optional(),
  activity_id: z.lazy(() => SortOrderSchema).optional(),
  course_id: z.lazy(() => SortOrderSchema).optional(),
  volley_account: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  volley_balance: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  volley_balance_secondary: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  first_installment: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  second_installment: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  third_installment: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  certificate_expiration_date: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  certificate_download_url: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => EnrollmentCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => EnrollmentAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => EnrollmentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => EnrollmentMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => EnrollmentSumOrderByAggregateInputSchema).optional(),
});

export const EnrollmentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.EnrollmentScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => EnrollmentScalarWhereWithAggregatesInputSchema), z.lazy(() => EnrollmentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => EnrollmentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EnrollmentScalarWhereWithAggregatesInputSchema), z.lazy(() => EnrollmentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  athlete_id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  season_id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  activity_id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  course_id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema), z.number() ]).optional(),
  volley_account: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema), z.number() ]).optional().nullable(),
  volley_balance: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema), z.number() ]).optional().nullable(),
  volley_balance_secondary: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema), z.number() ]).optional().nullable(),
  first_installment: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema), z.number() ]).optional().nullable(),
  second_installment: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema), z.number() ]).optional().nullable(),
  third_installment: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema), z.number() ]).optional().nullable(),
  certificate_expiration_date: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date() ]).optional().nullable(),
  certificate_download_url: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
});

export const SeasonCreateInputSchema: z.ZodType<Prisma.SeasonCreateInput> = z.strictObject({
  starter_year: z.number(),
  end_year: z.number(),
  enrollments: z.lazy(() => EnrollmentCreateNestedManyWithoutSeasonInputSchema).optional(),
});

export const SeasonUncheckedCreateInputSchema: z.ZodType<Prisma.SeasonUncheckedCreateInput> = z.strictObject({
  id: z.number().optional(),
  starter_year: z.number(),
  end_year: z.number(),
  enrollments: z.lazy(() => EnrollmentUncheckedCreateNestedManyWithoutSeasonInputSchema).optional(),
});

export const SeasonUpdateInputSchema: z.ZodType<Prisma.SeasonUpdateInput> = z.strictObject({
  starter_year: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  end_year: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  enrollments: z.lazy(() => EnrollmentUpdateManyWithoutSeasonNestedInputSchema).optional(),
});

export const SeasonUncheckedUpdateInputSchema: z.ZodType<Prisma.SeasonUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  starter_year: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  end_year: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  enrollments: z.lazy(() => EnrollmentUncheckedUpdateManyWithoutSeasonNestedInputSchema).optional(),
});

export const SeasonCreateManyInputSchema: z.ZodType<Prisma.SeasonCreateManyInput> = z.strictObject({
  id: z.number().optional(),
  starter_year: z.number(),
  end_year: z.number(),
});

export const SeasonUpdateManyMutationInputSchema: z.ZodType<Prisma.SeasonUpdateManyMutationInput> = z.strictObject({
  starter_year: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  end_year: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
});

export const SeasonUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SeasonUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  starter_year: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  end_year: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ActivityCreateInputSchema: z.ZodType<Prisma.ActivityCreateInput> = z.strictObject({
  name: z.string(),
  enrollments: z.lazy(() => EnrollmentCreateNestedManyWithoutActivityInputSchema).optional(),
});

export const ActivityUncheckedCreateInputSchema: z.ZodType<Prisma.ActivityUncheckedCreateInput> = z.strictObject({
  id: z.number().optional(),
  name: z.string(),
  enrollments: z.lazy(() => EnrollmentUncheckedCreateNestedManyWithoutActivityInputSchema).optional(),
});

export const ActivityUpdateInputSchema: z.ZodType<Prisma.ActivityUpdateInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enrollments: z.lazy(() => EnrollmentUpdateManyWithoutActivityNestedInputSchema).optional(),
});

export const ActivityUncheckedUpdateInputSchema: z.ZodType<Prisma.ActivityUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enrollments: z.lazy(() => EnrollmentUncheckedUpdateManyWithoutActivityNestedInputSchema).optional(),
});

export const ActivityCreateManyInputSchema: z.ZodType<Prisma.ActivityCreateManyInput> = z.strictObject({
  id: z.number().optional(),
  name: z.string(),
});

export const ActivityUpdateManyMutationInputSchema: z.ZodType<Prisma.ActivityUpdateManyMutationInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ActivityUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ActivityUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const CourseCreateInputSchema: z.ZodType<Prisma.CourseCreateInput> = z.strictObject({
  name: z.string(),
  enrollments: z.lazy(() => EnrollmentCreateNestedManyWithoutCourseInputSchema).optional(),
});

export const CourseUncheckedCreateInputSchema: z.ZodType<Prisma.CourseUncheckedCreateInput> = z.strictObject({
  id: z.number().optional(),
  name: z.string(),
  enrollments: z.lazy(() => EnrollmentUncheckedCreateNestedManyWithoutCourseInputSchema).optional(),
});

export const CourseUpdateInputSchema: z.ZodType<Prisma.CourseUpdateInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enrollments: z.lazy(() => EnrollmentUpdateManyWithoutCourseNestedInputSchema).optional(),
});

export const CourseUncheckedUpdateInputSchema: z.ZodType<Prisma.CourseUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  enrollments: z.lazy(() => EnrollmentUncheckedUpdateManyWithoutCourseNestedInputSchema).optional(),
});

export const CourseCreateManyInputSchema: z.ZodType<Prisma.CourseCreateManyInput> = z.strictObject({
  id: z.number().optional(),
  name: z.string(),
});

export const CourseUpdateManyMutationInputSchema: z.ZodType<Prisma.CourseUpdateManyMutationInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const CourseUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CourseUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ParentCreateInputSchema: z.ZodType<Prisma.ParentCreateInput> = z.strictObject({
  name: z.string(),
  phone_number: z.string(),
  email: z.string().optional().nullable(),
  tax_code: z.string(),
  athletes: z.lazy(() => AthleteCreateNestedManyWithoutParentInputSchema).optional(),
});

export const ParentUncheckedCreateInputSchema: z.ZodType<Prisma.ParentUncheckedCreateInput> = z.strictObject({
  id: z.number().optional(),
  name: z.string(),
  phone_number: z.string(),
  email: z.string().optional().nullable(),
  tax_code: z.string(),
  athletes: z.lazy(() => AthleteUncheckedCreateNestedManyWithoutParentInputSchema).optional(),
});

export const ParentUpdateInputSchema: z.ZodType<Prisma.ParentUpdateInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tax_code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  athletes: z.lazy(() => AthleteUpdateManyWithoutParentNestedInputSchema).optional(),
});

export const ParentUncheckedUpdateInputSchema: z.ZodType<Prisma.ParentUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tax_code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  athletes: z.lazy(() => AthleteUncheckedUpdateManyWithoutParentNestedInputSchema).optional(),
});

export const ParentCreateManyInputSchema: z.ZodType<Prisma.ParentCreateManyInput> = z.strictObject({
  id: z.number().optional(),
  name: z.string(),
  phone_number: z.string(),
  email: z.string().optional().nullable(),
  tax_code: z.string(),
});

export const ParentUpdateManyMutationInputSchema: z.ZodType<Prisma.ParentUpdateManyMutationInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tax_code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ParentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ParentUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tax_code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const AthleteCreateInputSchema: z.ZodType<Prisma.AthleteCreateInput> = z.strictObject({
  name: z.string(),
  birthday: z.coerce.date(),
  birthplace: z.string(),
  tax_code: z.string(),
  city: z.string(),
  address: z.string(),
  phone_number: z.string(),
  email: z.string().optional().nullable(),
  parent: z.lazy(() => ParentCreateNestedOneWithoutAthletesInputSchema).optional(),
  enrollments: z.lazy(() => EnrollmentCreateNestedManyWithoutAthleteInputSchema).optional(),
});

export const AthleteUncheckedCreateInputSchema: z.ZodType<Prisma.AthleteUncheckedCreateInput> = z.strictObject({
  id: z.number().optional(),
  name: z.string(),
  birthday: z.coerce.date(),
  birthplace: z.string(),
  tax_code: z.string(),
  city: z.string(),
  address: z.string(),
  phone_number: z.string(),
  email: z.string().optional().nullable(),
  parent_id: z.number().optional().nullable(),
  enrollments: z.lazy(() => EnrollmentUncheckedCreateNestedManyWithoutAthleteInputSchema).optional(),
});

export const AthleteUpdateInputSchema: z.ZodType<Prisma.AthleteUpdateInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthday: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  birthplace: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tax_code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parent: z.lazy(() => ParentUpdateOneWithoutAthletesNestedInputSchema).optional(),
  enrollments: z.lazy(() => EnrollmentUpdateManyWithoutAthleteNestedInputSchema).optional(),
});

export const AthleteUncheckedUpdateInputSchema: z.ZodType<Prisma.AthleteUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthday: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  birthplace: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tax_code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parent_id: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  enrollments: z.lazy(() => EnrollmentUncheckedUpdateManyWithoutAthleteNestedInputSchema).optional(),
});

export const AthleteCreateManyInputSchema: z.ZodType<Prisma.AthleteCreateManyInput> = z.strictObject({
  id: z.number().optional(),
  name: z.string(),
  birthday: z.coerce.date(),
  birthplace: z.string(),
  tax_code: z.string(),
  city: z.string(),
  address: z.string(),
  phone_number: z.string(),
  email: z.string().optional().nullable(),
  parent_id: z.number().optional().nullable(),
});

export const AthleteUpdateManyMutationInputSchema: z.ZodType<Prisma.AthleteUpdateManyMutationInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthday: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  birthplace: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tax_code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const AthleteUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AthleteUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthday: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  birthplace: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tax_code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parent_id: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const EnrollmentCreateInputSchema: z.ZodType<Prisma.EnrollmentCreateInput> = z.strictObject({
  volley_account: z.number().optional().nullable(),
  volley_balance: z.number().optional().nullable(),
  volley_balance_secondary: z.number().optional().nullable(),
  first_installment: z.number().optional().nullable(),
  second_installment: z.number().optional().nullable(),
  third_installment: z.number().optional().nullable(),
  certificate_expiration_date: z.coerce.date().optional().nullable(),
  certificate_download_url: z.string().optional().nullable(),
  athlete: z.lazy(() => AthleteCreateNestedOneWithoutEnrollmentsInputSchema),
  season: z.lazy(() => SeasonCreateNestedOneWithoutEnrollmentsInputSchema),
  activity: z.lazy(() => ActivityCreateNestedOneWithoutEnrollmentsInputSchema),
  course: z.lazy(() => CourseCreateNestedOneWithoutEnrollmentsInputSchema),
});

export const EnrollmentUncheckedCreateInputSchema: z.ZodType<Prisma.EnrollmentUncheckedCreateInput> = z.strictObject({
  id: z.number().optional(),
  athlete_id: z.number(),
  season_id: z.number(),
  activity_id: z.number(),
  course_id: z.number(),
  volley_account: z.number().optional().nullable(),
  volley_balance: z.number().optional().nullable(),
  volley_balance_secondary: z.number().optional().nullable(),
  first_installment: z.number().optional().nullable(),
  second_installment: z.number().optional().nullable(),
  third_installment: z.number().optional().nullable(),
  certificate_expiration_date: z.coerce.date().optional().nullable(),
  certificate_download_url: z.string().optional().nullable(),
});

export const EnrollmentUpdateInputSchema: z.ZodType<Prisma.EnrollmentUpdateInput> = z.strictObject({
  volley_account: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  volley_balance: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  volley_balance_secondary: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_installment: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  second_installment: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  third_installment: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  certificate_expiration_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  certificate_download_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  athlete: z.lazy(() => AthleteUpdateOneRequiredWithoutEnrollmentsNestedInputSchema).optional(),
  season: z.lazy(() => SeasonUpdateOneRequiredWithoutEnrollmentsNestedInputSchema).optional(),
  activity: z.lazy(() => ActivityUpdateOneRequiredWithoutEnrollmentsNestedInputSchema).optional(),
  course: z.lazy(() => CourseUpdateOneRequiredWithoutEnrollmentsNestedInputSchema).optional(),
});

export const EnrollmentUncheckedUpdateInputSchema: z.ZodType<Prisma.EnrollmentUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  athlete_id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  season_id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  activity_id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  course_id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  volley_account: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  volley_balance: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  volley_balance_secondary: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_installment: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  second_installment: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  third_installment: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  certificate_expiration_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  certificate_download_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const EnrollmentCreateManyInputSchema: z.ZodType<Prisma.EnrollmentCreateManyInput> = z.strictObject({
  id: z.number().optional(),
  athlete_id: z.number(),
  season_id: z.number(),
  activity_id: z.number(),
  course_id: z.number(),
  volley_account: z.number().optional().nullable(),
  volley_balance: z.number().optional().nullable(),
  volley_balance_secondary: z.number().optional().nullable(),
  first_installment: z.number().optional().nullable(),
  second_installment: z.number().optional().nullable(),
  third_installment: z.number().optional().nullable(),
  certificate_expiration_date: z.coerce.date().optional().nullable(),
  certificate_download_url: z.string().optional().nullable(),
});

export const EnrollmentUpdateManyMutationInputSchema: z.ZodType<Prisma.EnrollmentUpdateManyMutationInput> = z.strictObject({
  volley_account: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  volley_balance: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  volley_balance_secondary: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_installment: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  second_installment: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  third_installment: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  certificate_expiration_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  certificate_download_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const EnrollmentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.EnrollmentUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  athlete_id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  season_id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  activity_id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  course_id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  volley_account: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  volley_balance: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  volley_balance_secondary: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_installment: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  second_installment: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  third_installment: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  certificate_expiration_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  certificate_download_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
});

export const EnrollmentListRelationFilterSchema: z.ZodType<Prisma.EnrollmentListRelationFilter> = z.strictObject({
  every: z.lazy(() => EnrollmentWhereInputSchema).optional(),
  some: z.lazy(() => EnrollmentWhereInputSchema).optional(),
  none: z.lazy(() => EnrollmentWhereInputSchema).optional(),
});

export const EnrollmentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.EnrollmentOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const SeasonStarter_yearEnd_yearCompoundUniqueInputSchema: z.ZodType<Prisma.SeasonStarter_yearEnd_yearCompoundUniqueInput> = z.strictObject({
  starter_year: z.number(),
  end_year: z.number(),
});

export const SeasonCountOrderByAggregateInputSchema: z.ZodType<Prisma.SeasonCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  starter_year: z.lazy(() => SortOrderSchema).optional(),
  end_year: z.lazy(() => SortOrderSchema).optional(),
});

export const SeasonAvgOrderByAggregateInputSchema: z.ZodType<Prisma.SeasonAvgOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  starter_year: z.lazy(() => SortOrderSchema).optional(),
  end_year: z.lazy(() => SortOrderSchema).optional(),
});

export const SeasonMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SeasonMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  starter_year: z.lazy(() => SortOrderSchema).optional(),
  end_year: z.lazy(() => SortOrderSchema).optional(),
});

export const SeasonMinOrderByAggregateInputSchema: z.ZodType<Prisma.SeasonMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  starter_year: z.lazy(() => SortOrderSchema).optional(),
  end_year: z.lazy(() => SortOrderSchema).optional(),
});

export const SeasonSumOrderByAggregateInputSchema: z.ZodType<Prisma.SeasonSumOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  starter_year: z.lazy(() => SortOrderSchema).optional(),
  end_year: z.lazy(() => SortOrderSchema).optional(),
});

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional(),
});

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
});

export const ActivityCountOrderByAggregateInputSchema: z.ZodType<Prisma.ActivityCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
});

export const ActivityAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ActivityAvgOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
});

export const ActivityMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ActivityMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
});

export const ActivityMinOrderByAggregateInputSchema: z.ZodType<Prisma.ActivityMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
});

export const ActivitySumOrderByAggregateInputSchema: z.ZodType<Prisma.ActivitySumOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
});

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional(),
});

export const CourseCountOrderByAggregateInputSchema: z.ZodType<Prisma.CourseCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
});

export const CourseAvgOrderByAggregateInputSchema: z.ZodType<Prisma.CourseAvgOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
});

export const CourseMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CourseMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
});

export const CourseMinOrderByAggregateInputSchema: z.ZodType<Prisma.CourseMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
});

export const CourseSumOrderByAggregateInputSchema: z.ZodType<Prisma.CourseSumOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
});

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
});

export const AthleteListRelationFilterSchema: z.ZodType<Prisma.AthleteListRelationFilter> = z.strictObject({
  every: z.lazy(() => AthleteWhereInputSchema).optional(),
  some: z.lazy(() => AthleteWhereInputSchema).optional(),
  none: z.lazy(() => AthleteWhereInputSchema).optional(),
});

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.strictObject({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional(),
});

export const AthleteOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AthleteOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const ParentCountOrderByAggregateInputSchema: z.ZodType<Prisma.ParentCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  phone_number: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  tax_code: z.lazy(() => SortOrderSchema).optional(),
});

export const ParentAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ParentAvgOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
});

export const ParentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ParentMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  phone_number: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  tax_code: z.lazy(() => SortOrderSchema).optional(),
});

export const ParentMinOrderByAggregateInputSchema: z.ZodType<Prisma.ParentMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  phone_number: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  tax_code: z.lazy(() => SortOrderSchema).optional(),
});

export const ParentSumOrderByAggregateInputSchema: z.ZodType<Prisma.ParentSumOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
});

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
});

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.strictObject({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
});

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.strictObject({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
});

export const ParentNullableScalarRelationFilterSchema: z.ZodType<Prisma.ParentNullableScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => ParentWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => ParentWhereInputSchema).optional().nullable(),
});

export const AthleteCountOrderByAggregateInputSchema: z.ZodType<Prisma.AthleteCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  birthday: z.lazy(() => SortOrderSchema).optional(),
  birthplace: z.lazy(() => SortOrderSchema).optional(),
  tax_code: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  phone_number: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  parent_id: z.lazy(() => SortOrderSchema).optional(),
});

export const AthleteAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AthleteAvgOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  parent_id: z.lazy(() => SortOrderSchema).optional(),
});

export const AthleteMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AthleteMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  birthday: z.lazy(() => SortOrderSchema).optional(),
  birthplace: z.lazy(() => SortOrderSchema).optional(),
  tax_code: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  phone_number: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  parent_id: z.lazy(() => SortOrderSchema).optional(),
});

export const AthleteMinOrderByAggregateInputSchema: z.ZodType<Prisma.AthleteMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  birthday: z.lazy(() => SortOrderSchema).optional(),
  birthplace: z.lazy(() => SortOrderSchema).optional(),
  tax_code: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  phone_number: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  parent_id: z.lazy(() => SortOrderSchema).optional(),
});

export const AthleteSumOrderByAggregateInputSchema: z.ZodType<Prisma.AthleteSumOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  parent_id: z.lazy(() => SortOrderSchema).optional(),
});

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.strictObject({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
});

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.strictObject({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
});

export const FloatNullableFilterSchema: z.ZodType<Prisma.FloatNullableFilter> = z.strictObject({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
});

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.strictObject({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
});

export const AthleteScalarRelationFilterSchema: z.ZodType<Prisma.AthleteScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => AthleteWhereInputSchema).optional(),
  isNot: z.lazy(() => AthleteWhereInputSchema).optional(),
});

export const SeasonScalarRelationFilterSchema: z.ZodType<Prisma.SeasonScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => SeasonWhereInputSchema).optional(),
  isNot: z.lazy(() => SeasonWhereInputSchema).optional(),
});

export const ActivityScalarRelationFilterSchema: z.ZodType<Prisma.ActivityScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => ActivityWhereInputSchema).optional(),
  isNot: z.lazy(() => ActivityWhereInputSchema).optional(),
});

export const CourseScalarRelationFilterSchema: z.ZodType<Prisma.CourseScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => CourseWhereInputSchema).optional(),
  isNot: z.lazy(() => CourseWhereInputSchema).optional(),
});

export const EnrollmentAthlete_idSeason_idActivity_idCourse_idCompoundUniqueInputSchema: z.ZodType<Prisma.EnrollmentAthlete_idSeason_idActivity_idCourse_idCompoundUniqueInput> = z.strictObject({
  athlete_id: z.number(),
  season_id: z.number(),
  activity_id: z.number(),
  course_id: z.number(),
});

export const EnrollmentCountOrderByAggregateInputSchema: z.ZodType<Prisma.EnrollmentCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  athlete_id: z.lazy(() => SortOrderSchema).optional(),
  season_id: z.lazy(() => SortOrderSchema).optional(),
  activity_id: z.lazy(() => SortOrderSchema).optional(),
  course_id: z.lazy(() => SortOrderSchema).optional(),
  volley_account: z.lazy(() => SortOrderSchema).optional(),
  volley_balance: z.lazy(() => SortOrderSchema).optional(),
  volley_balance_secondary: z.lazy(() => SortOrderSchema).optional(),
  first_installment: z.lazy(() => SortOrderSchema).optional(),
  second_installment: z.lazy(() => SortOrderSchema).optional(),
  third_installment: z.lazy(() => SortOrderSchema).optional(),
  certificate_expiration_date: z.lazy(() => SortOrderSchema).optional(),
  certificate_download_url: z.lazy(() => SortOrderSchema).optional(),
});

export const EnrollmentAvgOrderByAggregateInputSchema: z.ZodType<Prisma.EnrollmentAvgOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  athlete_id: z.lazy(() => SortOrderSchema).optional(),
  season_id: z.lazy(() => SortOrderSchema).optional(),
  activity_id: z.lazy(() => SortOrderSchema).optional(),
  course_id: z.lazy(() => SortOrderSchema).optional(),
  volley_account: z.lazy(() => SortOrderSchema).optional(),
  volley_balance: z.lazy(() => SortOrderSchema).optional(),
  volley_balance_secondary: z.lazy(() => SortOrderSchema).optional(),
  first_installment: z.lazy(() => SortOrderSchema).optional(),
  second_installment: z.lazy(() => SortOrderSchema).optional(),
  third_installment: z.lazy(() => SortOrderSchema).optional(),
});

export const EnrollmentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.EnrollmentMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  athlete_id: z.lazy(() => SortOrderSchema).optional(),
  season_id: z.lazy(() => SortOrderSchema).optional(),
  activity_id: z.lazy(() => SortOrderSchema).optional(),
  course_id: z.lazy(() => SortOrderSchema).optional(),
  volley_account: z.lazy(() => SortOrderSchema).optional(),
  volley_balance: z.lazy(() => SortOrderSchema).optional(),
  volley_balance_secondary: z.lazy(() => SortOrderSchema).optional(),
  first_installment: z.lazy(() => SortOrderSchema).optional(),
  second_installment: z.lazy(() => SortOrderSchema).optional(),
  third_installment: z.lazy(() => SortOrderSchema).optional(),
  certificate_expiration_date: z.lazy(() => SortOrderSchema).optional(),
  certificate_download_url: z.lazy(() => SortOrderSchema).optional(),
});

export const EnrollmentMinOrderByAggregateInputSchema: z.ZodType<Prisma.EnrollmentMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  athlete_id: z.lazy(() => SortOrderSchema).optional(),
  season_id: z.lazy(() => SortOrderSchema).optional(),
  activity_id: z.lazy(() => SortOrderSchema).optional(),
  course_id: z.lazy(() => SortOrderSchema).optional(),
  volley_account: z.lazy(() => SortOrderSchema).optional(),
  volley_balance: z.lazy(() => SortOrderSchema).optional(),
  volley_balance_secondary: z.lazy(() => SortOrderSchema).optional(),
  first_installment: z.lazy(() => SortOrderSchema).optional(),
  second_installment: z.lazy(() => SortOrderSchema).optional(),
  third_installment: z.lazy(() => SortOrderSchema).optional(),
  certificate_expiration_date: z.lazy(() => SortOrderSchema).optional(),
  certificate_download_url: z.lazy(() => SortOrderSchema).optional(),
});

export const EnrollmentSumOrderByAggregateInputSchema: z.ZodType<Prisma.EnrollmentSumOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  athlete_id: z.lazy(() => SortOrderSchema).optional(),
  season_id: z.lazy(() => SortOrderSchema).optional(),
  activity_id: z.lazy(() => SortOrderSchema).optional(),
  course_id: z.lazy(() => SortOrderSchema).optional(),
  volley_account: z.lazy(() => SortOrderSchema).optional(),
  volley_balance: z.lazy(() => SortOrderSchema).optional(),
  volley_balance_secondary: z.lazy(() => SortOrderSchema).optional(),
  first_installment: z.lazy(() => SortOrderSchema).optional(),
  second_installment: z.lazy(() => SortOrderSchema).optional(),
  third_installment: z.lazy(() => SortOrderSchema).optional(),
});

export const FloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.FloatNullableWithAggregatesFilter> = z.strictObject({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
});

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.strictObject({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
});

export const EnrollmentCreateNestedManyWithoutSeasonInputSchema: z.ZodType<Prisma.EnrollmentCreateNestedManyWithoutSeasonInput> = z.strictObject({
  create: z.union([ z.lazy(() => EnrollmentCreateWithoutSeasonInputSchema), z.lazy(() => EnrollmentCreateWithoutSeasonInputSchema).array(), z.lazy(() => EnrollmentUncheckedCreateWithoutSeasonInputSchema), z.lazy(() => EnrollmentUncheckedCreateWithoutSeasonInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EnrollmentCreateOrConnectWithoutSeasonInputSchema), z.lazy(() => EnrollmentCreateOrConnectWithoutSeasonInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EnrollmentCreateManySeasonInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EnrollmentWhereUniqueInputSchema), z.lazy(() => EnrollmentWhereUniqueInputSchema).array() ]).optional(),
});

export const EnrollmentUncheckedCreateNestedManyWithoutSeasonInputSchema: z.ZodType<Prisma.EnrollmentUncheckedCreateNestedManyWithoutSeasonInput> = z.strictObject({
  create: z.union([ z.lazy(() => EnrollmentCreateWithoutSeasonInputSchema), z.lazy(() => EnrollmentCreateWithoutSeasonInputSchema).array(), z.lazy(() => EnrollmentUncheckedCreateWithoutSeasonInputSchema), z.lazy(() => EnrollmentUncheckedCreateWithoutSeasonInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EnrollmentCreateOrConnectWithoutSeasonInputSchema), z.lazy(() => EnrollmentCreateOrConnectWithoutSeasonInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EnrollmentCreateManySeasonInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EnrollmentWhereUniqueInputSchema), z.lazy(() => EnrollmentWhereUniqueInputSchema).array() ]).optional(),
});

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.strictObject({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
});

export const EnrollmentUpdateManyWithoutSeasonNestedInputSchema: z.ZodType<Prisma.EnrollmentUpdateManyWithoutSeasonNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => EnrollmentCreateWithoutSeasonInputSchema), z.lazy(() => EnrollmentCreateWithoutSeasonInputSchema).array(), z.lazy(() => EnrollmentUncheckedCreateWithoutSeasonInputSchema), z.lazy(() => EnrollmentUncheckedCreateWithoutSeasonInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EnrollmentCreateOrConnectWithoutSeasonInputSchema), z.lazy(() => EnrollmentCreateOrConnectWithoutSeasonInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EnrollmentUpsertWithWhereUniqueWithoutSeasonInputSchema), z.lazy(() => EnrollmentUpsertWithWhereUniqueWithoutSeasonInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EnrollmentCreateManySeasonInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EnrollmentWhereUniqueInputSchema), z.lazy(() => EnrollmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EnrollmentWhereUniqueInputSchema), z.lazy(() => EnrollmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EnrollmentWhereUniqueInputSchema), z.lazy(() => EnrollmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EnrollmentWhereUniqueInputSchema), z.lazy(() => EnrollmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EnrollmentUpdateWithWhereUniqueWithoutSeasonInputSchema), z.lazy(() => EnrollmentUpdateWithWhereUniqueWithoutSeasonInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EnrollmentUpdateManyWithWhereWithoutSeasonInputSchema), z.lazy(() => EnrollmentUpdateManyWithWhereWithoutSeasonInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EnrollmentScalarWhereInputSchema), z.lazy(() => EnrollmentScalarWhereInputSchema).array() ]).optional(),
});

export const EnrollmentUncheckedUpdateManyWithoutSeasonNestedInputSchema: z.ZodType<Prisma.EnrollmentUncheckedUpdateManyWithoutSeasonNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => EnrollmentCreateWithoutSeasonInputSchema), z.lazy(() => EnrollmentCreateWithoutSeasonInputSchema).array(), z.lazy(() => EnrollmentUncheckedCreateWithoutSeasonInputSchema), z.lazy(() => EnrollmentUncheckedCreateWithoutSeasonInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EnrollmentCreateOrConnectWithoutSeasonInputSchema), z.lazy(() => EnrollmentCreateOrConnectWithoutSeasonInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EnrollmentUpsertWithWhereUniqueWithoutSeasonInputSchema), z.lazy(() => EnrollmentUpsertWithWhereUniqueWithoutSeasonInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EnrollmentCreateManySeasonInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EnrollmentWhereUniqueInputSchema), z.lazy(() => EnrollmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EnrollmentWhereUniqueInputSchema), z.lazy(() => EnrollmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EnrollmentWhereUniqueInputSchema), z.lazy(() => EnrollmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EnrollmentWhereUniqueInputSchema), z.lazy(() => EnrollmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EnrollmentUpdateWithWhereUniqueWithoutSeasonInputSchema), z.lazy(() => EnrollmentUpdateWithWhereUniqueWithoutSeasonInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EnrollmentUpdateManyWithWhereWithoutSeasonInputSchema), z.lazy(() => EnrollmentUpdateManyWithWhereWithoutSeasonInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EnrollmentScalarWhereInputSchema), z.lazy(() => EnrollmentScalarWhereInputSchema).array() ]).optional(),
});

export const EnrollmentCreateNestedManyWithoutActivityInputSchema: z.ZodType<Prisma.EnrollmentCreateNestedManyWithoutActivityInput> = z.strictObject({
  create: z.union([ z.lazy(() => EnrollmentCreateWithoutActivityInputSchema), z.lazy(() => EnrollmentCreateWithoutActivityInputSchema).array(), z.lazy(() => EnrollmentUncheckedCreateWithoutActivityInputSchema), z.lazy(() => EnrollmentUncheckedCreateWithoutActivityInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EnrollmentCreateOrConnectWithoutActivityInputSchema), z.lazy(() => EnrollmentCreateOrConnectWithoutActivityInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EnrollmentCreateManyActivityInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EnrollmentWhereUniqueInputSchema), z.lazy(() => EnrollmentWhereUniqueInputSchema).array() ]).optional(),
});

export const EnrollmentUncheckedCreateNestedManyWithoutActivityInputSchema: z.ZodType<Prisma.EnrollmentUncheckedCreateNestedManyWithoutActivityInput> = z.strictObject({
  create: z.union([ z.lazy(() => EnrollmentCreateWithoutActivityInputSchema), z.lazy(() => EnrollmentCreateWithoutActivityInputSchema).array(), z.lazy(() => EnrollmentUncheckedCreateWithoutActivityInputSchema), z.lazy(() => EnrollmentUncheckedCreateWithoutActivityInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EnrollmentCreateOrConnectWithoutActivityInputSchema), z.lazy(() => EnrollmentCreateOrConnectWithoutActivityInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EnrollmentCreateManyActivityInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EnrollmentWhereUniqueInputSchema), z.lazy(() => EnrollmentWhereUniqueInputSchema).array() ]).optional(),
});

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.strictObject({
  set: z.string().optional(),
});

export const EnrollmentUpdateManyWithoutActivityNestedInputSchema: z.ZodType<Prisma.EnrollmentUpdateManyWithoutActivityNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => EnrollmentCreateWithoutActivityInputSchema), z.lazy(() => EnrollmentCreateWithoutActivityInputSchema).array(), z.lazy(() => EnrollmentUncheckedCreateWithoutActivityInputSchema), z.lazy(() => EnrollmentUncheckedCreateWithoutActivityInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EnrollmentCreateOrConnectWithoutActivityInputSchema), z.lazy(() => EnrollmentCreateOrConnectWithoutActivityInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EnrollmentUpsertWithWhereUniqueWithoutActivityInputSchema), z.lazy(() => EnrollmentUpsertWithWhereUniqueWithoutActivityInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EnrollmentCreateManyActivityInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EnrollmentWhereUniqueInputSchema), z.lazy(() => EnrollmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EnrollmentWhereUniqueInputSchema), z.lazy(() => EnrollmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EnrollmentWhereUniqueInputSchema), z.lazy(() => EnrollmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EnrollmentWhereUniqueInputSchema), z.lazy(() => EnrollmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EnrollmentUpdateWithWhereUniqueWithoutActivityInputSchema), z.lazy(() => EnrollmentUpdateWithWhereUniqueWithoutActivityInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EnrollmentUpdateManyWithWhereWithoutActivityInputSchema), z.lazy(() => EnrollmentUpdateManyWithWhereWithoutActivityInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EnrollmentScalarWhereInputSchema), z.lazy(() => EnrollmentScalarWhereInputSchema).array() ]).optional(),
});

export const EnrollmentUncheckedUpdateManyWithoutActivityNestedInputSchema: z.ZodType<Prisma.EnrollmentUncheckedUpdateManyWithoutActivityNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => EnrollmentCreateWithoutActivityInputSchema), z.lazy(() => EnrollmentCreateWithoutActivityInputSchema).array(), z.lazy(() => EnrollmentUncheckedCreateWithoutActivityInputSchema), z.lazy(() => EnrollmentUncheckedCreateWithoutActivityInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EnrollmentCreateOrConnectWithoutActivityInputSchema), z.lazy(() => EnrollmentCreateOrConnectWithoutActivityInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EnrollmentUpsertWithWhereUniqueWithoutActivityInputSchema), z.lazy(() => EnrollmentUpsertWithWhereUniqueWithoutActivityInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EnrollmentCreateManyActivityInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EnrollmentWhereUniqueInputSchema), z.lazy(() => EnrollmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EnrollmentWhereUniqueInputSchema), z.lazy(() => EnrollmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EnrollmentWhereUniqueInputSchema), z.lazy(() => EnrollmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EnrollmentWhereUniqueInputSchema), z.lazy(() => EnrollmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EnrollmentUpdateWithWhereUniqueWithoutActivityInputSchema), z.lazy(() => EnrollmentUpdateWithWhereUniqueWithoutActivityInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EnrollmentUpdateManyWithWhereWithoutActivityInputSchema), z.lazy(() => EnrollmentUpdateManyWithWhereWithoutActivityInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EnrollmentScalarWhereInputSchema), z.lazy(() => EnrollmentScalarWhereInputSchema).array() ]).optional(),
});

export const EnrollmentCreateNestedManyWithoutCourseInputSchema: z.ZodType<Prisma.EnrollmentCreateNestedManyWithoutCourseInput> = z.strictObject({
  create: z.union([ z.lazy(() => EnrollmentCreateWithoutCourseInputSchema), z.lazy(() => EnrollmentCreateWithoutCourseInputSchema).array(), z.lazy(() => EnrollmentUncheckedCreateWithoutCourseInputSchema), z.lazy(() => EnrollmentUncheckedCreateWithoutCourseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EnrollmentCreateOrConnectWithoutCourseInputSchema), z.lazy(() => EnrollmentCreateOrConnectWithoutCourseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EnrollmentCreateManyCourseInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EnrollmentWhereUniqueInputSchema), z.lazy(() => EnrollmentWhereUniqueInputSchema).array() ]).optional(),
});

export const EnrollmentUncheckedCreateNestedManyWithoutCourseInputSchema: z.ZodType<Prisma.EnrollmentUncheckedCreateNestedManyWithoutCourseInput> = z.strictObject({
  create: z.union([ z.lazy(() => EnrollmentCreateWithoutCourseInputSchema), z.lazy(() => EnrollmentCreateWithoutCourseInputSchema).array(), z.lazy(() => EnrollmentUncheckedCreateWithoutCourseInputSchema), z.lazy(() => EnrollmentUncheckedCreateWithoutCourseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EnrollmentCreateOrConnectWithoutCourseInputSchema), z.lazy(() => EnrollmentCreateOrConnectWithoutCourseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EnrollmentCreateManyCourseInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EnrollmentWhereUniqueInputSchema), z.lazy(() => EnrollmentWhereUniqueInputSchema).array() ]).optional(),
});

export const EnrollmentUpdateManyWithoutCourseNestedInputSchema: z.ZodType<Prisma.EnrollmentUpdateManyWithoutCourseNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => EnrollmentCreateWithoutCourseInputSchema), z.lazy(() => EnrollmentCreateWithoutCourseInputSchema).array(), z.lazy(() => EnrollmentUncheckedCreateWithoutCourseInputSchema), z.lazy(() => EnrollmentUncheckedCreateWithoutCourseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EnrollmentCreateOrConnectWithoutCourseInputSchema), z.lazy(() => EnrollmentCreateOrConnectWithoutCourseInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EnrollmentUpsertWithWhereUniqueWithoutCourseInputSchema), z.lazy(() => EnrollmentUpsertWithWhereUniqueWithoutCourseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EnrollmentCreateManyCourseInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EnrollmentWhereUniqueInputSchema), z.lazy(() => EnrollmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EnrollmentWhereUniqueInputSchema), z.lazy(() => EnrollmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EnrollmentWhereUniqueInputSchema), z.lazy(() => EnrollmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EnrollmentWhereUniqueInputSchema), z.lazy(() => EnrollmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EnrollmentUpdateWithWhereUniqueWithoutCourseInputSchema), z.lazy(() => EnrollmentUpdateWithWhereUniqueWithoutCourseInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EnrollmentUpdateManyWithWhereWithoutCourseInputSchema), z.lazy(() => EnrollmentUpdateManyWithWhereWithoutCourseInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EnrollmentScalarWhereInputSchema), z.lazy(() => EnrollmentScalarWhereInputSchema).array() ]).optional(),
});

export const EnrollmentUncheckedUpdateManyWithoutCourseNestedInputSchema: z.ZodType<Prisma.EnrollmentUncheckedUpdateManyWithoutCourseNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => EnrollmentCreateWithoutCourseInputSchema), z.lazy(() => EnrollmentCreateWithoutCourseInputSchema).array(), z.lazy(() => EnrollmentUncheckedCreateWithoutCourseInputSchema), z.lazy(() => EnrollmentUncheckedCreateWithoutCourseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EnrollmentCreateOrConnectWithoutCourseInputSchema), z.lazy(() => EnrollmentCreateOrConnectWithoutCourseInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EnrollmentUpsertWithWhereUniqueWithoutCourseInputSchema), z.lazy(() => EnrollmentUpsertWithWhereUniqueWithoutCourseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EnrollmentCreateManyCourseInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EnrollmentWhereUniqueInputSchema), z.lazy(() => EnrollmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EnrollmentWhereUniqueInputSchema), z.lazy(() => EnrollmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EnrollmentWhereUniqueInputSchema), z.lazy(() => EnrollmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EnrollmentWhereUniqueInputSchema), z.lazy(() => EnrollmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EnrollmentUpdateWithWhereUniqueWithoutCourseInputSchema), z.lazy(() => EnrollmentUpdateWithWhereUniqueWithoutCourseInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EnrollmentUpdateManyWithWhereWithoutCourseInputSchema), z.lazy(() => EnrollmentUpdateManyWithWhereWithoutCourseInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EnrollmentScalarWhereInputSchema), z.lazy(() => EnrollmentScalarWhereInputSchema).array() ]).optional(),
});

export const AthleteCreateNestedManyWithoutParentInputSchema: z.ZodType<Prisma.AthleteCreateNestedManyWithoutParentInput> = z.strictObject({
  create: z.union([ z.lazy(() => AthleteCreateWithoutParentInputSchema), z.lazy(() => AthleteCreateWithoutParentInputSchema).array(), z.lazy(() => AthleteUncheckedCreateWithoutParentInputSchema), z.lazy(() => AthleteUncheckedCreateWithoutParentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AthleteCreateOrConnectWithoutParentInputSchema), z.lazy(() => AthleteCreateOrConnectWithoutParentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AthleteCreateManyParentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AthleteWhereUniqueInputSchema), z.lazy(() => AthleteWhereUniqueInputSchema).array() ]).optional(),
});

export const AthleteUncheckedCreateNestedManyWithoutParentInputSchema: z.ZodType<Prisma.AthleteUncheckedCreateNestedManyWithoutParentInput> = z.strictObject({
  create: z.union([ z.lazy(() => AthleteCreateWithoutParentInputSchema), z.lazy(() => AthleteCreateWithoutParentInputSchema).array(), z.lazy(() => AthleteUncheckedCreateWithoutParentInputSchema), z.lazy(() => AthleteUncheckedCreateWithoutParentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AthleteCreateOrConnectWithoutParentInputSchema), z.lazy(() => AthleteCreateOrConnectWithoutParentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AthleteCreateManyParentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AthleteWhereUniqueInputSchema), z.lazy(() => AthleteWhereUniqueInputSchema).array() ]).optional(),
});

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.strictObject({
  set: z.string().optional().nullable(),
});

export const AthleteUpdateManyWithoutParentNestedInputSchema: z.ZodType<Prisma.AthleteUpdateManyWithoutParentNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => AthleteCreateWithoutParentInputSchema), z.lazy(() => AthleteCreateWithoutParentInputSchema).array(), z.lazy(() => AthleteUncheckedCreateWithoutParentInputSchema), z.lazy(() => AthleteUncheckedCreateWithoutParentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AthleteCreateOrConnectWithoutParentInputSchema), z.lazy(() => AthleteCreateOrConnectWithoutParentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AthleteUpsertWithWhereUniqueWithoutParentInputSchema), z.lazy(() => AthleteUpsertWithWhereUniqueWithoutParentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AthleteCreateManyParentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AthleteWhereUniqueInputSchema), z.lazy(() => AthleteWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AthleteWhereUniqueInputSchema), z.lazy(() => AthleteWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AthleteWhereUniqueInputSchema), z.lazy(() => AthleteWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AthleteWhereUniqueInputSchema), z.lazy(() => AthleteWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AthleteUpdateWithWhereUniqueWithoutParentInputSchema), z.lazy(() => AthleteUpdateWithWhereUniqueWithoutParentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AthleteUpdateManyWithWhereWithoutParentInputSchema), z.lazy(() => AthleteUpdateManyWithWhereWithoutParentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AthleteScalarWhereInputSchema), z.lazy(() => AthleteScalarWhereInputSchema).array() ]).optional(),
});

export const AthleteUncheckedUpdateManyWithoutParentNestedInputSchema: z.ZodType<Prisma.AthleteUncheckedUpdateManyWithoutParentNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => AthleteCreateWithoutParentInputSchema), z.lazy(() => AthleteCreateWithoutParentInputSchema).array(), z.lazy(() => AthleteUncheckedCreateWithoutParentInputSchema), z.lazy(() => AthleteUncheckedCreateWithoutParentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AthleteCreateOrConnectWithoutParentInputSchema), z.lazy(() => AthleteCreateOrConnectWithoutParentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AthleteUpsertWithWhereUniqueWithoutParentInputSchema), z.lazy(() => AthleteUpsertWithWhereUniqueWithoutParentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AthleteCreateManyParentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AthleteWhereUniqueInputSchema), z.lazy(() => AthleteWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AthleteWhereUniqueInputSchema), z.lazy(() => AthleteWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AthleteWhereUniqueInputSchema), z.lazy(() => AthleteWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AthleteWhereUniqueInputSchema), z.lazy(() => AthleteWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AthleteUpdateWithWhereUniqueWithoutParentInputSchema), z.lazy(() => AthleteUpdateWithWhereUniqueWithoutParentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AthleteUpdateManyWithWhereWithoutParentInputSchema), z.lazy(() => AthleteUpdateManyWithWhereWithoutParentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AthleteScalarWhereInputSchema), z.lazy(() => AthleteScalarWhereInputSchema).array() ]).optional(),
});

export const ParentCreateNestedOneWithoutAthletesInputSchema: z.ZodType<Prisma.ParentCreateNestedOneWithoutAthletesInput> = z.strictObject({
  create: z.union([ z.lazy(() => ParentCreateWithoutAthletesInputSchema), z.lazy(() => ParentUncheckedCreateWithoutAthletesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ParentCreateOrConnectWithoutAthletesInputSchema).optional(),
  connect: z.lazy(() => ParentWhereUniqueInputSchema).optional(),
});

export const EnrollmentCreateNestedManyWithoutAthleteInputSchema: z.ZodType<Prisma.EnrollmentCreateNestedManyWithoutAthleteInput> = z.strictObject({
  create: z.union([ z.lazy(() => EnrollmentCreateWithoutAthleteInputSchema), z.lazy(() => EnrollmentCreateWithoutAthleteInputSchema).array(), z.lazy(() => EnrollmentUncheckedCreateWithoutAthleteInputSchema), z.lazy(() => EnrollmentUncheckedCreateWithoutAthleteInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EnrollmentCreateOrConnectWithoutAthleteInputSchema), z.lazy(() => EnrollmentCreateOrConnectWithoutAthleteInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EnrollmentCreateManyAthleteInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EnrollmentWhereUniqueInputSchema), z.lazy(() => EnrollmentWhereUniqueInputSchema).array() ]).optional(),
});

export const EnrollmentUncheckedCreateNestedManyWithoutAthleteInputSchema: z.ZodType<Prisma.EnrollmentUncheckedCreateNestedManyWithoutAthleteInput> = z.strictObject({
  create: z.union([ z.lazy(() => EnrollmentCreateWithoutAthleteInputSchema), z.lazy(() => EnrollmentCreateWithoutAthleteInputSchema).array(), z.lazy(() => EnrollmentUncheckedCreateWithoutAthleteInputSchema), z.lazy(() => EnrollmentUncheckedCreateWithoutAthleteInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EnrollmentCreateOrConnectWithoutAthleteInputSchema), z.lazy(() => EnrollmentCreateOrConnectWithoutAthleteInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EnrollmentCreateManyAthleteInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EnrollmentWhereUniqueInputSchema), z.lazy(() => EnrollmentWhereUniqueInputSchema).array() ]).optional(),
});

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.strictObject({
  set: z.coerce.date().optional(),
});

export const ParentUpdateOneWithoutAthletesNestedInputSchema: z.ZodType<Prisma.ParentUpdateOneWithoutAthletesNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ParentCreateWithoutAthletesInputSchema), z.lazy(() => ParentUncheckedCreateWithoutAthletesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ParentCreateOrConnectWithoutAthletesInputSchema).optional(),
  upsert: z.lazy(() => ParentUpsertWithoutAthletesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ParentWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ParentWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ParentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ParentUpdateToOneWithWhereWithoutAthletesInputSchema), z.lazy(() => ParentUpdateWithoutAthletesInputSchema), z.lazy(() => ParentUncheckedUpdateWithoutAthletesInputSchema) ]).optional(),
});

export const EnrollmentUpdateManyWithoutAthleteNestedInputSchema: z.ZodType<Prisma.EnrollmentUpdateManyWithoutAthleteNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => EnrollmentCreateWithoutAthleteInputSchema), z.lazy(() => EnrollmentCreateWithoutAthleteInputSchema).array(), z.lazy(() => EnrollmentUncheckedCreateWithoutAthleteInputSchema), z.lazy(() => EnrollmentUncheckedCreateWithoutAthleteInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EnrollmentCreateOrConnectWithoutAthleteInputSchema), z.lazy(() => EnrollmentCreateOrConnectWithoutAthleteInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EnrollmentUpsertWithWhereUniqueWithoutAthleteInputSchema), z.lazy(() => EnrollmentUpsertWithWhereUniqueWithoutAthleteInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EnrollmentCreateManyAthleteInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EnrollmentWhereUniqueInputSchema), z.lazy(() => EnrollmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EnrollmentWhereUniqueInputSchema), z.lazy(() => EnrollmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EnrollmentWhereUniqueInputSchema), z.lazy(() => EnrollmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EnrollmentWhereUniqueInputSchema), z.lazy(() => EnrollmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EnrollmentUpdateWithWhereUniqueWithoutAthleteInputSchema), z.lazy(() => EnrollmentUpdateWithWhereUniqueWithoutAthleteInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EnrollmentUpdateManyWithWhereWithoutAthleteInputSchema), z.lazy(() => EnrollmentUpdateManyWithWhereWithoutAthleteInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EnrollmentScalarWhereInputSchema), z.lazy(() => EnrollmentScalarWhereInputSchema).array() ]).optional(),
});

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.strictObject({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
});

export const EnrollmentUncheckedUpdateManyWithoutAthleteNestedInputSchema: z.ZodType<Prisma.EnrollmentUncheckedUpdateManyWithoutAthleteNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => EnrollmentCreateWithoutAthleteInputSchema), z.lazy(() => EnrollmentCreateWithoutAthleteInputSchema).array(), z.lazy(() => EnrollmentUncheckedCreateWithoutAthleteInputSchema), z.lazy(() => EnrollmentUncheckedCreateWithoutAthleteInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EnrollmentCreateOrConnectWithoutAthleteInputSchema), z.lazy(() => EnrollmentCreateOrConnectWithoutAthleteInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EnrollmentUpsertWithWhereUniqueWithoutAthleteInputSchema), z.lazy(() => EnrollmentUpsertWithWhereUniqueWithoutAthleteInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EnrollmentCreateManyAthleteInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EnrollmentWhereUniqueInputSchema), z.lazy(() => EnrollmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EnrollmentWhereUniqueInputSchema), z.lazy(() => EnrollmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EnrollmentWhereUniqueInputSchema), z.lazy(() => EnrollmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EnrollmentWhereUniqueInputSchema), z.lazy(() => EnrollmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EnrollmentUpdateWithWhereUniqueWithoutAthleteInputSchema), z.lazy(() => EnrollmentUpdateWithWhereUniqueWithoutAthleteInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EnrollmentUpdateManyWithWhereWithoutAthleteInputSchema), z.lazy(() => EnrollmentUpdateManyWithWhereWithoutAthleteInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EnrollmentScalarWhereInputSchema), z.lazy(() => EnrollmentScalarWhereInputSchema).array() ]).optional(),
});

export const AthleteCreateNestedOneWithoutEnrollmentsInputSchema: z.ZodType<Prisma.AthleteCreateNestedOneWithoutEnrollmentsInput> = z.strictObject({
  create: z.union([ z.lazy(() => AthleteCreateWithoutEnrollmentsInputSchema), z.lazy(() => AthleteUncheckedCreateWithoutEnrollmentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AthleteCreateOrConnectWithoutEnrollmentsInputSchema).optional(),
  connect: z.lazy(() => AthleteWhereUniqueInputSchema).optional(),
});

export const SeasonCreateNestedOneWithoutEnrollmentsInputSchema: z.ZodType<Prisma.SeasonCreateNestedOneWithoutEnrollmentsInput> = z.strictObject({
  create: z.union([ z.lazy(() => SeasonCreateWithoutEnrollmentsInputSchema), z.lazy(() => SeasonUncheckedCreateWithoutEnrollmentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SeasonCreateOrConnectWithoutEnrollmentsInputSchema).optional(),
  connect: z.lazy(() => SeasonWhereUniqueInputSchema).optional(),
});

export const ActivityCreateNestedOneWithoutEnrollmentsInputSchema: z.ZodType<Prisma.ActivityCreateNestedOneWithoutEnrollmentsInput> = z.strictObject({
  create: z.union([ z.lazy(() => ActivityCreateWithoutEnrollmentsInputSchema), z.lazy(() => ActivityUncheckedCreateWithoutEnrollmentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ActivityCreateOrConnectWithoutEnrollmentsInputSchema).optional(),
  connect: z.lazy(() => ActivityWhereUniqueInputSchema).optional(),
});

export const CourseCreateNestedOneWithoutEnrollmentsInputSchema: z.ZodType<Prisma.CourseCreateNestedOneWithoutEnrollmentsInput> = z.strictObject({
  create: z.union([ z.lazy(() => CourseCreateWithoutEnrollmentsInputSchema), z.lazy(() => CourseUncheckedCreateWithoutEnrollmentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CourseCreateOrConnectWithoutEnrollmentsInputSchema).optional(),
  connect: z.lazy(() => CourseWhereUniqueInputSchema).optional(),
});

export const NullableFloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableFloatFieldUpdateOperationsInput> = z.strictObject({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
});

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.strictObject({
  set: z.coerce.date().optional().nullable(),
});

export const AthleteUpdateOneRequiredWithoutEnrollmentsNestedInputSchema: z.ZodType<Prisma.AthleteUpdateOneRequiredWithoutEnrollmentsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => AthleteCreateWithoutEnrollmentsInputSchema), z.lazy(() => AthleteUncheckedCreateWithoutEnrollmentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AthleteCreateOrConnectWithoutEnrollmentsInputSchema).optional(),
  upsert: z.lazy(() => AthleteUpsertWithoutEnrollmentsInputSchema).optional(),
  connect: z.lazy(() => AthleteWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AthleteUpdateToOneWithWhereWithoutEnrollmentsInputSchema), z.lazy(() => AthleteUpdateWithoutEnrollmentsInputSchema), z.lazy(() => AthleteUncheckedUpdateWithoutEnrollmentsInputSchema) ]).optional(),
});

export const SeasonUpdateOneRequiredWithoutEnrollmentsNestedInputSchema: z.ZodType<Prisma.SeasonUpdateOneRequiredWithoutEnrollmentsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => SeasonCreateWithoutEnrollmentsInputSchema), z.lazy(() => SeasonUncheckedCreateWithoutEnrollmentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SeasonCreateOrConnectWithoutEnrollmentsInputSchema).optional(),
  upsert: z.lazy(() => SeasonUpsertWithoutEnrollmentsInputSchema).optional(),
  connect: z.lazy(() => SeasonWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SeasonUpdateToOneWithWhereWithoutEnrollmentsInputSchema), z.lazy(() => SeasonUpdateWithoutEnrollmentsInputSchema), z.lazy(() => SeasonUncheckedUpdateWithoutEnrollmentsInputSchema) ]).optional(),
});

export const ActivityUpdateOneRequiredWithoutEnrollmentsNestedInputSchema: z.ZodType<Prisma.ActivityUpdateOneRequiredWithoutEnrollmentsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => ActivityCreateWithoutEnrollmentsInputSchema), z.lazy(() => ActivityUncheckedCreateWithoutEnrollmentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ActivityCreateOrConnectWithoutEnrollmentsInputSchema).optional(),
  upsert: z.lazy(() => ActivityUpsertWithoutEnrollmentsInputSchema).optional(),
  connect: z.lazy(() => ActivityWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ActivityUpdateToOneWithWhereWithoutEnrollmentsInputSchema), z.lazy(() => ActivityUpdateWithoutEnrollmentsInputSchema), z.lazy(() => ActivityUncheckedUpdateWithoutEnrollmentsInputSchema) ]).optional(),
});

export const CourseUpdateOneRequiredWithoutEnrollmentsNestedInputSchema: z.ZodType<Prisma.CourseUpdateOneRequiredWithoutEnrollmentsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => CourseCreateWithoutEnrollmentsInputSchema), z.lazy(() => CourseUncheckedCreateWithoutEnrollmentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CourseCreateOrConnectWithoutEnrollmentsInputSchema).optional(),
  upsert: z.lazy(() => CourseUpsertWithoutEnrollmentsInputSchema).optional(),
  connect: z.lazy(() => CourseWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CourseUpdateToOneWithWhereWithoutEnrollmentsInputSchema), z.lazy(() => CourseUpdateWithoutEnrollmentsInputSchema), z.lazy(() => CourseUncheckedUpdateWithoutEnrollmentsInputSchema) ]).optional(),
});

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
});

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional(),
});

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
});

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
});

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional(),
});

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
});

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
});

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.strictObject({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
});

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.strictObject({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
});

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.strictObject({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
});

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.strictObject({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
});

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.strictObject({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
});

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.strictObject({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
});

export const NestedFloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatNullableWithAggregatesFilter> = z.strictObject({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
});

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.strictObject({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
});

export const EnrollmentCreateWithoutSeasonInputSchema: z.ZodType<Prisma.EnrollmentCreateWithoutSeasonInput> = z.strictObject({
  volley_account: z.number().optional().nullable(),
  volley_balance: z.number().optional().nullable(),
  volley_balance_secondary: z.number().optional().nullable(),
  first_installment: z.number().optional().nullable(),
  second_installment: z.number().optional().nullable(),
  third_installment: z.number().optional().nullable(),
  certificate_expiration_date: z.coerce.date().optional().nullable(),
  certificate_download_url: z.string().optional().nullable(),
  athlete: z.lazy(() => AthleteCreateNestedOneWithoutEnrollmentsInputSchema),
  activity: z.lazy(() => ActivityCreateNestedOneWithoutEnrollmentsInputSchema),
  course: z.lazy(() => CourseCreateNestedOneWithoutEnrollmentsInputSchema),
});

export const EnrollmentUncheckedCreateWithoutSeasonInputSchema: z.ZodType<Prisma.EnrollmentUncheckedCreateWithoutSeasonInput> = z.strictObject({
  id: z.number().optional(),
  athlete_id: z.number(),
  activity_id: z.number(),
  course_id: z.number(),
  volley_account: z.number().optional().nullable(),
  volley_balance: z.number().optional().nullable(),
  volley_balance_secondary: z.number().optional().nullable(),
  first_installment: z.number().optional().nullable(),
  second_installment: z.number().optional().nullable(),
  third_installment: z.number().optional().nullable(),
  certificate_expiration_date: z.coerce.date().optional().nullable(),
  certificate_download_url: z.string().optional().nullable(),
});

export const EnrollmentCreateOrConnectWithoutSeasonInputSchema: z.ZodType<Prisma.EnrollmentCreateOrConnectWithoutSeasonInput> = z.strictObject({
  where: z.lazy(() => EnrollmentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EnrollmentCreateWithoutSeasonInputSchema), z.lazy(() => EnrollmentUncheckedCreateWithoutSeasonInputSchema) ]),
});

export const EnrollmentCreateManySeasonInputEnvelopeSchema: z.ZodType<Prisma.EnrollmentCreateManySeasonInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => EnrollmentCreateManySeasonInputSchema), z.lazy(() => EnrollmentCreateManySeasonInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const EnrollmentUpsertWithWhereUniqueWithoutSeasonInputSchema: z.ZodType<Prisma.EnrollmentUpsertWithWhereUniqueWithoutSeasonInput> = z.strictObject({
  where: z.lazy(() => EnrollmentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => EnrollmentUpdateWithoutSeasonInputSchema), z.lazy(() => EnrollmentUncheckedUpdateWithoutSeasonInputSchema) ]),
  create: z.union([ z.lazy(() => EnrollmentCreateWithoutSeasonInputSchema), z.lazy(() => EnrollmentUncheckedCreateWithoutSeasonInputSchema) ]),
});

export const EnrollmentUpdateWithWhereUniqueWithoutSeasonInputSchema: z.ZodType<Prisma.EnrollmentUpdateWithWhereUniqueWithoutSeasonInput> = z.strictObject({
  where: z.lazy(() => EnrollmentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => EnrollmentUpdateWithoutSeasonInputSchema), z.lazy(() => EnrollmentUncheckedUpdateWithoutSeasonInputSchema) ]),
});

export const EnrollmentUpdateManyWithWhereWithoutSeasonInputSchema: z.ZodType<Prisma.EnrollmentUpdateManyWithWhereWithoutSeasonInput> = z.strictObject({
  where: z.lazy(() => EnrollmentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => EnrollmentUpdateManyMutationInputSchema), z.lazy(() => EnrollmentUncheckedUpdateManyWithoutSeasonInputSchema) ]),
});

export const EnrollmentScalarWhereInputSchema: z.ZodType<Prisma.EnrollmentScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => EnrollmentScalarWhereInputSchema), z.lazy(() => EnrollmentScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EnrollmentScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EnrollmentScalarWhereInputSchema), z.lazy(() => EnrollmentScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  athlete_id: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  season_id: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  activity_id: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  course_id: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  volley_account: z.union([ z.lazy(() => FloatNullableFilterSchema), z.number() ]).optional().nullable(),
  volley_balance: z.union([ z.lazy(() => FloatNullableFilterSchema), z.number() ]).optional().nullable(),
  volley_balance_secondary: z.union([ z.lazy(() => FloatNullableFilterSchema), z.number() ]).optional().nullable(),
  first_installment: z.union([ z.lazy(() => FloatNullableFilterSchema), z.number() ]).optional().nullable(),
  second_installment: z.union([ z.lazy(() => FloatNullableFilterSchema), z.number() ]).optional().nullable(),
  third_installment: z.union([ z.lazy(() => FloatNullableFilterSchema), z.number() ]).optional().nullable(),
  certificate_expiration_date: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  certificate_download_url: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
});

export const EnrollmentCreateWithoutActivityInputSchema: z.ZodType<Prisma.EnrollmentCreateWithoutActivityInput> = z.strictObject({
  volley_account: z.number().optional().nullable(),
  volley_balance: z.number().optional().nullable(),
  volley_balance_secondary: z.number().optional().nullable(),
  first_installment: z.number().optional().nullable(),
  second_installment: z.number().optional().nullable(),
  third_installment: z.number().optional().nullable(),
  certificate_expiration_date: z.coerce.date().optional().nullable(),
  certificate_download_url: z.string().optional().nullable(),
  athlete: z.lazy(() => AthleteCreateNestedOneWithoutEnrollmentsInputSchema),
  season: z.lazy(() => SeasonCreateNestedOneWithoutEnrollmentsInputSchema),
  course: z.lazy(() => CourseCreateNestedOneWithoutEnrollmentsInputSchema),
});

export const EnrollmentUncheckedCreateWithoutActivityInputSchema: z.ZodType<Prisma.EnrollmentUncheckedCreateWithoutActivityInput> = z.strictObject({
  id: z.number().optional(),
  athlete_id: z.number(),
  season_id: z.number(),
  course_id: z.number(),
  volley_account: z.number().optional().nullable(),
  volley_balance: z.number().optional().nullable(),
  volley_balance_secondary: z.number().optional().nullable(),
  first_installment: z.number().optional().nullable(),
  second_installment: z.number().optional().nullable(),
  third_installment: z.number().optional().nullable(),
  certificate_expiration_date: z.coerce.date().optional().nullable(),
  certificate_download_url: z.string().optional().nullable(),
});

export const EnrollmentCreateOrConnectWithoutActivityInputSchema: z.ZodType<Prisma.EnrollmentCreateOrConnectWithoutActivityInput> = z.strictObject({
  where: z.lazy(() => EnrollmentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EnrollmentCreateWithoutActivityInputSchema), z.lazy(() => EnrollmentUncheckedCreateWithoutActivityInputSchema) ]),
});

export const EnrollmentCreateManyActivityInputEnvelopeSchema: z.ZodType<Prisma.EnrollmentCreateManyActivityInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => EnrollmentCreateManyActivityInputSchema), z.lazy(() => EnrollmentCreateManyActivityInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const EnrollmentUpsertWithWhereUniqueWithoutActivityInputSchema: z.ZodType<Prisma.EnrollmentUpsertWithWhereUniqueWithoutActivityInput> = z.strictObject({
  where: z.lazy(() => EnrollmentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => EnrollmentUpdateWithoutActivityInputSchema), z.lazy(() => EnrollmentUncheckedUpdateWithoutActivityInputSchema) ]),
  create: z.union([ z.lazy(() => EnrollmentCreateWithoutActivityInputSchema), z.lazy(() => EnrollmentUncheckedCreateWithoutActivityInputSchema) ]),
});

export const EnrollmentUpdateWithWhereUniqueWithoutActivityInputSchema: z.ZodType<Prisma.EnrollmentUpdateWithWhereUniqueWithoutActivityInput> = z.strictObject({
  where: z.lazy(() => EnrollmentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => EnrollmentUpdateWithoutActivityInputSchema), z.lazy(() => EnrollmentUncheckedUpdateWithoutActivityInputSchema) ]),
});

export const EnrollmentUpdateManyWithWhereWithoutActivityInputSchema: z.ZodType<Prisma.EnrollmentUpdateManyWithWhereWithoutActivityInput> = z.strictObject({
  where: z.lazy(() => EnrollmentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => EnrollmentUpdateManyMutationInputSchema), z.lazy(() => EnrollmentUncheckedUpdateManyWithoutActivityInputSchema) ]),
});

export const EnrollmentCreateWithoutCourseInputSchema: z.ZodType<Prisma.EnrollmentCreateWithoutCourseInput> = z.strictObject({
  volley_account: z.number().optional().nullable(),
  volley_balance: z.number().optional().nullable(),
  volley_balance_secondary: z.number().optional().nullable(),
  first_installment: z.number().optional().nullable(),
  second_installment: z.number().optional().nullable(),
  third_installment: z.number().optional().nullable(),
  certificate_expiration_date: z.coerce.date().optional().nullable(),
  certificate_download_url: z.string().optional().nullable(),
  athlete: z.lazy(() => AthleteCreateNestedOneWithoutEnrollmentsInputSchema),
  season: z.lazy(() => SeasonCreateNestedOneWithoutEnrollmentsInputSchema),
  activity: z.lazy(() => ActivityCreateNestedOneWithoutEnrollmentsInputSchema),
});

export const EnrollmentUncheckedCreateWithoutCourseInputSchema: z.ZodType<Prisma.EnrollmentUncheckedCreateWithoutCourseInput> = z.strictObject({
  id: z.number().optional(),
  athlete_id: z.number(),
  season_id: z.number(),
  activity_id: z.number(),
  volley_account: z.number().optional().nullable(),
  volley_balance: z.number().optional().nullable(),
  volley_balance_secondary: z.number().optional().nullable(),
  first_installment: z.number().optional().nullable(),
  second_installment: z.number().optional().nullable(),
  third_installment: z.number().optional().nullable(),
  certificate_expiration_date: z.coerce.date().optional().nullable(),
  certificate_download_url: z.string().optional().nullable(),
});

export const EnrollmentCreateOrConnectWithoutCourseInputSchema: z.ZodType<Prisma.EnrollmentCreateOrConnectWithoutCourseInput> = z.strictObject({
  where: z.lazy(() => EnrollmentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EnrollmentCreateWithoutCourseInputSchema), z.lazy(() => EnrollmentUncheckedCreateWithoutCourseInputSchema) ]),
});

export const EnrollmentCreateManyCourseInputEnvelopeSchema: z.ZodType<Prisma.EnrollmentCreateManyCourseInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => EnrollmentCreateManyCourseInputSchema), z.lazy(() => EnrollmentCreateManyCourseInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const EnrollmentUpsertWithWhereUniqueWithoutCourseInputSchema: z.ZodType<Prisma.EnrollmentUpsertWithWhereUniqueWithoutCourseInput> = z.strictObject({
  where: z.lazy(() => EnrollmentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => EnrollmentUpdateWithoutCourseInputSchema), z.lazy(() => EnrollmentUncheckedUpdateWithoutCourseInputSchema) ]),
  create: z.union([ z.lazy(() => EnrollmentCreateWithoutCourseInputSchema), z.lazy(() => EnrollmentUncheckedCreateWithoutCourseInputSchema) ]),
});

export const EnrollmentUpdateWithWhereUniqueWithoutCourseInputSchema: z.ZodType<Prisma.EnrollmentUpdateWithWhereUniqueWithoutCourseInput> = z.strictObject({
  where: z.lazy(() => EnrollmentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => EnrollmentUpdateWithoutCourseInputSchema), z.lazy(() => EnrollmentUncheckedUpdateWithoutCourseInputSchema) ]),
});

export const EnrollmentUpdateManyWithWhereWithoutCourseInputSchema: z.ZodType<Prisma.EnrollmentUpdateManyWithWhereWithoutCourseInput> = z.strictObject({
  where: z.lazy(() => EnrollmentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => EnrollmentUpdateManyMutationInputSchema), z.lazy(() => EnrollmentUncheckedUpdateManyWithoutCourseInputSchema) ]),
});

export const AthleteCreateWithoutParentInputSchema: z.ZodType<Prisma.AthleteCreateWithoutParentInput> = z.strictObject({
  name: z.string(),
  birthday: z.coerce.date(),
  birthplace: z.string(),
  tax_code: z.string(),
  city: z.string(),
  address: z.string(),
  phone_number: z.string(),
  email: z.string().optional().nullable(),
  enrollments: z.lazy(() => EnrollmentCreateNestedManyWithoutAthleteInputSchema).optional(),
});

export const AthleteUncheckedCreateWithoutParentInputSchema: z.ZodType<Prisma.AthleteUncheckedCreateWithoutParentInput> = z.strictObject({
  id: z.number().optional(),
  name: z.string(),
  birthday: z.coerce.date(),
  birthplace: z.string(),
  tax_code: z.string(),
  city: z.string(),
  address: z.string(),
  phone_number: z.string(),
  email: z.string().optional().nullable(),
  enrollments: z.lazy(() => EnrollmentUncheckedCreateNestedManyWithoutAthleteInputSchema).optional(),
});

export const AthleteCreateOrConnectWithoutParentInputSchema: z.ZodType<Prisma.AthleteCreateOrConnectWithoutParentInput> = z.strictObject({
  where: z.lazy(() => AthleteWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AthleteCreateWithoutParentInputSchema), z.lazy(() => AthleteUncheckedCreateWithoutParentInputSchema) ]),
});

export const AthleteCreateManyParentInputEnvelopeSchema: z.ZodType<Prisma.AthleteCreateManyParentInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => AthleteCreateManyParentInputSchema), z.lazy(() => AthleteCreateManyParentInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const AthleteUpsertWithWhereUniqueWithoutParentInputSchema: z.ZodType<Prisma.AthleteUpsertWithWhereUniqueWithoutParentInput> = z.strictObject({
  where: z.lazy(() => AthleteWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AthleteUpdateWithoutParentInputSchema), z.lazy(() => AthleteUncheckedUpdateWithoutParentInputSchema) ]),
  create: z.union([ z.lazy(() => AthleteCreateWithoutParentInputSchema), z.lazy(() => AthleteUncheckedCreateWithoutParentInputSchema) ]),
});

export const AthleteUpdateWithWhereUniqueWithoutParentInputSchema: z.ZodType<Prisma.AthleteUpdateWithWhereUniqueWithoutParentInput> = z.strictObject({
  where: z.lazy(() => AthleteWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AthleteUpdateWithoutParentInputSchema), z.lazy(() => AthleteUncheckedUpdateWithoutParentInputSchema) ]),
});

export const AthleteUpdateManyWithWhereWithoutParentInputSchema: z.ZodType<Prisma.AthleteUpdateManyWithWhereWithoutParentInput> = z.strictObject({
  where: z.lazy(() => AthleteScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AthleteUpdateManyMutationInputSchema), z.lazy(() => AthleteUncheckedUpdateManyWithoutParentInputSchema) ]),
});

export const AthleteScalarWhereInputSchema: z.ZodType<Prisma.AthleteScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => AthleteScalarWhereInputSchema), z.lazy(() => AthleteScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AthleteScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AthleteScalarWhereInputSchema), z.lazy(() => AthleteScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema), z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  birthday: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  birthplace: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  tax_code: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  city: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  address: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  phone_number: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  parent_id: z.union([ z.lazy(() => IntNullableFilterSchema), z.number() ]).optional().nullable(),
});

export const ParentCreateWithoutAthletesInputSchema: z.ZodType<Prisma.ParentCreateWithoutAthletesInput> = z.strictObject({
  name: z.string(),
  phone_number: z.string(),
  email: z.string().optional().nullable(),
  tax_code: z.string(),
});

export const ParentUncheckedCreateWithoutAthletesInputSchema: z.ZodType<Prisma.ParentUncheckedCreateWithoutAthletesInput> = z.strictObject({
  id: z.number().optional(),
  name: z.string(),
  phone_number: z.string(),
  email: z.string().optional().nullable(),
  tax_code: z.string(),
});

export const ParentCreateOrConnectWithoutAthletesInputSchema: z.ZodType<Prisma.ParentCreateOrConnectWithoutAthletesInput> = z.strictObject({
  where: z.lazy(() => ParentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ParentCreateWithoutAthletesInputSchema), z.lazy(() => ParentUncheckedCreateWithoutAthletesInputSchema) ]),
});

export const EnrollmentCreateWithoutAthleteInputSchema: z.ZodType<Prisma.EnrollmentCreateWithoutAthleteInput> = z.strictObject({
  volley_account: z.number().optional().nullable(),
  volley_balance: z.number().optional().nullable(),
  volley_balance_secondary: z.number().optional().nullable(),
  first_installment: z.number().optional().nullable(),
  second_installment: z.number().optional().nullable(),
  third_installment: z.number().optional().nullable(),
  certificate_expiration_date: z.coerce.date().optional().nullable(),
  certificate_download_url: z.string().optional().nullable(),
  season: z.lazy(() => SeasonCreateNestedOneWithoutEnrollmentsInputSchema),
  activity: z.lazy(() => ActivityCreateNestedOneWithoutEnrollmentsInputSchema),
  course: z.lazy(() => CourseCreateNestedOneWithoutEnrollmentsInputSchema),
});

export const EnrollmentUncheckedCreateWithoutAthleteInputSchema: z.ZodType<Prisma.EnrollmentUncheckedCreateWithoutAthleteInput> = z.strictObject({
  id: z.number().optional(),
  season_id: z.number(),
  activity_id: z.number(),
  course_id: z.number(),
  volley_account: z.number().optional().nullable(),
  volley_balance: z.number().optional().nullable(),
  volley_balance_secondary: z.number().optional().nullable(),
  first_installment: z.number().optional().nullable(),
  second_installment: z.number().optional().nullable(),
  third_installment: z.number().optional().nullable(),
  certificate_expiration_date: z.coerce.date().optional().nullable(),
  certificate_download_url: z.string().optional().nullable(),
});

export const EnrollmentCreateOrConnectWithoutAthleteInputSchema: z.ZodType<Prisma.EnrollmentCreateOrConnectWithoutAthleteInput> = z.strictObject({
  where: z.lazy(() => EnrollmentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EnrollmentCreateWithoutAthleteInputSchema), z.lazy(() => EnrollmentUncheckedCreateWithoutAthleteInputSchema) ]),
});

export const EnrollmentCreateManyAthleteInputEnvelopeSchema: z.ZodType<Prisma.EnrollmentCreateManyAthleteInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => EnrollmentCreateManyAthleteInputSchema), z.lazy(() => EnrollmentCreateManyAthleteInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const ParentUpsertWithoutAthletesInputSchema: z.ZodType<Prisma.ParentUpsertWithoutAthletesInput> = z.strictObject({
  update: z.union([ z.lazy(() => ParentUpdateWithoutAthletesInputSchema), z.lazy(() => ParentUncheckedUpdateWithoutAthletesInputSchema) ]),
  create: z.union([ z.lazy(() => ParentCreateWithoutAthletesInputSchema), z.lazy(() => ParentUncheckedCreateWithoutAthletesInputSchema) ]),
  where: z.lazy(() => ParentWhereInputSchema).optional(),
});

export const ParentUpdateToOneWithWhereWithoutAthletesInputSchema: z.ZodType<Prisma.ParentUpdateToOneWithWhereWithoutAthletesInput> = z.strictObject({
  where: z.lazy(() => ParentWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ParentUpdateWithoutAthletesInputSchema), z.lazy(() => ParentUncheckedUpdateWithoutAthletesInputSchema) ]),
});

export const ParentUpdateWithoutAthletesInputSchema: z.ZodType<Prisma.ParentUpdateWithoutAthletesInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tax_code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ParentUncheckedUpdateWithoutAthletesInputSchema: z.ZodType<Prisma.ParentUncheckedUpdateWithoutAthletesInput> = z.strictObject({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tax_code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const EnrollmentUpsertWithWhereUniqueWithoutAthleteInputSchema: z.ZodType<Prisma.EnrollmentUpsertWithWhereUniqueWithoutAthleteInput> = z.strictObject({
  where: z.lazy(() => EnrollmentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => EnrollmentUpdateWithoutAthleteInputSchema), z.lazy(() => EnrollmentUncheckedUpdateWithoutAthleteInputSchema) ]),
  create: z.union([ z.lazy(() => EnrollmentCreateWithoutAthleteInputSchema), z.lazy(() => EnrollmentUncheckedCreateWithoutAthleteInputSchema) ]),
});

export const EnrollmentUpdateWithWhereUniqueWithoutAthleteInputSchema: z.ZodType<Prisma.EnrollmentUpdateWithWhereUniqueWithoutAthleteInput> = z.strictObject({
  where: z.lazy(() => EnrollmentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => EnrollmentUpdateWithoutAthleteInputSchema), z.lazy(() => EnrollmentUncheckedUpdateWithoutAthleteInputSchema) ]),
});

export const EnrollmentUpdateManyWithWhereWithoutAthleteInputSchema: z.ZodType<Prisma.EnrollmentUpdateManyWithWhereWithoutAthleteInput> = z.strictObject({
  where: z.lazy(() => EnrollmentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => EnrollmentUpdateManyMutationInputSchema), z.lazy(() => EnrollmentUncheckedUpdateManyWithoutAthleteInputSchema) ]),
});

export const AthleteCreateWithoutEnrollmentsInputSchema: z.ZodType<Prisma.AthleteCreateWithoutEnrollmentsInput> = z.strictObject({
  name: z.string(),
  birthday: z.coerce.date(),
  birthplace: z.string(),
  tax_code: z.string(),
  city: z.string(),
  address: z.string(),
  phone_number: z.string(),
  email: z.string().optional().nullable(),
  parent: z.lazy(() => ParentCreateNestedOneWithoutAthletesInputSchema).optional(),
});

export const AthleteUncheckedCreateWithoutEnrollmentsInputSchema: z.ZodType<Prisma.AthleteUncheckedCreateWithoutEnrollmentsInput> = z.strictObject({
  id: z.number().optional(),
  name: z.string(),
  birthday: z.coerce.date(),
  birthplace: z.string(),
  tax_code: z.string(),
  city: z.string(),
  address: z.string(),
  phone_number: z.string(),
  email: z.string().optional().nullable(),
  parent_id: z.number().optional().nullable(),
});

export const AthleteCreateOrConnectWithoutEnrollmentsInputSchema: z.ZodType<Prisma.AthleteCreateOrConnectWithoutEnrollmentsInput> = z.strictObject({
  where: z.lazy(() => AthleteWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AthleteCreateWithoutEnrollmentsInputSchema), z.lazy(() => AthleteUncheckedCreateWithoutEnrollmentsInputSchema) ]),
});

export const SeasonCreateWithoutEnrollmentsInputSchema: z.ZodType<Prisma.SeasonCreateWithoutEnrollmentsInput> = z.strictObject({
  starter_year: z.number(),
  end_year: z.number(),
});

export const SeasonUncheckedCreateWithoutEnrollmentsInputSchema: z.ZodType<Prisma.SeasonUncheckedCreateWithoutEnrollmentsInput> = z.strictObject({
  id: z.number().optional(),
  starter_year: z.number(),
  end_year: z.number(),
});

export const SeasonCreateOrConnectWithoutEnrollmentsInputSchema: z.ZodType<Prisma.SeasonCreateOrConnectWithoutEnrollmentsInput> = z.strictObject({
  where: z.lazy(() => SeasonWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SeasonCreateWithoutEnrollmentsInputSchema), z.lazy(() => SeasonUncheckedCreateWithoutEnrollmentsInputSchema) ]),
});

export const ActivityCreateWithoutEnrollmentsInputSchema: z.ZodType<Prisma.ActivityCreateWithoutEnrollmentsInput> = z.strictObject({
  name: z.string(),
});

export const ActivityUncheckedCreateWithoutEnrollmentsInputSchema: z.ZodType<Prisma.ActivityUncheckedCreateWithoutEnrollmentsInput> = z.strictObject({
  id: z.number().optional(),
  name: z.string(),
});

export const ActivityCreateOrConnectWithoutEnrollmentsInputSchema: z.ZodType<Prisma.ActivityCreateOrConnectWithoutEnrollmentsInput> = z.strictObject({
  where: z.lazy(() => ActivityWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ActivityCreateWithoutEnrollmentsInputSchema), z.lazy(() => ActivityUncheckedCreateWithoutEnrollmentsInputSchema) ]),
});

export const CourseCreateWithoutEnrollmentsInputSchema: z.ZodType<Prisma.CourseCreateWithoutEnrollmentsInput> = z.strictObject({
  name: z.string(),
});

export const CourseUncheckedCreateWithoutEnrollmentsInputSchema: z.ZodType<Prisma.CourseUncheckedCreateWithoutEnrollmentsInput> = z.strictObject({
  id: z.number().optional(),
  name: z.string(),
});

export const CourseCreateOrConnectWithoutEnrollmentsInputSchema: z.ZodType<Prisma.CourseCreateOrConnectWithoutEnrollmentsInput> = z.strictObject({
  where: z.lazy(() => CourseWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CourseCreateWithoutEnrollmentsInputSchema), z.lazy(() => CourseUncheckedCreateWithoutEnrollmentsInputSchema) ]),
});

export const AthleteUpsertWithoutEnrollmentsInputSchema: z.ZodType<Prisma.AthleteUpsertWithoutEnrollmentsInput> = z.strictObject({
  update: z.union([ z.lazy(() => AthleteUpdateWithoutEnrollmentsInputSchema), z.lazy(() => AthleteUncheckedUpdateWithoutEnrollmentsInputSchema) ]),
  create: z.union([ z.lazy(() => AthleteCreateWithoutEnrollmentsInputSchema), z.lazy(() => AthleteUncheckedCreateWithoutEnrollmentsInputSchema) ]),
  where: z.lazy(() => AthleteWhereInputSchema).optional(),
});

export const AthleteUpdateToOneWithWhereWithoutEnrollmentsInputSchema: z.ZodType<Prisma.AthleteUpdateToOneWithWhereWithoutEnrollmentsInput> = z.strictObject({
  where: z.lazy(() => AthleteWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AthleteUpdateWithoutEnrollmentsInputSchema), z.lazy(() => AthleteUncheckedUpdateWithoutEnrollmentsInputSchema) ]),
});

export const AthleteUpdateWithoutEnrollmentsInputSchema: z.ZodType<Prisma.AthleteUpdateWithoutEnrollmentsInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthday: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  birthplace: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tax_code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parent: z.lazy(() => ParentUpdateOneWithoutAthletesNestedInputSchema).optional(),
});

export const AthleteUncheckedUpdateWithoutEnrollmentsInputSchema: z.ZodType<Prisma.AthleteUncheckedUpdateWithoutEnrollmentsInput> = z.strictObject({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthday: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  birthplace: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tax_code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parent_id: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const SeasonUpsertWithoutEnrollmentsInputSchema: z.ZodType<Prisma.SeasonUpsertWithoutEnrollmentsInput> = z.strictObject({
  update: z.union([ z.lazy(() => SeasonUpdateWithoutEnrollmentsInputSchema), z.lazy(() => SeasonUncheckedUpdateWithoutEnrollmentsInputSchema) ]),
  create: z.union([ z.lazy(() => SeasonCreateWithoutEnrollmentsInputSchema), z.lazy(() => SeasonUncheckedCreateWithoutEnrollmentsInputSchema) ]),
  where: z.lazy(() => SeasonWhereInputSchema).optional(),
});

export const SeasonUpdateToOneWithWhereWithoutEnrollmentsInputSchema: z.ZodType<Prisma.SeasonUpdateToOneWithWhereWithoutEnrollmentsInput> = z.strictObject({
  where: z.lazy(() => SeasonWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => SeasonUpdateWithoutEnrollmentsInputSchema), z.lazy(() => SeasonUncheckedUpdateWithoutEnrollmentsInputSchema) ]),
});

export const SeasonUpdateWithoutEnrollmentsInputSchema: z.ZodType<Prisma.SeasonUpdateWithoutEnrollmentsInput> = z.strictObject({
  starter_year: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  end_year: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
});

export const SeasonUncheckedUpdateWithoutEnrollmentsInputSchema: z.ZodType<Prisma.SeasonUncheckedUpdateWithoutEnrollmentsInput> = z.strictObject({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  starter_year: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  end_year: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ActivityUpsertWithoutEnrollmentsInputSchema: z.ZodType<Prisma.ActivityUpsertWithoutEnrollmentsInput> = z.strictObject({
  update: z.union([ z.lazy(() => ActivityUpdateWithoutEnrollmentsInputSchema), z.lazy(() => ActivityUncheckedUpdateWithoutEnrollmentsInputSchema) ]),
  create: z.union([ z.lazy(() => ActivityCreateWithoutEnrollmentsInputSchema), z.lazy(() => ActivityUncheckedCreateWithoutEnrollmentsInputSchema) ]),
  where: z.lazy(() => ActivityWhereInputSchema).optional(),
});

export const ActivityUpdateToOneWithWhereWithoutEnrollmentsInputSchema: z.ZodType<Prisma.ActivityUpdateToOneWithWhereWithoutEnrollmentsInput> = z.strictObject({
  where: z.lazy(() => ActivityWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ActivityUpdateWithoutEnrollmentsInputSchema), z.lazy(() => ActivityUncheckedUpdateWithoutEnrollmentsInputSchema) ]),
});

export const ActivityUpdateWithoutEnrollmentsInputSchema: z.ZodType<Prisma.ActivityUpdateWithoutEnrollmentsInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const ActivityUncheckedUpdateWithoutEnrollmentsInputSchema: z.ZodType<Prisma.ActivityUncheckedUpdateWithoutEnrollmentsInput> = z.strictObject({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const CourseUpsertWithoutEnrollmentsInputSchema: z.ZodType<Prisma.CourseUpsertWithoutEnrollmentsInput> = z.strictObject({
  update: z.union([ z.lazy(() => CourseUpdateWithoutEnrollmentsInputSchema), z.lazy(() => CourseUncheckedUpdateWithoutEnrollmentsInputSchema) ]),
  create: z.union([ z.lazy(() => CourseCreateWithoutEnrollmentsInputSchema), z.lazy(() => CourseUncheckedCreateWithoutEnrollmentsInputSchema) ]),
  where: z.lazy(() => CourseWhereInputSchema).optional(),
});

export const CourseUpdateToOneWithWhereWithoutEnrollmentsInputSchema: z.ZodType<Prisma.CourseUpdateToOneWithWhereWithoutEnrollmentsInput> = z.strictObject({
  where: z.lazy(() => CourseWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CourseUpdateWithoutEnrollmentsInputSchema), z.lazy(() => CourseUncheckedUpdateWithoutEnrollmentsInputSchema) ]),
});

export const CourseUpdateWithoutEnrollmentsInputSchema: z.ZodType<Prisma.CourseUpdateWithoutEnrollmentsInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const CourseUncheckedUpdateWithoutEnrollmentsInputSchema: z.ZodType<Prisma.CourseUncheckedUpdateWithoutEnrollmentsInput> = z.strictObject({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const EnrollmentCreateManySeasonInputSchema: z.ZodType<Prisma.EnrollmentCreateManySeasonInput> = z.strictObject({
  id: z.number().optional(),
  athlete_id: z.number(),
  activity_id: z.number(),
  course_id: z.number(),
  volley_account: z.number().optional().nullable(),
  volley_balance: z.number().optional().nullable(),
  volley_balance_secondary: z.number().optional().nullable(),
  first_installment: z.number().optional().nullable(),
  second_installment: z.number().optional().nullable(),
  third_installment: z.number().optional().nullable(),
  certificate_expiration_date: z.coerce.date().optional().nullable(),
  certificate_download_url: z.string().optional().nullable(),
});

export const EnrollmentUpdateWithoutSeasonInputSchema: z.ZodType<Prisma.EnrollmentUpdateWithoutSeasonInput> = z.strictObject({
  volley_account: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  volley_balance: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  volley_balance_secondary: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_installment: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  second_installment: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  third_installment: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  certificate_expiration_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  certificate_download_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  athlete: z.lazy(() => AthleteUpdateOneRequiredWithoutEnrollmentsNestedInputSchema).optional(),
  activity: z.lazy(() => ActivityUpdateOneRequiredWithoutEnrollmentsNestedInputSchema).optional(),
  course: z.lazy(() => CourseUpdateOneRequiredWithoutEnrollmentsNestedInputSchema).optional(),
});

export const EnrollmentUncheckedUpdateWithoutSeasonInputSchema: z.ZodType<Prisma.EnrollmentUncheckedUpdateWithoutSeasonInput> = z.strictObject({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  athlete_id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  activity_id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  course_id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  volley_account: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  volley_balance: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  volley_balance_secondary: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_installment: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  second_installment: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  third_installment: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  certificate_expiration_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  certificate_download_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const EnrollmentUncheckedUpdateManyWithoutSeasonInputSchema: z.ZodType<Prisma.EnrollmentUncheckedUpdateManyWithoutSeasonInput> = z.strictObject({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  athlete_id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  activity_id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  course_id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  volley_account: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  volley_balance: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  volley_balance_secondary: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_installment: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  second_installment: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  third_installment: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  certificate_expiration_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  certificate_download_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const EnrollmentCreateManyActivityInputSchema: z.ZodType<Prisma.EnrollmentCreateManyActivityInput> = z.strictObject({
  id: z.number().optional(),
  athlete_id: z.number(),
  season_id: z.number(),
  course_id: z.number(),
  volley_account: z.number().optional().nullable(),
  volley_balance: z.number().optional().nullable(),
  volley_balance_secondary: z.number().optional().nullable(),
  first_installment: z.number().optional().nullable(),
  second_installment: z.number().optional().nullable(),
  third_installment: z.number().optional().nullable(),
  certificate_expiration_date: z.coerce.date().optional().nullable(),
  certificate_download_url: z.string().optional().nullable(),
});

export const EnrollmentUpdateWithoutActivityInputSchema: z.ZodType<Prisma.EnrollmentUpdateWithoutActivityInput> = z.strictObject({
  volley_account: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  volley_balance: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  volley_balance_secondary: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_installment: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  second_installment: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  third_installment: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  certificate_expiration_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  certificate_download_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  athlete: z.lazy(() => AthleteUpdateOneRequiredWithoutEnrollmentsNestedInputSchema).optional(),
  season: z.lazy(() => SeasonUpdateOneRequiredWithoutEnrollmentsNestedInputSchema).optional(),
  course: z.lazy(() => CourseUpdateOneRequiredWithoutEnrollmentsNestedInputSchema).optional(),
});

export const EnrollmentUncheckedUpdateWithoutActivityInputSchema: z.ZodType<Prisma.EnrollmentUncheckedUpdateWithoutActivityInput> = z.strictObject({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  athlete_id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  season_id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  course_id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  volley_account: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  volley_balance: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  volley_balance_secondary: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_installment: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  second_installment: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  third_installment: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  certificate_expiration_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  certificate_download_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const EnrollmentUncheckedUpdateManyWithoutActivityInputSchema: z.ZodType<Prisma.EnrollmentUncheckedUpdateManyWithoutActivityInput> = z.strictObject({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  athlete_id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  season_id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  course_id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  volley_account: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  volley_balance: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  volley_balance_secondary: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_installment: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  second_installment: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  third_installment: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  certificate_expiration_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  certificate_download_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const EnrollmentCreateManyCourseInputSchema: z.ZodType<Prisma.EnrollmentCreateManyCourseInput> = z.strictObject({
  id: z.number().optional(),
  athlete_id: z.number(),
  season_id: z.number(),
  activity_id: z.number(),
  volley_account: z.number().optional().nullable(),
  volley_balance: z.number().optional().nullable(),
  volley_balance_secondary: z.number().optional().nullable(),
  first_installment: z.number().optional().nullable(),
  second_installment: z.number().optional().nullable(),
  third_installment: z.number().optional().nullable(),
  certificate_expiration_date: z.coerce.date().optional().nullable(),
  certificate_download_url: z.string().optional().nullable(),
});

export const EnrollmentUpdateWithoutCourseInputSchema: z.ZodType<Prisma.EnrollmentUpdateWithoutCourseInput> = z.strictObject({
  volley_account: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  volley_balance: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  volley_balance_secondary: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_installment: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  second_installment: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  third_installment: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  certificate_expiration_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  certificate_download_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  athlete: z.lazy(() => AthleteUpdateOneRequiredWithoutEnrollmentsNestedInputSchema).optional(),
  season: z.lazy(() => SeasonUpdateOneRequiredWithoutEnrollmentsNestedInputSchema).optional(),
  activity: z.lazy(() => ActivityUpdateOneRequiredWithoutEnrollmentsNestedInputSchema).optional(),
});

export const EnrollmentUncheckedUpdateWithoutCourseInputSchema: z.ZodType<Prisma.EnrollmentUncheckedUpdateWithoutCourseInput> = z.strictObject({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  athlete_id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  season_id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  activity_id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  volley_account: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  volley_balance: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  volley_balance_secondary: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_installment: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  second_installment: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  third_installment: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  certificate_expiration_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  certificate_download_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const EnrollmentUncheckedUpdateManyWithoutCourseInputSchema: z.ZodType<Prisma.EnrollmentUncheckedUpdateManyWithoutCourseInput> = z.strictObject({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  athlete_id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  season_id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  activity_id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  volley_account: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  volley_balance: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  volley_balance_secondary: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_installment: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  second_installment: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  third_installment: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  certificate_expiration_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  certificate_download_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const AthleteCreateManyParentInputSchema: z.ZodType<Prisma.AthleteCreateManyParentInput> = z.strictObject({
  id: z.number().optional(),
  name: z.string(),
  birthday: z.coerce.date(),
  birthplace: z.string(),
  tax_code: z.string(),
  city: z.string(),
  address: z.string(),
  phone_number: z.string(),
  email: z.string().optional().nullable(),
});

export const AthleteUpdateWithoutParentInputSchema: z.ZodType<Prisma.AthleteUpdateWithoutParentInput> = z.strictObject({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthday: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  birthplace: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tax_code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  enrollments: z.lazy(() => EnrollmentUpdateManyWithoutAthleteNestedInputSchema).optional(),
});

export const AthleteUncheckedUpdateWithoutParentInputSchema: z.ZodType<Prisma.AthleteUncheckedUpdateWithoutParentInput> = z.strictObject({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthday: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  birthplace: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tax_code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  enrollments: z.lazy(() => EnrollmentUncheckedUpdateManyWithoutAthleteNestedInputSchema).optional(),
});

export const AthleteUncheckedUpdateManyWithoutParentInputSchema: z.ZodType<Prisma.AthleteUncheckedUpdateManyWithoutParentInput> = z.strictObject({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthday: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  birthplace: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tax_code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone_number: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const EnrollmentCreateManyAthleteInputSchema: z.ZodType<Prisma.EnrollmentCreateManyAthleteInput> = z.strictObject({
  id: z.number().optional(),
  season_id: z.number(),
  activity_id: z.number(),
  course_id: z.number(),
  volley_account: z.number().optional().nullable(),
  volley_balance: z.number().optional().nullable(),
  volley_balance_secondary: z.number().optional().nullable(),
  first_installment: z.number().optional().nullable(),
  second_installment: z.number().optional().nullable(),
  third_installment: z.number().optional().nullable(),
  certificate_expiration_date: z.coerce.date().optional().nullable(),
  certificate_download_url: z.string().optional().nullable(),
});

export const EnrollmentUpdateWithoutAthleteInputSchema: z.ZodType<Prisma.EnrollmentUpdateWithoutAthleteInput> = z.strictObject({
  volley_account: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  volley_balance: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  volley_balance_secondary: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_installment: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  second_installment: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  third_installment: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  certificate_expiration_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  certificate_download_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  season: z.lazy(() => SeasonUpdateOneRequiredWithoutEnrollmentsNestedInputSchema).optional(),
  activity: z.lazy(() => ActivityUpdateOneRequiredWithoutEnrollmentsNestedInputSchema).optional(),
  course: z.lazy(() => CourseUpdateOneRequiredWithoutEnrollmentsNestedInputSchema).optional(),
});

export const EnrollmentUncheckedUpdateWithoutAthleteInputSchema: z.ZodType<Prisma.EnrollmentUncheckedUpdateWithoutAthleteInput> = z.strictObject({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  season_id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  activity_id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  course_id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  volley_account: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  volley_balance: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  volley_balance_secondary: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_installment: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  second_installment: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  third_installment: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  certificate_expiration_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  certificate_download_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

export const EnrollmentUncheckedUpdateManyWithoutAthleteInputSchema: z.ZodType<Prisma.EnrollmentUncheckedUpdateManyWithoutAthleteInput> = z.strictObject({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  season_id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  activity_id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  course_id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  volley_account: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  volley_balance: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  volley_balance_secondary: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  first_installment: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  second_installment: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  third_installment: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  certificate_expiration_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  certificate_download_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
});

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const SeasonFindFirstArgsSchema: z.ZodType<Prisma.SeasonFindFirstArgs> = z.object({
  select: SeasonSelectSchema.optional(),
  include: SeasonIncludeSchema.optional(),
  where: SeasonWhereInputSchema.optional(), 
  orderBy: z.union([ SeasonOrderByWithRelationInputSchema.array(), SeasonOrderByWithRelationInputSchema ]).optional(),
  cursor: SeasonWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SeasonScalarFieldEnumSchema, SeasonScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const SeasonFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SeasonFindFirstOrThrowArgs> = z.object({
  select: SeasonSelectSchema.optional(),
  include: SeasonIncludeSchema.optional(),
  where: SeasonWhereInputSchema.optional(), 
  orderBy: z.union([ SeasonOrderByWithRelationInputSchema.array(), SeasonOrderByWithRelationInputSchema ]).optional(),
  cursor: SeasonWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SeasonScalarFieldEnumSchema, SeasonScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const SeasonFindManyArgsSchema: z.ZodType<Prisma.SeasonFindManyArgs> = z.object({
  select: SeasonSelectSchema.optional(),
  include: SeasonIncludeSchema.optional(),
  where: SeasonWhereInputSchema.optional(), 
  orderBy: z.union([ SeasonOrderByWithRelationInputSchema.array(), SeasonOrderByWithRelationInputSchema ]).optional(),
  cursor: SeasonWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SeasonScalarFieldEnumSchema, SeasonScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const SeasonAggregateArgsSchema: z.ZodType<Prisma.SeasonAggregateArgs> = z.object({
  where: SeasonWhereInputSchema.optional(), 
  orderBy: z.union([ SeasonOrderByWithRelationInputSchema.array(), SeasonOrderByWithRelationInputSchema ]).optional(),
  cursor: SeasonWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const SeasonGroupByArgsSchema: z.ZodType<Prisma.SeasonGroupByArgs> = z.object({
  where: SeasonWhereInputSchema.optional(), 
  orderBy: z.union([ SeasonOrderByWithAggregationInputSchema.array(), SeasonOrderByWithAggregationInputSchema ]).optional(),
  by: SeasonScalarFieldEnumSchema.array(), 
  having: SeasonScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const SeasonFindUniqueArgsSchema: z.ZodType<Prisma.SeasonFindUniqueArgs> = z.object({
  select: SeasonSelectSchema.optional(),
  include: SeasonIncludeSchema.optional(),
  where: SeasonWhereUniqueInputSchema, 
}).strict();

export const SeasonFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SeasonFindUniqueOrThrowArgs> = z.object({
  select: SeasonSelectSchema.optional(),
  include: SeasonIncludeSchema.optional(),
  where: SeasonWhereUniqueInputSchema, 
}).strict();

export const ActivityFindFirstArgsSchema: z.ZodType<Prisma.ActivityFindFirstArgs> = z.object({
  select: ActivitySelectSchema.optional(),
  include: ActivityIncludeSchema.optional(),
  where: ActivityWhereInputSchema.optional(), 
  orderBy: z.union([ ActivityOrderByWithRelationInputSchema.array(), ActivityOrderByWithRelationInputSchema ]).optional(),
  cursor: ActivityWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ActivityScalarFieldEnumSchema, ActivityScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const ActivityFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ActivityFindFirstOrThrowArgs> = z.object({
  select: ActivitySelectSchema.optional(),
  include: ActivityIncludeSchema.optional(),
  where: ActivityWhereInputSchema.optional(), 
  orderBy: z.union([ ActivityOrderByWithRelationInputSchema.array(), ActivityOrderByWithRelationInputSchema ]).optional(),
  cursor: ActivityWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ActivityScalarFieldEnumSchema, ActivityScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const ActivityFindManyArgsSchema: z.ZodType<Prisma.ActivityFindManyArgs> = z.object({
  select: ActivitySelectSchema.optional(),
  include: ActivityIncludeSchema.optional(),
  where: ActivityWhereInputSchema.optional(), 
  orderBy: z.union([ ActivityOrderByWithRelationInputSchema.array(), ActivityOrderByWithRelationInputSchema ]).optional(),
  cursor: ActivityWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ActivityScalarFieldEnumSchema, ActivityScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const ActivityAggregateArgsSchema: z.ZodType<Prisma.ActivityAggregateArgs> = z.object({
  where: ActivityWhereInputSchema.optional(), 
  orderBy: z.union([ ActivityOrderByWithRelationInputSchema.array(), ActivityOrderByWithRelationInputSchema ]).optional(),
  cursor: ActivityWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const ActivityGroupByArgsSchema: z.ZodType<Prisma.ActivityGroupByArgs> = z.object({
  where: ActivityWhereInputSchema.optional(), 
  orderBy: z.union([ ActivityOrderByWithAggregationInputSchema.array(), ActivityOrderByWithAggregationInputSchema ]).optional(),
  by: ActivityScalarFieldEnumSchema.array(), 
  having: ActivityScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const ActivityFindUniqueArgsSchema: z.ZodType<Prisma.ActivityFindUniqueArgs> = z.object({
  select: ActivitySelectSchema.optional(),
  include: ActivityIncludeSchema.optional(),
  where: ActivityWhereUniqueInputSchema, 
}).strict();

export const ActivityFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ActivityFindUniqueOrThrowArgs> = z.object({
  select: ActivitySelectSchema.optional(),
  include: ActivityIncludeSchema.optional(),
  where: ActivityWhereUniqueInputSchema, 
}).strict();

export const CourseFindFirstArgsSchema: z.ZodType<Prisma.CourseFindFirstArgs> = z.object({
  select: CourseSelectSchema.optional(),
  include: CourseIncludeSchema.optional(),
  where: CourseWhereInputSchema.optional(), 
  orderBy: z.union([ CourseOrderByWithRelationInputSchema.array(), CourseOrderByWithRelationInputSchema ]).optional(),
  cursor: CourseWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CourseScalarFieldEnumSchema, CourseScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const CourseFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CourseFindFirstOrThrowArgs> = z.object({
  select: CourseSelectSchema.optional(),
  include: CourseIncludeSchema.optional(),
  where: CourseWhereInputSchema.optional(), 
  orderBy: z.union([ CourseOrderByWithRelationInputSchema.array(), CourseOrderByWithRelationInputSchema ]).optional(),
  cursor: CourseWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CourseScalarFieldEnumSchema, CourseScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const CourseFindManyArgsSchema: z.ZodType<Prisma.CourseFindManyArgs> = z.object({
  select: CourseSelectSchema.optional(),
  include: CourseIncludeSchema.optional(),
  where: CourseWhereInputSchema.optional(), 
  orderBy: z.union([ CourseOrderByWithRelationInputSchema.array(), CourseOrderByWithRelationInputSchema ]).optional(),
  cursor: CourseWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CourseScalarFieldEnumSchema, CourseScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const CourseAggregateArgsSchema: z.ZodType<Prisma.CourseAggregateArgs> = z.object({
  where: CourseWhereInputSchema.optional(), 
  orderBy: z.union([ CourseOrderByWithRelationInputSchema.array(), CourseOrderByWithRelationInputSchema ]).optional(),
  cursor: CourseWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const CourseGroupByArgsSchema: z.ZodType<Prisma.CourseGroupByArgs> = z.object({
  where: CourseWhereInputSchema.optional(), 
  orderBy: z.union([ CourseOrderByWithAggregationInputSchema.array(), CourseOrderByWithAggregationInputSchema ]).optional(),
  by: CourseScalarFieldEnumSchema.array(), 
  having: CourseScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const CourseFindUniqueArgsSchema: z.ZodType<Prisma.CourseFindUniqueArgs> = z.object({
  select: CourseSelectSchema.optional(),
  include: CourseIncludeSchema.optional(),
  where: CourseWhereUniqueInputSchema, 
}).strict();

export const CourseFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CourseFindUniqueOrThrowArgs> = z.object({
  select: CourseSelectSchema.optional(),
  include: CourseIncludeSchema.optional(),
  where: CourseWhereUniqueInputSchema, 
}).strict();

export const ParentFindFirstArgsSchema: z.ZodType<Prisma.ParentFindFirstArgs> = z.object({
  select: ParentSelectSchema.optional(),
  include: ParentIncludeSchema.optional(),
  where: ParentWhereInputSchema.optional(), 
  orderBy: z.union([ ParentOrderByWithRelationInputSchema.array(), ParentOrderByWithRelationInputSchema ]).optional(),
  cursor: ParentWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ParentScalarFieldEnumSchema, ParentScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const ParentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ParentFindFirstOrThrowArgs> = z.object({
  select: ParentSelectSchema.optional(),
  include: ParentIncludeSchema.optional(),
  where: ParentWhereInputSchema.optional(), 
  orderBy: z.union([ ParentOrderByWithRelationInputSchema.array(), ParentOrderByWithRelationInputSchema ]).optional(),
  cursor: ParentWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ParentScalarFieldEnumSchema, ParentScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const ParentFindManyArgsSchema: z.ZodType<Prisma.ParentFindManyArgs> = z.object({
  select: ParentSelectSchema.optional(),
  include: ParentIncludeSchema.optional(),
  where: ParentWhereInputSchema.optional(), 
  orderBy: z.union([ ParentOrderByWithRelationInputSchema.array(), ParentOrderByWithRelationInputSchema ]).optional(),
  cursor: ParentWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ParentScalarFieldEnumSchema, ParentScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const ParentAggregateArgsSchema: z.ZodType<Prisma.ParentAggregateArgs> = z.object({
  where: ParentWhereInputSchema.optional(), 
  orderBy: z.union([ ParentOrderByWithRelationInputSchema.array(), ParentOrderByWithRelationInputSchema ]).optional(),
  cursor: ParentWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const ParentGroupByArgsSchema: z.ZodType<Prisma.ParentGroupByArgs> = z.object({
  where: ParentWhereInputSchema.optional(), 
  orderBy: z.union([ ParentOrderByWithAggregationInputSchema.array(), ParentOrderByWithAggregationInputSchema ]).optional(),
  by: ParentScalarFieldEnumSchema.array(), 
  having: ParentScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const ParentFindUniqueArgsSchema: z.ZodType<Prisma.ParentFindUniqueArgs> = z.object({
  select: ParentSelectSchema.optional(),
  include: ParentIncludeSchema.optional(),
  where: ParentWhereUniqueInputSchema, 
}).strict();

export const ParentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ParentFindUniqueOrThrowArgs> = z.object({
  select: ParentSelectSchema.optional(),
  include: ParentIncludeSchema.optional(),
  where: ParentWhereUniqueInputSchema, 
}).strict();

export const AthleteFindFirstArgsSchema: z.ZodType<Prisma.AthleteFindFirstArgs> = z.object({
  select: AthleteSelectSchema.optional(),
  include: AthleteIncludeSchema.optional(),
  where: AthleteWhereInputSchema.optional(), 
  orderBy: z.union([ AthleteOrderByWithRelationInputSchema.array(), AthleteOrderByWithRelationInputSchema ]).optional(),
  cursor: AthleteWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AthleteScalarFieldEnumSchema, AthleteScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const AthleteFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AthleteFindFirstOrThrowArgs> = z.object({
  select: AthleteSelectSchema.optional(),
  include: AthleteIncludeSchema.optional(),
  where: AthleteWhereInputSchema.optional(), 
  orderBy: z.union([ AthleteOrderByWithRelationInputSchema.array(), AthleteOrderByWithRelationInputSchema ]).optional(),
  cursor: AthleteWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AthleteScalarFieldEnumSchema, AthleteScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const AthleteFindManyArgsSchema: z.ZodType<Prisma.AthleteFindManyArgs> = z.object({
  select: AthleteSelectSchema.optional(),
  include: AthleteIncludeSchema.optional(),
  where: AthleteWhereInputSchema.optional(), 
  orderBy: z.union([ AthleteOrderByWithRelationInputSchema.array(), AthleteOrderByWithRelationInputSchema ]).optional(),
  cursor: AthleteWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AthleteScalarFieldEnumSchema, AthleteScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const AthleteAggregateArgsSchema: z.ZodType<Prisma.AthleteAggregateArgs> = z.object({
  where: AthleteWhereInputSchema.optional(), 
  orderBy: z.union([ AthleteOrderByWithRelationInputSchema.array(), AthleteOrderByWithRelationInputSchema ]).optional(),
  cursor: AthleteWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const AthleteGroupByArgsSchema: z.ZodType<Prisma.AthleteGroupByArgs> = z.object({
  where: AthleteWhereInputSchema.optional(), 
  orderBy: z.union([ AthleteOrderByWithAggregationInputSchema.array(), AthleteOrderByWithAggregationInputSchema ]).optional(),
  by: AthleteScalarFieldEnumSchema.array(), 
  having: AthleteScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const AthleteFindUniqueArgsSchema: z.ZodType<Prisma.AthleteFindUniqueArgs> = z.object({
  select: AthleteSelectSchema.optional(),
  include: AthleteIncludeSchema.optional(),
  where: AthleteWhereUniqueInputSchema, 
}).strict();

export const AthleteFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AthleteFindUniqueOrThrowArgs> = z.object({
  select: AthleteSelectSchema.optional(),
  include: AthleteIncludeSchema.optional(),
  where: AthleteWhereUniqueInputSchema, 
}).strict();

export const EnrollmentFindFirstArgsSchema: z.ZodType<Prisma.EnrollmentFindFirstArgs> = z.object({
  select: EnrollmentSelectSchema.optional(),
  include: EnrollmentIncludeSchema.optional(),
  where: EnrollmentWhereInputSchema.optional(), 
  orderBy: z.union([ EnrollmentOrderByWithRelationInputSchema.array(), EnrollmentOrderByWithRelationInputSchema ]).optional(),
  cursor: EnrollmentWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EnrollmentScalarFieldEnumSchema, EnrollmentScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const EnrollmentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.EnrollmentFindFirstOrThrowArgs> = z.object({
  select: EnrollmentSelectSchema.optional(),
  include: EnrollmentIncludeSchema.optional(),
  where: EnrollmentWhereInputSchema.optional(), 
  orderBy: z.union([ EnrollmentOrderByWithRelationInputSchema.array(), EnrollmentOrderByWithRelationInputSchema ]).optional(),
  cursor: EnrollmentWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EnrollmentScalarFieldEnumSchema, EnrollmentScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const EnrollmentFindManyArgsSchema: z.ZodType<Prisma.EnrollmentFindManyArgs> = z.object({
  select: EnrollmentSelectSchema.optional(),
  include: EnrollmentIncludeSchema.optional(),
  where: EnrollmentWhereInputSchema.optional(), 
  orderBy: z.union([ EnrollmentOrderByWithRelationInputSchema.array(), EnrollmentOrderByWithRelationInputSchema ]).optional(),
  cursor: EnrollmentWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EnrollmentScalarFieldEnumSchema, EnrollmentScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const EnrollmentAggregateArgsSchema: z.ZodType<Prisma.EnrollmentAggregateArgs> = z.object({
  where: EnrollmentWhereInputSchema.optional(), 
  orderBy: z.union([ EnrollmentOrderByWithRelationInputSchema.array(), EnrollmentOrderByWithRelationInputSchema ]).optional(),
  cursor: EnrollmentWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const EnrollmentGroupByArgsSchema: z.ZodType<Prisma.EnrollmentGroupByArgs> = z.object({
  where: EnrollmentWhereInputSchema.optional(), 
  orderBy: z.union([ EnrollmentOrderByWithAggregationInputSchema.array(), EnrollmentOrderByWithAggregationInputSchema ]).optional(),
  by: EnrollmentScalarFieldEnumSchema.array(), 
  having: EnrollmentScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const EnrollmentFindUniqueArgsSchema: z.ZodType<Prisma.EnrollmentFindUniqueArgs> = z.object({
  select: EnrollmentSelectSchema.optional(),
  include: EnrollmentIncludeSchema.optional(),
  where: EnrollmentWhereUniqueInputSchema, 
}).strict();

export const EnrollmentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.EnrollmentFindUniqueOrThrowArgs> = z.object({
  select: EnrollmentSelectSchema.optional(),
  include: EnrollmentIncludeSchema.optional(),
  where: EnrollmentWhereUniqueInputSchema, 
}).strict();

export const SeasonCreateArgsSchema: z.ZodType<Prisma.SeasonCreateArgs> = z.object({
  select: SeasonSelectSchema.optional(),
  include: SeasonIncludeSchema.optional(),
  data: z.union([ SeasonCreateInputSchema, SeasonUncheckedCreateInputSchema ]),
}).strict();

export const SeasonUpsertArgsSchema: z.ZodType<Prisma.SeasonUpsertArgs> = z.object({
  select: SeasonSelectSchema.optional(),
  include: SeasonIncludeSchema.optional(),
  where: SeasonWhereUniqueInputSchema, 
  create: z.union([ SeasonCreateInputSchema, SeasonUncheckedCreateInputSchema ]),
  update: z.union([ SeasonUpdateInputSchema, SeasonUncheckedUpdateInputSchema ]),
}).strict();

export const SeasonCreateManyArgsSchema: z.ZodType<Prisma.SeasonCreateManyArgs> = z.object({
  data: z.union([ SeasonCreateManyInputSchema, SeasonCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const SeasonCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SeasonCreateManyAndReturnArgs> = z.object({
  data: z.union([ SeasonCreateManyInputSchema, SeasonCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const SeasonDeleteArgsSchema: z.ZodType<Prisma.SeasonDeleteArgs> = z.object({
  select: SeasonSelectSchema.optional(),
  include: SeasonIncludeSchema.optional(),
  where: SeasonWhereUniqueInputSchema, 
}).strict();

export const SeasonUpdateArgsSchema: z.ZodType<Prisma.SeasonUpdateArgs> = z.object({
  select: SeasonSelectSchema.optional(),
  include: SeasonIncludeSchema.optional(),
  data: z.union([ SeasonUpdateInputSchema, SeasonUncheckedUpdateInputSchema ]),
  where: SeasonWhereUniqueInputSchema, 
}).strict();

export const SeasonUpdateManyArgsSchema: z.ZodType<Prisma.SeasonUpdateManyArgs> = z.object({
  data: z.union([ SeasonUpdateManyMutationInputSchema, SeasonUncheckedUpdateManyInputSchema ]),
  where: SeasonWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const SeasonUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.SeasonUpdateManyAndReturnArgs> = z.object({
  data: z.union([ SeasonUpdateManyMutationInputSchema, SeasonUncheckedUpdateManyInputSchema ]),
  where: SeasonWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const SeasonDeleteManyArgsSchema: z.ZodType<Prisma.SeasonDeleteManyArgs> = z.object({
  where: SeasonWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const ActivityCreateArgsSchema: z.ZodType<Prisma.ActivityCreateArgs> = z.object({
  select: ActivitySelectSchema.optional(),
  include: ActivityIncludeSchema.optional(),
  data: z.union([ ActivityCreateInputSchema, ActivityUncheckedCreateInputSchema ]),
}).strict();

export const ActivityUpsertArgsSchema: z.ZodType<Prisma.ActivityUpsertArgs> = z.object({
  select: ActivitySelectSchema.optional(),
  include: ActivityIncludeSchema.optional(),
  where: ActivityWhereUniqueInputSchema, 
  create: z.union([ ActivityCreateInputSchema, ActivityUncheckedCreateInputSchema ]),
  update: z.union([ ActivityUpdateInputSchema, ActivityUncheckedUpdateInputSchema ]),
}).strict();

export const ActivityCreateManyArgsSchema: z.ZodType<Prisma.ActivityCreateManyArgs> = z.object({
  data: z.union([ ActivityCreateManyInputSchema, ActivityCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const ActivityCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ActivityCreateManyAndReturnArgs> = z.object({
  data: z.union([ ActivityCreateManyInputSchema, ActivityCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const ActivityDeleteArgsSchema: z.ZodType<Prisma.ActivityDeleteArgs> = z.object({
  select: ActivitySelectSchema.optional(),
  include: ActivityIncludeSchema.optional(),
  where: ActivityWhereUniqueInputSchema, 
}).strict();

export const ActivityUpdateArgsSchema: z.ZodType<Prisma.ActivityUpdateArgs> = z.object({
  select: ActivitySelectSchema.optional(),
  include: ActivityIncludeSchema.optional(),
  data: z.union([ ActivityUpdateInputSchema, ActivityUncheckedUpdateInputSchema ]),
  where: ActivityWhereUniqueInputSchema, 
}).strict();

export const ActivityUpdateManyArgsSchema: z.ZodType<Prisma.ActivityUpdateManyArgs> = z.object({
  data: z.union([ ActivityUpdateManyMutationInputSchema, ActivityUncheckedUpdateManyInputSchema ]),
  where: ActivityWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const ActivityUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.ActivityUpdateManyAndReturnArgs> = z.object({
  data: z.union([ ActivityUpdateManyMutationInputSchema, ActivityUncheckedUpdateManyInputSchema ]),
  where: ActivityWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const ActivityDeleteManyArgsSchema: z.ZodType<Prisma.ActivityDeleteManyArgs> = z.object({
  where: ActivityWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const CourseCreateArgsSchema: z.ZodType<Prisma.CourseCreateArgs> = z.object({
  select: CourseSelectSchema.optional(),
  include: CourseIncludeSchema.optional(),
  data: z.union([ CourseCreateInputSchema, CourseUncheckedCreateInputSchema ]),
}).strict();

export const CourseUpsertArgsSchema: z.ZodType<Prisma.CourseUpsertArgs> = z.object({
  select: CourseSelectSchema.optional(),
  include: CourseIncludeSchema.optional(),
  where: CourseWhereUniqueInputSchema, 
  create: z.union([ CourseCreateInputSchema, CourseUncheckedCreateInputSchema ]),
  update: z.union([ CourseUpdateInputSchema, CourseUncheckedUpdateInputSchema ]),
}).strict();

export const CourseCreateManyArgsSchema: z.ZodType<Prisma.CourseCreateManyArgs> = z.object({
  data: z.union([ CourseCreateManyInputSchema, CourseCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const CourseCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CourseCreateManyAndReturnArgs> = z.object({
  data: z.union([ CourseCreateManyInputSchema, CourseCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const CourseDeleteArgsSchema: z.ZodType<Prisma.CourseDeleteArgs> = z.object({
  select: CourseSelectSchema.optional(),
  include: CourseIncludeSchema.optional(),
  where: CourseWhereUniqueInputSchema, 
}).strict();

export const CourseUpdateArgsSchema: z.ZodType<Prisma.CourseUpdateArgs> = z.object({
  select: CourseSelectSchema.optional(),
  include: CourseIncludeSchema.optional(),
  data: z.union([ CourseUpdateInputSchema, CourseUncheckedUpdateInputSchema ]),
  where: CourseWhereUniqueInputSchema, 
}).strict();

export const CourseUpdateManyArgsSchema: z.ZodType<Prisma.CourseUpdateManyArgs> = z.object({
  data: z.union([ CourseUpdateManyMutationInputSchema, CourseUncheckedUpdateManyInputSchema ]),
  where: CourseWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const CourseUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.CourseUpdateManyAndReturnArgs> = z.object({
  data: z.union([ CourseUpdateManyMutationInputSchema, CourseUncheckedUpdateManyInputSchema ]),
  where: CourseWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const CourseDeleteManyArgsSchema: z.ZodType<Prisma.CourseDeleteManyArgs> = z.object({
  where: CourseWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const ParentCreateArgsSchema: z.ZodType<Prisma.ParentCreateArgs> = z.object({
  select: ParentSelectSchema.optional(),
  include: ParentIncludeSchema.optional(),
  data: z.union([ ParentCreateInputSchema, ParentUncheckedCreateInputSchema ]),
}).strict();

export const ParentUpsertArgsSchema: z.ZodType<Prisma.ParentUpsertArgs> = z.object({
  select: ParentSelectSchema.optional(),
  include: ParentIncludeSchema.optional(),
  where: ParentWhereUniqueInputSchema, 
  create: z.union([ ParentCreateInputSchema, ParentUncheckedCreateInputSchema ]),
  update: z.union([ ParentUpdateInputSchema, ParentUncheckedUpdateInputSchema ]),
}).strict();

export const ParentCreateManyArgsSchema: z.ZodType<Prisma.ParentCreateManyArgs> = z.object({
  data: z.union([ ParentCreateManyInputSchema, ParentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const ParentCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ParentCreateManyAndReturnArgs> = z.object({
  data: z.union([ ParentCreateManyInputSchema, ParentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const ParentDeleteArgsSchema: z.ZodType<Prisma.ParentDeleteArgs> = z.object({
  select: ParentSelectSchema.optional(),
  include: ParentIncludeSchema.optional(),
  where: ParentWhereUniqueInputSchema, 
}).strict();

export const ParentUpdateArgsSchema: z.ZodType<Prisma.ParentUpdateArgs> = z.object({
  select: ParentSelectSchema.optional(),
  include: ParentIncludeSchema.optional(),
  data: z.union([ ParentUpdateInputSchema, ParentUncheckedUpdateInputSchema ]),
  where: ParentWhereUniqueInputSchema, 
}).strict();

export const ParentUpdateManyArgsSchema: z.ZodType<Prisma.ParentUpdateManyArgs> = z.object({
  data: z.union([ ParentUpdateManyMutationInputSchema, ParentUncheckedUpdateManyInputSchema ]),
  where: ParentWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const ParentUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.ParentUpdateManyAndReturnArgs> = z.object({
  data: z.union([ ParentUpdateManyMutationInputSchema, ParentUncheckedUpdateManyInputSchema ]),
  where: ParentWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const ParentDeleteManyArgsSchema: z.ZodType<Prisma.ParentDeleteManyArgs> = z.object({
  where: ParentWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const AthleteCreateArgsSchema: z.ZodType<Prisma.AthleteCreateArgs> = z.object({
  select: AthleteSelectSchema.optional(),
  include: AthleteIncludeSchema.optional(),
  data: z.union([ AthleteCreateInputSchema, AthleteUncheckedCreateInputSchema ]),
}).strict();

export const AthleteUpsertArgsSchema: z.ZodType<Prisma.AthleteUpsertArgs> = z.object({
  select: AthleteSelectSchema.optional(),
  include: AthleteIncludeSchema.optional(),
  where: AthleteWhereUniqueInputSchema, 
  create: z.union([ AthleteCreateInputSchema, AthleteUncheckedCreateInputSchema ]),
  update: z.union([ AthleteUpdateInputSchema, AthleteUncheckedUpdateInputSchema ]),
}).strict();

export const AthleteCreateManyArgsSchema: z.ZodType<Prisma.AthleteCreateManyArgs> = z.object({
  data: z.union([ AthleteCreateManyInputSchema, AthleteCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const AthleteCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AthleteCreateManyAndReturnArgs> = z.object({
  data: z.union([ AthleteCreateManyInputSchema, AthleteCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const AthleteDeleteArgsSchema: z.ZodType<Prisma.AthleteDeleteArgs> = z.object({
  select: AthleteSelectSchema.optional(),
  include: AthleteIncludeSchema.optional(),
  where: AthleteWhereUniqueInputSchema, 
}).strict();

export const AthleteUpdateArgsSchema: z.ZodType<Prisma.AthleteUpdateArgs> = z.object({
  select: AthleteSelectSchema.optional(),
  include: AthleteIncludeSchema.optional(),
  data: z.union([ AthleteUpdateInputSchema, AthleteUncheckedUpdateInputSchema ]),
  where: AthleteWhereUniqueInputSchema, 
}).strict();

export const AthleteUpdateManyArgsSchema: z.ZodType<Prisma.AthleteUpdateManyArgs> = z.object({
  data: z.union([ AthleteUpdateManyMutationInputSchema, AthleteUncheckedUpdateManyInputSchema ]),
  where: AthleteWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const AthleteUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.AthleteUpdateManyAndReturnArgs> = z.object({
  data: z.union([ AthleteUpdateManyMutationInputSchema, AthleteUncheckedUpdateManyInputSchema ]),
  where: AthleteWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const AthleteDeleteManyArgsSchema: z.ZodType<Prisma.AthleteDeleteManyArgs> = z.object({
  where: AthleteWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const EnrollmentCreateArgsSchema: z.ZodType<Prisma.EnrollmentCreateArgs> = z.object({
  select: EnrollmentSelectSchema.optional(),
  include: EnrollmentIncludeSchema.optional(),
  data: z.union([ EnrollmentCreateInputSchema, EnrollmentUncheckedCreateInputSchema ]),
}).strict();

export const EnrollmentUpsertArgsSchema: z.ZodType<Prisma.EnrollmentUpsertArgs> = z.object({
  select: EnrollmentSelectSchema.optional(),
  include: EnrollmentIncludeSchema.optional(),
  where: EnrollmentWhereUniqueInputSchema, 
  create: z.union([ EnrollmentCreateInputSchema, EnrollmentUncheckedCreateInputSchema ]),
  update: z.union([ EnrollmentUpdateInputSchema, EnrollmentUncheckedUpdateInputSchema ]),
}).strict();

export const EnrollmentCreateManyArgsSchema: z.ZodType<Prisma.EnrollmentCreateManyArgs> = z.object({
  data: z.union([ EnrollmentCreateManyInputSchema, EnrollmentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const EnrollmentCreateManyAndReturnArgsSchema: z.ZodType<Prisma.EnrollmentCreateManyAndReturnArgs> = z.object({
  data: z.union([ EnrollmentCreateManyInputSchema, EnrollmentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const EnrollmentDeleteArgsSchema: z.ZodType<Prisma.EnrollmentDeleteArgs> = z.object({
  select: EnrollmentSelectSchema.optional(),
  include: EnrollmentIncludeSchema.optional(),
  where: EnrollmentWhereUniqueInputSchema, 
}).strict();

export const EnrollmentUpdateArgsSchema: z.ZodType<Prisma.EnrollmentUpdateArgs> = z.object({
  select: EnrollmentSelectSchema.optional(),
  include: EnrollmentIncludeSchema.optional(),
  data: z.union([ EnrollmentUpdateInputSchema, EnrollmentUncheckedUpdateInputSchema ]),
  where: EnrollmentWhereUniqueInputSchema, 
}).strict();

export const EnrollmentUpdateManyArgsSchema: z.ZodType<Prisma.EnrollmentUpdateManyArgs> = z.object({
  data: z.union([ EnrollmentUpdateManyMutationInputSchema, EnrollmentUncheckedUpdateManyInputSchema ]),
  where: EnrollmentWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const EnrollmentUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.EnrollmentUpdateManyAndReturnArgs> = z.object({
  data: z.union([ EnrollmentUpdateManyMutationInputSchema, EnrollmentUncheckedUpdateManyInputSchema ]),
  where: EnrollmentWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const EnrollmentDeleteManyArgsSchema: z.ZodType<Prisma.EnrollmentDeleteManyArgs> = z.object({
  where: EnrollmentWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();