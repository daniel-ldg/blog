import { z } from 'zod';
import { QuoteCreateInputObjectSchema } from './QuoteCreateInput.schema';
import { QuoteUpsertInputObjectSchema } from './QuoteUpsertInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuoteNullableUpdateEnvelopeInput> = z
  .object({
    set: z
      .lazy(() => QuoteCreateInputObjectSchema)
      .optional()
      .nullable(),
    upsert: z.lazy(() => QuoteUpsertInputObjectSchema).optional(),
    unset: z.boolean().optional(),
  })
  .strict();

export const QuoteNullableUpdateEnvelopeInputObjectSchema = Schema;
