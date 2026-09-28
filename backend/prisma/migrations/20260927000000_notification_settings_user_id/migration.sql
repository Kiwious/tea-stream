-- DropForeignKey
ALTER TABLE "notification_settings" DROP CONSTRAINT "notification_settings_userId_fkey";

-- RenameColumn
ALTER TABLE "notification_settings" RENAME COLUMN "userId" TO "user_id";

-- CreateIndex
CREATE UNIQUE INDEX "notification_settings_user_id_key" ON "notification_settings"("user_id");

-- AddForeignKey
ALTER TABLE "notification_settings" ADD CONSTRAINT "notification_settings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
