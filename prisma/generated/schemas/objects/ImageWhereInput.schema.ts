import { z } from 'zod';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { IntFilterObjectSchema } from './IntFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ImageWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => ImageWhereInputObjectSchema),
        z.lazy(() => ImageWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ImageWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ImageWhereInputObjectSchema),
        z.lazy(() => ImageWhereInputObjectSchema).array(),
      ])
      .optional(),
    url: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    alt: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    width: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
    height: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
  })
  .strict();

export const ImageWhereInputObjectSchema = Schema;
