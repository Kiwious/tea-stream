-- CreateEnum
CREATE TYPE "transaction_statuses" AS ENUM ('PENDING', 'SUCCESS', 'FAILED', 'EXPIRED');

-- CreateTable
CREATE TABLE "transactions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "stripe_subscription_id" TEXT,
    "status" "transaction_statuses" NOT NULL DEFAULT 'PENDING',
    "user_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sponsorship_plans" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "stripe_product_id" TEXT NOT NULL,
    "stripe_plan_id" TEXT NOT NULL,
    "channelId" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sponsorship_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sponsorship_subscriptions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "userId" UUID,
    "channelId" UUID,
    "sponsorshipPlanId" UUID,

    CONSTRAINT "sponsorship_subscriptions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sponsorship_plans" ADD CONSTRAINT "sponsorship_plans_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sponsorship_subscriptions" ADD CONSTRAINT "sponsorship_subscriptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sponsorship_subscriptions" ADD CONSTRAINT "sponsorship_subscriptions_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sponsorship_subscriptions" ADD CONSTRAINT "sponsorship_subscriptions_sponsorshipPlanId_fkey" FOREIGN KEY ("sponsorshipPlanId") REFERENCES "sponsorship_plans"("id") ON DELETE SET NULL ON UPDATE CASCADE;
