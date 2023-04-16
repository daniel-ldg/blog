import { z } from 'zod';
import { SectionObjectEqualityInputObjectSchema } from './SectionObjectEqualityInput.schema';
import { SectionWhereInputObjectSchema } from './SectionWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SectionCompositeListFilter> = z
  .object({
    equals: z
      .union([
        z.lazy(() => SectionObjectEqualityInputObjectSchema),
        z.lazy(() => SectionObjectEqualityInputObjectSchema).array(),
      ])
      .optional(),
    every: z.lazy(() => SectionWhereInputObjectSchema).optional(),
    some: z.lazy(() => SectionWhereInputObjectSchema).optional(),
    none: z.lazy(() => SectionWhereInputObjectSchema).optional(),
    isEmpty: z.boolean().optional(),
    isSet: z.boolean().optional(),
  })
  .strict();

export const SectionCompositeListFilterObjectSchema = Schema;
