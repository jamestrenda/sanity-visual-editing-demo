import { z } from 'zod'

export const faqsZ = z.object({
  _type: z.literal('faq'),
  _key: z.string(),
  title: z.string(),
  anchor: z.string(),
  text: z.any(), // TODO: portableTextZ
  faqs: z.array(
    z.object({
      question: z.string(),
      _type: z.string(),
      _id: z.string(),
      answer: z.any(), // TODO: portableTextZ
      anchor: z.string(),
    }),
  ),
})

export type FAQ = z.infer<typeof faqsZ>
