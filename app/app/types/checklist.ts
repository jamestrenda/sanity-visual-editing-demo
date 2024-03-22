import { z } from 'zod'

export const checklistZ = z.object({
  _type: z.literal('checklist'),
  _key: z.string(),
  items: z.array(
    z.object({
      _key: z.string(),
      item: z.any(), // TODO: portableTextZ
    }),
  ),
  anchor: z.string().nullable(),
})

export type Checklist = z.infer<typeof checklistZ>
