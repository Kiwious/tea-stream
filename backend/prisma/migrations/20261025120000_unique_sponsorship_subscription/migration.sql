-- Remove duplicate subscriptions per user and channel, keeping the newest one
DELETE FROM "sponsorship_subscriptions" a
USING "sponsorship_subscriptions" b
WHERE a."userId" = b."userId"
  AND a."channelId" = b."channelId"
  AND (a."created_at", a."id") < (b."created_at", b."id");

-- CreateIndex
CREATE UNIQUE INDEX "sponsorship_subscriptions_userId_channelId_key" ON "sponsorship_subscriptions"("userId", "channelId");
