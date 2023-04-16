import { z } from 'zod';
import { ImageWhereInputObjectSchema } from './ImageWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ImageDeleteManyInput> = z
  .object({
    where: z.lazy(() => ImageWhereInputObjectSchema),
  })
  .strict();

export const ImageDeleteManyInputObjectSchema = Schema;
