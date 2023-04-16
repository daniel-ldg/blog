import { z } from 'zod';
import { SectionWhereInputObjectSchema } from './SectionWhereInput.schema';
import { SectionUpdateInputObjectSchema } from './SectionUpdateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SectionUpdateManyInput> = z
  .object({
    where: z.lazy(() => SectionWhereInputObjectSchema),
    data: z.lazy(() => SectionUpdateInputObjectSchema),
  })
  .strict();

export const SectionUpdateManyInputObjectSchema = Schema;
