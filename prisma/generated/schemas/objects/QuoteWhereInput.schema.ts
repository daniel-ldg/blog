import { z } from 'zod';
import { StringFilterObjectSchema } from './StringFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuoteWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => QuoteWhereInputObjectSchema),
        z.lazy(() => QuoteWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => QuoteWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => QuoteWhereInputObjectSchema),
        z.lazy(() => QuoteWhereInputObjectSchema).array(),
      ])
      .optional(),
    text: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    author: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
  })
  .strict();

export const QuoteWhereInputObjectSchema = Schema;
