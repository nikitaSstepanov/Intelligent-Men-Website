import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1698953977848 implements MigrationInterface {
    name = 'Init1698953977848'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comments_likes" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "commentId" integer NOT NULL, CONSTRAINT "PK_76e988dd40034228052b54157cb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "likes" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "postId" integer NOT NULL, CONSTRAINT "PK_a9323de3f8bced7539a794b4a37" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tags" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "posts" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "contentDir" character varying NOT NULL, "authorId" integer NOT NULL, "likesNumber" integer NOT NULL DEFAULT '0', "commentsNumber" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" SERIAL NOT NULL, "contentDir" character varying NOT NULL, "authorId" integer NOT NULL, "likesNumber" integer NOT NULL DEFAULT '0', "answersNumber" integer NOT NULL DEFAULT '0', "isAnswerFor" integer, "postId" integer, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "posts_to_tags" ("postsId" integer NOT NULL, "tagsId" integer NOT NULL, CONSTRAINT "PK_ee05d9fe891203f007b37471b1e" PRIMARY KEY ("postsId", "tagsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_58ac5d4a04dae80ac16acf5707" ON "posts_to_tags" ("postsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3c6e78cacc86ef9ecf24174d26" ON "posts_to_tags" ("tagsId") `);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_e44ddaaa6d058cb4092f83ad61f" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts_to_tags" ADD CONSTRAINT "FK_58ac5d4a04dae80ac16acf5707d" FOREIGN KEY ("postsId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts_to_tags" ADD CONSTRAINT "FK_3c6e78cacc86ef9ecf24174d265" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts_to_tags" DROP CONSTRAINT "FK_3c6e78cacc86ef9ecf24174d265"`);
        await queryRunner.query(`ALTER TABLE "posts_to_tags" DROP CONSTRAINT "FK_58ac5d4a04dae80ac16acf5707d"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_e44ddaaa6d058cb4092f83ad61f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3c6e78cacc86ef9ecf24174d26"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_58ac5d4a04dae80ac16acf5707"`);
        await queryRunner.query(`DROP TABLE "posts_to_tags"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "posts"`);
        await queryRunner.query(`DROP TABLE "tags"`);
        await queryRunner.query(`DROP TABLE "likes"`);
        await queryRunner.query(`DROP TABLE "comments_likes"`);
    }

}
