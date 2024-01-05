import { ActivationDto } from "../dto/activation.dto";

export interface IMailService {
    sendActivationMessage(dto: ActivationDto): Promise<void>;
}