import {Core} from "../core";
import {Unpromised} from "../lib/helper-types";
import {sleep} from "../lib/utils";
import {secondsAgo} from "../lib/dates";
import {Hit} from "../db/models/hit";


interface SchedulerConfig {
    readonly core: Core;
    readonly cyclePeriodInSeconds: number;
}

/**
 * Starts workers for background tasks
 */
export async function launchScheduler(config: SchedulerConfig) {
    let timeout: NodeJS.Timeout | undefined;
    const {core} = config;


    /**
     * Main cycle function
     */
    async function cycle() {
        timeout = undefined;

        try {
            await config.core.hit.process();
        } catch (e) {
            console.error(`Cycle error`, e);

            await sleep(config.cyclePeriodInSeconds * 1000 * 5);

        } finally {
            planNextCycle();
        }
    }

    /**
     * Schedules next cycle
     */
    function planNextCycle() {
        timeout = setTimeout(cycle, config.cyclePeriodInSeconds * 1000);
        timeout.unref();
    }

    planNextCycle();


    return {}
}

export type Scheduler = Unpromised<ReturnType<typeof launchScheduler>>
