import { z } from 'zod';
import { ImageWhereInputObjectSchema } from './ImageWhereInput.schema';
import { ImageUpdateInputObjectSchema } from './ImageUpdateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ImageUpdateManyInput> = z
  .object({
    where: z.lazy(() => ImageWhereInputObjectSchema),
    data: z.lazy(() => ImageUpdateInputObjectSchema),
  })
  .strict();

export const ImageUpdateManyInputObjectSchema = Schema;
