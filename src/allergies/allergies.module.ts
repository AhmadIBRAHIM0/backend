import {Module} from "@nestjs/common";
import {AllergyRepository} from "./allergy.repository";

@Module(
    {
        controllers: [],
        providers: [AllergyRepository],
    }
)
export class AllergiesModule {
}