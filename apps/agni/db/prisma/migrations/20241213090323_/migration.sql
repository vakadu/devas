-- CreateTable
CREATE TABLE "coming_soon" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "coming_soon_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "coming_soon_email_key" ON "coming_soon"("email");
