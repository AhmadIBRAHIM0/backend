import {Module} from '@nestjs/common';
import {ScheduleRepository} from "./schedule.repository";

@Module({
    controllers: [],
    providers: [ScheduleRepository],
})
export class SchedulesModule {
}
