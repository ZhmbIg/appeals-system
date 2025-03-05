import { Between } from 'typeorm';
import { Appeal } from '../entity/Appeal.entity';
import { AppealStatus } from '../enums/AppealStatus.enum';
import { AppDataSource } from '../data-source';

export class AppealService {
  private appealRepository = AppDataSource.getRepository(Appeal);

  async createAppeal(subject: string, text: string): Promise<Appeal> {
    const appeal = this.appealRepository.create({ subject, text });
    return await this.appealRepository.save(appeal);
  }

  async takeAppeal(id: string): Promise<Appeal | null> {
    const appeal = await this.appealRepository.findOne({ where: { id } });
    if (!appeal || appeal.status !== AppealStatus.NEW) return null;
    appeal.status = AppealStatus.IN_PROGRESS;
    return await this.appealRepository.save(appeal);
  }

  async finishAppeal(id: string, solutionText: string): Promise<Appeal | null> {
    const appeal = await this.appealRepository.findOne({ where: { id } });
    if (!appeal || appeal.status !== AppealStatus.IN_PROGRESS) return null;
    appeal.status = AppealStatus.COMPLETED;
    appeal.solutionText = solutionText;
    return await this.appealRepository.save(appeal);
  }

  async cancelAppeal(id: string, cancelReason?: string): Promise<Appeal | null> {
    const appeal = await this.appealRepository.findOne({ where: { id } });
    if (!appeal || (appeal.status !== AppealStatus.NEW && appeal.status !== AppealStatus.IN_PROGRESS)) return null;
    appeal.status = AppealStatus.CANCELED;
    appeal.cancelReason = cancelReason;
    return await this.appealRepository.save(appeal);
  }

  async listAppeals(date?: string, startDate?: string, endDate?: string): Promise<Appeal[]> {
    const where: any = {};
    if (date) {
      const dayStart = new Date(date);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(date);
      dayEnd.setHours(23, 59, 59, 999);
      where.createdAt = Between(dayStart, dayEnd);
    } else if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      where.createdAt = Between(start, end);
    }
    return await this.appealRepository.find({ where });
  }

  async cancelAllInProgress(): Promise<Appeal[]> {
    const appeals = await this.appealRepository.find({ where: { status: AppealStatus.IN_PROGRESS } });
    const canceledAppeals = appeals.map(appeal => {
      appeal.status = AppealStatus.CANCELED;
      appeal.cancelReason = 'Массовая отмена';
      return appeal;
    });
    return await this.appealRepository.save(canceledAppeals);
  }
}