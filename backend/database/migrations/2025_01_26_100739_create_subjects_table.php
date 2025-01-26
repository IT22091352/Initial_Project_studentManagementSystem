<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('subjects', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('student_id');  // Define as unsignedBigInteger
            $table->string('subject_name');
            $table->timestamps();

            // Add foreign key constraint
            $table->foreign('student_id')
                  ->references('id')->on('students')
                  ->onDelete('cascade');  // Ensures that when a student is deleted, their associated subject is also deleted
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subjects');
    }
};
