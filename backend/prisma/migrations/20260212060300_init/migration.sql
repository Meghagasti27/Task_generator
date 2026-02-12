-- CreateTable
CREATE TABLE "Spec" (
    "id" TEXT NOT NULL,
    "goal" TEXT NOT NULL,
    "users" TEXT NOT NULL,
    "constraints" TEXT NOT NULL,
    "templateType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Spec_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "specId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_specId_fkey" FOREIGN KEY ("specId") REFERENCES "Spec"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
