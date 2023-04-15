-- CreateTable
CREATE TABLE "Champion" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "votes" INTEGER NOT NULL,

    CONSTRAINT "Champion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Versus" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "champion1Id" UUID NOT NULL,
    "champion2Id" UUID NOT NULL,

    CONSTRAINT "Versus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Champion_name_key" ON "Champion"("name");

-- AddForeignKey
ALTER TABLE "Versus" ADD CONSTRAINT "Versus_champion1Id_fkey" FOREIGN KEY ("champion1Id") REFERENCES "Champion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Versus" ADD CONSTRAINT "Versus_champion2Id_fkey" FOREIGN KEY ("champion2Id") REFERENCES "Champion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
