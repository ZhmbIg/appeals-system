import { Router, Request, Response } from 'express';
import { AppealService } from '../services/AppealService';
import { asyncHandler } from '../middleware/asyncHandler';

const router = Router();
const appealService = new AppealService();

/**
 * @swagger
 * tags:
 *   name: Appeals
 *   description: API для работы с обращениями
 */

/**
 * @swagger
 * /appeals:
 *   post:
 *     summary: Создать обращение
 *     tags: [Appeals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - subject
 *               - text
 *             properties:
 *               subject:
 *                 type: string
 *               text:
 *                 type: string
 *     responses:
 *       201:
 *         description: Обращение создано
 */
router.post(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const { subject, text } = req.body;
    const appeal = await appealService.createAppeal(subject, text);
    res.status(201).json(appeal);
  })
);

/**
 * @swagger
 * /appeals/{id}/take:
 *   post:
 *     summary: Взять обращение в работу
 *     tags: [Appeals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Обращение принято в работу
 */
router.post(
  '/:id/take',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const appeal = await appealService.takeAppeal(id);
    if (!appeal) {
      res.status(404);
      throw new Error('Обращение не найдено или не в статусе "Новое"');
    }
    res.json(appeal);
  })
);

/**
 * @swagger
 * /appeals/{id}/finish:
 *   post:
 *     summary: Завершить обработку обращения
 *     tags: [Appeals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - solutionText
 *             properties:
 *               solutionText:
 *                 type: string
 *     responses:
 *       200:
 *         description: Обращение завершено
 */
router.post(
  '/:id/finish',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { solutionText } = req.body;
    const appeal = await appealService.finishAppeal(id, solutionText);
    if (!appeal) {
      res.status(404);
      throw new Error('Обращение не найдено или не в статусе "В работе"');
    }
    res.json(appeal);
  })
);

/**
 * @swagger
 * /appeals/{id}/cancel:
 *   post:
 *     summary: Отмена обращения
 *     tags: [Appeals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cancelReason:
 *                 type: string
 *     responses:
 *       200:
 *         description: Обращение отменено
 */
router.post(
  '/:id/cancel',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { cancelReason } = req.body;
    const appeal = await appealService.cancelAppeal(id, cancelReason);
    if (!appeal) {
      res.status(404);
      throw new Error('Обращение не найдено или нельзя отменить');
    }
    res.json(appeal);
  })
);

/**
 * @swagger
 * /appeals:
 *   get:
 *     summary: Получить список обращений с фильтрацией по дате или диапазону дат
 *     tags: [Appeals]
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *         description: Фильтр по конкретной дате (YYYY-MM-DD)
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *         description: Начало диапазона дат (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *         description: Конец диапазона дат (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Возвращает список обращений
 */
router.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const { date, startDate, endDate } = req.query;
    const appeals = await appealService.listAppeals(
      date as string,
      startDate as string,
      endDate as string
    );
    res.json(appeals);
  })
);

/**
 * @swagger
 * /appeals/cancel-work/all:
 *   post:
 *     summary: Отменить все обращения, которые находятся в статусе "В работе"
 *     tags: [Appeals]
 *     responses:
 *       200:
 *         description: Обращения отменены
 */
router.post(
  '/cancel-work/all',
  asyncHandler(async (req: Request, res: Response) => {
    const appeals = await appealService.cancelAllInProgress();
    res.json(appeals);
  })
);

export default router;