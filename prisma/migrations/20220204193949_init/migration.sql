-- CreateTable
CREATE TABLE "People" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,

    CONSTRAINT "People_pkey" PRIMARY KEY ("id")
);
