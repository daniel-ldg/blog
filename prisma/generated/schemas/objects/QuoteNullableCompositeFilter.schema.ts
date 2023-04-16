import { z } from 'zod';
import { QuoteObjectEqualityInputObjectSchema } from './QuoteObjectEqualityInput.schema';
import { QuoteWhereInputObjectSchema } from './QuoteWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuoteNullableCompositeFilter> = z
  .object({
    equals: z
      .lazy(() => QuoteObjectEqualityInputObjectSchema)
      .optional()
      .nullable(),
    is: z
      .lazy(() => QuoteWhereInputObjectSchema)
      .optional()
      .nullable(),
    isNot: z
      .lazy(() => QuoteWhereInputObjectSchema)
      .optional()
      .nullable(),
    isSet: z.boolean().optional(),
  })
  .strict();

export const QuoteNullableCompositeFilterObjectSchema = Schema;
