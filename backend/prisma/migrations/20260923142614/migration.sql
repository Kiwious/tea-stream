-- AlterTable
ALTER TABLE "streams" ADD COLUMN     "category_id" UUID;

-- AddForeignKey
ALTER TABLE "streams" ADD CONSTRAINT "streams_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
