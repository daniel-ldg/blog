import { z } from 'zod';
import { SectionCreateInputObjectSchema } from './SectionCreateInput.schema';
import { SectionUpdateManyInputObjectSchema } from './SectionUpdateManyInput.schema';
import { SectionDeleteManyInputObjectSchema } from './SectionDeleteManyInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SectionListUpdateEnvelopeInput> = z
  .object({
    set: z
      .union([
        z.lazy(() => SectionCreateInputObjectSchema),
        z.lazy(() => SectionCreateInputObjectSchema).array(),
      ])
      .optional(),
    push: z
      .union([
        z.lazy(() => SectionCreateInputObjectSchema),
        z.lazy(() => SectionCreateInputObjectSchema).array(),
      ])
      .optional(),
    updateMany: z.lazy(() => SectionUpdateManyInputObjectSchema).optional(),
    deleteMany: z.lazy(() => SectionDeleteManyInputObjectSchema).optional(),
  })
  .strict();

export const SectionListUpdateEnvelopeInputObjectSchema = Schema;
