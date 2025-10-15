import { Router } from 'express';
import { PrismaClient, DeliveryMethod } from '@prisma/client';
import { requireAuth, AuthRequest } from '../middlewares/auth.js';
import { z } from 'zod';

const prisma = new PrismaClient();
const router = Router();

const createSchema = z.object({
  templateKey: z.string().min(1),
  content: z.string().min(1).max(20000),
  deliveryMethod: z.nativeEnum(DeliveryMethod),
  recipient: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    addressLine1: z.string().optional(),
    addressLine2: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    postalCode: z.string().optional(),
    country: z.string().optional(),
  }).optional(),
});

router.post('/', requireAuth, async (req: AuthRequest, res) => {
  const parsed = createSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const { templateKey, content, deliveryMethod, recipient } = parsed.data;
  const pc = await prisma.postcard.create({
    data: {
      templateKey,
      content,
      deliveryMethod,
      userId: req.userId!,
      status: 'CREATED',
      recipientName: recipient?.name,
      recipientEmail: recipient?.email,
      recipientAddressLine1: recipient?.addressLine1,
      recipientAddressLine2: recipient?.addressLine2,
      recipientCity: recipient?.city,
      recipientState: recipient?.state,
      recipientPostalCode: recipient?.postalCode,
      recipientCountry: recipient?.country,
    },
  });
  res.json(pc);
});

router.get('/', requireAuth, async (req: AuthRequest, res) => {
  const list = await prisma.postcard.findMany({
    where: { userId: req.userId! },
    orderBy: { createdAt: 'desc' },
  });
  res.json(list);
});

router.get('/:id', requireAuth, async (req: AuthRequest, res) => {
  const pc = await prisma.postcard.findFirst({ where: { id: req.params.id, userId: req.userId! } });
  if (!pc) return res.status(404).json({ error: 'Not found' });
  res.json(pc);
});

router.delete('/:id', requireAuth, async (req: AuthRequest, res) => {
  await prisma.postcard.delete({ where: { id: req.params.id } });
  res.json({ ok: true });
});

export default router;
