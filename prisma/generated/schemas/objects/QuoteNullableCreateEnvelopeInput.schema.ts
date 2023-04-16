import { z } from 'zod';
import { QuoteCreateInputObjectSchema } from './QuoteCreateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuoteNullableCreateEnvelopeInput> = z
  .object({
    set: z
      .lazy(() => QuoteCreateInputObjectSchema)
      .optional()
      .nullable(),
  })
  .strict();

export const QuoteNullableCreateEnvelopeInputObjectSchema = Schema;
