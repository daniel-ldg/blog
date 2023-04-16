import { z } from 'zod';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { SectionUpdateparagraphsInputObjectSchema } from './SectionUpdateparagraphsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SectionUpdateInput> = z
  .object({
    title: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    paragraphs: z
      .union([
        z.lazy(() => SectionUpdateparagraphsInputObjectSchema),
        z.string().array(),
      ])
      .optional(),
  })
  .strict();

export const SectionUpdateInputObjectSchema = Schema;
