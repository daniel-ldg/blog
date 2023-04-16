import { z } from 'zod';
import { SectionCreateparagraphsInputObjectSchema } from './SectionCreateparagraphsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SectionCreateInput> = z
  .object({
    title: z.string(),
    paragraphs: z
      .union([
        z.lazy(() => SectionCreateparagraphsInputObjectSchema),
        z.string().array(),
      ])
      .optional(),
  })
  .strict();

export const SectionCreateInputObjectSchema = Schema;
