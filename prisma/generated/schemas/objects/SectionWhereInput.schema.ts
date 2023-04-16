import { z } from 'zod';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SectionWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => SectionWhereInputObjectSchema),
        z.lazy(() => SectionWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => SectionWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => SectionWhereInputObjectSchema),
        z.lazy(() => SectionWhereInputObjectSchema).array(),
      ])
      .optional(),
    title: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    paragraphs: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
  })
  .strict();

export const SectionWhereInputObjectSchema = Schema;
