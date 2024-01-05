import { Injectable } from "@nestjs/common";
import { IMailService } from "./interfaces/mail-service.interface";
import { MailerService } from "@nestjs-modules/mailer";
import { ActivationDto } from "./dto/activation.dto";
import { AdminRoleMessageDto } from "./dto/admin-role-msg.dto";
import { MemberRoleMessageDto } from "./dto/member-role-msg.dto";
import { PostCreatedDto } from "./dto/post-created.dto";

@Injectable()
export class MailService implements IMailService {

    constructor(private readonly mailerService: MailerService) {}

    async sendActivationMessage(dto: ActivationDto): Promise<Empty> {
        await this.mailerService.sendMail({
            to: dto.email,
            subject: "Подтверждение email на сайте intelligentmen.com",
            html: `
                    <div style = "background-color: rgb(40, 39, 39); 
                                  border-radius: 15px; margin-left: 0.75%;
                                  padding-bottom: 2%;">
                        <h1 style="color: whitesmoke; 
                                          font-family: MailSans, Helvetica, Arial, sans-serif; 
                                          margin-left: 2%; 
                                          margin-bottom: -1.5%;
                                          padding-top: 1%;
                                          text-decoration: none;">
                            ${dto.username},  добро пожаловать
                        </h1>
                        <h3 style="color: whitesmoke; 
                                          font-family: MailSans, Helvetica, Arial, sans-serif; 
                                          margin-left: 2%;">
                            в экосистему Интеллигентных мужчин 🧐🎩!
                        </h3>
                        <p style="color:  whitesmoke; 
                                          font-family: MailSans, Helvetica, Arial, sans-serif; 
                                          margin-left: 2%; 
                                          margin-right: 2%;
                                          font-size: 90%;
                                          text-decoration: none;">
                            &nbsp;&nbsp;&nbsp;Ваша электронная почта была использована при регистрации на сайте 
                            intelligentmen.com. Это означает, что вы теперь сможете наслаждаться 
                            невероятным контентом от Легенд, пользоваться их продуктами, и даже 
                            общаться с ними! Осталось только лишь подтвердить email. 
                            Нажмите "Подтвердить", если это именно Вы регестрировались, и 
                            "Это был не я", если не Вы проводили регистрацию.
                        </p>
                        <a style="background-color: rgb(51, 51, 52); 
                                  color: whitesmoke; 
                                  font-family: MailSans, Helvetica, Arial, sans-serif; 
                                  border-radius: 5px; 
                                  border: 0px; padding-top: 0.5%;
                                  margin-left: 31%; margin-right: 2%;
                                  font-size: 115%; padding-bottom: 0.5%;
                                  padding-left: 1%; padding-right: 1%;
                                  height: 20%; text-decoration: none;"
                                  href='http://localhost:8080/activate/${dto.url}'>
                            Подтвердить
                        </a>
                        <a style="background-color: rgb(51, 51, 52); 
                                  color: whitesmoke; 
                                  font-family: MailSans, Helvetica, Arial, sans-serif; 
                                  border-radius: 5px; padding-right: 1%;
                                  border: 0px; margin-bottom: 500%; 
                                  font-size: 115%; padding-left: 1%;
                                  height: 15%; text-decoration: none;
                                  padding-top: 0.5%; padding-bottom: 0.5%;"
                                  href='http://localhost:8080/cancelreg/${dto.url}'>
                            Это был не я
                        </a>
                    </div>
            `,
        });
        return {};
    }

    async sendAdminRoleIsSettedMessage(dto: AdminRoleMessageDto): Promise<Empty> {
        await this.mailerService.sendMail({
            to: dto.email,
            subject: "Повышение роли на сайте intelligentmen.com",
            html: `
                    <div style="background-color: rgb(40, 39, 39); 
                                border-radius: 15px;
                                padding-bottom: 2%;">
                        <h1 style="color: whitesmoke; 
                                   font-family: MailSans, Helvetica, Arial, sans-serif; 
                                   margin-left: 2%; 
                                   margin-bottom: -1.5%;
                                   padding-top: 1%;
                                   text-decoration: none">
                            Интеллигентные мужчины 🧐🎩
                        </h1> 
                        <h2 style="color: whitesmoke; 
                                   font-family: MailSans, Helvetica, Arial, sans-serif; 
                                   margin-left: 2%;">
                            поздравляют вас!
                        </h2>
                        <p style="color:  whitesmoke; 
                                  font-family: MailSans, Helvetica, Arial, sans-serif; 
                                  margin-left: 2%; 
                                  margin-right: 2%;
                                  margin-bottom: 3%;
                                  font-size: 90%;
                                  text-decoration: none;">
                            &nbsp;&nbsp;&nbsp;Совет Интеллигентных мужчин принял решение назначить вас
                            администратором на сайте intelligentmen.com. Это значит, что вы теперь сможите
                            модерировать комментарии, удаляя аморальные комменты и баня хулигашек)), отвечать
                            на вопросы в службе поддержки и решать многие другие технические проблемы на сайте.
                            Ознакомтесь с кодексом администратора (в личном кабинете, в разделе "администраторство")
                            и приступайте к работе!) Добро пожаловать в команду Легенд😉.
                        </p>
                        <a style="background-color: rgb(51, 51, 52); 
                                  color: whitesmoke; 
                                  font-family: MailSans, Helvetica, Arial, sans-serif; 
                                  border-radius: 5px; padding-right: 1%;
                                  border: 0px; margin-left: 37%; 
                                  font-size: 115%; padding-left: 1%;
                                  height: 15%; text-decoration: none;
                                  padding-top: 0.5%; padding-bottom: 0.5%;"
                                  href='http://localhost:8080/'>
                            Перейти на сайт
                        </a>
                    </div>
            `,
        });    
        return {};
    }

    async sendMemberRoleIsSettedMessage(dto: MemberRoleMessageDto): Promise<Empty> {
        await this.mailerService.sendMail({
            to: dto.email,
            subject: "Повышение роли на сайте intelligentmen.com",
            html: `
                    <div style="background-color: rgb(40, 39, 39); 
                                border-radius: 15px;
                                padding-bottom: 2%;">
                        <h1 style="color: whitesmoke; 
                                   font-family: MailSans, Helvetica, Arial, sans-serif; 
                                   margin-left: 2%; 
                                   margin-bottom: -1.5%;
                                   padding-top: 1%;
                                   text-decoration: none">
                            Интеллигентные мужчины 🧐🎩
                        </h1> 
                        <h2 style="color: whitesmoke; 
                                   font-family: MailSans, Helvetica, Arial, sans-serif; 
                                   margin-left: 2%;">
                            поздравляют вас!
                        </h2>
                        <p style="color:  whitesmoke; 
                                  font-family: MailSans, Helvetica, Arial, sans-serif; 
                                  margin-left: 2%; 
                                  margin-right: 2%;
                                  margin-bottom: 3%;
                                  font-size: 90%;
                                  text-decoration: none;">
                            &nbsp;&nbsp;&nbsp;Совет Интеллигентных мужчин принял решение сделать вас новым
                            членом Легендарных Интеллигентных Мужчин! Это означает, что Вы стали Элитой и
                            сливками общества. Конечно же вы знали это, и прошли Великий Путь Дресни. Это 
                            сообщение о том, что ваша роль на сайте intelligentmen.com повышениа до Члена Клана.
                            Теперь Вы сможете публиковать новые посты, добавлять товары в разделе "мерч", назначать
                            администраторов, банить хулигашек и делать вообще все на сайте. Вам требуется зайти в 
                            свой профиль, добавить свою страницу в разделе "Члены" и оформить её! Добро пожаловать
                            в семью Легенд 😉.
                        </p>
                        <a style="background-color: rgb(51, 51, 52); 
                                  color: whitesmoke; 
                                  font-family: MailSans, Helvetica, Arial, sans-serif; 
                                  border-radius: 5px; padding-right: 1%;
                                  border: 0px; margin-left: 37%; 
                                  font-size: 115%; padding-left: 1%;
                                  height: 15%; text-decoration: none;
                                  padding-top: 0.5%; padding-bottom: 0.5%;"
                                  href='http://localhost:8080/'>
                            Перейти на сайт
                        </a>
                    </div>
            `,
        });    
        return {};
    }

    async sendPostCreatedMessage(dto: PostCreatedDto): Promise<Empty> {
        await this.mailerService.sendMail({
            to: dto.email,
            subject: "Новый пост у IM!",
            html: `
                    <div style="background-color: rgb(40, 39, 39); 
                                border-radius: 15px;
                                padding-bottom: 2%;">
                        <h1 style="color: whitesmoke; 
                                   font-family: MailSans, Helvetica, Arial, sans-serif; 
                                   margin-left: 2%; 
                                   margin-bottom: -1.5%;
                                   padding-top: 1%;
                                   text-decoration: none">
                            Интеллигентные Мужчины 🧐🎩
                        </h1>
                        <h2 style="color: whitesmoke; 
                                   font-family: MailSans, Helvetica, Arial, sans-serif; 
                                   margin-left: 2%;">
                            приветствуют тебя!
                        </h2>
                        <p style="color:  whitesmoke; 
                                  font-family: MailSans, Helvetica, Arial, sans-serif; 
                                  margin-left: 2%; 
                                  margin-right: 2%;
                                  margin-bottom: 3%;
                                  font-size: 100%;
                                  text-decoration: none;">
                            &nbsp;&nbsp;&nbsp;Мы выпустили новый умопомрочительный пост "${dto.title}" на 
                            нашем сайте intelligentmen.com. Скорее его посмотри, не забудь поставить лайк 
                            и написать комментарий 😉. 
                        </p>
                        <a style="background-color: rgb(51, 51, 52); 
                                  color: whitesmoke; 
                                  font-family: MailSans, Helvetica, Arial, sans-serif; 
                                  border-radius: 5px; padding-right: 1%;
                                  border: 0px; margin-left: 37%; 
                                  font-size: 115%; padding-left: 1%;
                                  height: 15%; text-decoration: none;
                                  padding-top: 0.5%; padding-bottom: 0.5%;"
                                  href='http://localhost:8080/'>
                            Новый пост
                        </a>
                    </div>
            `,
        });
        return {};
    }

}