import { z } from 'zod';
import { SectionCreateInputObjectSchema } from './SectionCreateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SectionListCreateEnvelopeInput> = z
  .object({
    set: z
      .union([
        z.lazy(() => SectionCreateInputObjectSchema),
        z.lazy(() => SectionCreateInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const SectionListCreateEnvelopeInputObjectSchema = Schema;
