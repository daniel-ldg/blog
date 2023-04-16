import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SectionObjectEqualityInput> = z
  .object({
    title: z.string(),
    paragraphs: z.string().array().optional(),
  })
  .strict();

export const SectionObjectEqualityInputObjectSchema = Schema;
