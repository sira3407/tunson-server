import { IDataIO } from '../models/backendInterfaces';
import { Minion } from '../models/sharedInterfaces';
import { DataIO } from './dataIO';

const MINIONS_FILE_NAME = 'minions.json';

export class MinionsDal {

    private dataIo: IDataIO;

    /**
     * minions.
     */
    private minions: Minion[] = [];

    constructor(dataIo: IDataIO) {
        this.dataIo = dataIo;

        this.minions = dataIo.getDataSync();
    }

    /**
     * Find minion in minions array
     */
    private findMinion(minionId: string): Minion {
        for (const minion of this.minions) {
            if (minion.minionId === minionId) {
                return minion;
            }
        }
    }

    /**
     * Get all minions as array.
     */
    public async getMinions(): Promise<Minion[]> {
        return this.minions;
    }

    /**
     * Get minion by id.
     * @param minionId minion id.
     */
    public async getMinionsById(minionId: string): Promise<Minion> {
        const minion = this.findMinion(minionId);

        if (!minion) {
            throw new Error('minion not exist');
        }
        return minion;
    }

    /**
     * Save new minion.
     * @param newMinion minoin to create.
     */
    public async createMinion(newMinion: Minion): Promise<void> {
        this.minions.push(newMinion);

        await this.dataIo.setData(this.minions)
            .catch(() => {
                this.minions.splice(this.minions.indexOf(newMinion), 1);
                throw new Error('fail to save minion');
            });
    }

    /**
     * Delete minion.
     * @param minion minion to delete.
     */
    public async deleteMinion(minion: Minion): Promise<void> {
        const originalMinion = this.findMinion(minion.minionId);

        if (!originalMinion) {
            throw new Error('minion not exist');
        }

        this.minions.splice(this.minions.indexOf(originalMinion), 1);
        await this.dataIo.setData(this.minions)
            .catch(() => {
                this.minions.push(originalMinion);
                throw new Error('fail to save minion delete request');
            });
    }
}

export const MinionsDalSingleton = new MinionsDal(new DataIO(MINIONS_FILE_NAME));
